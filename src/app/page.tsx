import Image from "next/image";
import { Countdown } from "@/components/countdown";
import { DropGrid } from "@/components/drop-grid";
import { Header } from "@/components/header";
import { ButtonLink, SectionHeading, Tag } from "@/components/ui";
import { collections, community } from "@/lib/products";
import { site } from "@/lib/site";

export default function Home() {
  const { currentDrop, nextDrop } = site;
  const sold = Math.round((currentDrop.unitsLeft / currentDrop.totalUnits) * 100);

  return (
    <main>
      {/* HERO */}
      <section className="relative flex h-[88svh] min-h-[620px] items-end overflow-hidden md:h-[860px]">
        <Image
          src="/img/hero-atardecer.jpg"
          alt="Dos personas con polos KRAZE frente al atardecer en Pucallpa"
          fill
          preload
          quality={85}
          sizes="100vw"
          className="object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0)_40%,rgba(0,0,0,0.75)_100%)]" />
        <Header variant="overlay" />

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-10 px-4 pb-10 md:flex-row md:items-end md:justify-between md:px-12 md:pb-16">
          <div className="flex max-w-3xl flex-col gap-6 text-cream">
            <div className="flex flex-wrap gap-2.5">
              <Tag tone="fire">{currentDrop.name}</Tag>
              <Tag tone="outlineLight">Edición limitada · {currentDrop.totalUnits} piezas</Tag>
            </div>
            <h1 className="display text-[28vw] md:text-[220px]">
              Sin
              <br />
              molde.
            </h1>
            <p className="max-w-lg text-base leading-relaxed md:text-lg">
              Boxy fit, algodón pesado y cortes que no se repiten. Cuando se agota, no vuelve.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#drop" variant="light" arrow>
                Ver el drop
              </ButtonLink>
              <ButtonLink href="#comunidad" variant="outlineLight">
                Lookbook
              </ButtonLink>
            </div>
          </div>

          <div className="hidden flex-col items-end gap-1.5 text-cream md:flex">
            <p className="label">Stock del drop</p>
            <p className="display text-6xl">
              {currentDrop.unitsLeft} / {currentDrop.totalUnits}
            </p>
            <div className="h-1 w-56 bg-white/25" aria-hidden="true">
              <div className="h-full bg-fire" style={{ width: `${sold}%` }} />
            </div>
            <p className="font-mono text-xs">No habrá reposición</p>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden bg-fire py-4" aria-hidden="true">
        <div className="flex w-max animate-marquee gap-9">
          {Array.from({ length: 2 }).flatMap((_, k) =>
            ["Boxy fit", "Ediciones limitadas", "Hecho en Perú", "Pucallpa", "Unisex S · M · L"].map((t) => (
              <span key={`${k}-${t}`} className="display flex items-center gap-9 text-3xl">
                {t} <span>✦</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* DROP */}
      <section id="drop" className="scroll-mt-20 px-4 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-[1344px] flex-col gap-10">
          <SectionHeading eyebrow={`${currentDrop.name} — Disponible ahora`} title="Lo nuevo" />
          <DropGrid />
        </div>
      </section>

      {/* BOXY FIT */}
      <section id="boxy-fit" className="grid scroll-mt-20 bg-ink md:grid-cols-2">
        <div className="relative aspect-square md:aspect-auto">
          <Image
            src="/img/ig-duo-vino-negro-estudio.png"
            alt="Dos polos KRAZE boxy fit en vino y negro, vistos de frente"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center gap-7 px-4 py-16 md:px-18 md:py-24">
          <p className="label text-fire">Nuestro corte</p>
          <h2 className="display text-6xl text-cream md:text-8xl">
            ¿Qué es
            <br />
            boxy fit?
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-[#c9c3ba]">
            Un corte cuadrado: más ancho, un poco más corto y con los hombros caídos. Queda relajado sin verse grande.
          </p>
          <dl className="grid grid-cols-3">
            {[
              ["Hombro", "Caído −4 cm"],
              ["Ancho", "+8 cm"],
              ["Largo", "−3 cm"],
            ].map(([k, v]) => (
              <div key={k} className="-ml-px flex flex-col gap-1.5 border border-[#333] px-4 py-4 md:px-5">
                <dt className="label text-[10px] text-[#77726b]">{k}</dt>
                <dd className="text-sm font-bold text-cream md:text-base">{v}</dd>
              </div>
            ))}
          </dl>
          <p className="flex gap-3 bg-coal px-5 py-4 text-[15px] font-medium text-cream">
            <span className="label text-fire">Tip</span>
            ¿Prefieres un fit regular? Pide una talla menos.
          </p>
          <ButtonLink href="/producto/polo-boxy-kraze-gaming-negro#medidas" variant="light" arrow className="self-start">
            Ver guía de tallas
          </ButtonLink>
        </div>
      </section>

      {/* COLECCIONES */}
      <section id="colecciones" className="scroll-mt-20 bg-cream px-4 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-[1344px] flex-col gap-10">
          <SectionHeading
            eyebrow="Archivo KRAZE"
            title="Colecciones"
            aside={
              <p className="text-[15px] leading-relaxed text-stone md:text-right">
                Cada drop tiene su historia.
                <br />
                Algunas piezas todavía quedan.
              </p>
            }
          />
          <div className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 md:mx-0 md:grid md:grid-cols-4 md:gap-6 md:px-0">
            {collections.map((c) => (
              <a key={c.number} href="#drop" className="group relative aspect-[2/3] w-[70vw] shrink-0 snap-start overflow-hidden md:w-auto">
                <Image src={c.image} alt={c.title} fill sizes="(max-width: 768px) 70vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_40%,rgba(0,0,0,0.75)_100%)]" />
                <span className="display absolute top-3 left-5 text-[110px] text-cream/90">{c.number}</span>
                <div className="absolute inset-x-5 bottom-5 flex flex-col gap-1.5 text-cream">
                  <p className="display text-3xl">{c.title}</p>
                  <p className="font-mono text-xs">
                    {c.year} · {c.status}
                  </p>
                  <p className="label text-fire">Explorar →</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* COMUNIDAD */}
      <section id="comunidad" className="scroll-mt-20 px-4 py-20 md:px-12 md:py-24">
        <div className="mx-auto flex max-w-[1344px] flex-col gap-10">
          <SectionHeading
            eyebrow="La familia KRAZE"
            title="#KrazeComunidad"
            aside={
              <ButtonLink href={site.instagram} target="_blank" rel="noopener noreferrer" variant="outline" arrow className="self-start">
                Síguenos {site.instagramHandle}
              </ButtonLink>
            }
          />
          <div className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-3">
            {community.map((c, i) => (
              <figure key={i} className="relative aspect-[4/5] overflow-hidden">
                <Image src={c.image} alt={`Cliente KRAZE en ${c.caption}`} fill sizes="(max-width: 768px) 33vw, 16vw" className="object-cover" />
                <figcaption className="label absolute bottom-2 left-2 text-[10px] text-cream drop-shadow">{c.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* PRÓXIMO DROP */}
      <section className="bg-fire px-4 py-20 md:px-12 md:py-22">
        <div className="mx-auto flex max-w-[1344px] flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-4">
            <p className="label">Próximo drop</p>
            <h2 className="display text-7xl md:text-[110px]">
              {nextDrop.name}
              <br />
              se viene.
            </h2>
            <p className="text-[17px] font-medium">Solo {nextDrop.units} piezas. Los suscritos compran 1 hora antes.</p>
          </div>
          <div className="flex flex-col gap-7">
            <Countdown date={nextDrop.date} />
            <form className="flex bg-paper" action="#">
              <label htmlFor="aviso" className="sr-only">
                Tu número de WhatsApp
              </label>
              <span className="grid place-items-center pl-4 text-sm text-stone">+51</span>
              <input id="aviso" type="tel" placeholder="Tu número de WhatsApp" className="h-14 min-w-0 flex-1 bg-transparent px-3 focus:outline-none" />
              <button type="button" className="label h-14 bg-ink px-6 text-[13px] text-cream">
                Avísame
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
