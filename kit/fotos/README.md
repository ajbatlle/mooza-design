# Fotos de eventos

Las fotos de Mooza son una tinta azul con transparencia: un PNG de un solo color (el azul `#1b1444`) cuyo canal alfa sale de la luminancia. Las sombras quedan opacas y las luces transparentes. Se apoyan sobre una zona lisa amarilla o naranja, que asoma por las luces. `ejemplo/saxofon-tinta.png` es un ejemplo ya convertido.

## Cómo se prepara una foto

- En el navegador: `kit/duotono/index.html`, modo "Tinta azul con transparencia". Ajusta contraste y medios tonos y descarga el PNG.
- Por lotes: `python3 kit/duotono/duotono.py carpeta/ --salida salida/` (requiere Pillow y numpy).
- A mano, en un editor: pasa la foto a blanco y negro, ajusta niveles, llénala de azul `#1b1444` y usa la luminancia invertida como transparencia.
- Para ver el resultado en los carteles sin escribir código: `guidelines/fotos.html`.

## Reglas

- La zona bajo la foto es plana, amarilla o naranja. Nunca otro color ni degradado.
- La foto ocupa celdas completas de la grilla en los diseños `foto` y `story`, o va a sangre en la zona de color de `titular` y `semana`.
- Un solo recorte por pieza.
- Titular sobre foto solo en blanco y solo donde la foto es oscura (las sombras opacas); sobre las luces, donde asoma el amarillo o el naranja, no se lee.
- Prefiere fotos con buen rango de luces y sombras, y con el motivo bien separado del fondo.
- Si el evento no tiene foto, se usa el marcador (la zona de color con la nota "foto del evento") o la ilustración de su categoría.
- Las fotos de eventos son de sus organizadores: confirma los derechos antes de publicarlas.
