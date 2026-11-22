import type { Metadata } from "next";
import Link from "next/link";
import { ContentPage } from "@/components/content-page";
import { promo } from "@/lib/products";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: "Condiciones de compra en la tienda online de KRAZE: pedidos, precios, pagos, envíos, cambios y cuentas de usuario.",
  alternates: { canonical: "/terminos-y-condiciones" },
};

export default function TermsPage() {
  const { razonSocial, ruc, direccion, email } = site.legal;
  return (
    <ContentPage kicker="Legal" title="Términos y condiciones" updated="noviembre de 2026">
      <h2>1. Quiénes somos</h2>
      <p>
        Esta tienda es operada por {razonSocial}, RUC {ruc}, con domicilio en {direccion} (en adelante, “KRAZE”). Puedes contactarnos por{" "}
        <a href={site.whatsapp}>WhatsApp</a> o al correo {email}.
      </p>

      <h2>2. Pedidos</h2>
      <p>
        Al finalizar tu compra en {site.url.replace("https://", "")} se registra tu pedido con un número y se abre WhatsApp con el detalle. El pedido
        queda confirmado cuando validamos el pago (o la dirección, en el caso de pago contra entrega en Pucallpa). Podemos cancelar un pedido si no
        hay stock, si los datos son incorrectos o si no recibimos el pago en 48 horas; en ese caso te avisamos y devolvemos cualquier monto pagado.
      </p>

      <h2>3. Precios y promociones</h2>
      <p>
        Los precios están en soles (S/) e incluyen IGV. La promoción {promo.label} se aplica automáticamente por cada par de polos del carrito y no es
        acumulable con otras ofertas salvo que se indique. Los costos de envío se muestran antes de finalizar la compra.
      </p>

      <h2>4. Pagos</h2>
      <p>Aceptamos Yape, Plin, transferencia bancaria y, solo en Pucallpa, pago contra entrega. La web no almacena datos de tarjetas.</p>

      <h2>5. Envíos, cambios y devoluciones</h2>
      <p>
        Los tiempos y costos están en <Link href="/envios">Envíos</Link> y las condiciones de cambio en{" "}
        <Link href="/cambios-y-devoluciones">Cambios y devoluciones</Link>.
      </p>

      <h2>6. Cuenta de usuario</h2>
      <p>
        Crear una cuenta es opcional y sirve para seguir tus pedidos. Eres responsable de mantener tu contraseña en reserva. Tratamos tus datos según
        nuestra <Link href="/politica-de-privacidad">política de privacidad</Link>.
      </p>

      <h2>7. Propiedad intelectual</h2>
      <p>Los diseños, fotos, logotipos y textos de KRAZE son de nuestra propiedad y no pueden usarse sin autorización.</p>

      <h2>8. Reclamos</h2>
      <p>
        Puedes presentar un reclamo o queja en nuestro <Link href="/reclamaciones">Libro de Reclamaciones</Link>. Te responderemos en un plazo máximo
        de 15 días hábiles, conforme a la Ley 29571.
      </p>
    </ContentPage>
  );
}
