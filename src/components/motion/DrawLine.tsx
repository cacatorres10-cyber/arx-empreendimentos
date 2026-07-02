"use client";

import { motion } from "motion/react";

/** Filete que "desenha" da esquerda para a direita ao entrar na viewport. */
export default function DrawLine({
  className = "",
  color = "accent",
}: {
  className?: string;
  color?: "accent" | "brand" | "on-night";
}) {
  const bg =
    color === "brand"
      ? "bg-brand"
      : color === "on-night"
      ? "bg-brand-on-night"
      : "bg-accent";

  return (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`block h-0.5 w-16 origin-left ${bg} ${className}`}
    />
  );
}
