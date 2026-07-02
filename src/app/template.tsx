"use client";

import { motion } from "motion/react";

/**
 * Envolve cada rota: fade-in suave a cada navegação.
 * Só opacidade (sem transform) para não criar containing block
 * e quebrar o position: sticky da página de detalhe.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
