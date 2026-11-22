import type { Metadata } from "next";
import { ShopView } from "@/components/shop-view";

export const metadata: Metadata = {
  title: "Polos boxy fit — Tienda",
  description:
    "Compra polos boxy fit KRAZE: Adventures, Kraze Originals, Sports Kraze, Kraze Studios y más. S/ 45 c/u o 2 x S/ 80. Tallas S, M y L con envío a todo el Perú.",
  alternates: { canonical: "/tienda" },
  openGraph: { url: "/tienda" },
};

export default function ShopPage() {
  return (
    <main className="sheet-page bg-white">
      {/* Cabecera: fondo #212529, padding inferior 60px, título 48px con "Tienda" en contorno */}
      <section className="relative overflow-hidden bg-panel pt-10 pb-[60px] text-white">
        <p
          className="pointer-events-none absolute top-[-70px] right-0 font-[family-name:var(--font-inter)] text-[153.6px] leading-[230px] font-black tracking-[0.5px] whitespace-nowrap text-white/10 uppercase select-none"
          aria-hidden="true"
        >
          Kraze Store
        </p>
        <div className="relative mx-auto max-w-[1320px] px-3">
          <p className="font-[family-name:var(--font-condensed)] text-[13.125px] leading-5 font-bold tracking-[5px] text-highlight uppercase">Colección completa // 2026</p>
          <h1 className="condensed mt-2 text-5xl leading-[58px] font-bold">
            Nuestra <span className="text-transparent [-webkit-text-stroke:1.5px_white]">Tienda</span>
          </h1>
          <p className="mt-2 max-w-[500px] text-[13.125px] leading-5 text-white/50">
            Explora nuestros polos boxy fit en ediciones limitadas. Algodón jersey 20/1, S/ 45 c/u o 2 x S/ 80.
          </p>
        </div>
      </section>
      <ShopView />
    </main>
  );
}
