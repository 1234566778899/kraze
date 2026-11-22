"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { soles, useCart, type CartLine } from "@/lib/cart";
import { promo } from "@/lib/products";

const CartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden="true">
    <path d="M2 3h3l2.5 11h11L21 7H6.2" />
    <circle cx="9" cy="19" r="1.6" fill="currentColor" />
    <circle cx="17" cy="19" r="1.6" fill="currentColor" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
    <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-3 6h12l-1 12H7L6 9Zm4 2v8h1.5v-8H10Zm3.5 0v8H15v-8h-1.5Z" />
  </svg>
);

/** Título de página: 56px + subtítulo 15px gris + barra amarilla 80×5. */
export function PageTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h1 className="condensed text-[56px] leading-[67px] font-bold">{title}</h1>
      <p className="mt-2 text-[15px] font-bold text-gray">{subtitle}</p>
      <span className="mt-4 block h-[5px] w-20 bg-highlight" aria-hidden="true" />
    </div>
  );
}

// Columnas de la tabla (848px): producto 325, talla 97, cantidad 212, subtotal 143, eliminar resto.
const cols = "md:grid-cols-[325fr_97fr_212fr_143fr_71fr]";

export function CartView() {
  const { ready, lines, subtotal, discount, total, count } = useCart();

  if (!ready) return <div className="h-[430px]" aria-busy="true" />;

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-start gap-5 bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
        <p className="condensed text-2xl font-bold">Tu cesta está vacía</p>
        <p className="text-gray">Elige tus piezas antes de que se agote el drop.</p>
        <Link href="/tienda" className="condensed grid h-16 place-items-center bg-panel px-10 text-xl font-bold tracking-[2px]! text-white">
          Ver todo
        </Link>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-12 lg:grid-cols-[848fr_400fr]">
      {/* Tabla */}
      <div className="bg-white">
        <div className={`hidden h-[52px] items-center bg-panel text-[12.8px] font-bold tracking-[1px] text-white uppercase md:grid ${cols}`}>
          <span className="pr-2 pl-6">Producto</span>
          <span className="px-2">Talla</span>
          <span className="px-2">Cantidad</span>
          <span className="px-2">Subtotal</span>
          <span />
        </div>
        <ul>
          {lines.map((line) => (
            <CartRow key={`${line.slug}-${line.size}`} line={line} />
          ))}
        </ul>
      </div>

      {/* Resumen 400px */}
      <div className="flex flex-col gap-6">
        <div className="bg-panel p-6 text-white shadow-[0_16px_48px_rgba(0,0,0,0.176)]">
          <h2 className="condensed border-b border-gray pb-4 text-2xl leading-[30px] font-bold">Resumen</h2>
          <dl className="mt-[23px] flex flex-col gap-4 border-b border-gray pb-6">
            <div className="flex justify-between leading-[23px]">
              <dt className="text-gray">Subtotal</dt>
              <dd className="font-bold">{soles(subtotal)}</dd>
            </div>
            {discount > 0 && (
              <div className="flex justify-between leading-[23px]">
                <dt className="text-gray">Promo {promo.label}</dt>
                <dd className="font-bold text-highlight">− {soles(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between leading-[23px]">
              <dt className="text-gray">Envío</dt>
              <dd className="font-bold text-highlight">En el checkout</dd>
            </div>
          </dl>
          <div className="mt-[14px] flex items-center justify-between">
            <span className="condensed text-[28px] leading-[42px] font-bold">Total</span>
            <span className="condensed text-[28px] leading-[42px] font-bold text-highlight">{soles(total)}</span>
          </div>
          {count % promo.qty === 1 && (
            <p className="mt-3 text-[13px] text-white/70">
              Añade 1 polo más y llévate {promo.qty} por {soles(promo.price)}.
            </p>
          )}
          <Link
            href="/carrito/checkout"
            className="condensed mt-12 flex h-16 items-center justify-center gap-3 border border-highlight bg-highlight text-xl font-bold tracking-[2px]! text-black transition-[filter] hover:brightness-105"
          >
            <CartIcon /> Realizar pedido
          </Link>
          <p className="mt-[34px] text-center text-[11px] font-bold tracking-[2px] text-white/40 uppercase">Yape · Plin · Transferencia</p>
        </div>

        <Coupon />
      </div>
    </div>
  );
}

function CartRow({ line }: { line: CartLine }) {
  const { setQty, remove } = useCart();
  const { product, size, qty, subtotal } = line;
  const max = product.stock[size];

  return (
    <li className={`grid grid-cols-[1fr_auto] items-center gap-y-3 border-b border-rule px-6 py-6 md:h-[150px] md:px-0 md:py-0 ${cols}`}>
      <div className="flex items-center gap-4 md:pl-6">
        <Link href={`/producto/${product.slug}`} className="relative h-[100px] w-20 shrink-0 overflow-hidden bg-studio shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
          <Image src={product.images[0]} alt={product.name} fill sizes="80px" className="object-cover" />
        </Link>
        <div>
          <p className="condensed text-base leading-[19px] font-bold">{product.design}</p>
          <p className="text-[13.125px] text-gray">{product.color}</p>
          <p className="mt-1 text-[13.125px] text-gray md:hidden">Talla {size}</p>
        </div>
      </div>

      <span className="hidden px-2 font-bold md:block">{size}</span>

      <div className="col-start-1 flex md:col-start-auto md:px-2">
        <div className="flex h-[31px] items-stretch" role="group" aria-label={`Cantidad de ${product.design}`}>
          <button type="button" className="w-6 border border-panel text-sm disabled:opacity-40" disabled={qty <= 1} onClick={() => setQty(product.slug, size, qty - 1)} aria-label="Restar uno">
            -
          </button>
          <span className="grid w-[70px] place-items-center border-y border-panel bg-[#e9ecef] text-sm font-bold tracking-normal tabular-nums">{qty}</span>
          <button type="button" className="w-6 border border-panel text-sm disabled:opacity-40" disabled={qty >= max} onClick={() => setQty(product.slug, size, qty + 1)} aria-label="Sumar uno">
            +
          </button>
        </div>
      </div>

      <span className="condensed row-start-1 text-right text-[15px] font-bold md:row-start-auto md:px-2 md:text-left">{soles(subtotal)}</span>

      <button type="button" onClick={() => remove(product.slug, size)} aria-label={`Quitar ${product.design} talla ${size}`} className="justify-self-end text-[#dc3545] transition-opacity hover:opacity-70 md:justify-self-center">
        <TrashIcon />
      </button>
    </li>
  );
}

function Coupon() {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  return (
    <form
      className="border border-rule bg-white p-6"
      onSubmit={(e) => {
        e.preventDefault();
        setMsg(code ? "Los cupones estarán disponibles pronto." : null);
      }}
    >
      <label htmlFor="cupon" className="condensed block text-base leading-[19px] font-bold">
        ¿Tienes un código?
      </label>
      <div className="mt-2 flex">
        <input
          id="cupon"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="KRAZE10"
          className="h-[38px] min-w-0 flex-1 border border-panel px-3 text-base tracking-normal placeholder:text-gray focus:outline-none"
        />
        <button type="submit" className="h-[38px] w-24 border border-panel bg-panel text-base font-bold tracking-normal text-white">
          Aplicar
        </button>
      </div>
      {msg && <p className="mt-2 text-[13.125px] text-gray">{msg}</p>}
    </form>
  );
}
