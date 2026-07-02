import Image from "next/image";
import Reveal from "@/components/motion/Reveal";
import { site, whatsappLink } from "@/lib/site";

const pillars = [
  "Projeto e obra sob o mesmo comando",
  "Materialidade nobre e acabamento de exceção",
  "Prazos cumpridos e transparência total",
];

export default function About() {
  const years = new Date().getFullYear() - site.foundedYear;

  return (
    <section id="sobre" className="scroll-mt-24 bg-cream py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">
        <Reveal from="right">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80"
                alt="Obra de alto padrão da ARX Construtora"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale-[20%]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden bg-night px-8 py-6 sm:block">
              <p className="font-display text-4xl text-brand-on-night">
                {years}+
              </p>
              <p className="text-xs uppercase tracking-[0.25em] text-on-night-muted">
                anos construindo
              </p>
            </div>
            <div className="absolute -right-4 -top-4 -z-10 hidden h-full w-full border border-ink/20 sm:block" />
          </div>
        </Reveal>

        <Reveal from="left">
          <span className="eyebrow">Sobre a {site.shortName}</span>
          <h2 className="font-display mt-4 text-4xl text-ink sm:text-5xl">
            Construímos para
            <br />
            <span className="text-brand">durar</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Desde {site.foundedYear}, a {site.name} projeta e constrói residências
            e empreendimentos de alto padrão em Navegantes e no litoral de Santa
            Catarina. Unimos arquitetura autoral, engenharia precisa e obra
            própria para entregar espaços que atravessam o tempo — sólidos,
            atemporais e feitos para viver.
          </p>

          <ul className="mt-8 space-y-4">
            {pillars.map((p) => (
              <li key={p} className="flex items-start gap-3">
                <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center bg-brand text-[0.7rem] text-white">
                  ✓
                </span>
                <span className="text-sm text-ink">{p}</span>
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink(
              `Olá, ${site.name}! Gostaria de conhecer melhor o trabalho de vocês.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 bg-brand px-8 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-strong"
          >
            Conhecer a construtora
          </a>
        </Reveal>
      </div>
    </section>
  );
}
