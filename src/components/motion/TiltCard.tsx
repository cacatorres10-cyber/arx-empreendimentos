"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { ReactNode } from "react";

/** Inclina o card em 3D conforme o cursor, com um brilho (glare) que segue. */
export default function TiltCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  // Só ativa após montar no cliente para não divergir do HTML do servidor.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const glareOpacity = useSpring(useMotionValue(0), {
    stiffness: 200,
    damping: 25,
  });
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), {
    stiffness: 200,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), {
    stiffness: 200,
    damping: 18,
  });
  const glareX = useTransform(px, [0, 1], ["0%", "100%"]);
  const glareY = useTransform(py, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(240px circle at ${glareX} ${glareY}, rgba(255,255,255,0.3), transparent 60%)`;

  if (!mounted || reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`[perspective:1100px] ${className ?? ""}`}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onMouseEnter={() => glareOpacity.set(1)}
      onMouseLeave={() => {
        px.set(0.5);
        py.set(0.5);
        glareOpacity.set(0);
      }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full"
      >
        {children}
        <motion.span
          aria-hidden
          style={{ background: glare, opacity: glareOpacity }}
          className="pointer-events-none absolute inset-0 z-20"
        />
      </motion.div>
    </motion.div>
  );
}
