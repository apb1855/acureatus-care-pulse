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
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
  imageSrc?: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        key={name}
        className={cn(
          "group relative col-span-1 flex flex-col justify-between overflow-hidden rounded-xl",
          "bg-card border border-border",
          "transform-gpu transition-all duration-300 hover:shadow-lg hover:border-primary/30",
          className
        )}
      >
        <div className="absolute inset-0 overflow-hidden">{background}</div>
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-2">
          <Icon className="h-10 w-10 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-hover:scale-90" />
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
            className="pointer-events-auto text-primary"
            onClick={() => setOpen(true)}
          >
            {cta}
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-foreground/[.03]" />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <Icon className="h-8 w-8 text-primary" />
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export { BentoCard, BentoGrid };
