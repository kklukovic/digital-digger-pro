import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, Clock3, Globe2, Mail, PhoneCall, Search, PenLine } from "lucide-react";
import { sendNwiEnquiry, type NwiEnquiry } from "@/lib/nwi-enquiry";
import "./nwi.css";
import "./nwi-book.css";

const configuredLink = (import.meta.env.VITE_NWI_GOOGLE_BOOKING_URL || "").trim();
function validateBookingLink(value: string) {
  if (!value) return "";
  try {
    const url = new URL(value);
    const googleHost = url.hostname === "calendar.app.google" || url.hostname === "calendar.google.com";
    return url.protocol === "https:" && googleHost ? url.toString() : "";
  } catch { return ""; }
}
const googleBookingLink = validateBookingLink(configuredLink);

const topics = [
  { title: "Your website", detail: "Where visitors get stuck and how to improve enquiries.", icon: Globe2 },
  { title: "Local SEO & Google", detail: "Your visibility when people search for local services.", icon: Search },
  { title: "Customer phone calls", detail: "After-hours answering, overflow calls and appointments.", icon: PhoneCall },
  { title: "Content & marketing", detail: "Useful posts, customer follow-up or your next promotion.", icon: PenLine },
];

export default function NwiBook() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [question, setQuestion] = useState("");
  const [preferred, setPreferred] = useState("");
  const [trap, setTrap] = useState("");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const previous = document.title;
    document.title = "Free 15-Minute Business Advice Call | Local Digital Ops NWI";
    return () => { document.title = previous; };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || trap) return;
    setBusy(true);
    setError("");
    const data: NwiEnquiry = {
      goal: "Request a free 15-minute business advice call via Google Meet",
      services: ["Free business advice call"],
      business: business.trim(),
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      website: "",
      city: "",
      details: "Question: " + (question.trim() || "General business advice") + "\nPreferred days or times: " + (preferred.trim() || "Flexible") + "\nRequested from /nwi/book",
      timeline: "As soon as convenient",
      listed: "Not sure",
      listingUrl: "",
    };
    const id = "nwi-book-" + (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString());
    try {
      await sendNwiEnquiry(data, id);
      setSuccess(true);
    } catch (reason) {
      console.warn("Could not save free call request:", reason);
      setError("We could not confirm your request. Please email kris@localdigitalops.com with your business name and preferred times.");
    } finally {
      setBusy(false);
    }
  }

  return <div className="nwi nwi-book">
    <a className="nwi-skip" href="#book-main">Skip to content</a>
    <header className="nwi-header">
      <div className="nwi-wrap nwi-book-nav">
        <a className="nwi-book-brand" href="/nwi">local<span>digital</span>ops <small>NWI BUSINESS SERVICES</small></a>
        <a className="nwi-book-back" href="/nwi"><ArrowLeft size={17} /> All services</a>
      </div>
    </header>
    <main id="book-main" className="nwi-wrap nwi-book-main">
      <div className="nwi-book-intro">
        <p className="nwi-kicker">FREE ADVICE · GOOGLE MEET</p>
        <h1>Let's talk about <span>your business.</span></h1>
        <p className="nwi-book-lead">Bring a question, a problem or an idea. I offer a free 15-minute conversation about your website, local SEO, content, customer calls or anything else that could make your business easier to run.</p>
        <p className="nwi-book-promise"><CheckCircle2 size={19} /> You'll get practical advice you can use, even if you never hire us.</p>
        <div className="nwi-book-topics">
          {topics.map(({ title, detail, icon: Icon }) => (
            <div className="nwi-book-topic" key={title}><Icon size={21} /><strong>{title}</strong><p>{detail}</p></div>
          ))}
        </div>
        <div className="nwi-book-note"><CalendarDays size={20} /><p><strong>No obligation to buy.</strong> I will help you identify a realistic next step. If you want implementation help, we'll discuss a clear scope and price separately.</p></div>
      </div>
      <aside className="nwi-book-panel">
        <div className="nwi-book-panel-head">
          <span><Clock3 size={17} /> 15 MINUTES · FREE</span>
          <h2>Get a useful second opinion.</h2>
          <p>For business owners in Lake County and Northwest Indiana. We can meet online with Google Meet.</p>
        </div>
        {googleBookingLink ? (
          <div className="nwi-book-calendar">
            <a className="nwi-btn" href={googleBookingLink} target="_blank" rel="noopener noreferrer">Choose an available Google Meet time <ArrowUpRight size={17} /></a>
            <p>Your Google Calendar booking confirmation will include your meeting information.</p>
          </div>
        ) : success ? (
          <div className="nwi-book-confirmed" role="status">
            <CheckCircle2 size={31} /><h3>Your request has been received.</h3>
            <p>Kris will contact you to agree on a time and send Google Meet details. Your appointment is not yet booked.</p>
            <a href="/nwi">See our services <ArrowUpRight size={15}/></a>
          </div>
        ) : (
          <form className="nwi-book-form" onSubmit={submit}>
            <p className="nwi-book-form-notice">Request a free call. We'll agree on a suitable time and send a Google Meet invitation.</p>
            <label>Your name <input type="text" required autoComplete="name" maxLength={120} value={name} onChange={event=>setName(event.target.value)} placeholder="Your name"/></label>
            <label>Business name <input type="text" required maxLength={180} value={business} onChange={event=>setBusiness(event.target.value)} placeholder="Business name"/></label>
            <label>Email address <input type="email" required autoComplete="email" maxLength={180} value={email} onChange={event=>setEmail(event.target.value)} placeholder="you@business.com"/></label>
            <label>Phone number (optional) <input type="tel" maxLength={60} value={phone} onChange={event=>setPhone(event.target.value)} placeholder="Best number"/></label>
            <label>What would you like to discuss? <textarea rows={3} maxLength={1800} value={question} onChange={event=>setQuestion(event.target.value)} placeholder="A website, SEO, calls, social content or anything else"/></label>
            <label>Preferred time (optional) <input type="text" maxLength={180} value={preferred} onChange={event=>setPreferred(event.target.value)} placeholder="e.g. weekday afternoon, Central Time"/></label>
            <label className="nwi-book-trap" aria-hidden="true">Please leave blank <input tabIndex={-1} type="text" autoComplete="off" value={trap} onChange={event=>setTrap(event.target.value)} /></label>
            {error && <p role="alert" className="nwi-book-error">{error}</p>}
            <button type="submit" disabled={busy} className="nwi-btn">{busy ? "Sending request..." : "Request my free call"} <ArrowUpRight size={16}/></button>
            <p className="nwi-book-privacy">No payment or marketing subscription. This submits a call request, with a time confirmed separately.</p>
          </form>
        )}
        <div className="nwi-book-contact"><Mail size={16}/><a href="mailto:kris@localdigitalops.com">kris@localdigitalops.com</a></div>
      </aside>
    </main>
    <footer className="nwi-book-footer"><div className="nwi-wrap">Local Digital Ops · Practical support for Northwest Indiana businesses. <a href="/nwi">All services <ArrowUpRight size={14}/></a></div></footer>
  </div>;
}
