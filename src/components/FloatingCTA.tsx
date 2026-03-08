import { Phone } from "lucide-react";

const FloatingCTA = () => (
  <a
    href="tel:+917996217888"
    className="fixed bottom-6 right-6 z-50 md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-105 transition-transform"
    aria-label="Call Now"
  >
    <Phone className="w-6 h-6" />
  </a>
);

export default FloatingCTA;
