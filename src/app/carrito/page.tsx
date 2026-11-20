import type { Metadata } from "next";
import { CartView, PageTitle } from "@/components/cart-view";

export const metadata: Metadata = { title: "Tu cesta" };

export default function CartPage() {
  return (
    <main className="sheet-page bg-sheet">
      <div className="mx-auto max-w-[1320px] px-3 pt-11 pb-24">
        <PageTitle title="Tu cesta" subtitle="Gestiona tus prendas antes de finalizar la compra." />
        <div className="mt-[72px]">
          <CartView />
        </div>
      </div>
    </main>
  );
}
