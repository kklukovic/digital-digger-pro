import { Phone, MessageCircle } from "lucide-react";
import kresoPhoto from "@/assets/kreso-photo.png";

const AboutSection = () => {

  return (
    <section className="section-padding relative">
      <div className="container-tight">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              {/* Photo */}
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shrink-0 shadow-accent-glow ring-2 ring-accent/30">
                <img 
                  src={kresoPhoto} 
                  alt="Kris Klukovic" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Hi, I'm Kris.
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  I help local businesses in the USA modernize their online presence 
                  without the high cost of traditional agencies. My mission is simple: 
                  give you a website that actually brings in customers, not just looks pretty.
                </p>

                {/* Contact Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <a
                    href="https://wa.me/385989821111"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ backgroundColor: '#25D366' }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Message us on WhatsApp</span>
                  </a>
                  <a
                    href="tel:+385989821111"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold bg-accent text-accent-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call us now</span>
                  </a>
                </div>

                <p className="text-sm text-muted-foreground mt-4 italic">
                  Have questions before ordering? I'm looking forward to helping you!
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 pt-8 border-t border-border">
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
