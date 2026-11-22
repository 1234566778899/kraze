import type { Metadata } from "next";
import { ContentPage, FaqList, faqJsonLd } from "@/components/content-page";
import { faqs } from "@/lib/faq";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Precios, tallas, delivery en Pucallpa, envíos a todo el Perú, pagos y cambios: resolvemos tus dudas sobre los polos boxy fit KRAZE.",
  alternates: { canonical: "/preguntas-frecuentes" },
};

export default function FaqPage() {
  return (
    <ContentPage kicker="Ayuda" title="Preguntas frecuentes" intro="Todo lo que necesitas saber antes de pedir tu KRAZE." jsonLd={faqJsonLd(faqs)}>
      <FaqList items={faqs} />
    </ContentPage>
  );
}
