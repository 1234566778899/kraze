import Link from "next/link";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./whatsapp-button";

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-4.5" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="size-8" aria-hidden="true">
    <rect x="4" y="3" width="16" height="18" rx="1.5" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);

const shop = [
  ["Novedades", "/#drop"],
  ["Colecciones", "/#lookbook"],
  ["Ver todo", "/tienda"],
];
const support = [
  ["Envíos", "#"],
  ["Devoluciones", "#"],
  ["Contáctanos", site.whatsapp],
];

// Medidas de referencia: padding 48px, título 32px, encabezados 13.125px con espaciado 5px, enlaces 13.125px.
const head = "font-[family-name:var(--font-condensed)] text-[13.125px] font-extrabold tracking-[5px] uppercase";
const link = "text-[13.125px] tracking-[0.5px] text-white/50 uppercase transition-colors hover:text-white";

export function Footer() {
  return (
    <footer className="border-t border-gray bg-black font-[family-name:var(--font-inter)] text-[15px] tracking-[0.5px] text-white">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-3 pt-12 pb-12 md:grid-cols-2 lg:grid-cols-[448fr_224fr_224fr_400fr] lg:gap-0">
        <div className="flex flex-col gap-4 lg:pr-12">
          <p className="condensed text-[32px] leading-[38px] font-extrabold">KRAZE - Streetwear en Perú</p>
          <p className="text-[13.125px] text-white/50">Hecho en Pucallpa. Boxy fit en ediciones limitadas que no se repiten.</p>
          <div className="flex gap-3 text-white/60">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
              <InstagramIcon />
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-white">
              <WhatsAppIcon className="size-4.5" />
            </a>
          </div>
        </div>

        <FooterCol title="Tienda" links={shop} />

        <div className="flex flex-col gap-6 lg:pr-6">
          <FooterCol title="Soporte" links={support} />
          <hr className="border-white/40" />
          <Link href="/reclamaciones" className="flex w-32 items-center gap-2 rounded-sm bg-white px-2 py-1.5 text-black">
            <BookIcon />
            <span className="text-[8px] leading-tight font-bold tracking-normal uppercase">
              Libro de
              <br />
              reclamaciones
            </span>
          </Link>
        </div>

        <form className="flex flex-col gap-4" action="#">
          <p className={head}>Boletín</p>
          <p className="text-[13.125px] text-white/50 uppercase">Únete al círculo para drops exclusivos.</p>
          <label htmlFor="newsletter" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="newsletter"
            type="email"
            placeholder="CORREO ELECTRÓNICO"
            className="h-[43px] border-b border-white/50 bg-transparent text-[15px] placeholder:text-white/50 focus:border-white focus:outline-none"
          />
          <button type="button" className="self-start text-base font-black tracking-[5px] uppercase">
            Unirse →
          </button>
        </form>
      </div>

      <div className="mx-auto flex max-w-[1320px] flex-col gap-3 px-3 pb-12 md:flex-row md:items-center md:justify-between">
        <div className="w-full border-t border-white/10 pt-8 md:flex md:items-center md:justify-between">
          <p className="text-[10.4px] tracking-[5px] text-white/50 uppercase">© 2026 KRAZE Studios — Pucallpa, Perú. Todos los derechos reservados.</p>
          <p className="mt-3 text-[10.4px] tracking-[2px] text-white/50 uppercase md:mt-0">Yape · Plin · Visa · Mastercard</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[][] }) {
  return (
    <div className="flex flex-col gap-5">
      <p className={head}>{title}</p>
      <ul className="flex flex-col gap-1.5">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link href={href} className={link}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
