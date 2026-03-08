import { forwardRef } from "react";
import { Shield, Scale, Heart, Activity } from "lucide-react";
import { Feature108 } from "@/components/ui/feature108";
import { useI18n } from "@/hooks/useI18n";

const PillarsSection = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useI18n();

  const pillarTabs = [
    {
      value: "prehabilitation",
      icon: <Shield className="h-auto w-4 shrink-0" />,
      label: "Prehabilitation",
      content: {
        badge: "Prevention First",
        title: "Strengthen Before Issues Arise",
        description: "Our prehabilitation programs focus on preventive care — identifying weaknesses and imbalances early to build resilience and reduce injury risk before problems develop.",
        buttonText: "Learn More",
        imageSrc: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop",
        imageAlt: "Prehabilitation physiotherapy session",
      },
    },
    {
      value: "balance",
      icon: <Scale className="h-auto w-4 shrink-0" />,
      label: "Balance Training",
      content: {
        badge: "Stability & Control",
        title: "Restore Coordination & Confidence",
        description: "Advanced balance training protocols using coordination boards and AI-guided analysis to restore stability, prevent falls, and build confident movement patterns.",
        buttonText: "Learn More",
        imageSrc: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=500&fit=crop",
        imageAlt: "Balance training exercise",
      },
    },
    {
      value: "pain-relief",
      icon: <Heart className="h-auto w-4 shrink-0" />,
      label: "Pain Relief",
      content: {
        badge: "Non-Invasive Care",
        title: "Lasting Freedom from Pain",
        description: "Using robotic spinal decompression, high-intensity laser therapy, and manual techniques, we target root causes — not just symptoms — for sustainable pain relief without surgery.",
        buttonText: "Learn More",
        imageSrc: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=800&h=500&fit=crop",
        imageAlt: "Advanced pain relief therapy",
      },
    },
    {
      value: "movement-analysis",
      icon: <Activity className="h-auto w-4 shrink-0" />,
      label: "Movement Analysis",
      content: {
        badge: "AI-Powered Diagnostics",
        title: "Precision Diagnosis with AI",
        description: "Our AI gait analyzer and motion analysis technology provide data-driven insights into your movement patterns, enabling precise diagnosis and personalized treatment plans.",
        buttonText: "Learn More",
        imageSrc: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=800&h=500&fit=crop",
        imageAlt: "AI motion analysis technology",
      },
    },
  ];

  return (
    <div ref={ref}>
      <Feature108
        badge="Our Approach"
        heading={t("pillars.title")}
        description={t("pillars.subtitle")}
        tabs={pillarTabs}
      />
    </div>
  );
});

PillarsSection.displayName = "PillarsSection";

export default PillarsSection;
