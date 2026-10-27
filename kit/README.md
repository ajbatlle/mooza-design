# Kit de recursos gráficos

Todo está construido sobre la grilla de siete columnas, con margen 6 % y medianil 1,2 % del ancho. Los SVG vienen a 1080 de ancho: 1080 × 1350 para 4:5 y 1080 × 1920 para 9:16.

| Carpeta | Contenido |
|---|---|
| `plantillas/` | `semana`, `foto`, `grafico`, `editorial` y `story`, cada uno en SVG con texto editable y en PNG de vista previa |
| `grillas/` | Capa de guías en SVG: 4:5 con 9 filas, 4:5 con 10 filas y 9:16 con 16 filas. Las guías son magenta y no se exportan |
| `celdas/` | Cuadrados de 100 × 100 rellenos en los seis colores y de contorno en noche, blanco y amarillo |
| `marca/` | Logo horizontal e ícono, monocromos en noche y en amarillo. Derivan del logo oficial: el original con degradé y el blanco están en `assets/logos/` |
| `fotos/` | Marcador de foto de evento y reglas de recorte |
| `ilustraciones/` | Nueve dibujos de musas en SVG (`svg/`, cuatro versiones de cada uno) y hojas de muestra en PNG |
| `duotono/` | Herramienta en el navegador, script por lotes (`duotono.py`) y reglas para convertir fotos |

## Cómo usarlos

- Las plantillas usan Newsreader e Inter Tight. Instala ambas fuentes (Google Fonts, licencia OFL) antes de editar el texto en Figma, Illustrator o Affinity.
- Para armar una pieza nueva, pon la grilla de `grillas/` como capa de guías, apila celdas de `celdas/` y escribe los textos con los estilos de `readme.md`.
- Las ilustraciones usan un filtro SVG de trazo a mano. Se ven bien en navegadores; para Figma o Illustrator usa las hojas PNG o exporta desde el navegador.
- Si cambias el margen o el medianil, regenera todo con el script: `npm i playwright && node kit/build-kit.mjs`. Para eso edita las constantes `MP` y `GP` al inicio del script.

## Reglas rápidas

- Un campo de color de fondo por pieza. Las celdas llevan los demás.
- Palabras en serif, números en grotesca.
- Fotos en celdas completas y sin llegar al borde.
- Logo siempre en noche sobre fondos claros, amarillos y naranjas, y en blanco o amarillo sobre noche y azul.
