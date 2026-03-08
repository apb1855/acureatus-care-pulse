import { motion } from "framer-motion";
import { Trophy, Star } from "lucide-react";
import { clinicData } from "@/data/clinicData";

const HallOfFameSection = () => {
  const { hall_of_fame } = clinicData;
  return (
    <section className="py-20 md:py-28 bg-primary">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-6">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="text-sm font-medium text-primary-foreground">World Record Holder</span>
          </div>

          <Trophy className="w-16 h-16 text-gold mx-auto mb-6" />

          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            {hall_of_fame.athlete}
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-4">
            {hall_of_fame.achievement}
          </p>
          <p className="text-base text-secondary italic">
            "{hall_of_fame.clinic_role}"
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HallOfFameSection;
