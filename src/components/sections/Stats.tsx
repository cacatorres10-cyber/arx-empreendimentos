import AnimatedNumber from "@/components/motion/AnimatedNumber";
import Reveal from "@/components/motion/Reveal";

const stats = [
  { value: 10, suffix: "+", label: "Anos construindo" },
  { value: 25, suffix: "+", label: "Empreendimentos entregues" },
  { value: 90, suffix: " mil m²", label: "Área construída" },
  { value: 100, suffix: "%", label: "Obra própria" },
];

export default function Stats() {
  return (
    <section className="bg-night py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.1}
              className="flex flex-col items-center text-center"
            >
              <AnimatedNumber
                value={s.value}
                suffix={s.suffix}
                className="font-display text-5xl text-brand-on-night lg:text-6xl"
              />
              <span className="mt-3 text-xs uppercase tracking-[0.25em] text-on-night-muted">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
