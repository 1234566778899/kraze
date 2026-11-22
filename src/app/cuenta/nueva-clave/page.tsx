import type { Metadata } from "next";
import { NewPasswordForm } from "@/components/auth-forms";

export const metadata: Metadata = { title: "Nueva contraseña", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <main className="sheet-page bg-sheet">
      <div className="px-3 pt-14 pb-24">
        <NewPasswordForm />
      </div>
    </main>
  );
}
