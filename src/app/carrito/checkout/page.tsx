import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout-view";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return (
    <main className="sheet-page bg-white">
      <div className="mx-auto max-w-[1320px] pt-5 pb-12 lg:px-0 px-3">
        <CheckoutView />
      </div>
    </main>
  );
}
