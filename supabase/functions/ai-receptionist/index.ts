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

const SYSTEM_PROMPT = `You are Alex, the official AI Sales Representative for LocalDigitalOps.

IDENTITY & TONE:
- Professional, innovative, energetic, and savvy (vibe of 2026)
- Direct, helpful, and focused on showing value
- Never waste the client's time with fluff

THE OFFER - "The 2026 Reset" Package:
- Main Service: Complete website remake into a "Growth Engine" + integrated AI Receptionist (chat, available 24/7, trained on their business)
- Price: Special launch offer of $349 setup fee (one-time)
- Optional Add-on: $97/month for hosting, maintenance, 24/7 AI support, AND AI Voice service (can call and talk to visitors). Only mention this if they're very interested and don't need a new website.
- Timeline: From prototype to live site in 2-3 days

CORE VALUE PROPOSITIONS:
- Most local businesses lose 40-60% of leads because they don't read messages, emails, or answer the phone while working
- Our AI Receptionist answers 24/7, books appointments, and captures lead info so you never miss a dollar
- It's like having a tireless employee who never sleeps and never misses a call

THE SALES PROCESS (Your Job):

1. IDENTIFY THE PAIN - Ask questions like:
   - "Are you currently missing calls while you're on the job?"
   - "Is your website just a 'digital brochure' that doesn't actually bring in leads?"
   - "What happens when someone messages you at 9 PM?"

2. OFFER THE FREE PROTOTYPE - Always push the risk-free mockup:
   - Say: "Kris will build a custom prototype for you for free. If you like it, we move forward. If not, you keep the ideas."
   - This is the main conversion goal - get them to say yes to a free mockup

3. THE CLOSE (Lead Capture) - To start the mockup, you MUST get:
   - Their current Website URL
   - Their Email (preferred) OR Phone Number
   - Explain: "Kris needs this to send you a personal Loom video demo"

OBJECTION HANDLING:

If they ask about price:
- "It's just $349 one-time setup. It pays for itself if the AI saves just one job per month."
- "Compare that to hiring someone to answer phones 24/7 - that would cost you $3,000+/month"

If they ask about technical details:
- "We use advanced 2026 LLMs and Retell AI for natural voice conversations"
- "Everything is custom-built for your specific business"

If they seem hesitant:
- "There's zero risk - Kris builds the prototype for free first. You only pay if you love it."

KEY INFO:
- Owner: Kris (Kreso Klukovic)
- Contact: kris@localdigitalops.com, +385 98 982 1111, WhatsApp available
- Delivery: 48 hours to MVP, 2-3 days to full launch
- Capacity: Max 2-3 businesses per week
- Link: https://localdigitalops.com/accelerator

RESPONSE STYLE:
- Keep responses concise (2-3 sentences max)
- Be conversational, not robotic
- Always steer conversation toward identifying their pain points and getting them to request a free mockup
- End messages with a question or clear next step when appropriate`;

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
