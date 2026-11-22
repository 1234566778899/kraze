"use client";

import { useCallback, useEffect, useState, type ComponentProps, type FormEvent, type ReactNode } from "react";
import { gaItem, track } from "@/lib/analytics";
import { saveFavorites, useFavorites } from "@/lib/favorites";
import type { Product } from "@/lib/products";
import { authErrorMessage, supabase } from "@/lib/supabase";
import { HeartIcon } from "./icons";

/**
 * Favoritos guardados en la cuenta del cliente (user_metadata.favorites, lista de slugs).
 * Sin sesión: aviso "Debe iniciar sesión…" → modal de ingreso/registro → al entrar se guarda el producto.
 */
export function WishlistButton({ product }: { product: Product }) {
  const { session, favorites } = useFavorites();
  const [step, setStep] = useState<"idle" | "notice" | "login">("idle");
  const [busy, setBusy] = useState(false);

  const saved = favorites.includes(product.slug);

  const save = useCallback(
    async (list: string[], add: boolean) => {
      setBusy(true);
      const { error } = await saveFavorites(add ? [...list, product.slug] : list.filter((s) => s !== product.slug));
      setBusy(false);
      if (!error && add) track("add_to_wishlist", { currency: "PEN", value: product.price, items: [gaItem(product)] });
    },
    [product],
  );

  // Tras iniciar sesión desde el modal, cierra y guarda el producto que se quería agregar.
  const onLoggedIn = (list: string[]) => {
    setStep("idle");
    if (!list.includes(product.slug)) save(list, true);
  };

  const onClick = () => {
    if (!session) return setStep("notice");
    save(favorites, !saved);
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        aria-pressed={saved}
        className="condensed mt-4 flex h-16 items-center justify-center gap-2.5 border border-panel text-xl font-bold text-panel transition-colors hover:bg-panel hover:text-white disabled:cursor-wait disabled:opacity-70"
      >
        {saved ? "En tu lista de deseos" : "Lista de deseos"} <HeartIcon className={`size-5 ${saved ? "fill-current" : ""}`} />
      </button>
      {step === "notice" && (
        <NoticeDialog
          onOk={() => setStep("login")}
          onClose={() => setStep("idle")}
        />
      )}
      {step === "login" && (
        <LoginModal onClose={() => setStep("idle")} onLoggedIn={onLoggedIn} />
      )}
    </>
  );
}

function useEscape(onClose: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
}

function NoticeDialog({ onOk, onClose }: { onOk: () => void; onClose: () => void }) {
  useEscape(onClose);
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 px-5" onClick={onClose}>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="wish-notice-title"
        aria-describedby="wish-notice-text"
        className="sheet-page flex w-full max-w-[512px] flex-col items-center gap-4 rounded-[5px] bg-white px-8 py-10 text-center shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="grid size-[88px] place-items-center rounded-full border-4 border-[#9de0f6] text-[#3fc3ee]" aria-hidden="true">
          <svg viewBox="0 0 10 30" className="h-[52px] w-[18px]" fill="currentColor">
            <circle cx="5" cy="3.2" r="2.6" />
            <rect x="3.3" y="9.5" width="3.4" height="20" rx="0.6" />
          </svg>
        </span>
        <h2 id="wish-notice-title" className="condensed text-[30px] font-bold text-[#545454]">
          ¡Atención!
        </h2>
        <p id="wish-notice-text" className="text-[17px] text-[#545454]">
          Debe iniciar sesión para guardar productos en sus favoritos.
        </p>
        <button type="button" onClick={onOk} autoFocus className="mt-2 h-11 rounded-[5px] bg-black px-6 text-[15px] font-bold text-white">
          OK
        </button>
      </div>
    </div>
  );
}

const darkField =
  "h-14 w-full border border-white/40 bg-black px-3 text-base tracking-normal text-white transition-colors focus:border-white focus:outline-none";

function DarkField({ label, ...props }: ComponentProps<"input"> & { label: string }) {
  return (
    <label className="flex flex-col gap-3">
      <span className="text-[12px] tracking-[5px] text-white/70 uppercase">{label}</span>
      <input className={darkField} {...props} />
    </label>
  );
}

function DarkSubmit({ busy, children }: { busy: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="condensed mt-3 h-16 w-full rounded-[5px] bg-white text-lg font-bold tracking-[4px]! text-black uppercase sm:tracking-[6px]! transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
    >
      {busy ? "Un momento…" : children}
    </button>
  );
}

function DarkError({ children }: { children: ReactNode }) {
  return (
    <p className="border border-[#f1aeb5]/60 bg-[#842029]/40 px-3 py-2 text-[13px] text-[#f8d7da]" role="alert">
      {children}
    </p>
  );
}

export function LoginModal({ onClose, onLoggedIn }: { onClose: () => void; onLoggedIn: (favorites: string[]) => void }) {
  useEscape(onClose);
  const [tab, setTab] = useState<"login" | "register">("login");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    const { data, error } = await supabase.auth.signInWithPassword({ email: String(f.get("email")).trim(), password: String(f.get("password")) });
    setBusy(false);
    if (error) return setError(authErrorMessage(error.message));
    track("login", { method: "email" });
    onLoggedIn((data.user.user_metadata?.favorites as string[] | undefined) ?? []);
  };

  const onRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = String(f.get("email")).trim();
    const password = String(f.get("password"));
    if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
    if (password !== String(f.get("confirm"))) return setError("Las contraseñas no coinciden.");
    setBusy(true);
    setError("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: String(f.get("name")).trim() }, emailRedirectTo: window.location.href },
    });
    setBusy(false);
    if (error) return setError(authErrorMessage(error.message));
    if (data.user && data.user.identities?.length === 0) return setError(authErrorMessage("already registered"));
    track("sign_up", { method: "email" });
    if (data.session) onLoggedIn([]);
    else setSentTo(email);
  };

  const tabClass = (active: boolean) =>
    `condensed flex-1 border-b-[3px] pb-4 text-[17px] font-bold tracking-[3px]! uppercase transition-colors sm:text-[22px] sm:tracking-[6px]! ${
      active ? "border-white text-white" : "border-transparent text-white/50 hover:text-white/80"
    }`;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/50 px-4 py-8" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Iniciar sesión"
        className="sheet-page relative w-full max-w-[560px] min-w-0 border border-white/20 bg-black px-6 pt-14 pb-10 text-white shadow-2xl sm:px-12"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" onClick={onClose} aria-label="Cerrar" className="absolute top-5 right-5 p-1 text-white hover:opacity-70">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-7" aria-hidden="true">
            <path d="M5 5l14 14M19 5 5 19" />
          </svg>
        </button>

        <div className="mx-auto flex max-w-[440px] gap-4 sm:gap-8" role="tablist">
          <button type="button" role="tab" aria-selected={tab === "login"} className={tabClass(tab === "login")} onClick={() => (setTab("login"), setError(""))}>
            Ingresar
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "register"}
            className={tabClass(tab === "register")}
            onClick={() => (setTab("register"), setError(""))}
          >
            Registrarse
          </button>
        </div>

        <div className="mt-10">
          {tab === "login" ? (
            <form onSubmit={onLogin} className="flex flex-col gap-7">
              <DarkField label="Dirección de correo" name="email" type="email" autoComplete="email" required autoFocus />
              <DarkField label="Contraseña" name="password" type="password" autoComplete="current-password" required />
              <a href="/cuenta/recuperar" className="-mt-3 self-end text-[13px] text-white/70 underline underline-offset-2 hover:text-white">
                ¿Olvidaste tu contraseña?
              </a>
              {error && <DarkError>{error}</DarkError>}
              <DarkSubmit busy={busy}>Ingresar a mi cuenta</DarkSubmit>
            </form>
          ) : sentTo ? (
            <p className="leading-relaxed text-white/90">
              Te enviamos un enlace de confirmación a <strong>{sentTo}</strong>. Ábrelo para activar tu cuenta y luego vuelve a guardar este producto en tu
              lista de deseos.
            </p>
          ) : (
            <form onSubmit={onRegister} className="flex flex-col gap-7">
              <DarkField label="Nombre" name="name" autoComplete="name" required maxLength={120} autoFocus />
              <DarkField label="Dirección de correo" name="email" type="email" autoComplete="email" required />
              <DarkField label="Contraseña" name="password" type="password" autoComplete="new-password" required minLength={6} />
              <DarkField label="Confirmar contraseña" name="confirm" type="password" autoComplete="new-password" required minLength={6} />
              {error && <DarkError>{error}</DarkError>}
              <DarkSubmit busy={busy}>Crear mi cuenta</DarkSubmit>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
