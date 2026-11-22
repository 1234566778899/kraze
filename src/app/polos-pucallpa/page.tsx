import type { Metadata } from "next";
import Link from "next/link";
import { FaqList, faqJsonLd, type Faq } from "@/components/content-page";
import { RelatedCard } from "@/components/related-card";
import { isSoldOut, PRICE, products, promo } from "@/lib/products";
import { site } from "@/lib/site";

// Página para la búsqueda local "polos Pucallpa" / "polos en Pucallpa".
export const metadata: Metadata = {
  title: "Polos en Pucallpa — boxy fit con delivery gratis",
  description: `Compra polos boxy fit en Pucallpa: KRAZE, marca de streetwear hecha en Pucallpa. Delivery gratis en 24 h y pago contra entrega. S/ ${PRICE} c/u o ${promo.label}.`,
  alternates: { canonical: "/polos-pucallpa" },
  openGraph: { url: "/polos-pucallpa", title: "Polos en Pucallpa · KRAZE®" },
};

const localFaqs: Faq[] = [
  {
    q: "¿Dónde comprar polos boxy fit en Pucallpa?",
    a: "En KRAZE, marca de streetwear nacida en Pucallpa. Pides en kraze.ink o por WhatsApp y te lo llevamos gratis a tu casa en 24 horas.",
  },
  {
    q: "¿El delivery en Pucallpa tiene costo?",
    a: "No. El delivery es gratis en Pucallpa y puedes pagar contra entrega en efectivo, Yape o Plin.",
  },
  {
    q: "¿Cuánto cuesta un polo KRAZE en Pucallpa?",
    a: `S/ ${PRICE} cada uno, o ${promo.qty} polos por S/ ${promo.price} combinando diseños y colores.`,
  },
  {
    q: "¿También envían fuera de Pucallpa?",
    a: "Sí, hacemos delivery en Huánuco y Tingo María y envíos a Lima y todo el Perú por Olva y Shalom.",
  },
];

export default function PucallpaPage() {
  const available = products.filter((p) => !isSoldOut(p));
  const jsonLd = [
    faqJsonLd(localFaqs),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Polos boxy fit KRAZE en Pucallpa",
      itemListElement: available.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${site.url}/producto/${p.slug}`,
        name: `${p.name} ${p.color}`,
      })),
    },
  ];

  return (
    <main className="sheet-page bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <section className="bg-panel pt-10 pb-14 text-white">
        <div className="mx-auto max-w-[1320px] px-4">
          <p className="font-[family-name:var(--font-condensed)] text-[13.125px] font-bold tracking-[5px] text-highlight uppercase">
            Hecho en Pucallpa · Ucayali
          </p>
          <h1 className="condensed mt-2 text-[clamp(2.5rem,8vw,4.5rem)] leading-[1.05] font-bold">Polos en Pucallpa</h1>
          <p className="mt-4 max-w-[680px] text-[16px] leading-relaxed text-white/75">
            KRAZE es una marca de polos boxy fit nacida en Pucallpa. Diseños en ediciones limitadas, algodón jersey 20/1 fresco para el calor
            de la selva y <strong className="text-white">delivery gratis en toda la ciudad en 24 horas</strong>, con pago contra entrega.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="caps rounded-full bg-highlight px-4 py-2 text-[11px] text-ink">S/ {PRICE} c/u · {promo.label}</span>
            <span className="caps rounded-full border border-white/40 px-4 py-2 text-[11px]">Delivery gratis</span>
            <span className="caps rounded-full border border-white/40 px-4 py-2 text-[11px]">Pago contra entrega</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1320px] px-4 pt-12">
        <h2 className="condensed border-l-[5px] border-highlight pl-4 text-[32px] leading-10 font-bold">Polos disponibles</h2>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {available.map((p) => (
            <RelatedCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-[1320px] gap-10 px-4 pt-16 pb-20 lg:grid-cols-2">
        <div className="prose-kraze">
          <h2>Streetwear de Pucallpa para todo el Perú</h2>
          <p>
            Nuestros polos tienen corte boxy: más anchos, un poco más cortos y con hombros caídos. Cada drop trae pocos diseños y pocas piezas,
            inspirados en la cultura amazónica y urbana de Pucallpa: Adventures, Kraze Originals, Sports Kraze, Kraze Studios, Boundless Art y más.
          </p>
          <h3>Cómo pedir en Pucallpa</h3>
          <ol>
            <li>
              Elige tus polos en la <Link href="/tienda">tienda</Link> y tu talla (S, M o L).
            </li>
            <li>Finaliza la compra: se abre WhatsApp con tu pedido.</li>
            <li>Te lo llevamos gratis en 24 horas y pagas al recibir.</li>
          </ol>
          <p>
            ¿Dudas de talla? Revisa la <Link href="/guia-de-tallas">guía de tallas</Link>. Envíos fuera de Pucallpa: mira{" "}
            <Link href="/envios">tiempos y costos</Link>.
          </p>
        </div>
        <div>
          <h2 className="condensed border-l-[5px] border-highlight pl-4 text-[28px] leading-9 font-bold">Preguntas frecuentes</h2>
          <div className="mt-6">
            <FaqList items={localFaqs} />
          </div>
        </div>
      </section>
    </main>
  );
}
