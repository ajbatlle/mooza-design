# Kit de recursos gráficos

Todo está construido sobre la grilla de siete columnas, con margen 6 % y medianil 1,2 % del ancho. Los SVG vienen a 1080 de ancho: 1080 × 1350 para 4:5, 1080 × 1527 para A3 (escala al tamaño real), 1080 × 1080 para 1:1, 1080 × 1920 para 9:16 y 1080 × 608 para 16:9.

| Carpeta | Contenido |
|---|---|
| `mooza-carteles.svg` | Todas las plantillas en un solo archivo, una fila por formato y cada una en un grupo con id (`titular-4x5`, `foto-a3`, etc.). Vista previa en `mooza-carteles.png` |
| `plantillas/` | Los seis diseños en SVG con texto editable y en PNG de vista previa, en 4:5 y en las variantes `-a3`, `-1x1` y `-16x9` donde existen |
| `grillas/` | Capa de guías en SVG: 4:5, A3, 1:1, 9:16 y 16:9. Las guías son magenta y no se exportan |
| `celdas/` | Cuadrados de 100 × 100 rellenos en los colores y de contorno en azul, blanco y amarillo |
| `marca/` | Logo horizontal e ícono, monocromos en azul y en amarillo. Derivan del logo oficial, que está en `assets/logos/` |
| `fotos/` | Marcador de foto de evento, fotos de ejemplo ya convertidas y reglas de recorte |
| `tinta/` | Herramienta en el navegador y script por lotes (`tinta.py`) para convertir fotos a tinta azul con transparencia |
| `ilustraciones/` | Las cuatro musas, sus versiones en tinta azul y los prompts con que se hicieron |
| `poleras/` | Capas de impresión y maquetas de las poleras |
| `tablero/` | Imágenes de referencia de las piezas: carteles, formatos, feed, fotos, carrusel, grilla y fondo |

## Cómo usarlos

- Las plantillas usan Geist. Instala la fuente (Google Fonts, licencia OFL) antes de editar el texto en Figma, Illustrator o Affinity.
- Las plantillas SVG no llevan el fondo de marca, porque el grano y el borde suave no viajan dentro de un SVG editable. Para ver la pieza completa, usa `MoozaPoster` (el fondo va por defecto) o `tablero/`.
- Para armar una pieza nueva, pon la grilla de `grillas/` como capa de guías, apila celdas de `celdas/` y escribe los textos con los estilos de `readme.md`.
- Si cambias el margen o el medianil, regenera todo con el script: `npm i playwright && node kit/build-kit.mjs`. Para eso edita las constantes `MP` y `GP` al inicio del script.

## Reglas rápidas

- Pie: la última fila de todo cartel. Logo de dos columnas a la izquierda y fecha o web a la derecha; nada más entra en esa fila.
- Fondo gris claro. Una sola zona de color por pieza: azul, amarillo o naranjo. El azul es protagonista, no absoluto.
- Todo en Geist: peso 400 en palabras y 500 en números y datos.
- Fotos siempre en tinta azul con transparencia, sobre una zona lisa amarilla o naranja.
- Logo en azul sobre gris claro, amarillo y naranjo; en blanco sobre azul.
