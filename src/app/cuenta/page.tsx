import type { Metadata } from "next";
import { AccountView } from "@/components/account-view";

export const metadata: Metadata = { title: "Mi cuenta", robots: { index: false, follow: false } };

export default function AccountPage() {
  return (
    <main className="sheet-page bg-sheet">
      <div className="mx-auto max-w-[1320px] px-3 pt-11 pb-24">
        <AccountView />
      </div>
    </main>
  );
}
