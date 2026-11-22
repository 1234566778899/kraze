// Eventos de Google Analytics 4 (e-commerce recomendado por Google).
// Solo se envían si gtag está cargado (en producción, ver layout.tsx).
import type { Product } from "./products";

export const GA_ID = "G-6SV1S32N1E";

type GtagParams = Record<string, unknown>;
declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: GtagParams) => void;
  }
}

export function track(name: string, params?: GtagParams) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") window.gtag("event", name, params);
}

export const gaItem = (p: Product, size?: string, quantity = 1) => ({
  item_id: p.slug,
  item_name: p.design,
  item_brand: "KRAZE",
  item_category: "Polos boxy fit",
  item_variant: size ? `${p.color} / ${size}` : p.color,
  price: p.price,
  quantity,
});
