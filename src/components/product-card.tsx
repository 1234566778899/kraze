import Image from "next/image";
import Link from "next/link";
import { isSoldOut, sizes, type Product } from "@/lib/products";
import { HeartIcon, PlusIcon } from "./icons";

export const formatSoles = (n: number) => `S/ ${n.toFixed(2)}`;

export function ProductCard({ product, sizesAttr = "(max-width: 768px) 50vw, 33vw" }: { product: Product; sizesAttr?: string }) {
  const soldOut = isSoldOut(product);
  const [first, second] = product.images;
  const href = `/producto/${product.slug}`;

  return (
    <article className="group flex flex-col items-center gap-4 text-center">
      <Link href={href} className="relative block aspect-[4/5] w-full overflow-hidden rounded-xl bg-white">
        <Image
          src={first}
          alt={`${product.name} — ${product.color}`}
          fill
          sizes={sizesAttr}
          className={`object-cover transition duration-700 ${second ? "group-hover:opacity-0" : "group-hover:scale-[1.04]"} ${soldOut ? "grayscale" : ""}`}
        />
        {second && (
          <Image src={second} alt="" fill sizes={sizesAttr} className="object-cover opacity-0 transition duration-700 group-hover:opacity-100" />
        )}
        {product.badge && (
          <span className={`tech absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] ${soldOut ? "bg-ink/80 text-snow" : "bg-ink text-snow"}`}>
            {product.badge.label}
          </span>
        )}
        <span className="absolute top-3 right-3 grid size-8 place-items-center rounded-full bg-white/70 text-ink backdrop-blur" aria-hidden="true">
          <HeartIcon className="size-4" />
        </span>
      </Link>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold tracking-wide uppercase">
          <Link href={href}>{product.design}</Link>
        </h3>
        <p className="text-xs text-mute">{product.color}</p>
        <p className={`text-sm ${soldOut ? "text-mute line-through" : ""}`}>{formatSoles(product.price)}</p>
        <p className="tech text-[10px] text-mute">{soldOut ? "Agotado" : sizes.join(" · ")}</p>
      </div>

      <Link
        href={href}
        className={`caps inline-flex h-10 w-full max-w-[230px] items-center justify-center gap-2 border text-[11px] transition-colors ${
          soldOut ? "border-line text-mute" : "border-snow/60 hover:bg-snow hover:text-ink"
        }`}
      >
        {soldOut ? "Ver pieza" : "Añadir pieza"} {!soldOut && <PlusIcon className="size-3" />}
      </Link>
    </article>
  );
}
