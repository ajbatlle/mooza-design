---
name: mooza-design
description: Genera piezas y interfaces con la marca Mooza, plataforma de eventos culturales de Chile (mooza.cl). Contiene el sistema de diseño v2 (grilla de siete días, color plano, serif para palabras y grotesca para números), componentes, tokens y un kit de recursos gráficos.
user-invocable: true
---

Lee `readme.md` y revisa `guidelines/index.html` antes de diseñar.

Si haces piezas visuales (carteles, stories, maquetas), parte de `kit/plantillas/` o usa `MoozaPoster` (`components/grid/poster.js`). Importa `styles.css` para color, tipo y grilla. Si trabajas código de producción, usa los tokens de `tokens/` y los componentes de `components/ui/`.

Decisiones de la marca:
- Regla de base: cada elemento ocupa celdas completas y ninguno comparte celdas con otro. Los seis elementos (logo, fecha, titular, número, celda y foto) están medidos en `guidelines/elementos.html`. Corre `components/grid/auditoria.mjs` después de cambiar un diseño.
- La semana es la grilla: siete columnas, una por día. Margen 6 % y medianil 1,2 % del ancho como estándar. Margen entre 3 y 12 %, medianil entre 0,6 y 3,5 % y como máximo la mitad del margen.
- Orden de importancia del color: gris claro (#f2f2f2, el "blanco" de la marca, fondo de todo), azul (color principal) y amarillo o naranjo (solo acentos pequeños). Cada cartel se parte en dos zonas (arriba y abajo; en 16:9, izquierda y derecha): una gris y otra azul (o la foto). Los colores nunca compiten. Texto y logo en noche sobre gris y en blanco sobre azul. Sin degradados, sombras ni iconos.
- Una sola familia, Geist: peso 400 en palabras y 500 en números y datos. La jerarquía sale del tamaño. Titulares con mayúscula inicial: "Tu semana cultural".
- Formatos: 4:5, A3 vertical, 1:1, 9:16 y 16:9, todos con siete columnas. Las filas se eligen para que la celda sea casi cuadrada (tabla en `readme.md`).
- Pie: la última fila de todo cartel. Logo de dos columnas a la izquierda y fecha a la derecha; nada más entra en esa fila.
- Logo: nunca redibujado, con media altura de espacio libre y 96 px de ancho mínimo. En carteles va en noche. Degradé solo sobre noche o azul.
- Ángulos rectos, sin bordes redondeados.
- Español con tuteo, sin voseo ni emoji. "Gratis", "$6.000", hora en 24 horas, "26 oct – 1 nov".
- Imagen: una foto por pieza, en celdas completas y sin llegar al borde. Las fotos van en duotono con los colores de la marca (`kit/duotono/`). Si el evento no tiene foto, usa la ilustración de su categoría (`kit/ilustraciones/`, musas representadas por objetos).
- El logo oficial no se redibuja. Usa los archivos de `assets/logos/` o las variantes monocromas de `kit/marca/`.

Si te invocan sin más indicaciones, pregunta qué pieza hay que hacer y para qué formato.
