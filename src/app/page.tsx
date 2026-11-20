import Image from "next/image";
import { Countdown } from "@/components/countdown";
import { FeaturedSlider } from "@/components/featured-slider";
import { Marquee } from "@/components/marquee";
import { ProductCard } from "@/components/product-card";
import { Container, SectionHeading } from "@/components/ui";
import { community, isSoldOut, products } from "@/lib/products";
import { site } from "@/lib/site";

const slides = [
  { title: "Adventures", href: "/producto/polo-boxy-adventures-navy", image: "/img/prod-navy-adventures.jpg", position: "center 12%" },
  { title: "Boundless Art", href: "/producto/polo-boxy-boundless-art-hueso", image: "/img/prod-hueso-boundless.jpg", position: "center 20%" },
  { title: "Sports Kraze", href: "/producto/polo-boxy-sports-kraze-vino", image: "/img/prod-vino-sports-navy.jpg", position: "center 25%" },
];

// Las fotos de la comunidad son capturas de Instagram: se amplían un poco desde la esquina
// inferior izquierda para ocultar los íconos de la esquina superior derecha.
const lookbook = community.filter((c) => !c.image.includes("bmx")).concat({ image: "/img/ig-duo-vino-negro-estudio.png", caption: "Estudio" });

export default function Home() {
  const available = products.filter((p) => !isSoldOut(p));
  const featured = available.slice(0, 6);

  return (
    <main className="dotted">
      {/* HERO: imagen a pantalla completa, casi sin texto */}
      <section className="relative -mt-16 h-svh min-h-[600px] overflow-hidden md:-mt-[61px]">
        <Image
          src="/img/hero-atardecer.jpg"
          alt="Dos personas con polos KRAZE frente al atardecer en Pucallpa"
          fill
          preload
          quality={85}
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.15)_35%,rgba(0,0,0,0.25)_65%,rgba(10,10,10,1)_100%)]" />

        <p className="tech absolute bottom-10 left-5 text-[10px] leading-relaxed text-snow/90 sm:bottom-20 md:left-10">
          S 8° 23′ 00″ / W 74° 33′ 00″
          <br />© KRAZE Studios // Pucallpa-Perú
        </p>

        <a href="#drop" className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center" aria-label="Ir al nuevo drop">
          <span className="flex h-10 w-6 justify-center rounded-full border-[1.5px] border-snow/80 pt-2">
            <span className="block size-1 animate-scroll-dot rounded-full bg-snow" />
          </span>
        </a>

        <p className="tech absolute right-5 bottom-10 hidden text-right text-[10px] text-snow/90 md:right-10 md:block">
          {`${site.currentDrop.name} // ${site.currentDrop.unitsLeft} de ${site.currentDrop.totalUnits} piezas`}
          <br />
          No habrá reposición
        </p>
      </section>

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
            <Image src="/img/prod-negro-gaming.jpg" alt="Polo boxy fit negro sobre fondo de estudio" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-8">
            <SectionHeading label="Nuestro corte" index="02 / 04" title="Boxy fit" />
            <p className="max-w-md leading-relaxed text-snow/75">
              Un corte cuadrado: más ancho, un poco más corto y con los hombros caídos. Algodón pesado que mantiene la forma.
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
                <Image src={c.image} alt={`Comunidad KRAZE en ${c.caption}`} fill sizes="(max-width: 768px) 50vw, 33vw" className="origin-bottom-left scale-[1.2] object-cover transition duration-700 hover:scale-[1.24]" />
                <figcaption className="tech absolute bottom-3 left-3 text-[10px] text-snow drop-shadow">{c.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      {/* PRÓXIMO DROP */}
      <section className="border-t border-line py-24 md:py-28">
        <Container className="flex flex-col items-center gap-10 text-center">
          <p className="tech text-mute">[ Próximo drop ] [ 04 / 04 ]</p>
          <h2 className="display text-5xl md:text-7xl">{site.nextDrop.name}</h2>
          <Countdown date={site.nextDrop.date} />
          <form className="flex w-full max-w-md border-b border-snow/40 focus-within:border-snow" action="#">
            <label htmlFor="aviso" className="sr-only">
              Tu número de WhatsApp
            </label>
            <span className="grid place-items-center pr-3 text-sm text-mute">+51</span>
            <input id="aviso" type="tel" placeholder="Tu WhatsApp para avisarte" className="h-12 min-w-0 flex-1 bg-transparent text-sm placeholder:text-mute focus:outline-none" />
            <button type="button" className="caps text-[11px]">
              Avísame →
            </button>
          </form>
          <p className="tech text-[10px] text-mute">Solo {site.nextDrop.units} piezas // Los suscritos compran 1 hora antes</p>
        </Container>
      </section>
    </main>
  );
}
