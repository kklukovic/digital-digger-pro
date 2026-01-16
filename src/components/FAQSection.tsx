import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";

const faqs = [
  {
    question: "How much does this cost?",
    answer:
      "I build the demo for free. If you love it and want to launch, we discuss a flat one-time fee. No hidden costs, no monthly subscriptions unless you want ongoing support.",
  },
  {
    question: "How long does it take?",
    answer:
      "I usually have your demo ready in 24-48 hours. Once you approve it, launching takes just a few days depending on how many revisions you'd like.",
  },
  {
    question: "What do I actually get?",
    answer:
      "A mobile-first website, a 24/7 AI booking assistant, and your Google reviews synced automatically. Everything you need to look professional and convert more visitors into customers.",
  },
  {
    question: "Do I need any technical skills?",
    answer:
      "Not at all. I handle everything from design to deployment. You just provide your business info and preferences, and I take care of the rest.",
  },
  {
    question: "Can I see examples of your work?",
    answer:
      "Absolutely! Check out the 'Our Work' section above to see live examples of websites I've built for other businesses.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="section-padding bg-background">
      <div className="container-tight">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              Questions?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Got questions? I've got answers.
            </p>
          </div>

          {/* Chat-style FAQ */}
          <div className="glass rounded-2xl border border-border/50 shadow-card overflow-hidden">
            {/* Chat Header */}
            <div className="bg-card/80 border-b border-border/50 px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Kreso's Assistant</p>
                <p className="text-sm text-muted-foreground">Usually replies instantly</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">Online</span>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="p-4 md:p-6">
              <Accordion type="single" collapsible className="space-y-3">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border/30 rounded-xl overflow-hidden bg-card/30 data-[state=open]:bg-card/60 transition-colors"
                  >
                    <AccordionTrigger className="px-5 py-4 text-left hover:no-underline hover:bg-accent/5 transition-colors [&[data-state=open]>svg]:text-accent">
                      <span className="text-foreground font-medium pr-4">
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-accent font-bold text-sm">K</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
