import { Bot, Calculator, Star, CheckCircle } from "lucide-react";

const solutions = [
  {
    icon: Bot,
    title: "24/7 AI Receptionist",
    description: "An AI assistant that answers FAQs and qualifies leads while you're on a job. Never miss a customer inquiry again.",
    highlights: ["Answers instantly", "Qualifies leads", "Works 24/7"],
  },
  {
    icon: Calculator,
    title: "Interactive Lead Tool",
    description: "A custom 'Price Calculator' or 'Service Estimator' that gets people to leave their contact info willingly.",
    highlights: ["Captures leads", "Engages visitors", "Pre-qualifies jobs"],
  },
  {
    icon: Star,
    title: "Review Integration",
    description: "We automatically pull your 4+ star Google reviews to the front page to build instant trust with new visitors.",
    highlights: ["Auto-synced", "Builds trust", "Social proof"],
  },
];

const SolutionSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
      
      <div className="container-tight relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
              <CheckCircle className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">The Solution</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Your Website Should Be{" "}
              <span className="text-gradient">Your Best Employee</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              The "1-Tool Conversion Engine" — A website that actually works for you, 
              capturing leads and building trust around the clock.
            </p>
          </div>

          {/* Solution cards */}
          <div className="grid gap-8">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 md:p-10 hover:border-accent/50 transition-all duration-300 group"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-xl bg-gradient-accent flex items-center justify-center shrink-0 shadow-accent-glow group-hover:shadow-accent-glow-lg transition-shadow">
                    <solution.icon className="w-8 h-8 text-accent-foreground" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">{solution.title}</h3>
                    <p className="text-muted-foreground mb-4">{solution.description}</p>
                    
                    {/* Highlights */}
                    <div className="flex flex-wrap gap-3">
                      {solution.highlights.map((highlight, hIndex) => (
                        <span
                          key={hIndex}
                          className="px-3 py-1 rounded-full text-sm bg-accent/10 text-accent border border-accent/20"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
