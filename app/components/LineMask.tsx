"use client";

import { Children, useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * The headline reveal (§5): each line rides up out of its own mask,
 * translateY 110% to 0, 0.9s on the expo curve, 0.07s apart. Not a fade.
 *
 * `open` deliberately ignores reduced motion, because the server always
 * renders it false; branching here would hydrate into an attribute mismatch.
 * Reduced motion is carried by the duration, which lands the same lines
 * instantly.
 */
export default function LineMask({
  children,
  className,
  style,
}: {
  /** One element per line: each is masked and revealed in turn. */
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const open = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const lines = Children.toArray(children);

  return (
    <span ref={ref} className={className} style={style}>
      {lines.map((line, i) => (
        <span key={i} className="ok-mask-line">
          <motion.span
            className="block"
            animate={{ y: open ? "0%" : "110%" }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: 0.9, ease: EXPO, delay: i * 0.07 }
            }
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
