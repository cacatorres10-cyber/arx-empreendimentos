import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const testimonials = [
  {
    quote:
      "A ARX entregou nossa casa no prazo e com um acabamento acima do que imaginávamos. Cuidado com cada detalhe do início ao fim.",
    name: "Marina e Rafael",
    role: "Residência entregue · Praia dos Amores",
  },
  {
    quote:
      "Transparência total durante toda a obra. Acompanhei cada etapa e nunca tive uma surpresa desagradável. Recomendo de olhos fechados.",
    name: "Ricardo Menezes",
    role: "Cliente · Residência em Itajaí",
  },
  {
    quote:
      "Investi em uma unidade na planta e a valorização superou minhas expectativas. Uma construtora séria, que cumpre o que promete.",
    name: "Cláudia Fernandes",
    role: "Investidora · ARX Tower Navegantes",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Quem confia na ARX"
          title="Histórias construídas com a gente"
        />

        <RevealGroup className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <RevealItem key={t.name} className="h-full">
              <figure className="flex h-full flex-col border border-line bg-cream p-8">
                <span className="font-display text-6xl leading-none text-brand-soft">
                  &ldquo;
                </span>
                <blockquote className="-mt-4 flex-1 text-lg leading-relaxed text-ink">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-line pt-6">
                  <p className="font-display text-xl text-ink">{t.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
