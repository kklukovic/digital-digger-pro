import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap, Download, User, Briefcase, HelpCircle, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    setMobileMenuOpen(false);
    if (location.pathname === "/") {
      const pricingSection = document.getElementById("pricing");
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#pricing");
    }
  };

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname === "/") {
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  const navLinks = [
    { label: "Our Work", id: "portfolio", icon: Briefcase },
    { label: "About", id: "about", icon: User },
    { label: "FAQ", id: "faq", icon: HelpCircle },
  ];

  return (
    <nav className="fixed top-[88px] md:top-[64px] left-0 right-0 z-40 glass">
      <div className="container-tight">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-accent flex items-center justify-center">
              <Zap className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="font-bold text-lg">Local Digital Ops</span>
          </Link>

          {/* Desktop Nav items */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Link 
              to="/free-guide"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <Download className="w-4 h-4" />
              Free Guide
            </Link>
            <Button variant="hero" size="default" onClick={handleGetStarted}>
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-accent transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border/50 px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors w-full py-2"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </button>
            ))}
            <Link 
              to="/free-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors py-2"
            >
              <Download className="w-4 h-4" />
              Free Guide
            </Link>
            <Button variant="hero" size="default" onClick={handleGetStarted} className="w-full mt-2">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
