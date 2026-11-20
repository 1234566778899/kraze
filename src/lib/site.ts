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
};

export const shippingRates = [
  { zone: "Delivery en Pucallpa", time: "Mañana · 24h", price: "S/ 8", highlight: true },
  { zone: "Huánuco", time: "24 – 48h", price: "S/ 10" },
  { zone: "Lima (Olva / Shalom)", time: "2 – 3 días", price: "S/ 15" },
  { zone: "Resto del Perú", time: "3 – 5 días", price: "S/ 18" },
  { zone: "Recojo en punto KRAZE", time: "Coordinar por WhatsApp", price: "Gratis" },
];

export const shippingCities = [
  "Pucallpa, Ucayali",
  "Huánuco, Huánuco",
  "Lima, Lima",
  "Tingo María, Huánuco",
  "Otra ciudad",
];
