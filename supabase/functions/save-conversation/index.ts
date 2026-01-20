import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

// Keywords that indicate high intent
const HIGH_INTENT_KEYWORDS = [
  "website", "prototype", "mockup", "interested", "price", "pricing", "cost",
  "buy", "purchase", "sign up", "start", "ready", "let's do it", "how do i start",
  "get started", "yes", "deal", "sounds good", "i want", "my email", "my website",
  ".com", "@", "contact", "call me", "reach me", "schedule", "demo"
];

// Email/phone/URL regex patterns
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const PHONE_REGEX = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
const URL_REGEX = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/g;

function extractLeadInfo(messages: Array<{ role: string; content: string }>) {
  const userMessages = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ");

  const emails = userMessages.match(EMAIL_REGEX) || [];
  const phones = userMessages.match(PHONE_REGEX) || [];
  const urls = userMessages.match(URL_REGEX) || [];

  // Check for high intent keywords
  const lowerContent = userMessages.toLowerCase();
  const hasHighIntent = HIGH_INTENT_KEYWORDS.some((keyword) =>
    lowerContent.includes(keyword.toLowerCase())
  );

  return {
    email: emails[0] || null,
    phone: phones[0] || null,
    websiteUrl: urls.find((url) => !url.includes("localdigitalops")) || null,
    isHighIntent: hasHighIntent || emails.length > 0 || urls.length > 0,
  };
}

async function sendNotificationEmail(
  resend: InstanceType<typeof Resend>,
  conversationData: {
    messages: Array<{ role: string; content: string }>;
    leadEmail: string | null;
    leadPhone: string | null;
    leadWebsiteUrl: string | null;
    isHighIntent: boolean;
    sessionId: string;
  }
) {
  const { messages, leadEmail, leadPhone, leadWebsiteUrl, isHighIntent, sessionId } = conversationData;
  
  // Format conversation for email
  const conversationHtml = messages
    .map((m) => {
      const role = m.role === "user" ? "🧑 Visitor" : "🤖 AI Alex";
      const bgColor = m.role === "user" ? "#e3f2fd" : "#f5f5f5";
      return `<div style="background: ${bgColor}; padding: 10px; margin: 5px 0; border-radius: 8px;"><strong>${role}:</strong> ${m.content}</div>`;
    })
    .join("");

  const intentBadge = isHighIntent
    ? '<span style="background: #4caf50; color: white; padding: 4px 12px; border-radius: 20px; font-weight: bold;">🔥 HIGH INTENT LEAD</span>'
    : '<span style="background: #ff9800; color: white; padding: 4px 12px; border-radius: 20px;">Regular Conversation</span>';

  const leadInfoHtml = `
    <div style="background: #fff3e0; padding: 15px; border-radius: 8px; margin: 15px 0;">
      <h3 style="margin: 0 0 10px 0;">📋 Lead Information:</h3>
      <p style="margin: 5px 0;"><strong>Email:</strong> ${leadEmail || "Not provided"}</p>
      <p style="margin: 5px 0;"><strong>Phone:</strong> ${leadPhone || "Not provided"}</p>
      <p style="margin: 5px 0;"><strong>Website URL:</strong> ${leadWebsiteUrl || "Not provided"}</p>
      <p style="margin: 5px 0;"><strong>Session ID:</strong> ${sessionId}</p>
    </div>
  `;

  const subject = isHighIntent
    ? `🔥 HIGH INTENT: New AI Alex Conversation - ${leadEmail || leadWebsiteUrl || "Anonymous"}`
    : `💬 New AI Alex Conversation - ${sessionId.slice(0, 8)}`;

  try {
    await resend.emails.send({
      from: "AI Alex Notifications <onboarding@resend.dev>",
      to: ["kris@localdigitalops.com"],
      subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">New AI Alex Conversation</h1>
          ${intentBadge}
          ${leadInfoHtml}
          <h2 style="color: #333; margin-top: 20px;">💬 Full Conversation:</h2>
          ${conversationHtml}
          <hr style="margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">
            This notification was sent automatically by AI Alex on LocalDigitalOps.
          </p>
        </div>
      `,
    });
    console.log("Notification email sent successfully");
    return true;
  } catch (error) {
    console.error("Failed to send notification email:", error);
    return false;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sessionId, messages, clientIp, userAgent } = await req.json();

    if (!sessionId || !messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request data" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract lead information from messages
    const leadInfo = extractLeadInfo(messages);
    
    console.log("Processing conversation:", {
      sessionId,
      messageCount: messages.length,
      isHighIntent: leadInfo.isHighIntent,
      hasEmail: !!leadInfo.email,
      hasWebsite: !!leadInfo.websiteUrl,
    });

    // Create Supabase client with service role for full access
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Check if conversation already exists
    const { data: existing } = await supabase
      .from("conversations")
      .select("id, notification_sent, is_high_intent")
      .eq("session_id", sessionId)
      .maybeSingle();

    let conversationId: string;
    let shouldSendNotification = false;

    if (existing) {
      // Update existing conversation
      const { error: updateError } = await supabase
        .from("conversations")
        .update({
          messages,
          is_high_intent: leadInfo.isHighIntent,
          lead_email: leadInfo.email,
          lead_phone: leadInfo.phone,
          lead_website_url: leadInfo.websiteUrl,
        })
        .eq("session_id", sessionId);

      if (updateError) {
        console.error("Error updating conversation:", updateError);
        throw updateError;
      }

      conversationId = existing.id;
      
      // Send notification if it's now high intent and we haven't sent one yet
      shouldSendNotification = leadInfo.isHighIntent && !existing.notification_sent;
    } else {
      // Insert new conversation
      const { data: newConversation, error: insertError } = await supabase
        .from("conversations")
        .insert({
          session_id: sessionId,
          messages,
          client_ip: clientIp || null,
          user_agent: userAgent || null,
          is_high_intent: leadInfo.isHighIntent,
          lead_email: leadInfo.email,
          lead_phone: leadInfo.phone,
          lead_website_url: leadInfo.websiteUrl,
        })
        .select("id")
        .single();

      if (insertError) {
        console.error("Error inserting conversation:", insertError);
        throw insertError;
      }

      conversationId = newConversation.id;
      
      // Send notification for new high-intent conversations
      shouldSendNotification = leadInfo.isHighIntent;
    }

    // Send email notification for high-intent leads
    if (shouldSendNotification && RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);
      
      const emailSent = await sendNotificationEmail(resend, {
        messages,
        leadEmail: leadInfo.email,
        leadPhone: leadInfo.phone,
        leadWebsiteUrl: leadInfo.websiteUrl,
        isHighIntent: leadInfo.isHighIntent,
        sessionId,
      });

      // Mark notification as sent
      if (emailSent) {
        await supabase
          .from("conversations")
          .update({ notification_sent: true })
          .eq("id", conversationId);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        conversationId,
        isHighIntent: leadInfo.isHighIntent,
        notificationSent: shouldSendNotification,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Save conversation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to save conversation" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});