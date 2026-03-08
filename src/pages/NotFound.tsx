import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, ArrowLeft, Phone } from "lucide-react";
import logo from "@/assets/acureatus-logo.png";

const NotFound = () => {
  const location = useLocation();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          window.location.href = "/";
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center max-w-md mx-auto">
        <img src={logo} alt="Acureatus Logo" className="h-20 w-auto mx-auto mb-8" />

        <div className="text-8xl font-display font-bold text-primary mb-4">404</div>

        <h1 className="text-2xl font-display font-bold text-foreground mb-3">
          Page Not Found
        </h1>

        <p className="text-muted-foreground mb-2">
          The page <code className="text-sm bg-muted px-2 py-1 rounded">{location.pathname}</code> doesn't exist.
        </p>

        <p className="text-sm text-muted-foreground mb-8">
          Redirecting to homepage in <span className="font-bold text-primary">{countdown}</span> seconds...
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go to Homepage
          </a>
          <a
            href="tel:+917996217888"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-muted transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
