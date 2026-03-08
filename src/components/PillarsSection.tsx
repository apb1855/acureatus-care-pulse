import { motion } from "framer-motion";
import { Shield, Scale, Heart, Activity } from "lucide-react";
import { clinicData } from "@/data/clinicData";

const iconMap = [Shield, Scale, Heart, Activity];
const descMap = [
  "Preventive care to strengthen your body before issues arise",
  "Restore stability and coordination for confident movement",
  "Advanced non-invasive techniques for lasting pain freedom",
  "AI-powered gait and motion analysis for precise diagnosis",
];

const PillarsSection = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Our Four Pillars
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          A holistic approach to physiotherapy built on four foundational principles
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {clinicData.core_pillars.map((pillar, i) => {
          const Icon = iconMap[i];
          return (
            <motion.div
              key={pillar}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-xl bg-card border border-border hover:border-secondary hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="w-14 h-14 rounded-lg bg-secondary/20 flex items-center justify-center mb-4 group-hover:bg-secondary/40 transition-colors">
                <Icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{pillar}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{descMap[i]}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default PillarsSection;
