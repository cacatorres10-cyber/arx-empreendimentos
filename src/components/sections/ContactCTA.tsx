"use client";

import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { site, whatsappLink } from "@/lib/site";

export default function ContactCTA() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Sem backend: encaminhamos a mensagem para o WhatsApp e mostramos confirmação.
    const text = `Olá, ${site.name}! Meu nome é ${form.name}.%0A${
      form.message || "Gostaria de mais informações."
    }%0A(Telefone: ${form.phone})`;
    window.open(`https://wa.me/${site.whatsapp}?text=${text}`, "_blank");
    setSent(true);
  }

  return (
    <section id="contato" className="scroll-mt-24 bg-night py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2 lg:px-8">
        {/* Texto */}
        <div>
          <span className="eyebrow eyebrow-on-night">Vamos conversar</span>
          <h2 className="font-display mt-4 text-4xl text-on-night sm:text-5xl">
            Vamos construir o seu
            <br />
            <span className="text-white/60">próximo endereço</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-on-night-muted">
            Conte sobre o seu projeto ou o empreendimento que despertou seu
            interesse. Nosso time retorna com plantas, condições e todas as
            informações. Atendimento direto, sem intermediários.
          </p>

          <div className="mt-10 space-y-4 text-sm text-on-night-muted">
            <a
              href={whatsappLink(`Olá, ${site.name}!`)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 transition-colors hover:text-brand"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15">
                ☏
              </span>
              WhatsApp direto
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 transition-colors hover:text-brand"
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
              className="flex min-h-[380px] flex-col items-center justify-center text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-ink">
                ✓
              </div>
              <h3 className="font-display mt-6 text-3xl text-on-night">
                Mensagem enviada!
              </h3>
              <p className="mt-3 max-w-xs text-sm text-on-night-muted">
                Abrimos o WhatsApp para você concluir o envio. Em breve um
                consultor retornará o contato.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-8 text-sm font-semibold uppercase tracking-widest text-on-night-muted hover:text-white"
              >
                Enviar outra mensagem
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-on-night-muted">
                  Nome
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border-b border-white/20 bg-transparent py-3 text-on-night placeholder:text-white/30 focus:border-brand focus:outline-none"
                  placeholder="Seu nome completo"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-on-night-muted">
                  Telefone / WhatsApp
                </label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border-b border-white/20 bg-transparent py-3 text-on-night placeholder:text-white/30 focus:border-brand focus:outline-none"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-widest text-on-night-muted">
                  Como podemos ajudar?
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full resize-none border-b border-white/20 bg-transparent py-3 text-on-night placeholder:text-white/30 focus:border-brand focus:outline-none"
                  placeholder="Ex.: tenho interesse no ARX Tower Navegantes / quero construir uma residência."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-on-night"
              >
                Enviar mensagem
              </button>
              <p className="text-center text-xs text-on-night-muted">
                Ao enviar, você será direcionado ao nosso WhatsApp.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
