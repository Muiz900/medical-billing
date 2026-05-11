import { useEffect, useState } from "react";

export const premiumEase = [0.22, 1, 0.36, 1];
export const sectionViewport = { once: true, amount: 0.22 };

export const smoothTransition = {
  duration: 0.72,
  ease: premiumEase,
};

export const hoverSpring = {
  type: "spring",
  stiffness: 260,
  damping: 22,
  mass: 0.9,
};

export const pulseTransition = {
  duration: 2.6,
  ease: "easeInOut",
  repeat: Infinity,
};

export const floatTransition = {
  duration: 4.8,
  ease: "easeInOut",
  repeat: Infinity,
  repeatType: "mirror",
};

export function getRevealVariants(direction = "up", reducedMotion = false, delay = 0) {
  if (reducedMotion) {
    return {
      hidden: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration: 0.01 },
      },
    };
  }

  const hiddenStates = {
    up: { opacity: 0, y: 32, scale: 0.985, filter: "blur(8px)" },
    down: { opacity: 0, y: -32, scale: 0.985, filter: "blur(8px)" },
    left: { opacity: 0, x: 32, scale: 0.985, filter: "blur(8px)" },
    right: { opacity: 0, x: -32, scale: 0.985, filter: "blur(8px)" },
    zoom: { opacity: 0, scale: 0.94, filter: "blur(8px)" },
  };

  return {
    hidden: hiddenStates[direction] ?? hiddenStates.up,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        ...smoothTransition,
        delay: delay / 1000,
      },
    },
  };
}

export function getStaggerContainer(
  reducedMotion,
  { staggerChildren = 0.1, delayChildren = 0 } = {}
) {
  return {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: reducedMotion
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren, delayChildren },
    },
  };
}

export function getHoverLift(reducedMotion, y = -10) {
  if (reducedMotion) {
    return {};
  }

  return {
    y,
    transition: hoverSpring,
  };
}

export function getTapPress(reducedMotion, scale = 0.985) {
  if (reducedMotion) {
    return {};
  }

  return {
    scale,
    transition: {
      duration: 0.18,
      ease: premiumEase,
    },
  };
}

export function useScrollDirection({ threshold = 18, initialDirection = "up" } = {}) {
  const [direction, setDirection] = useState(initialDirection);

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    let lastY = window.scrollY;
    let frame = 0;

    const updateDirection = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY;

      if (Math.abs(delta) >= threshold) {
        setDirection(delta > 0 ? "down" : "up");
        lastY = currentY;
      }

      frame = 0;
    };

    const handleScroll = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(updateDirection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (frame) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, [threshold]);

  return direction;
}
