import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escríbenos por WhatsApp, Instagram o TikTok. KRAZE, polos boxy fit hechos en Pucallpa con envíos a todo el Perú.",
  alternates: { canonical: "/contacto" },
};

const channels = [
  { name: "WhatsApp", detail: "La forma más rápida: pedidos, pagos, tallas y cambios.", href: site.whatsapp, cta: "Escribir por WhatsApp" },
  { name: "Instagram", detail: `${site.instagramHandle} · drops, fotos de la comunidad y mensajes.`, href: site.instagram, cta: "Ver Instagram" },
  { name: "TikTok", detail: `${site.tiktokHandle} · videos de cada lanzamiento.`, href: site.tiktok, cta: "Ver TikTok" },
  { name: "Correo", detail: site.legal.email, href: `mailto:${site.legal.email}`, cta: "Enviar correo" },
];

export default function ContactPage() {
  return (
    <ContentPage kicker="Soporte" title="Contacto" intro="Estamos en Pucallpa, Ucayali. Respondemos todos los días por WhatsApp.">
      <div className="not-prose grid gap-4 sm:grid-cols-2">
        {channels.map((c) => (
          <a
            key={c.name}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="flex flex-col gap-2 rounded-[4.8px] border border-rule p-5 transition-colors hover:border-panel"
          >
            <span className="condensed text-2xl font-bold text-panel">{c.name}</span>
            <span className="text-[14px] text-gray">{c.detail}</span>
            <span className="mt-2 text-[13px] font-bold text-panel underline underline-offset-2">{c.cta}</span>
          </a>
        ))}
      </div>
      <h2>¿Dónde estamos?</h2>
      <p>
        KRAZE nace en Pucallpa. Hacemos delivery gratis en toda la ciudad y envíos a Huánuco, Lima y todo el Perú. Revisa los{" "}
        <Link href="/envios">tiempos y costos de envío</Link> o las <Link href="/preguntas-frecuentes">preguntas frecuentes</Link>.
      </p>
    </ContentPage>
  );
}
