# KRAZE® — Tienda online

Sitio de la marca de polos boxy fit KRAZE, construido con Next.js 16 (App Router), Tailwind CSS 4 y TypeScript.
Todavía no hay pagos en línea ni base de datos: el carrito se guarda en el navegador y el pedido se confirma por WhatsApp.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre http://localhost:3000

> Si después de un cambio grande aparece un error de "hydration" o el CSS no se actualiza, detén el servidor,
> borra la carpeta `.next` y vuelve a ejecutar `npm run dev`.

## Páginas

- `/` — Home: hero, nuevo drop, banner, boxy fit, lookbook y cuenta regresiva del próximo drop.
- `/tienda` — Ver todo: categorías, ordenamiento y grilla de productos.
- `/producto/[slug]` — Ficha de producto: galería, tallas, añadir al carrito, acordeones y relacionados.
- `/carrito` — Tu cesta: cantidades, resumen y cupón (solo visual).
- `/carrito/checkout` — Datos de contacto, envío por departamento y método de pago; finaliza por WhatsApp.
- `/cuenta/ingresar` y `/cuenta/registro` — inicio de sesión y registro (nombre, correo, contraseña) con Supabase Auth.
- `/cuenta` — Mi cuenta: pedidos del cliente con su estado (recibido → confirmado → enviado → entregado).
- `/cuenta/recuperar` y `/cuenta/nueva-clave` — recuperar contraseña por correo (Resend).
- `/polos-pucallpa` — página para la búsqueda "polos en Pucallpa" (ver `docs/seo.md`).
- `/envios`, `/cambios-y-devoluciones`, `/preguntas-frecuentes`, `/guia-de-tallas`, `/contacto` — soporte.
- `/terminos-y-condiciones`, `/politica-de-privacidad` — legales (completar razón social y RUC en `src/lib/site.ts`).
- `/reclamaciones` — Libro de Reclamaciones (hoja virtual). **Falta conectar el envío y la copia por correo.**

## Supabase (cuentas y pedidos)

- Variables en `.env.local` (no se sube a git): `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
- Esquema en `supabase/schema.sql` (tabla `orders`, políticas RLS y función `create_order`). Se puede volver a ejecutar.
- Cada compra se guarda con un número correlativo (`#000001`) que también va en el mensaje de WhatsApp.
  Los pedidos de invitados se guardan sin usuario; los de clientes con sesión aparecen en Mi cuenta.
- **Para actualizar el estado de un pedido:** panel de Supabase → Table editor → `orders` → columna `status`
  (`pendiente`, `confirmado`, `enviado`, `entregado` o `cancelado`).

## Correos (Resend)

Los correos de cuenta (confirmar registro, recuperar contraseña) los envía Supabase por SMTP de Resend desde
`no-reply@kraze.ink`. Las plantillas en español están en `supabase/email-templates/` y se pegan en
Supabase → Authentication → Emails.

## Dónde editar el contenido

- `src/lib/products.ts` — productos, precios, stock, fotos y medidas.
- `src/lib/site.ts` — WhatsApp, Instagram, drops, promo, tarifas de envío por departamento y datos legales del proveedor.
- `public/img/productos/<polo>/` — fotos de cada polo: `frente.jpg` y `espalda.jpg` (fondo blanco, se usan en la
  colección y en el efecto hover) y `modelo-1..3.jpg` (aparecen en la ficha del producto).

## Fotos de producto

Las fotos salen del Instagram de la marca (@kraze_peru) y se editaron con ChatGPT:

1. `assets-src/instagram/` — capturas originales (collages, fotos planas y fotos con modelos).
2. `assets-src/chatgpt/` — imágenes generadas por ChatGPT (`<color>-frente.png`, `<color>-espalda.png`, `<color>-modelo-N.png`).
3. `sh scripts/publicar-fotos.sh <color> <carpeta>` — normaliza las fotos (prenda centrada al mismo tamaño sobre
   blanco 1080×1350, modelos recortados a 4:5) y las copia a `public/img/productos/<carpeta>/`.
   Requiere Python 3 con Pillow y numpy.

> Precio (S/ 45) y promo (2 x S/ 80) tomados de las publicaciones de Instagram. El stock, las medidas, los costos de
> envío y los datos legales (razón social, RUC) siguen siendo **de ejemplo**:
> hay que confirmarlos con la marca antes de publicar.
