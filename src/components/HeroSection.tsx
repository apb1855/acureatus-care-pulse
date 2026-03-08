import { Star, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { clinicData } from "@/data/clinicData";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const { business_identity } = clinicData;

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
      </div>

      <div className="container relative z-10 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          {/* Social proof badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/15 backdrop-blur-sm border border-primary-foreground/20 mb-6">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-sm font-medium text-primary-foreground">
              {business_identity.rating}★ Trusted by {business_identity.review_count}+ Patients
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Moving from symptomatic relief to{" "}
            <span className="text-secondary">root-cause cure</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 font-body leading-relaxed">
            AI-powered diagnostics combined with advanced physiotherapy for lasting pain relief.
            An initiative of Sharp Insight Rehabilitation Research Centre.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:+917996217888"
              className="inline-flex items-center justify-center gap-2 h-14 px-8 rounded-lg bg-card text-primary font-semibold text-base hover:bg-card/90 transition min-h-[48px]"
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
