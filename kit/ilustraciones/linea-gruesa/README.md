# Musas en línea gruesa

Segundo estilo de las musas: personajes simples de contorno grueso y pareja, hechos con los prompts de `../prompts-chatgpt.md` (nueva dirección).

- `euterpe.png`: el dibujo, con transparencia.
- `euterpe-tinta.png`: el mismo dibujo en el azul `#1b1444`, con el alfa residual limpiado.
- `euterpe-composicion.png`: la lámina armada sobre naranjo y gris, como la dejó el diseñador.

La lámina con el logo y mooza.cl se genera con `MoozaPoster.mount(el, 'musa', {musa: {src: 'euterpe-tinta.png', colores: ['naranja', 'gris'], corte: 'v', x: 11.5, y: 5.4, ancho: 77.2}}, 'carta')`.
