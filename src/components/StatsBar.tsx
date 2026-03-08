import AnimatedCounter from "@/components/AnimatedCounter";
import ScrollReveal from "@/components/ScrollReveal";
import { useI18n } from "@/hooks/useI18n";

const StatsBar = () => {
  const { t } = useI18n();

  const stats = [
    { end: 3, suffix: "+", label: t("stats.yearsExperience") },
    { end: 56, suffix: "+", label: t("stats.happyPatients") },
    { end: 6, suffix: "", label: t("stats.advancedTech") },
    { end: 5, suffix: "", label: t("stats.specializedClinics") },
  ];

  return (
    <ScrollReveal delay={0.3}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-3xl md:text-4xl font-display font-bold text-white">
              <AnimatedCounter end={stat.end} suffix={stat.suffix} duration={1.5} />
            </div>
            <p className="text-sm text-white/70 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </ScrollReveal>
  );
};

export default StatsBar;
