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
- `/reclamaciones` — Libro de Reclamaciones (hoja virtual). **Falta conectar el envío y la copia por correo.**

## Dónde editar el contenido

- `src/lib/products.ts` — productos, precios, stock, fotos y medidas.
- `src/lib/site.ts` — WhatsApp, Instagram, drops, promo, tarifas de envío por departamento y datos legales del proveedor.
- `public/img/` — fotos.

> Los precios, el stock, las medidas, los costos de envío y los datos legales (razón social, RUC) son **de ejemplo**:
> hay que confirmarlos con la marca antes de publicar.
