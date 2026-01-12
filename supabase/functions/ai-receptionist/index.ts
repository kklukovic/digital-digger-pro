import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX_REQUESTS = 15; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute window

function getClientIP(req: Request): string {
  // Check common headers for client IP
  const cfConnectingIP = req.headers.get("cf-connecting-ip");
  if (cfConnectingIP) return cfConnectingIP;
  
  const xForwardedFor = req.headers.get("x-forwarded-for");
  if (xForwardedFor) return xForwardedFor.split(",")[0].trim();
  
  const xRealIP = req.headers.get("x-real-ip");
  if (xRealIP) return xRealIP;
  
  return "unknown";
}

function checkRateLimit(clientIP: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(clientIP);
  
  // Clean up expired entries periodically
  if (rateLimitStore.size > 1000) {
    for (const [ip, data] of rateLimitStore.entries()) {
      if (now > data.resetTime) {
        rateLimitStore.delete(ip);
      }
    }
  }
  
  if (!record || now > record.resetTime) {
    // Create new rate limit window
    rateLimitStore.set(clientIP, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW_MS,
    });
    return { allowed: true };
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }
  
  record.count++;
  return { allowed: true };
}

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
    // Rate limiting check
    const clientIP = getClientIP(req);
    const rateLimitResult = checkRateLimit(clientIP);
    
    if (!rateLimitResult.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please wait before trying again." }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": String(rateLimitResult.retryAfter || 60),
          },
        }
      );
    }

    // Validate Content-Length to prevent extremely large payloads
    const contentLength = req.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 50000) {
      return new Response(JSON.stringify({ error: "Request too large" }), {
        status: 413,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { messages } = body;

    // Validate messages is an array and not empty
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Limit conversation history to prevent abuse (max 20 messages)
    if (messages.length > 20) {
      return new Response(
        JSON.stringify({ error: "Too many messages in history" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate each message structure and content
    for (const msg of messages) {
      // Check required fields exist
      if (!msg || typeof msg !== 'object' || !msg.role || !msg.content) {
        return new Response(
          JSON.stringify({ error: "Invalid message format" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Only allow valid roles (user/assistant)
      if (msg.role !== 'user' && msg.role !== 'assistant') {
        return new Response(
          JSON.stringify({ error: "Invalid message role" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Validate content is a string and within reasonable length (max 2000 chars)
      if (typeof msg.content !== 'string' || msg.content.length > 2000) {
        return new Response(
          JSON.stringify({ error: "Message content invalid or too long" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Basic sanitization - trim whitespace
      msg.content = msg.content.trim();

      // Reject empty messages after trimming
      if (msg.content.length === 0) {
        return new Response(
          JSON.stringify({ error: "Empty message content" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

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
    return new Response(JSON.stringify({ error: "An error occurred" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
