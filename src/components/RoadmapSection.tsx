import { Search, Wrench, FileText, Rocket } from "lucide-react";

const steps = [
  {
    day: "Day 1",
    title: "Discovery",
    description: "We define your goals and train your AI",
    icon: Search,
  },
  {
    day: "Day 3",
    title: "The Build",
    description: "Your site is redesigned and tools are synced",
    icon: Wrench,
  },
  {
    day: "Day 5",
    title: "Content & Ops",
    description: "We deliver your social plan and dashboard",
    icon: FileText,
  },
  {
    day: "Day 7",
    title: "Launch",
    description: "Your new system starts capturing leads",
    icon: Rocket,
  },
];

const RoadmapSection = () => {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent" />
      
      <div className="container-tight relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            From Old Site to{" "}
            <span className="text-gradient">Lead Machine</span>{" "}
            in 7 Days
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A clear, simple process to transform your online presence
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
          
          {/* Steps grid */}
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative">
                  {/* Mobile connection line */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden absolute top-24 left-1/2 w-0.5 h-8 bg-accent/30 -translate-x-1/2" />
                  )}
                  
                  {/* Step card */}
                  <div className="text-center group">
                    {/* Icon circle */}
                    <div className="relative mx-auto w-24 h-24 mb-6">
                      <div className="absolute inset-0 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-colors duration-300" />
                      <div className="absolute inset-2 glass rounded-full flex items-center justify-center border border-accent/30 group-hover:border-accent/50 transition-colors duration-300">
                        <IconComponent className="w-8 h-8 text-accent" />
                      </div>
                      {/* Day badge */}
                      <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded-full">
                        {step.day}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer text */}
        <div className="mt-16 text-center glass rounded-2xl p-8 max-w-2xl mx-auto">
          <p className="text-lg text-foreground">
            I'm <strong className="text-accent">Kris</strong>, your tech partner. 
            Me and my team work with only <strong className="text-accent">2 businesses per week</strong> to 
            ensure your site is perfect.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
