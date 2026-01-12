import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Download } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGetStarted = () => {
    if (location.pathname === "/") {
      const pricingSection = document.getElementById("pricing");
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#pricing");
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container-tight">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-bold text-lg">Local Digital Ops</span>
          </Link>

          {/* Nav items */}
          <div className="flex items-center gap-4">
            <Link 
              to="/free-guide"
              className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <Download className="w-4 h-4" />
              Free Guide
            </Link>
            <Button variant="hero" size="default" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
