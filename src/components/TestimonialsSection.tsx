import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { useI18n } from "@/hooks/useI18n";

const testimonials = [
  {
    quote: "After years of chronic back pain, Acureatus gave me my life back. The AI-powered diagnosis pinpointed my issue in the first session itself.",
    name: "Rajesh Menon",
    designation: "IT Professional, Hyderabad",
    src: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote: "The sports rehabilitation program here is outstanding. I recovered from my ACL injury faster than expected and returned to competitive athletics.",
    name: "Sneha Reddy",
    designation: "National Level Athlete",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote: "The combination of advanced technology and compassionate care sets Acureatus apart. My mother's post-stroke recovery has been remarkable.",
    name: "Arjun Patel",
    designation: "Business Owner, Bangalore",
    src: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote: "I was skeptical about physiotherapy until I visited Acureatus. Their gait analysis technology and personalized treatment plan eliminated my knee pain completely.",
    name: "Meera Krishnan",
    designation: "School Teacher, Chennai",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    quote: "Dr. Chandra and the team are incredibly skilled. The shockwave therapy and cupping sessions resolved my shoulder issue that other clinics couldn't fix.",
    name: "Vikram Singh",
    designation: "Retired Army Officer",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
];

const TestimonialsSection = () => {
  const { t } = useI18n();
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [handleNext]);

  const randomRotate = () => `${Math.floor(Math.random() * 16) - 8}deg`;

  return (
    <section className="py-20 md:py-28 bg-muted/50 relative overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t("testimonials.title")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="relative h-72 md:h-96 w-full">
              <AnimatePresence>
                {testimonials.map((item, index) => (
                  <motion.div
                    key={item.src}
                    initial={{ opacity: 0, scale: 0.9, rotate: randomRotate() }}
                    animate={{
                      opacity: index === active ? 1 : 0.7,
                      scale: index === active ? 1 : 0.95,
                      rotate: index === active ? "0deg" : randomRotate(),
                      zIndex: index === active ? 10 : testimonials.length - Math.abs(index - active),
                    }}
                    exit={{ opacity: 0, scale: 0.9, rotate: randomRotate() }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <img
                      src={item.src}
                      alt={item.name}
                      className="h-full w-full rounded-2xl object-cover object-center border border-border"
                      draggable={false}
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/500x500/e2e8f0/64748b?text=${item.name.charAt(0)}`;
                        e.currentTarget.onerror = null;
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Quote className="w-8 h-8 text-secondary mb-4" />
                  <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
                    "{testimonials[active].quote}"
                  </p>
                  <h3 className="font-display font-semibold text-foreground text-lg">
                    {testimonials[active].name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[active].designation}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={handlePrev}
                  className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
