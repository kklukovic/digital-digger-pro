import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import CommandCenterSection from "@/components/CommandCenterSection";
import RoadmapSection from "@/components/RoadmapSection";
import PortfolioSection from "@/components/PortfolioSection";
import PricingSection from "@/components/PricingSection";
import AboutSection from "@/components/AboutSection";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import FAQSection from "@/components/FAQSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIReceptionist from "@/components/AIReceptionist";

const Index = () => {
  return (
    <div className="min-h-screen">
      <PromoBanner />
      <div className="pt-16 md:pt-14">
        <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <CommandCenterSection />
        <RoadmapSection />
        <PortfolioSection />
        <PricingSection />
        <LeadCaptureForm />
        <FAQSection />
        <AboutSection />
      </main>
      <WhatsAppButton />
      <AIReceptionist />
      </div>
    </div>
  );
};

export default Index;
