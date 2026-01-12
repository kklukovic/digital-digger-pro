import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Clock, Zap, Check } from "lucide-react";
import Navbar from "@/components/Navbar";

const features = [
  "Custom Mobile-First Design",
  "AI Receptionist Integration",
  "Interactive Lead Capture Tool",
  "Google Reviews Auto-Sync",
  "48-Hour MVP Delivery",
  "Lifetime Updates Support",
];

const Checkout = () => {
  useEffect(() => {
    // Load ThriveCart script
    const script = document.createElement("script");
    script.src = "//tinder.thrivecart.com/embed/v2/thrivecart.js";
    script.id = "tc-earnmoon-71-MEW6Z5";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.getElementById("tc-earnmoon-71-MEW6Z5");
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
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm text-muted-foreground">Secure Checkout</span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Claim Your{" "}
                <span className="text-gradient">Website Spot</span>
              </h1>
              
              <p className="text-muted-foreground mb-8">
                You're one step away from getting a high-converting website that works 24/7 to bring you leads.
              </p>

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
                    <span className="text-lg">Total Investment:</span>
                    <span className="text-3xl font-bold text-gradient">$1,000</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    One-time payment • No monthly fees • Yours forever
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
                data-thrivecart-product="71"
                data-thrivecart-embeddable="tc-earnmoon-71-MEW6Z5"
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

export default Checkout;
