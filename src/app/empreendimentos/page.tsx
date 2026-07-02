import type { Metadata } from "next";
import CatalogClient from "@/components/CatalogClient";
import { properties } from "@/data/properties";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Empreendimentos",
  description: `Conheça os empreendimentos da ${site.name} em ${site.city} e no litoral de Santa Catarina. Lançamentos, obras em andamento e prontos para morar. Filtre por tipo, cidade e situação.`,
};

export default async function EmpreendimentosPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const first = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v ?? "";
  const initial = {
    q: first(sp.q),
    tipo: first(sp.tipo),
    cidade: first(sp.cidade),
    situacao: first(sp.situacao),
  };

  return (
    <>
      <section className="bg-night pt-36 pb-16 lg:pt-44 lg:pb-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <span className="eyebrow eyebrow-on-night">Portfólio ARX</span>
          <h1 className="font-display mt-4 break-words text-4xl text-on-night sm:text-5xl lg:text-6xl">
            Empreendimentos
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-on-night-muted">
            Residências autorais, torres residenciais e projetos comerciais.
            Use os filtros para encontrar o empreendimento ideal.
          </p>
        </div>
      </section>

      <section className="bg-cream py-12 lg:py-16">
        <CatalogClient
          key={`${initial.q}|${initial.tipo}|${initial.cidade}|${initial.situacao}`}
          properties={properties}
          initial={initial}
        />
      </section>
    </>
  );
}
