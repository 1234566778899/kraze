import { createClient } from "@supabase/supabase-js";

// Cliente de Supabase para el navegador. Solo usa la clave publicable, que es pública por diseño
// (va dentro del JavaScript que descarga cualquier visitante): los permisos los controlan las
// políticas RLS de la base (ver supabase/schema.sql). Las claves secretas NUNCA van aquí.
// Se pueden sobreescribir con NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://yupgzohlpvgjgqtzuttt.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_cJkztaMIQmZpIz_-76EeZg_Q-TSxh1d";

export const supabase = createClient(url, key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

export type OrderStatus = "pendiente" | "confirmado" | "enviado" | "entregado" | "cancelado";

export type OrderItem = {
  slug: string;
  name: string;
  color: string;
  size: string;
  qty: number;
  unit_price: number;
  subtotal: number;
  image: string;
};

export type Order = {
  id: number;
  customer_name: string;
  phone: string;
  address: string;
  reference: string | null;
  district: string;
  province: string;
  department: string;
  payment_method: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  created_at: string;
};

/** Número de pedido con 6 cifras, ej. 974 → "000974". */
export const orderCode = (id: number) => String(id).padStart(6, "0");

/** Traduce los errores de Supabase Auth más comunes. */
export function authErrorMessage(message: string) {
  const m = message.toLowerCase();
  if (m.includes("invalid login credentials")) return "Correo o contraseña incorrectos.";
  if (m.includes("email not confirmed")) return "Confirma tu correo antes de ingresar. Revisa tu bandeja de entrada.";
  if (m.includes("already registered") || m.includes("already been registered")) return "Ya existe una cuenta con ese correo. Inicia sesión.";
  if (m.includes("password should be at least")) return "La contraseña debe tener al menos 6 caracteres.";
  if (m.includes("rate limit") || m.includes("security purposes")) return "Demasiados intentos. Espera un momento y vuelve a intentarlo.";
  if (m.includes("invalid") && m.includes("email")) return "Ese correo no es válido.";
  return "No pudimos completar la operación. Inténtalo de nuevo.";
}
