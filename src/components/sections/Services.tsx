import SectionHeading from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";

const services = [
  {
    number: "01",
    title: "Incorporação",
    description:
      "Estudo de viabilidade, aquisição de terreno e concepção de empreendimentos com forte potencial de valorização.",
  },
  {
    number: "02",
    title: "Projeto autoral",
    description:
      "Arquitetura contemporânea assinada, que respeita o terreno, a luz e a materialidade. Cada obra é única.",
  },
  {
    number: "03",
    title: "Construção própria",
    description:
      "Executamos com equipe própria e controle rigoroso de qualidade, prazo e acabamento em cada etapa da obra.",
  },
  {
    number: "04",
    title: "Pós-obra e entrega",
    description:
      "Vistoria assistida, manutenção e relacionamento contínuo. Nosso compromisso não termina na entrega das chaves.",
  },
];

export default function Services() {
  return (
    <section className="bg-surface py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          eyebrow="Do terreno à chave"
          title="Verticalização completa"
          description="Da concepção à entrega, tudo sob o mesmo teto. Esse controle de ponta a ponta é o que garante a qualidade que assina cada obra ARX."
          align="left"
        />

        <RevealGroup className="mt-16 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <RevealItem key={s.number} className="h-full">
              <div className="group flex h-full flex-col bg-surface p-8 transition-colors duration-500 hover:bg-cream">
                <span className="font-display text-4xl text-brand-soft transition-colors duration-500 group-hover:text-brand">
                  {s.number}
                </span>
                <h3 className="mt-6 font-display text-2xl text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {s.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
