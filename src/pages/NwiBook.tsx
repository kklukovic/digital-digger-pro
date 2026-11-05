import { useEffect } from "react";
import { ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, Clock3, Globe2, PhoneCall, Search, PenLine } from "lucide-react";
import "./nwi.css";
import "./nwi-book.css";

const configuredLink = (import.meta.env.VITE_NWI_GOOGLE_BOOKING_URL || "").trim();
const configuredEmbedLink = (import.meta.env.VITE_NWI_GOOGLE_EMBED_URL || "").trim();

function validGoogleLink(value: string) {
  if (!value) return "";
  try {
    const url = new URL(value);
    const allowed = url.hostname === "calendar.app.google" || url.hostname === "calendar.google.com";
    return url.protocol === "https:" && allowed ? url.toString() : "";
  } catch {
    return "";
  }
}

const bookingUrl = validGoogleLink(configuredLink);
// Google's own inline embed code provides the canonical URL with gv=true.
// Until that is supplied, try the user's public booking URL, and always show a
// direct Google booking link in case the shortened URL refuses to display in an iframe.
const embedUrl = validGoogleLink(configuredEmbedLink) ||
  (bookingUrl ? bookingUrl + (bookingUrl.includes("?") ? "&" : "?") + "gv=true" : "");

const topics = [
  { title: "Website", detail: "Improve clarity, trust and customer enquiries.", icon: Globe2 },
  { title: "Local SEO & Google", detail: "Make your services easier to find in local search.", icon: Search },
  { title: "Customer calls", detail: "Discuss missed calls, after-hours answering and bookings.", icon: PhoneCall },
  { title: "Content & marketing", detail: "Explore social posts, follow-up and local promotions.", icon: PenLine },
];

export default function NwiBook() {
  useEffect(() => {
    const previous = document.title;
    document.title = "Free 30-Minute Business Advice Call | Local Digital Ops NWI";
    return () => { document.title = previous; };
  }, []);

  return <div className="nwi nwi-book">
    <a className="nwi-skip" href="#book-main">Skip to content</a>
    <header className="nwi-header">
      <div className="nwi-wrap nwi-book-nav">
        <a className="nwi-book-brand" href="/nwi">local<span>digital</span>ops <small>NWI BUSINESS SERVICES</small></a>
        <a className="nwi-book-back" href="/nwi"><ArrowLeft size={17} /> Back to services</a>
      </div>
    </header>
    <main id="book-main" className="nwi-wrap nwi-book-main">
      <div className="nwi-book-intro">
        <p className="nwi-kicker">FREE 30-MINUTE BUSINESS ADVICE · GOOGLE MEET</p>
        <h1>Let's talk about <span>your business.</span></h1>
        <p className="nwi-book-lead">
          Have a question about your website, Google visibility, local SEO, content, customer calls, or another business challenge? Pick a time and we can talk it through.
        </p>
        <p className="nwi-book-promise"><CheckCircle2 size={19} /> You'll leave with practical ideas even if you never hire us.</p>
        <div className="nwi-book-topics">
          {topics.map(({ title, detail, icon: Icon }) => (
            <div className="nwi-book-topic" key={title}><Icon size={21} /><strong>{title}</strong><p>{detail}</p></div>
          ))}
        </div>
        <div className="nwi-book-note">
          <CalendarDays size={20} />
          <p><strong>No purchase required.</strong> Pick a convenient slot directly in the calendar. Google handles the booking confirmation and meeting details. There is no separate form on this website.</p>
        </div>
      </div>
      <section className="nwi-book-panel" aria-labelledby="nwi-book-panel-title">
        <div className="nwi-book-panel-head">
          <span><Clock3 size={17} /> 30 MINUTES · FREE</span>
          <h2 id="nwi-book-panel-title">Choose your time.</h2>
          <p>Select an available appointment below. Google Calendar handles the booking and shows times in your local timezone.</p>
        </div>
        {embedUrl ? (
          <div className="nwi-book-calendar">
            <iframe
              title="Google Calendar appointment schedule for a free 30-minute business advice call"
              className="nwi-book-embed"
              src={embedUrl}
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="fullscreen"
            />
            <div className="nwi-book-direct">
              <p>If the embedded calendar does not show available appointments, open the same schedule directly in Google Calendar.</p>
              <a href={bookingUrl || embedUrl} target="_blank" rel="noopener noreferrer">
                Open booking calendar <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        ) : (
          <div className="nwi-book-calendar">
            <p>The booking schedule is temporarily unavailable on this page. Please use our contact email until the Google Calendar link is restored.</p>
            <a href="mailto:kris@localdigitalops.com?subject=Free%2030-minute%20business%20advice%20call">Contact Kris</a>
          </div>
        )}
      </section>
    </main>
    <footer className="nwi-book-footer">
      <div className="nwi-wrap">
        Local Digital Ops · Practical support for Northwest Indiana businesses.
        <a href="/nwi">All services <ArrowUpRight size={14} /></a>
      </div>
    </footer>
  </div>;
}
