"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { site, whatsappLink } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-night"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=80"
          alt="Residência de alto padrão assinada pela ARX Construtora"
          fill
          priority
          sizes="100vw"
          className="object-cover grayscale-[35%]"
        />
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/75 to-night/20"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-transparent to-night/50" />

      <div className="mx-auto w-full max-w-7xl px-5 py-32 lg:px-8">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="eyebrow eyebrow-on-night"
          >
            Construtora e Incorporadora · {site.city}/{site.region}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="font-display mt-6 text-5xl leading-[0.98] text-on-night sm:text-6xl lg:text-7xl"
          >
            Arquitetura
            <br />
            que <span className="text-white/60">permanece</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-on-night-muted"
          >
            Projetamos e construímos residências e empreendimentos de alto padrão
            em Navegantes e no litoral de Santa Catarina. Concreto, luz e precisão
            — obra própria do projeto à entrega das chaves.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/empreendimentos"
              className="group inline-flex items-center justify-center gap-2 bg-white px-8 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-on-night"
            >
              Ver empreendimentos
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
            <a
              href={whatsappLink(
                `Olá, ${site.name}! Gostaria de conhecer os empreendimentos de vocês.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-on-night/30 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-on-night transition-colors hover:border-white hover:bg-white/5"
            >
              Falar com a ARX
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-on-night-muted lg:flex"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em]">Role</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-white to-transparent"
        />
      </motion.div>
    </section>
  );
}
