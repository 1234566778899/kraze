"use client";

import { useState } from "react";
import { sizes, totalStock, type Product, type Size } from "@/lib/products";
import { shippingCities, shippingRates, site } from "@/lib/site";
import { Button } from "./ui";
import { WhatsAppIcon } from "./whatsapp-button";

// Solo diseño: los botones todavía no agregan al carrito ni procesan pagos.
export function ProductBuyBox({ product }: { product: Product }) {
  const firstAvailable = sizes.find((s) => product.stock[s] > 0) ?? null;
  const [size, setSize] = useState<Size | null>(firstAvailable);
  const [qty, setQty] = useState(1);
  const [city, setCity] = useState(shippingCities[0]);
  const total = totalStock(product);
  const soldOut = total === 0;
  const maxQty = size ? product.stock[size] : 1;
  const left = Math.min(100, Math.round((total / 40) * 100));

  const whatsappText = encodeURIComponent(
    `Hola KRAZE, quiero el ${product.name} (${product.color})${size ? ` en talla ${size}` : ""}, cantidad ${qty}. Envío a ${city}.`,
  );

  return (
    <div className="flex flex-col gap-7">
      {/* Stock */}
      <div className="flex flex-col gap-2">
        <p className="flex items-center gap-2 text-[13px] font-medium">
          <span className={`size-2 rounded-full ${soldOut ? "bg-stone" : "bg-fire"}`} />
          {soldOut ? "Agotado · Atento al próximo drop" : `Quedan ${total} unidades · No habrá reposición`}
        </p>
        <div className="h-1 w-full max-w-md bg-line" aria-hidden="true">
          <div className="h-full bg-fire" style={{ width: `${left}%` }} />
        </div>
      </div>

      <hr className="border-line" />

      {/* Talla */}
      <fieldset className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <legend className="label">Talla{size ? `: ${size}` : ""}</legend>
          <a href="#medidas" className="text-xs font-medium underline">
            Guía de tallas
          </a>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {sizes.map((s) => {
            const n = product.stock[s];
            const out = n === 0;
            const selected = size === s;
            return (
              <button
                key={s}
                type="button"
                disabled={out}
                aria-pressed={selected}
                onClick={() => {
                  setSize(s);
                  setQty(1);
                }}
                className={`flex h-15 flex-col items-center justify-center gap-0.5 border transition-colors ${
                  selected ? "border-ink bg-ink text-cream" : out ? "cursor-not-allowed border-line text-[#bdb6ac]" : "border-line hover:border-ink"
                }`}
              >
                <span className={`text-base font-bold ${out ? "line-through" : ""}`}>{s}</span>
                <span className={`font-mono text-[10px] ${selected ? "text-fire" : "text-stone"}`}>
                  {out ? "Agotado" : n <= 3 ? `Quedan ${n}` : "Disponible"}
                </span>
              </button>
            );
          })}
        </div>
        <p className="flex gap-2.5 bg-cream px-3.5 py-3 text-xs leading-relaxed">
          <span className="label text-[10px] text-fire">Fit</span>
          Boxy fit unisex. Si prefieres un fit regular, pide una talla menos.
        </p>
      </fieldset>

      {/* CTAs */}
      <div className="flex flex-col gap-2.5">
        <div className="flex gap-2.5">
          <div className="flex h-14 items-center border-[1.5px] border-ink" role="group" aria-label="Cantidad">
            <button type="button" className="h-full px-4 font-bold disabled:opacity-30" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1 || soldOut} aria-label="Restar uno">
              −
            </button>
            <span className="w-6 text-center font-bold tabular-nums" aria-live="polite">
              {qty}
            </span>
            <button type="button" className="h-full px-4 font-bold disabled:opacity-30" onClick={() => setQty((q) => Math.min(maxQty, q + 1))} disabled={qty >= maxQty || soldOut} aria-label="Sumar uno">
              +
            </button>
          </div>
          <Button className="h-14 flex-1" disabled={soldOut || !size} title="Próximamente">
            {soldOut ? "Agotado" : "Agregar al carrito"}
          </Button>
        </div>
        <a
          href={`${site.whatsapp}?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center justify-center gap-2.5 border-[1.5px] border-ink font-mono text-[13px] font-bold tracking-wider uppercase transition-colors hover:bg-ink hover:text-cream"
        >
          <WhatsAppIcon className="size-5 text-whatsapp" />
          Comprar por WhatsApp
        </a>
      </div>

      <ul className="flex flex-wrap items-center gap-2" aria-label="Medios de pago">
        <li className="mr-1 text-xs text-stone">Paga con</li>
        {["Yape", "Plin", "Visa", "MC", "PagoEfectivo"].map((p) => (
          <li key={p} className="label border border-line px-2 py-1 text-[10px]">
            {p}
          </li>
        ))}
      </ul>

      {/* Envío */}
      <div className="flex flex-col gap-3.5 border border-line p-5">
        <label htmlFor="ciudad" className="label">
          Calcula tu envío
        </label>
        <select
          id="ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="h-12 border-[1.5px] border-ink bg-paper px-3 text-sm font-medium"
        >
          {shippingCities.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <ul>
          {shippingRates.map((r, i) => {
            const match =
              (city.startsWith("Pucallpa") && i === 0) ||
              (city.startsWith("Huánuco") && i === 1) ||
              (city.startsWith("Lima") && i === 2) ||
              ((city.startsWith("Tingo") || city.startsWith("Otra")) && i === 3);
            return (
              <li key={r.zone} className="flex items-center justify-between gap-3 border-t border-line py-2.5">
                <div>
                  <p className={`text-sm ${match ? "font-bold" : "font-medium"}`}>{r.zone}</p>
                  <p className="text-xs text-stone">{r.time}</p>
                </div>
                <p className={`text-sm font-bold ${match ? "text-fire" : ""}`}>{r.price}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
