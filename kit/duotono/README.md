# Fotos: tinta azul con transparencia y duotono

## Modo oficial: tinta azul con transparencia

La foto se convierte a un PNG de un solo color, el azul `#1b1444`, con el canal alfa tomado de la luminancia: sombras opacas, luces transparentes. Se apoya sobre una zona lisa amarilla o naranja. En el navegador: `index.html` (modo "Tinta azul con transparencia"). Por lotes: `python3 kit/duotono/duotono.py foto.jpg` (sin `--paleta`). En web o canvas: `MoozaDuotono.aplicarTinta()` y `MoozaDuotono.filtroTinta()` (`components/duotono/duotono.js`).

## Alternativa: duotono de dos colores

Las fotos se convierten a dos colores de la paleta: las sombras toman el color oscuro y las luces el claro.

## Procedimiento

1. Escala de grises por luminancia (0,2126 R + 0,7152 G + 0,0722 B).
2. Niveles: el punto negro y el blanco salen de los percentiles 1 y 99. Después se ajustan los medios tonos (gamma) y el contraste (curva en S suave).
3. Mapa de degradado de dos colores, interpolado en sRGB entre la sombra y la luz.
4. Grano muy sutil (2 %), opcional, para que el plano no se vea digital.

## Paletas

| Nombre | Sombra | Luz | Cuándo |
|---|---|---|---|
| `azul-amarillo` | `#1b1444` | `#fcee21` | La principal. Fotos de eventos |
| `azul-naranja` | `#1b1444` | `#fbb03b` | La más cálida |
| `azul-claro` | `#1b1444` | `#f2f2f2` | Un solo tono: la foto se lee como tinta sobre papel |

## Cómo usarlo

- En el navegador: abre `kit/duotono/index.html`, elige la foto y la paleta, y descarga el PNG. No sube nada a internet.
- Por lotes: `python3 kit/duotono/duotono.py carpeta/ --paleta azul-amarillo --lado 1600 --grano 0.02` (requiere Pillow y numpy).
- En una web: `MoozaDuotono.filtros()` entrega filtros SVG y se aplican con `filter:url(#mz-duo-azul-amarillo)` sobre cualquier imagen (ver `components/duotono/duotono.js`).

## Reglas

- Una paleta por pieza. No mezclar duotonos distintos en el mismo cartel.
- La foto entra en celdas completas de la grilla, como indica `kit/fotos/README.md`.
- Elige la paleta según el fondo: sobre amarillo o naranja usa `azul-claro`, para que la foto no se pierda en el campo.
- Para que funcione, la foto original necesita buen rango de luces y sombras. Si se ve plana, sube el contraste antes de exportar.
