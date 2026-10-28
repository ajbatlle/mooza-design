# Componentes de interfaz

Piezas de la plataforma mooza.cl, en CSS puro (`ui.css`). Ángulos rectos, color plano y sin sombras. El tema por defecto es oscuro; con la clase `mz-ui--claro` en el contenedor pasan a fondo gris claro, que es la regla de la marca (gris claro predominante, azul como color principal y el amarillo solo como acento). Requiere `styles.css`.

| Clase | Qué es | Notas |
|---|---|---|
| `.mz-btn` | Botón principal | Amarillo con texto azul. Al pasar el cursor, blanco. |
| `.mz-btn--linea` | Botón secundario | Contorno de 1 px. Al pasar el cursor se rellena de amarillo. |
| `.mz-chip` | Filtro de categoría | Mayúsculas con tracking. `aria-pressed="true"` lo rellena de amarillo. |
| `.mz-input` | Campo de texto | Contorno de 1 px. En foco, contorno amarillo de 2 px. |
| `.mz-fecha` | Celda de fecha | Día abreviado y número. `.mz-fecha--destacado` la pasa a amarillo. |
| `.mz-precio` | Precio | Contorno. `.mz-precio--gratis` lo rellena de blanco. No usarlo sobre fondo amarillo o blanco. |
| `.mz-evento` | Fila de evento | Fecha, categoría, nombre en serif, lugar y hora, precio. |

## Reglas

- Todo va en Geist: los nombres de evento en peso 400 y los datos y etiquetas en peso 500.
- El foco visible es un contorno naranja de 3 px.
- Las filas de evento se separan con una línea de 1 px y no tienen tarjeta.
- Un solo botón principal por vista.
