import { motion } from "framer-motion";
import { Zap, Brain, Cpu, Dumbbell, Hand, HeartPulse } from "lucide-react";
import { clinicData } from "@/data/clinicData";

const clinicIcons = [HeartPulse, Cpu, Brain, Dumbbell, Hand];

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-28 bg-muted/50">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Specialized Clinics
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Dedicated treatment wings powered by advanced technology
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinicData.specialized_clinics.map((clinic, i) => {
          const Icon = clinicIcons[i % clinicIcons.length];
          return (
            <motion.div
              key={clinic.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-xl bg-card border border-border"
            >
              <Icon className="w-8 h-8 text-secondary mb-4" />
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{clinic.title}</h3>
              <p className="text-sm text-muted-foreground">{clinic.focus}</p>
              {clinic.partnership && (
                <span className="inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground">
                  Partner: {clinic.partnership}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Technology strip */}
      <div className="mt-16 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">Advanced Technology</p>
        <div className="flex flex-wrap justify-center gap-3">
          {clinicData.advanced_technology.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground"
            >
              <Zap className="w-3.5 h-3.5 text-secondary" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ServicesSection;
