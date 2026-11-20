import Link from "next/link";
import { site } from "@/lib/site";
import { Benefits } from "./benefits";

const columns = [
  { title: "Tienda", links: [["Nuevo drop", "/#drop"], ["Colecciones", "/#colecciones"], ["Polos boxy", "/#drop"], ["Guía de tallas", "/#boxy-fit"]] },
  { title: "Ayuda", links: [["Envíos y entregas", "#"], ["Cambios y devoluciones", "#"], ["Preguntas frecuentes", "#"], ["Libro de reclamaciones", "#"]] },
  { title: "KRAZE", links: [["Nosotros", "#"], ["Comunidad", "/#comunidad"], [`Instagram ${site.instagramHandle}`, site.instagram], ["WhatsApp", site.whatsapp]] },
];

const payments = ["Yape", "Plin", "Visa", "Mastercard", "PagoEfectivo"];

export function Footer() {
  return (
    <>
      <Benefits />
      <footer className="bg-ink px-4 pt-16 pb-8 text-cream md:px-12 md:pt-18">
        <div className="mx-auto flex max-w-[1344px] flex-col gap-14">
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            <form className="flex max-w-md flex-col gap-4" action="#">
              <p className="label text-fire">Únete a la comunidad</p>
              <p className="text-2xl font-medium">
                Entérate primero de cada drop.
                <br />
                Sin spam, solo lanzamientos.
              </p>
              <div className="flex border border-[#3a3a3a]">
                <label htmlFor="newsletter" className="sr-only">
                  Tu número de WhatsApp
                </label>
                <input
                  id="newsletter"
                  type="tel"
                  placeholder="Tu número de WhatsApp"
                  className="h-13 min-w-0 flex-1 bg-transparent px-4 text-sm placeholder:text-[#77726b] focus:outline-none"
                />
                <button type="button" className="label h-13 bg-fire px-5 text-[13px] text-ink">
                  Suscribirme
                </button>
              </div>
            </form>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-16">
              {columns.map((col) => (
                <div key={col.title} className="flex flex-col gap-3.5">
                  <p className="label text-[#77726b]">{col.title}</p>
                  {col.links.map(([label, href]) => (
                    <Link key={label} href={href} className="text-sm transition-colors hover:text-fire">
                      {label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <p className="display text-center text-[26vw] leading-none select-none lg:text-[300px]" aria-hidden="true">
            KRAZE®
          </p>

          <div className="flex flex-col gap-4 border-t border-[#2a2a2a] pt-6 md:flex-row md:items-center md:justify-between">
            <p className="font-mono text-xs text-[#77726b]">© 2026 KRAZE · Pucallpa, Perú</p>
            <ul className="flex flex-wrap gap-2" aria-label="Medios de pago">
              {payments.map((p) => (
                <li key={p} className="label border border-[#3a3a3a] px-2.5 py-1.5 text-[10px] text-[#b5afa6]">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
