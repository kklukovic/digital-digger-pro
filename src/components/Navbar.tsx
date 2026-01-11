import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container-tight">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-bold text-lg">Local Digital Ops</span>
          </a>

          {/* CTA */}
          <Button variant="hero" size="default">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
