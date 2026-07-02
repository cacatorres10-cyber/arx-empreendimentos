import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyCard from "@/components/PropertyCard";
import Reveal from "@/components/motion/Reveal";
import { getProperty, properties } from "@/data/properties";
import { formatArea, formatPrice } from "@/lib/format";
import { site, whatsappLink } from "@/lib/site";

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return { title: "Empreendimento não encontrado" };

  return {
    title: `${property.title} — ${property.neighborhood}, ${property.city}`,
    description: property.description,
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const {
    title,
    type,
    status,
    price,
    city,
    neighborhood,
    bedrooms,
    suites,
    bathrooms,
    parking,
    area,
    delivery,
    description,
    features,
    images,
  } = property;

  const message = `Olá, ${site.name}! Tenho interesse no empreendimento "${title}" (${neighborhood}, ${city}). Podemos conversar?`;

  const specs =
    bedrooms > 0
      ? [
          { label: "Quartos", value: String(bedrooms) },
          { label: "Suítes", value: String(suites) },
          { label: "Banheiros", value: String(bathrooms) },
          { label: "Vagas", value: String(parking) },
          { label: "Área privativa", value: formatArea(area) },
        ]
      : [
          { label: "Tipo", value: type },
          { label: "Área", value: formatArea(area) },
          { label: "Vagas", value: String(parking) },
        ];

  const related = properties
    .filter((p) => p.slug !== slug && p.city === city)
    .slice(0, 3);
  const relatedFallback =
    related.length > 0
      ? related
      : properties.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="bg-night pt-28 pb-6 lg:pt-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <nav className="text-xs uppercase tracking-widest text-on-night-muted">
            <Link href="/" className="hover:text-white">
              Início
            </Link>
            <span className="mx-2">/</span>
            <Link href="/empreendimentos" className="hover:text-white">
              Empreendimentos
            </Link>
            <span className="mx-2">/</span>
            <span className="text-on-night">{title}</span>
          </nav>
        </div>
      </div>

      <section className="bg-cream py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="bg-ink px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-widest text-white">
                  {status}
                </span>
                <span className="text-xs uppercase tracking-widest text-muted">
                  {type} · {neighborhood}, {city} · {delivery}
                </span>
              </div>
              <h1 className="font-display mt-3 text-4xl text-ink sm:text-5xl">
                {title}
              </h1>
            </div>
            <div className="text-right">
              <span className="block text-[0.7rem] uppercase tracking-widest text-muted">
                A partir de
              </span>
              <span className="font-display text-4xl text-ink">
                {formatPrice(price)}
              </span>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PropertyGallery images={images} title={title} />

              <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex flex-col items-center bg-surface px-4 py-6 text-center"
                  >
                    <span className="font-display text-2xl text-ink">
                      {s.value}
                    </span>
                    <span className="mt-1 text-[0.65rem] uppercase tracking-widest text-muted">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h2 className="font-display text-3xl text-ink">
                  Sobre o empreendimento
                </h2>
                <span className="mt-4 block h-px w-16 bg-ink" />
                <p className="mt-6 text-base leading-relaxed text-muted">
                  {description}
                </p>
              </div>

              <div className="mt-12">
                <h2 className="font-display text-3xl text-ink">Diferenciais</h2>
                <span className="mt-4 block h-px w-16 bg-ink" />
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 border border-line bg-surface px-4 py-3 text-sm text-ink"
                    >
                      <span className="flex h-5 w-5 flex-none items-center justify-center bg-ink text-[0.7rem] text-white">
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-28 border border-line bg-surface p-8">
                <p className="eyebrow">Interessou-se?</p>
                <h3 className="font-display mt-3 text-3xl text-ink">
                  Fale com a ARX
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Receba a apresentação completa, plantas, tabela de valores e
                  condições exclusivas deste empreendimento.
                </p>

                <a
                  href={whatsappLink(message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex w-full items-center justify-center gap-2 bg-[#25D366] py-4 text-sm font-semibold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
                >
                  Chamar no WhatsApp
                </a>
                <a
                  href={`mailto:${site.email}?subject=${encodeURIComponent(
                    `Interesse: ${title}`
                  )}`}
                  className="mt-3 flex w-full items-center justify-center gap-2 border border-ink/20 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  Enviar e-mail
                </a>

                <div className="mt-8 border-t border-line pt-6 text-sm text-muted">
                  <p className="font-semibold text-ink">{site.name}</p>
                  <p className="mt-1">CNPJ {site.cnpj}</p>
                  <p className="mt-1">{site.address}</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Outros empreendimentos
            </h2>
            <span className="mt-4 block h-px w-16 bg-ink" />
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {relatedFallback.map((p) => (
              <PropertyCard key={p.slug} property={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
