"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, type ComponentProps, type FormEvent, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { useAuth } from "@/lib/auth";
import { authErrorMessage, supabase } from "@/lib/supabase";

const fieldBox =
  "h-[54px] w-full rounded border border-field bg-white px-3 text-base tracking-normal text-panel transition-shadow focus:border-[#86b7fe] focus:shadow-[0_0_0_4px_rgba(13,110,253,0.25)] focus:outline-none";

function Field({ label, ...props }: ComponentProps<"input"> & { label: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13.125px] font-bold text-panel">{label}</span>
      <input className={fieldBox} {...props} />
    </label>
  );
}

function PasswordField({ label, ...props }: ComponentProps<"input"> & { label: string }) {
  const [show, setShow] = useState(false);
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[13.125px] font-bold text-panel">{label}</span>
      <span className="relative">
        <input type={show ? "text" : "password"} className={`${fieldBox} pr-20`} {...props} />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-[12px] font-bold text-gray uppercase hover:text-panel"
          aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {show ? "Ocultar" : "Ver"}
        </button>
      </span>
    </label>
  );
}

function Card({ title, subtitle, children, footer }: { title: string; subtitle: string; children: ReactNode; footer: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[460px]">
      <div className="rounded-[4.8px] bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)] sm:p-10">
        <h1 className="condensed text-[40px] leading-[48px] font-bold">{title}</h1>
        <p className="mt-1 text-[13.125px] text-gray">{subtitle}</p>
        <span className="mt-4 block h-1 w-12 bg-highlight" aria-hidden="true" />
        <div className="mt-8">{children}</div>
      </div>
      <p className="mt-6 text-center text-[13.125px] text-gray">{footer}</p>
    </div>
  );
}

function SubmitButton({ busy, children }: { busy: boolean; children: ReactNode }) {
  return (
    <button
      type="submit"
      disabled={busy}
      className="condensed mt-2 flex h-16 w-full items-center justify-center gap-2 bg-panel text-lg font-bold tracking-[2px]! text-white transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-70"
    >
      {busy ? "Un momento…" : children}
    </button>
  );
}

function ErrorText({ children }: { children: ReactNode }) {
  return (
    <p className="rounded border border-[#f1aeb5] bg-[#f8d7da] px-3 py-2 text-[13.125px] text-[#842029]" role="alert">
      {children}
    </p>
  );
}

/** Si ya hay sesión, manda directo a la cuenta. */
function useRedirectIfLoggedIn() {
  const { ready, session } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (ready && session) router.replace("/cuenta");
  }, [ready, session, router]);
}

export function LoginForm() {
  useRedirectIfLoggedIn();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({
      email: String(f.get("email")).trim(),
      password: String(f.get("password")),
    });
    setBusy(false);
    if (error) return setError(authErrorMessage(error.message));
    track("login", { method: "email" });
    router.replace("/cuenta");
  };

  return (
    <Card
      title="Iniciar sesión"
      subtitle="Ingresa para ver y seguir tus pedidos."
      footer={
        <>
          ¿No tienes cuenta?{" "}
          <Link href="/cuenta/registro" className="font-bold text-panel underline underline-offset-2">
            Regístrate
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Field label="Correo electrónico" name="email" type="email" autoComplete="email" required />
        <PasswordField label="Contraseña" name="password" autoComplete="current-password" required />
        {error && <ErrorText>{error}</ErrorText>}
        <SubmitButton busy={busy}>Ingresar</SubmitButton>
      </form>
    </Card>
  );
}

export function RegisterForm() {
  useRedirectIfLoggedIn();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sentTo, setSentTo] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name")).trim();
    const email = String(f.get("email")).trim();
    const password = String(f.get("password"));
    if (password.length < 6) return setError("La contraseña debe tener al menos 6 caracteres.");
    if (password !== String(f.get("confirm"))) return setError("Las contraseñas no coinciden.");

    setBusy(true);
    setError("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name }, emailRedirectTo: `${window.location.origin}/cuenta` },
    });
    setBusy(false);
    if (error) return setError(authErrorMessage(error.message));
    // Supabase devuelve un usuario sin identidades cuando el correo ya está registrado.
    if (data.user && data.user.identities?.length === 0) return setError(authErrorMessage("already registered"));
    track("sign_up", { method: "email" });
    if (data.session) return router.replace("/cuenta");
    setSentTo(email);
  };

  if (sentTo) {
    return (
      <Card
        title="Revisa tu correo"
        subtitle="Tu cuenta está casi lista."
        footer={
          <Link href="/cuenta/ingresar" className="font-bold text-panel underline underline-offset-2">
            Ir a iniciar sesión
          </Link>
        }
      >
        <p className="leading-relaxed text-panel">
          Te enviamos un enlace de confirmación a <strong>{sentTo}</strong>. Ábrelo para activar tu cuenta y luego inicia sesión.
        </p>
      </Card>
    );
  }

  return (
    <Card
      title="Crear cuenta"
      subtitle="Regístrate para guardar tus pedidos y seguir su estado."
      footer={
        <>
          ¿Ya tienes cuenta?{" "}
          <Link href="/cuenta/ingresar" className="font-bold text-panel underline underline-offset-2">
            Inicia sesión
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Field label="Nombre" name="name" autoComplete="name" required maxLength={120} />
        <Field label="Correo electrónico" name="email" type="email" autoComplete="email" required />
        <PasswordField label="Contraseña" name="password" autoComplete="new-password" required minLength={6} />
        <PasswordField label="Confirmar contraseña" name="confirm" autoComplete="new-password" required minLength={6} />
        {error && <ErrorText>{error}</ErrorText>}
        <SubmitButton busy={busy}>Crear cuenta</SubmitButton>
      </form>
    </Card>
  );
}
