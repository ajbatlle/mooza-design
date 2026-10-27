# Sistema de diseño Mooza

Mooza (mooza.cl, @mooza_cl) reúne y ordena los panoramas y eventos culturales de Chile en una agenda semanal. Su lema es "Tu semana cultural". Esta versión (v2) reemplaza al sistema anterior, que quedó en el historial de git (commit `525959c`).

La idea es una sola: la semana es la grilla. Siete columnas, una por día. Cada cartel, story y pantalla se arma sobre ella, con color plano, palabras en serif y números en grotesca.

## Contenido

- Español, con tuteo ("mira", "ven", "guarda tu plan"). Sin voseo y sin emoji.
- Frases cortas. El cartel dice poco y el evento dice el resto.
- Titulares en serif, minúsculas de frase y sin signos de exclamación: "hay jazz, teatro y cine".
- Nombres de evento, sala y artista en serif y en minúsculas de frase, como hoy.
- Etiquetas de categoría en mayúsculas: MÚSICA, TEATRO, CINE, ARTE, DANZA.
- Fechas: "26 oct – 1 nov", con mes abreviado en minúscula y raya corta con espacios. El rango corto grande se escribe "26–1".
- Hora en 24 horas ("21:00") y lugar con punto medio: "Teatro del Parque • 21:00".
- Precios con punto de miles y sin decimales: "$6.000", "desde $5.000". Gratis se escribe "Gratis".
- Cierre de piezas: "Toda la agenda en mooza.cl".

## Fundamentos visuales

### Grilla

Siete columnas. Todo se mide en porcentaje del ancho del cartel, así que la regla sirve en cualquier formato.

| Variable | Valor | Rango |
|---|---|---|
| `--mz-m` margen | 6 | 3 a 14 |
| `--mz-g` medianil | 1,2 | 0,6 a 4, y como máximo la mitad del margen |
| `--mz-col` columna | (100 − 2 × margen − 6 × medianil) ÷ 7 | 11,5 con los valores estándar |
| `--mz-mv-story` | 2,2 | El margen vertical de 9:16 es 2,2 veces el margen |

Las filas dependen del formato: 9 o 10 en 4:5 y 16 en 9:16. Los titulares y los números se miden en columnas (ver `tokens/grid.css`): al cambiar el margen o el medianil el texto se reajusta y la composición se mantiene. La grilla se puede mostrar sobre cualquier cartel agregando `.mz-show-grid` a un contenedor.

### Color

Cinco colores planos y un neutro. Un cartel tiene un solo campo de fondo, y las celdas llevan los demás. No hay degradados ni sombras.

| Token | Hex | Uso |
|---|---|---|
| noche | `#03021b` | Tinta y fondo base |
| azul | `#1b1444` | Superficie oscura y lugar de las fotos de ejemplo |
| amarillo | `#fcee21` | Acento y fondo de cartel |
| naranja | `#fbb03b` | Segundo campo de cartel |
| blanco | `#ffffff` | Celdas "gratis" y fondo claro |
| claro | `#f2f2f2` | Neutro de story y de cartel editorial |

Pares de texto verificados (contraste WCAG): noche sobre blanco 20,4, sobre claro 18,2, sobre amarillo 16,9 y sobre naranja 11,1. Blanco sobre azul 17,1 y amarillo sobre azul 14,1. No usar blanco como texto sobre naranja (1,8) ni naranja sobre amarillo (1,5).

En el cartel "semana" el código de celdas es: amarillo para destacado, blanco para gratis y noche para de pago.

### Tipografía

- Las palabras van en Newsreader 500: titulares, nombres de evento, sala y artista.
- Los números van en Inter Tight: fechas, horas, precios y el número grande del cartel (peso 500 a 600, cifras tabulares).
- Las etiquetas van en Inter Tight 600, en mayúsculas y con tracking +0,14 em.
- Ambas fuentes tienen licencia abierta (OFL) y se cargan desde Google Fonts.
- El titular lleva tracking −0,035 em e interlínea 0,9 a 0,93. El número grande, tracking −0,05 em.

### Forma

Ángulos rectos. Todo es celda, así que el radio de borde es 0. No hay sombras, degradados ni iconos: el único símbolo es el ícono de la marca.

### Imagen

Una foto por pieza, encajada en celdas completas de la grilla y sin llegar nunca al borde. Mientras no haya fotografía de Mooza, el lugar de la foto lo ocupa un cuadrado azul con la etiqueta "foto del evento". Reglas de recorte en `kit/fotos/README.md`.

### Movimiento

Transiciones de 0,15 s en estados interactivos y escala 0,98 al presionar. Sin rebotes, parallax ni marquesinas. Todo se desactiva con la preferencia de movimiento reducido.

## Composiciones

Cinco formatos, todos con la misma grilla. Los constructores están en `components/grid/poster.js` y las plantillas editables en `kit/plantillas/`.

| Formato | Proporción | Filas | Qué muestra |
|---|---|---|---|
| semana | 4:5 | 10 | Cada celda es un día y una franja horaria de 1,5 h desde las 12:00 |
| foto | 4:5 | 9 | Una foto en celdas completas, dos guías cruzadas y titular serif |
| gráfico | 4:5 | 9 | La semana como horario: cada bloque es un evento y su alto es la duración |
| editorial | 4:5 | 9 | Titular escrito con lo que pasa y cuadrados donde irían las fotos |
| story | 9:16 | 16 | Día activo, categoría, nombre, lugar y foto |

## Uso en código

```html
<link rel="stylesheet" href="styles.css">
<script src="components/grid/poster.js"></script>
<script>
  document.body.insertAdjacentHTML('afterbegin', MoozaPoster.sprite()); // símbolo del logo, una vez
  MoozaPoster.mount(document.querySelector('#cartel'), 'semana');       // con los datos de ejemplo
  // MoozaPoster.mount(el, 'story', { story: { categoria: 'Teatro', titulo: '…', meta: '…', dia: 2 } });
</script>
```

Los datos tienen la forma de `MoozaPoster.EJEMPLO` (semana con eventos que traen hora de inicio y término, precio y destacado). Los eventos, salas y precios de ejemplo son inventados.

## Índice de archivos

| Ruta | Contenido |
|---|---|
| `styles.css` | Punto de entrada: importa tokens y componentes |
| `tokens/` | `colors.css`, `typography.css`, `grid.css` y `tokens.json` |
| `components/grid/` | Estilos y generador de carteles, con vista previa |
| `components/ui/` | Botón, filtro, campo, fecha, precio y fila de evento, con vista previa |
| `guidelines/index.html` | Referencia navegable del sistema, con la grilla ajustable |
| `kit/` | Recursos gráficos: plantillas, grillas, celdas, marca y fotos |
| `assets/logos/` | Logos oficiales |
| `uploads/` | Archivos originales de la marca (logos editables, paleta y posts) |

## Qué cambió respecto de v1

- Fuera: Sora, DM Sans, JetBrains Mono, Material Symbols, la escala de azules, las sombras, los botones en píldora y el degradé del fondo.
- Entra: la grilla de siete días como motivo, Newsreader e Inter Tight, el campo de color plano por cartel y los ángulos rectos.
- Se mantiene: la voz en español con tuteo, "Gratis", el formato de precios, la hora en 24 horas, las etiquetas en mayúsculas y el logo.
