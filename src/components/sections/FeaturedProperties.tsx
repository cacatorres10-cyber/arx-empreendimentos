import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import PropertyCard from "@/components/PropertyCard";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { featuredProperties } from "@/data/properties";

export default function FeaturedProperties() {
  const items = featuredProperties();

  return (
    <section className="bg-cream py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Nosso portfólio"
          title="Empreendimentos em destaque"
          description="Projetos que traduzem a assinatura ARX: arquitetura autoral, execução impecável e localizações privilegiadas no litoral catarinense."
        />

        <RevealGroup className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((property) => (
            <RevealItem key={property.slug} className="h-full">
              <PropertyCard property={property} />
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-14 flex justify-center">
          <Link
            href="/empreendimentos"
            className="group inline-flex items-center gap-2 border border-ink/20 px-8 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
          >
            Ver todos os empreendimentos
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
