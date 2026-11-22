"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { soles } from "@/lib/cart";
import { useAuth } from "@/lib/auth";
import { orderCode, supabase, type Order, type OrderStatus } from "@/lib/supabase";
import { whatsappWith } from "@/lib/site";

const steps: { id: OrderStatus; label: string; hint: string }[] = [
  { id: "pendiente", label: "Recibido", hint: "Esperando la confirmación del pago" },
  { id: "confirmado", label: "Confirmado", hint: "Pago confirmado, preparando tu pedido" },
  { id: "enviado", label: "Enviado", hint: "Tu pedido va en camino" },
  { id: "entregado", label: "Entregado", hint: "¡Disfruta tu KRAZE!" },
];

const dateFmt = new Intl.DateTimeFormat("es-PE", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

function Tracker({ status }: { status: OrderStatus }) {
  if (status === "cancelado") {
    return <p className="rounded border border-rule bg-sheet px-4 py-3 text-[13.125px] font-bold text-gray">Pedido cancelado</p>;
  }
  const current = steps.findIndex((s) => s.id === status);
  return (
    <div>
      <ol className="grid grid-cols-4 gap-1.5" aria-label="Estado del pedido">
        {steps.map((s, i) => (
          <li key={s.id} className="flex flex-col gap-2" aria-current={i === current ? "step" : undefined}>
            <span className={`h-1.5 rounded-full ${i <= current ? "bg-highlight" : "bg-rule"}`} />
            <span className={`text-[11px] font-bold uppercase sm:text-[12px] ${i <= current ? "text-panel" : "text-gray/70"}`}>{s.label}</span>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[13.125px] text-gray">{steps[current]?.hint}</p>
    </div>
  );
}

function OrderCard({ order }: { order: Order }) {
  const code = orderCode(order.id);
  return (
    <article className="rounded-[4.8px] bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.075)] sm:p-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="condensed text-2xl font-bold">Pedido #{code}</h3>
          <p className="text-[13.125px] text-gray">{dateFmt.format(new Date(order.created_at))}</p>
        </div>
        <p className="condensed text-2xl font-bold">{soles(Number(order.total))}</p>
      </header>

      <div className="mt-5">
        <Tracker status={order.status} />
      </div>

      <ul className="mt-6 flex flex-col gap-4 border-t border-rule pt-5">
        {order.items.map((it) => (
          <li key={`${it.slug}-${it.size}`} className="flex items-center gap-4">
            <span className="relative h-[75px] w-[60px] shrink-0 overflow-hidden rounded bg-white outline outline-1 outline-rule">
              {it.image && <Image src={it.image} alt="" fill sizes="60px" className="object-cover" />}
            </span>
            <span className="flex-1 text-[13.125px] leading-5">
              <Link href={`/producto/${it.slug}`} className="condensed font-bold hover:underline">
                {it.name}
              </Link>
              <span className="block text-gray">
                {it.color} · Talla {it.size} · x{it.qty}
              </span>
            </span>
            <span className="text-[13.125px] font-bold">{soles(Number(it.subtotal))}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-5 grid gap-1 border-t border-rule pt-4 text-[13.125px]">
        {Number(order.discount) > 0 && (
          <div className="flex justify-between">
            <dt className="text-gray">Promo</dt>
            <dd className="font-bold text-success">− {soles(Number(order.discount))}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt className="text-gray">Envío</dt>
          <dd className="font-bold">{soles(Number(order.shipping))}</dd>
        </div>
        <div className="flex justify-between gap-6">
          <dt className="text-gray">Entrega</dt>
          <dd className="text-right">
            {order.address}
            {order.reference ? ` (${order.reference})` : ""}, {order.district}, {order.province}, {order.department}
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray">Pago</dt>
          <dd>{order.payment_method}</dd>
        </div>
      </dl>

      <a
        href={whatsappWith(`Hola KRAZE, quiero consultar por mi pedido #${code}.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex text-[13.125px] font-bold text-panel underline underline-offset-2"
      >
        Consultar este pedido por WhatsApp
      </a>
    </article>
  );
}

export function AccountView() {
  const { ready, session, name, signOut } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (ready && !session) router.replace("/cuenta/ingresar");
  }, [ready, session, router]);

  const userId = session?.user.id;
  useEffect(() => {
    if (!userId) return;
    let alive = true;
    supabase
      .from("orders")
      .select("id, customer_name, phone, address, reference, district, province, department, payment_method, items, subtotal, discount, shipping, total, status, created_at")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!alive) return;
        if (error) setError(true);
        setOrders((data as Order[] | null) ?? []);
      });
    return () => {
      alive = false;
    };
  }, [userId]);

  if (!ready || !session) return <div className="h-[600px]" aria-busy="true" />;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[360fr_936fr]">
      <aside className="rounded-[4.8px] bg-panel p-6 text-white shadow-[0_16px_48px_rgba(0,0,0,0.176)]">
        <p className="text-[12px] font-bold tracking-[2px] text-white/50 uppercase">Mi cuenta</p>
        <p className="condensed mt-2 text-[32px] leading-9 font-bold">{name || "Hola"}</p>
        <p className="mt-1 text-[13.125px] break-all text-white/70">{session.user.email}</p>
        <div className="mt-6 flex flex-col gap-3">
          <Link href="/tienda" className="condensed grid h-12 place-items-center bg-highlight text-base font-bold tracking-[2px]! text-black">
            Seguir comprando
          </Link>
          <button
            type="button"
            onClick={async () => {
              await signOut();
              router.replace("/");
            }}
            className="condensed h-12 border border-white/40 text-base font-bold tracking-[2px]! transition-colors hover:bg-white hover:text-black"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      <section aria-labelledby="mis-pedidos">
        <h2 id="mis-pedidos" className="condensed border-l-[5px] border-highlight pl-4 text-[32px] leading-10 font-bold">
          Mis pedidos
        </h2>
        <div className="mt-6 flex flex-col gap-5">
          {orders === null && <div className="h-48 animate-pulse rounded-[4.8px] bg-white" aria-busy="true" />}
          {error && <p className="text-[#842029]">No pudimos cargar tus pedidos. Recarga la página.</p>}
          {orders?.length === 0 && !error && (
            <div className="flex flex-col items-start gap-4 rounded-[4.8px] bg-white p-6 shadow-[0_2px_4px_rgba(0,0,0,0.075)]">
              <p className="condensed text-2xl font-bold">Aún no tienes pedidos</p>
              <p className="text-gray">Cuando compres con tu sesión iniciada, aquí podrás seguir el estado de cada pedido.</p>
              <Link href="/tienda" className="condensed grid h-12 place-items-center bg-panel px-8 font-bold tracking-[2px]! text-white">
                Ver la colección
              </Link>
            </div>
          )}
          {orders?.map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
        </div>
      </section>
    </div>
  );
}
