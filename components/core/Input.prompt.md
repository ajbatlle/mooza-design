Pill-shaped text input for search and form fields. Focus state highlights with yellow border and glow.

```jsx
<Input placeholder="Buscar eventos..." icon="search" />
<Input placeholder="Tu ciudad" size="sm" />
<Input value={query} onChange={e => setQuery(e.target.value)} icon="search" />
```

Focus state changes border to `--accent` yellow with `--glow-yellow-sm`.
