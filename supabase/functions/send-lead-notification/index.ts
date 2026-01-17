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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { businessName, websiteUrl, email }: LeadNotificationRequest = await req.json();

    // Validate input
    if (!businessName || !websiteUrl || !email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Sending lead notification for: ${businessName}`);

    // Send notification email to Kris
    const emailResponse = await resend.emails.send({
      from: "Digital Digger Pro <onboarding@resend.dev>",
      to: ["kreso@localdigitalops.com"],
      subject: `🚀 New Demo Request: ${businessName}`,
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
                    <td style="padding: 10px 0; color: #ffffff; font-size: 16px; font-weight: 600;">${businessName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #7a7a8a; font-size: 14px; border-top: 1px solid #2a2a4a;">Website URL</td>
                    <td style="padding: 10px 0; color: #00d4ff; font-size: 16px; border-top: 1px solid #2a2a4a;">
                      <a href="${websiteUrl.startsWith('http') ? websiteUrl : 'https://' + websiteUrl}" target="_blank" style="color: #00d4ff; text-decoration: none;">${websiteUrl}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #7a7a8a; font-size: 14px; border-top: 1px solid #2a2a4a;">Email</td>
                    <td style="padding: 10px 0; color: #ffffff; font-size: 16px; border-top: 1px solid #2a2a4a;">
                      <a href="mailto:${email}" style="color: #00d4ff; text-decoration: none;">${email}</a>
                    </td>
                  </tr>
                </table>
              </div>
              
              <!-- CTA Buttons -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://wa.me/${email.includes('@') ? '' : email}?text=Hi%20${encodeURIComponent(businessName)}%2C%20I%20received%20your%20demo%20request!" 
                   style="display: inline-block; background: #25D366; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 5px;">
                  💬 WhatsApp
                </a>
                <a href="mailto:${email}?subject=Your%20Demo%20Request%20-%20${encodeURIComponent(businessName)}" 
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
