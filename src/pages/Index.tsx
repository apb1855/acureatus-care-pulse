import { lazy, Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ErrorBoundary from "@/components/ErrorBoundary";

const PillarsSection = lazy(() => import("@/components/PillarsSection"));
const ServicesSection = lazy(() => import("@/components/ServicesSection"));
const PricingSection = lazy(() => import("@/components/PricingSection"));
const TeamSection = lazy(() => import("@/components/TeamSection"));
const GallerySection = lazy(() => import("@/components/GallerySection"));
const TestimonialsSection = lazy(() => import("@/components/TestimonialsSection"));
const GoogleReviewsSection = lazy(() => import("@/components/GoogleReviewsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));
const ContactFormSection = lazy(() => import("@/components/ContactFormSection"));
const BlogPreviewSection = lazy(() => import("@/components/BlogPreviewSection"));
const FAQSection = lazy(() => import("@/components/FAQSection"));
const FloatingCTA = lazy(() => import("@/components/FloatingCTA"));
const Footer = lazy(() => import("@/components/Footer"));
const CookieConsent = lazy(() => import("@/components/CookieConsent"));

const E = ({ name, children }: { name: string; children: React.ReactNode }) => (
  <ErrorBoundary sectionName={name}>{children}</ErrorBoundary>
);

const SectionFallback = () => (
  <div className="py-20 flex items-center justify-center">
    <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const Index = () => (
  <div id="main-content" role="main" className="min-h-screen bg-background overflow-y-auto scroll-smooth">
    <E name="Header"><Header /></E>
    <E name="Hero"><HeroSection /></E>
    <Suspense fallback={<SectionFallback />}>
      <E name="Pillars"><PillarsSection /></E>
      <E name="Services"><ServicesSection /></E>
      <E name="Pricing"><PricingSection /></E>
      <E name="Team"><TeamSection /></E>
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
    </Suspense>
  </div>
);

export default Index;
