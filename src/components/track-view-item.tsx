"use client";

import { useEffect } from "react";
import { gaItem, track } from "@/lib/analytics";
import { getProduct } from "@/lib/products";

/** Envía view_item a Google Analytics al abrir la ficha de un producto. */
export function TrackViewItem({ slug }: { slug: string }) {
  useEffect(() => {
    const p = getProduct(slug);
    if (p) track("view_item", { currency: "PEN", value: p.price, items: [gaItem(p)] });
  }, [slug]);
  return null;
}
