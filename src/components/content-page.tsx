import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

/** Plantilla de las páginas informativas (envíos, cambios, FAQ, legales): fondo claro y texto legible. */
export function ContentPage({
  kicker,
  title,
  intro,
  updated,
  children,
  jsonLd,
}: {
  kicker: string;
  title: string;
  intro?: ReactNode;
  updated?: string;
  children: ReactNode;
  jsonLd?: object;
}) {
  return (
    <main className="sheet-page bg-white">
      {jsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      )}
      <section className="bg-panel pt-10 pb-12 text-white">
        <div className="mx-auto max-w-[860px] px-4">
          <nav aria-label="Ruta" className="text-[12px] tracking-[1px] text-white/50 uppercase">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>
            <span className="mx-2">/</span>
            <span>{title}</span>
          </nav>
          <p className="mt-6 font-[family-name:var(--font-condensed)] text-[13.125px] font-bold tracking-[5px] text-highlight uppercase">{kicker}</p>
          <h1 className="condensed mt-2 text-[clamp(2.25rem,7vw,3.5rem)] leading-[1.1] font-bold">{title}</h1>
          {intro && <div className="mt-4 max-w-[640px] text-[15px] leading-relaxed text-white/70">{intro}</div>}
        </div>
      </section>
      <div className="mx-auto max-w-[860px] px-4 pt-10 pb-20">
        <div className="prose-kraze">{children}</div>
        {updated && <p className="mt-12 text-[12px] text-gray">Última actualización: {updated}</p>}
        <div className="mt-12 flex flex-col gap-3 rounded-[4.8px] border border-rule bg-sheet p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[15px] font-bold text-panel">¿Tienes otra pregunta?</p>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="condensed grid h-12 place-items-center bg-panel px-8 font-bold tracking-[2px]! text-white transition-colors hover:bg-black"
          >
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}

/** Pregunta desplegable (también usada para generar el JSON-LD de FAQPage). */
export type Faq = { q: string; a: string };

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="not-prose flex flex-col">
      {items.map((f) => (
        <details key={f.q} className="group border-t border-rule last:border-b">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-bold text-panel">
            {f.q}
            <span className="text-xl transition-transform group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="pb-5 leading-relaxed text-panel/80">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export const faqJsonLd = (items: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
