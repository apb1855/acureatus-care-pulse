import { useState, useEffect, useCallback } from "react";
import { Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { clinicData } from "@/data/clinicData";
import heroBg from "@/assets/hero-bg.jpg";

const heroImages = [
  heroBg,
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&h=1080&fit=crop",
];

const HeroSection = () => {
  const { business_identity } = clinicData;
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % heroImages.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background images - all rendered, only current visible */}
      {heroImages.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(213,100%,19%)]/90 via-[hsl(213,100%,19%)]/70 to-[hsl(213,100%,19%)]/40" />
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === current ? "bg-secondary w-6" : "bg-primary-foreground/40"
            }`}
          />
        ))}
      </div>

      <div className="container relative z-10 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/15 backdrop-blur-sm border border-white/20 mb-6">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-sm font-medium text-white">
              {business_identity.rating}★ Trusted by {business_identity.review_count}+ Patients
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
            Moving from symptomatic relief to{" "}
            <span className="text-secondary dark:text-[hsl(197,71%,73%)]">root-cause cure</span>
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-8 font-body leading-relaxed">
            AI-powered diagnostics combined with advanced physiotherapy for lasting pain relief.
            An initiative of Sharp Insight Rehabilitation Research Centre.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+917996217888"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-lg bg-card text-primary dark:bg-white dark:text-[hsl(213,100%,19%)] font-semibold text-base hover:bg-card/90 dark:hover:bg-white/90 transition min-h-[48px]"
            >
              Book Appointment
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-lg border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-base hover:bg-primary-foreground/10 transition min-h-[48px]"
            >
              Explore Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
