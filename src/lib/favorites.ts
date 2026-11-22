"use client";

import { useAuth } from "./auth";
import { getProduct } from "./products";
import { supabase } from "./supabase";

/** Favoritos del cliente: lista de slugs guardada en user_metadata.favorites de su cuenta. */
export function useFavorites() {
  const { ready, session } = useAuth();
  // Solo slugs de productos que siguen en el catálogo.
  const favorites = ((session?.user.user_metadata?.favorites as string[] | undefined) ?? []).filter((s) => getProduct(s));
  return { ready, session, favorites };
}

export async function saveFavorites(next: string[]) {
  return supabase.auth.updateUser({ data: { favorites: [...new Set(next)] } });
}
