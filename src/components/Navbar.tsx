"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site, whatsappLink } from "@/lib/site";

const links = [
  { href: "/", label: "Início" },
  { href: "/empreendimentos", label: "Empreendimentos" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#contato", label: "Contato" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Só a home tem hero escuro atrás do menu; nas outras rotas, menu sempre sólido.
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu mobile ao trocar de rota.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        overHero
          ? "bg-transparent"
          : "bg-cream/90 backdrop-blur-md border-b border-line shadow-[0_1px_0_rgba(0,0,0,0.03)]"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="group flex flex-col leading-none">
          <span
            className={`wordmark text-2xl transition-colors ${
              overHero ? "text-on-night" : "text-ink"
            }`}
          >
            {site.shortName}
          </span>
          <span
            className={`mt-0.5 text-[0.55rem] uppercase tracking-[0.5em] transition-colors ${
              overHero ? "text-on-night-muted" : "text-muted"
            }`}
          >
            Construtora
          </span>
        </Link>

        {/* Links desktop */}
        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`group relative text-sm font-medium tracking-wide transition-colors ${
                  overHero
                    ? "text-on-night/90 hover:text-on-night"
                    : "text-ink/80 hover:text-ink"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${
                    overHero ? "bg-white" : "bg-ink"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={whatsappLink(
              `Olá, ${site.name}! Gostaria de falar com um consultor.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden px-5 py-2.5 text-sm font-semibold uppercase tracking-wider transition-all sm:inline-block ${
              overHero
                ? "bg-white text-ink hover:bg-on-night"
                : "bg-ink text-white hover:bg-brand-strong"
            }`}
          >
            Fale com a ARX
          </a>

          {/* Botão mobile */}
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center lg:hidden ${
              overHero ? "text-on-night" : "text-ink"
            }`}
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                  open ? "top-2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-2 block h-0.5 w-6 bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 bg-current transition-all duration-300 ${
                  open ? "top-2 -rotate-45" : "top-4"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line bg-cream lg:hidden"
          >
            <ul className="flex flex-col px-5 py-4">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block border-b border-line py-3 text-base font-medium text-ink"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={whatsappLink(
                    `Olá, ${site.name}! Gostaria de falar com um consultor.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-ink px-5 py-3 text-center text-sm font-semibold uppercase tracking-wider text-white"
                >
                  Fale com a ARX
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
