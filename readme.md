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

Regla de base: cada elemento ocupa celdas completas, y ningún elemento comparte celdas con otro. Los seis elementos (logo, fecha, titular, número, celda y foto) están medidos en `guidelines/elementos.html`.

Siete columnas. Todo se mide en porcentaje del ancho del cartel, así que la regla sirve en cualquier formato.

| Variable | Valor | Rango |
|---|---|---|
| `--mz-m` margen | 6 | 3 a 12 |
| `--mz-g` medianil | 1,2 | 0,6 a 3,5, y como máximo la mitad del margen |
| `--mz-col` columna | (100 − 2 × margen − 6 × medianil) ÷ 7 | 11,5 con los valores estándar |
| `--mz-mv-story` | 2,2 | El margen vertical de 9:16 es 2,2 veces el margen, con tope de 18 % |

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
| claro | `#f2f2f2` | Neutro de story |

Pares de texto verificados (contraste WCAG): noche sobre blanco 20,4, sobre claro 18,2, sobre amarillo 16,9 y sobre naranja 11,1. Blanco sobre azul 17,1 y amarillo sobre azul 14,1. No usar blanco como texto sobre naranja (1,8) ni naranja sobre amarillo (1,5).

En el cartel "semana" el código de celdas es: amarillo para destacado, blanco para gratis y noche para de pago.

### Tipografía

- Las palabras van en Newsreader 500: titulares, nombres de evento, sala y artista.
- Los números van en Inter Tight: fechas, horas, precios y el número grande del cartel (peso 500 a 600, cifras tabulares).
- Las etiquetas van en Inter Tight 600, en mayúsculas y con tracking +0,14 em.
- Ambas fuentes tienen licencia abierta (OFL) y se cargan desde Google Fonts.
- El titular lleva tracking −0,035 em e interlínea 0,9 a 0,93. El número grande, tracking −0,05 em.

### Logo

El logo oficial no se redibuja. Se usan los archivos de `assets/logos/` y las variantes monocromas de `kit/marca/`.

- Posición: en todo cartel la última fila de la grilla es el pie. El logo va ahí, a la izquierda, con el ancho exacto de dos columnas y apoyado en el borde inferior de la fila. La fecha va a la derecha, con su línea base en ese mismo borde. Nada más entra en esa fila, así que el logo nunca choca con otro elemento.

- Colores: noche sobre claro, blanco, amarillo y naranja. Blanco sobre azul y noche. La versión oficial con degradé, solo sobre noche o azul.
- Espacio libre: media altura del logo por los cuatro lados.
- Tamaño mínimo: 96 px de ancho en pantalla y 25 mm en impresión. Por debajo se usa solo el ícono, de al menos 24 px.
- No deformarlo ni girarlo, no usar el degradé sobre amarillo, naranja o blanco, no recolorearlo fuera de la paleta, no ponerlo sobre una foto sin duotono y no agregarle sombras ni efectos.

### Forma

Ángulos rectos. Todo es celda, así que el radio de borde es 0. No hay sombras, degradados ni iconos: el único símbolo es el ícono de la marca.

### Imagen

Una foto por pieza, encajada en celdas completas de la grilla y sin llegar nunca al borde. Mientras no haya fotografía de Mooza, el lugar de la foto lo ocupa un cuadrado azul con la etiqueta "foto del evento". Reglas de recorte en `kit/fotos/README.md`.

### Ilustración

Mooza suena a musa, y las ilustraciones lo dicen sin ser literales: nueve dibujos de trazo fino, a una tinta o en duotono, donde cada musa aparece por un objeto y no por una figura.

| Dibujo | Musa | Categoría |
|---|---|---|
| lira | Erato | Música |
| aulós (flauta doble) | Euterpe | Música |
| máscaras | Melpómene y Talía | Teatro |
| tela en movimiento | Terpsícore | Danza |
| rollo y pluma | Calíope | Letras y arte |
| ánfora con greca | Clío | Arte |
| luna con estrellas | Urania | Ornamento |
| ojo con rayos | Polimnia | Cine |
| laurel | Sin musa | Ornamento y cierre |

Cada dibujo tiene cuatro versiones: `tinta` (una sola tinta), `amarillo` y `naranja` (tinta noche con un campo de color desplazado unos píxeles, sobre fondos claros) y `noche` (tinta clara con campo amarillo, sobre noche y azul). Reglas: uno por pieza, de al menos 96 px de lado, y reemplaza a la foto cuando el evento no tiene una. Nunca va sobre una foto. Están en `kit/ilustraciones/`.

### Fotos en duotono

Las fotos se convierten a dos colores de la paleta: las sombras toman el color oscuro y las luces el claro. Hay seis paletas (`noche-amarillo`, `noche-naranja`, `azul-amarillo`, `azul-naranja`, `azul-claro` y `noche-claro`), una por pieza. El procedimiento, la herramienta en el navegador y el script por lotes están en `kit/duotono/`. Los filtros para web, en `components/duotono/duotono.js`.

### Movimiento

Transiciones de 0,15 s en estados interactivos y escala 0,98 al presionar. Sin rebotes, parallax ni marquesinas. Todo se desactiva con la preferencia de movimiento reducido.

## Carteles

Una idea por cartel y mucho blanco. Seis diseños sobre la misma grilla. Siempre son siete columnas, y la última fila es el pie (logo a la izquierda, fecha a la derecha). Los constructores están en `components/grid/poster.js` y las plantillas editables en `kit/plantillas/`.

| Diseño | Qué muestra | Formatos |
|---|---|---|
| titular | Solo el titular, arriba a la izquierda | 4:5, A3, 1:1, 16:9 |
| número | El rango de la semana, enorme | 4:5, A3, 1:1, 16:9 |
| foto | Una foto, el nombre del evento y una línea de datos | 4:5, A3, 1:1, 16:9 |
| semana | Siete días en una tira, el destacado relleno | 4:5, A3, 1:1, 16:9 |
| agenda | Un día por lámina y hasta tres eventos. Para el carrusel semanal | 4:5, A3 |
| story | Categoría, nombre, datos y foto | 9:16 |

Filas por formato: 9 en 4:5, 11 en A3, 8 en 1:1, 4 en 16:9 y 16 en 9:16. El carrusel semanal de Instagram se arma con una portada (titular), una o más láminas de agenda por día y un cierre (titular).

## Propuesta web

`guidelines/web.html` es una portada para mooza.cl: hero amarillo con el titular, la semana en siete columnas (un bloque por evento, amarillo si es destacado y blanco si es gratis), lista con filtros, destacado con foto en duotono y pie. Los eventos sin foto usan la ilustración de su categoría. Está hecha sin ver el sitio actual, que no estaba accesible: se apoya en lo que esta documentación dice de la plataforma (búsqueda, categorías y agenda semanal).

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
| `components/duotono/` | Duotono con los colores de la marca, para canvas y como filtros SVG |
| `guidelines/index.html` | Referencia navegable del sistema, con la grilla ajustable |
| `guidelines/elementos.html` | Los seis elementos (logo, fecha, titular, número, celda y foto): tamaño, posición y qué pueden tocar |
| `guidelines/web.html` | Propuesta de portada para mooza.cl con el sistema |
| `kit/` | Recursos gráficos: plantillas, grillas, celdas, marca, fotos, ilustraciones y duotono |
| `assets/logos/` | Logos oficiales |
| `uploads/` | Archivos originales de la marca (logos editables, paleta y posts) |

## Qué cambió respecto de v1

- Fuera: Sora, DM Sans, JetBrains Mono, Material Symbols, la escala de azules, las sombras, los botones en píldora y el degradé del fondo.
- Entra: la grilla de siete días como motivo, Newsreader e Inter Tight, el campo de color plano por cartel y los ángulos rectos.
- Se mantiene: la voz en español con tuteo, "Gratis", el formato de precios, la hora en 24 horas, las etiquetas en mayúsculas y el logo.
