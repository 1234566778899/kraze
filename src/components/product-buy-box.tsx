"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { sizes, type Product, type Size } from "@/lib/products";
import { HeartIcon } from "./icons";

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
    <path d="M2 3h3l2.5 11h11L21 7H6.2" />
    <circle cx="9" cy="19" r="1.6" fill="currentColor" />
    <circle cx="17" cy="19" r="1.6" fill="currentColor" />
  </svg>
);

const RulerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
    <path d="M3 3h4v14h14v4H3V3Zm6 12V5h2v10H9Zm4 0v-4h2v4h-2Zm4 0v-6h2v6h-2Z" />
  </svg>
);

// "Lista de deseos" todavía es solo diseño.
export function ProductBuyBox({ product }: { product: Product }) {
  const [size, setSize] = useState<Size | null>(null);
  const [added, setAdded] = useState(false);
  const [needSize, setNeedSize] = useState(false);
  const { add } = useCart();

  const onAdd = () => {
    if (!size) {
      setNeedSize(true);
      return;
    }
    add(product.slug, size);
    setAdded(true);
  };

  return (
    <div className="flex flex-col">
      {/* Talla: etiqueta 16px, cajas 42px de alto */}
      <fieldset>
        <div className="flex items-center justify-between">
          <legend className="condensed float-left text-base leading-[19px] font-bold">Seleccionar talla</legend>
          <a href="#medidas" className="flex items-center gap-1 text-[13.125px] font-bold text-panel underline underline-offset-2">
            <RulerIcon /> Guía de Tallas
          </a>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {sizes.map((s) => {
            const out = product.stock[s] === 0;
            const selected = size === s;
            return (
              <button
                key={s}
                type="button"
                disabled={out}
                aria-pressed={selected}
                aria-label={`Talla ${s}${out ? ", agotada" : product.stock[s] <= 3 ? `, quedan ${product.stock[s]}` : ""}`}
                onClick={() => {
                  setSize(s);
                  setNeedSize(false);
                }}
                className={`condensed h-[42px] min-w-[57px] border px-6 text-base font-bold transition-colors ${
                  selected ? "border-panel bg-panel text-white" : out ? "cursor-not-allowed border-panel/20 text-panel/30 line-through" : "border-panel text-panel hover:bg-panel hover:text-white"
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
        {needSize && (
          <p className="mt-2 text-[13px] font-medium text-[#dc3545]" role="alert">
            Selecciona una talla para continuar.
          </p>
        )}
      </fieldset>

      {/* Botones: 80px y 64px de alto */}
      <button
        type="button"
        onClick={onAdd}
        className="condensed mt-12 flex h-20 items-center justify-center gap-3 border border-panel bg-panel text-xl font-bold tracking-[2px]! text-white shadow-[0_16px_48px_rgba(0,0,0,0.176)] transition-colors hover:bg-black"
      >
        Añadir al carrito <CartIcon />
      </button>
      <button type="button" className="condensed mt-4 flex h-16 items-center justify-center gap-2.5 border border-panel text-xl font-bold text-panel transition-colors hover:bg-panel hover:text-white">
        Lista de deseos <HeartIcon className="size-5" />
      </button>
      {added && <AddedDialog onClose={() => setAdded(false)} />}
    </div>
  );
}

function AddedDialog({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-5" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="added-title"
        className="sheet-page flex w-full max-w-[512px] flex-col items-center gap-4 bg-white px-8 py-10 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="grid size-[88px] place-items-center rounded-full border-4 border-[#c9e6c0] text-[#a5dc86]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="size-11" aria-hidden="true">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <h2 id="added-title" className="condensed text-[30px] font-bold">
          ¡Añadido!
        </h2>
        <p className="text-[17px] text-[#545454]">El producto se ha añadido a tu carrito.</p>
        <div className="mt-2 flex gap-2">
          <button type="button" onClick={onClose} autoFocus className="h-11 border border-panel px-5 text-[15px] font-bold">
            Seguir comprando
          </button>
          <Link href="/carrito" className="grid h-11 place-items-center bg-black px-5 text-[15px] font-bold text-white">
            Ver carrito
          </Link>
        </div>
      </div>
    </div>
  );
}
