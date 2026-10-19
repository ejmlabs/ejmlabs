# Catalog

Build by choosing. Every part of an ejmlabs experience has a name and a place in this kit, so there is nothing to invent. Find what you are building, then pick from the list it points to. If the part you need is missing, the kit is incomplete: add the part here, then use it.

## What are you building?

| You are building | Choose from | Start from | See it |
| --- | --- | --- | --- |
| A website or landing page | `web/PATTERNS.md` | `web/starter.html` | `web/patterns.html` |
| A docs site or long article | `ejm-docs`, `ejm-article`, `ejm-prose` in `web/PATTERNS.md` | `web/starter.html` | `web/patterns.html` |
| A product demo on a site (every product site needs one) | `web/DEMOS.md` | the markup in `web/DEMOS.md` | `web/demos.html` |
| Dark mode, motion, screen sizes, analytics (every site) | `web/THEME.md`, `web/MOTION.md`, `web/RESPONSIVE.md`, `web/ANALYTICS.md` | `web/starter.html` | `web/theme.html`, `web/motion.html`, `web/responsive.html` |
| A desktop or web app | `ui/PRIMITIVES.md` | `ui/index.html` markup | `ui/index.html` |
| A terminal app | `ui/TUI.md`, `ui/rust/ejm_tui.rs` | `ui/rust/ejm_theme.rs` | `ui/tui.html` |
| An editor or terminal theme | `ui/monaco/`, `ui/terminal/` | The file for your tool | `ui/index.html` |
| A social post, slide or printed piece | `templates/`, `lockups/`, `social/` | The closest template | `index.html` |

## The parts

| Part | What it is | Where it is defined |
| --- | --- | --- |
| Logo and symbol | Full logo, symbol, and clear space | `logos/`, rules in `README.md` |
| Color | Five brand colors and white | `tokens/brand.css`, `tokens/palette.json` |
| App theme | Roles for surfaces, text, status, diff and syntax, dark and light | `ui/theme.json` (the only source) |
| Type | Manrope for words, IBM Plex Mono for names and values | `tokens/brand.css` |
| Spacing, radius, motion | Named steps | `tokens/brand.css`, `tokens/design-tokens.json` |
| Motifs | Nine decorative families, in four surfaces each | `motifs/`, `MOTIFS.md` |
| Icons | Fourteen interface icons | `icons/`, `ICONS.md` |
| Brand components | Buttons, fields, tags, cards, code, prose | `components/`, `COMPONENTS.md` |
| Site patterns | Page shell, heroes, sections, docs layout | `web/site.css`, `web/PATTERNS.md` |
| Theme toggle and dark mode | One toggle, far right of the header, remembered across `*.ejmlabs.com` | `web/theme.js`, `web/THEME.md` |
| Motion | Tokens, reveals, entrances, feedback, view transitions | `web/parts/30-motion.css`, `web/motion.js`, `web/MOTION.md` |
| Screen sizes | Stepped column from a 320px phone to a 5120px ultrawide, safe areas | `web/parts/40-responsive.css`, `web/RESPONSIVE.md` |
| Product demos | Simulated, interactive ejm-cli, ejm-ide and ejm-harness | `web/demo.js`, `web/demos/`, `web/DEMOS.md` |
| Analytics | Cloudflare Web Analytics on every site, cookieless | `web/analytics.js`, `web/ANALYTICS.md` |
| App primitives | Forms, feedback, data, navigation, overlays | `ui/app.css`, `ui/PRIMITIVES.md` |
| Terminal widgets | Screens, status, hints, lists, tables, progress | `ui/rust/ejm_tui.rs`, `ui/TUI.md` |
| Templates | Project post, short thought, image frame | `templates/` |

## Rules for choosing

1. **Pick the surface first.** Websites use the brand palette and site patterns. Apps use the app theme and `ejm-ui` primitives. Terminal apps use the terminal roles. A terminal preview (`ejm-term`) may appear on a site to show a product.
2. **Sage leads.** The brand guide centers Sage: hero panel, primary buttons, tags, the symbol. Paper and Mist carry the page, Ink carries type, and Forest is a quiet accent for one panel at most, hover and link color.
3. **One hero, one motif family per surface.** Choose a motif for mood from the table in `MOTIFS.md`, and never combine families.
4. **Use the part as designed.** Do not restyle it, and do not add CSS to a page or an app. Each part carries its own states, spacing and accessibility.
5. **Name what exists, nothing more.** Copy describes real products. Never invent customers, numbers or launches.
6. **If nothing fits, extend the kit.** Add the part to `web/site.css`, `ui/app.css`, `ui/rust/ejm_tui.rs` or `ui/theme.json`, document it in the matching catalog, and rebuild. Then use it.

## Keeping the kit complete

The site test fails when a class in a style sheet is missing from the catalogs, when a catalog names a class that does not exist, when generated theme files are stale, or when contrast drops. Run it before sharing the kit:

```sh
node scripts/check-kit.mjs                       # the kit agrees with itself
node scripts/check-site.mjs <page.html>          # a page uses the kit properly (add --require demo on product sites)
node scripts/shoot.mjs <url>                     # every device size, 320px to 5120px, fails on overflow
cd ../site && npm test
```
