import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/tienda`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...products.map((p) => ({
      url: `${site.url}/producto/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: p.images.map((src) => `${site.url}${src}`),
    })),
    { url: `${site.url}/polos-pucallpa`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...["preguntas-frecuentes", "envios", "guia-de-tallas", "cambios-y-devoluciones", "contacto"].map((path) => ({
      url: `${site.url}/${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...["terminos-y-condiciones", "politica-de-privacidad", "reclamaciones"].map((path) => ({
      url: `${site.url}/${path}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.2,
    })),
  ];
}
