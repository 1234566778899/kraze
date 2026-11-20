import Image from "next/image";
import Link from "next/link";
import { formatPrice, isSoldOut, sizes, type Product } from "@/lib/products";
import { Tag } from "./ui";

export function ProductCard({ product, sizesAttr = "(max-width: 768px) 50vw, 25vw" }: { product: Product; sizesAttr?: string }) {
  const soldOut = isSoldOut(product);
  const [first, second] = product.images;

  return (
    <Link href={`/producto/${product.slug}`} className="group flex flex-col gap-3.5">
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        <Image
          src={first}
          alt={`${product.name} — ${product.color}`}
          fill
          sizes={sizesAttr}
          className={`object-cover transition duration-500 group-hover:scale-[1.03] ${second ? "group-hover:opacity-0" : ""} ${soldOut ? "opacity-60 grayscale" : ""}`}
        />
        {second && (
          <Image
            src={second}
            alt=""
            fill
            sizes={sizesAttr}
            className="object-cover opacity-0 transition duration-500 group-hover:opacity-100"
          />
        )}
        {product.badge && (
          <Tag tone={product.badge.tone} className="absolute top-3.5 left-3.5">
            {product.badge.label}
          </Tag>
        )}
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className={`text-[15px] leading-snug font-medium ${soldOut ? "text-stone" : ""}`}>
            {product.name} <span className="text-stone">— {product.color}</span>
          </h3>
          <p className={`text-[15px] font-bold whitespace-nowrap ${soldOut ? "text-stone line-through" : ""}`}>{formatPrice(product.price)}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full border border-line" style={{ background: product.colorHex }} aria-hidden="true" />
          <span className="font-mono text-[11px] tracking-wider text-stone">
            {soldOut ? "AGOTADO" : sizes.join(" · ")}
          </span>
        </div>
      </div>
    </Link>
  );
}
