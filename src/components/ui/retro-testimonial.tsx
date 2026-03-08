"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X, Linkedin, Instagram, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export interface iTestimonial {
  name: string;
  designation: string;
  description: string;
  profileImage: string;
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}

const truncateToWords = (text: string, maxWords: number) => {
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "..";
};

interface iCarouselProps {
  items: React.ReactElement<{
    testimonial: iTestimonial;
    index: number;
    layout?: boolean;
    onCardClose: () => void;
  }>[];
  initialScroll?: number;
}

const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement | null>,
  onOutsideClick: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      onOutsideClick();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, onOutsideClick]);
};

const isMobile = () => typeof window !== "undefined" && window.innerWidth < 768;

const Carousel = ({ items, initialScroll = 0 }: iCarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const handleScrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleScrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384;
      const gap = isMobile() ? 4 : 8;
      carouselRef.current.scrollTo({
        left: (cardWidth + gap) * (index + 1),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  return (
    <div className="relative w-full">
      <div
        className="flex w-full overflow-x-scroll py-10 md:py-14 scroll-smooth [scrollbar-width:none]"
        ref={carouselRef}
        onScroll={checkScrollability}
      >
        <div className="flex flex-row justify-start gap-4 pl-4 max-w-7xl mx-auto">
          {items.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 * index, ease: "easeOut" } }}
              key={"card" + index}
              className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
            >
              {React.cloneElement(item, {
                onCardClose: () => handleCardClose(index),
              })}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-end gap-2 mr-10">
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-muted flex items-center justify-center disabled:opacity-50 border border-border"
          onClick={handleScrollLeft}
          disabled={!canScrollLeft}
        >
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </button>
        <button
          className="relative z-40 h-10 w-10 rounded-full bg-muted flex items-center justify-center disabled:opacity-50 border border-border"
          onClick={handleScrollRight}
          disabled={!canScrollRight}
        >
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
  index,
  layout = false,
  onCardClose = () => {},
  backgroundImage = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2073&auto=format&fit=crop",
}: {
  testimonial: iTestimonial;
  index: number;
  layout?: boolean;
  onCardClose?: () => void;
  backgroundImage?: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleExpand = () => setIsExpanded(true);
  const handleCollapse = () => {
    setIsExpanded(false);
    onCardClose();
  };

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleCollapse();
    };
    if (isExpanded) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.dataset.scrollY = scrollY.toString();
    } else {
      const scrollY = parseInt(document.body.dataset.scrollY || "0", 10);
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: scrollY, behavior: "instant" as ScrollBehavior });
    }
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isExpanded]);

  useOutsideClick(containerRef, handleCollapse);

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 h-screen z-50 overflow-auto"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-background/80 backdrop-blur-lg h-full w-full fixed inset-0"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${testimonial.name}` : undefined}
              className="max-w-5xl mx-auto bg-card border border-border h-fit z-[60] my-10 p-4 md:p-10 rounded-3xl relative"
            >
              <button
                className="sticky top-4 h-8 w-8 right-0 ml-auto bg-primary rounded-full flex items-center justify-center z-10"
                onClick={handleCollapse}
              >
                <X className="h-5 w-5 text-primary-foreground" />
              </button>
              <p className="text-sm font-medium text-muted-foreground">
                {testimonial.designation}
              </p>
              <p className="text-2xl md:text-4xl font-display font-semibold text-foreground mt-2">
                {testimonial.name}
              </p>
              <div className="py-10">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed">{testimonial.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${testimonial.name}` : undefined}
        onClick={handleExpand}
        className="rounded-3xl bg-card border border-border h-80 w-56 md:h-[28rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10 text-left"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-foreground/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-6 md:p-8">
          <ProfileImage
            src={testimonial.profileImage}
            alt={testimonial.name}
            className="h-10 w-10 md:h-12 md:w-12 rounded-full border-2 border-background object-cover"
          />
        </div>
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 z-40 p-6 md:p-8 bg-gradient-to-t from-background/90 via-background/60 to-transparent">
          <p className="text-foreground/80 text-sm md:text-base font-medium italic">
            {testimonial.description.length > 100
              ? `${testimonial.description.slice(0, 100)}...`
              : testimonial.description}
          </p>
          <p className="text-foreground font-display font-semibold text-base md:text-lg mt-2">
            {testimonial.name}
          </p>
          <p className="text-muted-foreground text-sm">
            {testimonial.designation.length > 25
              ? `${testimonial.designation.slice(0, 25)}...`
              : testimonial.designation}
          </p>
        </div>
      </motion.button>
    </>
  );
};

const ProfileImage = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <div className="relative">
      <img
        onLoad={() => setLoading(false)}
        src={src}
        loading="lazy"
        decoding="async"
        alt={alt || "Profile image"}
        className={cn(
          "transition duration-300",
          isLoading ? "blur-sm scale-110" : "blur-0 scale-100",
          className
        )}
      />
    </div>
  );
};

export { Carousel, TestimonialCard, ProfileImage };
