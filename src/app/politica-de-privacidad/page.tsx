import type { Metadata } from "next";
import { ContentPage } from "@/components/content-page";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Cómo KRAZE recopila, usa y protege tus datos personales conforme a la Ley 29733 de Protección de Datos Personales del Perú.",
  alternates: { canonical: "/politica-de-privacidad" },
};

export default function PrivacyPage() {
  const { razonSocial, email } = site.legal;
  return (
    <ContentPage kicker="Legal" title="Política de privacidad" updated="noviembre de 2026">
      <p>
        {razonSocial} (“KRAZE”) protege tus datos personales conforme a la Ley N.º 29733, Ley de Protección de Datos Personales, y su reglamento.
      </p>

      <h2>Qué datos recopilamos</h2>
      <ul>
        <li>Al crear una cuenta: nombre, correo electrónico y contraseña (guardada de forma cifrada).</li>
        <li>Al hacer un pedido: nombre, teléfono, correo, dirección de entrega y los productos que compras.</li>
        <li>Al navegar: datos de uso anónimos (páginas visitadas, dispositivo, ciudad aproximada) mediante Google Analytics.</li>
        <li>En el Libro de Reclamaciones: los datos que ingreses en el formulario.</li>
      </ul>

      <h2>Para qué los usamos</h2>
      <ul>
        <li>Procesar, enviar y dar seguimiento a tus pedidos.</li>
        <li>Gestionar tu cuenta y enviarte correos necesarios (confirmación de cuenta, cambio de contraseña).</li>
        <li>Atender consultas, cambios y reclamos.</li>
        <li>Mejorar la tienda con estadísticas de uso.</li>
        <li>Enviarte novedades y ofertas, solo si lo aceptaste. Puedes darte de baja cuando quieras.</li>
      </ul>

      <h2>Con quién los compartimos</h2>
      <p>
        No vendemos tus datos. Los compartimos solo con proveedores que nos ayudan a operar: Supabase (base de datos y cuentas), Vercel (hosting),
        Resend (envío de correos), Google Analytics (estadísticas) y las agencias de envío (Olva, Shalom) para entregar tu pedido.
      </p>

      <h2>Cuánto tiempo los guardamos</h2>
      <p>Mientras tengas una cuenta activa o el tiempo necesario para cumplir obligaciones legales y tributarias.</p>

      <h2>Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, cancelación y oposición (ARCO) escribiendo a {email} o por{" "}
        <a href={site.whatsapp}>WhatsApp</a>. Responderemos en los plazos que indica la ley.
      </p>

      <h2>Cookies</h2>
      <p>
        Usamos almacenamiento del navegador para recordar tu carrito y tu sesión, y cookies de Google Analytics para medir visitas. Puedes
        bloquearlas desde la configuración de tu navegador.
      </p>
    </ContentPage>
  );
}
