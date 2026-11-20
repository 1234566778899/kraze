"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { label: "Nuevo drop", href: "/#drop" },
  { label: "Colecciones", href: "/#colecciones" },
  { label: "Boxy fit", href: "/#boxy-fit" },
  { label: "Comunidad", href: "/#comunidad" },
];

type Props = { variant?: "overlay" | "solid" };

export function Header({ variant = "solid" }: Props) {
  const [open, setOpen] = useState(false);
  const overlay = variant === "overlay";
  const fg = overlay ? "text-cream" : "text-ink";

  return (
    <header
      className={`${overlay ? "absolute inset-x-0 top-0 z-30" : "sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur"} ${fg}`}
    >
      <div className="mx-auto grid h-16 max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center px-4 md:h-21 md:px-12">
        <nav className="hidden items-center gap-8 md:flex" aria-label="Principal">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="label transition-opacity hover:opacity-60">
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="label justify-self-start md:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Cerrar" : "Menú"}
        </button>

        <Link href="/" className="display text-3xl tracking-wide md:text-[38px]" aria-label="KRAZE, inicio">
          KRAZE®
        </Link>

        <div className="flex items-center justify-end gap-5 md:gap-7">
          <button type="button" className="label hidden transition-opacity hover:opacity-60 md:inline">
            Buscar
          </button>
          <button type="button" className="label hidden transition-opacity hover:opacity-60 md:inline">
            Cuenta
          </button>
          <button type="button" className="label flex items-center gap-2 transition-opacity hover:opacity-60">
            <span className="hidden sm:inline">Carrito</span>
            <span className="sm:hidden">Bolsa</span>
            <span className="grid size-5.5 place-items-center rounded-full bg-fire font-mono text-[11px] font-bold text-ink">
              0
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" className="border-t border-line bg-paper px-4 py-4 text-ink md:hidden" aria-label="Menú móvil">
          <ul className="flex flex-col gap-4">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="display text-3xl" onClick={() => setOpen(false)}>
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
