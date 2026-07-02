"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Logo from "@/components/Logo";
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-surface transition-shadow duration-300 ${
        scrolled ? "shadow-[0_2px_20px_-8px_rgba(15,27,51,0.25)]" : ""
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        <Link href="/" aria-label={site.name}>
          <Logo size="1.85rem" />
        </Link>

        {/* Links desktop */}
        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="group relative text-sm font-medium tracking-wide text-ink/80 transition-colors hover:text-brand"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
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
            className="hidden rounded-[var(--radius)] bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-strong sm:inline-block"
          >
            Fale com a ARX
          </a>

          {/* Botão mobile */}
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
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
            className="overflow-hidden border-t border-line bg-surface lg:hidden"
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
                  className="block rounded-[var(--radius)] bg-accent px-5 py-3 text-center text-sm font-semibold text-white"
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
