/**
 * Configuração central da marca — ARX Construtora.
 * Ajuste telefone/textos quando confirmar os dados finais.
 */
export const site = {
  name: "ARX Construtora",
  shortName: "ARX",
  tagline: "Arquitetura de alto padrão em Navegantes",
  city: "Navegantes",
  region: "SC",
  // WhatsApp internacional, só dígitos (55 = Brasil, 47 = DDD).
  // ATENÇÃO: cliente informou "47 9714-8147" (8 dígitos). Celular BR tem 9.
  // Confirmar o dígito faltante — provável 47 9 9714-8147 ou similar.
  whatsapp: "554797148147",
  whatsappDisplay: "(47) 9714-8147",
  email: "contato@arxconstrutora.com",
  address: "Rua Félix Krieger, 640 — Gravatá, Navegantes/SC",
  instagram: "https://www.instagram.com/arx.construtora/",
  site: "https://www.arxconstrutora.com",
  foundedYear: 2015,
  cnpj: "22.576.027/0001-60",
} as const;

/** Monta um link de WhatsApp com mensagem pré-preenchida. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
