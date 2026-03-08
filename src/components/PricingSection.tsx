import { motion } from "framer-motion";
import { IndianRupee } from "lucide-react";
import { clinicData } from "@/data/clinicData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingSection = () => (
  <section id="pricing" className="py-20 md:py-28 bg-background">
    <div className="container max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Transparent Pricing
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Affordable treatments with no hidden charges. Payments via Google Pay, UPI, or Cash.
        </p>
      </motion.div>

      {/* Mobile: Accordion / Desktop: Table */}
      <div className="md:hidden">
        <Accordion type="single" collapsible className="space-y-2">
          {clinicData.treatment_price_list_inr.map((t, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-lg px-4 bg-card">
              <AccordionTrigger className="text-base font-medium text-foreground py-4">
                {t.item}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                  <IndianRupee className="w-4 h-4" />
                  {t.price ? t.price : t.price_range}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="hidden md:block">
        <div className="rounded-xl border border-border overflow-hidden bg-card">
          <table className="w-full">
            <thead>
              <tr className="bg-primary text-primary-foreground">
                <th className="text-left px-6 py-4 font-display font-semibold">Treatment</th>
                <th className="text-right px-6 py-4 font-display font-semibold">Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {clinicData.treatment_price_list_inr.map((t, i) => (
                <tr key={i} className="border-t border-border hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 text-foreground">{t.item}</td>
                  <td className="px-6 py-4 text-right font-semibold text-primary">
                    ₹{t.price ? t.price : t.price_range}
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

export default PricingSection;
