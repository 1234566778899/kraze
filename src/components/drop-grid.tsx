"use client";

import { useState } from "react";
import { filters, products } from "@/lib/products";
import { ProductCard } from "./product-card";

export function DropGrid() {
  const [active, setActive] = useState<(typeof filters)[number]>("Todos");
  const list = active === "Todos" ? products : products.filter((p) => p.color === active);

  return (
    <div className="flex flex-col gap-10">
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:justify-end md:px-0" role="group" aria-label="Filtrar por color">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={active === f}
            onClick={() => setActive(f)}
            className={`label shrink-0 rounded-full px-4 py-2.5 transition-colors ${
              active === f ? "bg-ink text-cream" : "border border-line hover:border-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-6">
        {list.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      {list.length === 0 && <p className="text-center text-stone">No hay polos en este color por ahora.</p>}
    </div>
  );
}
