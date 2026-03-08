import { Badge } from "@/components/ui/badge";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Faq5Props {
  badge?: string;
  heading?: string;
  description?: string;
  faqs?: FaqItem[];
}

export const Faq5 = ({
  badge = "FAQ",
  heading = "Common Questions & Answers",
  description = "Find out all the essential details about our platform and how it can serve your needs.",
  faqs = [],
}: Faq5Props) => {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="flex flex-col items-center gap-4 text-center mb-14">
          <Badge variant="outline" className="text-sm font-medium text-primary border-primary/30">
            {badge}
          </Badge>
          <h2 className="max-w-2xl text-3xl md:text-4xl font-display font-bold text-foreground">
            {heading}
          </h2>
          <p className="text-muted-foreground max-w-xl">
            {description}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="flex gap-5 items-start rounded-xl border border-border bg-card p-6 shadow-sm">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {index + 1}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-base font-semibold text-foreground">
                  {faq.question}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
