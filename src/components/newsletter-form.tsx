"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { supabase } from "@/lib/supabase";

/** Boletín del footer: guarda el correo en Supabase (función subscribe_newsletter). */
export function NewsletterForm({ heading }: { heading: ReactNode }) {
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email")).trim();
    setStatus("busy");
    const { error } = await supabase.rpc("subscribe_newsletter", { p_email: email, p_source: "footer" });
    if (error) return setStatus("error");
    track("generate_lead", { method: "newsletter" });
    setStatus("done");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {heading}
      <p className="text-[13.125px] text-white/50 uppercase">Únete al círculo para drops exclusivos.</p>
      {status === "done" ? (
        <p className="text-[15px] text-white" role="status">
          ¡Listo! Ya estás en el círculo. Te avisaremos de los próximos drops.
        </p>
      ) : (
        <>
          <label htmlFor="newsletter" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="newsletter"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="CORREO ELECTRÓNICO"
            onChange={() => status === "error" && setStatus("idle")}
            className="h-[43px] border-b border-white/50 bg-transparent text-[15px] placeholder:text-white/50 focus:border-white focus:outline-none"
          />
          {status === "error" && (
            <p className="text-[13px] text-[#f8a5ad]" role="alert">
              No pudimos registrar tu correo. Revisa que esté bien escrito e inténtalo de nuevo.
            </p>
          )}
          <button
            type="submit"
            disabled={status === "busy"}
            className="self-start text-base font-black tracking-[5px] uppercase transition-opacity hover:opacity-70 disabled:cursor-wait disabled:opacity-50"
          >
            {status === "busy" ? "Enviando…" : "Unirse →"}
          </button>
        </>
      )}
    </form>
  );
}
