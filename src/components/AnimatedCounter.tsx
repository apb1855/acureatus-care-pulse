import { forwardRef, useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

const AnimatedCounter = forwardRef<HTMLSpanElement, AnimatedCounterProps>(
  ({ end, duration = 2, suffix = "", prefix = "", className = "" }, _forwardedRef) => {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [isInView, end, duration]);

    return (
      <span ref={ref} className={className}>
        {prefix}{count}{suffix}
      </span>
    );
  }
);

AnimatedCounter.displayName = "AnimatedCounter";

export default AnimatedCounter;
