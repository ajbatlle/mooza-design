# Componentes de interfaz

Piezas de la plataforma mooza.cl, en CSS puro (`ui.css`). Ángulos rectos, color plano y sin sombras. Se diseñan sobre fondo noche o azul. Requiere `styles.css`.

| Clase | Qué es | Notas |
|---|---|---|
| `.mz-btn` | Botón principal | Amarillo con texto noche. Al pasar el cursor, blanco. |
| `.mz-btn--linea` | Botón secundario | Contorno de 1 px. Al pasar el cursor se rellena de amarillo. |
| `.mz-chip` | Filtro de categoría | Mayúsculas con tracking. `aria-pressed="true"` lo rellena de amarillo. |
| `.mz-input` | Campo de texto | Contorno de 1 px. En foco, contorno amarillo de 2 px. |
| `.mz-fecha` | Celda de fecha | Día abreviado y número. `.mz-fecha--destacado` la pasa a amarillo. |
| `.mz-precio` | Precio | Contorno. `.mz-precio--gratis` lo rellena de blanco. No usarlo sobre fondo amarillo o blanco. |
| `.mz-evento` | Fila de evento | Fecha, categoría, nombre en serif, lugar y hora, precio. |

## Reglas

- Los nombres de evento van en serif (Newsreader). Los datos y etiquetas van en grotesca (Inter Tight).
- El foco visible es un contorno naranja de 3 px.
- Las filas de evento se separan con una línea de 1 px y no tienen tarjeta.
- Un solo botón principal por vista.
