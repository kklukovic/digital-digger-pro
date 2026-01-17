import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, CheckCircle, Smartphone, Clock, MessageSquare, Star, Zap as ZapIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

const auditSteps = [
  {
    number: 1,
    title: 'The "Mobile-First" Rule',
    problem: "Over 80% of local service searches happen on a smartphone. If your site is slow, hard to read, or the buttons are too small to click with a thumb, customers will leave in seconds.",
    fix: "Open your site on your phone right now. Can you find your phone number and \"Book Now\" button without scrolling? If not, you're losing money.",
    icon: Smartphone,
  },
  {
    number: 2,
    title: "The 3-Second Offer",
    problem: "When someone lands on your page, they need to know exactly what you do and where you do it within 3 seconds.",
    fix: "Your main headline (the \"Hero\" section) should follow this formula: [Service] in [City/Area]. Example: \"Professional Pool Cleaning & Maintenance in Scottsdale.\"",
    icon: Clock,
  },
  {
    number: 3,
    title: "Friction-Free Contact",
    problem: "Making a customer hunt for a contact form or a phone number is \"friction.\" Most businesses bury their contact info at the very bottom.",
    fix: "Put a \"Click to Call\" button or a \"Request a Quote\" button in the top right corner of every single page. It should be a different color than the rest of the site so it stands out.",
    icon: MessageSquare,
  },
  {
    number: 4,
    title: 'The "Social Proof" Engine',
    problem: "Customers don't trust what you say about your business; they trust what other people say.",
    fix: "Don't just have a \"Testimonials\" page that no one visits. Feature your 4+ star Google rating and your top 3 reviews directly on your homepage. This builds instant trust.",
    icon: Star,
  },
  {
    number: 5,
    title: 'Stop the "PDF" Boringness (Interactive Lead Capture)',
    problem: "Giving away a boring PDF or just having a \"Contact Us\" form isn't enough anymore.",
    fix: "Give them a reason to engage. Use an interactive tool like a Price Calculator, a Service Scorecard, or an AI Receptionist that answers their questions 24/7 while you are out on a job.",
    icon: ZapIcon,
  },
];

const FreebieDownload = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 section-padding">
        <div className="container-tight">
          {/* Back link */}
          <Link 
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
              <Download className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Free Resource</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              The Local Business Website{" "}
              <span className="text-gradient">Conversion Audit</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              5 Steps to More Leads
            </p>
          </div>

          {/* Intro */}
          <div className="glass rounded-2xl p-6 md:p-8 mb-12 max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Most local websites are <strong className="text-foreground">"zombie sites"</strong>—they exist, 
              but they don't actually do anything to grow the business. Use this checklist to see if your 
              website is working for you or against you.
            </p>
          </div>

          {/* Audit Steps */}
          <div className="space-y-8 max-w-3xl mx-auto">
            {auditSteps.map((step) => (
              <div key={step.number} className="glass rounded-2xl p-6 md:p-8 hover:border-accent/30 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0">
                    <step.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <span className="text-accent font-mono text-sm">Step {step.number}</span>
                    <h3 className="text-xl md:text-2xl font-bold">{step.title}</h3>
                  </div>
                </div>
                
                <div className="space-y-4 ml-0 md:ml-16">
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <p className="text-sm font-semibold text-destructive mb-1">❌ The Problem:</p>
                    <p className="text-muted-foreground">{step.problem}</p>
                  </div>
                  
                  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                    <p className="text-sm font-semibold text-accent mb-1">✅ The Fix:</p>
                    <p className="text-foreground">{step.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center glass rounded-2xl p-8 md:p-12 max-w-3xl mx-auto border-accent/30">
            <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want a Pro to Do the Heavy Lifting?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              If you don't have the time to fix these yourself, I specialize in building high-performance, 
              mobile-optimized sites for local pros that include <strong className="text-foreground">AI Lead Capture as standard</strong>.
            </p>
            <Link to="/checkout">
              <Button variant="hero" size="xl">
                Get Your Site Built
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Kris Klukovic | localdigitalops.com
              <br />
              <span className="text-accent">Helping local businesses modernize and automate.</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FreebieDownload;
