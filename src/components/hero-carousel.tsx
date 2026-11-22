"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { promo, type Product } from "@/lib/products";

export type HeroSlide = {
  product: Product;
  /** Foto con modelo que ocupa el lado derecho (o todo el fondo en móvil). */
  photo: string;
  /** Encuadre de la foto en móvil, donde se recorta más. */
  position?: string;
  /** Texto corto encima del título, ej. "Nuevo drop". */
  kicker: string;
};

const DURATION = 6500;

const Arrow = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="size-5" aria-hidden="true">
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

/**
 * Hero del home: carrusel de las últimas novedades. Cada slide muestra la foto con modelo,
 * la foto de producto sobre blanco, el precio con la promo y dos llamadas a la acción.
 * Rota solo cada 6,5 s, se pausa al pasar el mouse o al enfocar, y respeta "reducir movimiento".
 */
export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduced) return;
    const id = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(id);
  }, [index, paused, reduced, go]);

  const current = slides[index];
  const { product } = current;
  const href = `/producto/${product.slug}`;

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Últimas novedades"
      className="relative -mt-16 overflow-hidden md:-mt-[61px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* Fondo teñido con el color del polo */}
      {slides.map((s, i) => (
        <div
          key={s.product.slug}
          aria-hidden="true"
          className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
          style={{ background: `radial-gradient(120% 90% at 75% 40%, ${s.product.colorHex} 0%, #0a0a0a 72%)` }}
        />
      ))}

      <div className="relative mx-auto grid min-h-svh max-w-[1320px] grid-rows-[1fr_auto] md:min-h-[min(100svh,860px)] md:grid-cols-[1fr_1fr] md:grid-rows-1 md:items-center md:gap-10 md:px-10 md:pt-[61px]">
        {/* Foto con modelo: fondo completo en móvil, columna derecha en desktop */}
        <div className="absolute inset-0 md:relative md:inset-auto md:order-2 md:aspect-[4/5] md:max-h-[calc(100svh-140px)] md:w-full md:justify-self-end">
          {slides.map((s, i) => (
            <Image
              key={s.product.slug}
              src={s.photo}
              alt={i === index ? `${s.product.name} ${s.product.color} con modelo` : ""}
              fill
              preload={i === 0}
              quality={85}
              sizes="(max-width: 768px) 100vw, 640px"
              className={`object-cover transition-[opacity,transform] duration-1000 ease-out md:rounded-2xl ${
                i === index ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
              style={{ objectPosition: s.position ?? "center" }}
            />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.55)_0%,rgba(10,10,10,0.1)_30%,rgba(10,10,10,0.75)_62%,#0a0a0a_100%)] md:hidden" />

          {/* Foto de producto sobre blanco (desktop) */}
          <Link
            href={href}
            key={`card-${product.slug}`}
            className="absolute bottom-10 -left-12 hidden w-[32%] animate-rise overflow-hidden rounded-xl bg-white shadow-[0_24px_60px_rgba(0,0,0,0.45)] md:block"
            aria-label={`Ver ${product.name}`}
          >
            <span className="relative block aspect-[4/5]">
              <Image src={product.images[0]} alt="" fill sizes="220px" className="object-cover" />
            </span>
          </Link>
        </div>

        {/* Texto y llamadas a la acción */}
        <div key={product.slug} className="relative z-10 flex flex-col items-start gap-5 px-5 pt-[38svh] pb-24 md:order-1 md:px-0 md:pt-0 md:pb-0" aria-live="polite">
          <p className="tech flex animate-rise items-center gap-2 text-snow/80">
            <span className="size-1.5 rounded-full bg-highlight" aria-hidden="true" />
            {current.kicker} · {String(index + 1).padStart(2, "0")}/{String(count).padStart(2, "0")}
          </p>
          <h2 className="display animate-rise text-[clamp(2.5rem,8vw,6.5rem)] [animation-delay:60ms]">{product.design}</h2>
          <p className="hidden max-w-md animate-rise leading-relaxed text-snow/75 [animation-delay:120ms] sm:block">
            Polo boxy fit {product.color.toLowerCase()}. Frente: {product.front}. Espalda: {product.back}.
          </p>

          <div className="flex animate-rise flex-wrap items-baseline gap-x-4 gap-y-1 [animation-delay:180ms]">
            <span className="display text-3xl md:text-4xl">S/ {product.price}</span>
            <span className="caps rounded-full bg-highlight px-3 py-1 text-[11px] text-ink">Promo {promo.label}</span>
          </div>

          <div className="mt-2 grid w-full animate-rise grid-cols-2 gap-3 [animation-delay:240ms] sm:flex sm:w-auto">
            <Link href={href} className="caps inline-flex h-12 items-center justify-center gap-2.5 bg-highlight px-3 whitespace-nowrap text-ink sm:px-8 transition-[filter] hover:brightness-105">
              Comprar ahora <span aria-hidden="true">→</span>
            </Link>
            <Link href="/tienda" className="caps inline-flex h-12 items-center justify-center border border-snow/70 px-3 whitespace-nowrap text-snow sm:px-8 transition-colors hover:bg-snow hover:text-ink">
              Ver colección
            </Link>
          </div>
        </div>
      </div>

      {/* Controles: barras de progreso + flechas */}
      <div className="absolute inset-x-0 bottom-6 z-20 mx-auto flex max-w-[1320px] items-center gap-4 pr-20 pl-5 md:bottom-8 md:px-10">
        <div className="flex flex-1 gap-1.5 md:max-w-[calc(50%-60px)]" role="tablist" aria-label="Elegir novedad">
          {slides.map((s, i) => (
            <button
              key={s.product.slug}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Ver ${s.product.design}`}
              onClick={() => go(i)}
              className="group h-6 flex-1 cursor-pointer"
            >
              <span className="block h-0.5 w-full overflow-hidden bg-white/25 transition-colors group-hover:bg-white/50">
                {i < index && <span className="block h-full w-full bg-snow" />}
                {i === index && (
                  <span
                    key={`${index}-${paused}`}
                    className={`block h-full w-full origin-left bg-snow ${paused || reduced ? "" : "animate-[progress_6.5s_linear_forwards]"}`}
                  />
                )}
              </span>
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Novedad anterior"
            className="grid size-10 place-items-center rounded-full border border-snow/40 text-snow transition-colors hover:bg-snow hover:text-ink"
          >
            <Arrow dir="left" />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Siguiente novedad"
            className="grid size-10 place-items-center rounded-full border border-snow/40 text-snow transition-colors hover:bg-snow hover:text-ink"
          >
            <Arrow dir="right" />
          </button>
        </div>
      </div>
    </section>
  );
}
