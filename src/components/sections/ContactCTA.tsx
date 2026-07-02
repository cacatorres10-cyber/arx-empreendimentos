"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { properties } from "@/data/properties";
import { site } from "@/lib/site";

const EMPTY = { name: "", phone: "", email: "", interest: "", message: "" };

export default function ContactCTA() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState(EMPTY);

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Mensagem personalizada encaminhada ao WhatsApp da ARX.
    const lines = [
      `Olá, ${site.name}! Meu nome é ${form.name}.`,
      form.interest
        ? `Tenho interesse em: ${form.interest}.`
        : "Gostaria de mais informações sobre os empreendimentos.",
      form.message ? `Mensagem: ${form.message}` : "",
      "",
      `Contato: ${form.phone}${form.email ? ` · ${form.email}` : ""}`,
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, "_blank");
    setSent(true);
  }

  return (
    <section id="contato" className="scroll-mt-24 bg-night py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">
        {/* Texto */}
        <div>
          <span className="eyebrow eyebrow-on-night">Fale com a ARX</span>
          <h2 className="font-display mt-4 text-4xl text-on-night sm:text-5xl">
            Vamos encontrar o seu
            <br />
            <span className="text-accent">próximo endereço</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-on-night-muted">
            Preencha o formulário e envie direto pelo WhatsApp com a sua mensagem
            já pronta. Nosso time retorna com plantas, valores e condições.
          </p>

          <div className="mt-10 space-y-4 text-sm text-on-night-muted">
            <a
              href={`https://wa.me/${site.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-accent"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
                ☏
              </span>
              WhatsApp {site.whatsappDisplay}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 transition-colors hover:text-accent"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
                @
              </span>
              {site.email}
            </a>
            <p className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
                ⌖
              </span>
              {site.address}
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-night-2 p-8 lg:p-10">
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex min-h-[420px] flex-col items-center justify-center text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl text-white">
                ✓
              </div>
              <h3 className="font-display mt-6 text-3xl text-on-night">
                Tudo certo!
              </h3>
              <p className="mt-3 max-w-xs text-sm text-on-night-muted">
                Abrimos o WhatsApp com a sua mensagem pronta. É só enviar que um
                consultor da ARX retorna rapidinho.
              </p>
              <button
                onClick={() => {
                  setForm(EMPTY);
                  setSent(false);
                }}
                className="mt-8 text-sm font-semibold uppercase tracking-widest text-on-night-muted hover:text-accent"
              >
                Enviar outra mensagem
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Nome"
                required
                value={form.name}
                onChange={set("name")}
                placeholder="Seu nome completo"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="Telefone / WhatsApp"
                  required
                  value={form.phone}
                  onChange={set("phone")}
                  placeholder="(47) 90000-0000"
                />
                <Input
                  label="E-mail (opcional)"
                  type="email"
                  value={form.email}
                  onChange={set("email")}
                  placeholder="voce@email.com"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-on-night-muted">
                  Empreendimento de interesse
                </label>
                <select
                  value={form.interest}
                  onChange={(e) => set("interest")(e.target.value)}
                  className="w-full border-b border-white/20 bg-transparent py-3 text-on-night focus:border-accent focus:outline-none [&>option]:text-ink"
                >
                  <option value="">Ainda não sei / quero ajuda</option>
                  {properties.map((p) => (
                    <option key={p.slug} value={p.title}>
                      {p.title} · {p.city}
                    </option>
                  ))}
                  <option value="Tenho um terreno para construir">
                    Tenho um terreno para construir
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-on-night-muted">
                  Mensagem
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                  className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-on-night placeholder:text-white/30 focus:border-accent focus:outline-none"
                  placeholder="Conte o que procura: metragem, região, prazo..."
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 bg-accent py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-accent-strong"
              >
                Enviar pelo WhatsApp
              </button>
              <p className="text-center text-xs text-on-night-muted">
                Você será direcionado ao WhatsApp com a mensagem pronta.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-widest text-on-night-muted">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-white/20 bg-transparent py-3 text-on-night placeholder:text-white/30 focus:border-accent focus:outline-none"
      />
    </div>
  );
}
