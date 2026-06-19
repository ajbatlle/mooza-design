---
name: mooza-design
description: Use this skill to generate well-branded interfaces and assets for Mooza — a Chilean cultural events discovery platform (mooza.cl). Contains essential design guidelines, color tokens, typography, logos, and UI components for prototyping or production design.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of `assets/` and create static HTML files for the user to view. Import `styles.css` for all color, type, and spacing tokens. Use the dark navy background (`--bg-base: #03021b`) and yellow accent (`--accent: #fcee21`) as the core visual identity.

If working on production code, copy assets and read the token files in `tokens/` to become an expert in designing with this brand.

Key brand decisions:
- Dark-first: deep navy/purple backgrounds, electric yellow accent
- Spanish language, informal "tú" voice, sentence-case event names
- Fully-rounded pills for buttons and badges
- Event listings: DateBlock (left) + category badge + title + venue/time + PriceTag (right)
- "Gratis" (not "Free") for free events; "$6.000" peso format

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
