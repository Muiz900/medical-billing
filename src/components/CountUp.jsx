import { useEffect, useRef, useState } from "react";
import {
  animate,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { premiumEase } from "./motion.js";

function formatValue(value, decimals) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export default function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1600,
  className = "",
}) {
  const ref = useRef(null);
  const hasAnimated = useRef(false);
  const isInView = useInView(ref, { once: true, amount: 0.45 });
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(formatValue(0, decimals));

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplayValue(formatValue(latest, decimals));
  });

  useEffect(() => {
    if (!isInView || hasAnimated.current) {
      return undefined;
    }

    hasAnimated.current = true;

    if (shouldReduceMotion) {
      motionValue.set(value);
      return undefined;
    }

    const controls = animate(motionValue, value, {
      duration: duration / 1000,
      ease: premiumEase,
    });

    return () => controls.stop();
  }, [duration, isInView, motionValue, shouldReduceMotion, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
