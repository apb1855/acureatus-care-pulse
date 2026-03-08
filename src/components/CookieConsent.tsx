import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    localStorage.setItem("cookie-consent-date", new Date().toISOString());
    // Clear theme preference if user declines cookies
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 animate-in slide-in-from-bottom duration-500">
      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl p-5 md:p-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Cookie className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-foreground text-base mb-1">
              We value your privacy 🍪
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies and local storage to remember your theme preference (light/dark mode)
              and improve your browsing experience. No personal data is collected or shared with third parties.
            </p>
            <div className="flex flex-wrap gap-3 mt-4">
              <button
                onClick={accept}
                className="inline-flex items-center px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={decline}
                className="inline-flex items-center px-5 py-2 rounded-lg border border-border text-sm font-semibold text-foreground hover:bg-muted transition-colors"
              >
                Essential Only
              </button>
            </div>
          </div>
          <button
            onClick={decline}
            aria-label="Close cookie banner"
            className="shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
