"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Barra fina no topo que acompanha o progresso de rolagem. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-brand via-brand to-accent"
    />
  );
}
