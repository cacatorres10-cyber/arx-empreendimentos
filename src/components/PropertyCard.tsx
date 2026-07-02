import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/data/properties";
import { formatArea, formatPrice } from "@/lib/format";

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-display text-lg leading-none text-ink">
        {value}
      </span>
      <span className="mt-1 text-[0.65rem] uppercase tracking-widest text-muted">
        {label}
      </span>
    </div>
  );
}

export default function PropertyCard({ property }: { property: Property }) {
  const {
    slug,
    title,
    type,
    status,
    price,
    city,
    neighborhood,
    bedrooms,
    bathrooms,
    parking,
    area,
    delivery,
    images,
  } = property;

  return (
    <Link
      href={`/empreendimentos/${slug}`}
      className="group flex h-full flex-col overflow-hidden border border-line bg-surface transition-all duration-500 hover:shadow-[0_24px_60px_-30px_rgba(23,20,15,0.45)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={images[0]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 bg-ink px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-white">
          {status}
        </span>
        <span className="absolute right-4 top-4 bg-black/55 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-white backdrop-blur-sm">
          {type}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">
          {neighborhood} · {city}
        </p>
        <h3 className="mt-2 font-display text-2xl text-ink">{title}</h3>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-[0.7rem] uppercase tracking-widest text-muted">
            A partir de
          </span>
          <span className="font-display text-2xl text-ink">
            {formatPrice(price)}
          </span>
        </div>
        <p className="mt-1 text-xs uppercase tracking-widest text-muted">
          {delivery}
        </p>

        <div className="mt-6 flex-1" />

        {type !== "Terreno" ? (
          <div className="grid grid-cols-4 gap-3 border-t border-line pt-5">
            <Spec label="Quartos" value={String(bedrooms)} />
            <Spec label="Banhos" value={String(bathrooms)} />
            <Spec label="Vagas" value={String(parking)} />
            <Spec label="Área" value={formatArea(area)} />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 border-t border-line pt-5">
            <Spec label="Tipo" value="Terreno" />
            <Spec label="Área" value={formatArea(area)} />
          </div>
        )}

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors group-hover:text-brand-strong">
          Ver detalhes
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
