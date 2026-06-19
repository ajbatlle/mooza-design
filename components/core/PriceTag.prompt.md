Event price display as a pill. Outlined for paid, yellow fill for free events.

```jsx
<PriceTag price={6000} />
<PriceTag price={10000} />
<PriceTag variant="free" />
<PriceTag price={5000} variant="from" />
<PriceTag price="$6.000" />
```

Prices auto-format as Chilean pesos: 6000 → "$6.000" (period as thousands separator).
