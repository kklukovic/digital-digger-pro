import {
  Globe2,
  Search,
  MessageSquare,
  PhoneCall,
  PenLine,
  Mail,
} from "lucide-react";

export const nwiServices = [
  {
    id: "website",
    name: "Website build or redesign",
    shortName: "Your website",
    icon: Globe2,
    heading:
      "Make it easy to understand your business. And easy to contact you.",
    problem:
      "People land on your site, but the services are unclear, it is awkward on a phone, or finding the quote form takes too much work.",
    benefit:
      "Give a potential customer the information they need to feel comfortable taking the next step. Your website becomes a useful part of your sales process.",
    includes: [
      "A clear page structure around your services and service area",
      "Mobile-friendly design, with visible call and quote buttons",
      "Enquiry forms and useful answers to common questions",
      "Your own photos, business details and relevant trust signals",
    ],
    example:
      "A homeowner can see whether you do their type of job, check your service area and request a quote from their phone.",
    delivery:
      "We agree the pages and features, prepare the design and copy, then review it with you before launch.",
    costs:
      "Quoted for the agreed build or redesign. Hosting, domain and optional maintenance costs are shown separately.",
    result: "A clearer route from a website visit to a useful enquiry.",
  },
  {
    id: "google",
    name: "Google Business Profile help",
    shortName: "Your Google profile",
    icon: Search,
    heading: "Show the right information when a nearby customer finds you.",
    problem:
      "Your Google profile is incomplete, out of date, or does not explain the full range of work you do.",
    benefit:
      "Help people see what you offer, where you work and how to get in touch. A well-maintained profile makes your business easier to evaluate.",
    includes: [
      "Review of your categories, services, hours and contact information",
      "Business description and service-area improvements",
      "Guidance on useful photos and missing profile details",
      "Optional ongoing posts and review-response support",
    ],
    example:
      "A customer searching for your service can see accurate opening hours, relevant services and the right contact details.",
    delivery:
      "We review the public profile first, agree the changes, and request the appropriate access if you want us to implement them.",
    costs:
      "A one-time improvement project or a separately agreed ongoing service. Google decides visibility and rankings.",
    result: "A more useful, consistent first impression in local search.",
  },
  {
    id: "chat",
    name: "AI website assistant",
    shortName: "Website AI assistant",
    icon: MessageSquare,
    heading: "Help visitors get answers while you are busy doing the work.",
    problem:
      "A visitor has a simple question after you close, or you keep answering the same questions while trying to finish a job.",
    benefit:
      "A chat assistant can answer routine questions using your approved information and collect the details you need to follow up.",
    includes: [
      "Answers about your services, business hours and service area",
      "A knowledge base built from information you approve",
      "Contact details and a description of the customer's request",
      "Clear handoff rules for prices, availability and questions it cannot answer",
    ],
    example:
      "At 8:30 pm, a visitor asks whether you serve their town. The assistant helps with that question and takes their details for your next working day.",
    delivery:
      "We collect your business information, configure the assistant, and test realistic questions with you before it goes live.",
    costs:
      "Setup is quoted separately from any ongoing software, usage and support costs. It does not replace your judgement or promise availability.",
    result:
      "Visitors can take the next step without waiting for you to be online.",
  },
  {
    id: "phone",
    name: "AI phone receptionist",
    shortName: "Phone answering",
    icon: PhoneCall,
    heading: "Give callers a useful response when you cannot pick up.",
    problem:
      "You are driving, with a customer or outside working hours when a potential customer calls.",
    benefit:
      "An incoming-call assistant can gather the reason for the call and the caller's details, so you have something useful to follow up.",
    includes: [
      "A greeting and call flow tailored to your business",
      "Answers to agreed routine questions",
      "Caller details and a summary of the request",
      "After-hours or overflow rules, with routing where supported",
    ],
    example:
      "While you are on a job, a caller explains what they need and leaves a callback number. You can review the enquiry when you are free.",
    delivery:
      "We agree what the receptionist may say, configure the phone setup, and test the call flow before enabling it.",
    costs:
      "A separate service from website chat. Setup, phone numbers, call usage and ongoing support are itemized in your quote.",
    result: "A clearer way to handle incoming calls while you are unavailable.",
  },
  {
    id: "social",
    name: "Social media content",
    shortName: "Social content",
    icon: PenLine,
    heading:
      "Show people the work you do, without starting every post from scratch.",
    problem:
      "You have useful work, photos and customer questions to share, but finding time to turn them into posts is difficult.",
    benefit:
      "Keep your business visible with content based on what you actually do. Potential customers get a clearer picture of your services and expertise.",
    includes: [
      "An agreed content plan built around your services",
      "Post drafts using your photos, projects and business information",
      "Helpful service explanations and answers to customer questions",
      "Your approval before publishing, with scheduling agreed separately",
    ],
    example:
      "Photos from a completed job become a useful post explaining the problem, the work carried out and how to enquire about something similar.",
    delivery:
      "We agree the channels, content volume and approval process. You provide the business facts and available photos.",
    costs:
      "Quoted for an agreed content batch or ongoing plan. Advertising spend and additional production are separate.",
    result:
      "A more consistent presence that helps people understand your business.",
  },
  {
    id: "followup",
    name: "Email & enquiry follow-up",
    shortName: "Customer follow-up",
    icon: Mail,
    heading: "Keep good enquiries from getting lost in a busy week.",
    problem:
      "Someone asks for information or receives a quote, but following up depends on remembering it at the right moment.",
    benefit:
      "Build a practical follow-up process so interested people hear from you again and you can see which enquiries still need attention.",
    includes: [
      "A review of what happens after an enquiry arrives",
      "Useful acknowledgement and follow-up message drafts",
      "A simple tracking process or agreed automation",
      "Testing of the sending and reply process before launch",
    ],
    example:
      "A customer who requested a quote receives a useful acknowledgement. Your agreed follow-up process helps you remember the next conversation.",
    delivery:
      "We map your current process, agree the messages and timing, then configure the parts you want automated.",
    costs:
      "Quoted around your existing tools and the agreed workflow. Sending software and usage charges are disclosed separately.",
    result:
      "A repeatable process for staying in touch with interested customers.",
  },
] as const;

export const requestOptions = [
  { id: "free-audit", name: "Free online business audit" },
  { id: "pro-audit", name: "Pro Business Audit" },
  ...nwiServices.map((s) => ({ id: s.id, name: s.name })),
];

export const goals = [
  {
    id: "website",
    title: "Turn more website visits into enquiries",
    note: "Improve a website, or build your first one.",
    services: ["website"],
  },
  {
    id: "google",
    title: "Improve how my business appears on Google",
    note: "Make your public business information clearer.",
    services: ["google"],
  },
  {
    id: "answers",
    title: "Respond when I am busy or closed",
    note: "Website chat or help with incoming calls.",
    services: ["chat", "phone"],
  },
  {
    id: "followup",
    title: "Stay visible and follow up more consistently",
    note: "Content and a more useful enquiry process.",
    services: ["social", "followup"],
  },
  {
    id: "audit",
    title: "Start with a free business audit",
    note: "Get a short review before deciding what to improve.",
    services: ["free-audit"],
  },
  {
    id: "unsure",
    title: "I am not sure what I need",
    note: "Help me choose a sensible starting point.",
    services: [],
  },
];

export type NwiRequest = { services: string[]; goal: string };
