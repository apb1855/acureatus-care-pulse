import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export type Locale = "en" | "kn";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.pricing": "Pricing",
    "nav.team": "Team",
    "nav.gallery": "Gallery",
    "nav.blog": "Blog",
    "nav.contact": "Contact",
    "nav.bookNow": "Book Now",

    // Hero
    "hero.tagline": "Moving from symptomatic relief to",
    "hero.taglineHighlight": "root-cause cure",
    "hero.description": "AI-powered diagnostics combined with advanced physiotherapy for lasting pain relief. An initiative of Sharp Insight Rehabilitation Research Centre.",
    "hero.bookAppointment": "Book Appointment",
    "hero.exploreServices": "Explore Services",
    "hero.trustedBy": "Trusted by",
    "hero.patients": "Patients",

    // Pillars
    "pillars.title": "Our Core Pillars",
    "pillars.subtitle": "Four foundational principles that guide every treatment",

    // Services
    "services.title": "Specialized Clinics",
    "services.subtitle": "Dedicated treatment wings powered by advanced technology",
    "services.viewMore": "View More",
    "services.advancedTech": "Advanced Technology",

    // Pricing
    "pricing.title": "Transparent Pricing",
    "pricing.subtitle": "Affordable treatments with no hidden charges. Payments via Google Pay, UPI, or Cash.",
    "pricing.treatment": "Treatment",
    "pricing.price": "Price (₹)",

    // Team
    "team.title": "Meet Our Experts",
    "team.subtitle": "Experienced professionals dedicated to your recovery",

    // Gallery
    "gallery.title": "Our Clinic",
    "gallery.subtitle": "A glimpse into our state-of-the-art facility",

    // Testimonials
    "testimonials.title": "Patient Stories",
    "testimonials.subtitle": "Hear from those who trusted us with their care",

    // Contact Form
    "contact.title": "Contact Us",
    "contact.subtitle": "Have a question or want to book an appointment? We'd love to hear from you.",
    "contact.name": "Full Name",
    "contact.email": "Email Address",
    "contact.phone": "Phone Number",
    "contact.subject": "Subject",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",

    // Contact Section
    "visit.title": "Visit Us",
    "visit.subtitle": "Find us at our convenient locations",
    "visit.hours": "Operating Hours",
    "visit.monSat": "Monday - Saturday",
    "visit.sunday": "Sunday",
    "visit.closed": "Closed",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Find answers to common questions about our physiotherapy services and treatments.",
    "faq.show": "Show FAQs",
    "faq.hide": "Hide FAQs",

    // Footer
    "footer.quickLinks": "Quick Links",
    "footer.ourClinics": "Our Clinics",
    "footer.getInTouch": "Get in Touch",
    "footer.rights": "All rights reserved.",
    "footer.initiative": "An initiative of",

    // Cookie
    "cookie.title": "We value your privacy 🍪",
    "cookie.description": "We use cookies and local storage to remember your theme preference (light/dark mode) and improve your browsing experience. No personal data is collected or shared with third parties.",
    "cookie.accept": "Accept All",
    "cookie.decline": "Essential Only",

    // FAB
    "fab.goToTop": "Go to Top",
    "fab.bookNow": "Book Now",
    "fab.chat": "Chat with us",

    // Stats
    "stats.yearsExperience": "Years Experience",
    "stats.happyPatients": "Happy Patients",
    "stats.advancedTech": "Advanced Technologies",
    "stats.specializedClinics": "Specialized Clinics",

    // Reviews
    "reviews.title": "What Our Patients Say",
    "reviews.reviewsOn": "reviews on Google",
    "reviews.viewOnGoogle": "View all reviews on Google",
  },
  kn: {
    // Nav
    "nav.home": "ಮುಖಪುಟ",
    "nav.services": "ಸೇವೆಗಳು",
    "nav.pricing": "ಬೆಲೆ",
    "nav.team": "ತಂಡ",
    "nav.gallery": "ಗ್ಯಾಲರಿ",
    "nav.blog": "ಬ್ಲಾಗ್",
    "nav.contact": "ಸಂಪರ್ಕ",
    "nav.bookNow": "ಈಗ ಬುಕ್ ಮಾಡಿ",

    // Hero
    "hero.tagline": "ರೋಗಲಕ್ಷಣದ ಪರಿಹಾರದಿಂದ",
    "hero.taglineHighlight": "ಮೂಲ ಕಾರಣ ಚಿಕಿತ್ಸೆ",
    "hero.description": "AI-ಆಧಾರಿತ ರೋಗನಿರ್ಣಯ ಮತ್ತು ಮುಂದುವರಿದ ಫಿಸಿಯೋಥೆರಪಿ ಮೂಲಕ ಶಾಶ್ವತ ನೋವು ನಿವಾರಣೆ. ಶಾರ್ಪ್ ಇನ್‌ಸೈಟ್ ಪುನರ್ವಸತಿ ಸಂಶೋಧನಾ ಕೇಂದ್ರದ ಉಪಕ್ರಮ.",
    "hero.bookAppointment": "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
    "hero.exploreServices": "ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ",
    "hero.trustedBy": "ವಿಶ್ವಾಸಾರ್ಹ",
    "hero.patients": "ರೋಗಿಗಳು",

    // Pillars
    "pillars.title": "ನಮ್ಮ ಪ್ರಮುಖ ಸ್ತಂಭಗಳು",
    "pillars.subtitle": "ಪ್ರತಿ ಚಿಕಿತ್ಸೆಯನ್ನು ಮಾರ್ಗದರ್ಶಿಸುವ ನಾಲ್ಕು ಮೂಲಭೂತ ತತ್ವಗಳು",

    // Services
    "services.title": "ವಿಶೇಷ ಕ್ಲಿನಿಕ್‌ಗಳು",
    "services.subtitle": "ಮುಂದುವರಿದ ತಂತ್ರಜ್ಞಾನದಿಂದ ನಡೆಸಲ್ಪಡುವ ಮೀಸಲಾದ ಚಿಕಿತ್ಸಾ ವಿಭಾಗಗಳು",
    "services.viewMore": "ಇನ್ನಷ್ಟು ನೋಡಿ",
    "services.advancedTech": "ಮುಂದುವರಿದ ತಂತ್ರಜ್ಞಾನ",

    // Pricing
    "pricing.title": "ಪಾರದರ್ಶಕ ಬೆಲೆ",
    "pricing.subtitle": "ಯಾವುದೇ ಅಡಗಿದ ಶುಲ್ಕಗಳಿಲ್ಲದ ಕೈಗೆಟುಕುವ ಚಿಕಿತ್ಸೆಗಳು. Google Pay, UPI, ಅಥವಾ ನಗದು ಮೂಲಕ ಪಾವತಿ.",
    "pricing.treatment": "ಚಿಕಿತ್ಸೆ",
    "pricing.price": "ಬೆಲೆ (₹)",

    // Team
    "team.title": "ನಮ್ಮ ತಜ್ಞರನ್ನು ಭೇಟಿ ಮಾಡಿ",
    "team.subtitle": "ನಿಮ್ಮ ಚೇತರಿಕೆಗೆ ಮೀಸಲಾದ ಅನುಭವಿ ವೃತ್ತಿಪರರು",

    // Gallery
    "gallery.title": "ನಮ್ಮ ಕ್ಲಿನಿಕ್",
    "gallery.subtitle": "ನಮ್ಮ ಅತ್ಯಾಧುನಿಕ ಸೌಲಭ್ಯದ ಒಂದು ನೋಟ",

    // Testimonials
    "testimonials.title": "ರೋಗಿಗಳ ಅನುಭವಗಳು",
    "testimonials.subtitle": "ನಮ್ಮನ್ನು ನಂಬಿದವರ ಮಾತುಗಳನ್ನು ಕೇಳಿ",

    // Contact Form
    "contact.title": "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    "contact.subtitle": "ಪ್ರಶ್ನೆ ಇದೆಯೇ ಅಥವಾ ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಬುಕ್ ಮಾಡಲು ಬಯಸುವಿರಾ? ನಿಮ್ಮಿಂದ ಕೇಳಲು ನಾವು ಇಷ್ಟಪಡುತ್ತೇವೆ.",
    "contact.name": "ಪೂರ್ಣ ಹೆಸರು",
    "contact.email": "ಇಮೇಲ್ ವಿಳಾಸ",
    "contact.phone": "ಫೋನ್ ಸಂಖ್ಯೆ",
    "contact.subject": "ವಿಷಯ",
    "contact.message": "ನಿಮ್ಮ ಸಂದೇಶ",
    "contact.send": "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    "contact.sending": "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...",

    // Contact Section
    "visit.title": "ನಮ್ಮನ್ನು ಭೇಟಿ ಮಾಡಿ",
    "visit.subtitle": "ನಮ್ಮ ಅನುಕೂಲಕರ ಸ್ಥಳಗಳಲ್ಲಿ ನಮ್ಮನ್ನು ಹುಡುಕಿ",
    "visit.hours": "ಕಾರ್ಯಾಚರಣೆ ಸಮಯ",
    "visit.monSat": "ಸೋಮವಾರ - ಶನಿವಾರ",
    "visit.sunday": "ಭಾನುವಾರ",
    "visit.closed": "ಮುಚ್ಚಲಾಗಿದೆ",

    // FAQ
    "faq.title": "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
    "faq.subtitle": "ನಮ್ಮ ಫಿಸಿಯೋಥೆರಪಿ ಸೇವೆಗಳು ಮತ್ತು ಚಿಕಿತ್ಸೆಗಳ ಬಗ್ಗೆ ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಗಳನ್ನು ಹುಡುಕಿ.",
    "faq.show": "FAQ ತೋರಿಸಿ",
    "faq.hide": "FAQ ಮರೆಮಾಡಿ",

    // Footer
    "footer.quickLinks": "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
    "footer.ourClinics": "ನಮ್ಮ ಕ್ಲಿನಿಕ್‌ಗಳು",
    "footer.getInTouch": "ಸಂಪರ್ಕದಲ್ಲಿರಿ",
    "footer.rights": "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
    "footer.initiative": "ಇದರ ಉಪಕ್ರಮ",

    // Cookie
    "cookie.title": "ನಾವು ನಿಮ್ಮ ಗೌಪ್ಯತೆಯನ್ನು ಗೌರವಿಸುತ್ತೇವೆ 🍪",
    "cookie.description": "ನಿಮ್ಮ ಥೀಮ್ ಆದ್ಯತೆಯನ್ನು (ಲೈಟ್/ಡಾರ್ಕ್ ಮೋಡ್) ನೆನಪಿಟ್ಟುಕೊಳ್ಳಲು ನಾವು ಕುಕೀಗಳು ಮತ್ತು ಸ್ಥಳೀಯ ಸಂಗ್ರಹಣೆಯನ್ನು ಬಳಸುತ್ತೇವೆ. ಯಾವುದೇ ವೈಯಕ್ತಿಕ ಡೇಟಾವನ್ನು ಸಂಗ್ರಹಿಸಲಾಗುವುದಿಲ್ಲ.",
    "cookie.accept": "ಎಲ್ಲವನ್ನೂ ಒಪ್ಪಿ",
    "cookie.decline": "ಅಗತ್ಯವಾದವು ಮಾತ್ರ",

    // FAB
    "fab.goToTop": "ಮೇಲಕ್ಕೆ ಹೋಗಿ",
    "fab.bookNow": "ಈಗ ಬುಕ್ ಮಾಡಿ",
    "fab.chat": "ನಮ್ಮೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ",

    // Stats
    "stats.yearsExperience": "ವರ್ಷಗಳ ಅನುಭವ",
    "stats.happyPatients": "ಸಂತೋಷದ ರೋಗಿಗಳು",
    "stats.advancedTech": "ಮುಂದುವರಿದ ತಂತ್ರಜ್ಞಾನಗಳು",
    "stats.specializedClinics": "ವಿಶೇಷ ಕ್ಲಿನಿಕ್‌ಗಳು",

    // Reviews
    "reviews.title": "ನಮ್ಮ ರೋಗಿಗಳು ಏನು ಹೇಳುತ್ತಾರೆ",
    "reviews.reviewsOn": "Google ನಲ್ಲಿ ವಿಮರ್ಶೆಗಳು",
    "reviews.viewOnGoogle": "Google ನಲ್ಲಿ ಎಲ್ಲಾ ವಿಮರ್ಶೆಗಳನ್ನು ನೋಡಿ",
  },
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("locale") as Locale) || "en";
    }
    return "en";
  });

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("locale", l);
  }, []);

  const t = useCallback(
    (key: string) => translations[locale]?.[key] || translations.en[key] || key,
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
};
