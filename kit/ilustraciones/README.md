# Ilustraciones: las cuatro musas

Euterpe (música), Talía (teatro), Terpsícore (danza) y Calíope (letras). Grabado de línea fina, un solo personaje flotando en S, sin escena ni marco. Se hicieron con los prompts de `prompts-chatgpt.md`.

- `musas/`: los dibujos originales (`Euterpe.png`, `Talia.png`, `Terpsicore.png`, `Caliope.png`), con transparencia, y `musas.svg`, la composición de las cuatro láminas en carta sobre naranjo, amarillo y gris.
- `musas/tinta/`: los mismos dibujos en el azul `#1b1444`, con el alfa residual limpiado. Son los que usa el generador.

Reglas: una musa por pieza, solo sobre una zona de color o sobre el corte entre dos colores, nunca sobre una foto. La tinta es transparente, así que el color de atrás pasa por la figura.

La lámina con el logo y mooza.cl se genera con `MoozaPoster.mount(el, 'musa', {musa: {src: 'musas/tinta/Euterpe.png', colores: ['gris', 'amarillo'], corte: 'v', x: 16.3, y: 8.2}}, 'carta')`.
