"use client";

import { useState, type FormEvent } from "react";
import { track } from "@/lib/analytics";
import { supabase } from "@/lib/supabase";

/** "Avísame" del próximo drop: guarda el WhatsApp en Supabase (función subscribe_drop_alert). */
export function DropAlertForm({ dropName }: { dropName: string }) {
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "invalid" | "error">("idle");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const phone = String(new FormData(e.currentTarget).get("phone")).replace(/\D/g, "").replace(/^51(?=\d{9}$)/, "");
    if (!/^9\d{8}$/.test(phone)) return setStatus("invalid");
    setStatus("busy");
    const { error } = await supabase.rpc("subscribe_drop_alert", { p_phone: phone, p_drop: dropName });
    if (error) return setStatus("error");
    track("generate_lead", { method: "drop_alert" });
    setStatus("done");
  };

  if (status === "done") {
    return (
      <p className="w-full max-w-md border-b border-snow/40 pb-3 text-sm text-snow" role="status">
        ¡Listo! Te escribiremos por WhatsApp cuando salga el {dropName}.
      </p>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-2">
      <form className="flex w-full border-b border-snow/40 focus-within:border-snow" onSubmit={onSubmit} noValidate>
        <label htmlFor="aviso" className="sr-only">
          Tu número de WhatsApp
        </label>
        <span className="grid place-items-center pr-3 text-sm text-mute">+51</span>
        <input
          id="aviso"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={15}
          required
          placeholder="Tu WhatsApp para avisarte"
          aria-invalid={status === "invalid"}
          aria-describedby={status === "invalid" || status === "error" ? "aviso-error" : undefined}
          onChange={() => (status === "invalid" || status === "error") && setStatus("idle")}
          className="h-12 min-w-0 flex-1 bg-transparent text-sm placeholder:text-mute focus:outline-none"
        />
        <button type="submit" disabled={status === "busy"} className="caps text-[11px] transition-opacity hover:opacity-70 disabled:cursor-wait disabled:opacity-50">
          {status === "busy" ? "Enviando…" : "Avísame →"}
        </button>
      </form>
      {(status === "invalid" || status === "error") && (
        <p id="aviso-error" className="text-left text-[12px] text-[#f8a5ad]" role="alert">
          {status === "invalid" ? "Escribe un celular de 9 dígitos que empiece con 9." : "No pudimos guardar tu número. Inténtalo de nuevo."}
        </p>
      )}
    </div>
  );
}
