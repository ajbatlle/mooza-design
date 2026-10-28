# Fotos de eventos

Las fotos de Mooza son una tinta azul con transparencia: un PNG de un solo color (el azul `#1b1444`) cuyo canal alfa es 255 menos el canal verde de la foto. Las sombras quedan opacas y las luces transparentes. Se apoyan sobre una zona lisa amarilla o naranja, que asoma por las luces. En `ejemplo/` hay dos fotos ya convertidas (`saxofon-tinta.png` y `huara-tinta.png`) y el PSD con el procedimiento (`procedimiento-foto-mooza.psd`).

## Cómo se prepara una foto

- En el navegador: `kit/duotono/index.html`, modo "Tinta azul con transparencia". Ajusta contraste y medios tonos y descarga el PNG.
- Por lotes, para toda imagen que se publique: `python3 kit/duotono/duotono.py carpeta/ --salida salida/ --fondo amarillo` (requiere Pillow y numpy). Guarda el PNG con transparencia y, con `--fondo`, una vista previa JPG sobre amarillo o naranja. Con `--recortar` quita antes las barras oscuras de los bordes, típicas de un pantallazo de Instagram (en un flyer opaco, esas barras se verían como bandas azules). El resultado es idéntico, píxel por píxel, a la máscara del PSD.
- En Photoshop, como en `ejemplo/procedimiento-foto-mooza.psd`: la foto queda abajo; encima, una capa de relleno de color sólido `#1b1444` (Capa, Nueva capa de relleno, Color sólido); la máscara de esa capa es el canal verde de la foto, invertido (en Canales, copia el canal Verde, pégalo en la máscara y invierte con Ctrl+I); se oculta la foto y se exporta en PNG con transparencia. Esos pasos los deduje de las capas del PSD, no de verte hacerlo: lo que sí verifiqué es que la máscara es exactamente 255 menos el canal verde, sin niveles ni curvas.
- Para ver el resultado en los carteles sin escribir código: `guidelines/fotos.html`.

## Reglas

- La zona bajo la foto es plana, amarilla o naranja. Nunca otro color ni degradado.
- La foto ocupa celdas completas de la grilla en los diseños `foto` y `story`, o va a sangre en la zona de color de `titular` y `semana`.
- Un solo recorte por pieza.
- Titular sobre foto solo en blanco y solo donde la foto es oscura (las sombras opacas); sobre las luces, donde asoma el amarillo o el naranja, no se lee.
- Prefiere fotos con buen rango de luces y sombras, y con el motivo bien separado del fondo.
- Si el evento no tiene foto, se usa el marcador (la zona de color con la nota "foto del evento") o la ilustración de su categoría.
- Las fotos de eventos son de sus organizadores: confirma los derechos antes de publicarlas.
