import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap, Smartphone, Bot, Star, Clock, CheckCircle, ArrowRight, Shield, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Accelerator = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 24);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  const stripeLink = "https://buy.stripe.com/fZu3cwaGp5LneQAfOLaR200";

  const faqs = [
    {
      question: "What if I don't like it?",
      answer: "We do revisions until you're 100% satisfied. Your success is our priority.",
    },
    {
      question: "How long does it take to build?",
      answer: "Your system is live in less than 48 hours. We work fast so you can start generating leads immediately.",
    },
    {
      question: "Do I need technical knowledge?",
      answer: "Absolutely not. We handle everything from setup to training. You just focus on your business.",
    },
    {
      question: "What happens after the 3 months of hosting?",
      answer: "After the included 3 months, hosting continues at a minimal monthly rate. We'll discuss options before it expires.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            Local<span className="text-orange-500">Digital</span>Ops
          </Link>
          <div className="flex items-center gap-2 text-orange-500 font-semibold animate-pulse">
            <Clock size={18} />
            <span className="text-sm md:text-base">Limited Spots Remaining</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-8 pb-16 md:pt-12 md:pb-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Urgency badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/50 rounded-full px-4 py-2 mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
              </span>
              <span className="text-orange-400 font-semibold text-sm">2026 NEW YEAR SPECIAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight">
              The 2026 Digital Reset: Your Website Is No Longer a Business Card,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                It's an AI Sales Machine.
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto px-2">
              I am building <span className="text-orange-400 font-bold">2 fully-functional, AI-integrated websites</span> this week 
              for local business owners who want to automate their sales. Get the $1,500 package for just $349.
            </p>

            {/* Countdown Timer */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-8">
              {[
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((item, index) => (
                <div key={index} className="bg-gray-900 border border-orange-500/30 rounded-xl p-3 sm:p-4 min-w-[70px] sm:min-w-[80px]">
                  <div className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-orange-400">
                    {formatTime(item.value)}
                  </div>
                  <div className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wide">{item.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href={stripeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition duration-300 animate-pulse" />
              <button className="relative bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-base sm:text-lg md:text-xl px-6 sm:px-8 md:px-12 py-4 md:py-5 rounded-xl hover:scale-105 transition-all duration-300 flex items-center gap-3">
                SECURE MY SPOT FOR $349
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-12 md:py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            What You Get in Your <span className="text-orange-400">Digital Reset Package</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Smartphone,
                title: "Modern Mobile-First Design",
                description: "Your site will look better than your biggest competitor's. Designed to convert visitors into customers on any device.",
              },
              {
                icon: Bot,
                title: "24/7 AI Sales Agent",
                description: "A chatbot trained on your business data that answers questions and captures leads while you sleep.",
              },
              {
                icon: Star,
                title: "Google Reviews Engine",
                description: "Automatic syncing of your best 5-star reviews to the homepage to build instant trust with visitors.",
              },
            ].map((pillar, index) => (
              <div
                key={index}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8 hover:border-orange-500/50 transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <pillar.icon size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-gray-400">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speed to Lead Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-3xl p-6 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 text-center md:text-left">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <TrendingUp size={48} className="text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Why <span className="text-orange-400">Speed to Lead</span> Matters
                </h2>
                <p className="text-xl text-gray-300 mb-4">
                  <span className="text-orange-400 font-bold text-3xl">78%</span> of customers buy from the business that responds first.
                </p>
                <p className="text-gray-400">
                  Our AI Assistant ensures you are always first. While your competitors are sleeping or busy, 
                  your AI is answering questions, qualifying leads, and booking appointments 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Box */}
      <section className="py-12 md:py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <div className="bg-gray-900 border-2 border-orange-500 rounded-3xl p-6 md:p-10 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent" />
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <span className="inline-block bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
                    LIMITED TIME OFFER
                  </span>
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <span className="text-3xl text-gray-500 line-through">$1,500</span>
                    <span className="text-5xl md:text-6xl font-black text-orange-400">$349</span>
                  </div>
                  <p className="text-gray-400">One-Time Setup Fee</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {[
                    "Modern Mobile-First Design",
                    "AI Assistant Training",
                    "Google Reviews Sync",
                    "Lead Automation Setup",
                    "3 Months Hosting Included",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="text-orange-500 flex-shrink-0" size={20} />
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={stripeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold text-lg py-6 rounded-xl">
                    CLAIM THIS SPOT NOW
                    <ArrowRight className="ml-2" />
                  </Button>
                </a>

                <div className="flex items-center justify-center gap-2 mt-4 text-gray-400 text-sm">
                  <Shield size={16} />
                  <span>Secure payment via Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            Frequently Asked <span className="text-orange-400">Questions</span>
          </h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-gray-900 border border-gray-800 rounded-xl px-6 data-[state=open]:border-orange-500/50"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-orange-400 py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 border-t border-gray-800 pb-24 md:pb-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users size={20} className="text-orange-500" />
            <span className="text-gray-300 text-sm md:text-base">
              Only <span className="text-orange-400 font-bold">2 spots</span> available per industry to ensure quality.
            </span>
          </div>
          <div className="inline-block bg-orange-500/20 border border-orange-500/50 rounded-full px-6 py-2">
            <span className="text-orange-400 font-bold">Current Availability: 1/2</span>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            © 2026 LocalDigitalOps. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Accelerator;
