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
    price: "$750",
    priceNote: "One-time website improvement project. New websites start at $1,500.",
    starterScope: "A focused refresh of one existing page, clearer copy and contact buttons. New-build starting scope: up to 3 pages with supplied business information.",
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
    price: "$250",
    priceNote: "One-time profile improvement.",
    starterScope: "One existing business profile: categories, service details, description and contact information. Ongoing management is optional.",
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
    id: "seo",
    price: "$500",
    priceNote: "One-time SEO starter for up to 3 existing pages. Ongoing SEO is available separately.",
    starterScope: "Review technical search issues and improve on-page SEO for up to 3 website pages. New page creation and monthly work are separate.",
    name: "Local SEO & Google Search",
    shortName: "Local SEO",
    icon: Search,
    heading: "Help local customers find your business when they search for your services.",
    problem: "Your website barely shows up for the services and locations you actually cover, or its pages are difficult for search engines and people to understand.",
    benefit: "Improve relevant service pages, fix basic technical issues and make your website more useful to people searching for your type of business.",
    includes: [
      "A practical SEO review and prioritized findings",
      "Service and local keyword research for your actual customers",
      "Page titles, headings, useful copy and internal links",
      "Indexing, mobile and technical SEO checks",
      "Optional ongoing SEO content, monitoring and improvements",
    ],
    example: "A roofer gets a clearer roof-repair page with answers for homeowners in the towns they serve, supported by sensible links and contact options.",
    delivery: "We review the existing website, agree the first fixes and obtain approval before changing published pages.",
    costs: "Starter scope is one-time. New pages, advanced technical work and monthly SEO are quoted separately. Search rankings and traffic increases cannot be guaranteed.",
    result: "A more useful website foundation for being discovered through relevant searches.",
  },
  {
    id: "chat",
    price: "$750",
    priceNote: "One-time assistant setup.",
    starterScope: "One website, an approved business knowledge base, routine questions and enquiry capture. Software, usage and ongoing support are extra.",
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
    price: "$499 + $249/mo",
    priceNote: "Introductory setup plus monthly AI call answering. Usage limits and extras are agreed in writing.",
    starterScope: "One incoming AI call flow for after-hours or daytime overflow. Proposed starter allowance: up to 200 AI-connected minutes per month; routing, phone numbers and overages depend on the verified provider setup.",
    name: "AI phone receptionist & appointment booking",
    shortName: "AI call answering",
    icon: PhoneCall,
    heading: "Have more incoming calls answered, even when you are on a job or closed.",
    problem: "Potential customers call while you are busy, the phone goes unanswered or they need help after hours.",
    benefit: "A virtual receptionist can answer after-hours calls, take overflow calls during business hours or provide broader coverage where needed. It learns your approved business information and helps callers move toward the next step.",
    includes: [
      "After-hours, busy-line or daytime overflow answering where routing is supported",
      "Friendly greeting and approved answers about hours, services and locations",
      "Caller name, number, reason for calling and urgency captured for your team",
      "Call summaries and tested handoff notifications",
      "Appointment scheduling, rescheduling or cancellation when an approved live calendar integration is configured and verified",
      "Transfer to your staff where supported, or a clear callback request",
    ],
    example: "A homeowner calls after hours about a clogged drain. The receptionist collects job details and, when a calendar integration is working, offers an available time. Otherwise it sends a callback request for your team.",
    delivery: "We agree what the agent can say, connect the approved number or forwarding route, test real calls and confirm calendar bookings and transfers before enabling those features.",
    costs: "Proposed starter price: $499 setup plus $249 per month. The defined allowance, phone charges, carrier forwarding, additional minutes and advanced integrations must be confirmed before purchase. No guaranteed bookings or recovered revenue.",
    result: "Callers receive a useful response when your team cannot pick up.",
  },
  {
    id: "social",
    price: "$350",
    priceNote: "Per batch of 8 social post drafts and simple branded graphics.",
    starterScope: "Eight approved Facebook/Instagram post drafts using your business information and supplied photos. Optional publishing, video creation or monthly management is priced separately.",
    name: "Social content & marketing",
    shortName: "Content & social",
    icon: PenLine,
    heading: "Show customers what you do and give them a reason to remember you.",
    problem: "You have photos of finished work, customer questions and useful service stories, but creating posts keeps falling behind.",
    benefit: "Turn your real business activity into helpful posts, local service spotlights and clear offers for Facebook and Instagram.",
    includes: [
      "A simple content plan based on what your customers ask",
      "Post copy, captions and branded graphics for your approved channels",
      "Real project stories, service explanations, FAQs and seasonal offers",
      "Your approval of facts and images before anything goes live",
      "Optional ongoing posting, short videos and performance reviews",
    ],
    example: "Approved before-and-after project photos become a service spotlight, useful customer tip and clear estimate-request invitation.",
    delivery: "We agree the content batch and platforms, draft from your supplied business facts, then revise with your feedback.",
    costs: "One-time content batches or separately quoted monthly management. Ads, paid tools, filming and extra channels are not included.",
    result: "Consistent, useful social content based on your real business.",
  },
  {
    id: "followup",
    price: "$500",
    priceNote: "One-time follow-up setup.",
    starterScope: "One enquiry workflow with an acknowledgement and one follow-up email using your existing tools. Sending software and usage are extra.",
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

export const nwiPackage = {
  id: "complete-package",
  name: "Complete Business Upgrade",
  regularPrice: "$7,500",
  offerPrice: "$3,750",
  offerEnds: "2026-12-01T06:00:00Z",
  deadlineLabel: "November 30, 2026, 11:59 pm Central Time",
} as const;

export function packageOfferActive(now = Date.now()) {
  return now < Date.parse(nwiPackage.offerEnds);
}

export const requestOptions = [
  { id: nwiPackage.id, name: nwiPackage.name },
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
    id: "seo",
    title: "Help customers find my services through Google Search",
    note: "Improve my website pages and local search visibility.",
    services: ["seo"],
  },
  {
    id: "answers",
    title: "Respond when I am busy or closed",
    note: "After-hours phone answering, daytime overflow and website chat.",
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
