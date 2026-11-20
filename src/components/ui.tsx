import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowIcon } from "./icons";
import { ScrambleText } from "./scramble-text";

const variants = {
  solid: "bg-snow text-ink hover:bg-white",
  outline: "border border-snow/70 text-snow hover:bg-snow hover:text-ink",
  ghost: "text-snow underline-offset-4 hover:underline",
} as const;

type Variant = keyof typeof variants;

const base = "caps inline-flex h-12 items-center justify-center gap-2.5 px-7 transition-colors";

export function ButtonLink({
  variant = "solid",
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "solid",
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return (
    <button type="button" className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-40 ${className}`} {...props}>
      {children}
    </button>
  );
}

/** Encabezado de sección: etiqueta técnica + título ancho + enlace opcional. */
export function SectionHeading({
  label,
  index,
  title,
  link,
}: {
  label: string;
  index?: string;
  title: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-3">
        <p className="tech flex flex-wrap gap-x-6 gap-y-1 text-mute">
          <span>[ {label} ]</span>
          {index && <span>[ {index} ]</span>}
        </p>
        <h2 className="display text-5xl md:text-7xl">
          <ScrambleText text={title} />
        </h2>
      </div>
      {link && (
        <Link href={link.href} className="tech inline-flex items-center gap-2 self-start border-b border-snow/40 pb-1 text-snow transition-colors hover:border-snow md:self-auto">
          {link.label} <ArrowIcon className="size-3" />
        </Link>
      )}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1140px] px-5 ${className}`}>{children}</div>;
}
