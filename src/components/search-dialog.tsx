"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { formatPrice, isSoldOut, products, type Product } from "@/lib/products";

// Buscador del header: panel que baja bajo la barra, busca en el catálogo al escribir
// (sin tildes ni mayúsculas, todas las palabras deben coincidir) y también en las páginas de ayuda.

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();

const productText = (p: Product) =>
  normalize([p.name, p.design, p.color, p.front, p.back, p.description, "polo boxy fit"].join(" "));

const pages = [
  { label: "Envíos y costos", href: "/envios", keywords: "envio envios delivery costo precio despacho pucallpa lima huanuco contra entrega" },
  { label: "Guía de tallas", href: "/guia-de-tallas", keywords: "talla tallas medidas guia s m l" },
  { label: "Cambios y devoluciones", href: "/cambios-y-devoluciones", keywords: "cambio cambios devolucion devoluciones garantia" },
  { label: "Preguntas frecuentes", href: "/preguntas-frecuentes", keywords: "preguntas frecuentes ayuda faq pago pagos yape plin" },
  { label: "Contacto", href: "/contacto", keywords: "contacto whatsapp correo telefono ayuda" },
  { label: "Polos en Pucallpa", href: "/polos-pucallpa", keywords: "pucallpa ucayali tienda local" },
];

const suggestions = ["Negro", "Adventures", "Gaming", "Rojo", "Verde"];

function matches(text: string, terms: string[]) {
  return terms.every((t) => text.includes(t));
}

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  const key = normalize(query);
  const terms = key.split(/\s+/).filter(Boolean);
  const results = useMemo(() => {
    const terms = key.split(/\s+/).filter(Boolean);
    if (!terms.length) return { items: [] as Product[], help: [] as typeof pages };
    const items = products
      .filter((p) => matches(productText(p), terms))
      .sort((a, b) => Number(isSoldOut(a)) - Number(isSoldOut(b)));
    const help = pages.filter((pg) => matches(normalize(`${pg.label} ${pg.keywords}`), terms));
    return { items, help };
  }, [key]);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const logSearch = () => query.trim() && track("search", { search_term: query.trim() });

  const go = (href: string) => {
    logSearch();
    onClose();
    router.push(href);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const href = results.items[0] ? `/producto/${results.items[0].slug}` : results.help[0]?.href;
    if (href) go(href);
  };

  const empty = terms.length > 0 && !results.items.length && !results.help.length;

  return (
    <div className="fixed inset-x-0 top-[61px] bottom-0 z-50" role="dialog" aria-modal="true" aria-label="Buscar productos">
      <button type="button" aria-label="Cerrar buscador" className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative max-h-full overflow-y-auto border-b border-white/20 bg-black text-white">
        <div className="mx-auto max-w-[1100px] px-6 pt-6 pb-8">
          <form role="search" onSubmit={onSubmit} className="flex items-center gap-4 border-b border-white/30 pb-3">
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca por diseño o color…"
              aria-label="Buscar"
              autoComplete="off"
              enterKeyHint="search"
              className="min-w-0 flex-1 bg-transparent font-[family-name:var(--font-condensed)] text-2xl font-bold tracking-[1px] uppercase placeholder:text-white/35 focus:outline-none sm:text-3xl [&::-webkit-search-cancel-button]:hidden"
            />
            <button type="button" onClick={onClose} className="text-[12px] font-bold tracking-[2px] uppercase transition-opacity hover:opacity-60">
              Cerrar
            </button>
          </form>

          {!terms.length && (
            <div className="mt-5 flex flex-wrap items-center gap-2 text-[12px]">
              <span className="mr-1 font-bold tracking-[2px] text-white/50 uppercase">Populares</span>
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQuery(s);
                    inputRef.current?.focus();
                  }}
                  className="rounded-full border border-white/25 px-3 py-1 transition-colors hover:border-white hover:bg-white hover:text-black"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {empty && (
            <p className="mt-6 text-sm text-white/60">
              No encontramos nada para “{query.trim()}”.{" "}
              <Link href="/tienda" onClick={() => go("/tienda")} className="font-bold text-white underline underline-offset-4">
                Ver todos los polos
              </Link>
            </p>
          )}

          {results.items.length > 0 && (
            <>
              <p className="mt-6 text-[11px] font-bold tracking-[2px] text-white/50 uppercase" aria-live="polite">
                {results.items.length} {results.items.length === 1 ? "polo" : "polos"}
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {results.items.map((p) => {
                  const soldOut = isSoldOut(p);
                  return (
                    <li key={p.slug}>
                      <Link
                        href={`/producto/${p.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          go(`/producto/${p.slug}`);
                        }}
                        className="group block"
                      >
                        <span className="relative block aspect-[4/5] overflow-hidden bg-white">
                          <Image
                            src={p.images[0]}
                            alt={`${p.name} ${p.color}`}
                            fill
                            sizes="(max-width: 640px) 50vw, 260px"
                            className={`object-cover transition-transform duration-500 group-hover:scale-105 ${soldOut ? "opacity-60 grayscale" : ""}`}
                          />
                        </span>
                        <span className="mt-2 block font-[family-name:var(--font-condensed)] text-[14px] font-bold tracking-[0.5px] uppercase">{p.design}</span>
                        <span className="block text-[12px] text-white/60">
                          {p.color} · {soldOut ? "Agotado" : formatPrice(p.price)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

          {results.help.length > 0 && (
            <>
              <p className="mt-6 text-[11px] font-bold tracking-[2px] text-white/50 uppercase">Ayuda</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {results.help.map((pg) => (
                  <li key={pg.href}>
                    <Link
                      href={pg.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(pg.href);
                      }}
                      className="inline-block rounded-full border border-white/25 px-3 py-1 text-[12px] transition-colors hover:border-white hover:bg-white hover:text-black"
                    >
                      {pg.label} →
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
