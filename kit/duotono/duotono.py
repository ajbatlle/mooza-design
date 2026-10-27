#!/usr/bin/env python3
"""Mooza · duotono con los colores de la marca.

Procedimiento:
  1. Escala de grises por luminancia (0,2126 R + 0,7152 G + 0,0722 B).
  2. Niveles: el punto negro y el blanco salen de los percentiles 1 y 99, y luego se aplican gamma y contraste.
  3. Mapa de degradado de dos colores: las sombras toman el color oscuro y las luces el claro.
  4. Grano opcional, sutil, para que el plano no se vea digital.

Uso:
  python3 kit/duotono/duotono.py foto.jpg --paleta noche-amarillo
  python3 kit/duotono/duotono.py carpeta/ --paleta azul-naranja --lado 1600 --grano 0.03
Requiere Pillow y numpy.
"""
import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

# sombra, luz. Todos son colores de la paleta (tokens/colors.css).
PALETAS = {
    "noche-amarillo": ("#03021b", "#fcee21"),
    "noche-naranja": ("#03021b", "#fbb03b"),
    "azul-amarillo": ("#1b1444", "#fcee21"),
    "azul-naranja": ("#1b1444", "#fbb03b"),
    "azul-claro": ("#1b1444", "#f2f2f2"),
    "noche-claro": ("#03021b", "#f2f2f2"),
}


def rgb(h):
    return np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)], dtype=np.float32)


def curva(t, c):
    """Contraste: 1 es lineal y más de 1 es una curva en S."""
    if c == 1:
        return t
    s = t * t * (3 - 2 * t)
    return t + (s - t) * min(1.0, c - 1)


def duotono(img, paleta, contraste=1.15, gamma=1.0, grano=0.0, negro=1, blanco=99, lado=None, semilla=7):
    img = ImageOps.exif_transpose(img).convert("RGB")
    if lado and max(img.size) > lado:
        k = lado / max(img.size)
        img = img.resize((round(img.width * k), round(img.height * k)), Image.LANCZOS)
    a = np.asarray(img, dtype=np.float32)
    lum = 0.2126 * a[..., 0] + 0.7152 * a[..., 1] + 0.0722 * a[..., 2]
    lo, hi = np.percentile(lum, [negro, blanco])
    if hi <= lo:
        lo, hi = 0.0, 255.0
    t = np.clip((lum - lo) / (hi - lo), 0, 1)
    t = np.power(t, 1.0 / gamma)
    t = curva(t, contraste)
    if grano:
        rng = np.random.default_rng(semilla)
        t = np.clip(t + (rng.random(t.shape, dtype=np.float32) - 0.5) * grano, 0, 1)
    c1, c2 = (rgb(x) for x in PALETAS[paleta])
    out = c1 + (c2 - c1) * t[..., None]
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGB")


def main():
    p = argparse.ArgumentParser(description="Duotono con los colores de Mooza")
    p.add_argument("entrada", help="Imagen o carpeta de imágenes")
    p.add_argument("--paleta", choices=sorted(PALETAS), default="noche-amarillo")
    p.add_argument("--contraste", type=float, default=1.15, help="1 es lineal; más de 1 da curva en S (por defecto 1,15)")
    p.add_argument("--gamma", type=float, default=1.0, help="Mayor que 1 aclara los medios tonos")
    p.add_argument("--grano", type=float, default=0.0, help="Ruido sutil, de 0 a 0,1 (por defecto 0)")
    p.add_argument("--lado", type=int, default=None, help="Lado máximo en px")
    p.add_argument("--salida", default=None, help="Archivo o carpeta de salida (por defecto, junto a la entrada)")
    a = p.parse_args()

    src = Path(a.entrada)
    archivos = sorted(f for f in src.iterdir() if f.suffix.lower() in (".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff")) if src.is_dir() else [src]
    if not archivos:
        sys.exit("No encontré imágenes.")
    for f in archivos:
        if a.salida and (len(archivos) > 1 or Path(a.salida).suffix == ""):
            Path(a.salida).mkdir(parents=True, exist_ok=True)
            dest = Path(a.salida) / f"{f.stem}-{a.paleta}.png"
        elif a.salida:
            dest = Path(a.salida)
        else:
            dest = f.with_name(f"{f.stem}-{a.paleta}.png")
        duotono(Image.open(f), a.paleta, a.contraste, a.gamma, a.grano, lado=a.lado).save(dest)
        print(dest)


if __name__ == "__main__":
    main()
