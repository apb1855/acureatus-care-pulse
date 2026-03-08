import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PillarsSection from "@/components/PillarsSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import TeamSection from "@/components/TeamSection";
import HallOfFameSection from "@/components/HallOfFameSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-background snap-y snap-mandatory overflow-y-auto h-screen scroll-smooth">
    <Header />
    <div className="snap-start"><HeroSection /></div>
    <div className="snap-start"><PillarsSection /></div>
    <div className="snap-start"><ServicesSection /></div>
    <div className="snap-start"><PricingSection /></div>
    <div className="snap-start"><TeamSection /></div>
    <div className="snap-start"><HallOfFameSection /></div>
    <div className="snap-start"><GallerySection /></div>
    <div className="snap-start"><TestimonialsSection /></div>
    <div className="snap-start"><ContactSection /></div>
    <div className="snap-start"><FAQSection /></div>
    <div className="snap-start"><Footer /></div>
    <FloatingCTA />
  </div>
);

export default Index;
