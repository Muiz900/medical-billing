import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.45,
  });

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
      <motion.div
        className="h-full origin-left bg-[linear-gradient(90deg,#0f7a6c_0%,#7cc242_55%,#c2ec8f_100%)] shadow-[0_0_30px_rgba(124,194,66,0.65)]"
        style={{ scaleX }}
      />
    </div>
  );
}
