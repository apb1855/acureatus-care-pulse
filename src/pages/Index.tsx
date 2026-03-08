import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PillarsSection from "@/components/PillarsSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import TeamSection from "@/components/TeamSection";
import HallOfFameSection from "@/components/HallOfFameSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <HeroSection />
    <PillarsSection />
    <ServicesSection />
    <PricingSection />
    <TeamSection />
    <HallOfFameSection />
    <ContactSection />
    <FAQSection />
    <Footer />
    <FloatingCTA />
  </div>
);

export default Index;
