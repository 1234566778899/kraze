import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { shippingRates } from "@/lib/site";

export const metadata: Metadata = {
  title: "Envíos y delivery",
  description:
    "Delivery gratis en Pucallpa en 24 horas con pago contra entrega. Envíos a Huánuco, Lima y todo el Perú por Olva y Shalom. Tiempos y costos de envío de KRAZE.",
  alternates: { canonical: "/envios" },
};

export default function ShippingPage() {
  return (
    <ContentPage
      kicker="Soporte"
      title="Envíos y delivery"
      intro="Delivery gratis en Pucallpa y envíos a todo el Perú. Despachamos tu pedido apenas lo confirmamos."
      updated="noviembre de 2026"
    >
      <h2>Tarifas y tiempos</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Destino</th>
            <th scope="col">Tiempo estimado</th>
            <th scope="col">Costo</th>
          </tr>
        </thead>
        <tbody>
          {shippingRates.map((r) => (
            <tr key={r.zone}>
              <td>{r.zone}</td>
              <td>{r.time}</td>
              <td className="font-bold">{r.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Los tiempos se cuentan en días hábiles desde que confirmamos tu pago (o tu pedido, si es contra entrega en Pucallpa).</p>

      <h2>Cómo funciona</h2>
      <ol>
        <li>Haces tu pedido en la web y se abre WhatsApp con el detalle y tu número de pedido.</li>
        <li>Te respondemos con los datos de pago (Yape, Plin o transferencia) y confirmamos tu dirección.</li>
        <li>Preparamos tu pedido y lo despachamos. Para envíos a provincia te enviamos el código de seguimiento de Olva o Shalom.</li>
        <li>
          Si compraste con tu cuenta, puedes ver el estado en <Link href="/cuenta">Mi cuenta</Link>.
        </li>
      </ol>

      <h2>Pucallpa: delivery gratis y contra entrega</h2>
      <p>
        En Pucallpa el delivery es gratis y llega en 24 horas. Puedes pagar al recibir tu pedido en efectivo, Yape o Plin. También puedes
        recogerlo sin costo coordinando por WhatsApp.
      </p>

      <h2>Envíos a provincia</h2>
      <ul>
        <li>Huánuco y Tingo María: 24 a 48 horas.</li>
        <li>Lima y Callao: 2 a 3 días por Olva o Shalom.</li>
        <li>Resto del Perú: 3 a 5 días por Olva o Shalom (recojo en agencia).</li>
      </ul>
      <p>
        Revisa que tu dirección, DNI y teléfono estén correctos; la agencia los pide para entregarte el paquete. Si algo llega dañado, avísanos
        dentro de las 48 horas con una foto. Mira también nuestra política de <Link href="/cambios-y-devoluciones">cambios y devoluciones</Link>.
      </p>
    </ContentPage>
  );
}
