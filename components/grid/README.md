# Cartel sobre grilla

Genera los cinco formatos de cartel de Mooza sobre la grilla de siete columnas. Los estilos están en `grid.css` y el generador en `poster.js`. Requiere `styles.css` (tokens de color, tipo y grilla).

## API

```js
MoozaPoster.sprite()                        // texto SVG con el símbolo del logo (#mz-lockup). Insértalo una vez.
MoozaPoster.html(diseno, datos?, formato?)           // devuelve el HTML interno del cartel
MoozaPoster.mount(elemento, diseno, datos?, formato?) // agrega .mz-poster, la clase del diseño y la proporción, y escribe el HTML
MoozaPoster.FORMATOS                         // proporción y alto relativo de cada formato
MoozaPoster.ROWS                             // filas por diseño y formato
MoozaPoster.EJEMPLO                         // datos de ejemplo
MoozaPoster.franja(horaInicio, filas)       // fila de la grilla (2 a filas − 1) para una hora, en el cartel "semana"
```

Diseños: `semana`, `foto`, `grafico`, `editorial`, `story`.

Formatos (tercer parámetro, `4x5` por defecto y `9x16` para story):

| Diseño | Formatos |
|---|---|
| semana | `4x5`, `a3`, `1x1` |
| foto | `4x5`, `a3`, `1x1`, `16x9` |
| grafico | `4x5`, `a3`, `1x1` |
| editorial | `4x5`, `a3` |
| story | `9x16` |

Un diseño que no existe en un formato lanza un error.

## Datos

```js
{
  rango: '26 oct – 1 nov',   // rango de fechas escrito
  corto: '26–1',             // rango corto, para el número grande
  semana: [                  // siete días, lunes a domingo
    { d: 'lun', n: 26, e: [{ t: 'Nombre', v: 'Lugar', s: 19, e: 20.5, p: 'Gratis', f: 1 }] }
  ],                         // s y e: horas decimales (20.5 es 20:30). f: destacado.
  titularFoto: 'tu semana<br>cultural',
  titularEditorial: 'hay jazz,<br>teatro y cine<br>…',
  cuadrados: [[col1, col2, fila1, fila2, 'n|y|a|k']],   // naranja, amarillo, azul, noche
  story: { categoria, titulo, meta, dia }                 // dia: 0 (lunes) a 6 (domingo)
}
```

Los campos que no pases se toman de `EJEMPLO`.

## Reglas

- La grilla usa `--mz-m` (margen) y `--mz-g` (medianil) del contenedor o de `:root`. Cámbialos en un ancestro para ajustar los carteles.
- Los titulares y números se miden en columnas, no en px.
- En el cartel `semana`, las celdas son amarillo (destacado), blanco (gratis) o noche (de pago). Si dos eventos caen en la misma celda gana el destacado, luego el gratis.
- La foto ocupa celdas completas y nunca llega al borde.
- Agrega `.mz-show-grid` a un ancestro para ver la grilla.

## Auditoría

`node components/grid/auditoria.mjs` (requiere Playwright) monta cada diseño en cada formato con cinco combinaciones de margen y medianil, mide la tinta real de los textos y avisa si el logo choca con algo, se sale del margen o queda desalineado con la fecha, y si un texto se sale de su celda o toca una foto, un bloque o una celda. Termina con error si encuentra problemas. Córrelo después de tocar `poster.js` o `grid.css`.
