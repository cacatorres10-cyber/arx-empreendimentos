/**
 * Logo ARX Empreendimentos (recriação em texto/degradê).
 * Fiel à marca: "ARX" com degradê azul→vermelho e "EMPREENDIMENTOS" abaixo.
 *
 * Para usar o arquivo oficial no lugar: coloque `logo.png`/`logo.svg` em
 * /public e troque este componente por <Image src="/logo.png" ... />.
 */
export default function Logo({
  size = "1.9rem",
  onDark = false,
  className = "",
}: {
  size?: string;
  onDark?: boolean;
  className?: string;
}) {
  const arxGradient = onDark
    ? "linear-gradient(95deg, #5c81e8 15%, #ff4b57 90%)"
    : "linear-gradient(95deg, var(--brand) 18%, var(--accent) 92%)";

  return (
    <span
      style={{ fontSize: size }}
      className={`inline-flex flex-col leading-none ${className}`}
      aria-label="ARX Empreendimentos"
    >
      <span
        className="font-display italic"
        style={{
          fontSize: "1em",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "0.01em",
          backgroundImage: arxGradient,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        ARX
      </span>
      <span
        style={{
          fontSize: "0.235em",
          letterSpacing: "0.28em",
          fontWeight: 600,
        }}
        className={`mt-[0.18em] ${onDark ? "text-on-night-muted" : "text-brand"}`}
      >
        EMPREENDIMENTOS
      </span>
    </span>
  );
}
