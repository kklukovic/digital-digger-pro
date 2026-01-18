import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Zap, Bot, Star, Smartphone, Clock, ArrowRight, Shield, AlertTriangle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const AcceleratorOffer = () => {
  const stripeLink = "https://buy.stripe.com/your-stripe-link"; // Replace with actual Stripe link

  const features = [
    {
      icon: Smartphone,
      title: "Bespoke Modern Website (Mobile First)",
      description: "A stunning, fast-loading website designed to convert visitors into customers.",
    },
    {
      icon: Bot,
      title: "24/7 AI Sales Assistant",
      description: "Trained on your business to answer questions, capture leads, and book appointments.",
    },
    {
      icon: Star,
      title: "Instant Google Reviews Integration",
      description: "Your best 5-star reviews displayed prominently to build instant trust.",
    },
    {
      icon: Zap,
      title: "Lead Capture Automation (Speed-to-Lead)",
      description: "Instant notifications and automated follow-ups so you never miss a lead.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Simple Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/50 rounded-full px-4 py-2 mb-6">
              <AlertTriangle size={16} className="text-orange-400" />
              <span className="text-orange-400 font-semibold text-sm">NEW YEAR PORTFOLIO BUILDING SPECIAL</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Get a Modern, AI-Powered Website that Works 24/7—
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                For Less Than the Price of a New Phone.
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8">
              Transform your online presence with our complete digital solution.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem-Solution-Value Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Problem */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={24} className="text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-red-400 mb-2">The Problem</h3>
                  <p className="text-gray-300 text-lg">
                    Your current website is a digital business card that just collects dust. 
                    People visit and leave because no one responds to them immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bot size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-400 mb-2">The Solution</h3>
                  <p className="text-gray-300 text-lg">
                    I add an AI brain to your business. Your AI assistant answers questions 
                    while you sleep or work in the field.
                  </p>
                </div>
              </div>
            </div>

            {/* Value */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <TrendingUp size={24} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-green-400 mb-2">The Value</h3>
                  <p className="text-gray-300 text-lg">
                    This is not an expense, it's an investment. If this system brings you 
                    just one new client, it has paid for itself 10 times over.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Offer */}
      <section className="py-12 md:py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The <span className="text-orange-400">$349 Digital Reset</span> Package
            </h2>
            <p className="text-gray-400 text-lg">Everything you need to dominate your local market</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speed to Lead Social Proof */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Why <span className="text-orange-400">Speed to Lead</span> Matters
              </h2>
              
              <div className="flex items-center justify-center mb-6">
                <div className="text-6xl md:text-7xl font-black text-orange-400">78%</div>
              </div>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                of customers buy from the <span className="text-orange-400 font-bold">first responder</span>.
              </p>
              
              <p className="text-gray-400 max-w-2xl mx-auto">
                With our AI Sales Assistant, you're always first. While your competitors are sleeping, 
                busy, or just slow to respond—your AI is engaging leads, answering questions, and booking appointments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-gray-900 border-2 border-orange-500 rounded-3xl p-8 md:p-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent" />
              
              <div className="relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-500/50 rounded-full px-4 py-2 mb-6">
                  <Clock size={16} className="text-red-400" />
                  <span className="text-red-400 font-semibold text-sm">Only 2 Spots Per Industry</span>
                </div>

                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-3xl text-gray-500 line-through">$1,500</span>
                  <span className="text-5xl md:text-6xl font-black text-orange-400">$349</span>
                </div>
                <p className="text-gray-400 mb-8">One-Time Setup • No Hidden Fees</p>

                <a
                  href={stripeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-xl py-6 rounded-xl group">
                    SECURE MY SPOT FOR $349
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>

                <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-sm">
                  <Shield size={16} />
                  <span>Secure payment via Stripe</span>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
              This is a New Year / Portfolio Building special. Limited availability to ensure quality delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 LocalDigitalOps. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AcceleratorOffer;
