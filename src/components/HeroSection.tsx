import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import ContactModal from "@/components/ContactModal";

const HeroSection = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToPricing = () => {
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center section-padding overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-glow-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-primary/20 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: '1.5s' }} />
        
        <div className="container-tight relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">For Local Service Businesses</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              I Build High-Performance{" "}
              <span className="text-gradient">Websites & AI Lead-Capture Systems</span>{" "}
              for Service Businesses
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              Stop losing customers to a "zombie website" that doesn't work for you. 
              I'll rebuild your site into a <strong className="text-foreground">modern, 24/7 lead-capture engine</strong> in 48 hours.{" "}
              <span className="text-accent font-semibold">Zero monthly fees. No hidden costs.</span>
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <Button variant="hero" size="xl" onClick={() => setContactOpen(true)}>
                Get My Free Mockup
                <ArrowRight className="w-5 h-5" />
              </Button>
              <a href="#portfolio">
                <Button variant="heroOutline" size="xl">
                  See My Work
                </Button>
              </a>
            </div>

            {/* Trust badges */}
            <div className="mt-16 flex flex-wrap justify-center gap-8 text-muted-foreground animate-fade-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-glow-pulse" />
                <span className="text-sm">Speed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-glow-pulse" style={{ animationDelay: '0.5s' }} />
                <span className="text-sm">Results</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-glow-pulse" style={{ animationDelay: '1s' }} />
                <span className="text-sm">24/7 Lead Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactModal open={contactOpen} onOpenChange={setContactOpen} />
    </>
  );
};

export default HeroSection;
