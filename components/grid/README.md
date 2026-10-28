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

Los campos que no pases se toman de `MoozaPoster.EJEMPLO`: `color` (`azul` por defecto; `amarillo` o `naranja` si la pieza lo pide, con texto en noche), `rango`, `corto`, `titular`, `dias` y `diaDestacado` (semana), `evento` (foto), `agenda` (`dia`, `n`, `pag` y `eventos` con `h`, `t`, `v`, `p`, `f`) y `story`.

## Reglas

- La grilla usa `--mz-m` (margen) y `--mz-g` (medianil) del contenedor o de `:root`. Cámbialos en un ancestro para ajustar los carteles.
- Los titulares y números se miden en columnas, no en px.
- La foto ocupa celdas completas y nunca llega al borde.
- Agrega `.mz-show-grid` a un ancestro para ver la grilla.

## Auditoría

`node components/grid/auditoria.mjs` (requiere Playwright) monta cada diseño en cada formato con cinco combinaciones de margen y medianil, mide la tinta real de los textos y avisa si el logo choca con algo, se sale del margen o queda desalineado con la fecha, y si un texto se sale de su celda o toca una foto, un bloque o una celda. Termina con error si encuentra problemas. Córrelo después de tocar `poster.js` o `grid.css`.
