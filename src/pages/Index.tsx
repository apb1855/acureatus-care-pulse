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
import BlogPreviewSection from "@/components/BlogPreviewSection";
import FAQSection from "@/components/FAQSection";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import ErrorBoundary from "@/components/ErrorBoundary";

const E = ({ name, children }: { name: string; children: React.ReactNode }) => (
  <ErrorBoundary sectionName={name}>{children}</ErrorBoundary>
);

const Index = () => (
  <div id="main-content" role="main" className="min-h-screen bg-background overflow-y-auto scroll-smooth">
    <E name="Header"><Header /></E>
    <E name="Hero"><HeroSection /></E>
    <E name="Pillars"><PillarsSection /></E>
    <E name="Services"><ServicesSection /></E>
    <E name="Pricing"><PricingSection /></E>
    <E name="Team"><TeamSection /></E>
    {/* <HallOfFameSection /> */}
    <E name="Gallery"><GallerySection /></E>
    <E name="Testimonials"><TestimonialsSection /></E>
    <E name="GoogleReviews"><GoogleReviewsSection /></E>
    <E name="Blog"><BlogPreviewSection /></E>
    <E name="ContactForm"><ContactFormSection /></E>
    <E name="Contact"><ContactSection /></E>
    <E name="FAQ"><FAQSection /></E>
    <E name="Footer"><Footer /></E>
    <E name="FloatingCTA"><FloatingCTA /></E>
    <E name="CookieConsent"><CookieConsent /></E>
  </div>
);

export default Index;
