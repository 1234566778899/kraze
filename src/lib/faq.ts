import type { Faq } from "@/components/content-page";
import { PRICE, promo } from "./products";

// Preguntas frecuentes reales de los clientes (ver comentarios de Instagram/WhatsApp).
// Se muestran en /preguntas-frecuentes y generan datos estructurados FAQPage para Google.
export const faqs: Faq[] = [
  {
    q: "¿Qué es un polo boxy fit?",
    a: "Es un polo de corte cuadrado: más ancho, un poco más corto y con los hombros caídos. Se ve relajado y con caída, sin verse grande. Todos los polos KRAZE son boxy fit y unisex.",
  },
  {
    q: "¿Cuánto cuestan los polos KRAZE?",
    a: `Cada polo cuesta S/ ${PRICE}. Con la promo llevas ${promo.qty} polos por S/ ${promo.price} y puedes combinar diseños y colores; el descuento se aplica solo en el carrito.`,
  },
  {
    q: "¿Qué talla debo elegir?",
    a: "Tenemos tallas S, M y L. Como el corte es boxy, si quieres un fit más ajustado o regular pide una talla menos. En la guía de tallas están las medidas de cada talla en centímetros.",
  },
  {
    q: "¿De qué material son los polos?",
    a: "Son de algodón jersey 20/1: frescos, suaves y cómodos para el calor de la selva. Los estampados están hechos para durar lavado tras lavado.",
  },
  {
    q: "¿Hacen delivery en Pucallpa?",
    a: "Sí. El delivery en Pucallpa es gratis, llega en 24 horas y puedes pagar contra entrega en efectivo, Yape o Plin.",
  },
  {
    q: "¿Envían a todo el Perú?",
    a: "Sí. Enviamos a Huánuco (24 a 48 horas), a Lima por Olva o Shalom (2 a 3 días) y al resto del Perú (3 a 5 días). El costo del envío se calcula en el checkout según tu departamento.",
  },
  {
    q: "¿Cómo pago mi pedido?",
    a: "Puedes pagar con Yape, Plin o transferencia bancaria; te enviamos los datos por WhatsApp al confirmar tu pedido. En Pucallpa también puedes pagar contra entrega.",
  },
  {
    q: "¿Cómo hago seguimiento a mi pedido?",
    a: "Si compraste con tu cuenta, entra a Mi cuenta para ver el estado de cada pedido (recibido, confirmado, enviado y entregado). También puedes escribirnos por WhatsApp con tu número de pedido.",
  },
  {
    q: "¿Puedo cambiar la talla?",
    a: "Sí, tienes 7 días desde que recibes tu pedido para cambiar la talla. La prenda debe estar sin uso, sin lavar y con su etiqueta. Coordinamos el cambio por WhatsApp.",
  },
  {
    q: "¿Van a reponer los diseños agotados?",
    a: "Trabajamos en ediciones limitadas por drop, así que la mayoría de diseños no se reponen. Síguenos en Instagram y TikTok (@kraze_peru) para enterarte primero de cada lanzamiento.",
  },
];
