import { Mail, Phone, MapPin } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="section-padding relative">
      <div className="container-tight">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Avatar/Photo placeholder */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-accent flex items-center justify-center shrink-0 shadow-accent-glow">
                <span className="text-5xl md:text-6xl font-bold text-accent-foreground">K</span>
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Hi, I'm Kreso.
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  I help local businesses in the USA modernize their online presence 
                  without the high cost of traditional agencies. My mission is simple: 
                  give you a website that actually brings in customers, not just looks pretty.
                </p>

                {/* Contact info */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a
                    href="mailto:kreso@localdigitalops.com"
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>kreso@localdigitalops.com</span>
                  </a>
                  <a
                    href="tel:+15551234567"
                    className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>(555) 123-4567</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-sm text-muted-foreground">Serving Local Businesses Across the USA</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 Local Digital Ops. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
