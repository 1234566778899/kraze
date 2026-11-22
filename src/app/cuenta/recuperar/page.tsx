import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth-forms";

export const metadata: Metadata = { title: "Recuperar contraseña", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <main className="sheet-page bg-sheet">
      <div className="px-3 pt-14 pb-24">
        <ForgotPasswordForm />
      </div>
    </main>
  );
}
