// Datos generales de la marca. Reemplazar con la información real antes de publicar.
export const site = {
  name: "KRAZE",
  tagline: "Boxy fit · Ediciones limitadas",
  instagram: "https://www.instagram.com/kraze_peru/",
  instagramHandle: "@kraze_peru",
  // Enlace de WhatsApp que aparece en el perfil de Instagram.
  whatsapp: "https://wa.link/isvjj2",
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
  promo: "3 polos x S/ 120",
  // Datos del proveedor para el Libro de Reclamaciones. REEMPLAZAR con los datos reales de la empresa.
  legal: {
    razonSocial: "KRAZE (razón social por definir)",
    ruc: "20XXXXXXXXX",
    direccion: "Pucallpa, Ucayali, Perú",
    email: "reclamos@kraze.pe",
  },
};

export const shippingRates = [
  { zone: "Delivery en Pucallpa", time: "Mañana · 24h", price: "S/ 8", highlight: true },
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

/** Costo de envío de ejemplo según el departamento. */
export function shippingFor(department: string): { price: number; label: string } | null {
  if (!department) return null;
  if (department === "Ucayali") return { price: 8, label: "Delivery Pucallpa · 24h" };
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
