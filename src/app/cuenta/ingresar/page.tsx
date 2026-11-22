import type { Metadata } from "next";
import { LoginForm } from "@/components/auth-forms";

export const metadata: Metadata = { title: "Iniciar sesión", robots: { index: false, follow: true } };

export default function LoginPage() {
  return (
    <main className="sheet-page bg-sheet">
      <div className="px-3 pt-14 pb-24">
        <LoginForm />
      </div>
    </main>
  );
}
