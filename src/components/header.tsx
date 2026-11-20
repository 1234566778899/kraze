"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";

// Medidas de referencia (desktop): alto 61px (10px + 40px + 10px + borde 1px), padding lateral 24px,
// menú Inter 12.8px/700 con 2px de espaciado y 30px entre enlaces, íconos de 19px con 20px entre sí,
// contadores blancos de 16px con número de 9px.

const nav = [
  { label: "Ver todo", href: "/tienda" },
  { label: "Boxy fit", href: "/#boxy-fit" },
  { label: "Colecciones", href: "/#lookbook" },
];

// Íconos basados en Font Awesome Free 6 (https://fontawesome.com, licencia CC BY 4.0).
const icon = "h-[19px] w-auto";

const SearchIcon = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className={icon} aria-hidden="true">
    <path d="M416 208c0 45.9-14.9 88.3-40 122.7l126.6 126.7a32 32 0 0 1-45.3 45.3L330.7 376A207.2 207.2 0 0 1 208 416C93.1 416 0 322.9 0 208S93.1 0 208 0s208 93.1 208 208ZM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288Z" />
  </svg>
);

const UserIcon = () => (
  <svg viewBox="0 0 448 512" fill="currentColor" className={icon} aria-hidden="true">
    <path d="M304 128a80 80 0 1 0-160 0 80 80 0 1 0 160 0Zm-208 0a128 128 0 1 1 256 0 128 128 0 1 1-256 0ZM49.3 464h349.4c-8.9-63.3-63.3-112-129-112h-91.4c-65.7 0-120.1 48.7-129 112ZM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3Z" />
  </svg>
);

const HeartIcon = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className={icon} aria-hidden="true">
    <path d="m225.8 468.2-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3 4.2-4.8 8.7-9.2 13.5-13.3 3.7-3.2 7.5-6.2 11.5-9 32.1-22.6 72.4-31.7 111.8-24.2C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9ZM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9-34-6.5-69 5.4-92 31.2l-.1.1-.1.1-17.8 20c-.3.4-.7.7-1 1.1-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7Z" />
  </svg>
);

const BagIcon = () => (
  <svg viewBox="0 0 448 512" fill="currentColor" className={icon} aria-hidden="true">
    <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160v-48Zm-48 48H48c-26.5 0-48 21.5-48 48v208c0 53 43 96 96 96h256c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48h-64v-48C336 50.1 285.9 0 224 0S112 50.1 112 112v48Zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48Zm152 24a24 24 0 1 1 48 0 24 24 0 1 1-48 0Z" />
  </svg>
);

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // En el home el header flota transparente sobre el hero; en el resto es negro.
  const solid = !isHome || scrolled || open;

  return (
    <header
      className={`sticky top-0 z-40 border-b font-[family-name:var(--font-inter)] text-white transition-[background-color,box-shadow] duration-300 ${
        solid ? "border-white/20 bg-black shadow-[0_5px_25px_rgba(0,0,0,0.1)]" : "border-white/20 bg-transparent"
      }`}
    >
      <div className="grid h-[60px] grid-cols-[1fr_auto_1fr] items-center px-6 py-2.5">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="text-[12.8px] font-bold tracking-[2px] uppercase md:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Cerrar" : "Menú"}
          </button>
          <Logo className="hidden md:flex" />
        </div>

        <nav className="hidden items-center gap-[30px] md:flex" aria-label="Principal">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-[12.8px] leading-[15px] font-bold tracking-[2px] uppercase transition-opacity hover:opacity-60">
              {item.label}
            </Link>
          ))}
        </nav>
        <Logo className="md:hidden" />

        <div className="flex items-center justify-end gap-5">
          <button type="button" aria-label="Buscar" className="transition-opacity hover:opacity-60">
            <SearchIcon />
          </button>
          <button type="button" aria-label="Mi cuenta" className="hidden transition-opacity hover:opacity-60 sm:block">
            <UserIcon />
          </button>
          <button type="button" aria-label="Favoritos" className="relative hidden transition-opacity hover:opacity-60 sm:block">
            <HeartIcon />
            <Count n={0} className="-top-2 -right-2.5" />
          </button>
          <Link href="/carrito" aria-label={`Carrito, ${count} productos`} className="relative transition-opacity hover:opacity-60">
            <BagIcon />
            <Count n={count} className="-top-3 -right-2.5" />
          </Link>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" className="border-t border-white/20 bg-black px-6 py-6 md:hidden" aria-label="Menú móvil">
          <ul className="flex flex-col gap-5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-base font-bold tracking-[2px] uppercase" onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

/** Logotipo de texto en un área de 109×40 como el de referencia. */
function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="KRAZE, inicio" className={`h-10 w-[109px] items-center ${className}`}>
      <span className="font-[family-name:var(--font-archivo)] text-[22px] leading-none font-black tracking-[-0.5px] uppercase italic [font-stretch:115%]">
        Kraze
      </span>
      <sup className="ml-0.5 self-start pt-1.5 text-[8px] font-bold">®</sup>
    </Link>
  );
}

function Count({ n, className }: { n: number; className: string }) {
  return (
    <span className={`absolute grid size-4 place-items-center rounded-full bg-white text-[9px] leading-none font-black tracking-normal text-black ${className}`}>
      {n}
    </span>
  );
}
