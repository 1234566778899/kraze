"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/products";

const Chevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-8" aria-hidden="true">
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </svg>
);

/** Galería: frente y espalda sobre fondo blanco y luego las fotos con modelos (4:5, 736px de ancho en desktop). */
export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const images = product.images;
  const many = images.length > 1;
  // Fotos montadas: las ya vistas y las vecinas de la actual, para que al pasar no quede el recuadro en blanco.
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0, 1, images.length - 1].filter((i) => i >= 0 && i < images.length)));
  const show = (i: number) => {
    setActive(i);
    setLoaded((prev) => new Set([...prev, i, (i + 1) % images.length, (i - 1 + images.length) % images.length]));
  };
  const go = (d: number) => show((active + d + images.length) % images.length);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-[4/5] overflow-hidden bg-white">
        {images.map(
          (src, i) =>
            loaded.has(i) && (
              <Image
                key={src}
                src={src}
                alt={i === active ? `${product.name} ${product.color}, ${i === 0 ? "frente" : i === 1 ? "espalda" : `foto con modelo ${i - 1}`}` : ""}
                aria-hidden={i !== active}
                fill
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "low"}
                quality={85}
                sizes="(max-width: 1024px) 100vw, 736px"
                className={`object-cover transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ),
        )}
        {many && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className="absolute top-1/2 left-3 -translate-y-1/2 p-2 text-panel/40 transition-colors hover:text-panel">
              <Chevron dir="left" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Foto siguiente" className="absolute top-1/2 right-3 -translate-y-1/2 p-2 text-panel/70 transition-colors hover:text-panel">
              <Chevron dir="right" />
            </button>
          </>
        )}
      </div>
      {many && (
        <div className="flex flex-wrap gap-3" role="tablist" aria-label="Fotos del producto">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Ver foto ${i + 1}`}
              onClick={() => show(i)}
              className={`relative aspect-[4/5] w-[18.6%] max-w-[137px] overflow-hidden border-2 bg-white ${active === i ? "border-highlight" : "border-transparent opacity-80 hover:opacity-100"}`}
            >
              <Image src={src} alt="" fill sizes="137px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
