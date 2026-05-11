import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { getRevealVariants } from "./motion.js";

export default function Reveal({
  as: Tag = "div",
  children,
  className = "",
  direction = "up",
  delay = 0,
  amount = 0.18,
  once = true,
  style,
  ...props
}) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once, amount });

  const MotionTag = useMemo(() => motion.create(Tag), [Tag]);
  const variants = useMemo(
    () => getRevealVariants(direction, shouldReduceMotion, delay),
    [delay, direction, shouldReduceMotion]
  );

  return (
    <MotionTag
      ref={ref}
      initial="hidden"
      animate={isInView || shouldReduceMotion ? "visible" : "hidden"}
      variants={variants}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
