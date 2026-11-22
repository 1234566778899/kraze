import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { ProductBuyBox } from "@/components/product-buy-box";
import { ProductGallery } from "@/components/product-gallery";
import { RelatedCard } from "@/components/related-card";
import { TrackViewItem } from "@/components/track-view-item";
import { getProduct, isSoldOut, measurements, products, promo, sizes } from "@/lib/products";
import { shippingRates, site, whatsappWith } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const title = `${product.name} ${product.color}`;
  const description = `${product.description} Polo boxy fit unisex, algodón jersey 20/1. S/ ${product.price} o 2 x S/ ${promo.price}. Tallas S, M y L, envíos a todo el Perú.`;
  const url = `/producto/${product.slug}`;
  const images = product.images.slice(0, 3).map((src, i) => ({
    url: src,
    width: 1080,
    height: 1350,
    alt: `${title}${i === 0 ? ", frente" : i === 1 ? ", espalda" : ", con modelo"}`,
  }));
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: `${title} · KRAZE®`, description, images },
    twitter: { card: "summary_large_image", title: `${title} · KRAZE®`, description, images: [product.images[0]] },
  };
}

export default function ProductPage({ params }: PageProps<"/producto/[slug]">) {
  return (
    <div className="sheet-page bg-white">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </div>
  );
}

// Medidas de referencia (desktop 1920px): contenedor 1296px, foto 736px, info 512px, separación 48px.
const grid = "mx-auto grid max-w-[1320px] gap-12 px-3 lg:grid-cols-[736fr_512fr]";

function ProductSkeleton() {
  return (
    <div className={`${grid} pt-5 pb-12`} aria-busy="true">
      <div className="aspect-[4/5] animate-pulse bg-studio" />
      <div className="flex flex-col gap-6">
        <div className="h-14 w-2/3 animate-pulse bg-studio" />
        <div className="h-20 w-1/2 animate-pulse bg-studio" />
        <div className="h-40 animate-pulse bg-studio" />
      </div>
    </div>
  );
}

function Accordion({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <details id={id} className="group scroll-mt-24 border-t border-rule last:border-b">
      <summary className="condensed flex h-[53px] cursor-pointer list-none items-center justify-between text-base font-bold">
        {title}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-5 transition-transform group-open:rotate-180" aria-hidden="true">
          <path d="M5 9l7 7 7-7" />
        </svg>
      </summary>
      <div className="pb-5 text-[13.125px] leading-relaxed text-panel/80">{children}</div>
    </details>
  );
}

async function ProductContent({ params }: { params: PageProps<"/producto/[slug]">["params"] }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug && !isSoldOut(p)).slice(0, 4);
  const url = `${site.url}/producto/${product.slug}`;

  // Datos estructurados (schema.org) para resultados enriquecidos en Google: precio, stock y tallas.
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProductGroup",
      "@id": `${url}#producto`,
      name: `${product.name} ${product.color}`,
      description: product.description,
      url,
      brand: { "@type": "Brand", name: "KRAZE" },
      color: product.color,
      material: "Algodón jersey 20/1",
      productGroupID: product.slug,
      variesBy: ["https://schema.org/size"],
      image: product.images.map((src) => `${site.url}${src}`),
      hasVariant: sizes.map((s) => ({
        "@type": "Product",
        name: `${product.name} ${product.color} talla ${s}`,
        sku: `${product.slug}-${s.toLowerCase()}`,
        size: s,
        color: product.color,
        image: `${site.url}${product.images[0]}`,
        offers: {
          "@type": "Offer",
          url,
          price: product.price.toFixed(2),
          priceCurrency: "PEN",
          availability: product.stock[s] > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          itemCondition: "https://schema.org/NewCondition",
          seller: { "@type": "Organization", name: "KRAZE" },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingDestination: { "@type": "DefinedRegion", addressCountry: "PE" },
          },
        },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
        { "@type": "ListItem", position: 2, name: "Tienda", item: `${site.url}/tienda` },
        { "@type": "ListItem", position: 3, name: product.design, item: url },
      ],
    },
  ];

  return (
    <main>
      <TrackViewItem slug={product.slug} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className={`${grid} pt-5 pb-12`}>
        <div className="lg:sticky lg:top-20 lg:self-start">
          <ProductGallery product={product} />
        </div>

        <div className="flex flex-col">
          <nav aria-label="Ruta" className="text-[13.125px] leading-5 text-panel uppercase">
            <Link href="/" className="hover:underline">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <Link href="/tienda" className="hover:underline">
              Catálogo
            </Link>
            <span className="mx-2">/</span>
            <span className="font-bold">{product.design}</span>
          </nav>

          <h1 className="condensed mt-6 text-5xl leading-[58px] font-bold">{product.design}</h1>
          <p className="condensed text-[13.125px] font-normal tracking-[0.5px]! text-gray">Polo boxy fit · {product.color}</p>
          <p className="condensed mt-[29px] text-[64px] leading-[77px] font-bold text-panel">S/ {product.price.toFixed(2)}</p>
          <p className="mt-2 inline-flex self-start bg-highlight px-3 py-1 text-[13.125px] font-bold text-black">
            Promo {promo.label} · combina diseños y colores
          </p>

          <div className="mt-[53px]">
            {isSoldOut(product) ? (
              <p className="condensed flex h-20 items-center justify-center border border-panel/30 text-xl font-bold text-gray">Agotado · Atento al próximo drop</p>
            ) : (
              <ProductBuyBox product={product} />
            )}
          </div>

          <div className="mt-6">
            <Accordion title="Descripción">
              <p>{product.description}</p>
              <ul className="mt-3 list-disc pl-4">
                <li>Frente: {product.front}</li>
                <li>Espalda: {product.back}</li>
              </ul>
              <p className="mt-3">Algodón jersey 20/1, fresco y cómodo. Corte boxy unisex: si prefieres un fit regular, pide una talla menos.</p>
            </Accordion>
            <Accordion title="Guía de tallas (cm)" id="medidas">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-rule">
                    {["Talla", "Largo", "Pecho", "Hombro", "Manga"].map((h) => (
                      <th key={h} scope="col" className="py-2 font-bold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {measurements.map((m) => (
                    <tr key={m.size} className="border-b border-rule">
                      <th scope="row" className="py-2 font-bold">
                        {m.size}
                      </th>
                      <td>{m.length}</td>
                      <td>{m.chest}</td>
                      <td>{m.shoulder}</td>
                      <td>{m.sleeve}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2">
                Medidas de la prenda en plano. Pecho = de axila a axila.{" "}
                <Link href="/guia-de-tallas" className="font-bold underline underline-offset-2">
                  Ver guía de tallas
                </Link>
              </p>
            </Accordion>
            <Accordion title="Envío">
              <ul>
                {shippingRates.map((r) => (
                  <li key={r.zone} className="flex justify-between gap-4 py-1">
                    <span>
                      {r.zone} <span className="text-gray">· {r.time}</span>
                    </span>
                    <span className="font-bold text-panel">{r.price}</span>
                  </li>
                ))}
              </ul>
              <Link href="/envios" className="mt-2 inline-block font-bold underline underline-offset-2">
                Ver todos los detalles de envío
              </Link>
            </Accordion>
            <Accordion title="Devoluciones">
              Tienes 7 días para cambiar tu talla. La prenda debe estar sin uso y con etiqueta. Coordina el cambio por WhatsApp.{" "}
              <Link href="/cambios-y-devoluciones" className="font-bold underline underline-offset-2">
                Ver condiciones
              </Link>
            </Accordion>
          </div>
          <a
            href={whatsappWith(`Hola KRAZE, tengo una consulta sobre el ${product.name} (${product.color}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 text-[13.125px] text-gray underline-offset-2 hover:text-panel hover:underline"
          >
            ¿Dudas? Escríbenos por WhatsApp
          </a>
        </div>
      </div>

      {/* También te puede gustar: título 40px con borde amarillo de 5px, 4 tarjetas de 306px, separación 24px */}
      <section className="mx-auto max-w-[1320px] px-3 pt-12 pb-10">
        <h2 className="condensed border-l-[5px] border-highlight pl-6 text-[40px] leading-[48px] font-bold">También te puede gustar</h2>
        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {related.map((p) => (
            <RelatedCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
