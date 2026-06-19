Category and status label pills. Always uppercase text with wide letter-spacing.

```jsx
<Badge label="MÚSICA" variant="category" />
<Badge label="TEATRO" variant="category" />
<Badge label="DESTACADO" variant="featured" />
<Badge label="DESTACADO • MÚSICA" variant="featured" />
<Badge label="Gratis" variant="free" />
<Badge label="PRONTO" variant="muted" />
```

Composite labels use dot-separator: `"DESTACADO • MÚSICA"` — pass as a single label prop.
Use `muted` for inactive or upcoming states.
