"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import HeroSearch from "@/components/HeroSearch";

const ease = [0.22, 1, 0.36, 1] as const;

const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const wordItem = {
  hidden: { opacity: 0, y: "0.5em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const headline = "Encontre o imóvel dos seus sonhos no litoral de".split(" ");

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const reduce = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-night"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: [1, 1.09] }}
          transition={
            reduce
              ? undefined
              : {
                  duration: 22,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }
          }
        >
          <Image
            src="/hero-navegantes.jpg"
            alt="Praia de Navegantes, Santa Catarina"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Overlays azul-marinho para legibilidade sobre a foto */}
      <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 to-night/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-night/40" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-28 pb-16 lg:px-8">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="eyebrow eyebrow-on-night"
          >
            Construtora e Incorporadora · Navegantes/SC
          </motion.p>

          <h1 className="font-display mt-5 text-4xl leading-[1.08] text-on-night sm:text-5xl lg:text-6xl">
            <motion.span
              variants={wordContainer}
              initial="hidden"
              animate="show"
              className="inline-flex flex-wrap gap-x-[0.28em] gap-y-1 sm:gap-y-2"
            >
              {headline.map((w, i) => (
                <motion.span key={i} variants={wordItem} className="inline-block">
                  {w}
                </motion.span>
              ))}
              <motion.span
                variants={wordItem}
                className="text-shimmer inline-block"
              >
                Santa Catarina
              </motion.span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-on-night-muted"
          >
            Empreendimentos de alto padrão em Navegantes e região, com obra
            própria da ARX, do projeto à entrega das chaves.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="mt-10"
          >
            <HeroSearch />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
