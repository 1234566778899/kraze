// Catálogo armado a partir del Instagram de KRAZE (@kraze_peru): cada polo es un color con
// un estampado al frente y otro en la espalda. Precio S/ 45 y promo 2 x S/ 80 según sus publicaciones.
// El stock y las medidas siguen siendo de ejemplo: confirmar con la marca.

export type Size = "S" | "M" | "L";

export type Badge = { label: string; tone: "fire" | "ink" | "muted" };

export type Product = {
  slug: string;
  name: string;
  design: string;
  color: string;
  colorHex: string;
  price: number;
  /** Orden: frente (fondo blanco), espalda (fondo blanco) y luego fotos con modelos. */
  images: string[];
  imageTone: "light" | "dark";
  stock: Record<Size, number>;
  badge?: Badge;
  /** Estampado del frente y de la espalda, tal como aparecen en Instagram. */
  front: string;
  back: string;
  description: string;
};

// Fotos editadas a partir de las publicaciones de @kraze_peru (ver assets-src/instagram).
const gallery = (folder: string, models: number) => [
  `/img/productos/${folder}/frente.jpg`,
  `/img/productos/${folder}/espalda.jpg`,
  ...Array.from({ length: models }, (_, i) => `/img/productos/${folder}/modelo-${i + 1}.jpg`),
];

export const PRICE = 45;

/** Promo de Instagram: 2 polos por S/ 80 (se aplica por cada par en el carrito). */
export const promo = { qty: 2, price: 80, label: "2 polos x S/ 80" };

export const products: Product[] = [
  {
    slug: "polo-boxy-adventures-navy",
    name: 'Polo Boxy "Adventures"',
    design: "Adventures",
    color: "Azul oscuro",
    colorHex: "#1b2340",
    price: PRICE,
    images: gallery("adventures-azul", 3),
    imageTone: "light",
    stock: { S: 6, M: 8, L: 5 },
    badge: { label: "Más vendido", tone: "ink" },
    front: "kraze Adventures",
    back: "Estrella",
    description: "Azul oscuro con “kraze Adventures” en el pecho y la estrella KRAZE en la espalda.",
  },
  {
    slug: "polo-boxy-kraze-originals-verde",
    name: 'Polo Boxy "Kraze Originals"',
    design: "Kraze Originals",
    color: "Verde",
    colorHex: "#1f3d2e",
    price: PRICE,
    images: gallery("originals-verde", 3),
    imageTone: "light",
    stock: { S: 4, M: 5, L: 3 },
    front: "Prime Kraze Originals · American Culture",
    back: "Kraze Resort · Amazonian Culture",
    description: "Verde botella. “Kraze Originals” al frente y el escudo “Kraze Resort” con cinco estrellas en la espalda.",
  },
  {
    slug: "polo-boxy-sports-kraze-vino",
    name: 'Polo Boxy "Sports Kraze"',
    design: "Sports Kraze",
    color: "Vino",
    colorHex: "#5a1a26",
    price: PRICE,
    images: gallery("sports-vino", 3),
    imageTone: "light",
    stock: { S: 5, M: 6, L: 4 },
    front: "Kraze Perú · Proudly Peruvian",
    back: "Sports Kraze",
    description: "Vino con “Kraze Perú” en el pecho y el gráfico de básquet “Sports Kraze” en la espalda.",
  },
  {
    slug: "polo-boxy-kraze-studios-rojo",
    name: 'Polo Boxy "Kraze Studios"',
    design: "Kraze Studios",
    color: "Rojo",
    colorHex: "#8e1b24",
    price: PRICE,
    images: gallery("studios-rojo", 3),
    imageTone: "light",
    stock: { S: 3, M: 3, L: 2 },
    front: "Kraze Dreams · Kraze Elite",
    back: "Kraze Studios · Loungewear Esthétique",
    description: "Rojo intenso con “Kraze Dreams” y “Kraze Elite” al frente, y los laureles de “Kraze Studios” en la espalda.",
  },
  {
    slug: "polo-boxy-boundless-art-hueso",
    name: 'Polo Boxy "Boundless Art"',
    design: "Boundless Art",
    color: "Perla",
    colorHex: "#ede6d8",
    price: PRICE,
    images: gallery("boundless-perla", 3),
    imageTone: "light",
    stock: { S: 3, M: 2, L: 0 },
    badge: { label: "Últimas 5", tone: "fire" },
    front: "John Kraze",
    back: "Boundless Art · flor",
    description: "Perla con la firma “John Kraze” al frente y la flor “Boundless Art” en la espalda.",
  },
  {
    slug: "polo-boxy-kraze-gaming-negro",
    name: 'Polo Boxy "Kraze Gaming"',
    design: "Kraze Gaming",
    color: "Negro",
    colorHex: "#0d0d0d",
    price: PRICE,
    images: gallery("gaming-negro", 3),
    imageTone: "light",
    stock: { S: 2, M: 3, L: 2 },
    badge: { label: "Últimas 7", tone: "fire" },
    front: "kraze gaming",
    back: "Spirits of Summer",
    description: "Negro con “kraze gaming” en el pecho y el gráfico “Spirits of Summer” en la espalda.",
  },
  {
    slug: "polo-boxy-no-dream-gris",
    name: 'Polo Boxy "No Dream Is Impossible"',
    design: "No Dream Is Impossible",
    color: "Gris oscuro",
    colorHex: "#3a3a3c",
    price: PRICE,
    images: gallery("nodream-gris", 3),
    imageTone: "light",
    stock: { S: 4, M: 4, L: 3 },
    front: "KRAZE · No dream is impossible",
    back: "kraze · The jungle remembers what the world forgets",
    description: "Gris oscuro con “KRAZE — No dream is impossible” al frente y el logo ovalado “kraze” en la espalda.",
  },
  {
    slug: "polo-boxy-kraze-low-blanco",
    name: 'Polo Boxy "KRAZE LOW"',
    design: "KRAZE LOW",
    color: "Blanco",
    colorHex: "#ffffff",
    price: PRICE,
    images: gallery("low-blanco", 3),
    imageTone: "light",
    stock: { S: 0, M: 0, L: 0 },
    badge: { label: "Agotado", tone: "muted" },
    front: "KRAZE LOW · dobermans",
    back: "Firma Kraze",
    description: "Blanco con tres dobermans y la tipografía roja “KRAZE LOW”. Se agotó en días; atento al próximo drop.",
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


export const community = [
  { image: "/img/productos/adventures-azul/modelo-2.jpg", caption: "Adventures · Azul oscuro" },
  { image: "/img/productos/boundless-perla/modelo-2.jpg", caption: "Boundless Art · Perla" },
  { image: "/img/productos/originals-verde/modelo-1.jpg", caption: "Kraze Originals · Verde" },
  { image: "/img/productos/studios-rojo/modelo-3.jpg", caption: "Kraze Studios · Rojo" },
  { image: "/img/productos/gaming-negro/modelo-1.jpg", caption: "Kraze Gaming · Negro" },
  { image: "/img/productos/sports-vino/modelo-2.jpg", caption: "Sports Kraze · Vino" },
];
