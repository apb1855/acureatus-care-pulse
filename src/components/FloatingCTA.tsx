import { useState } from "react";
import { MessageCircle, Phone, X, Plus } from "lucide-react";

const FloatingCTA = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop: show both buttons separately */}
      <a
        href="tel:+917996217888"
        className="fixed bottom-6 right-6 z-50 hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl hover:scale-105 transition-transform"
        aria-label="Call Now"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Mobile: single FAB with expandable options */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 md:hidden">
        {open && (
          <div className="flex flex-col items-end gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <a
              href="tel:+917996217888"
              className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full pl-4 pr-3 py-2.5 shadow-lg text-sm font-semibold"
            >
              Book Now
              <Phone className="w-4 h-4 shrink-0" />
            </a>
            <a
              href="https://wa.me/919796217888"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-primary text-primary-foreground rounded-full pl-4 pr-3 py-2.5 shadow-lg text-sm font-semibold"
            >
              Chat with us
              <MessageCircle className="w-4 h-4 shrink-0" />
            </a>
          </div>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl transition-transform duration-200"
          aria-label={open ? "Close menu" : "Contact us"}
        >
          {open ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
        </button>
      </div>
    </>
  );
};

export default FloatingCTA;
