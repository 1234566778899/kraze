"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { Tag } from "./ui";

export function ProductGallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const images = product.images;
  const lowStock = Object.entries(product.stock).find(([, n]) => n > 0 && n <= 3);

  return (
    <div className="flex flex-col-reverse gap-3 md:flex-row">
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto md:w-18 md:flex-col" role="tablist" aria-label="Fotos del producto">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Ver foto ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative aspect-[3/4] w-18 shrink-0 overflow-hidden bg-cream outline-offset-2 ${active === i ? "outline-2 outline-ink" : "opacity-70 hover:opacity-100"}`}
            >
              <Image src={src} alt="" fill sizes="72px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="relative aspect-[3/4] flex-1 overflow-hidden bg-cream">
        <Image
          key={images[active]}
          src={images[active]}
          alt={`${product.name} — ${product.color}, foto ${active + 1}`}
          fill
          preload={active === 0}
          quality={85}
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover"
        />
        {lowStock && (
          <Tag tone="fire" className="absolute top-4 left-4">
            Últimas {lowStock[1]} en talla {lowStock[0]}
          </Tag>
        )}
      </div>
    </div>
  );
}
