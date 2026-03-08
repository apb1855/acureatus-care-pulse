import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MenuIcon, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetTitle } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useI18n } from "@/hooks/useI18n";

const navKeys = [
  { key: "nav.home", href: "#home" },
  { key: "nav.services", href: "#services" },
  { key: "nav.pricing", href: "#pricing" },
  { key: "nav.team", href: "#team" },
  { key: "nav.gallery", href: "#gallery" },
  { key: "nav.blog", href: "/blog", isRoute: true },
  { key: "nav.contact", href: "#contact-form" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    const scrollContainer = document.querySelector(".snap-y") || window;
    let lastY = 0;
    const onScroll = () => {
      const currentY =
        scrollContainer === window
          ? window.scrollY
          : (scrollContainer as HTMLElement).scrollTop;
      setScrolled(currentY > 20);
      setVisible(currentY <= 20 || currentY < lastY);
      lastY = currentY;
    };
    scrollContainer.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl transition-all duration-300",
        visible ? "translate-y-0 opacity-100" : "-translate-y-[calc(100%+2rem)] opacity-0"
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between rounded-2xl border px-4 py-2.5 md:px-6 md:py-3 transition-all duration-500",
          scrolled
            ? "bg-card/95 backdrop-blur-xl border-border shadow-lg"
            : "bg-primary/90 backdrop-blur-lg border-primary-foreground/10"
        )}
      >
        {/* Logo */}
        <a href="#home" aria-label="Go to homepage" className="flex flex-col leading-tight">
          <span className={cn(
            "font-display text-lg md:text-xl font-bold tracking-tight transition-colors duration-500",
            scrolled ? "text-primary" : "text-primary-foreground"
          )}>
            ACUREATUS
          </span>
          <span className={cn(
            "text-[8px] md:text-[10px] font-semibold tracking-widest transition-colors duration-500",
            scrolled ? "text-foreground/60" : "text-primary-foreground/70"
          )}>
            AI Advanced Physio Pain Clinic
          </span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-1">
          {navKeys.map((link) =>
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors",
                  scrolled
                    ? "text-foreground hover:text-primary hover:bg-primary/5"
                    : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                )}
              >
                {t(link.key)}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors",
                  scrolled
                    ? "text-foreground hover:text-primary hover:bg-primary/5"
                    : "text-primary-foreground/90 hover:text-primary-foreground hover:bg-primary-foreground/10"
                )}
              >
                {t(link.key)}
              </a>
            )
          )}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          <LanguageSwitcher className={cn(
            scrolled
              ? "text-foreground hover:bg-primary/5"
              : "text-primary-foreground hover:bg-primary-foreground/10"
          )} />
          <ThemeToggle className={cn(
            scrolled
              ? "text-foreground hover:bg-primary/5"
              : "text-primary-foreground hover:bg-primary-foreground/10"
          )} />
          <a
            href="tel:+917996217888"
            aria-label="Call to book appointment"
            className={cn(
              "hidden sm:inline-flex items-center gap-2 h-9 px-4 rounded-xl text-sm font-semibold transition-colors duration-500",
              scrolled
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            )}
          >
            <Phone className="w-4 h-4" />
            {t("nav.bookNow")}
          </a>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              aria-label="Open navigation menu"
              className={cn(
                "lg:hidden transition-colors",
                scrolled ? "text-foreground" : "text-primary-foreground"
              )}
            >
              <MenuIcon className="w-5 h-5" />
            </Button>
            <SheetContent side="right" className="w-72 bg-card border-border">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav aria-label="Mobile navigation" className="flex flex-col gap-2 mt-8">
                {navKeys.map((link) =>
                  link.isRoute ? (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                    >
                      {t(link.key)}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                    >
                      {t(link.key)}
                    </a>
                  )
                )}
              </nav>
              <SheetFooter className="mt-6 flex flex-col gap-2">
                <a
                  href="tel:+917996217888"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "default" }),
                    "w-full gap-2 rounded-xl"
                  )}
                >
                  <Phone className="w-4 h-4" />
                  {t("nav.bookNow")}
                </a>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
