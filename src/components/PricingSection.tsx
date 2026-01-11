import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const features = [
  "Custom Mobile-First Design",
  "AI Receptionist Integration",
  "Interactive Lead Capture Tool",
  "Google Reviews Auto-Sync",
  "48-Hour Delivery",
  "Lifetime Updates Support",
];

const PricingSection = () => {
  return (
    <section className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container-tight relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">The Offer</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              One-Time Investment.{" "}
              <span className="text-gradient">Zero Monthly Fees.</span>
            </h2>
          </div>

          {/* Pricing card */}
          <div className="glass rounded-3xl p-8 md:p-12 border-accent/30 shadow-accent-glow relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/30 rounded-full blur-[80px]" />
            
            <div className="relative z-10">
              {/* Price */}
              <div className="text-center mb-10">
                <div className="flex items-baseline justify-center gap-2 mb-2">
                  <span className="text-6xl md:text-7xl font-bold text-gradient">$1,000</span>
                </div>
                <p className="text-muted-foreground">One-time payment • No hidden fees • Yours forever</p>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-4 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Claim Your Spot
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  I only build one site per week to ensure quality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
