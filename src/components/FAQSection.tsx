import { Faq5 } from "@/components/ui/faq-5";

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
  return (
    <div id="faq" className="hidden md:block">
      <Faq5
        badge="FAQ"
        heading="Frequently Asked Questions"
        description="Find answers to common questions about our physiotherapy services and treatments."
        faqs={faqs}
      />
    </div>
  );
};

export default FAQSection;
