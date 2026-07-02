"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { properties, type PropertyType } from "@/data/properties";

const TYPES: (PropertyType | "")[] = [
  "",
  "Residência",
  "Apartamento",
  "Casa",
  "Cobertura",
  "Comercial",
  "Terreno",
];

/**
 * Busca principal (hero). Monta a query e navega para /empreendimentos,
 * que já inicia o catálogo filtrado. Integra com qualquer imóvel presente
 * no catálogo, inclusive os que vierem do painel no futuro.
 */
export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [tipo, setTipo] = useState("");
  const [cidade, setCidade] = useState("");

  const cities = useMemo(
    () => Array.from(new Set(properties.map((p) => p.city))).sort(),
    []
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (tipo) params.set("tipo", tipo);
    if (cidade) params.set("cidade", cidade);
    const qs = params.toString();
    router.push(`/empreendimentos${qs ? `?${qs}` : ""}`);
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-3 border border-white/15 bg-white/95 p-3 shadow-2xl shadow-black/30 backdrop-blur md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center md:gap-2 md:p-2.5"
    >
      <div className="flex flex-col px-2">
        <label className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted">
          O que você procura
        </label>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Ex.: cobertura, ARX Tower, Praia Brava..."
          className="mt-1 w-full bg-transparent py-1 text-sm text-ink placeholder:text-muted/60 focus:outline-none"
        />
      </div>

      <div className="flex flex-col border-t border-line px-2 md:border-l md:border-t-0 md:pl-3">
        <label className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted">
          Tipo
        </label>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="mt-1 w-full bg-transparent py-1 text-sm text-ink focus:outline-none"
        >
          {TYPES.map((t) => (
            <option key={t || "todos"} value={t}>
              {t || "Todos os tipos"}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col border-t border-line px-2 md:border-l md:border-t-0 md:pl-3">
        <label className="text-[0.6rem] font-semibold uppercase tracking-widest text-muted">
          Cidade
        </label>
        <select
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
          className="mt-1 w-full bg-transparent py-1 text-sm text-ink focus:outline-none"
        >
          <option value="">Todas as cidades</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-[var(--radius)] bg-accent px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-strong"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" strokeLinecap="round" />
        </svg>
        Buscar
      </button>
    </form>
  );
}
