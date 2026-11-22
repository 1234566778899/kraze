import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";

export const metadata: Metadata = {
  title: "Cambios y devoluciones",
  description: "Cambia la talla de tu polo KRAZE dentro de los 7 días. Conoce las condiciones de cambios, devoluciones y garantía por productos defectuosos.",
  alternates: { canonical: "/cambios-y-devoluciones" },
};

export default function ReturnsPage() {
  return (
    <ContentPage
      kicker="Soporte"
      title="Cambios y devoluciones"
      intro="¿No te quedó la talla? Tienes 7 días para cambiarla. Queremos que tu KRAZE te quede perfecto."
      updated="noviembre de 2026"
    >
      <h2>Cambio de talla</h2>
      <ul>
        <li>Tienes 7 días calendario desde que recibes tu pedido.</li>
        <li>La prenda debe estar sin uso, sin lavar, sin olores y con su etiqueta.</li>
        <li>Cambiamos por otra talla del mismo diseño o por otro diseño del mismo precio, según disponibilidad.</li>
        <li>En Pucallpa el cambio es gratis. En provincia, el costo del envío de ida y vuelta lo asume el cliente.</li>
      </ul>

      <h2>Productos con fallas</h2>
      <p>
        Si tu polo llega con una falla de fabricación o un estampado dañado, escríbenos dentro de las 48 horas de recibirlo con fotos del
        problema y tu número de pedido. Lo cambiamos sin costo o, si ya no hay stock, te devolvemos el dinero, conforme al Código de Protección y
        Defensa del Consumidor (Ley 29571).
      </p>

      <h2>Devoluciones de dinero</h2>
      <p>
        Por tratarse de ediciones limitadas, no hacemos devoluciones de dinero por cambio de opinión; ofrecemos el cambio de talla o de diseño.
        La devolución procede cuando el producto tiene fallas y no podemos reponerlo, o cuando no pudimos entregar tu pedido. Se realiza por el
        mismo medio de pago en un plazo de hasta 7 días hábiles.
      </p>

      <h2>Cómo solicitar un cambio</h2>
      <ol>
        <li>Escríbenos por WhatsApp con tu número de pedido y la talla o diseño que quieres.</li>
        <li>Te confirmamos la disponibilidad y te indicamos dónde enviar o entregar la prenda.</li>
        <li>Revisamos la prenda y te enviamos el cambio.</li>
      </ol>
      <p>
        Si tienes un reclamo, también puedes usar nuestro <Link href="/reclamaciones">Libro de Reclamaciones</Link>.
      </p>
    </ContentPage>
  );
}
