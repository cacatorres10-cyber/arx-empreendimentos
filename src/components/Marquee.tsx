const items = [
  "Navegantes",
  "Itajaí",
  "Balneário Camboriú",
  "Praia Brava",
  "Alto padrão",
  "Obra própria",
  "Arquitetura autoral",
];

/** Faixa deslizante infinita (CSS puro, sem custo de JS). */
export default function Marquee() {
  const Row = () => (
    <div className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="font-display text-base uppercase tracking-wide text-white/95">
            {t}
          </span>
          <span className="mx-6 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
        </span>
      ))}
    </div>
  );

  return (
    <div
      className="overflow-hidden border-y border-white/10 bg-brand py-4"
      aria-hidden
    >
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </div>
  );
}
