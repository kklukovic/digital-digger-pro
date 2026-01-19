import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadNotificationRequest {
  businessName: string;
  websiteUrl: string;
  email: string;
}

// Rate limiting store (in-memory, resets on cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 5; // 5 submissions per hour per IP
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds

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

// HTML escape function to prevent XSS in email templates
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// URL-safe escape (keeps basic URL characters but escapes malicious content)
function escapeUrl(url: string): string {
  try {
    // Validate it's a proper URL structure
    const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return '';
    }
    return urlObj.toString();
  } catch {
    // If URL parsing fails, escape it for display only
    return escapeHtml(url);
  }
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
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
        JSON.stringify({ error: "Too many requests. Please try again later." }),
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

    const body = await req.json();
    const { businessName, websiteUrl, email }: LeadNotificationRequest = body;

    // Server-side validation - check presence
    if (!businessName || !websiteUrl || !email) {
      console.log("Missing required fields in request");
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate and trim inputs
    const trimmedBusinessName = String(businessName).trim();
    const trimmedWebsiteUrl = String(websiteUrl).trim();
    const trimmedEmail = String(email).trim().toLowerCase();

    // Length validation (matching client-side zod schema)
    if (trimmedBusinessName.length > 100) {
      console.log("Business name too long");
      return new Response(
        JSON.stringify({ error: "Business name must be less than 100 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (trimmedWebsiteUrl.length > 255) {
      console.log("Website URL too long");
      return new Response(
        JSON.stringify({ error: "Website URL must be less than 255 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (trimmedEmail.length > 255) {
      console.log("Email too long");
      return new Response(
        JSON.stringify({ error: "Email must be less than 255 characters" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      console.log("Invalid email format");
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Escape inputs for HTML
    const safeBusinessName = escapeHtml(trimmedBusinessName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeWebsiteUrl = escapeUrl(trimmedWebsiteUrl);
    const displayWebsiteUrl = escapeHtml(trimmedWebsiteUrl);

    console.log(`Sending lead notification for: ${safeBusinessName} from IP: ${clientIP}`);

    // Send notification email to Kris
    const emailResponse = await resend.emails.send({
      from: "Digital Digger Pro <onboarding@resend.dev>",
      to: ["kreso@localdigitalops.com"],
      subject: `🚀 New Demo Request: ${safeBusinessName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif; background-color: #0a0a0f; color: #ffffff; padding: 40px 20px; margin: 0;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden; border: 1px solid #2a2a4a;">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #00d4ff 0%, #00a8cc 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #0a0a0f; font-size: 24px; font-weight: bold;">🎯 New Demo Request!</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 30px;">
              <p style="color: #b0b0c0; margin-bottom: 25px; font-size: 16px;">
                Someone just requested a demo on Digital Digger Pro. Here are the details:
              </p>
              
              <!-- Lead Details -->
              <div style="background: rgba(0, 212, 255, 0.1); border: 1px solid rgba(0, 212, 255, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; color: #7a7a8a; font-size: 14px; width: 120px;">Business Name</td>
                    <td style="padding: 10px 0; color: #ffffff; font-size: 16px; font-weight: 600;">${safeBusinessName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #7a7a8a; font-size: 14px; border-top: 1px solid #2a2a4a;">Website URL</td>
                    <td style="padding: 10px 0; color: #00d4ff; font-size: 16px; border-top: 1px solid #2a2a4a;">
                      ${safeWebsiteUrl ? `<a href="${safeWebsiteUrl}" target="_blank" style="color: #00d4ff; text-decoration: none;">${displayWebsiteUrl}</a>` : displayWebsiteUrl}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #7a7a8a; font-size: 14px; border-top: 1px solid #2a2a4a;">Email</td>
                    <td style="padding: 10px 0; color: #ffffff; font-size: 16px; border-top: 1px solid #2a2a4a;">
                      <a href="mailto:${safeEmail}" style="color: #00d4ff; text-decoration: none;">${safeEmail}</a>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- CTA Buttons -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="mailto:${safeEmail}?subject=Your%20Demo%20Request%20-%20${encodeURIComponent(trimmedBusinessName)}" 
                   style="display: inline-block; background: linear-gradient(135deg, #00d4ff 0%, #00a8cc 100%); color: #0a0a0f; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px;">
                  ✉️ Send Email
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #0d0d15; padding: 20px; text-align: center; border-top: 1px solid #2a2a4a;">
              <p style="margin: 0; color: #5a5a6a; font-size: 12px;">
                Digital Digger Pro • Lead Notification System
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-lead-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
