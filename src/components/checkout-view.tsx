"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ComponentProps, type FormEvent, type ReactNode } from "react";
import { gaItem, track } from "@/lib/analytics";
import { useAuth } from "@/lib/auth";
import { soles, useCart } from "@/lib/cart";
import { promo } from "@/lib/products";
import { orderCode, supabase } from "@/lib/supabase";
import { departments, shippingFor, whatsappWith } from "@/lib/site";

// Checkout sin pasarela de pago: al finalizar se arma el pedido y se envía por WhatsApp,
// donde KRAZE comparte los datos de Yape/Plin o transferencia.
// Medidas de referencia: tarjeta izquierda 784px, resumen 512px, campos de 58px, botón de 74px.

const payments = [
  { id: "yape", title: "Yape / Plin", body: "Te enviaremos el número y el código QR por WhatsApp para que realices el pago." },
  { id: "transfer", title: "Transferencia bancaria", body: "Te compartiremos los números de cuenta por WhatsApp. Envíanos la constancia para despachar tu pedido." },
  { id: "cod", title: "Pago contra entrega", body: "Solo en Pucallpa: pagas en efectivo, Yape o Plin cuando recibes tu pedido.", onlyUcayali: true },
];

/** Número de respaldo si Supabase no responde: fecha (AAMMDD) + 4 cifras al azar, ej. 251122-4831. */
function fallbackOrderNumber() {
  const d = new Date();
  const ymd = [d.getFullYear() % 100, d.getMonth() + 1, d.getDate()].map((n) => String(n).padStart(2, "0")).join("");
  return `${ymd}-${String(Math.floor(Math.random() * 10000)).padStart(4, "0")}`;
}

const rule = "--------------------------";

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
  const { ready, lines, subtotal, discount, clear } = useCart();
  const [department, setDepartment] = useState("");
  const [payment, setPayment] = useState(payments[0].id);
  const [sent, setSent] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { session, name } = useAuth();
  const [firstName, ...rest] = name.split(" ");

  const shipping = shippingFor(department);
  // El pago contra entrega solo aplica en Pucallpa: si cambia el departamento, vuelve a Yape / Plin.
  const activePayment = payment === "cod" && department !== "Ucayali" ? payments[0].id : payment;
  const total = subtotal - discount + (shipping?.price ?? 0);

  // begin_checkout una sola vez, cuando el carrito ya cargó y tiene productos.
  const checkoutTracked = useRef(false);
  useEffect(() => {
    if (!ready || lines.length === 0 || checkoutTracked.current) return;
    checkoutTracked.current = true;
    track("begin_checkout", {
      currency: "PEN",
      value: subtotal - discount,
      coupon: discount > 0 ? promo.label : undefined,
      items: lines.map((l) => gaItem(l.product, l.size, l.qty)),
    });
  }, [ready, lines, subtotal, discount]);

  if (!ready) return <div className="h-[900px]" aria-busy="true" />;

  if (sent || lines.length === 0) {
    return (
      <div className="mx-auto flex max-w-[512px] flex-col items-center gap-5 rounded-[4.8px] bg-white p-10 text-center shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
        <p className="condensed text-[32px] font-bold">{sent ? "¡Pedido enviado!" : "Tu cesta está vacía"}</p>
        {sent && (
          <>
            <p className="condensed text-xl font-bold">Pedido #{sent}</p>
            {session && (
              <Link href="/cuenta" className="text-[13.125px] font-bold text-panel underline underline-offset-2">
                Seguir mi pedido en Mi cuenta
              </Link>
            )}
            <p className="text-gray">Abrimos WhatsApp con el detalle de tu pedido. Envía el mensaje y te responderemos con los datos de pago.</p>
          </>
        )}
        <Link href="/tienda" className="condensed grid h-16 place-items-center bg-panel px-10 text-xl font-bold tracking-[2px]! text-white">
          Seguir comprando
        </Link>
      </div>
    );
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const method = payments.find((p) => p.id === activePayment)?.title ?? "";

    // La pestaña se abre ya (dentro del clic) para que el navegador no la bloquee;
    // se le asigna el enlace de WhatsApp cuando Supabase devuelve el número de pedido.
    const tab = window.open("", "_blank");
    if (tab) tab.opener = null;
    setBusy(true);

    const { data: id, error } = await supabase.rpc("create_order", {
      p_customer_name: `${get("nombre")} ${get("apellido")}`,
      p_email: get("email"),
      p_phone: get("telefono"),
      p_address: get("direccion"),
      p_reference: get("referencia"),
      p_district: get("distrito"),
      p_province: get("provincia"),
      p_department: department,
      p_payment_method: method,
      p_items: lines.map((l) => ({
        slug: l.slug,
        name: l.product.design,
        color: l.product.color,
        size: l.size,
        qty: l.qty,
        unit_price: l.product.price,
        subtotal: l.subtotal,
        image: l.product.images[0],
      })),
      p_subtotal: subtotal,
      p_discount: discount,
      p_shipping: shipping?.price ?? 0,
      p_total: total,
    });
    // Si la base no responde, el pedido igual se envía por WhatsApp con un número de respaldo.
    const order = !error && typeof id === "number" ? orderCode(id) : fallbackOrderNumber();
    // Formato de WhatsApp: *negrita* y _cursiva_.
    const message = [
      `*NUEVO PEDIDO KRAZE #${order}*`,
      "",
      `_Cliente: ${get("nombre")} ${get("apellido")}_`,
      `_Teléfono: ${get("telefono")}_`,
      `_Método de Pago: ${method}_`,
      `_Dirección: ${get("direccion")}${get("referencia") ? ` (${get("referencia")})` : ""}_`,
      `_Ubicación: ${get("distrito")}, ${get("provincia")}, ${department}_`,
      rule,
      ...lines.map((l) => `• ${l.product.design} ${l.product.color} (Talla: ${l.size}) x ${l.qty}`),
      rule,
      ...(discount > 0 ? [`Promo ${promo.label}: -${soles(discount)}`] : []),
      `Envío: ${shipping ? (shipping.price === 0 ? "Gratis" : soles(shipping.price)) : "-"}`,
      `*TOTAL: ${soles(total)}*`,
      "",
      "Por favor, confírmeme mi pedido.",
    ].join("\n");
    if (tab) tab.location.href = whatsappWith(message);
    else window.location.assign(whatsappWith(message));
    track("purchase", {
      transaction_id: order,
      currency: "PEN",
      value: total,
      shipping: shipping?.price ?? 0,
      coupon: discount > 0 ? promo.label : undefined,
      payment_type: method,
      items: lines.map((l) => gaItem(l.product, l.size, l.qty)),
    });
    setBusy(false);
    clear();
    setSent(order);
  };

  return (
    <form onSubmit={onSubmit} className="grid items-start gap-6 lg:grid-cols-[784fr_512fr]">
      {/* Datos */}
      <div className="flex flex-col gap-12 rounded-[4.8px] bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
        <Step n={1} title="Información de contacto">
          {!session && (
            <p className="-mt-2 rounded border border-rule bg-sheet px-4 py-3 text-[13.125px] text-panel">
              <Link href="/cuenta/ingresar" className="font-bold underline underline-offset-2">
                Inicia sesión
              </Link>{" "}
              o{" "}
              <Link href="/cuenta/registro" className="font-bold underline underline-offset-2">
                crea una cuenta
              </Link>{" "}
              para seguir el estado de tu pedido desde Mi cuenta.
            </p>
          )}
          <Field label="Correo Electrónico" name="email" type="email" autoComplete="email" required defaultValue={session?.user.email ?? ""} key={session?.user.email ?? "anon"} />
          <label className="flex items-center gap-2 text-[13.125px] text-gray">
            <input type="checkbox" name="novedades" defaultChecked className="size-4 accent-[#0d6efd]" />
            Enviarme novedades y ofertas por correo electrónico
          </label>
        </Step>

        <Step n={2} title="Dirección de envío">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre" name="nombre" autoComplete="given-name" required defaultValue={firstName} key={`n-${firstName}`} />
            <Field label="Apellido" name="apellido" autoComplete="family-name" required defaultValue={rest.join(" ")} key={`a-${rest.join(" ")}`} />
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
            {payments.filter((p) => !("onlyUcayali" in p) || department === "Ucayali").map((p) => (
              <label
                key={p.id}
                className={`flex cursor-pointer flex-col gap-2 border-l-[3px] p-6 transition-colors ${
                  activePayment === p.id ? "border-black bg-sheet" : "border-transparent bg-white outline outline-1 outline-rule"
                }`}
              >
                <span className="flex items-center gap-2 font-bold">
                  <input type="radio" name="pago" value={p.id} checked={activePayment === p.id} onChange={() => setPayment(p.id)} className="size-4 accent-[#0d6efd]" />
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
            {discount > 0 && (
              <div className="flex justify-between leading-[23px]">
                <dt className="text-gray">Promo {promo.label}</dt>
                <dd className="font-bold text-success">− {soles(discount)}</dd>
              </div>
            )}
            <div className="flex items-center justify-between gap-4 leading-[23px]">
              <dt className="text-gray">Envío</dt>
              <dd className={`text-right text-[13.125px] font-bold ${shipping ? "" : "text-success"}`}>{shipping ? (shipping.price === 0 ? shipping.label : `${soles(shipping.price)} · ${shipping.label}`) : "Elige tu departamento"}</dd>
            </div>
          </dl>
          <div className="flex items-center justify-between py-5">
            <span className="condensed text-base font-bold">Total a pagar</span>
            <span className="condensed text-2xl leading-[29px] font-bold">{soles(total)}</span>
          </div>
          <button
            type="submit"
            disabled={busy}
            className="condensed mt-4 flex h-[74px] w-full items-center justify-center gap-2 border border-panel bg-panel text-base font-bold text-white shadow-[0_2px_4px_rgba(0,0,0,0.075)] transition-colors hover:bg-black disabled:cursor-wait disabled:opacity-70"
          >
            {busy ? "Registrando pedido…" : <>Finalizar mi compra <span aria-hidden="true">→</span></>}
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
