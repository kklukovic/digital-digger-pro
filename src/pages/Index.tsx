import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import PricingSection from "@/components/PricingSection";
import AboutSection from "@/components/AboutSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIReceptionist from "@/components/AIReceptionist";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <PricingSection />
        <AboutSection />
      </main>
      <WhatsAppButton />
      <AIReceptionist />
    </div>
  );
};

export default Index;
