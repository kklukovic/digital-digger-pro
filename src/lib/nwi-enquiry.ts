export type NwiEnquiry = {
  goal: string;
  services: string[];
  business: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  city: string;
  details: string;
  timeline: string;
  listed: string;
  listingUrl: string;
};

export function enquirySummary(data: NwiEnquiry): string {
  return [
    "NEW NWI SERVICE ENQUIRY | localdigitalops.com/nwi",
    "Source: NWI service questionnaire, not an AI chat",
    `Business: ${data.business.trim()}`,
    `Contact name: ${data.name.trim() || "Not provided"}`,
    `Email: ${data.email.trim()}`,
    `Phone: ${data.phone.trim() || "Not provided"}`,
    `Website: ${data.website.trim() || "Not provided"}`,
    `Town / service area: ${data.city.trim() || "Not provided"}`,
    `Main goal: ${data.goal}`,
    `Interested in: ${data.services.join(", ") || "Please recommend a starting point"}`,
    `Timing: ${data.timeline}`,
    `Directory discount eligibility: ${data.listed}`,
    `Listing link: ${data.listed === "Yes, I am listed" ? data.listingUrl.trim() || "Please verify by business name" : "Not provided"}`,
    "",
    "What the business would like to improve:",
    data.details.trim() || "Please help me identify the best next step.",
    "",
    "This is an enquiry, not an order. Confirm scope, pricing and any eligible 20% service-fee discount before starting paid work.",
  ].join("\n");
}

// The existing notification endpoint formats its message body as HTML.
// Escape visitor-supplied text before passing a plain-text request to it.
export function notificationSafeText(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendNwiEnquiry(
  data: NwiEnquiry,
  sessionId: string,
): Promise<string> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/save-conversation`,
      {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          sessionId,
          messages: [
            {
              role: "user",
              content: notificationSafeText(enquirySummary(data)),
            },
          ],
          userAgent: "NWI service questionnaire",
        }),
      },
    );
    if (!response.ok)
      throw new Error(`Request could not be saved (${response.status})`);
    const result = await response.json();
    if (result.success !== true || typeof result.conversationId !== "string")
      throw new Error("Missing request confirmation");
    return result.conversationId;
  } finally {
    window.clearTimeout(timeout);
  }
}
