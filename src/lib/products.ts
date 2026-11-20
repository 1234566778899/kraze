// Catálogo de ejemplo basado en las prendas del Instagram de KRAZE.
// Los precios, el stock y las medidas son de ejemplo: confirmar con la marca.

export type Size = "S" | "M" | "L";

export type Badge = { label: string; tone: "fire" | "ink" | "muted" };

export type Product = {
  slug: string;
  name: string;
  design: string;
  color: string;
  colorHex: string;
  price: number;
  images: string[];
  imageTone: "light" | "dark";
  stock: Record<Size, number>;
  badge?: Badge;
  collection: string;
  description: string;
};

const img = (name: string) => `/img/${name}`;

export const products: Product[] = [
  {
    slug: "polo-boxy-kraze-gaming-negro",
    name: 'Polo Boxy "kraze gaming"',
    design: "kraze gaming",
    color: "Negro",
    colorHex: "#0d0d0d",
    price: 45,
    images: [
      img("prod-negro-gaming.jpg"),
      img("ig-duo-vino-negro-estudio.png"),
      img("ig-reserve-seis-polos-flat.png"),
      img("ig-pareja-adventures-verde.png"),
    ],
    imageTone: "light",
    stock: { S: 2, M: 3, L: 2 },
    badge: { label: "Últimas 3", tone: "fire" },
    collection: "Drop 05",
    description:
      "Nuestro básico de todos los días. Bordado frontal minimalista, corte boxy con hombros caídos y algodón grueso que mantiene la forma.",
  },
  {
    slug: "polo-boxy-adventures-navy",
    name: 'Polo Boxy "Adventures"',
    design: "Adventures",
    color: "Navy",
    colorHex: "#1b2340",
    price: 45,
    images: [
      img("prod-navy-adventures.jpg"),
      img("ig-calle-navy-vino-espalda.png"),
      img("prod-vino-sports-navy.jpg"),
      img("ig-pareja-adventures-verde.png"),
    ],
    imageTone: "light",
    stock: { S: 6, M: 8, L: 5 },
    badge: { label: "Nuevo", tone: "ink" },
    collection: "Drop 05",
    description:
      'Estampado "kraze Adventures" en el pecho. Un azul marino profundo que combina con todo.',
  },
  {
    slug: "polo-boxy-kraze-originals-verde",
    name: 'Polo Boxy "Kraze Originals"',
    design: "Kraze Originals",
    color: "Verde",
    colorHex: "#1f3d2e",
    price: 45,
    images: [
      img("prod-verde-originals.jpg"),
      img("ig-verde-resort-collage.png"),
      img("ig-pareja-adventures-verde.png"),
    ],
    imageTone: "dark",
    stock: { S: 4, M: 5, L: 3 },
    collection: "Drop 05",
    description:
      'Verde botella con el sello "KRAZE ORIGINALS" al centro. Discreto, limpio y con mucha presencia.',
  },
  {
    slug: "polo-boxy-boundless-art-hueso",
    name: 'Polo Boxy "Boundless Art"',
    design: "Boundless Art",
    color: "Hueso",
    colorHex: "#ede6d8",
    price: 45,
    images: [
      img("prod-hueso-boundless.jpg"),
      img("ig-boundless-caminando.png"),
      img("ig-vino-atardecer-pareja.png"),
    ],
    imageTone: "light",
    stock: { S: 3, M: 2, L: 0 },
    badge: { label: "Últimas 5", tone: "fire" },
    collection: "Nueva colección",
    description:
      "Flor ilustrada en la espalda y el lema “From Kraze to the world”. Nuestra pieza más artística.",
  },
  {
    slug: "polo-boxy-sports-kraze-vino",
    name: 'Polo Boxy "Sports Kraze"',
    design: "Sports Kraze",
    color: "Vino",
    colorHex: "#6b1e2a",
    price: 45,
    images: [img("prod-vino-sports-navy.jpg"), img("ig-vino-estrellas-pared.png")],
    imageTone: "dark",
    stock: { S: 5, M: 6, L: 4 },
    collection: "Drop 05",
    description:
      "Gráfico de básquet en la espalda con tipografía script. Para los que viven en la cancha.",
  },
  {
    slug: "polo-boxy-kraze-low-blanco",
    name: 'Polo Boxy "KRAZE LOW"',
    design: "KRAZE LOW",
    color: "Blanco",
    colorHex: "#ffffff",
    price: 45,
    images: [img("ig-kraze-low-collage.png")],
    imageTone: "dark",
    stock: { S: 0, M: 0, L: 0 },
    badge: { label: "Agotado", tone: "muted" },
    collection: "3ra colección",
    description: "Dobermans y tipografía roja. Se agotó en días; atento al próximo drop.",
  },
  {
    slug: "polo-boxy-kraze-resort-verde",
    name: 'Polo Boxy "Kraze Resort"',
    design: "Kraze Resort",
    color: "Verde",
    colorHex: "#1f3d2e",
    price: 45,
    images: [img("ig-verde-resort-collage.png")],
    imageTone: "dark",
    stock: { S: 2, M: 4, L: 3 },
    collection: "4ta colección",
    description: "Escudo “Kraze Resort” con cinco estrellas en la espalda. Vibra de club privado.",
  },
  {
    slug: "polo-boxy-kraze-studios-vino",
    name: 'Polo Boxy "Kraze Studios"',
    design: "Kraze Studios",
    color: "Vino",
    colorHex: "#8e1b24",
    price: 45,
    images: [img("ig-vino-estrellas-pared.png")],
    imageTone: "dark",
    stock: { S: 3, M: 3, L: 2 },
    badge: { label: "Nuevo", tone: "ink" },
    collection: "4ta colección",
    description: "Loungewear Esthétique: laureles y tipografía serif en la espalda, rojo intenso.",
  },
];

export const sizes: Size[] = ["S", "M", "L"];

// Medidas de la prenda en plano (cm). Valores de ejemplo.
export const measurements: { size: Size; length: number; chest: number; shoulder: number; sleeve: number }[] = [
  { size: "S", length: 68, chest: 58, shoulder: 56, sleeve: 22 },
  { size: "M", length: 70, chest: 61, shoulder: 58, sleeve: 23 },
  { size: "L", length: 72, chest: 64, shoulder: 60, sleeve: 24 },
];

export const totalStock = (p: Product) => Object.values(p.stock).reduce((a, b) => a + b, 0);

export const isSoldOut = (p: Product) => totalStock(p) === 0;

export const formatPrice = (n: number) => `S/ ${n.toFixed(0)}`;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const filters = ["Todos", "Negro", "Navy", "Vino", "Verde", "Hueso"] as const;

export const collections = [
  { number: "01", title: "1ra colección", year: "2025", status: "Agotada", image: "/img/ig-reserve-seis-polos-flat.png" },
  { number: "02", title: "2da colección", year: "2025", status: "Quedan 4 piezas", image: "/img/ig-verde-resort-collage.png" },
  { number: "03", title: "3ra colección", year: "2026", status: "Quedan 9 piezas", image: "/img/ig-kraze-low-collage.png" },
  { number: "04", title: "4ta colección", year: "2026", status: "Quedan 12 piezas", image: "/img/ig-calle-navy-vino-espalda.png" },
];

export const community = [
  { image: "/img/ig-calle-navy-vino-espalda.png", caption: "Pucallpa" },
  { image: "/img/ig-boundless-caminando.png", caption: "Pucallpa" },
  { image: "/img/ig-pareja-adventures-verde.png", caption: "Huánuco" },
  { image: "/img/ig-vino-estrellas-pared.png", caption: "Pucallpa" },
  { image: "/img/ig-bmx-polo.png", caption: "Tingo María" },
  { image: "/img/ig-vino-atardecer-pareja.png", caption: "Pucallpa" },
];
