Category filter chip for horizontally-scrollable filter rows above event listings.

```jsx
<CategoryChip label="Todos" active />
<CategoryChip label="Música" />
<CategoryChip label="Teatro" />
<CategoryChip label="Cine" />
<CategoryChip label="Arte" />
<CategoryChip label="Danza" />
```

Active state renders yellow fill. Inactive shows subtle outline; hover brightens to yellow.
Typically rendered in a flex row with `overflow-x: auto` and `gap: 8px`.
