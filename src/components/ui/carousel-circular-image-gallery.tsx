"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

declare global {
  interface Window {
    gsap: any;
    MotionPathPlugin: any;
  }
}

interface ImageData {
  title: string;
  url: string;
}

interface ImageGalleryProps {
  images?: ImageData[];
}

const defaultImages: ImageData[] = [
  {
    title: "Physiotherapy Session",
    url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=600&fit=crop",
  },
  {
    title: "Rehabilitation Exercise",
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop",
  },
  {
    title: "Advanced Equipment",
    url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=600&fit=crop",
  },
  {
    title: "Spinal Therapy",
    url: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&h=600&fit=crop",
  },
  {
    title: "Clinical Consultation",
    url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop",
  },
  {
    title: "Modern Clinic",
    url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=600&fit=crop",
  },
];

export function ImageGallery({ images: imagesProp }: ImageGalleryProps) {
  const imgs = imagesProp || defaultImages;
  const [opened, setOpened] = useState(0);
  const [inPlace, setInPlace] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);
  const autoplayTimer = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(400);

  // Responsive sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        setSize(Math.min(w, 600));
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const loadScripts = () => {
      if (window.gsap && window.MotionPathPlugin) {
        window.gsap.registerPlugin(window.MotionPathPlugin);
        setGsapReady(true);
        return;
      }
      const gsapScript = document.createElement("script");
      gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      gsapScript.onload = () => {
        const motionPathScript = document.createElement("script");
        motionPathScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js";
        motionPathScript.onload = () => {
          if (window.gsap && window.MotionPathPlugin) {
            window.gsap.registerPlugin(window.MotionPathPlugin);
            setGsapReady(true);
          }
        };
        document.body.appendChild(motionPathScript);
      };
      document.body.appendChild(gsapScript);
    };
    loadScripts();
  }, []);

  const onClick = (index: number) => {
    if (!disabled) setOpened(index);
  };

  const onInPlace = (index: number) => setInPlace(index);

  const next = useCallback(() => {
    setOpened((c) => (c + 1 >= imgs.length ? 0 : c + 1));
  }, [imgs.length]);

  const prev = useCallback(() => {
    setOpened((c) => (c - 1 < 0 ? imgs.length - 1 : c - 1));
  }, [imgs.length]);

  useEffect(() => setDisabled(true), [opened]);
  useEffect(() => setDisabled(false), [inPlace]);

  useEffect(() => {
    if (!gsapReady) return;
    if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    autoplayTimer.current = window.setInterval(next, 4500);
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [opened, gsapReady, next]);

  return (
    <div ref={containerRef} className="relative w-full flex items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="block">
          {gsapReady &&
            imgs.map((image, i) => (
              <GalleryImage
                key={i}
                url={image.url}
                title={image.title}
                open={opened === i}
                inPlace={inPlace === i}
                id={i}
                onInPlace={onInPlace}
                total={imgs.length}
                size={size}
              />
            ))}
          <Tabs images={imgs} onSelect={onClick} size={size} />
        </svg>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center pointer-events-none z-10">
          <p className="text-foreground font-display font-semibold text-sm md:text-base drop-shadow-lg">
            {imgs[opened]?.title}
          </p>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center hover:bg-muted transition-colors z-20"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center hover:bg-muted transition-colors z-20"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </button>
    </div>
  );
}

interface GalleryImageProps {
  url: string;
  title: string;
  open: boolean;
  inPlace: boolean;
  id: number;
  onInPlace: (id: number) => void;
  total: number;
  size: number;
}

function GalleryImage({ url, title, open, inPlace, id, onInPlace, total, size }: GalleryImageProps) {
  const [firstLoad, setLoaded] = useState(true);
  const clip = useRef<SVGCircleElement>(null);

  const gap = 10;
  const circleRadius = 7;
  const defaults = { transformOrigin: "center center" };
  const duration = 0.4;
  const scale = 700;
  const bigSize = circleRadius * scale;
  const overlap = 0;

  const getPosSmall = () => ({
    cx: size / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: size - 30,
    r: circleRadius,
  });
  const getPosSmallAbove = () => ({
    cx: size / 2 - (total * (circleRadius * 2 + gap) - gap) / 2 + id * (circleRadius * 2 + gap),
    cy: size / 2,
    r: circleRadius * 2,
  });
  const getPosCenter = () => ({ cx: size / 2, cy: size / 2, r: circleRadius * 7 });
  const getPosEnd = () => ({ cx: size / 2 - bigSize + overlap, cy: size / 2, r: bigSize });
  const getPosStart = () => ({ cx: size / 2 + bigSize - overlap, cy: size / 2, r: bigSize });

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap) return;

    setLoaded(false);
    if (clip.current) {
      const flipDuration = firstLoad ? 0 : duration;
      const upDuration = firstLoad ? 0 : 0.2;
      const bounceDuration = firstLoad ? 0.01 : 1;
      const delay = firstLoad ? 0 : flipDuration + upDuration;

      if (open) {
        gsap
          .timeline()
          .set(clip.current, { ...defaults, ...getPosSmall() })
          .to(clip.current, { ...defaults, ...getPosCenter(), duration: upDuration, ease: "power3.inOut" })
          .to(clip.current, { ...defaults, ...getPosEnd(), duration: flipDuration, ease: "power4.in", onComplete: () => onInPlace(id) });
      } else {
        gsap
          .timeline({ overwrite: true })
          .set(clip.current, { ...defaults, ...getPosStart() })
          .to(clip.current, { ...defaults, ...getPosCenter(), delay, duration: flipDuration, ease: "power4.out" })
          .to(clip.current, {
            ...defaults,
            motionPath: { path: [getPosSmallAbove(), getPosSmall()], curviness: 1 },
            duration: bounceDuration,
            ease: "bounce.out",
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <g>
      <defs>
        <clipPath id={`clip-${id}`}>
          <circle ref={clip} cx={getPosSmall().cx} cy={getPosSmall().cy} r={getPosSmall().r} />
        </clipPath>
        <clipPath id={`svgClip-${id}`}>
          <circle cx={size / 2} cy={size / 2} r={size / 2} />
        </clipPath>
      </defs>
      <g clipPath={`url(#svgClip-${id})`}>
        <image
          href={url}
          x="0"
          y="0"
          width={size}
          height={size}
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#clip-${id})`}
        />
      </g>
    </g>
  );
}

interface TabsProps {
  images: ImageData[];
  onSelect: (index: number) => void;
  size: number;
}

function Tabs({ images, onSelect, size }: TabsProps) {
  const gap = 10;
  const circleRadius = 7;

  const getPosX = (i: number) =>
    size / 2 - (images.length * (circleRadius * 2 + gap) - gap) / 2 + i * (circleRadius * 2 + gap);
  const getPosY = () => size - 30;

  return (
    <g>
      {images.map((_, i) => (
        <g key={i}>
          <defs>
            <clipPath id={`tabClip-${i}`}>
              <circle cx={getPosX(i)} cy={getPosY()} r={circleRadius} />
            </clipPath>
          </defs>
          <circle
            onClick={() => onSelect(i)}
            className="cursor-pointer transition-all"
            fill="transparent"
            stroke="hsl(var(--muted-foreground))"
            strokeOpacity="0.7"
            strokeWidth="2"
            cx={getPosX(i)}
            cy={getPosY()}
            r={circleRadius + 2}
          />
        </g>
      ))}
    </g>
  );
}

export default ImageGallery;
