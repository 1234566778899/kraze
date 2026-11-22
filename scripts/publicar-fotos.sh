#!/bin/sh
# Genera public/img/productos/<carpeta>/ a partir de assets-src/chatgpt/<prefijo>-*.png
# Uso: sh scripts/publicar-fotos.sh <prefijo> <carpeta>   (ej: sh scripts/publicar-fotos.sh verde originals-verde)
set -e
cd "$(dirname "$0")/.."
p=$1; d=public/img/productos/$2; mkdir -p "$d"
python3 scripts/normalizar-fotos.py producto "assets-src/chatgpt/$p-frente.png" "$d/frente.jpg"
python3 scripts/normalizar-fotos.py producto "assets-src/chatgpt/$p-espalda.png" "$d/espalda.jpg"
for i in 1 2 3; do
  [ -f "assets-src/chatgpt/$p-modelo-$i.png" ] && python3 scripts/normalizar-fotos.py modelo "assets-src/chatgpt/$p-modelo-$i.png" "$d/modelo-$i.jpg"
done
ls "$d"
