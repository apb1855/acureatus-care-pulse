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
  { title: "Physiotherapy Session", url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=600&fit=crop" },
  { title: "Rehabilitation Exercise", url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop" },
  { title: "Advanced Equipment", url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=600&fit=crop" },
  { title: "Spinal Therapy", url: "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&h=600&fit=crop" },
  { title: "Clinical Consultation", url: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&h=600&fit=crop" },
  { title: "Modern Clinic", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=600&fit=crop" },
];

const WIDTH = 400;
const HEIGHT = 400;
const GAP = 10;
const CIRCLE_RADIUS = 7;
const DURATION = 0.4;
const SCALE = 700;

export function ImageGallery({ images: imagesProp }: ImageGalleryProps) {
  const imgs = imagesProp || defaultImages;
  const [opened, setOpened] = useState(0);
  const [inPlace, setInPlace] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);
  const autoplayTimer = useRef<number | null>(null);

  useEffect(() => {
    if (window.gsap && window.MotionPathPlugin) {
      window.gsap.registerPlugin(window.MotionPathPlugin);
      setGsapReady(true);
      return;
    }
    const gsapScript = document.createElement("script");
    gsapScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
    gsapScript.onload = () => {
      const mpScript = document.createElement("script");
      mpScript.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/MotionPathPlugin.min.js";
      mpScript.onload = () => {
        if (window.gsap && window.MotionPathPlugin) {
          window.gsap.registerPlugin(window.MotionPathPlugin);
          setGsapReady(true);
        }
      };
      document.body.appendChild(mpScript);
    };
    document.body.appendChild(gsapScript);
  }, []);

  const onClick = (index: number) => {
    if (!disabled) setOpened(index);
  };

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
    <div className="relative w-full max-w-lg mx-auto">
      <div className="relative w-full" style={{ paddingBottom: "100%" }}>
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
          style={{ background: "hsl(var(--muted))" }}
        >
          {/* Outer clip to contain everything */}
          <defs>
            <clipPath id="gallery-bounds">
              <rect x="0" y="0" width={WIDTH} height={HEIGHT} rx="16" />
            </clipPath>
          </defs>
          <g clipPath="url(#gallery-bounds)">
            {gsapReady &&
              imgs.map((image, i) => (
                <GalleryImage
                  key={i}
                  url={image.url}
                  title={image.title}
                  open={opened === i}
                  inPlace={inPlace === i}
                  id={i}
                  onInPlace={setInPlace}
                  total={imgs.length}
                />
              ))}
            <Tabs images={imgs} onSelect={onClick} />
          </g>
        </svg>
      </div>

      {/* Title below */}
      <p className="text-center text-foreground font-display font-semibold text-base md:text-lg mt-3">
        {imgs[opened]?.title}
      </p>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-1 md:-left-5 top-[45%] -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center hover:bg-muted transition-colors z-20"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-1 md:-right-5 top-[45%] -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur border border-border flex items-center justify-center hover:bg-muted transition-colors z-20"
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
}

function GalleryImage({ url, title, open, id, onInPlace, total }: GalleryImageProps) {
  const [firstLoad, setLoaded] = useState(true);
  const clip = useRef<SVGCircleElement>(null);

  const bigSize = CIRCLE_RADIUS * SCALE;

  const getPosSmall = () => ({
    cx: WIDTH / 2 - (total * (CIRCLE_RADIUS * 2 + GAP) - GAP) / 2 + id * (CIRCLE_RADIUS * 2 + GAP),
    cy: HEIGHT - 30,
    r: CIRCLE_RADIUS,
  });
  const getPosSmallAbove = () => ({
    cx: WIDTH / 2 - (total * (CIRCLE_RADIUS * 2 + GAP) - GAP) / 2 + id * (CIRCLE_RADIUS * 2 + GAP),
    cy: HEIGHT / 2,
    r: CIRCLE_RADIUS * 2,
  });
  const getPosCenter = () => ({ cx: WIDTH / 2, cy: HEIGHT / 2, r: CIRCLE_RADIUS * 7 });
  const getPosEnd = () => ({ cx: 0, cy: HEIGHT / 2, r: bigSize });
  const getPosStart = () => ({ cx: WIDTH + bigSize, cy: HEIGHT / 2, r: bigSize });

  useEffect(() => {
    const gsap = window.gsap;
    if (!gsap || !clip.current) return;

    const defaults = { transformOrigin: "center center" };
    const flipDuration = firstLoad ? 0 : DURATION;
    const upDuration = firstLoad ? 0 : 0.2;
    const bounceDuration = firstLoad ? 0.01 : 1;
    const delay = firstLoad ? 0 : flipDuration + upDuration;

    setLoaded(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const small = getPosSmall();

  return (
    <g>
      <defs>
        <clipPath id={`clip-${id}`}>
          <circle ref={clip} cx={small.cx} cy={small.cy} r={small.r} />
        </clipPath>
      </defs>
      <image
        href={url}
        x="0"
        y="0"
        width={WIDTH}
        height={HEIGHT}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#clip-${id})`}
      />
    </g>
  );
}

interface TabsProps {
  images: ImageData[];
  onSelect: (index: number) => void;
}

function Tabs({ images, onSelect }: TabsProps) {
  const getPosX = (i: number) =>
    WIDTH / 2 - (images.length * (CIRCLE_RADIUS * 2 + GAP) - GAP) / 2 + i * (CIRCLE_RADIUS * 2 + GAP);
  const getPosY = () => HEIGHT - 30;

  return (
    <g>
      {images.map((_, i) => (
        <circle
          key={i}
          onClick={() => onSelect(i)}
          className="cursor-pointer transition-all"
          fill="transparent"
          stroke="white"
          strokeOpacity="0.7"
          strokeWidth="2"
          cx={getPosX(i)}
          cy={getPosY()}
          r={CIRCLE_RADIUS + 2}
        />
      ))}
    </g>
  );
}

export default ImageGallery;
