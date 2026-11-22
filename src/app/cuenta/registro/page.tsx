import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth-forms";

export const metadata: Metadata = { title: "Crear cuenta", robots: { index: false, follow: true } };

export default function RegisterPage() {
  return (
    <main className="sheet-page bg-sheet">
      <div className="px-3 pt-14 pb-24">
        <RegisterForm />
      </div>
    </main>
  );
}
