import { motion, useReducedMotion } from "framer-motion";
import { Phone, MapPin, Clock, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { clinicData } from "@/data/clinicData";
import logo from "@/assets/acureatus-logo.png";
import type { ComponentProps, ReactNode } from "react";

const footerSections = [
  {
    label: "Quick Links",
    links: [
      { title: "Home", href: "#home" },
      { title: "Services", href: "#services" },
      { title: "Pricing", href: "#pricing" },
      { title: "Team", href: "#team" },
      { title: "Contact", href: "#contact" },
    ],
  },
  {
    label: "Our Clinics",
    links: clinicData.specialized_clinics.map((c) => ({
      title: c.title,
      href: "#services",
    })),
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "Youtube" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

function AnimatedContainer({ className, delay = 0.1, children }: { delay?: number; className?: ComponentProps<"div">["className"]; children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const Footer = () => (
  <footer className="bg-primary text-primary-foreground">
    {/* Main footer */}
    <div className="container py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <AnimatedContainer delay={0} className="space-y-5">
          <a href="#home" className="inline-block">
            <img src={logo} alt="Acureatus Logo" className="h-16 w-auto brightness-0 invert" />
          </a>
          <p className="text-sm text-primary-foreground/70 leading-relaxed max-w-xs">
            {clinicData.business_identity.branding_tagline}
          </p>
          <div className="flex items-center gap-3 pt-2">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <s.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </AnimatedContainer>

        {/* Link sections */}
        {footerSections.map((section, i) => (
          <AnimatedContainer key={section.label} delay={0.1 * (i + 1)}>
            <h4 className="font-display text-lg font-semibold mb-4">{section.label}</h4>
            <ul className="space-y-2.5">
              {section.links.map((link) => (
                <li key={link.title}>
                  <a
                    href={link.href}
                    className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedContainer>
        ))}

        {/* Contact column */}
        <AnimatedContainer delay={0.3} className="space-y-4">
          <h4 className="font-display text-lg font-semibold mb-4">Get in Touch</h4>
          <div className="flex items-start gap-3 text-sm text-primary-foreground/70">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
            <span>{clinicData.locations[0].address}</span>
          </div>
          <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
            <Phone className="w-4 h-4 shrink-0 text-secondary" />
            <a href={`tel:${clinicData.locations[0].contact_numbers[0]}`} className="hover:text-primary-foreground transition-colors">
              {clinicData.locations[0].contact_numbers[0]}
            </a>
          </div>
          <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
            <Clock className="w-4 h-4 shrink-0 text-secondary" />
            <span>Mon–Sat: {clinicData.operating_hours.monday_to_saturday}</span>
          </div>
        </AnimatedContainer>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-primary-foreground/10">
      <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} {clinicData.business_identity.name}. All rights reserved.
        </p>
        <p className="text-xs text-primary-foreground/40">
          An initiative of {clinicData.business_identity.initiative_of.join(" & ")}
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
