# KRAZE® — Tienda online (diseño)

Sitio de la marca de polos boxy fit KRAZE, construido con Next.js 16 (App Router), Tailwind CSS 4 y TypeScript.
Por ahora es **solo la parte visual**: no hay carrito, pagos ni base de datos.

## Cómo correrlo

```bash
npm install
npm run dev
```

Abre http://localhost:3000

## Páginas

- `/` — Home: hero, drop actual con filtros por color, ¿Qué es boxy fit?, colecciones, comunidad y cuenta regresiva del próximo drop.
- `/producto/[slug]` — Ficha de producto: galería, tallas con stock, cantidad, compra por WhatsApp, calculadora de envío y medidas.

## Dónde editar el contenido

- `src/lib/products.ts` — productos, precios, stock, fotos, medidas, colecciones y comunidad.
- `src/lib/site.ts` — WhatsApp, Instagram, drop actual, próximo drop (fecha del contador), promo y tarifas de envío.
- `public/img/` — fotos.

> Los precios, el stock, las medidas y los costos de envío son **de ejemplo**: hay que confirmarlos con la marca.
