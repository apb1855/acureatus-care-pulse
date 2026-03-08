import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PillarsSection from "@/components/PillarsSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import TeamSection from "@/components/TeamSection";
import HallOfFameSection from "@/components/HallOfFameSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import ContactSection from "@/components/ContactSection";
import ContactFormSection from "@/components/ContactFormSection";
import FAQSection from "@/components/FAQSection";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const Index = () => (
  <div id="main-content" role="main" className="min-h-screen bg-background overflow-y-auto scroll-smooth">
    <Header />
    <HeroSection />
    <PillarsSection />
    <ServicesSection />
    <PricingSection />
    <TeamSection />
    {/* <HallOfFameSection /> */}
    <GallerySection />
    <TestimonialsSection />
    <GoogleReviewsSection />
    <ContactFormSection />
    <ContactSection />
    <FAQSection />
    <Footer />
    <FloatingCTA />
    <CookieConsent />
  </div>
);

export default Index;
