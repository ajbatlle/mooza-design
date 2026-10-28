# Cartel sobre grilla

Genera los seis diseños de cartel de Mooza sobre la grilla de siete columnas. Los estilos están en `grid.css` y el generador en `poster.js`. Requiere `styles.css` (tokens de color, tipo y grilla).

## API

```js
MoozaPoster.sprite()                        // texto SVG con el símbolo del logo (#mz-lockup). Insértalo una vez.
MoozaPoster.html(diseno, datos?, formato?)           // devuelve el HTML interno del cartel
MoozaPoster.mount(elemento, diseno, datos?, formato?) // agrega .mz-poster, la clase del diseño y la proporción, y escribe el HTML
MoozaPoster.FORMATOS                         // proporción y alto relativo de cada formato
MoozaPoster.ROWS                             // filas por diseño y formato
MoozaPoster.EJEMPLO                         // datos de ejemplo
```

Diseños: `titular`, `numero`, `foto`, `semana`, `agenda`, `story`.

Formatos (tercer parámetro, `4x5` por defecto y `9x16` para story):

| Diseño | Formatos |
|---|---|
| titular, numero, foto | `4x5`, `a3`, `1x1`, `16x9` |
| semana | `4x5`, `a3`, `1x1` |
| agenda | `4x5`, `a3` |
| story | `9x16` |

Un diseño que no existe en un formato lanza un error.

## Datos

Los campos que no pases se toman de `MoozaPoster.EJEMPLO`: `color` (la zona de color: `azul`, `amarillo` o `naranja`; cada diseño tiene el suyo por defecto: titular azul, número amarillo, semana naranja y agenda amarillo; el texto sobre amarillo y naranjo va en azul), `rango`, `corto`, `titular`, `dias` y `diaDestacado` (semana), `evento` (foto), `agenda` (`dia`, `n`, `pag` y `eventos` con `h`, `t`, `v`, `p`, `f`) y `story`.

## Reglas

- La grilla usa `--mz-m` (margen) y `--mz-g` (medianil) del contenedor o de `:root`. Cámbialos en un ancestro para ajustar los carteles.
- Los titulares y números se miden en columnas, no en px.
- La foto ocupa celdas completas y nunca llega al borde.
- Agrega `.mz-show-grid` a un ancestro para ver la grilla.

## Auditoría

`node components/grid/auditoria.mjs` (requiere Playwright) monta cada diseño en cada formato con cinco combinaciones de margen y medianil, mide la tinta real de los textos y avisa si el logo choca con algo, se sale del margen o queda desalineado con la fecha, y si un texto se sale de su celda o toca una foto, un bloque o una celda. Termina con error si encuentra problemas. Córrelo después de tocar `poster.js` o `grid.css`.

## Fotos

`MoozaPoster.mount(el, 'foto', {foto: {src: 'evento.jpg', duotono: 'azul-amarillo', pos: '50% 30%', alt: '...'}}, '4x5')` pone la foto en la celda de foto (diseños `foto` y `story`). `duotono` es opcional (`azul-amarillo`, `azul-naranja` o `azul-claro`); sin él la foto va en color. `pos` es el punto de enfoque del recorte. Para el duotono carga `components/duotono/duotono.js` antes de `poster.js` (así `sprite()` incluye los filtros). Para probar fotos propias sin escribir código: `guidelines/fotos.html`.

## Fuente de las palabras

Los titulares, nombres de evento y textos de lista usan `--mz-palabra` (por defecto Geist 400). Para probar otra tipografía sin tocar los diseños, define en el cartel o en un ancestro: `--mz-palabra` (familia), `--mz-palabra-peso`, `--mz-palabra-track` (interletraje), `--mz-palabra-lh` (interlínea) y `--mz-palabra-var` (variaciones, por ejemplo `'wdth' 70`). Ver `kit/tablero/tipografia-opciones.png`.

## Color por pieza

`MoozaPoster.mount(el, 'titular', {color: 'amarillo'})` cambia la zona de color de esa pieza (`azul`, `amarillo` o `naranja`). El texto se ajusta solo. Ver `kit/tablero/color-en-proporcion.png`.

## Esquina

`MoozaPoster.mount(el, 'titular', {curvas: true})` dibuja un módulo de celdas de la grilla en la esquina de la zona de color. Funciona en `titular`, `numero`, `semana` y `agenda`. Va en el color de acento: amarillo sobre azul y naranjo, naranjo sobre amarillo.

El módulo se arma así:

1. Las líneas de la grilla se ven dentro del módulo y salen hasta el borde del cartel y el borde de la zona.
2. La celda de la esquina se pinta con un cuarto de disco que sale del margen. Es el bloque de color, con una esquina redonda.
3. Las celdas vecinas pueden llevar un arco fino de un radio de celda, centrado en una de sus esquinas. La semilla decide cuáles y hacia dónde. Cuanto más lejos de la esquina, menos probable. Los arcos se tocan en los nodos de la grilla.
4. Una celda con texto o logo encima se vacía sola y las líneas se cortan alrededor.

Opciones: `esquina` (`br`, `bl`, `tr`, `tl`), `semilla` (número), `escala: 'chico'` (una fila de celdas, para zonas de dos filas), `cols` y `filas` (3 y 2 por defecto). `MoozaPoster.esquina` y `MoozaPoster.esquinaSvg` entregan las mismas formas para otros soportes, como poleras. Ver `kit/tablero/trama-propuesta.png`.

## Fondo de marca

`MoozaPoster.mount(el, 'titular', {fondo: 'tono'})` pone detrás del texto el logo a una escala en que ya no se lee: formas muy grandes que cruzan las dos zonas del cartel. Funciona en `titular`, `numero`, `semana` y `agenda` (no en horizontal).

Se arma así:

1. Se ponen dos símbolos del logo, las dos "o" juntas y el ícono, a una escala en que una "o" mide más que el cartel. Solo se usan las partes curvas, así no aparecen letras ni diagonales.
2. Cada símbolo se ancla por un punto de interés (el centro de una "o", la lente entre las dos, un lóbulo del ícono) cerca de una esquina y se gira en múltiplos de 90°. La semilla decide cuál y dónde.
3. Cada zona lleva la forma en un tono apenas distinto de su color: `--mz-tono-azul`, `--mz-tono-amarillo`, `--mz-tono-naranja` sobre la zona de color y `--mz-tono-claro` sobre el gris. Así el texto no pierde contraste.

Opciones de `fondo`: `'tono'` (forma plana de tono sobre tono), `'lineas'` (solo el contorno, en color de acento dentro de la zona y azul sobre el gris, cortado alrededor del texto) y `'relleno'` (forma plana del color de acento). `semilla` cambia la composición. `MoozaPoster.fondoLogo(formato, semilla, true)` entrega las posiciones para otros soportes, como poleras. Ver `kit/tablero/fondo-propuesta.png`.

## Grano y borde suave

`grano: true` cubre todo el cartel, texto incluido, con una película de ruido fino. Aclara y oscurece sin cambiar el color, así que sirve igual sobre azul, amarillo, naranjo y gris. Da unidad entre piezas y textura a los tonos planos. `grano` acepta también un número de 0 a 2 para la fuerza (1 es la normal). El tamaño del grano es fijo en píxeles: no crece con el cartel.

`difuminado: 0.9` suaviza el borde de las formas del fondo de marca (el valor está en cqw). El borde entre zonas y los textos siguen nítidos. Con 1,8 ya parece desenfocado, así que no pasar de ahí.

Combinados: `{fondo: 'tono', grano: true, difuminado: 0.9}`. Ver `kit/tablero/grano-y-borde.png`.

El grano es un filtro SVG: funciona en el navegador y al exportar a imagen. No viaja dentro de las plantillas SVG editables.
