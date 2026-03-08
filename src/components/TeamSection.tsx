import { motion } from "framer-motion";
import { User } from "lucide-react";
import { clinicData } from "@/data/clinicData";

const TeamSection = () => (
  <section id="team" className="py-20 md:py-28 bg-muted/50">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Our Medical Team
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Experienced professionals dedicated to your recovery
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {clinicData.medical_team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center p-6 rounded-xl bg-card border border-border"
          >
            <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h3 className="text-lg font-display font-semibold text-foreground">{member.name}</h3>
            {member.credentials && (
              <p className="text-sm text-secondary font-medium">{member.credentials}</p>
            )}
            <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
            {member.specialization && (
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{member.specialization}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
