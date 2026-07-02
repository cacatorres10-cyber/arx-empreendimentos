import Reveal from "@/components/motion/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  onNight?: boolean;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  onNight = false,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <Reveal
      className={`flex flex-col ${
        centered ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <span className={`eyebrow ${onNight ? "eyebrow-on-night" : ""}`}>
        {eyebrow}
      </span>
      <h2
        className={`font-display mt-4 max-w-3xl text-4xl sm:text-5xl ${
          onNight ? "text-on-night" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed ${
            onNight ? "text-on-night-muted" : "text-muted"
          }`}
        >
          {description}
        </p>
      )}
      <span
        className={`mt-6 h-px w-16 ${centered ? "mx-auto" : ""} ${
          onNight ? "bg-brand-on-night" : "bg-brand"
        }`}
      />
    </Reveal>
  );
}
