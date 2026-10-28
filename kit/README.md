# Kit de recursos gráficos

Todo está construido sobre la grilla de siete columnas, con margen 6 % y medianil 1,2 % del ancho. Los SVG vienen a 1080 de ancho: 1080 × 1350 para 4:5, 1080 × 1527 para A3 (escala al tamaño real), 1080 × 1080 para 1:1, 1080 × 1920 para 9:16 y 1080 × 608 para 16:9.

| Carpeta | Contenido |
|---|---|
| `mooza-carteles.svg` | Todas las plantillas en un solo archivo, una fila por formato y cada una en un grupo con id (`titular-4x5`, `foto-a3`, etc.). Vista previa en `mooza-carteles.png` |
| `plantillas/` | Los seis diseños en SVG con texto editable y en PNG de vista previa, en 4:5 y en las variantes `-a3`, `-1x1` y `-16x9` donde existen |
| `grillas/` | Capa de guías en SVG: 4:5, A3, 1:1, 9:16 y 16:9. Las guías son magenta y no se exportan |
| `celdas/` | Cuadrados de 100 × 100 rellenos en los seis colores y de contorno en azul, blanco y amarillo |
| `marca/` | Logo horizontal e ícono, monocromos en azul y en amarillo. Derivan del logo oficial: el original con degradé y el blanco están en `assets/logos/` |
| `fotos/` | Marcador de foto de evento y reglas de recorte |
| `ilustraciones/` | Nueve dibujos de musas en SVG (`svg/`, cuatro versiones de cada uno) y hojas de muestra en PNG |
| `duotono/` | Herramienta en el navegador, script por lotes (`duotono.py`) y reglas para convertir fotos |

## Cómo usarlos

- Las plantillas usan Geist. Instala la fuente (Google Fonts, licencia OFL) antes de editar el texto en Figma, Illustrator o Affinity.
- Para armar una pieza nueva, pon la grilla de `grillas/` como capa de guías, apila celdas de `celdas/` y escribe los textos con los estilos de `readme.md`.
- Las ilustraciones usan un filtro SVG de trazo a mano. Se ven bien en navegadores; para Figma o Illustrator usa las hojas PNG o exporta desde el navegador.
- Si cambias el margen o el medianil, regenera todo con el script: `npm i playwright && node kit/build-kit.mjs`. Para eso edita las constantes `MP` y `GP` al inicio del script.

## Reglas rápidas

- Pie: la última fila de todo cartel. Logo de dos columnas a la izquierda y fecha a la derecha; nada más entra en esa fila.
- Fondo gris claro. Una sola zona de color por pieza: azul, amarillo o naranjo. El azul es protagonista, no absoluto: en un conjunto, cerca de la mitad; el resto, amarillo y naranjo. Los acentos pequeños usan los otros colores.
- Palabras en serif, números en grotesca.
- Fotos en celdas completas y sin llegar al borde.
- Logo en azul sobre gris claro, amarillo y naranja; en blanco sobre azul.
