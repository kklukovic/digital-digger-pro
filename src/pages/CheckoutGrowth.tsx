import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Clock, Star, Check, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

const features = [
  "Everything in The 2026 Reset +",
  "Custom Service Estimator Tool",
  "Private Lead Management Dashboard",
  "Your Own Customized Mobile App",
  "Custom Lead Magnet (PDF/Guide)",
  "Priority Support",
];

const CheckoutGrowth = () => {
  useEffect(() => {
    // Load ThriveCart script
    const script = document.createElement("script");
    script.src = "//tinder.thrivecart.com/embed/v2/thrivecart.js";
    script.id = "tc-earnmoon-72-Z0MSCR";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.getElementById("tc-earnmoon-72-Z0MSCR");
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

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

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Order summary */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
                <Star className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">Full Business Scale</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                The{" "}
                <span className="text-gradient">Growth Engine</span>
              </h1>
              
              <p className="text-muted-foreground mb-8">
                Scale your business with advanced tools, your own custom app, and a private lead management dashboard.
              </p>

              {/* Savings badge */}
              <div className="bg-accent/10 border border-accent/30 rounded-lg px-4 py-3 mb-6">
                <span className="text-accent font-semibold block">🎉 3 Months Hosting & Tools Included FREE!</span>
                <span className="text-muted-foreground text-sm">Save $3,000 — Monthly billing starts month 4</span>
              </div>

              {/* Order details card */}
              <div className="glass rounded-2xl p-6 mb-6">
                <h3 className="font-bold text-lg mb-4">What You're Getting:</h3>
                <div className="grid gap-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 text-accent" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-border mt-6 pt-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">One-Time Setup:</span>
                    <span className="text-3xl font-bold text-gradient">$2,500</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Then $1,000/month after 3 free months
                  </p>
                </div>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4 text-accent" />
                  <span>48-Hour Delivery</span>
                </div>
              </div>
            </div>

            {/* Right: ThriveCart Embed Area */}
            <div className="glass rounded-2xl p-8 border-accent/30">
              <h3 className="font-bold text-xl mb-6 text-center">Complete Your Order</h3>
              
              {/* ThriveCart embed */}
              <div 
                className="tc-v2-embeddable-target min-h-[400px]"
                data-thrivecart-account="earnmoon"
                data-thrivecart-tpl="v2"
                data-thrivecart-product="72"
                data-thrivecart-embeddable="tc-earnmoon-72-Z0MSCR"
              />

              <p className="text-center text-sm text-muted-foreground mt-6">
                Questions before ordering?{" "}
                <a 
                  href="https://wa.me/385989821111" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Chat with me on WhatsApp
                </a>
              </p>
            </div>
          </div>

          {/* Limited spots notice */}
          <div className="text-center mt-12 p-6 glass-light rounded-xl max-w-xl mx-auto">
            <p className="text-lg font-semibold mb-2">⚡ Limited Availability</p>
            <p className="text-muted-foreground">
              We build max 2 sites per week to ensure quality and speed. 
              Secure your spot before they're gone!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutGrowth;
