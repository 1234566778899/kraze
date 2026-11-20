import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { HeartIcon, PlusIcon } from "./icons";

/** Tarjeta de "También te puede gustar": foto 3:4 (306×408), nombre 13.6px y precio 17.6px. */
export function RelatedCard({ product }: { product: Product }) {
  const href = `/producto/${product.slug}`;
  return (
    <article className="group flex flex-col items-center text-center">
      <Link href={href} className="relative block aspect-[3/4] w-full overflow-hidden bg-studio">
        <Image src={product.images[0]} alt={`${product.name} — ${product.color}`} fill sizes="(max-width: 768px) 50vw, 306px" className="object-cover transition duration-500 group-hover:scale-[1.03]" />
        <span className="absolute top-2.5 right-2.5 text-panel" aria-hidden="true">
          <HeartIcon className="size-4.5" />
        </span>
      </Link>
      <h3 className="condensed mt-4 text-[13.6px] leading-5 font-normal tracking-[0.5px]!">
        <Link href={href}>{product.design}</Link>
      </h3>
      <p className="condensed mt-1 text-[17.6px] leading-[26px] font-normal tracking-[0.5px]!">S/ {product.price.toFixed(2)}</p>
      <Link
        href={href}
        className="condensed mt-3 flex h-[35px] items-center gap-2 bg-black px-6 text-[10px] font-bold tracking-[2px]! text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
      >
        Añadir <PlusIcon className="size-3" />
      </Link>
    </article>
  );
}
