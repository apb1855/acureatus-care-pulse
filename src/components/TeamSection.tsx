import { motion } from "framer-motion";
import { clinicData } from "@/data/clinicData";
import { Carousel, TestimonialCard, iTestimonial } from "@/components/ui/retro-testimonial";

const teamBackgrounds: Record<string, string> = {
  "Dr. Harish S. Krishna":
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop",
  "Dr. Chaithresh":
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop",
  "Dr. Jayshree":
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=2091&auto=format&fit=crop",
  "Dr. Pratham":
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
  "Ms. Glevisha":
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
};

const teamProfileImages: Record<string, string> = {
  "Dr. Harish S. Krishna":
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop",
  "Dr. Chaithresh":
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop",
  "Dr. Jayshree":
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop",
  "Dr. Pratham":
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop",
  "Ms. Glevisha":
    "https://images.unsplash.com/photo-1594824476967-48c8b964ac31?q=80&w=200&auto=format&fit=crop",
};

const getDescription = (member: typeof clinicData.medical_team[0]) => {
  const parts: string[] = [];
  if (member.role) parts.push(member.role);
  if (member.specialization) parts.push(`Specializing in ${member.specialization}`);
  if (member.credentials) parts.push(`Credentials: ${member.credentials}`);
  return parts.join(". ") + ".";
};

const TeamSection = () => {
  const cards = clinicData.medical_team.map((member, index) => {
    const testimonial: iTestimonial = {
      name: member.name,
      designation: member.role,
      description: getDescription(member),
      profileImage: teamProfileImages[member.name] || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop",
    };
    return (
      <TestimonialCard
        key={member.name}
        testimonial={testimonial}
        index={index}
        backgroundImage={teamBackgrounds[member.name]}
      />
    );
  });

  return (
    <section id="team" className="py-20 md:py-28 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Our Medical Team
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Experienced professionals dedicated to your recovery
          </p>
        </motion.div>
      </div>
      <Carousel items={cards} />
    </section>
  );
};

export default TeamSection;
