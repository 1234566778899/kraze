"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export type Slide = { title: string; href: string; image: string; position?: string };

/** Banner ancho con rotación automática y barras de progreso. */
export function FeaturedSlider({ slides }: { slides: Slide[] }) {
  const [i, setIndex] = useState(0);
  // Fotos que ya se pueden descargar: la actual y la siguiente.
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0, 1 % slides.length]));
  const setI = (next: number) => {
    setIndex(next);
    setLoaded((prev) => new Set([...prev, next, (next + 1) % slides.length]));
  };

  useEffect(() => {
    const id = setTimeout(() => {
      const next = (i + 1) % slides.length;
      setIndex(next);
      setLoaded((prev) => new Set([...prev, next, (next + 1) % slides.length]));
    }, 6000);
    return () => clearTimeout(id);
  }, [i, slides.length]);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[1520px] overflow-hidden rounded-2xl sm:aspect-[16/9] md:aspect-[21/9]">
      {slides.map((s, idx) => (
        <div key={s.title} className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`} aria-hidden={idx !== i}>
          {loaded.has(idx) && <Image src={s.image} alt="" fill sizes="(max-width: 1520px) 100vw, 1520px" className="object-cover" style={{ objectPosition: s.position ?? "center" }} />}
        </div>
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.15),rgba(0,0,0,0.6))]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <h2 className="display text-5xl md:text-8xl" aria-live="polite">
          {slides[i].title}
        </h2>
        <Link href={slides[i].href} className="caps inline-flex h-11 items-center bg-snow px-7 text-ink transition-colors hover:bg-white">
          Ver selección
        </Link>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex gap-1.5 px-0">
        {slides.map((s, idx) => (
          <button key={s.title} type="button" onClick={() => setI(idx)} aria-label={`Ver ${s.title}`} className="h-6 flex-1 cursor-pointer">
            <span className="block h-0.5 w-full overflow-hidden bg-white/30">
              {idx < i && <span className="block h-full w-full bg-snow" />}
              {idx === i && <span key={i} className="block h-full w-full origin-left animate-progress bg-snow" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
