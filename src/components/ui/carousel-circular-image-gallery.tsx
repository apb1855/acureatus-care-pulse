"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

interface ImageData {
  title: string;
  url: string;
}

interface ImageGalleryProps {
  images?: ImageData[];
}

const defaultImages: ImageData[] = [
  { title: "Physiotherapy Session", url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop" },
  { title: "Rehabilitation Exercise", url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop" },
  { title: "Advanced Equipment", url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=600&fit=crop" },
  { title: "Spinal Therapy", url: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&h=600&fit=crop" },
  { title: "Clinical Consultation", url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&h=600&fit=crop" },
  { title: "Modern Clinic", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop" },
];

export function ImageGallery({ images: imagesProp }: ImageGalleryProps) {
  const imgs = imagesProp || defaultImages;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % imgs.length);
  }, [imgs.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + imgs.length) % imgs.length);
  }, [imgs.length]);

  // Autoplay
  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next, current]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main image */}
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.img
            key={current}
            src={imgs[current].url}
            alt={imgs[current].title}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Gradient overlay + title */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-4 left-6 z-20">
          <p className="text-foreground font-display font-semibold text-lg md:text-xl drop-shadow-lg">
            {imgs[current].title}
          </p>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-2 md:-left-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center hover:bg-muted transition-colors z-20"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:-right-5 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center hover:bg-muted transition-colors z-20"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {imgs.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={cn(
              "h-2.5 rounded-full transition-all duration-300",
              i === current ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30"
            )}
          />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 mt-4 overflow-x-auto [scrollbar-width:none] pb-1">
        {imgs.map((img, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={cn(
              "flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200",
              i === current ? "border-primary scale-105" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ImageGallery;
