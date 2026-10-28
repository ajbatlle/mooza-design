#!/usr/bin/env python3
"""Mooza · fotos en tinta azul con transparencia, el único modo de mostrar fotografías.

Relleno sólido azul #1b1444 con máscara = canal verde de la foto, invertido (alfa = 255 - verde).
Es el procedimiento de kit/fotos/ejemplo/procedimiento-foto-mooza.psd. Sin ajustes, el resultado es idéntico a la máscara del PSD.

Uso:
  python3 kit/tinta/tinta.py foto.jpg                                  # PNG con transparencia
  python3 kit/tinta/tinta.py carpeta/ --salida salida/ --fondo amarillo   # y vista previa JPG sobre amarillo
Requiere Pillow y numpy.
"""
import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageOps

AZUL = "#1b1444"


def rgb(h):
    return np.array([int(h[i:i + 2], 16) for i in (1, 3, 5)], dtype=np.float32)


def curva(t, c):
    """Contraste: 1 es lineal y más de 1 es una curva en S."""
    if c == 1:
        return t
    s = t * t * (3 - 2 * t)
    return t + (s - t) * min(1.0, c - 1)


def recortar_barras(img, umbral=12):
    """Quita las barras oscuras de los bordes (por ejemplo las de un pantallazo de Instagram): filas y columnas donde el canal verde nunca pasa del umbral."""
    g = np.asarray(img.convert("RGB"), dtype=np.uint8)[..., 1]
    filas = np.where(g.max(axis=1) > umbral)[0]
    cols = np.where(g.max(axis=0) > umbral)[0]
    if len(filas) == 0 or len(cols) == 0:
        return img
    return img.crop((int(cols[0]), int(filas[0]), int(cols[-1]) + 1, int(filas[-1]) + 1))


def tinta(img, contraste=1.0, gamma=1.0, grano=0.0, niveles=False, lado=None, semilla=7, recortar=False):
    """El modo de mostrar fotografías de Mooza: una tinta azul con transparencia.

    Es el procedimiento de Photoshop: una capa de relleno sólido azul (#1b1444) cuya máscara es el canal verde de la foto,
    invertido. Las sombras quedan opacas y las luces transparentes; el PNG se apoya sobre una zona lisa amarilla o naranja.
    Sin opciones el resultado es idéntico, píxel por píxel, a la máscara de la capa. contraste, gamma, niveles y grano
    son ajustes opcionales (apagados por defecto). Devuelve un PNG RGBA."""
    img = ImageOps.exif_transpose(img).convert("RGB")
    if recortar:
        img = recortar_barras(img)
    if lado and max(img.size) > lado:
        k = lado / max(img.size)
        img = img.resize((round(img.width * k), round(img.height * k)), Image.LANCZOS)
    g = np.asarray(img, dtype=np.float32)[..., 1]
    if niveles or gamma != 1.0 or contraste != 1.0 or grano:
        lo, hi = (np.percentile(g, [1, 99]) if niveles else (0.0, 255.0))
        if hi <= lo:
            lo, hi = 0.0, 255.0
        t = np.clip((g - lo) / (hi - lo), 0, 1)
        t = np.power(t, 1.0 / gamma)
        t = curva(t, contraste)
        if grano:
            rng = np.random.default_rng(semilla)
            t = np.clip(t + (rng.random(t.shape, dtype=np.float32) - 0.5) * grano, 0, 1)
        g = np.round(255 * t)
    out = np.zeros(g.shape + (4,), dtype=np.uint8)
    out[..., :3] = np.asarray(rgb(AZUL), dtype=np.uint8)
    out[..., 3] = (255 - g).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def sobre_fondo(png, fondo, lado=None):
    """Vista previa: la tinta apoyada sobre la zona lisa (amarillo o naranja)."""
    color = {"amarillo": "#fcee21", "naranja": "#fbb03b"}[fondo]
    base = Image.new("RGBA", png.size, color)
    base.alpha_composite(png)
    return base.convert("RGB")


def main():
    p = argparse.ArgumentParser(description="Fotos de Mooza: tinta azul con transparencia")
    p.add_argument("entrada", help="Imagen o carpeta de imágenes")
    p.add_argument("--contraste", type=float, default=None, help="1 es lineal; más de 1 da curva en S. Apagado por defecto")
    p.add_argument("--gamma", type=float, default=1.0, help="Mayor que 1 aclara los medios tonos")
    p.add_argument("--niveles", action="store_true", help="Estira negro y blanco por percentiles (1 y 99). Apagado por defecto")
    p.add_argument("--recortar", action="store_true", help="Recorta las barras oscuras de los bordes antes de convertir")
    p.add_argument("--fondo", choices=["amarillo", "naranja"], default=None, help="Además guarda una vista previa JPG sobre ese fondo")
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
            dest = Path(a.salida) / f"{f.stem}-tinta.png"
        elif a.salida:
            dest = Path(a.salida)
        else:
            dest = f.with_name(f"{f.stem}-tinta.png")
        png = tinta(Image.open(f), a.contraste or 1.0, a.gamma, a.grano, a.niveles, lado=a.lado, recortar=a.recortar)
        png.save(dest)
        if a.fondo:
            sobre_fondo(png, a.fondo).save(dest.with_name(dest.stem + f"-sobre-{a.fondo}.jpg"), quality=92)
        print(dest)


if __name__ == "__main__":
    main()
