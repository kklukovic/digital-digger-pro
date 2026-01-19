import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 1; // 1 call per 30 minutes per IP
const RATE_LIMIT_WINDOW = 1800000; // 30 minutes

function checkRateLimit(clientIP: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(clientIP);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

// Validate E.164 phone number format
function isValidE164(phone: string): boolean {
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(phone);
}

// Normalize phone number to E.164 format
function normalizePhoneNumber(phone: string): string {
  // Remove all non-digit characters except leading +
  let normalized = phone.replace(/[^\d+]/g, '');
  
  // If it doesn't start with +, assume US number and add +1
  if (!normalized.startsWith('+')) {
    // Remove leading 1 if present (for numbers like 14157774444)
    if (normalized.startsWith('1') && normalized.length === 11) {
      normalized = '+' + normalized;
    } else if (normalized.length === 10) {
      normalized = '+1' + normalized;
    } else {
      normalized = '+' + normalized;
    }
  }
  
  return normalized;
}

interface RetellCallRequest {
  phoneNumber: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get("cf-connecting-ip") ||
                     req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
                     req.headers.get("x-real-ip") ||
                     "unknown";

    // Check rate limit
    const rateLimit = checkRateLimit(clientIP);
    if (!rateLimit.allowed) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many call requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": String(rateLimit.retryAfter || 3600),
            ...corsHeaders,
          },
        }
      );
    }

    const { phoneNumber }: RetellCallRequest = await req.json();

    // Validate phone number presence
    if (!phoneNumber) {
      console.log("Missing phone number in request");
      return new Response(
        JSON.stringify({ error: "Phone number is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Normalize and validate phone number
    const normalizedPhone = normalizePhoneNumber(phoneNumber.trim());
    
    if (!isValidE164(normalizedPhone)) {
      console.log(`Invalid phone number format: ${phoneNumber} -> ${normalizedPhone}`);
      return new Response(
        JSON.stringify({ error: "Invalid phone number format. Please include country code (e.g., +1 for US)." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get secrets
    const RETELL_API_KEY = Deno.env.get("RETELL_API_KEY");
    const RETELL_FROM_NUMBER = Deno.env.get("RETELL_FROM_NUMBER");

    if (!RETELL_API_KEY) {
      console.error("RETELL_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Service configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!RETELL_FROM_NUMBER) {
      console.error("RETELL_FROM_NUMBER is not configured");
      return new Response(
        JSON.stringify({ error: "Service configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const fromNumber = "+12067968788";
    console.log(`Initiating Retell call from ${fromNumber} to ${normalizedPhone}`);

    // Call Retell AI API to create phone call
    const retellResponse = await fetch("https://api.retellai.com/v2/create-phone-call", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RETELL_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from_number: fromNumber,
        to_number: normalizedPhone,
        agent_id: "ag_4d36236b338f0d861295286701",
      }),
    });

    const retellData = await retellResponse.json();

    if (!retellResponse.ok) {
      console.error("Retell API error:", retellResponse.status, retellData);
      return new Response(
        JSON.stringify({ error: retellData.message || "Failed to initiate call" }),
        { status: retellResponse.status, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Retell call initiated successfully:", retellData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Call initiated! You should receive a call shortly.",
        callId: retellData.call_id 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in retell-call function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
