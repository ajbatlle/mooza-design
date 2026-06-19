# Mooza Design System

## Company

**Mooza** (mooza.cl · @mooza_cl) is a Chilean cultural events discovery platform. It aggregates and curates *panoramas y eventos culturales en Chile* — concerts, jazz, theater, dance, exhibitions, cinema, and more — organized into weekly cultural agendas. The product tagline is **"Tu semana cultural"** (Your cultural week).

The platform serves a Chilean audience discovering what to do in their city, with a strong focus on Santiago's cultural scene.

---

## Products

1. **mooza.cl** — Web platform for event discovery, search, and browsing by category, location, and date
2. **Weekly Social Agenda** — Instagram carousel posts (@mooza_cl) curated weekly with the cultural agenda

---

## Sources

- `uploads/Logo Mooza Editable_*.svg` — Official logo files (9 variants: horizontal/vertical/iso × color/white/B&W)
- `uploads/Paleta de colores-10.svg` / `.png` — Official brand color palette document
- `uploads/mooza rrss.jpeg` — Social media post (weekly agenda, 15–21 June)
- `uploads/mooza rrss1.jpeg` — Social media post (weekly agenda, 15 March)
- Website: mooza.cl (domain from brand assets; not crawled)
- Instagram: @mooza_cl

---

## CONTENT FUNDAMENTALS

### Voice & Tone
Mooza speaks **in Spanish** with the warm, knowledgeable energy of a culturally plugged-in friend who knows your city's hidden gems. The tone is **friendly, accessible, and insider** — never corporate.

- **Language**: Spanish. No English except in brand context (mooza.cl URL, handle).
- **Pronouns**: Informal "tú/tus" — "Tu semana cultural", "Toda la agenda en mooza.cl". Personal and direct.
- **Personality**: Curator-as-friend. Enthusiastic but understated — lets the events speak for themselves.

### Casing & Typography Conventions
- **Event titles**: Sentence case, lowercase-dominant — `"4sure (no doubt) en casa elisa pizza bar, peñaflor"`. Not title-cased.
- **Category labels**: ALL CAPS — `MÚSICA`, `TEATRO`, `CINE`, `ARTE`, `DANZA`.
- **Composite badges**: Dot-separated — `DESTACADO • MÚSICA`, `DESTACADO • EVENTO`.
- **Section labels**: ALL CAPS — `AGENDA CULTURAL`.
- **Platform copy**: Lowercase CTA — `"Toda la agenda en mooza.cl"`.

### Numbers & Pricing
- **Chilean peso format**: `$6.000` (period as thousands separator, no decimals).
- **Range pricing**: `"desde $5.000"` (lowercase "desde").
- **Free events**: `"Gratis"` (not "Free", not "GRATIS").
- **Week ranges**: `"15 — 21 junio"` (en-dash with spaces, month lowercase).
- **Time format**: `"22:00"` (24h).
- **Venue format**: `"Venue • HH:MM"` (bullet separator between name and time).

### No emoji
The Mooza brand uses **no emoji** in UI contexts. Category labels and status indicators use text pills only.

---

## VISUAL FOUNDATIONS

### Color System
Mooza is **dark-first**. The entire visual identity is built on a rich dark navy/purple backdrop with electric yellow as the dominant accent and warm orange as a complement.

| Token | Hex | Role |
|---|---|---|
| `--color-yellow` | `#fcee21` | Primary accent — CTAs, featured, logo icon, highlights |
| `--color-orange` | `#fbb03b` | Warm accent — gradient pair, secondary warmth |
| `--color-navy` | `#1b1444` | Primary surface — event cards, nav backgrounds |
| `--color-dark` | `#03021b` | Base background — deepest dark |
| `--color-light` | `#f2f2f2` | Light neutral — light-mode base, subtle light fills |

**Background treatment**: Social posts show a subtle radial gradient from `#221d42` (center) to `#0a0c18` (edges) — not flat black, but a deep purple-navy depth. In the app icon (logo-icon-gradient.svg), the gradient is `#221d42 → #17152f → #0d0e1e → #0a0c18`.

### Typography
Two Google Fonts families — one for display impact, one for legibility:

| Token | Family | Role |
|---|---|---|
| `--font-display` | **Sora** | Headlines, hero copy, large titles. Use 700–800. |
| `--font-sans` | **DM Sans** | UI text, body copy, labels, metadata. Use 400–600. |
| `--font-mono` | **JetBrains Mono** | Code, technical content. Use 400–500. |

- **Display / Headlines**: Sora ExtraBold 800, tracking `−0.015em`, line-height `1.15`.
- **Body / UI**: DM Sans, weight 400–600, optimised for long-form readability and small sizes.
- **Category labels**: DM Sans Bold 700, uppercase, letter-spacing `0.14em`.
- **Metadata / secondary**: DM Sans Regular 400, `rgba(255,255,255,0.65)`.

### Cards & Surfaces
- **Regular event rows**: No card background — float on base surface with `1px rgba(255,255,255,0.07)` dividers.
- **Featured events ("DESTACADO")**: Rounded card `border-radius: 14px`, lighter navy bg (`--bg-surface-raised: #221d55`).
- **Date blocks**: Dark inset squares (`--bg-base`), `border-radius: 10px`, large white ExtraBold day number.
- **Featured date blocks**: Yellow fill (`--accent`), dark text.

### Border Radius
- Buttons & pills: `border-radius: 9999px` (fully round)
- Cards: `12–14px`
- Date blocks: `10px`
- Inputs: `9999px` (pill)
- Avatar: `9999px`

### Shadows
Dark-on-dark elevation system. Shadows use `rgba(3, 2, 27, …)` — very subtle on dark backgrounds. No aggressive drop shadows.

### Animation & Motion
- **Transitions**: `0.15s ease` for most interactive states (hover, focus, active).
- **Hover (buttons)**: Slightly brighter accent color (`--accent-hover: #fdf060`).
- **Press states**: Scale down `0.97` for tactile feel.
- **No aggressive motion**: Brand assets show no bounces, parallax, or marquees.
- **Reduced motion**: Always respect `prefers-reduced-motion`.

### Backgrounds & Imagery
- Brand assets are **purely typographic** — no photography or illustration.
- The logo mark (double-arc location pin / heart) appears as a large ghost watermark (`~15% opacity`) in social post backgrounds.
- Event photography (venue/performance photos) would be warm-toned where used, but is not part of the core brand assets.

### Layout
- **Mobile-first**: Social posts are 1080×1350 portrait; platform is likely mobile-optimized.
- **Horizontal padding**: `24px` (`--pad-page`).
- **List rhythm**: Events separated by `1px` dividers, `14px` vertical padding per row.
- **Header**: logo left-aligned, metadata/controls right-aligned.

---

## ICONOGRAPHY

### Material Symbols Outlined
The design system uses **[Material Symbols Outlined](https://fonts.google.com/icons)** (Google Fonts) as the standard icon library — variable font, thin/outline style (`wght 200`, `FILL 0`).

**Load via `styles.css`** (already included in `tokens/icons.css`) — no extra `<link>` needed.

**Usage — HTML:**
```html
<span class="icon">search</span>
<span class="icon icon-lg">location_on</span>
```

**Usage — React/JSX:**
```jsx
<span style={{
  fontFamily: "'Material Symbols Outlined'",
  fontSize: 22,
  fontVariationSettings: "'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 24",
  lineHeight: 1,
}}>search</span>
```

**Icon vocabulary** (see `guidelines/icons-material.card.html` for full showcase):

| Icon name | Use |
|---|---|
| `search` | Search input |
| `location_on` | Venue / address |
| `schedule` | Event time |
| `calendar_today` | Date |
| `confirmation_number` | Ticket / entry |
| `arrow_back` | Back navigation |
| `close` | Dismiss / close |
| `favorite` | Save event |
| `share` | Share event |
| `music_note` | Música category |
| `theater_comedy` | Teatro category |
| `movie` | Cine category |
| `palette` | Arte category |

**The Mooza brand mark** (double-arc location-pin) is a separate custom icon — see `assets/logos/logo-iso-color.svg`.

---

## FILE INDEX

### Tokens (`tokens/`)
| File | Contents |
|---|---|
| `tokens/colors.css` | Brand palette + semantic aliases (bg, text, accent, border) |
| `tokens/typography.css` | Google Fonts import, font families, size scale, weights, tracking |
| `tokens/spacing.css` | 4px-grid spacing scale, semantic gaps/pads, border-radius, layout |
| `tokens/shadows.css` | Elevation shadows, yellow/orange glow tokens, inner shadows |

### Foundation Cards (`guidelines/`)
Brand + token specimen cards shown in the Design System tab.

### Components (`components/core/`)
| Component | Description |
|---|---|
| `Button` | Primary/secondary/ghost/warm — fully-rounded, uppercase |
| `Badge` | Category + status labels (MÚSICA, DESTACADO, Gratis) |
| `DateBlock` | Day number + abbreviated day name block |
| `PriceTag` | Event price pill — outlined for paid, yellow fill for Gratis |
| `EventCard` | Full event row — composes DateBlock + Badge + PriceTag |
| `Input` | Search/text input — pill shape, yellow focus ring |
| `CategoryChip` | Filter chip for category rows |

### UI Kit (`ui_kits/platform/`)
Interactive recreation of the Mooza event discovery platform — home feed, event detail, category filtering.

### Assets (`assets/`)
| Path | Contents |
|---|---|
| `assets/logos/` | 9 logo SVG variants (horizontal/vertical/iso × color/white/B&W + gradient icon) |
| `assets/mooza-rrss.jpeg` | Social media sample (June agenda) |
| `assets/mooza-rrss1.jpeg` | Social media sample (March agenda) |
