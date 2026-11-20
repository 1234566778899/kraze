import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import type { Badge } from "@/lib/products";

const variants = {
  dark: "bg-ink text-cream hover:bg-coal",
  light: "bg-cream text-ink hover:bg-white",
  fire: "bg-fire text-ink hover:brightness-110",
  outline: "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-cream",
  outlineLight: "border-[1.5px] border-cream text-cream hover:bg-cream hover:text-ink",
} as const;

type Variant = keyof typeof variants;

const base =
  "inline-flex h-13 items-center justify-center gap-2.5 px-7 font-mono text-[13px] font-bold tracking-wider uppercase transition-colors";

export function ButtonLink({
  variant = "dark",
  arrow,
  className = "",
  children,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant; arrow?: boolean }) {
  return (
    <Link className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {arrow && <span aria-hidden="true">→</span>}
    </Link>
  );
}

export function Button({
  variant = "dark",
  arrow,
  className = "",
  children,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; arrow?: boolean }) {
  return (
    <button type="button" className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
      {arrow && <span aria-hidden="true">→</span>}
    </button>
  );
}

const tones: Record<Badge["tone"], string> = {
  fire: "bg-fire text-ink",
  ink: "bg-ink text-cream",
  muted: "bg-stone text-white",
};

export function Tag({ tone = "ink", children, className = "" }: { tone?: Badge["tone"] | "outline" | "outlineLight"; children: ReactNode; className?: string }) {
  const style =
    tone === "outline"
      ? "border border-ink text-ink"
      : tone === "outlineLight"
        ? "border border-cream text-cream"
        : tones[tone];
  return <span className={`label inline-block px-2.5 py-1.5 text-[10px] ${style} ${className}`}>{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  aside,
  invert,
}: {
  eyebrow: string;
  title: string;
  aside?: ReactNode;
  invert?: boolean;
}) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-2.5">
        <p className="label text-fire">{eyebrow}</p>
        <h2 className={`display text-6xl md:text-8xl ${invert ? "text-cream" : ""}`}>{title}</h2>
      </div>
      {aside}
    </div>
  );
}
