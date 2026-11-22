// Datos generales de la marca. Reemplazar con la información real antes de publicar.
export const site = {
  name: "KRAZE",
  /** Dominio principal (kraze.ink redirige aquí). Se usa para URLs canónicas, sitemap y Open Graph. */
  url: "https://www.kraze.ink",
  description:
    "Polos boxy fit de algodón jersey 20/1 en ediciones limitadas, hechos en Pucallpa. S/ 45 c/u o 2 x S/ 80. Envíos a todo el Perú y pago contra entrega en Pucallpa.",
  tagline: "Boxy fit · Ediciones limitadas",
  instagram: "https://www.instagram.com/kraze_peru/",
  instagramHandle: "@kraze_peru",
  tiktok: "https://www.tiktok.com/@kraze_peru",
  tiktokHandle: "@kraze_peru",
  // Número del WhatsApp de la marca (el enlace wa.link/isvjj2 del Instagram redirige a este número,
  // pero ignora el texto del mensaje, por eso se usa wa.me directamente).
  whatsapp: "https://wa.me/51978708662",
  currentDrop: {
    name: "Drop 05",
    totalUnits: 120,
    unitsLeft: 64,
  },
  nextDrop: {
    name: "Drop 06",
    units: 100,
    // Fecha de ejemplo para la cuenta regresiva.
    date: "2026-12-12T20:00:00-05:00",
  },
  promo: "2 polos x S/ 80",
  // Datos del proveedor para el Libro de Reclamaciones. REEMPLAZAR con los datos reales de la empresa.
  legal: {
    razonSocial: "KRAZE (razón social por definir)",
    ruc: "20XXXXXXXXX",
    direccion: "Pucallpa, Ucayali, Perú",
    email: "contacto@kraze.ink",
  },
};

export const shippingRates = [
  { zone: "Delivery en Pucallpa", time: "24h · pago contra entrega", price: "Gratis", highlight: true },
  { zone: "Huánuco", time: "24 – 48h", price: "S/ 10" },
  { zone: "Lima (Olva / Shalom)", time: "2 – 3 días", price: "S/ 15" },
  { zone: "Resto del Perú", time: "3 – 5 días", price: "S/ 18" },
  { zone: "Recojo en punto KRAZE", time: "Coordinar por WhatsApp", price: "Gratis" },
];

export const departments = [
  "Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca", "Callao", "Cusco", "Huancavelica",
  "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua",
  "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali",
];

/** Costo de envío según el departamento (Pucallpa gratis, como publica la marca en Instagram). */
export function shippingFor(department: string): { price: number; label: string } | null {
  if (!department) return null;
  if (department === "Ucayali") return { price: 0, label: "Delivery gratis en Pucallpa · 24h" };
  if (department === "Huánuco") return { price: 10, label: "Huánuco · 24 – 48h" };
  if (department === "Lima" || department === "Callao") return { price: 15, label: "Lima · 2 – 3 días" };
  return { price: 18, label: "Resto del Perú · 3 – 5 días" };
}

export const shippingCities = [
  "Pucallpa, Ucayali",
  "Huánuco, Huánuco",
  "Lima, Lima",
  "Tingo María, Huánuco",
  "Otra ciudad",
];

/** Enlace de WhatsApp con un mensaje ya escrito. */
export const whatsappWith = (text: string) => `${site.whatsapp}?text=${encodeURIComponent(text)}`;
