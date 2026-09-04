"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * The photographic wipe (§5): the frame clips bottom to top while the render
 * settles from 1.08 to 1. Same contract as the gallery tiles.
 *
 * The observer sits on the wrapper rather than the frame: a frame clipped to
 * zero height never intersects, so watching it would deadlock its own reveal.
 */
export default function ClipReveal({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const open = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  const transition = reduce ? { duration: 0 } : { duration: 1.1, ease: EXPO };

  return (
    <div ref={ref}>
      <motion.div
        className={`ok-clip ${className}`.trim()}
        style={style}
        animate={{ clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)" }}
        transition={transition}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ scale: open ? 1 : 1.08 }}
          transition={transition}
          style={{ willChange: "transform" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
