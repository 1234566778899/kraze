"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProduct, type Product, type Size } from "./products";

// Carrito guardado en el navegador (localStorage). No hay backend ni pagos todavía.

export type CartItem = { slug: string; size: Size; qty: number };
export type CartLine = CartItem & { product: Product; subtotal: number };

type CartContextValue = {
  ready: boolean;
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (slug: string, size: Size, qty?: number) => void;
  setQty: (slug: string, size: Size, qty: number) => void;
  remove: (slug: string, size: Size) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "kraze-cart";

function read(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
    return Array.isArray(parsed) ? parsed.filter((i) => getProduct(i.slug)) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza con localStorage tras montar
    setItems(read());
    setReady(true);
    const onStorage = (e: StorageEvent) => e.key === KEY && setItems(read());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      // almacenamiento no disponible (modo privado, etc.)
    }
  }, [items, ready]);

  const maxFor = (slug: string, size: Size) => getProduct(slug)?.stock[size] ?? 0;

  const add = useCallback((slug: string, size: Size, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === slug && i.size === size);
      const max = maxFor(slug, size);
      if (found) return prev.map((i) => (i === found ? { ...i, qty: Math.min(max, i.qty + qty) } : i));
      return [...prev, { slug, size, qty: Math.min(max, qty) }];
    });
  }, []);

  const setQty = useCallback((slug: string, size: Size, qty: number) => {
    setItems((prev) => prev.map((i) => (i.slug === slug && i.size === size ? { ...i, qty: Math.max(1, Math.min(maxFor(slug, size), qty)) } : i)));
  }, []);

  const remove = useCallback((slug: string, size: Size) => {
    setItems((prev) => prev.filter((i) => !(i.slug === slug && i.size === size)));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const lines = items.flatMap((i) => {
      const product = getProduct(i.slug);
      return product ? [{ ...i, product, subtotal: product.price * i.qty }] : [];
    });
    return {
      ready,
      lines,
      count: lines.reduce((a, l) => a + l.qty, 0),
      subtotal: lines.reduce((a, l) => a + l.subtotal, 0),
      add,
      setQty,
      remove,
      clear,
    };
  }, [items, ready, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}

export const soles = (n: number) => `S/ ${n.toFixed(2)}`;
