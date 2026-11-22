"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { saveFavorites, useFavorites } from "@/lib/favorites";
import { getProduct, isSoldOut, sizes, type Product } from "@/lib/products";
import { LoginModal } from "./wishlist-button";

const soles = (n: number) => `S/ ${n.toFixed(2)}`;

export function FavoritesView() {
  const { ready, session, favorites } = useFavorites();
  const [login, setLogin] = useState(false);
  const items = favorites.map(getProduct).filter((p): p is Product => Boolean(p));

  if (!ready) return <div className="h-[320px]" aria-busy="true" />;

  if (!session) {
    return (
      <div className="flex flex-col items-start gap-5 bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
        <p className="condensed text-2xl font-bold">Inicia sesión para ver tus favoritos</p>
        <p className="text-gray">Guarda los polos que te gustan con el botón &ldquo;Lista de deseos&rdquo; y encuéntralos aquí.</p>
        <button
          type="button"
          onClick={() => setLogin(true)}
          className="condensed grid h-16 place-items-center bg-panel px-10 text-xl font-bold tracking-[2px]! text-white transition-colors hover:bg-black"
        >
          Iniciar sesión
        </button>
        {login && <LoginModal onClose={() => setLogin(false)} onLoggedIn={() => setLogin(false)} />}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-start gap-5 bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
        <p className="condensed text-2xl font-bold">Aún no tienes favoritos</p>
        <p className="text-gray">Entra a un polo y pulsa &ldquo;Lista de deseos&rdquo; para guardarlo aquí.</p>
        <Link href="/tienda" className="condensed grid h-16 place-items-center bg-panel px-10 text-xl font-bold tracking-[2px]! text-white">
          Ver todo
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {items.map((p) => (
        <FavoriteCard key={p.slug} product={p} favorites={favorites} />
      ))}
    </ul>
  );
}

function FavoriteCard({ product, favorites }: { product: Product; favorites: string[] }) {
  const [busy, setBusy] = useState(false);
  const soldOut = isSoldOut(product);
  const href = `/producto/${product.slug}`;

  const remove = async () => {
    setBusy(true);
    await saveFavorites(favorites.filter((s) => s !== product.slug));
    setBusy(false);
  };

  return (
    <li className={`flex flex-col bg-white transition-opacity ${busy ? "opacity-50" : ""}`}>
      <div className="relative">
        <Link href={href} className="relative block aspect-[4/5] overflow-hidden bg-white">
          <Image
            src={product.images[0]}
            alt={`${product.name} — ${product.color}`}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={`object-cover transition-transform duration-500 hover:scale-[1.03] ${soldOut ? "grayscale" : ""}`}
          />
        </Link>
        <button
          type="button"
          onClick={remove}
          disabled={busy}
          aria-label={`Quitar ${product.design} de favoritos`}
          title="Quitar de favoritos"
          className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white text-panel shadow transition-colors hover:bg-panel hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="size-4" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h2 className="condensed text-xl leading-tight font-bold">
          <Link href={href}>{product.design}</Link>
        </h2>
        <p className="text-[13px] text-gray">{product.color}</p>
        <p className={`mt-1 font-bold ${soldOut ? "text-gray line-through" : ""}`}>{soles(product.price)}</p>
        <p className="mb-3 text-[12px] text-gray">{soldOut ? "Agotado" : `Tallas ${sizes.join(" · ")}`}</p>
        <Link
          href={href}
          className="condensed mt-auto grid h-12 place-items-center border border-panel pt-0.5 text-base font-bold tracking-[1px]! transition-colors hover:bg-panel hover:text-white"
        >
          {soldOut ? "Ver producto" : "Elegir talla"}
        </Link>
      </div>
    </li>
  );
}
