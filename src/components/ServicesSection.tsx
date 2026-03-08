import { HeartPulse, Cpu, Brain, Dumbbell, Hand, Zap } from "lucide-react";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { clinicData } from "@/data/clinicData";

const clinicIcons = [HeartPulse, Cpu, Brain, Dumbbell, Hand];

const clinicImages = [
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
];

const gridClasses = [
  "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  "lg:col-start-2 lg:col-end-3 lg:row-start-1 lg:row-end-4",
  "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  "lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:row-end-4",
];

const features = clinicData.specialized_clinics.map((clinic, i) => ({
  Icon: clinicIcons[i % clinicIcons.length],
  name: clinic.title,
  description: clinic.focus + (clinic.partnership ? ` (Partner: ${clinic.partnership})` : ""),
  href: "#contact",
  cta: "Book Appointment",
  background: (
    <img
      src={clinicImages[i]}
      alt={clinic.title}
      className="absolute inset-0 w-full h-full object-cover opacity-15 transition-opacity duration-300 group-hover:opacity-25"
    />
  ),
  className: gridClasses[i] || "",
}));

const ServicesSection = () => (
  <section id="services" className="py-20 md:py-28 bg-muted/50">
    <div className="container">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
          Specialized Clinics
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Dedicated treatment wings powered by advanced technology
        </p>
      </div>

      <BentoGrid className="lg:grid-rows-3">
        {features.map((feature) => (
          <BentoCard key={feature.name} {...feature} />
        ))}
      </BentoGrid>

      {/* Technology strip */}
      <div className="mt-16 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
          Advanced Technology
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {clinicData.advanced_technology.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground"
            >
              <Zap className="w-3.5 h-3.5 text-secondary" />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ServicesSection;
