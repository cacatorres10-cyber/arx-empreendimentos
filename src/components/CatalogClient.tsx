"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PropertyCard from "@/components/PropertyCard";
import TiltCard from "@/components/motion/TiltCard";
import type {
  Property,
  PropertyStatus,
  PropertyType,
} from "@/data/properties";

const TYPES: (PropertyType | "Todos")[] = [
  "Todos",
  "Residência",
  "Apartamento",
  "Casa",
  "Cobertura",
  "Comercial",
  "Terreno",
];

const STATUS: (PropertyStatus | "Todos")[] = [
  "Todos",
  "Lançamento",
  "Em obras",
  "Pronto para morar",
];

const SORTS = [
  { key: "relevance", label: "Relevância" },
  { key: "price-asc", label: "Menor preço" },
  { key: "price-desc", label: "Maior preço" },
  { key: "area-desc", label: "Maior área" },
] as const;

type SortKey = (typeof SORTS)[number]["key"];

export default function CatalogClient({
  properties,
  initial,
}: {
  properties: Property[];
  initial?: { q?: string; tipo?: string; cidade?: string; situacao?: string };
}) {
  const cities = useMemo(
    () => ["Todas", ...Array.from(new Set(properties.map((p) => p.city)))],
    [properties]
  );

  // Valores iniciais vindos da busca (URL), validados contra as opções.
  const initType = (TYPES as string[]).includes(initial?.tipo ?? "")
    ? (initial!.tipo as (typeof TYPES)[number])
    : "Todos";
  const initStatus = (STATUS as string[]).includes(initial?.situacao ?? "")
    ? (initial!.situacao as (typeof STATUS)[number])
    : "Todos";
  const initCity = cities.includes(initial?.cidade ?? "")
    ? (initial!.cidade as string)
    : "Todas";

  const [q, setQ] = useState(initial?.q ?? "");
  const [type, setType] = useState<(typeof TYPES)[number]>(initType);
  const [status, setStatus] = useState<(typeof STATUS)[number]>(initStatus);
  const [city, setCity] = useState(initCity);
  const [minBedrooms, setMinBedrooms] = useState(0);
  const [sort, setSort] = useState<SortKey>("relevance");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const result = properties.filter((p) => {
      if (type !== "Todos" && p.type !== type) return false;
      if (status !== "Todos" && p.status !== status) return false;
      if (city !== "Todas" && p.city !== city) return false;
      if (minBedrooms > 0 && p.bedrooms < minBedrooms) return false;
      if (term) {
        const haystack =
          `${p.title} ${p.type} ${p.city} ${p.neighborhood} ${p.status}`.toLowerCase();
        if (!haystack.includes(term)) return false;
      }
      return true;
    });

    switch (sort) {
      case "price-asc":
        return result.sort((a, b) => a.price - b.price);
      case "price-desc":
        return result.sort((a, b) => b.price - a.price);
      case "area-desc":
        return result.sort((a, b) => b.area - a.area);
      default:
        return result.sort(
          (a, b) => Number(b.featured) - Number(a.featured)
        );
    }
  }, [properties, q, type, status, city, minBedrooms, sort]);

  const activeReset =
    q.trim() !== "" ||
    type !== "Todos" ||
    status !== "Todos" ||
    city !== "Todas" ||
    minBedrooms > 0;

  return (
    <div className="mx-auto max-w-7xl px-5 lg:px-8">
      {/* Barra de filtros */}
      <div className="border border-line bg-surface p-6 lg:p-8">
        {/* Busca por palavra-chave */}
        <div className="mb-6 flex items-center gap-3 border border-line bg-cream px-4 py-3">
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 flex-none text-brand"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por nome, bairro, cidade ou tipo de imóvel..."
            className="w-full bg-transparent text-sm text-ink placeholder:text-muted/70 focus:outline-none"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              aria-label="Limpar busca"
              className="text-muted hover:text-accent"
            >
              ✕
            </button>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <Field label="Situação">
            <div className="flex flex-wrap gap-2">
              {STATUS.map((s) => (
                <Chip
                  key={s}
                  active={status === s}
                  onClick={() => setStatus(s)}
                >
                  {s}
                </Chip>
              ))}
            </div>
          </Field>

          <Field label="Cidade">
            <Select value={city} onChange={setCity} options={cities} />
          </Field>

          <Field label="Quartos (mín.)">
            <div className="flex flex-wrap gap-2">
              {[0, 1, 2, 3, 4].map((n) => (
                <Chip
                  key={n}
                  active={minBedrooms === n}
                  onClick={() => setMinBedrooms(n)}
                >
                  {n === 0 ? "Todos" : `${n}+`}
                </Chip>
              ))}
            </div>
          </Field>

          <Field label="Ordenar por">
            <Select
              value={SORTS.find((s) => s.key === sort)?.label ?? ""}
              onChange={(label) =>
                setSort(
                  (SORTS.find((s) => s.label === label)?.key ??
                    "relevance") as SortKey
                )
              }
              options={SORTS.map((s) => s.label)}
            />
          </Field>
        </div>

        {/* Tipos */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-6">
          {TYPES.map((t) => (
            <Chip key={t} active={type === t} onClick={() => setType(t)}>
              {t}
            </Chip>
          ))}
          {activeReset && (
            <button
              onClick={() => {
                setQ("");
                setType("Todos");
                setStatus("Todos");
                setCity("Todas");
                setMinBedrooms(0);
              }}
              className="ml-auto text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              Limpar filtros ✕
            </button>
          )}
        </div>
      </div>

      {/* Contagem */}
      <p className="mt-8 text-sm text-muted">
        {filtered.length}{" "}
        {filtered.length === 1
          ? "empreendimento encontrado"
          : "empreendimentos encontrados"}
      </p>

      {/* Grade */}
      {filtered.length > 0 ? (
        <motion.div
          layout
          className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((property) => (
              <motion.div
                key={property.slug}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <TiltCard className="h-full">
                  <PropertyCard property={property} />
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-6 border border-dashed border-line py-24 text-center">
          <p className="font-display text-2xl text-ink">
            Nenhum empreendimento com esses filtros
          </p>
          <p className="mt-2 text-sm text-muted">
            Ajuste os critérios ou fale com a ARX para novidades e lançamentos.
          </p>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-3 block text-xs uppercase tracking-widest text-muted">
        {label}
      </span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-brand text-white"
          : "border border-line bg-surface text-ink hover:border-brand hover:text-brand"
      }`}
    >
      {children}
    </button>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-line bg-surface px-4 py-2.5 text-sm text-ink focus:border-brand focus:outline-none"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
