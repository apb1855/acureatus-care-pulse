import { useI18n, Locale } from "@/hooks/useI18n";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

const langLabels: Record<Locale, string> = {
  en: "EN",
  kn: "ಕನ್ನಡ",
};

const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { locale, setLocale } = useI18n();

  const toggle = () => setLocale(locale === "en" ? "kn" : "en");

  return (
    <button
      onClick={toggle}
      aria-label={`Switch language to ${locale === "en" ? "Kannada" : "English"}`}
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors",
        className
      )}
    >
      <Globe className="w-3.5 h-3.5" />
      {langLabels[locale === "en" ? "kn" : "en"]}
    </button>
  );
};

export default LanguageSwitcher;
