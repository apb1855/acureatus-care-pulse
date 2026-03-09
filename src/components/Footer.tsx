import { motion, useReducedMotion } from "framer-motion";
import { Phone, MapPin, Clock, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { clinicData } from "@/data/clinicData";
import { useI18n } from "@/hooks/useI18n";
import logo from "@/assets/acureatus-logo.png";
import type { ComponentProps, ReactNode } from "react";

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/acureatus", label: "Facebook" },
  { icon: Instagram, href: "https://instagram.com/acureatus", label: "Instagram" },
  { icon: Youtube, href: "https://youtube.com/@acureatus", label: "Youtube" },
  { icon: Linkedin, href: "https://linkedin.com/company/acureatus", label: "LinkedIn" },
];

function AnimatedContainer({ className, delay = 0.1, children }: { delay?: number; className?: ComponentProps<"div">["className"]; children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion();
  if (shouldReduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const Footer = () => {
  const { t } = useI18n();

  const footerSections = [
    {
      label: t("footer.quickLinks"),
      links: [
        { title: t("nav.home"), href: "#home" },
        { title: t("nav.services"), href: "#services" },
        { title: t("nav.pricing"), href: "#pricing" },
        { title: t("nav.team"), href: "#team" },
        { title: t("nav.contact"), href: "#contact" },
      ],
    },
    {
      label: t("footer.ourClinics"),
      links: clinicData.specialized_clinics.map((c) => ({ title: c.title, href: "#services" })),
    },
  ];

  return (
    <footer role="contentinfo" className="bg-primary text-primary-foreground dark:bg-[hsl(213,80%,8%)] dark:text-[hsl(210,20%,95%)]">
      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <AnimatedContainer delay={0} className="space-y-5">
            <a href="#home" className="inline-block">
              <img src={logo} alt="Acureatus Logo" className="h-24 w-auto brightness-0 invert" />
            </a>
            <p className="text-sm text-primary-foreground/70 dark:text-white/70 leading-relaxed max-w-xs">
              {clinicData.business_identity.branding_tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="w-9 h-9 rounded-full bg-primary-foreground/10 dark:bg-white/10 flex items-center justify-center hover:bg-primary-foreground/20 dark:hover:bg-white/20 transition-colors">
                  <s.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </AnimatedContainer>

          {footerSections.map((section, i) => (
            <AnimatedContainer key={section.label} delay={0.1 * (i + 1)}>
              <h4 className="font-display text-lg font-semibold mb-4">{section.label}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.title}>
                    <a href={link.href} className="text-sm text-primary-foreground/60 dark:text-white/60 hover:text-primary-foreground dark:hover:text-white transition-colors">{link.title}</a>
                  </li>
                ))}
              </ul>
            </AnimatedContainer>
          ))}

          <AnimatedContainer delay={0.3} className="space-y-4">
            <h4 className="font-display text-lg font-semibold mb-4">{t("footer.getInTouch")}</h4>
            <div className="flex items-start gap-3 text-sm text-primary-foreground/70 dark:text-white/70">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-secondary" />
              <span>{clinicData.locations[0].address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-primary-foreground/70 dark:text-white/70">
              <Phone className="w-4 h-4 shrink-0 text-secondary" />
              <a href={`tel:${clinicData.locations[0].contact_numbers[0]}`} className="hover:text-primary-foreground transition-colors">{clinicData.locations[0].contact_numbers[0]}</a>
            </div>
            <div className="flex items-center gap-3 text-sm text-primary-foreground/70 dark:text-white/70">
              <Clock className="w-4 h-4 shrink-0 text-secondary" />
              <span>{t("visit.monSat")}: {clinicData.operating_hours.monday_to_saturday}</span>
            </div>
          </AnimatedContainer>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 dark:border-white/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/40 dark:text-white/40">
            © {new Date().getFullYear()} {clinicData.business_identity.name}. {t("footer.rights")}
          </p>
          <p className="text-xs text-primary-foreground/40 dark:text-white/40">
            {t("footer.initiative")} {clinicData.business_identity.initiative_of.join(" & ")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
