import Image from "next/image";
import Link from "next/link";
import { isSoldOut, type Product } from "@/lib/products";
import { HeartIcon, PlusIcon } from "./icons";

/**
 * Tarjeta de producto de la colección: foto 4:5 del frente sobre fondo blanco que, al pasar el mouse,
 * cambia con un fundido a la foto de la espalda.
 */
export function RelatedCard({ product }: { product: Product }) {
  const href = `/producto/${product.slug}`;
  const soldOut = isSoldOut(product);
  const [front, back] = product.images;
  return (
    <article className="group flex flex-col items-center text-center">
      <Link href={href} className="relative block aspect-[4/5] w-full overflow-hidden bg-white">
        <Image
          src={front}
          alt={`${product.name} ${product.color}, vista de frente`}
          fill
          sizes="(max-width: 768px) 50vw, 306px"
          className={`object-cover transition-opacity duration-500 ease-out ${back ? "group-hover:opacity-0 group-focus-visible:opacity-0" : ""} ${soldOut ? "opacity-60 grayscale" : ""}`}
        />
        {back && (
          <Image
            src={back}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 306px"
            className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        )}
        {product.badge && (
          <span className={`condensed absolute top-2.5 left-2.5 px-2 py-1 text-[10px] font-bold tracking-[1px]! text-white ${soldOut ? "bg-gray" : "bg-black"}`}>
            {product.badge.label}
          </span>
        )}
        <span className="absolute top-2.5 right-2.5 text-panel" aria-hidden="true">
          <HeartIcon className="size-4.5" />
        </span>
      </Link>
      <h3 className="condensed mt-4 text-[13.6px] leading-5 font-normal tracking-[0.5px]!">
        <Link href={href}>{product.design}</Link>
      </h3>
      <p className="text-[12px] text-gray">{product.color}</p>
      <p className={`condensed mt-1 text-[17.6px] leading-[26px] font-normal tracking-[0.5px]! ${soldOut ? "text-gray line-through" : ""}`}>
        S/ {product.price.toFixed(2)}
      </p>
      <Link
        href={href}
        className="condensed mt-3 flex h-[35px] items-center gap-2 bg-black px-6 text-[10px] font-bold tracking-[2px]! text-white opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
      >
        {soldOut ? "Ver pieza" : "Añadir"} {!soldOut && <PlusIcon className="size-3" />}
      </Link>
    </article>
  );
}
