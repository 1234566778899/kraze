"use client";

import { useMemo, useState } from "react";
import { isSoldOut, products, promo, type Product } from "@/lib/products";
import { RelatedCard } from "./related-card";

// Medidas de referencia (desktop): barra lateral 306px, grilla 966px (3 × 306 + 24px), barra de resultados 61px.

const categories: { id: string; label: string; match: (p: Product) => boolean }[] = [
  { id: "todas", label: "Todos los polos", match: () => true },
  { id: "disponibles", label: "Disponibles", match: (p) => !isSoldOut(p) },
  { id: "agotados", label: "Agotados", match: (p) => isSoldOut(p) },
];

const sorts = [
  { id: "nuevos", label: "Nuevos Primero" },
  { id: "disponibles", label: "Disponibles Primero" },
  { id: "az", label: "Nombre A – Z" },
  { id: "za", label: "Nombre Z – A" },
] as const;

type SortId = (typeof sorts)[number]["id"];

const ListIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[13px] w-[15px]" aria-hidden="true">
    <path d="M3 5h3v3H3V5Zm5 0h13v3H8V5Zm-5 6h3v3H3v-3Zm5 0h13v3H8v-3Zm-5 6h3v3H3v-3Zm5 0h13v3H8v-3Z" />
  </svg>
);

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="absolute -top-2 -right-6 size-24 rotate-12 text-white" aria-hidden="true">
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
  </svg>
);

export function ShopView() {
  const [cat, setCat] = useState("todas");
  const [sort, setSort] = useState<SortId>("nuevos");

  const list = useMemo(() => {
    const c = categories.find((x) => x.id === cat) ?? categories[0];
    const filtered = products.filter(c.match);
    const sorted = [...filtered];
    if (sort === "disponibles") sorted.sort((a, b) => Number(isSoldOut(a)) - Number(isSoldOut(b)));
    if (sort === "az") sorted.sort((a, b) => a.design.localeCompare(b.design));
    if (sort === "za") sorted.sort((a, b) => b.design.localeCompare(a.design));
    return sorted;
  }, [cat, sort]);

  return (
    <div className="mx-auto grid max-w-[1320px] items-start gap-6 px-3 pt-12 pb-20 lg:grid-cols-[306fr_966fr]">
      {/* Barra lateral */}
      <aside className="flex flex-col gap-6">
        <div className="overflow-hidden rounded-lg border border-rule bg-white shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
          <p className="flex h-12 items-center gap-2.5 bg-panel px-4 font-[family-name:var(--font-condensed)] text-[13.125px] font-bold tracking-[5px] text-white uppercase">
            <ListIcon /> Categorías
          </p>
          <ul>
            {categories.map((c) => {
              const active = c.id === cat;
              const count = products.filter(c.match).length;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setCat(c.id)}
                    className={`flex h-[52px] w-full items-center gap-4 border-l-[3px] px-5 text-left transition-colors ${active ? "border-black bg-sheet" : "border-transparent hover:bg-sheet"}`}
                  >
                    <span className={`grid size-4 shrink-0 place-items-center rounded-[2px] border ${active ? "border-black bg-black" : "border-[#ccc] bg-white"}`} aria-hidden="true">
                      {active && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={4} className="size-2.5">
                          <path d="M4 12.5l5 5L20 6.5" />
                        </svg>
                      )}
                    </span>
                    <span
                      className={
                        active
                          ? "flex-1 font-[family-name:var(--font-condensed)] text-[13.125px] font-bold tracking-[5px] text-black uppercase"
                          : "flex-1 text-[13.125px] font-bold text-[#666] uppercase"
                      }
                    >
                      {c.label}
                    </span>
                    {active && <span className="rounded-[10px] bg-highlight px-2 py-0.5 text-[11.2px] leading-[16.8px] font-black text-black">{count}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-lg border-2 border-black bg-highlight p-6 text-center">
          <p className="font-[family-name:var(--font-condensed)] text-xl leading-6 font-bold tracking-[5px] text-black uppercase">Promo</p>
          <p className="mt-2 font-[family-name:var(--font-condensed)] text-[40px] leading-none font-bold text-black">{promo.qty} x S/ {promo.price}</p>
          <p className="mt-2 text-[12px] leading-4 text-black/70">Combina diseños y colores. El descuento se aplica solo en el carrito. Precio regular S/ 45 c/u.</p>
        </div>

        <div className="relative overflow-hidden rounded-lg bg-[#0a0a0a] p-6 text-center">
          <BoltIcon />
          <p className="relative font-[family-name:var(--font-condensed)] text-xl leading-6 font-bold tracking-[5px] text-white uppercase">Nuevos drops</p>
          <p className="relative mt-2 px-4 text-[10.4px] leading-[15.6px] tracking-[-0.5px] text-white/50 uppercase">Sé parte de la cultura. Sé el primero.</p>
          <a
            href="#newsletter"
            className="relative mt-[23px] flex h-[39px] items-center justify-center border border-highlight bg-highlight font-[family-name:var(--font-condensed)] text-sm font-bold tracking-[5px] text-black uppercase"
          >
            Unirse al club
          </a>
        </div>
      </aside>

      {/* Resultados */}
      <div className="flex flex-col">
        <div className="flex h-[61px] items-center justify-between bg-white px-4 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
          <p className="text-[13.125px] font-bold text-gray" aria-live="polite">
            Mostrando <span className="text-panel">{list.length}</span> productos encontrados
          </p>
          <label className="relative">
            <span className="sr-only">Ordenar</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="h-[29px] w-[220px] cursor-pointer appearance-none bg-sheet px-4 text-sm font-bold tracking-normal text-panel focus:outline-none"
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" aria-hidden="true">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </label>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-7 md:grid-cols-3">
          {list.map((p) => (
            <RelatedCard key={p.slug} product={p} />
          ))}
        </div>
        {list.length === 0 && <p className="mt-12 text-center text-gray">No hay piezas en esta categoría por ahora.</p>}
      </div>
    </div>
  );
}
