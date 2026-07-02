export type PropertyType =
  | "Residência"
  | "Cobertura"
  | "Apartamento"
  | "Casa"
  | "Comercial"
  | "Terreno";

export type PropertyStatus = "Lançamento" | "Em obras" | "Pronto para morar";

export interface Property {
  slug: string;
  title: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number; // a partir de
  city: string;
  neighborhood: string;
  bedrooms: number;
  suites: number;
  bathrooms: number;
  parking: number;
  area: number; // m² privativos
  delivery: string; // previsão de entrega
  featured: boolean;
  description: string;
  features: string[];
  images: string[];
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

export const properties: Property[] = [
  {
    slug: "residencia-vi-condominio-praia-brava",
    title: "Residência V | I",
    type: "Residência",
    status: "Em obras",
    price: 6900000,
    city: "Itajaí",
    neighborhood: "Praia Brava",
    bedrooms: 4,
    suites: 4,
    bathrooms: 6,
    parking: 4,
    area: 420,
    delivery: "Entrega 2027",
    featured: true,
    description:
      "Projeto autoral em concreto aparente e vidro, integrado ao terreno em declive. Pé-direito duplo, iluminação natural em todos os ambientes e piscina de borda infinita voltada para a mata. Uma residência que dialoga com a paisagem.",
    features: [
      "Concreto aparente e vidro",
      "Pé-direito duplo no living",
      "Piscina de borda infinita",
      "Automação integral",
      "4 suítes com closet",
      "Home theater e adega",
    ],
    images: [
      img("photo-1600585154340-be6161a56a0c"),
      img("photo-1600596542815-ffad4c1539a9"),
      img("photo-1600607687939-ce8a6c25118c"),
      img("photo-1600566753086-00f18fb6b3ea"),
    ],
  },
  {
    slug: "arx-tower-navegantes-frente-mar",
    title: "ARX Tower Navegantes",
    type: "Apartamento",
    status: "Lançamento",
    price: 2450000,
    city: "Navegantes",
    neighborhood: "Centro",
    bedrooms: 3,
    suites: 3,
    bathrooms: 4,
    parking: 3,
    area: 176,
    delivery: "Lançamento 2026",
    featured: true,
    description:
      "Torre residencial de alto padrão a poucos metros da orla de Navegantes. Plantas de 3 suítes com amplo living integrado à varanda gourmet, infraestrutura completa de lazer no rooftop e vista definitiva para o mar.",
    features: [
      "Rooftop com piscina e vista mar",
      "Varanda gourmet integrada",
      "3 suítes por unidade",
      "Academia e espaço wellness",
      "Lobby com concierge",
      "3 vagas por unidade",
    ],
    images: [
      img("photo-1545324418-cc1a3fa10c00"),
      img("photo-1502672260266-1c1ef2d93688"),
      img("photo-1493809842364-78817add7ffb"),
    ],
  },
  {
    slug: "residencia-em-encosta-costeira",
    title: "Residência E | M",
    type: "Residência",
    status: "Pronto para morar",
    price: 5200000,
    city: "Balneário Camboriú",
    neighborhood: "Praia dos Amores",
    bedrooms: 4,
    suites: 3,
    bathrooms: 5,
    parking: 4,
    area: 360,
    delivery: "Entregue",
    featured: true,
    description:
      "Volumes horizontais em concreto e madeira sobre encosta costeira. Ambientes generosos que se abrem para o jardim tropical e para o mar. Materialidade nobre, conforto térmico e privacidade absoluta.",
    features: [
      "Concreto e madeira natural",
      "Jardim tropical assinado",
      "Suíte master com terraço",
      "Área gourmet coberta",
      "Conforto térmico passivo",
    ],
    images: [
      img("photo-1512917774080-9991f1c4c750"),
      img("photo-1600585152220-90363fe7e115"),
      img("photo-1600047509807-ba8f99d2cdde"),
    ],
  },
  {
    slug: "residencia-rc-condominio-fechado",
    title: "Residência R | C",
    type: "Casa",
    status: "Em obras",
    price: 4300000,
    city: "Itajaí",
    neighborhood: "São Vicente",
    bedrooms: 4,
    suites: 4,
    bathrooms: 5,
    parking: 4,
    area: 315,
    delivery: "Entrega 2026",
    featured: false,
    description:
      "Casa térrea em condomínio fechado, com pátio interno e brise de madeira que filtra a luz ao longo do dia. Planta fluida, integração total entre estar, jantar e área externa. Arquitetura contemporânea de baixa manutenção.",
    features: [
      "Pátio interno ajardinado",
      "Brise de madeira",
      "Planta térrea integrada",
      "Piscina aquecida",
      "Condomínio com segurança 24h",
    ],
    images: [
      img("photo-1512918728675-ed5a9ecdebfd"),
      img("photo-1600585154340-be6161a56a0c"),
      img("photo-1600047509807-ba8f99d2cdde"),
    ],
  },
  {
    slug: "arx-garden-residence-navegantes",
    title: "ARX Garden Residence",
    type: "Apartamento",
    status: "Lançamento",
    price: 1650000,
    city: "Navegantes",
    neighborhood: "Gravatá",
    bedrooms: 2,
    suites: 2,
    bathrooms: 3,
    parking: 2,
    area: 118,
    delivery: "Lançamento 2026",
    featured: false,
    description:
      "Edifício boutique com poucas unidades por andar, projetado para quem valoriza exclusividade e bem-estar. Áreas comuns integradas ao paisagismo, coworking e espaço fitness. Localização estratégica em Navegantes.",
    features: [
      "Poucas unidades por andar",
      "Paisagismo integrado",
      "Coworking e fitness",
      "2 suítes por unidade",
      "Bicicletário e pet place",
    ],
    images: [
      img("photo-1613977257363-707ba9348227"),
      img("photo-1502672260266-1c1ef2d93688"),
      img("photo-1493809842364-78817add7ffb"),
    ],
  },
  {
    slug: "arx-corporate-navegantes",
    title: "ARX Corporate",
    type: "Comercial",
    status: "Em obras",
    price: 980000,
    city: "Navegantes",
    neighborhood: "Centro",
    bedrooms: 0,
    suites: 0,
    bathrooms: 0,
    parking: 2,
    area: 92,
    delivery: "Entrega 2027",
    featured: false,
    description:
      "Salas comerciais de alto padrão em edifício corporativo no coração de Navegantes. Fachada em pele de vidro, lajes amplas e flexíveis, e infraestrutura completa para negócios exigentes.",
    features: [
      "Fachada em pele de vidro",
      "Lajes amplas e flexíveis",
      "Infraestrutura corporativa",
      "Estacionamento rotativo",
    ],
    images: [
      img("photo-1497366216548-37526070297c"),
      img("photo-1524758631624-e2822e304c36"),
    ],
  },
];

export function getProperty(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function featuredProperties(): Property[] {
  return properties.filter((p) => p.featured);
}
