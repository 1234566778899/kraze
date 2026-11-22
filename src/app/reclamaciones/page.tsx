import type { Metadata } from "next";
import { ComplaintForm } from "@/components/complaint-form";

export const metadata: Metadata = {
  title: "Libro de Reclamaciones",
  description: "Hoja de reclamación virtual de KRAZE conforme al Código de Protección y Defensa del Consumidor.",
  alternates: { canonical: "/reclamaciones" },
};

export default function ComplaintsPage() {
  return (
    <main className="sheet-page bg-white">
      <div className="mx-auto max-w-[800px] px-3 pt-[34px] pb-[72px]">
        <h1 className="condensed text-center text-[56px] leading-[67px] font-bold">Libro de Reclamaciones</h1>
        <p className="mt-0 text-center text-[13.125px] tracking-[5px] text-gray uppercase">Hoja de reclamación virtual</p>
        <div className="mt-12">
          <ComplaintForm />
        </div>
      </div>
    </main>
  );
}
