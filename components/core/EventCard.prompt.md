The core Mooza event listing component. Horizontal row with DateBlock left, event info center, PriceTag right.

```jsx
// Standard event row
<EventCard
  day="20" dayName="SÁB"
  category="MÚSICA"
  title="4sure (no doubt) en casa elisa pizza bar, peñaflor"
  venue="Casa Elisa Pizzabar" time="22:00"
  price={6000}
/>

// Featured / DESTACADO event
<EventCard
  day="20" dayName="SÁB"
  category="MÚSICA"
  title="Leo quinteros vuelve al bar de rené"
  venue="Bar de René" time="21:30"
  price={6000} priceVariant="from"
  featured
/>

// Free event
<EventCard
  day="20" dayName="SÁB"
  category="MÚSICA"
  title="Schwenke y nilo en concierto en la casona de la florida"
  venue="La Casona de La Florida" time="18:30"
  priceVariant="free"
  featured
/>
```

Standard events use divider lines between rows. Featured events render as cards with lighter bg.
