import { forwardRef, useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
}

const directionMap = {
  up: { y: 1, x: 0 },
  down: { y: -1, x: 0 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

const ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  ({ children, className = "", delay = 0, direction = "up", distance = 40 }, _forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const d = directionMap[direction];

    return (
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, x: d.x * distance, y: d.y * distance }}
          animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.6, delay, ease: "easeOut" }}
          className={className}
        >
          {children}
        </motion.div>
      </div>
    );
  }
);

ScrollReveal.displayName = "ScrollReveal";

export default ScrollReveal;
