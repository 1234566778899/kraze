import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Countdown } from "@/components/countdown";
import { DropAlertForm } from "@/components/drop-alert-form";
import { FeaturedSlider } from "@/components/featured-slider";
import { HeroCarousel, type HeroSlide } from "@/components/hero-carousel";
import { Marquee } from "@/components/marquee";
import { ProductCard } from "@/components/product-card";
import { Container, SectionHeading } from "@/components/ui";
import { community, getProduct, isSoldOut, products } from "@/lib/products";
import { site, whatsappWith } from "@/lib/site";

const slides = [
  { title: "Adventures", href: "/producto/polo-boxy-adventures-navy", image: "/img/productos/adventures-azul/modelo-2.jpg", position: "center 60%" },
  { title: "Boundless Art", href: "/producto/polo-boxy-boundless-art-hueso", image: "/img/productos/boundless-perla/modelo-1.jpg", position: "center 35%" },
  { title: "Sports Kraze", href: "/producto/polo-boxy-sports-kraze-vino", image: "/img/productos/sports-vino/modelo-2.jpg", position: "center 35%" },
];

// Últimas novedades (de la publicación más reciente a la más antigua en Instagram), solo con stock.
const heroSlides: HeroSlide[] = (
  [
    { slug: "polo-boxy-sports-kraze-vino", photo: "/img/productos/sports-vino/modelo-1.jpg", position: "center 20%", kicker: "Nuevo drop" },
    { slug: "polo-boxy-kraze-originals-verde", photo: "/img/productos/originals-verde/modelo-3.jpg", position: "center 15%", kicker: "Nuevo drop" },
    { slug: "polo-boxy-kraze-gaming-negro", photo: "/img/productos/gaming-negro/modelo-2.jpg", position: "center 25%", kicker: "Últimas unidades" },
    { slug: "polo-boxy-boundless-art-hueso", photo: "/img/productos/boundless-perla/modelo-2.jpg", position: "center 30%", kicker: "Últimas unidades" },
    { slug: "polo-boxy-kraze-studios-rojo", photo: "/img/productos/studios-rojo/modelo-2.jpg", position: "center 30%", kicker: "Novedad" },
  ] as const
).flatMap(({ slug, ...rest }) => {
  const product = getProduct(slug);
  return product && !isSoldOut(product) ? [{ product, ...rest }] : [];
});

// Fotos con modelos editadas a partir del Instagram de la marca.
const lookbook = community;

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

// Datos estructurados de la marca y la tienda (schema.org).
const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": `${site.url}/#tienda`,
    name: "KRAZE",
    alternateName: "KRAZE Perú",
    description: site.description,
    url: site.url,
    logo: `${site.url}/icon.png`,
    image: `${site.url}/opengraph-image.jpg`,
    priceRange: "S/ 45 – S/ 80",
    currenciesAccepted: "PEN",
    paymentAccepted: "Yape, Plin, transferencia bancaria, efectivo contra entrega",
    address: { "@type": "PostalAddress", addressLocality: "Pucallpa", addressRegion: "Ucayali", addressCountry: "PE" },
    areaServed: { "@type": "Country", name: "Perú" },
    sameAs: [site.instagram, site.tiktok],
    contactPoint: { "@type": "ContactPoint", contactType: "ventas", url: whatsappWith("Hola KRAZE"), availableLanguage: "es" },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#web`,
    name: "KRAZE",
    url: site.url,
    inLanguage: "es-PE",
    publisher: { "@id": `${site.url}/#tienda` },
  },
];

export default function Home() {
  const available = products.filter((p) => !isSoldOut(p));
  const featured = available.slice(0, 6);

  return (
    <main className="dotted">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <h1 className="sr-only">KRAZE — Polos boxy fit en ediciones limitadas, hechos en Pucallpa, Perú</h1>
      {/* HERO: carrusel con las últimas novedades */}
      <HeroCarousel slides={heroSlides} />

      {/* NUEVO DROP */}
      <section id="drop" className="scroll-mt-14 pt-24 md:pt-32">
        <Container className="flex flex-col gap-14">
          <SectionHeading
            label={`${site.currentDrop.name} / ${String(available.length).padStart(3, "0")} piezas disponibles`}
            index="01 / 04"
            title="New drop"
            link={{ href: "/tienda", label: "Ver archivo completo" }}
          />
          <div className="grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 md:gap-x-6">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Container>
      </section>

      <Marquee />

      {/* BANNER */}
      <section className="px-4 md:px-8">
        <FeaturedSlider slides={slides} />
      </section>

      {/* BOXY FIT */}
      <section id="boxy-fit" className="scroll-mt-14 py-24 md:py-32">
        <Container className="grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-studio">
            <Image src="/img/productos/nodream-gris/modelo-3.jpg" alt="Polo boxy fit gris oscuro con hombros caídos" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-8">
            <SectionHeading label="Nuestro corte" index="02 / 04" title="Boxy fit" />
            <p className="max-w-md leading-relaxed text-snow/75">
              Un corte cuadrado: más ancho, un poco más corto y con los hombros caídos. Algodón jersey 20/1, fresco y cómodo.
              Relajado, sin verse grande.
            </p>
            <dl className="grid grid-cols-3 border-y border-line">
              {[
                ["Hombro", "−4 cm"],
                ["Ancho", "+8 cm"],
                ["Largo", "−3 cm"],
              ].map(([k, v], i) => (
                <div key={k} className={`flex flex-col gap-2 py-5 ${i > 0 ? "border-l border-line pl-5" : ""}`}>
                  <dt className="tech text-[10px] text-mute">{k}</dt>
                  <dd className="display text-2xl">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="tech text-mute">{"// ¿Prefieres fit regular? Pide una talla menos."}</p>
          </div>
        </Container>
      </section>

      {/* LOOKBOOK */}
      <section id="lookbook" className="scroll-mt-14 pb-24 md:pb-32">
        <Container className="flex flex-col gap-14">
          <SectionHeading
            label={`// ${site.currentDrop.name} // Lookbook`}
            index="03 / 04"
            title="Lookbook"
            link={{ href: site.instagram, label: site.instagramHandle }}
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5">
            {lookbook.map((c, i) => (
              <figure key={i} className={`relative aspect-[3/4] overflow-hidden rounded-xl ${i % 3 === 1 ? "md:mt-12" : i % 3 === 2 ? "md:mt-24" : ""}`}>
                <Image src={c.image} alt={`Polo KRAZE ${c.caption}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover transition duration-700 hover:scale-[1.04]" />
                <figcaption className="tech absolute bottom-3 left-3 text-[10px] text-snow drop-shadow">{c.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* TEXTO SEO: marca local de Pucallpa */}
      <section className="border-t border-line py-20 md:py-24">
        <Container className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start">
          <div className="flex flex-col gap-5">
            <p className="tech text-mute">{"// Hecho en Pucallpa"}</p>
            <h2 className="display text-[clamp(2rem,6vw,3.5rem)]">Polos boxy fit de Pucallpa para todo el Perú</h2>
          </div>
          <div className="flex flex-col gap-4 leading-relaxed text-snow/75">
            <p>
              KRAZE es una marca de streetwear nacida en Pucallpa. Hacemos polos boxy fit de algodón jersey 20/1 en ediciones limitadas: cada
              drop trae pocos diseños y pocas piezas.
            </p>
            <p>
              En Pucallpa el delivery es gratis y pagas contra entrega. También enviamos a Huánuco, Lima y todo el Perú. Cada polo cuesta S/ 45 o
              llévate 2 por S/ 80.
            </p>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
              <Link href="/polos-pucallpa" className="caps text-[11px] text-snow underline underline-offset-4">
                Polos en Pucallpa
              </Link>
              <Link href="/guia-de-tallas" className="caps text-[11px] text-snow underline underline-offset-4">
                Guía de tallas
              </Link>
              <Link href="/envios" className="caps text-[11px] text-snow underline underline-offset-4">
                Envíos
              </Link>
              <Link href="/preguntas-frecuentes" className="caps text-[11px] text-snow underline underline-offset-4">
                Preguntas frecuentes
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* PRÓXIMO DROP */}
      <section className="border-t border-line py-24 md:py-28">
        <Container className="flex flex-col items-center gap-10 text-center">
          <p className="tech text-mute">[ Próximo drop ] [ 04 / 04 ]</p>
          <h2 className="display text-[clamp(2.25rem,11vw,3rem)] md:text-7xl">{site.nextDrop.name}</h2>
          <Countdown date={site.nextDrop.date} />
          <DropAlertForm dropName={site.nextDrop.name} />
          <p className="tech text-[10px] text-mute">Solo {site.nextDrop.units} piezas // Los suscritos compran 1 hora antes</p>
        </Container>
      </section>
    </main>
  );
}
