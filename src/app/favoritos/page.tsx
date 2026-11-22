import type { Metadata } from "next";
import { PageTitle } from "@/components/cart-view";
import { FavoritesView } from "@/components/favorites-view";

export const metadata: Metadata = { title: "Mis favoritos", robots: { index: false, follow: false } };

export default function FavoritesPage() {
  return (
    <main className="sheet-page bg-sheet">
      <div className="mx-auto max-w-[1320px] px-3 pt-11 pb-24">
        <PageTitle title="Mis favoritos" subtitle="Los polos que guardaste en tu lista de deseos." />
        <div className="mt-[72px]">
          <FavoritesView />
        </div>
      </div>
    </main>
  );
}
