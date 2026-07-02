"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const directions = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
} as const;

type Direction = keyof typeof directions;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** direção de entrada */
  from?: Direction;
  /** atraso em segundos */
  delay?: number;
  /** renderiza como outra tag */
  as?: "div" | "section" | "li" | "article" | "span";
}

/**
 * Revela o conteúdo suavemente quando entra na viewport.
 * Anima apenas uma vez. Respeita prefers-reduced-motion via `motion`.
 */
export default function Reveal({
  children,
  className,
  from = "up",
  delay = 0,
  as = "div",
}: RevealProps) {
  const offset = directions[from];
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Container que escalona a entrada dos filhos <RevealItem>. */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
