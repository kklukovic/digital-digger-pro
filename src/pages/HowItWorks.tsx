import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Zap, FileText, Rocket, Check, Clock, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";

const steps = [
  {
    number: "01",
    title: "Order Your MVP",
    description: "Choose the package that fits your needs and complete your order. We'll send you a quick questionnaire to understand your business.",
    icon: FileText,
    accent: "from-accent to-accent/50",
  },
  {
    number: "02",
    title: "Quick Discovery",
    description: "Share your business details, logo, photos, and any specific requests. The more you share, the better your site will be.",
    icon: Sparkles,
    accent: "from-primary to-primary/50",
  },
  {
    number: "03",
    title: "48-Hour MVP Delivery",
    description: "Within 48 hours, you'll receive your MVP website preview. Review it, test it, and let us know what you think.",
    icon: Clock,
    accent: "from-accent to-primary",
  },
  {
    number: "04",
    title: "Revisions & Polish",
    description: "We'll refine the site based on your feedback. Want different colors? New photos? Different copy? We've got you covered.",
    icon: Check,
    accent: "from-primary to-accent",
  },
  {
    number: "05",
    title: "Launch to Your Domain",
    description: "Once you're happy, we set up your site on your custom domain with full SSL security. You're live and ready to capture leads!",
    icon: Rocket,
    accent: "from-accent to-accent/50",
  },
];

const HowItWorks = () => {
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
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Simple 5-Step Process</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              From Order to{" "}
              <span className="text-gradient">Live Website</span>{" "}
              in Days, Not Months
            </h1>
            <p className="text-lg text-muted-foreground">
              No back-and-forth emails for weeks. No confusing processes. 
              Here's exactly how we'll build your high-converting website.
            </p>
          </div>

          {/* Steps */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent via-primary to-accent/20 hidden md:block" />
            
            <div className="space-y-8 md:space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step content */}
                  <div className={`flex-1 ${index % 2 === 1 ? "md:text-right" : ""}`}>
                    <div className="glass rounded-2xl p-6 md:p-8 hover:border-accent/30 transition-all duration-300">
                      <div className={`flex items-center gap-4 mb-4 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.accent} flex items-center justify-center shadow-lg`}>
                          <step.icon className="w-6 h-6 text-accent-foreground" />
                        </div>
                        <span className="text-4xl font-bold text-accent/30">{step.number}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-accent shadow-accent-glow hidden md:block" />
                  
                  {/* Empty space for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16 pt-16 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              We build max 2 sites per week to ensure quality and speed. 
              Claim your spot now and get your MVP in 48 hours.
            </p>
            <Link to="/checkout">
              <Button variant="hero" size="xl">
                Claim Your Spot
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;
