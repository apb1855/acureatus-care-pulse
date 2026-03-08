import { useState, useEffect } from "react";
import { MessageCircle, Phone, X, Plus, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import ChatFormDialog from "@/components/ChatFormDialog";

const FloatingCTA = () => {
  const [open, setOpen] = useState(false);
  const [chatFormOpen, setChatFormOpen] = useState(false);
  const [inFooter, setInFooter] = useState(false);
  const [pastSecondSection, setPastSecondSection] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInFooter(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Track scroll position to hide Go to Top on first two sections
  useEffect(() => {
    const scrollContainer = document.querySelector(".snap-y") || window;
    const onScroll = () => {
      const scrollTop =
        scrollContainer === window
          ? window.scrollY
          : (scrollContainer as HTMLElement).scrollTop;
      // Approx 2 viewport heights = past first two snap sections
      setPastSecondSection(scrollTop > window.innerHeight * 1.5);
    };
    scrollContainer.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", onScroll);
  }, []);

  const btnClass = cn(
    "flex items-center gap-2 rounded-full pl-4 pr-3 py-2.5 shadow-lg text-sm font-semibold hover:scale-105 transition-all duration-300",
    inFooter
      ? "bg-secondary text-secondary-foreground"
      : "bg-primary text-primary-foreground"
  );

  const fabClass = cn(
    "flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all duration-300 hover:scale-105",
    inFooter
      ? "bg-secondary text-secondary-foreground"
      : "bg-primary text-primary-foreground"
  );

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {open && (
          <div className="flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {pastSecondSection && (
              <button
                onClick={() => {
                  const container = document.querySelector(".snap-y") || window;
                  if (container === window) window.scrollTo({ top: 0, behavior: "smooth" });
                  else (container as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
                  setOpen(false);
                }}
                className={cn(btnClass, "lg:hidden")}
              >
                Go to Top
                <ArrowUp className="w-4 h-4 shrink-0" />
              </button>
            )}
            <a href="tel:+917996217888" className={btnClass}>
              Book Now
              <Phone className="w-4 h-4 shrink-0" />
            </a>
            <button
              onClick={() => {
                setChatFormOpen(true);
                setOpen(false);
              }}
              className={btnClass}
            >
              Chat with us
              <MessageCircle className="w-4 h-4 shrink-0" />
            </button>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className={fabClass}
          aria-label={open ? "Close menu" : "Contact us"}
        >
          {open ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </button>
      </div>
      <ChatFormDialog open={chatFormOpen} onOpenChange={setChatFormOpen} />
    </>
  );
};

export default FloatingCTA;
