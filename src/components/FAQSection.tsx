import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import FAQBlock from "@/components/ui/faq-block";

const faqs = [
  {
    question: "Can a physiotherapist run a private practice?",
    answer: "Yes, physiotherapists can open their own practice or choose to work in a hospital or healthcare centre.",
  },
  {
    question: "Does Acureatus Ai Physio Pain Clinic in Kadri offers treatment at home?",
    answer: "Yes, some physiotherapists provide home visit facilities to patients with severe conditions. You can reach out to Acureatus Ai Physio Pain Clinic for more details on this.",
  },
  {
    question: "How can I book an appointment at Acureatus Ai Physio Pain Clinic?",
    answer: "To book an appointment at Acureatus Ai Physio Pain Clinic, you can call on the number provided during their working hours from Monday to Saturday, 9:00 am - 8:00 pm. They are closed on Sundays.",
  },
  {
    question: "How much does Acureatus Ai Physio Pain Clinic charge for a physiotherapy session?",
    answer: "For details regarding the charges of a physiotherapy session, you can get in touch with Acureatus Ai Physio Pain Clinic in Mangalore.",
  },
  {
    question: "What are the different treatment methods used by physiotherapists?",
    answer: "Treatment methods such as stretches and exercise, mobilisation, magnetic therapy, hydrotherapy, etc. are given at these centres. Mechanical and electrotherapy devices are used by physiotherapists for treating their patients.",
  },
  {
    question: "Can physiotherapists perform surgery?",
    answer: "No, physiotherapists cannot perform surgeries. They come into the picture primarily pre-operation and post-operation in order to restore natural bodily movement.",
  },
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="flex flex-col items-center gap-4 text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-xl text-sm md:text-base">
            Find answers to common questions about our physiotherapy services and treatments.
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-2 flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            aria-expanded={expanded}
          >
            {expanded ? (
              <>
                <Minus className="w-5 h-5" /> Hide FAQs
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" /> Show FAQs
              </>
            )}
          </button>
        </div>
        {expanded && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-top-4 duration-300">
            <FAQBlock faqs={faqs} />
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
