import { motion } from "framer-motion";
import { clinicData } from "@/data/clinicData";
import { useI18n } from "@/hooks/useI18n";
import ScrollReveal from "@/components/ScrollReveal";

const PricingSection = () => {
  const { t } = useI18n();

  return (
    <section id="pricing" className="py-20 md:py-28 bg-background">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t("pricing.title")}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </motion.div>

        <div className="rounded-xl border border-border overflow-hidden bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="text-left px-4 md:px-6 py-3 md:py-4 font-display font-semibold text-sm md:text-base">{t("pricing.treatment")}</th>
                  <th className="text-right px-4 md:px-6 py-3 md:py-4 font-display font-semibold text-sm md:text-base">{t("pricing.price")}</th>
                </tr>
              </thead>
              <tbody>
                {clinicData.treatment_price_list_inr.map((item, i) => (
                  <tr key={i} className="border-t border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-foreground">{item.item}</td>
                    <td className="px-4 md:px-6 py-3 md:py-4 text-right text-sm md:text-base font-semibold text-primary">
                      ₹{item.price ? item.price : item.price_range}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          {clinicData.payment_options.map((opt) => (
            <span key={opt} className="px-4 py-2 rounded-full bg-muted text-sm font-medium text-muted-foreground">
              {opt}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
