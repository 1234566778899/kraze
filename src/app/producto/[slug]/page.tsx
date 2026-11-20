import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/header";
import { ProductBuyBox } from "@/components/product-buy-box";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { SectionHeading, Tag } from "@/components/ui";
import { formatPrice, getProduct, measurements, products } from "@/lib/products";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/producto/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: `${product.name} — ${product.color}`, description: product.description };
}

export default function ProductPage({ params }: PageProps<"/producto/[slug]">) {
  return (
    <>
      <Header />
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </>
  );
}

function ProductSkeleton() {
  return (
    <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 md:px-12 lg:grid-cols-[minmax(0,1fr)_440px]" aria-busy="true">
      <div className="aspect-[3/4] animate-pulse bg-cream" />
      <div className="flex flex-col gap-5">
        <div className="h-16 w-3/4 animate-pulse bg-cream" />
        <div className="h-8 w-1/3 animate-pulse bg-cream" />
        <div className="h-40 animate-pulse bg-cream" />
      </div>
    </div>
  );
}

async function ProductContent({ params }: { params: PageProps<"/producto/[slug]">["params"] }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug && p.stock.M + p.stock.L + p.stock.S > 0).slice(0, 4);

  return (
    <>
      <main>
        <nav aria-label="Ruta" className="mx-auto max-w-[1440px] px-4 py-5 md:px-12">
          <ol className="flex flex-wrap gap-2.5 font-mono text-xs text-stone">
            <li>
              <Link href="/" className="hover:text-ink">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#drop" className="hover:text-ink">
                {product.collection}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="font-bold text-ink" aria-current="page">
              {product.name} — {product.color}
            </li>
          </ol>
        </nav>

        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 pb-20 md:px-12 md:pb-24 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery product={product} />
          </div>

          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap gap-2">
                <Tag>{product.collection}</Tag>
                <Tag tone="outline">Edición limitada</Tag>
              </div>
              <h1 className="display text-5xl md:text-[64px]">
                Polo boxy
                <br />“{product.design}”
              </h1>
              <p className="text-sm font-medium text-stone">Color: {product.color}</p>
              <div className="flex flex-wrap items-baseline gap-3.5">
                <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
                <p className="text-[13px] text-stone">Promo: {site.promo}</p>
              </div>
              <p className="max-w-md leading-relaxed">{product.description}</p>
            </div>

            <ProductBuyBox product={product} />

            <div className="border-b border-ink">
              <details id="medidas" open className="group scroll-mt-28 border-t border-ink">
                <summary className="label flex cursor-pointer list-none items-center justify-between py-4.5 text-[13px]">
                  Medidas de la prenda (cm)
                  <span className="text-lg group-open:rotate-45 transition-transform">+</span>
                </summary>
                <table className="mb-4 w-full text-left text-xs">
                  <thead className="bg-ink text-cream">
                    <tr>
                      {["Talla", "Largo", "Pecho", "Hombro", "Manga"].map((h) => (
                        <th key={h} scope="col" className="label px-3 py-2.5 text-[11px]">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {measurements.map((m) => (
                      <tr key={m.size} className="border-b border-line odd:bg-transparent even:bg-cream">
                        <th scope="row" className="px-3 py-2.5 font-bold">
                          {m.size}
                        </th>
                        <td className="px-3 py-2.5">{m.length}</td>
                        <td className="px-3 py-2.5">{m.chest}</td>
                        <td className="px-3 py-2.5">{m.shoulder}</td>
                        <td className="px-3 py-2.5">{m.sleeve}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mb-4 font-mono text-[11px] text-stone">Medidas de la prenda en plano. Pecho = ancho de axila a axila.</p>
              </details>
              {[
                ["Composición", "Algodón 100% de gramaje pesado. Estampado/bordado de alta duración."],
                ["Cuidado de la prenda", "Lavar al revés con agua fría. No usar secadora. Planchar por el revés, sin pasar sobre el estampado."],
                ["Cambios y devoluciones", "Tienes 7 días para cambiar tu talla. La prenda debe estar sin uso y con etiqueta. Coordina por WhatsApp."],
              ].map(([title, body]) => (
                <details key={title} className="group border-t border-ink">
                  <summary className="label flex cursor-pointer list-none items-center justify-between py-4.5 text-[13px]">
                    {title}
                    <span className="text-lg transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed">{body}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        <section className="bg-cream px-4 pt-20 pb-24 md:px-12">
          <div className="mx-auto flex max-w-[1344px] flex-col gap-10">
            <SectionHeading
              eyebrow="Combínalo"
              title="Completa el look"
              aside={
                <Link href="/#drop" className="text-sm font-medium underline">
                  Ver todo el drop →
                </Link>
              }
            />
            <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
