import { XCircle, Smartphone, Calendar, Star } from "lucide-react";

const problems = [
  {
    icon: Smartphone,
    text: "They aren't mobile-friendly",
  },
  {
    icon: Calendar,
    text: "No way for customers to book or request quotes instantly",
  },
  {
    icon: Star,
    text: "They hide your best Google reviews",
  },
];

const ProblemSection = () => {
  return (
    <section className="section-padding relative">
      <div className="container-tight">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
              <XCircle className="w-4 h-4 text-destructive" />
              <span className="text-sm text-muted-foreground">The Problem</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              The "Zombie Website" Problem
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Most local business websites just sit there doing nothing. 
              They look outdated, load slowly, and fail to convert visitors into customers.
            </p>
          </div>

          {/* Problem cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 text-center hover:border-destructive/50 transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-destructive/20 transition-colors">
                  <problem.icon className="w-8 h-8 text-destructive" />
                </div>
                <p className="text-lg font-medium text-foreground">
                  {problem.text}
                </p>
              </div>
            ))}
          </div>

          {/* Visual separator */}
          <div className="flex justify-center mt-16">
            <div className="w-px h-24 bg-gradient-to-b from-destructive/50 to-accent/50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
