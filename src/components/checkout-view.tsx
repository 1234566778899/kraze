"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ComponentProps, type FormEvent, type ReactNode } from "react";
import { soles, useCart } from "@/lib/cart";
import { departments, shippingFor, site } from "@/lib/site";

// Checkout sin pasarela de pago: al finalizar se arma el pedido y se envía por WhatsApp,
// donde KRAZE comparte los datos de Yape/Plin o transferencia.
// Medidas de referencia: tarjeta izquierda 784px, resumen 512px, campos de 58px, botón de 74px.

const payments = [
  { id: "yape", title: "Yape / Plin", body: "Te enviaremos el número y el código QR por WhatsApp para que realices el pago." },
  { id: "transfer", title: "Transferencia bancaria", body: "Te compartiremos los números de cuenta por WhatsApp. Envíanos la constancia para despachar tu pedido." },
];

function Step({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="condensed flex items-center gap-2 text-2xl leading-[30px] font-bold">
        <span className="grid size-[30px] place-items-center rounded-full bg-panel text-[14.4px] font-bold text-white">{n}</span>
        {title}
      </h2>
      <div className="mt-6 flex flex-col gap-4">{children}</div>
    </section>
  );
}

const fieldBox = "h-[58px] w-full rounded border border-field bg-white px-3 text-base tracking-normal text-panel transition-shadow focus:border-[#86b7fe] focus:shadow-[0_0_0_4px_rgba(13,110,253,0.25)] focus:outline-none";

function Field({ label, className = "", ...props }: ComponentProps<"input"> & { label: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="sr-only">{label}</span>
      <input placeholder={label} className={`${fieldBox} placeholder:text-panel`} {...props} />
    </label>
  );
}

export function CheckoutView() {
  const { ready, lines, subtotal, clear } = useCart();
  const [department, setDepartment] = useState("");
  const [payment, setPayment] = useState(payments[0].id);
  const [sent, setSent] = useState(false);

  const shipping = shippingFor(department);
  const total = subtotal + (shipping?.price ?? 0);

  if (!ready) return <div className="h-[900px]" aria-busy="true" />;

  if (sent || lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-[512px] flex-col items-center gap-5 rounded-[4.8px] bg-white p-10 text-center shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
        <p className="condensed text-[32px] font-bold">{sent ? "¡Pedido enviado!" : "Tu cesta está vacía"}</p>
        {sent && <p className="text-gray">Abrimos WhatsApp con el detalle de tu pedido. Envía el mensaje y te responderemos con los datos de pago.</p>}
        <Link href="/tienda" className="condensed grid h-16 place-items-center bg-panel px-10 text-xl font-bold tracking-[2px]! text-white">
          Seguir comprando
        </Link>
      </div>
    );
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const method = payments.find((p) => p.id === payment)?.title ?? "";
    const message = [
      "Hola KRAZE, quiero hacer este pedido:",
      "",
      ...lines.map((l) => `• ${l.product.name} (${l.product.color}) — Talla ${l.size} x${l.qty} — ${soles(l.subtotal)}`),
      "",
      `Subtotal: ${soles(subtotal)}`,
      `Envío (${shipping?.label ?? "-"}): ${shipping ? soles(shipping.price) : "-"}`,
      `Total: ${soles(total)}`,
      "",
      `Nombre: ${get("nombre")} ${get("apellido")}`,
      `Correo: ${get("email")}`,
      `Teléfono: ${get("telefono")}`,
      `Dirección: ${get("direccion")}${get("referencia") ? `, ${get("referencia")}` : ""}`,
      `${get("distrito")}, ${get("provincia")}, ${department}`,
      `Pago: ${method}`,
    ].join("\n");
    window.open(`${site.whatsapp}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    clear();
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="grid items-start gap-6 lg:grid-cols-[784fr_512fr]">
      {/* Datos */}
      <div className="flex flex-col gap-12 rounded-[4.8px] bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
        <Step n={1} title="Información de contacto">
          <Field label="Correo Electrónico" name="email" type="email" autoComplete="email" required />
          <label className="flex items-center gap-2 text-[13.125px] text-gray">
            <input type="checkbox" name="novedades" defaultChecked className="size-4 accent-[#0d6efd]" />
            Enviarme novedades y ofertas por correo electrónico
          </label>
        </Step>

        <Step n={2} title="Dirección de envío">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre" name="nombre" autoComplete="given-name" required />
            <Field label="Apellido" name="apellido" autoComplete="family-name" required />
          </div>
          <Field label="Dirección completa" name="direccion" autoComplete="street-address" required />
          <Field label="Referencia, departamento, etc. (opcional)" name="referencia" />
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="relative block">
              <span className="pointer-events-none absolute top-2 left-3 text-[12px] tracking-normal text-gray">Departamento</span>
              <select
                name="departamento"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className={`${fieldBox} appearance-none pt-[22px] pr-9`}
              >
                <option value="">Seleccione...</option>
                {departments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </label>
            <Field label="Provincia" name="provincia" required />
            <Field label="Distrito" name="distrito" required />
          </div>
          <Field label="Teléfono / WhatsApp" name="telefono" type="tel" autoComplete="tel" required />
        </Step>

        <Step n={3} title="Método de pago">
          <p className="-mt-2 text-[13.125px] text-gray">Coordinamos el pago por WhatsApp. No guardamos datos de tarjetas.</p>
          <div className="flex flex-col gap-3" role="radiogroup" aria-label="Método de pago">
            {payments.map((p) => (
              <label
                key={p.id}
                className={`flex cursor-pointer flex-col gap-2 border-l-[3px] p-6 transition-colors ${
                  payment === p.id ? "border-black bg-sheet" : "border-transparent bg-white outline outline-1 outline-rule"
                }`}
              >
                <span className="flex items-center gap-2 font-bold">
                  <input type="radio" name="pago" value={p.id} checked={payment === p.id} onChange={() => setPayment(p.id)} className="size-4 accent-[#0d6efd]" />
                  {p.title}
                </span>
                <span className="text-[13.125px] leading-5 text-gray">{p.body}</span>
              </label>
            ))}
          </div>
        </Step>
      </div>

      {/* Resumen 512px */}
      <div className="flex flex-col lg:sticky lg:top-20">
        <div className="rounded-[4.8px] border border-rule bg-sheet p-6">
          <h2 className="condensed text-xl leading-6 font-bold">Resumen de compra</h2>
          <ul className="mt-6">
            {lines.map((l) => (
              <li key={`${l.slug}-${l.size}`} className="flex gap-4 border-b border-rule pb-4 not-first:pt-4">
                <div className="relative h-[75px] w-[60px] shrink-0">
                  <div className="relative size-full overflow-hidden rounded bg-studio shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
                    <Image src={l.product.images[0]} alt={l.product.name} fill sizes="60px" className="object-cover" />
                  </div>
                  <span className="absolute -top-2.5 -right-2.5 grid h-[19px] min-w-5 place-items-center rounded-full bg-panel px-1 text-[11.25px] font-bold text-white">{l.qty}</span>
                </div>
                <div className="text-[13.125px] leading-5">
                  <p className="condensed font-bold">{l.product.design}</p>
                  <p className="text-gray">Talla: {l.size}</p>
                  <p className="font-bold">{soles(l.subtotal)}</p>
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-11 flex flex-col gap-1 border-b border-gray pb-4">
            <div className="flex justify-between leading-[23px]">
              <dt className="text-gray">Subtotal</dt>
              <dd className="font-bold">{soles(subtotal)}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 leading-[23px]">
              <dt className="text-gray">Envío</dt>
              <dd className={`text-right text-[13.125px] font-bold ${shipping ? "" : "text-success"}`}>{shipping ? `${soles(shipping.price)} · ${shipping.label}` : "Elige tu departamento"}</dd>
            </div>
          </dl>
          <div className="flex items-center justify-between py-5">
            <span className="condensed text-base font-bold">Total a pagar</span>
            <span className="condensed text-2xl leading-[29px] font-bold">{soles(total)}</span>
          </div>
          <button
            type="submit"
            className="condensed mt-4 flex h-[74px] w-full items-center justify-center gap-2 border border-panel bg-panel text-base font-bold text-white shadow-[0_2px_4px_rgba(0,0,0,0.075)] transition-colors hover:bg-black"
          >
            Finalizar mi compra <span aria-hidden="true">→</span>
          </button>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-[13.125px] text-gray">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5" aria-hidden="true">
              <path d="M7 10V7a5 5 0 0 1 10 0v3h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h1Zm2 0h6V7a3 3 0 0 0-6 0v3Z" />
            </svg>
            Tu pedido se confirma por WhatsApp
          </p>
        </div>
        <Link href="/carrito" className="mt-6 text-center text-[13.125px] text-gray hover:text-panel">
          ‹ Regresar al carrito
        </Link>
      </div>
    </form>
  );
}
