# Fotos en tinta azul con transparencia

La foto se convierte a un PNG de un solo color, el azul `#1b1444`, con el canal alfa igual a 255 menos el canal verde de la foto (el procedimiento de `kit/fotos/ejemplo/procedimiento-foto-mooza.psd`): sombras opacas, luces transparentes. Sin ajustes, el resultado es idéntico a la máscara del PSD. Se apoya sobre una zona lisa amarilla o naranja.

- En el navegador: `index.html`. Elige la foto, ajusta contraste y medios tonos si hace falta y descarga el PNG. No sube nada a internet.
- Por lotes: `python3 kit/tinta/tinta.py carpeta/ --salida salida/ --fondo amarillo` (requiere Pillow y numpy). Guarda el PNG y, con `--fondo`, una vista previa JPG. Con `--recortar` quita antes las barras oscuras de los bordes, típicas de un pantallazo de Instagram.
- En web o canvas: `MoozaTinta.aplicarTinta()` y `MoozaTinta.filtroTinta()` (`components/tinta/tinta.js`).

## Reglas

- La zona bajo la foto es plana, amarilla o naranja. Nunca otro color ni degradado.
- Para que funcione, la foto original necesita buen rango de luces y sombras. Si se ve plana, sube el contraste antes de exportar.
- La foto entra en celdas completas de la grilla, como indica `kit/fotos/README.md`.
