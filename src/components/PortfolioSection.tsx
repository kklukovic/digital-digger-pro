import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

import portfolioEverest from "@/assets/portfolio-everest.png";
import portfolioMimi from "@/assets/portfolio-mimi.png";
import portfolioPaws from "@/assets/portfolio-paws.png";
import portfolioTipdana from "@/assets/portfolio-tipdana.png";

const projects = [
  {
    title: "TipDana Pro",
    description: "A high-performance sports analytics and premium tipping platform.",
    image: portfolioTipdana,
    url: "https://pro.tipdana.com",
  },
  {
    title: "Everest AI Assistant",
    description: "An intelligent AI-driven virtual assistant for business process automation.",
    image: portfolioEverest,
    url: "https://everest-ai-assistant.lovable.app",
  },
  {
    title: "Paws Care",
    description: "A comprehensive digital booking and management solution for pet care services.",
    image: portfolioPaws,
    url: "https://paws-care.localdigitalops.com/",
  },
  {
    title: "Cook with Mimi",
    description: "A custom-designed culinary blog and recipe platform with optimized user experience.",
    image: portfolioMimi,
    url: "https://cookwithmimi.com/",
  },
];

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="section-padding bg-background/50">
      <div className="container-tight">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Proven Digital Engines
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See how we help businesses scale with custom-built digital solutions.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group glass rounded-2xl overflow-hidden border border-border/50 shadow-card transition-all duration-300 hover:shadow-accent-glow hover:-translate-y-1"
            >
              {/* Image */}
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                <Button asChild variant="hero" size="sm">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    View Live Site
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
