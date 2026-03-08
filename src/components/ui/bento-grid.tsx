import { ReactNode, useState } from "react";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  imageSrc,
  details,
  treatments,
  duration,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
  imageSrc?: string;
  details?: string;
  treatments?: string[];
  duration?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        key={name}
        className={cn(
          "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl",
          "bg-card border border-border",
          "transform-gpu transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1",
          className
        )}
      >
        <div className="absolute inset-0 overflow-hidden">{background}</div>
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-2">
          <Icon className="h-10 w-10 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-hover:scale-90 group-hover:text-secondary" />
          <h3 className="text-lg font-display font-semibold text-foreground mt-2">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground max-w-lg">{description}</p>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          )}
        >
          <Button
            variant="ghost"
            size="sm"
            className="pointer-events-auto text-primary hover:text-primary/80"
            onClick={() => setOpen(true)}
          >
            {cta}
            <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-foreground/[.03]" />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <DialogTitle className="text-xl md:text-2xl font-display font-bold">
                {name}
              </DialogTitle>
            </div>
            <DialogDescription className="text-muted-foreground leading-relaxed">
              {description}
            </DialogDescription>
          </DialogHeader>

          {imageSrc && (
            <div className="overflow-hidden rounded-lg mt-4">
              <img
                src={imageSrc}
                alt={name}
                className="w-full h-auto rounded-lg object-cover aspect-video"
              />
            </div>
          )}

          {details && (
            <div className="mt-4">
              <h4 className="font-display font-semibold text-foreground mb-2">About This Clinic</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{details}</p>
            </div>
          )}

          {treatments && treatments.length > 0 && (
            <div className="mt-4">
              <h4 className="font-display font-semibold text-foreground mb-3">Key Treatments</h4>
              <div className="flex flex-wrap gap-2">
                {treatments.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}

          {duration && (
            <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm">
                <span className="font-medium text-foreground">Typical Duration: </span>
                <span className="text-muted-foreground">{duration}</span>
              </p>
            </div>
          )}

          <div className="mt-4">
            <a
              href="#contact-form"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition"
            >
              Book Consultation
              <ArrowRightIcon className="w-4 h-4" />
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { BentoCard, BentoGrid };
