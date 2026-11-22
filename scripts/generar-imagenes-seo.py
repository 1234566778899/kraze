"""Genera la imagen para compartir (Open Graph) y los íconos del sitio.

Uso: python3 scripts/generar-imagenes-seo.py   (requiere Pillow)
Salida: src/app/opengraph-image.jpg, src/app/icon.png, src/app/apple-icon.png, src/app/favicon.ico
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
APP = ROOT / "src" / "app"
PROD = ROOT / "public" / "img" / "productos"
BLACK = "/System/Library/Fonts/Supplemental/Arial Black.ttf"
BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
INK, SNOW, YELLOW = (10, 10, 10), (242, 242, 240), (255, 193, 7)


def italic(img: Image.Image, shear=0.18) -> Image.Image:
    w, h = img.size
    extra = int(h * shear)
    return img.transform((w + extra, h), Image.AFFINE, (1, shear, -extra, 0, 1, 0), Image.BICUBIC)


def wordmark(text: str, size: int, color=SNOW) -> Image.Image:
    font = ImageFont.truetype(BLACK, size)
    l, t, r, b = font.getbbox(text)
    img = Image.new("RGBA", (r - l + 10, b - t + 10), (0, 0, 0, 0))
    ImageDraw.Draw(img).text((5 - l, 5 - t), text, font=font, fill=color)
    return italic(img)


def og():
    W, H = 1200, 630
    canvas = Image.new("RGB", (W, H), INK)
    d = ImageDraw.Draw(canvas)
    # Cuatro polos (frente) sobre tarjetas blancas a la derecha.
    shirts = ["adventures-azul", "originals-verde", "sports-vino", "studios-rojo"]
    cw, ch = 250, 312
    for i, s in enumerate(shirts):
        x = 560 + (i % 2) * (cw + 20)
        y = 0 + (i // 2) * (ch + 6)
        im = Image.open(PROD / s / "frente.jpg").convert("RGB").resize((cw, ch), Image.LANCZOS)
        canvas.paste(im, (x, y))
    mark = wordmark("KRAZE", 120)
    canvas.paste(mark, (60, 150), mark)
    d.text((66, 310), "POLOS BOXY FIT", font=ImageFont.truetype(BLACK, 38), fill=SNOW)
    sub = ImageFont.truetype(BOLD, 24)
    d.text((66, 362), "Ediciones limitadas", font=sub, fill=(170, 170, 165))
    d.text((66, 394), "Hecho en Pucallpa, Perú", font=sub, fill=(170, 170, 165))
    pill = ImageFont.truetype(BLACK, 28)
    tw = d.textlength("2 x S/ 80", font=pill)
    d.rounded_rectangle((60, 450, 60 + tw + 52, 506), radius=28, fill=YELLOW)
    d.text((86, 461), "2 x S/ 80", font=pill, fill=INK)
    d.text((66, 540), "www.kraze.ink", font=ImageFont.truetype(BOLD, 24), fill=(170, 170, 165))
    canvas.save(APP / "opengraph-image.jpg", "JPEG", quality=88, optimize=True)


def icon(size: int) -> Image.Image:
    img = Image.new("RGB", (size, size), INK)
    k = wordmark("K", int(size * 0.66))
    k.thumbnail((int(size * 0.72), int(size * 0.72)), Image.LANCZOS)
    img.paste(k, ((size - k.width) // 2, (size - k.height) // 2), k)
    dot = max(2, size // 14)
    ImageDraw.Draw(img).ellipse((size - dot * 3, dot * 2, size - dot * 2, dot * 3), fill=YELLOW)
    return img


if __name__ == "__main__":
    og()
    icon(512).save(APP / "icon.png")
    icon(180).save(APP / "apple-icon.png")
    icon(256).convert("RGBA").save(APP / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    print("ok")
