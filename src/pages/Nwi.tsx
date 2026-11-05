import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgePercent,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  CalendarDays,
  FileSearch,
  Globe2,
  Mail,
  Menu,
  PhoneCall,
  MessageSquare,
  Sparkles,
  X,
} from "lucide-react";
import { nwiServices, nwiPackage, packageOfferActive, type NwiRequest } from "@/lib/nwi-services";
import NwiEnquiry from "@/components/NwiEnquiry";
import portrait from "@/assets/kreso-photo.png";
import pawsExample from "@/assets/portfolio-paws.png";
import mimiExample from "@/assets/portfolio-mimi.png";
import "./nwi.css";

function Brand() {
  return (
    <a className="nwi-brand" href="/nwi" aria-label="Local Digital Ops home">
      <span className="nwi-brand-mark" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>
        local<span>digital</span>ops<small>BUILT FOR BUSINESS</small>
      </span>
    </a>
  );
}

const demoQuestions = [
  {
    question: "Do you cover my town?",
    answer:
      "Which town is the job in? I can help you check the business's approved service information and collect details for the team to confirm anything uncertain.",
  },
  {
    question: "Can I get a quote?",
    answer:
      "Tell me what you need help with and leave your preferred contact details. The team can review your enquiry and follow up with a quote.",
  },
  {
    question: "Can you come out tonight?",
    answer:
      "I cannot confirm a visit or live availability. I can take your details for the team to review when they are available.",
  },
];

const faqs = [
  [
    "I do not know which service I need. Where should I start?",
    "Book a free 15-minute advice call, choose a starting point in the questionnaire, or request a short free audit. We will help identify a useful improvement. There is no obligation to buy.",
  ],
  [
    "What does the free audit include?",
    "A short manual review of your public website and business presence, with a few useful things to improve. It is a starting point, rather than a full technical investigation. If you need a deeper competitor review and a written action plan, ask about the paid Pro Business Audit.",
  ],
  [
    "How much will this cost?",
    "Individual services have starting prices for the scope shown in the pricing section. A larger or more complex project can cost more. The Complete Business Upgrade has its own defined scope and project fee. Before you commit, your written quote separates setup, extras and ongoing costs such as hosting, software and call usage. The free online business audit is $0.",
  ],
  [
    "What is the difference between Google Business Profile and SEO?",
    "Google Business Profile work improves your Maps listing, services, contact details and useful updates. Website SEO helps people find and use your service pages in Google Search. Depending on your current situation, you may need one or both.",
  ],
  [
    "Can AI answer calls during working hours and schedule appointments?",
    "Yes. Depending on your phone system, a tested AI receptionist can answer after-hours calls, take daytime overflow or cover all incoming calls. With a connected and verified calendar, it can offer real availability and book appointments. Otherwise it takes a clear callback request. Transfer to staff is possible where supported.",
  ],
  [
    "Do I have to buy everything together?",
    "You can request one service or a combination. A website project can stand on its own. Website chat, phone answering and ongoing content are separate services, so you can choose the parts your business needs.",
  ],
  [
    "Will the AI assistant make promises on my behalf?",
    "We agree the information it can use and the questions it should hand off. Final quotes, live availability and decisions that need your judgement stay with your team unless a specific, tested integration is agreed. AI can make mistakes, so realistic testing and clear boundaries matter.",
  ],
  [
    "What do you need from me to get started?",
    "Usually your business details, services, service area, available photos and the outcome you want to improve. We request account access only where the agreed work needs it, and explain what is needed before implementation.",
  ],
  [
    "How does the directory discount work?",
    "A business listed on LakeCountyNWI.com, including a free listing, can receive 20% off our eligible paid service fees. We verify the listing and show the saving in your quote. Third-party subscriptions, hosting, usage charges, advertising spend, taxes and directory plans are excluded. It cannot be combined with another promotion.",
  ],
  [
    "Can you guarantee a certain number of leads or a Google ranking?",
    "No. We can agree and deliver specific improvements to your website, business information and enquiry process. Customer demand, competition and the platforms themselves also affect results. We explain what each project can reasonably address.",
  ],
];

export default function Nwi() {
  const [active, setActive] = useState("website");
  const [demo, setDemo] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [request, setRequest] = useState<NwiRequest | null>(null);
  const introductoryOffer = packageOfferActive();
  const service =
    nwiServices.find((item) => item.id === active) || nwiServices[0];

  useEffect(() => {
    const previousTitle = document.title;
    document.title =
      "SEO, Websites & AI Call Answering | Local Digital Ops NWI";
    const originals: Array<{
      element: Element;
      previous: string | null;
      created: boolean;
    }> = [];
    const tags = [
      [
        "name",
        "description",
        "Local SEO, websites, Google Business Profile, social content and AI call answering for Northwest Indiana businesses. Free 15-minute business advice call.",
      ],
      [
        "property",
        "og:title",
        "Help your next customer choose you | Local Digital Ops",
      ],
      [
        "property",
        "og:description",
        "Practical website and AI services, explained in plain English. Find the right next step for your business.",
      ],
      ["property", "og:url", "https://localdigitalops.com/nwi"],
    ];
    for (const [attribute, name, content] of tags) {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      const created = !element;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.append(element);
      }
      originals.push({
        element,
        previous: element.getAttribute("content"),
        created,
      });
      element.setAttribute("content", content);
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    const created = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.append(canonical);
    }
    const oldCanonical = canonical.getAttribute("href");
    canonical.setAttribute("href", "https://localdigitalops.com/nwi");
    return () => {
      document.title = previousTitle;
      originals.forEach(({ element, previous, created: wasCreated }) => {
        if (wasCreated) element.remove();
        else if (previous === null) element.removeAttribute("content");
        else element.setAttribute("content", previous);
      });
      if (created) canonical.remove();
      else if (oldCanonical === null) canonical.removeAttribute("href");
      else canonical.setAttribute("href", oldCanonical);
    };
  }, []);

  function enquire(services: string[] = [], goal = "") {
    setRequest({ services, goal });
    setMobileMenu(false);
  }

  function chooseService(id: string) {
    setActive(id);
    setMobileMenu(false);
  }

  return (
    <div className="nwi">
      <a className="nwi-skip" href="#nwi-main">
        Skip to content
      </a>
      <header className="nwi-header">
        <div className="nwi-wrap nwi-nav">
          <Brand />
          <nav className="nwi-desktop-nav" aria-label="Main navigation">
            <a href="#nwi-services">What we do</a>
            <a href="#nwi-pricing">Prices & package</a>
            <a href="#nwi-process">How it works</a>
            <a href="/nwi/book" className="nwi-nav-free">Free advice call</a>
          </nav>
          <a href="/nwi/book" className="nwi-btn nwi-btn-small">
            Free 15-min call <CalendarDays size={16} />
          </a>
          <button
            className="nwi-menu-toggle"
            type="button"
            aria-expanded={mobileMenu}
            aria-controls="nwi-mobile-nav"
            aria-label={mobileMenu ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileMenu && (
          <nav
            id="nwi-mobile-nav"
            className="nwi-mobile-nav"
            aria-label="Mobile navigation"
          >
            <a href="#nwi-services" onClick={() => setMobileMenu(false)}>
              What we do
            </a>
            <a href="#nwi-pricing" onClick={() => setMobileMenu(false)}>
              Prices & package
            </a>
            <a href="#nwi-process" onClick={() => setMobileMenu(false)}>
              How it works
            </a>
            <a href="/nwi/book" onClick={() => setMobileMenu(false)}>
              Free advice call
            </a>
          </nav>
        )}
      </header>
      <main id="nwi-main">
        <section className="nwi-call-strip" aria-label="Free business advice call">
          <div className="nwi-wrap nwi-call-strip-inner">
            <span className="nwi-free-pill">FREE · 15 MINUTES</span>
            <p><strong>Have a business question?</strong> Get a practical second opinion about your website, SEO, Google presence, incoming calls or content. Useful advice even if you never hire us.</p>
            <a href="/nwi/book">Get free advice <ArrowUpRight size={16} /></a>
          </div>
        </section>
        <section className="nwi-hero">
          <div className="nwi-wrap nwi-hero-grid">
            <div className="nwi-hero-copy">
              <p className="nwi-kicker">
                <span className="nwi-status-dot" /> PRACTICAL DIGITAL HELP FOR
                LOCAL BUSINESSES
              </p>
              <h1>
                Give your next
                <br />
                customer a reason
                <br />
                to <span>choose you.</span>
              </h1>
              <p className="nwi-lead">
                You are busy running the business. We help your website and
                customer enquiries work better around you.
              </p>
              <p className="nwi-hero-description">
                Improve local search visibility, build a clearer website,
                publish useful content or answer more customer calls.
                Start with the improvement that matters most to your business.
              </p>
              <div className="nwi-hero-actions">
                <a
                  href="#nwi-request"
                  className="nwi-btn"
                  onClick={() => enquire()}
                >
                  Find the right service <ArrowUpRight size={18} />
                </a>
                <a href="/nwi/book" className="nwi-link">
                  Ask me anything on a free call <ArrowRight size={17} />
                </a>
              </div>
              <p className="nwi-hero-reassurance">
                <CheckCircle2 size={15} /> Clear scope. A quote before paid work
                starts.
              </p>
            </div>
            <div className="nwi-hero-visual">
              <div className="nwi-visual-label">
                <span>FROM INTERESTED TO IN TOUCH</span>
                <span className="nwi-visual-dots">•••</span>
              </div>
              <div className="nwi-visual-title">
                A better experience.
                <br />
                <span>Before you even pick up.</span>
              </div>
              <div className="nwi-visual-browser">
                <div className="nwi-browser-top">
                  <span />
                  <span />
                  <span />
                  <small>your-business.com</small>
                </div>
                <div className="nwi-visual-conversation">
                  <div className="nwi-question">
                    <span>8:30 PM</span>
                    <p>
                      Do you serve my area?
                      <br />
                      I'd like to get a quote.
                    </p>
                  </div>
                  <div className="nwi-answer">
                    <span className="nwi-bot-icon">
                      <MessageSquare size={19} />
                    </span>
                    <div>
                      <strong>Your website assistant</strong>
                      <p>
                        Tell me about the job and where you are. I can take your
                        details for the team to follow up.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="nwi-enquiry-ticket">
                <span className="nwi-ticket-icon">
                  <Check size={20} />
                </span>
                <div>
                  <strong>A useful enquiry. Ready for your reply.</strong>
                  <small>
                    Customer details + what they need + service area
                  </small>
                </div>
                <ArrowUpRight size={18} />
              </div>
              <p className="nwi-example-label">
                ILLUSTRATIVE WORKFLOW, NOT A CUSTOMER RESULT
              </p>
              <div className="nwi-floating-note">
                <Clock3 size={17} />
                <span>
                  Your day ends.
                  <br />
                  <strong>Enquiries do not have to.</strong>
                </span>
              </div>
            </div>
          </div>
          <div className="nwi-wrap nwi-hero-bottom">
            <span>Built around your business.</span>
            <p>
              For trades, home services and other local service businesses in
              Northwest Indiana.
            </p>
            <a href="#nwi-services">
              Explore what is possible <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className="nwi-wrap nwi-section nwi-start">
          <div className="nwi-section-head">
            <div>
              <p className="nwi-kicker">START WITH THE PROBLEM</p>
              <h2>
                What would make
                <br />
                your working day easier?
              </h2>
            </div>
            <p>
              You do not need another tool to figure out. Choose the situation
              that sounds like your business, and see how we can help.
            </p>
          </div>
          <div className="nwi-start-grid">
            {[
              {
                id: "website",
                icon: Globe2,
                title: "My website needs to do a better job.",
                text: "Help visitors understand your services and send a useful enquiry.",
              },
              {
                id: "seo",
                icon: FileSearch,
                title: "Local customers cannot easily find me.",
                text: "Improve how your services appear in Google Search.",
              },
              {
                id: "phone",
                icon: PhoneCall,
                title: "My business misses customer calls.",
                text: "Answer after hours or during busy periods, with booking where supported.",
              },
              {
                id: "followup",
                icon: Mail,
                title: "Following up keeps slipping down the list.",
                text: "Create a practical process for staying in touch with interested customers.",
              },
            ].map((item) => (
              <a
                href="#nwi-services"
                key={item.id}
                className="nwi-start-card"
                onClick={() => chooseService(item.id)}
              >
                <item.icon size={25} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span>
                  See how it works <ArrowUpRight size={17} />
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="nwi-services-section" id="nwi-services">
          <div className="nwi-wrap nwi-section">
            <div className="nwi-section-head">
              <div>
                <p className="nwi-kicker">THE SERVICES, IN PLAIN ENGLISH</p>
                <h2>
                  Know what you get.
                  <br />
                  <span>Understand why it helps.</span>
                </h2>
              </div>
              <p>
                Each service solves a specific problem. Choose one to see the
                work involved, a real-world use case and the costs we agree with
                you.
              </p>
            </div>
            <div className="nwi-service-explorer">
              <div
                className="nwi-service-menu"
                role="group"
                aria-label="Choose a service"
              >
                {nwiServices.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={active === item.id}
                    onClick={() => setActive(item.id)}
                  >
                    <item.icon size={19} />
                    <span>{item.shortName}</span>
                    <ArrowUpRight size={16} />
                  </button>
                ))}
                <p>
                  Pick one service or combine the parts your business needs.
                </p>
              </div>
              <article
                className="nwi-service-detail"
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="nwi-service-badge">
                  <service.icon size={16} />
                  {service.name}
                </div>
                <h3>{service.heading}</h3>
                <div className="nwi-service-intro">
                  <p>
                    <strong>Sound familiar?</strong> {service.problem}
                  </p>
                  <p className="nwi-benefit">{service.benefit}</p>
                </div>
                <div className="nwi-service-delivery">
                  <div>
                    <h4>What is included</h4>
                    <ul>
                      {service.includes.map((item) => (
                        <li key={item}>
                          <Check size={15} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <aside>
                    <span>WHAT THIS LOOKS LIKE</span>
                    <p>{service.example}</p>
                    <div>
                      <Sparkles size={16} />
                      <strong>{service.result}</strong>
                    </div>
                  </aside>
                </div>
                <details className="nwi-scope">
                  <summary>
                    Setup, delivery & running costs <ChevronDown size={17} />
                  </summary>
                  <p>
                    <strong>How we deliver:</strong> {service.delivery}
                  </p>
                  <p>
                    <strong>Starting scope:</strong> {service.starterScope}
                  </p>
                  <p>
                    <strong>How pricing works:</strong> {service.costs}
                  </p>
                </details>
                <div className="nwi-service-bottom">
                  <div className="nwi-service-price">
                    <small>STARTS FROM</small>
                    <strong>{service.price}</strong>
                    <span>{service.priceNote}</span>
                    <small>Final price can be higher. Scope agreed in writing.</small>
                  </div>
                  <a
                    href="#nwi-request"
                    className="nwi-btn"
                    onClick={() =>
                      enquire(
                        [service.id],
                        `I am interested in ${service.name.toLowerCase()}`,
                      )
                    }
                  >
                    Ask about this service <ArrowUpRight size={17} />
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="nwi-pricing-section" id="nwi-pricing">
          <div className="nwi-wrap nwi-section">
            <div className="nwi-section-head">
              <div>
                <p className="nwi-kicker">CLEAR STARTING POINTS</p>
                <h2>Start with one improvement.<br />Or connect the whole picture.</h2>
              </div>
              <p>Choose the help you need now. Every starting price below covers a defined scope, with a written quote before any paid work.</p>
            </div>
            <div className="nwi-price-grid">
              {nwiServices.map((item) => (
                <article className="nwi-price-card" key={item.id}>
                  <item.icon size={23} aria-hidden="true" />
                  <h3>{item.name}</h3>
                  <p className="nwi-price-amount"><span>Starts from</span><strong>{item.price}</strong></p>
                  <p className="nwi-price-basis">{item.priceNote}</p>
                  <p>{item.starterScope}</p>
                  <a href="#nwi-request" className="nwi-link" onClick={() => enquire([item.id], `I would like a quote for ${item.name.toLowerCase()}`)}>Get my quote <ArrowUpRight size={16} /></a>
                </article>
              ))}
            </div>
            <p className="nwi-price-disclaimer">All prices are in USD. Starting prices are minimums for the scope described, not a fixed price for every project. More pages, locations, content, custom features or integrations can increase the price. Hosting, domains, subscriptions, AI usage, phone minutes, ad spend and applicable taxes are separate. We itemize expected ongoing costs before you agree.</p>
            <article className="nwi-package" aria-labelledby="nwi-package-title">
              <div className="nwi-package-main">
                <span className="nwi-package-label">{introductoryOffer ? "LIMITED INTRODUCTORY OFFER · 50% OFF" : "ONE CONNECTED BUSINESS SETUP"}</span>
                <h3 id="nwi-package-title">Complete Business<br />Upgrade.</h3>
                <p className="nwi-package-lead">A clearer website and local SEO. Useful content. AI call answering after hours or during busy periods. Better follow-up.</p>
                <p>Bring the pieces together in one project, with one person coordinating the setup and testing how they work together.</p>
                <div className="nwi-package-price">
                  {introductoryOffer && <span>Standard package <s>{nwiPackage.regularPrice}</s></span>}
                  <strong>{introductoryOffer ? nwiPackage.offerPrice : nwiPackage.regularPrice}</strong>
                  <span>One-time project fee for the scope below.</span>
                  {introductoryOffer && <b>Save $3,750 on setup.</b>}
                </div>
                <a href="#nwi-request" className="nwi-btn" onClick={() => enquire([nwiPackage.id], `I am interested in the Complete Business Upgrade (${introductoryOffer ? "$3,750 introductory project fee" : "$7,500 project fee"}; ongoing costs separate)`)}>Discuss my complete upgrade <ArrowUpRight size={18} /></a>
                <small>No payment at this step. We confirm fit, scope and running costs first.</small>
              </div>
              <div className="nwi-package-deliverables">
                <h4>What your package includes</h4>
                <ul>
                  {[
                    ["Website build or improvements", "A new website of up to 5 pages, or equivalent improvements to your current site. Mobile layout, enquiry form and clear calls to action, with 2 revision rounds."],
                    ["Website copy + launch content", "Copy for the included pages, plus 12 social post drafts with captions and simple branded graphics. Built from your approved facts and supplied photos."],
                    ["Google Business Profile improvements", "An update of 1 existing profile: business details, services, description and useful photo guidance. Verification and rankings remain with Google."],
                    ["SEO foundations", "On-page search optimization for the included website pages: service-focused titles, headings, copy, internal links and essential technical checks. Ongoing SEO is separate."],
                    ["AI website chat assistant", "Setup on 1 website, approved answers for up to 50 common questions, enquiry capture and a clear handoff to your team."],
                    ["AI voice receptionist", "1 incoming-call flow for after-hours or daytime overflow, approved answers and caller summaries. Live bookings or call transfers are included only when an agreed integration is configured and tested. Number setup and forwarding depend on your provider."],
                    ["Enquiry follow-up", "1 workflow with an acknowledgement and 1 follow-up email, configured with your agreed sending tools."],
                    ["Pro audit, launch testing + handover", "A written priority plan, end-to-end setup checks, a handover session and 30 days of support for fixes to the delivered setup."],
                  ].map(([title, detail]) => <li key={title}><CheckCircle2 size={18} aria-hidden="true" /><div><strong>{title}</strong><p>{detail}</p></div></li>)}
                </ul>
              </div>
              <div className="nwi-package-terms">
                <p><strong>What is separate:</strong> hosting, domains, AI/chat subscriptions, phone numbers and minutes, email tools, ad spend and applicable taxes. Ongoing content, maintenance and support beyond the included 30 days need a separate plan. Custom integrations, ecommerce and additional pages or locations are quoted as extras.</p>
                <p>{introductoryOffer ? <><strong>Offer ends {nwiPackage.deadlineLabel}.</strong> Confirm the written scope and book your project by then to receive the introductory fee. Work outside the included scope can increase the total.</> : <>The introductory offer has ended. The standard fee covers the scope listed above; extra work is quoted separately.</>} The package promotion cannot be combined with the 20% directory listing discount.</p>
              </div>
            </article>
          </div>
        </section>

        <section className="nwi-wrap nwi-section nwi-audits" id="nwi-audits">
          <div className="nwi-section-head">
            <div>
              <p className="nwi-kicker">A SENSIBLE FIRST STEP</p>
              <h2>
                Find the gaps
                <br />
                before choosing the fix.
              </h2>
            </div>
            <p>
              A business audit helps you decide where to focus. Start with a
              short free review, or ask for a deeper paid investigation.
            </p>
          </div>
          <div className="nwi-audit-grid">
            <article className="nwi-audit-card nwi-audit-free">
              <div className="nwi-audit-top">
                <span>THE STARTING POINT</span>
                <strong>$0</strong>
              </div>
              <FileSearch size={31} />
              <h3>
                Free online
                <br />
                business audit
              </h3>
              <p>
                A short manual review of your public online presence. Get a few
                practical improvements to consider first.
              </p>
              <ul>
                <li>
                  <Check size={15} /> Website clarity and ease of making contact
                </li>
                <li>
                  <Check size={15} /> Public Google profile and business
                  information
                </li>
                <li>
                  <Check size={15} /> A short list of useful next steps
                </li>
              </ul>
              <a
                href="#nwi-request"
                className="nwi-btn"
                onClick={() =>
                  enquire(["free-audit"], "Start with a free business audit")
                }
              >
                Request my free audit <ArrowUpRight size={17} />
              </a>
              <small>
                No purchase required. Timing confirmed after your request.
              </small>
            </article>
            <article className="nwi-audit-card nwi-audit-pro">
              <div className="nwi-audit-top">
                <span>THE DEEPER REVIEW</span>
                <span className="nwi-paid-pill">FROM $249 · ONE-TIME</span>
              </div>
              <h3>Pro Business Audit</h3>
              <p>
                Understand the bigger picture with a deeper review and a
                prioritized written action plan.
              </p>
              <div className="nwi-audit-comparison">
                <div>
                  <strong>Your website</strong>
                  <span>
                    Structure, mobile experience, performance checks and the
                    route to an enquiry.
                  </span>
                </div>
                <div>
                  <strong>Your local presence</strong>
                  <span>
                    Google profile details and a review of relevant local
                    competitors.
                  </span>
                </div>
                <div>
                  <strong>Your enquiry process</strong>
                  <span>
                    What happens after someone contacts you, including follow-up
                    opportunities.
                  </span>
                </div>
                <div>
                  <strong>Your action plan</strong>
                  <span>
                    What to fix first, why it matters and which changes need
                    specialist work.
                  </span>
                </div>
              </div>
              <div className="nwi-audit-pro-bottom">
                <p>
                  Starts from $249 for one business and location.
                  <br />
                  Broader reviews can cost more. Fixed quote agreed first.
                  <br />
                  Implementation quoted separately.
                </p>
                <a
                  href="#nwi-request"
                  className="nwi-link"
                  onClick={() =>
                    enquire(
                      ["pro-audit"],
                      "I would like a quote for the Pro Business Audit",
                    )
                  }
                >
                  Get a Pro audit quote <ArrowUpRight size={17} />
                </a>
              </div>
            </article>
          </div>
        </section>

        <section className="nwi-demo-section">
          <div className="nwi-wrap nwi-section nwi-demo-grid">
            <div>
              <p className="nwi-kicker">MAKE IT TANGIBLE</p>
              <h2>
                A visitor has a question.
                <br />
                <span>You are still on a job.</span>
              </h2>
              <p>
                An AI website assistant can handle a routine question and
                collect the enquiry. You decide the information it uses and when
                it should hand things over.
              </p>
              <a
                href="#nwi-request"
                className="nwi-link"
                onClick={() =>
                  enquire(
                    ["chat"],
                    "I would like help answering website enquiries",
                  )
                }
              >
                Could this work for my business? <ArrowUpRight size={17} />
              </a>
              <p className="nwi-demo-disclosure">
                This is a scripted example. A real assistant is configured and
                tested with your business information.
              </p>
            </div>
            <div className="nwi-demo-panel">
              <div className="nwi-demo-head">
                <span>
                  <MessageSquare size={22} />
                </span>
                <div>
                  <strong>Meet a more helpful website.</strong>
                  <small>CHOOSE A SAMPLE QUESTION</small>
                </div>
              </div>
              <div
                className="nwi-demo-buttons"
                role="group"
                aria-label="Sample customer questions"
              >
                {demoQuestions.map((item, index) => (
                  <button
                    type="button"
                    key={item.question}
                    aria-pressed={demo === index}
                    onClick={() => setDemo(index)}
                  >
                    {item.question}
                  </button>
                ))}
              </div>
              <div
                className="nwi-demo-messages"
                aria-live="polite"
                aria-atomic="true"
              >
                <p className="nwi-demo-question">
                  {demoQuestions[demo].question}
                </p>
                <div className="nwi-demo-answer">
                  <MessageSquare size={18} />
                  <p>{demoQuestions[demo].answer}</p>
                </div>
              </div>
              <div className="nwi-demo-caption">
                <CheckCircle2 size={15} /> Answers from approved information,
                with a clear handoff.
              </div>
            </div>
          </div>
        </section>

        <section className="nwi-wrap nwi-section" id="nwi-process">
          <div className="nwi-section-head">
            <div>
              <p className="nwi-kicker">A STRAIGHTFORWARD PROCESS</p>
              <h2>
                A useful improvement.
                <br />
                With a clear plan to get there.
              </h2>
            </div>
            <p>
              You work directly with Kris. We agree what is useful for your
              business before starting paid work.
            </p>
          </div>
          <ol className="nwi-process-grid">
            {[
              [
                "Tell us what needs to work better.",
                "Use the short questionnaire. Share your business, the problem and any services you are considering.",
              ],
              [
                "Get a recommendation and a clear quote.",
                "We agree the scope, what you receive and any setup or ongoing costs. You decide whether to proceed.",
              ],
              [
                "Review the work before it goes live.",
                "Check the design, content or assistant behaviour with us. We test the agreed customer journey.",
              ],
              [
                "Launch with the next steps explained.",
                "Know how enquiries reach you, what your team needs to do and what support is included.",
              ],
            ].map(([title, text], index) => (
              <li key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="nwi-wrap nwi-work">
          <div className="nwi-work-intro">
            <p className="nwi-kicker">EXAMPLES FROM OUR EXISTING PORTFOLIO</p>
            <h2>
              Thoughtful design.
              <br />A useful purpose.
            </h2>
            <p>
              A look at different website styles and experiences. Your project
              is built around your own services and customers.
            </p>
          </div>
          <div className="nwi-work-grid">
            <a
              href="https://paws-care.localdigitalops.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={pawsExample}
                width="800"
                height="450"
                loading="lazy"
                alt="Paws Care website design example"
              />
              <span>
                <strong>Paws Care</strong>
                <small>Pet care website experience</small>
                <ArrowUpRight size={18} />
              </span>
            </a>
            <a
              href="https://cookwithmimi.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={mimiExample}
                width="800"
                height="450"
                loading="lazy"
                alt="Cook with Mimi website design example"
              />
              <span>
                <strong>Cook with Mimi</strong>
                <small>Content and recipe website</small>
                <ArrowUpRight size={18} />
              </span>
            </a>
          </div>
        </section>

        <section className="nwi-wrap nwi-discount-section">
          <div className="nwi-discount">
            <div>
              <BadgePercent size={29} />
              <span>LISTED ON LAKECOUNTYNWI.COM?</span>
              <h2>
                Your business qualifies
                <br />
                for a <strong>20% saving.</strong>
              </h2>
              <p>
                Free listings count, too. Share your listing when you enquire
                and we will show the saving on eligible paid service fees in
                your quote.
              </p>
              <a
                href="#nwi-request"
                className="nwi-link"
                onClick={() => enquire()}
              >
                Ask about your project <ArrowUpRight size={17} />
              </a>
            </div>
            <div className="nwi-discount-note">
              <span>
                20<small>%</small>
              </span>
              <strong>OFF ELIGIBLE SERVICE FEES</strong>
              <p>
                Listing verification required. Excludes third-party software,
                hosting, usage charges, ad spend, taxes and directory plans.
                Cannot be combined with the Complete Business Upgrade introductory offer or another promotion.
              </p>
            </div>
          </div>
        </section>

        <section className="nwi-wrap nwi-section nwi-request" id="nwi-request">
          <div className="nwi-request-copy">
            <p className="nwi-kicker">YOUR NEXT STEP</p>
            <h2>
              What would you
              <br />
              like your business
              <br />
              to do <span>better?</span>
            </h2>
            <p>
              The short questionnaire helps us understand what you need. You
              will see a summary before sending, and you can ask for a
              recommendation if you are unsure.
            </p>
            <div className="nwi-owner">
              <img
                src={portrait}
                width="60"
                height="60"
                alt="Kris Klukovic"
                loading="lazy"
              />
              <div>
                <strong>Hi, I'm Kris.</strong>
                <span>You'll work directly with me.</span>
              </div>
            </div>
            <p className="nwi-owner-note">
              I build websites and practical digital tools for local businesses.
              Tell me where things are getting stuck, and we can work out a
              sensible next step.
            </p>
            <a
              href="mailto:kris@localdigitalops.com"
              className="nwi-direct-email"
            >
              <Mail size={17} />
              kris@localdigitalops.com
            </a>
            <div className="nwi-request-promise">
              <CheckCircle2 size={18} />
              <p>
                You receive the scope and price before any paid work starts.
              </p>
            </div>
          </div>
          <NwiEnquiry initialRequest={request} />
        </section>

        <section className="nwi-wrap nwi-section nwi-faq">
          <div>
            <p className="nwi-kicker">GOOD QUESTIONS</p>
            <h2>Before you decide.</h2>
          </div>
          <div>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <ChevronDown size={18} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <footer className="nwi-footer">
        <div className="nwi-wrap">
          <Brand />
          <p>
            Practical digital services.
            <br />
            Built around the way your business works.
          </p>
          <nav aria-label="Footer">
            <a href="#nwi-services">Services</a>
            <a href="#nwi-audits">Free audit</a>
            <a href="/nwi/book">Free advice call</a>
            <a href="mailto:kris@localdigitalops.com">
              Contact Kris <ArrowUpRight size={14} />
            </a>
          </nav>
          <small>© {new Date().getFullYear()} Local Digital Ops</small>
        </div>
      </footer>
    </div>
  );
}
