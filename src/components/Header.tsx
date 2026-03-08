import React, { useState, useEffect } from "react";
import { MenuIcon, Phone } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetTitle } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scrollContainer = document.querySelector(".snap-y") || window;
    const onScroll = () => {
      const currentY =
        scrollContainer === window
          ? window.scrollY
          : (scrollContainer as HTMLElement).scrollTop;
      setScrolled(currentY > 20);
    };
    scrollContainer.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div
        className={cn(
          "flex items-center justify-between rounded-2xl border px-4 py-2.5 md:px-6 md:py-3 transition-all duration-500",
          scrolled
            ? "bg-card/95 backdrop-blur-xl border-border shadow-lg"
            : "bg-primary/90 backdrop-blur-lg border-primary-foreground/10"
        )}
      >
        {/* Logo */}
        <a href="#home" className="flex flex-col leading-tight">
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
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
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
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <a
            href="tel:+917996217888"
            className={cn(
              "hidden sm:inline-flex items-center gap-2 h-9 px-4 rounded-xl text-sm font-semibold transition-colors duration-500",
              scrolled
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            )}
          >
            <Phone className="w-4 h-4" />
            Book Now
          </a>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              className={cn(
                "lg:hidden transition-colors",
                scrolled ? "text-foreground" : "text-primary-foreground"
              )}
            >
              <MenuIcon className="w-5 h-5" />
            </Button>
            <SheetContent side="right" className="w-72 bg-card border-border">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
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
                  Book Now
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
