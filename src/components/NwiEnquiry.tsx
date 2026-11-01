import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Send,
} from "lucide-react";
import { goals, requestOptions, nwiPackage, packageOfferActive, type NwiRequest } from "@/lib/nwi-services";
import {
  enquirySummary,
  sendNwiEnquiry,
  type NwiEnquiry,
} from "@/lib/nwi-enquiry";

const empty: NwiEnquiry = {
  goal: "",
  services: [],
  business: "",
  name: "",
  email: "",
  phone: "",
  website: "",
  city: "",
  details: "",
  timeline: "Just exploring",
  listed: "Not sure",
  listingUrl: "",
};
const steps = ["Your goal", "Your business", "The details", "Review & send"];

export default function NwiEnquiry({
  initialRequest,
}: {
  initialRequest: NwiRequest | null;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<NwiEnquiry>(empty);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [receipt, setReceipt] = useState("");
  const [copied, setCopied] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const session = useRef("");
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (initialRequest) {
      setData((previous) => ({
        ...previous,
        goal: initialRequest.goal,
        services: initialRequest.services,
      }));
      setStep(initialRequest.services.length && initialRequest.goal ? 1 : 0);
      setError("");
      setReceipt("");
    }
  }, [initialRequest]);

  function update<K extends keyof NwiEnquiry>(key: K, value: NwiEnquiry[K]) {
    setData((previous) => ({ ...previous, [key]: value }));
    setError("");
  }

  function move(next: number) {
    setStep(next);
    setError("");
    requestAnimationFrame(() =>
      heading.current?.focus({ preventScroll: true }),
    );
  }

  function toggleService(id: string) {
    update(
      "services",
      data.services.includes(id)
        ? data.services.filter((value) => value !== id)
        : [...data.services, id],
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    if (step === 0 && !data.goal) {
      setError(
        "Choose the closest option, or select 'I am not sure what I need'.",
      );
      return;
    }
    if (step < 3) {
      move(step + 1);
      return;
    }
    if (honeypot) {
      setError(
        "Your request could not be submitted. Please contact us directly.",
      );
      return;
    }
    if (
      !data.business.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)
    ) {
      move(1);
      setError("Please enter your business name and a valid email address.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      if (!session.current)
        session.current = `nwi-enquiry-${crypto.randomUUID?.() ?? Array.from(crypto.getRandomValues(new Uint8Array(16)), (byte) => byte.toString(16).padStart(2, "0")).join("")}`;
      const request = {
        ...data,
        services: data.services.map(
          (id) => requestOptions.find((option) => option.id === id)?.name || id,
        ),
      };
      const id = await sendNwiEnquiry(request, session.current);
      setReceipt(id);
    } catch (error) {
      console.warn(
        "NWI request could not be confirmed:",
        error instanceof Error ? error.message : "Unknown error",
      );
      setError(
        "We could not confirm that your request was saved. Please try again. Your answers are still here. You can also copy your request and email kris@localdigitalops.com.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    const request = {
      ...data,
      services: data.services.map(
        (id) => requestOptions.find((option) => option.id === id)?.name || id,
      ),
    };
    try {
      await navigator.clipboard.writeText(enquirySummary(request));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  if (receipt)
    return (
      <div className="nwi-form nwi-form-success" role="status">
        <span className="nwi-success-icon">
          <CheckCircle2 size={34} />
        </span>
        <p className="nwi-kicker">REQUEST RECEIVED</p>
        <h3>Thanks. We have your request.</h3>
        <p>
          Your request has been saved for review. Kris will get back to you
          using the contact details you provided to discuss the right next step.
        </p>
        <div className="nwi-receipt">
          <strong>{data.business}</strong>
          <span>{data.email}</span>
          <small>Reference: {receipt.slice(0, 8).toUpperCase()}</small>
        </div>
        <p className="nwi-small">
          You have requested information only. No paid work starts until you
          agree the scope and price.
        </p>
        <a href="mailto:kris@localdigitalops.com" className="nwi-link">
          Need to add something? Email Kris <ArrowRight size={16} />
        </a>
      </div>
    );

  return (
    <form className="nwi-form" onSubmit={submit}>
      <div className="nwi-form-top">
        <span>LET'S FIND THE RIGHT FIT</span>
        <span>0{step + 1} / 04</span>
      </div>
      <ol className="nwi-progress" aria-label="Request progress">
        {steps.map((label, index) => (
          <li
            key={label}
            aria-current={step === index ? "step" : undefined}
            className={index <= step ? "is-active" : ""}
          >
            <span>{index < step ? <Check size={12} /> : index + 1}</span>
            <small>{label}</small>
          </li>
        ))}
      </ol>
      <h3 ref={heading} tabIndex={-1}>
        {
          [
            "What would you like to improve?",
            "Tell us about your business.",
            "A little context helps.",
            "Does this look right?",
          ][step]
        }
      </h3>
      <p className="nwi-form-intro">
        {
          [
            "Choose the closest match. You can adjust the services later.",
            "Your business name and email are all we need to continue.",
            "Share what matters. You can leave the optional questions blank.",
            "Check your answers before sending. This is a request for help, not a purchase.",
          ][step]
        }
      </p>
      <div className="nwi-trap" aria-hidden="true">
        <label>
          Company fax
          <input
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </div>

      {step === 0 && (
        <div className="nwi-goals">
          {goals.map((goal) => (
            <button
              type="button"
              key={goal.id}
              aria-pressed={data.goal === goal.title}
              onClick={() =>
                setData((previous) => ({
                  ...previous,
                  goal: goal.title,
                  services: [...goal.services],
                }))
              }
            >
              <span className="nwi-choice-indicator">
                {data.goal === goal.title && <Check size={12} />}
              </span>
              <span>
                <strong>{goal.title}</strong>
                <small>{goal.note}</small>
              </span>
            </button>
          ))}
          {data.goal && !goals.some((goal) => goal.title === data.goal) && (
            <div className="nwi-selected-request">
              <CheckCircle2 size={18} />
              <span>{data.goal}</span>
            </div>
          )}
        </div>
      )}

      {step === 1 && (
        <div className="nwi-fields">
          <label htmlFor="nwi-business">
            Business name <span>*</span>
            <input
              id="nwi-business"
              required
              autoComplete="organization"
              maxLength={100}
              value={data.business}
              onChange={(e) => update("business", e.target.value)}
              placeholder="Your business name"
            />
          </label>
          <div className="nwi-field-row">
            <label htmlFor="nwi-name">
              Your name <small>optional</small>
              <input
                id="nwi-name"
                autoComplete="name"
                maxLength={100}
                value={data.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your name"
              />
            </label>
            <label htmlFor="nwi-email">
              Email address <span>*</span>
              <input
                id="nwi-email"
                required
                type="email"
                autoComplete="email"
                maxLength={254}
                value={data.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="you@yourbusiness.com"
              />
            </label>
          </div>
          <label htmlFor="nwi-website">
            Website or social profile <small>optional</small>
            <input
              id="nwi-website"
              maxLength={300}
              value={data.website}
              onChange={(e) => update("website", e.target.value)}
              placeholder="A link, if you have one"
            />
          </label>
          <div className="nwi-field-row">
            <label htmlFor="nwi-city">
              Town or service area <small>optional</small>
              <input
                id="nwi-city"
                maxLength={150}
                value={data.city}
                onChange={(e) => update("city", e.target.value)}
                placeholder="Where you work"
              />
            </label>
            <label htmlFor="nwi-phone">
              Phone number <small>optional</small>
              <input
                id="nwi-phone"
                type="tel"
                autoComplete="tel"
                maxLength={50}
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="Your preferred number"
              />
            </label>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="nwi-fields">
          <fieldset className="nwi-service-choices">
            <legend>
              Services you are considering <small>optional, choose any</small>
            </legend>
            {requestOptions.map((option) => (
              <label key={option.id}>
                <input
                  type="checkbox"
                  checked={data.services.includes(option.id)}
                  onChange={() => toggleService(option.id)}
                />
                <span>
                  {option.name}
                  {option.id === "pro-audit" && <small>paid review</small>}
                </span>
              </label>
            ))}
          </fieldset>
          <label htmlFor="nwi-details">
            What would you like to improve? <small>optional</small>
            <textarea
              id="nwi-details"
              rows={3}
              maxLength={1500}
              value={data.details}
              onChange={(e) => update("details", e.target.value)}
              placeholder="For example: I miss calls when I am on a job, or visitors rarely use my website's quote form."
            />
          </label>
          <label htmlFor="nwi-timing">
            When would you like to start?
            <select
              id="nwi-timing"
              value={data.timeline}
              onChange={(e) => update("timeline", e.target.value)}
            >
              <option>Just exploring</option>
              <option>As soon as practical</option>
              <option>Within the next month</option>
              <option>I have a specific date, noted above</option>
            </select>
          </label>
          {data.services.includes(nwiPackage.id) && (
            <p className="nwi-package-form-note">
              <strong>Complete Business Upgrade: {packageOfferActive() ? nwiPackage.offerPrice : nwiPackage.regularPrice} project fee.</strong>
              {" "}Covers the package scope shown above. Extras and ongoing software, hosting and usage cost more. {packageOfferActive() ? `The introductory offer ends ${nwiPackage.deadlineLabel} and cannot be combined with the 20% listing discount.` : "We confirm the scope and total in writing."}
            </p>
          )}
          <label htmlFor="nwi-listed">
            20% discount: are you listed on LakeCountyNWI.com?
            <select
              id="nwi-listed"
              value={data.listed}
              onChange={(e) => update("listed", e.target.value)}
            >
              <option>Not sure</option>
              <option>Yes, I am listed</option>
              <option>Not yet</option>
            </select>
          </label>
          {data.listed === "Yes, I am listed" && (
            <label htmlFor="nwi-listing">
              Your listing link <small>optional</small>
              <input
                id="nwi-listing"
                maxLength={300}
                value={data.listingUrl}
                onChange={(e) => update("listingUrl", e.target.value)}
                placeholder="Paste your directory listing link"
              />
            </label>
          )}
        </div>
      )}

      {step === 3 && (
        <div className="nwi-review">
          <dl>
            <div>
              <dt>Business</dt>
              <dd>{data.business}</dd>
            </div>
            <div>
              <dt>Reply to</dt>
              <dd>{data.email}</dd>
            </div>
            <div>
              <dt>Main goal</dt>
              <dd>{data.goal}</dd>
            </div>
            <div>
              <dt>Interested in</dt>
              <dd>
                {data.services.length
                  ? data.services
                      .map(
                        (id) =>
                          requestOptions.find((option) => option.id === id)
                            ?.name || id,
                      )
                      .join(", ")
                  : "Help choosing the right starting point"}
              </dd>
            </div>
            {data.services.includes(nwiPackage.id) && (
              <div>
                <dt>Package fee</dt>
                <dd>{packageOfferActive() ? nwiPackage.offerPrice : nwiPackage.regularPrice} for the included setup scope. Extras and ongoing costs separate. Written quote before commitment.</dd>
              </div>
            )}
            <div>
              <dt>Timing</dt>
              <dd>{data.timeline}</dd>
            </div>
            <div>
              <dt>Listing discount</dt>
              <dd>
                {data.services.includes(nwiPackage.id) && packageOfferActive()
                  ? "The 50% package promotion cannot be combined with the 20% listing discount"
                  : data.listed === "Yes, I am listed"
                  ? "20% off eligible service fees, after listing verification"
                  : data.listed === "Not sure"
                    ? "Please check my eligibility"
                    : "Not currently listed"}
              </dd>
            </div>
            {data.details && (
              <div>
                <dt>Your notes</dt>
                <dd>{data.details}</dd>
              </div>
            )}
          </dl>
          <p className="nwi-review-note">
            Submitting asks us to review your request and contact you about it.
            It does not sign you up for a newsletter or commit you to paid work.
          </p>
        </div>
      )}

      {error && (
        <div className="nwi-error" role="alert">
          <p>{error}</p>
          <button type="button" onClick={copy}>
            {copied ? "Request copied" : "Copy request as a backup"}
          </button>
          {copied && <p>Paste it into an email to kris@localdigitalops.com.</p>}
        </div>
      )}
      <div className="nwi-form-actions">
        {step > 0 && (
          <button
            type="button"
            className="nwi-back"
            disabled={busy}
            onClick={() => move(step - 1)}
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}
        <button type="submit" className="nwi-btn" disabled={busy}>
          {busy ? (
            <>
              <Loader2 size={17} className="nwi-spin" /> Sending your request
            </>
          ) : step === 3 ? (
            <>
              Send my request <Send size={16} />
            </>
          ) : (
            <>
              Continue <ArrowRight size={17} />
            </>
          )}
        </button>
      </div>
      <p className="nwi-form-foot">
        {step === 3
          ? "Your request is saved for review through our existing enquiry system."
          : "No payment details. No obligation to buy."}
      </p>
    </form>
  );
}
