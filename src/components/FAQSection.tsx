import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Can a physiotherapist run a private practice?",
    a: "Yes, physiotherapists can open their own practice or choose to work in a hospital or healthcare centre.",
  },
  {
    q: "Does Acureatus Ai Physio Pain Clinic in Kadri offers treatment at home?",
    a: "Yes, some physiotherapists provide home visit facilities to patients with severe conditions. You can reach out to Acureatus Ai Physio Pain Clinic for more details on this.",
  },
  {
    q: "How can I book an appointment at Acureatus Ai Physio Pain Clinic?",
    a: "To book an appointment at Acureatus Ai Physio Pain Clinic, you can call on the number provided during their working hours from Monday to Saturday, 9:00 am - 8:00 pm. They are closed on Sundays.",
  },
  {
    q: "How much does Acureatus Ai Physio Pain Clinic charge for a physiotherapy session?",
    a: "For details regarding the charges of a physiotherapy session, you can get in touch with Acureatus Ai Physio Pain Clinic in Mangalore.",
  },
  {
    q: "What are the different treatment methods used by physiotherapists?",
    a: "Treatment methods such as stretches and exercise, mobilisation, magnetic therapy, hydrotherapy, etc. are given at these centres. Mechanical and electrotherapy devices are used by physiotherapists for treating their patients.",
  },
  {
    q: "Can physiotherapists perform surgery?",
    a: "No, physiotherapists cannot perform surgeries. They come into the picture primarily pre-operation and post-operation in order to restore natural bodily movement.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 md:py-28 bg-muted/30">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border bg-card rounded-xl px-5 shadow-sm"
              >
                <AccordionTrigger className="text-left text-foreground font-medium text-sm md:text-base hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
