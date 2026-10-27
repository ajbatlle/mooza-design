# Cartel sobre grilla

Genera los cinco formatos de cartel de Mooza sobre la grilla de siete columnas. Los estilos están en `grid.css` y el generador en `poster.js`. Requiere `styles.css` (tokens de color, tipo y grilla).

## API

```js
MoozaPoster.sprite()                        // texto SVG con el símbolo del logo (#mz-lockup). Insértalo una vez.
MoozaPoster.html(formato, datos?)           // devuelve el HTML interno del cartel
MoozaPoster.mount(elemento, formato, datos?) // agrega .mz-poster y la clase del formato, y escribe el HTML
MoozaPoster.EJEMPLO                         // datos de ejemplo
MoozaPoster.franja(horaInicio)              // fila de la grilla (2 a 9) para una hora, en el cartel "semana"
```

Formatos: `semana`, `foto`, `grafico`, `editorial`, `story`.

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
