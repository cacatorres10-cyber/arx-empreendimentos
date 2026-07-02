const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

/** R$ 1.250.000 */
export function formatPrice(value: number) {
  return brl.format(value);
}

/** 320 m² */
export function formatArea(m2: number) {
  return `${new Intl.NumberFormat("pt-BR").format(m2)} m²`;
}
