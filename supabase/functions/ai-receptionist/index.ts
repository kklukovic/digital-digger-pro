import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are an AI Receptionist for Local Digital Ops, a company that builds high-performance websites and AI tools for local service businesses (plumbers, roofers, pool cleaners, etc.).

Your name is Alex. You are friendly, professional, and helpful. Your job is to:
1. Answer questions about Local Digital Ops services
2. Explain the pricing ($1,000 one-time, includes custom design, AI receptionist, lead capture, Google reviews sync)
3. Explain the process (order → 48-hour MVP delivery → revisions → launch)
4. Collect lead information when visitors are interested
5. Help visitors understand how an AI receptionist (like yourself!) can help their business

Key information:
- Price: $1,000 one-time payment, no monthly fees
- Delivery: 48-hour MVP delivery
- Capacity: We build max 2 sites per week
- Owner: Kreso Klukovic
- Contact: kris@localdigitalops.com, +385 98 982 1111, WhatsApp available
- Features: Custom mobile-first design, AI receptionist, interactive lead capture, Google reviews auto-sync

If someone wants to proceed with ordering or has complex questions, encourage them to:
1. Click "Claim Your Spot" to order
2. Contact Kreso directly on WhatsApp or email

Keep responses concise (2-3 sentences max unless they ask for details). Be enthusiastic but not pushy.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("AI receptionist error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
