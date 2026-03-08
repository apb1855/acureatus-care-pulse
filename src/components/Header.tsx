import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/acureatus-logo.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-xl shadow-lg border-b border-border/50"
          : "bg-card/20 backdrop-blur-lg border-b border-primary-foreground/15"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2">
          <img src={logo} alt="Acureatus Logo" className="h-14 md:h-20 w-auto drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                scrolled
                  ? "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="tel:+917996217888"
            className={`inline-flex items-center gap-2 h-11 px-6 ml-3 rounded-full font-semibold text-sm transition-all duration-300 ${
              scrolled
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            }`}
          >
            <Phone className="w-4 h-4" />
            Book Now
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden p-2 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-full transition-colors ${
            scrolled ? "text-foreground" : "text-primary-foreground"
          }`}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 bg-foreground/40 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-16 left-4 right-4 bg-card z-40 md:hidden rounded-2xl shadow-2xl border border-border overflow-hidden"
            >
              <nav className="flex flex-col items-center gap-2 py-6 px-4">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="w-full text-center text-lg font-semibold text-foreground hover:text-primary hover:bg-primary/5 py-3 rounded-xl transition-colors"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href="tel:+917996217888"
                  className="inline-flex items-center justify-center gap-2 w-full h-14 rounded-xl bg-primary text-primary-foreground font-semibold text-lg mt-2"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
