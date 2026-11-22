"""Normaliza las fotos editadas con ChatGPT para la tienda.

- Producto (frente/espalda): recorta la prenda del fondo blanco, la escala al mismo ancho
  y la centra en un lienzo blanco 1080x1350 (4:5), para que todas las tarjetas se vean iguales.
- Modelos: recorte central a 4:5 y redimensionado a 1080x1350.

Uso: python3 scripts/normalizar-fotos.py producto ENTRADA SALIDA
     python3 scripts/normalizar-fotos.py modelo   ENTRADA SALIDA
"""
import sys
import numpy as np
from PIL import Image

W, H = 1080, 1350
GARMENT_W = 0.80  # ancho de la prenda respecto al lienzo


def producto(src: str, dst: str) -> None:
    im = Image.open(src).convert("RGB")
    a = np.asarray(im).astype(int)
    # Píxeles que no son casi blancos = prenda (y su sombra suave).
    mask = (a.min(axis=2) < 235)
    # Ignora un borde de 6px por si la captura trae una línea gris.
    mask[:6, :] = mask[-6:, :] = False
    mask[:, :6] = mask[:, -6:] = False
    ys, xs = np.where(mask)
    box = (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
    garment = im.crop(box)
    scale = (W * GARMENT_W) / garment.width
    if garment.height * scale > H * 0.86:
        scale = (H * 0.86) / garment.height
    garment = garment.resize((round(garment.width * scale), round(garment.height * scale)), Image.LANCZOS)
    canvas = Image.new("RGB", (W, H), (255, 255, 255))
    canvas.paste(garment, ((W - garment.width) // 2, (H - garment.height) // 2))
    canvas.save(dst, "JPEG", quality=88, optimize=True, progressive=True)


def modelo(src: str, dst: str) -> None:
    im = Image.open(src).convert("RGB")
    # Recorta 4px de borde por si la captura trae una línea del fondo.
    im = im.crop((4, 4, im.width - 4, im.height - 4))
    target = W / H
    if im.width / im.height > target:
        nw = round(im.height * target)
        x = (im.width - nw) // 2
        im = im.crop((x, 0, x + nw, im.height))
    else:
        nh = round(im.width / target)
        y = (im.height - nh) // 2
        im = im.crop((0, y, im.width, y + nh))
    im.resize((W, H), Image.LANCZOS).save(dst, "JPEG", quality=86, optimize=True, progressive=True)


if __name__ == "__main__":
    kind, src, dst = sys.argv[1:4]
    {"producto": producto, "modelo": modelo}[kind](src, dst)
