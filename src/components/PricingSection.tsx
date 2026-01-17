import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Star, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const pricingTiers = [
  {
    name: "The 2026 Reset",
    focus: "Best for New Foundations",
    price: "$1,000",
    setup: "one-time setup",
    monthly: "$250/mo",
    monthlyNote: "after 6 months",
    highlight: "6 Months Hosting & AI Included FREE!",
    highlightNote: "Just pay $1,000 today — hosting starts month 7",
    icon: Zap,
    features: [
      "Full Mobile-First Redesign",
      "AI Receptionist (6 Mo Free)",
      "Auto-Sync Google Reviews",
      "Lead Redirection (SMS/Email)",
      "30 Days Ready-to-Post Content",
      "48-Hour Delivery",
    ],
    popular: false,
    cta: "Start Here",
    isEnterprise: false,
  },
  {
    name: "The Growth Engine",
    focus: "Full Business Scale",
    price: "$2,500",
    setup: "one-time setup",
    monthly: "$1,000/mo",
    monthlyNote: "after 3 months",
    highlight: "3 Months Hosting & Tools Included FREE!",
    highlightNote: "Just pay $2,500 today — monthly starts month 4",
    icon: Star,
    features: [
      "Everything in Reset +",
      "Custom Service Estimator Tool",
      "Private Lead Management Dashboard",
      "Your Own Customized Mobile App",
      "Custom Lead Magnet (PDF/Guide)",
      "Priority Support",
    ],
    popular: true,
    cta: "Scale My Business",
    isEnterprise: false,
  },
  {
    name: "The AI Enterprise",
    focus: "For Serious Operators",
    price: "$7,500",
    setup: "one-time setup",
    monthly: "$2,000/mo",
    monthlyNote: "after 3 months",
    highlight: "3 Months Full Management Included FREE!",
    highlightNote: "Just pay $7,500 today — monthly starts month 4",
    icon: Crown,
    features: [
      "Everything in Growth +",
      "AI Voice Phone Assistant",
      "Email List Re-activation",
      "Complex Zapier/Make Automations",
      "Full Monthly Management",
      "Dedicated Account Manager",
    ],
    popular: false,
    cta: "Contact for Custom Quote",
    isEnterprise: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="section-padding relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container-tight relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Pricing</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Choose Your{" "}
            <span className="text-gradient">Growth Level</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            One-time investment to modernize your business. Pick the level that fits your ambition.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pricingTiers.map((tier, index) => {
            const IconComponent = tier.icon;
            return (
              <div
                key={index}
                className={`glass rounded-3xl p-6 lg:p-8 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                  tier.popular 
                    ? "border-accent/50 shadow-accent-glow ring-2 ring-accent/30" 
                    : "border-border/50"
                }`}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-4 py-1 text-sm font-semibold rounded-bl-xl">
                    Most Popular
                  </div>
                )}
                
                {/* Glow effect for popular */}
                {tier.popular && (
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/30 rounded-full blur-[80px]" />
                )}
                
                <div className="relative z-10">
                  {/* Icon and name */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tier.popular ? "bg-accent/20" : "bg-muted"
                    }`}>
                      <IconComponent className={`w-5 h-5 ${tier.popular ? "text-accent" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground">{tier.focus}</p>
                    </div>
                  </div>

                  {/* Highlight badge */}
                  {tier.highlight && (
                    <div className="mt-4 bg-accent/10 border border-accent/30 rounded-lg px-3 py-2 text-center">
                      <span className="text-accent font-semibold text-sm block">{tier.highlight}</span>
                      {tier.highlightNote && (
                        <span className="text-muted-foreground text-xs mt-1 block">{tier.highlightNote}</span>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="mt-6 mb-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl lg:text-5xl font-bold text-gradient">{tier.price}</span>
                      <span className="text-muted-foreground text-sm">{tier.setup}</span>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className="text-foreground font-medium">{tier.monthly}</span>
                      <span className="text-muted-foreground"> {tier.monthlyNote}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          tier.popular ? "bg-accent/20" : "bg-muted"
                        }`}>
                          <Check className={`w-3 h-3 ${tier.popular ? "text-accent" : "text-muted-foreground"}`} />
                        </div>
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="mt-8">
                    {tier.isEnterprise ? (
                      <a href="mailto:kris@localdigitalops.com?subject=AI%20Enterprise%20Custom%20Quote">
                        <Button 
                          variant="heroOutline" 
                          size="lg" 
                          className="w-full"
                        >
                          {tier.cta}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </a>
                    ) : (
                      <Link to="/checkout">
                        <Button 
                          variant={tier.popular ? "hero" : "heroOutline"} 
                          size="lg" 
                          className="w-full"
                        >
                          {tier.cta}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p className="text-center text-sm text-muted-foreground mt-10">
          We build max 2 sites per week to ensure quality and speed. All plans include lifetime ownership.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
