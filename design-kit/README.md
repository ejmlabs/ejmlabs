# ejmlabs design kit

Version 1.2.0. Built from the six-page ejmlabs brand guide, version 1.0, October 2026.

Open `index.html` for the visual reference. Download the complete package from `ejmlabs-design-kit.zip`. All assets and fonts are local. Using the kit needs no build step or external service. Only editing `ui/theme.json` needs Node, to regenerate the files that carry its colors.

Version 1.1.0 adds four motif families, two signature lockups, three editable layouts, fourteen interface icons, web components, a Sage and Forest X kit, and a swag concept collection. These are new applications of the identity. Source rules and artwork remain unchanged.

Version 1.2.0 adds the rules that make every product look the same. The site kit (`web/`, `SITES.md`) defines the page shell and sections for websites. The application kit (`ui/`, `UI.md`) defines one dark and light theme and the components for desktop, web and terminal apps, with generators for CSS, Rust (ratatui), Monaco and six terminal emulators. `ui/TUI.md` is the terminal app guide.

## Start here

- Not sure what to use? Open `CATALOG.md`. It says what to choose for a website, an app, a terminal app or a printed piece, and lists every part.

- Use `logos/ejmlabs-primary.svg` on Paper or Mist.
- Use `logos/ejmlabs-ink.svg` for one-color light-background work.
- Use `logos/ejmlabs-paper.svg` on Forest.
- Keep the symbol and complete lowercase name together in the full logo.
- Use the standalone symbol for avatars and icons.
- Load `tokens/brand.css` for the palette, complete local fonts, type scale, and web tokens.
- Use `favicon/favicon.svg` and the supplied PNG/ICO files for browser and device icons.
- Use `social/avatar.png` for profiles and `social/social-card.png` for link previews.
- Choose one motif family from `motifs/` for a cover or backdrop. Read `MOTIFS.md` before combining it with copy.
- Use `lockups/` for a ready-made logo and signature composition, and `templates/` for project posts, the studio signature or a short thought, and imagery.
- Building a website? Copy `web/starter.html` and follow `SITES.md`. Load `web/site.css` after `components/brand-components.css` and write no CSS of your own.
- Building an app? Load `ui/theme.css` and `ui/app.css` and follow `UI.md`. Terminal apps follow `ui/TUI.md` and copy `ui/rust/ejm_theme.rs`. Open `ui/index.html` to see everything in both themes.
- Open `components/index.html` for reusable web parts and `icons/sheet.svg` for the fourteen interface icons.
- Open `social/x-kit/index.html` for the dedicated X assets, placement guidance, and profile copy.
- Use `swag/mockups/` to review the apparel and accessory direction, then read `swag/PRODUCTION.md` and `swag/artwork/README.md` for production artwork and placement.

## Contents

| Folder or file | Contents |
| --- | --- |
| `logos/` | Primary, Ink, and Paper full logos; Sage, Ink, and Paper symbols. Every variant has an SVG and a transparent PNG. |
| `favicon/` | SVG, ICO with 16/32/48 px images, individual 16/32/48 px PNGs, 180 px Apple touch icon, 192/512 px Android icons, and a web manifest. |
| `social/` | A 1024 x 1024 avatar and a 1200 x 630 social card, each in SVG and PNG. Social-card text is outlined in its SVG. |
| `social/x-kit/` | Dedicated X profile kit with Sage and Forest artwork, banner layouts, and usage guidance. |
| `social/ejmlabs-x-kit.zip` | The self-contained X kit as a separate download. |
| `motifs/` | Signature crop, Echo, Flow, and Orbit families. Each has Forest and Paper SVGs and 1600 x 900 PNGs. |
| `lockups/` | Forest and Paper signature lockups in SVG and PNG, each at 1200 x 500. |
| `templates/` | Project announcement, signature or short-thought, and image-frame layouts. Production SVGs and PNGs are 1600 x 900; editable SVGs are in `templates/editable/`. |
| `swag/mockups/` | Apparel, accessories, and glassware concept boards. These are visual references, not manufactured products or production artwork. |
| `swag/PRODUCTION.md` | Material, placement, artwork, and supplier guidance for swag. |
| `swag/artwork/` | Eight sized SVG artwork masters and their production-use guide. |
| `components/` | A local HTML specimen and optional CSS for web controls and content patterns. |
| `icons/` | Fourteen individual interface SVGs and a visual sheet. |
| `MOTIFS.md` | Motif families, composition, and usage guidance. |
| `COMPONENTS.md` | Component setup, examples, and accessibility guidance. |
| `SITES.md` | Site kit rules: page anatomy, class reference, writing, motion and accessibility. |
| `CATALOG.md` | The map of every part and how to choose between them. |
| `web/` | `site.css` page shell, heroes, sections and docs layout; `PATTERNS.md` catalog; `patterns.html` live specimen; `starter.html`, the page to copy for a new site. |
| `UI.md` | Application kit: roles, setup, layout, states, motion and accessibility. |
| `ui/` | `theme.json` (the one source of color), generated `theme.css`, Rust module, Monaco themes and terminal schemes, plus `app.css` primitives, `PRIMITIVES.md` catalog, `TUI.md` guide, `rust/ejm_tui.rs` terminal helpers, and the specimens `index.html` and `tui.html`. |
| `social/` | Sage edition first: `social-card.*` and `avatar.*` are the Sage defaults (Ink symbol on Sage); `social-card-sage.*`, `social-card-forest.*`, `avatar-sage.*` and `avatar-forest.*` are the named variants. The X kit in `social/x-kit/` is Sage first with Forest and Paper alternates. |
| `lockups/`, `templates/` | Sage signature lockup (`signature-sage.*`) and Sage project template (`project-sage.*`) join the Forest and Paper ones. |
| `scripts/build-social.mjs` | Rebuilds the Sage social and X assets. Needs Chrome; optionally Python with fontTools for outlined text. |
| `scripts/check-site.mjs`, `scripts/check-kit.mjs` | The shared checkers. `check-site.mjs <page.html>` verifies a page uses the kit properly; `check-kit.mjs` verifies the kit agrees with itself. |
| `scripts/build-motifs.mjs` | Generates the five newer motif families (grid, dots, contour, ripple, stripe) in four surfaces, plus tiles. Run with `--check` to verify. |
| `scripts/build-ui.mjs` | Checks contrast and regenerates every file in `ui/` that carries colors. Run with `--check` to verify. |
| `ICONS.md` | Icon names, drawing rules, and accessible use. |
| `fonts/` | Complete Manrope variable font, complete IBM Plex Mono Medium font, and their original OFL licenses. |
| `tokens/brand.css` | CSS custom properties and local `@font-face` declarations. Font URLs are relative to the CSS file. |
| `tokens/palette.json` | Exact colors and independently checked contrast ratios. |
| `tokens/design-tokens.json` | Typography, clear space, source dimensions, spacing, layout, and motion values with provenance. |
| `reference/ejmlabs-brand-guide.pdf` | An unchanged copy of the supplied source. |
| `reference/extraction-report.json` | Source hash, exact geometry bounds, contrast results, and export dimensions. |
| `REVIEW.md` | Page-by-page findings and the distinction between source rules and added kit settings. |

Full-logo PNGs are 2400 px wide. Transparent symbol PNGs are 1024 px wide. Their heights follow the original artwork's proportions.

## Logo rules

Source: guide page 2.

The complete logo contains the fancy e symbol followed by the full lowercase name, `ejmlabs`. The wordmark is custom vector artwork. Do not recreate it by typing the name in Manrope.

- Full logo: leave at least half the symbol's height clear on every side.
- Standalone symbol: leave at least one quarter of the symbol's width clear on every side.
- The guide shows a full logo at 180 px wide and a symbol at 24 px. These are its small-size examples; it does not state a hard minimum.
- Use the dedicated 16 px favicon export in browser tabs.
- Keep proportions, drawing, and spacing intact.

The SVG view boxes fit the actual artwork. They do not include the required external clear space. The avatar and favicon canvases include the standalone symbol's quarter-width clear space.

The logo was recovered directly from the PDF's native paths. All 10 paths, 537 cubic segments, and 12 subpaths remain intact. No tracing, raster conversion, or wordmark recreation was used. Cubic coordinates retain the PDF's decimal values. Fill colors use the guide's exact hex values.

The native full-logo bounds are approximately 2373.014489 x 405.467475 units. The native symbol is approximately 417.547904 x 381.139451 units. Exact cubic extrema and the source PDF hash are in `reference/extraction-report.json`.

## Color

Source: guide page 3.

| Color | Hex | Use |
| --- | --- | --- |
| Sage | `#8A9A7B` | The lead color: signature symbol, hero panels, primary buttons, tags. Ink text on Sage is an approved pair |
| Forest | `#29443B` | The quiet accent: readable text and links, hover states, and one reversed panel at most |
| Ink | `#202721` | Primary reading color |
| Paper | `#F6F5EF` | Primary light surface and reversed artwork |
| Mist | `#E8EDE3` | Quiet secondary surface |
| White | `#FFFFFF` | Utility exports and interface text |

The approved reading pairs pass WCAG AA for normal text:

| Pair | Contrast |
| --- | --- |
| Ink on Paper | 14.00:1 |
| Paper on Forest | 9.69:1 |
| Ink on Sage | 5.09:1 |
| Forest on Mist | 8.90:1 |

Sage on Paper is 2.75:1. Use it for logo artwork and decoration. Use Ink or Forest for readable text. Contrast was recalculated from the exact sRGB values using WCAG relative luminance.

## Typography

Source: guide page 4. Use sentence case and generous line spacing.

| Role | Family | Weight | Size / line height |
| --- | --- | --- | --- |
| Display | Manrope | 600 | 48 / 54 px |
| Heading | Manrope | 600 | 32 / 40 px |
| Body | Manrope | 400 | 16 / 26 px |
| Caption | Manrope | 400 | 14 / 20 px |
| Technical | IBM Plex Mono | 500 | 12 / 18 px |

Use IBM Plex Mono for code, versions, and short labels. `Manrope-Variable.ttf` contains the complete font with a 200-800 weight axis. The brand uses 400 and 600. `IBMPlexMono-Medium.ttf` is the complete 500-weight font. The matching `.woff2` files are the same fonts converted to WOFF2 for the web, about a third of the size, with no glyphs removed, so the original licenses still apply and travel with them in `fonts/`. `tokens/brand.css` loads WOFF2 first and the TTF second, and defines `Manrope Fallback` and `IBM Plex Mono Fallback`, which set Arial and Courier New to the same widths and line metrics so text does not shift when the web font arrives. `font-synthesis: none` is on by default, so a weight the font lacks is never faked.

The PDF's embedded font subsets are not distributed as web fonts. The supplied files were downloaded from the official Google Fonts repository with their original licenses.

## Graphic language and voice

Sources: guide pages 1 and 5.

- Studio description: An independent studio for small experiments, useful software, and open source tools.
- Signature phrase: Small experiments. Useful things.
- Use the symbol as a graphic: crop, repeat, and leave room.
- Keep the complete logo on project pages. Keep the symbol clear in avatars.
- Allow each project to have its own images.

## Motifs and composition

Version 1.1.0 extends the guide's crop-and-repeat direction with four motif families. These compositions are decorative assets, not new logos.

| Family | Use |
| --- | --- |
| Signature crop | A close crop of the original symbol for covers, section openers, and brand backdrops. |
| Echo | Repeated forms for launch graphics and dividers. |
| Flow | Continuous paths for wide covers, progress, and exploration. |
| Orbit | Elliptical paths for experiments and connected ideas. These are decorative, not scientific plots. |

Each family has `-forest` and `-paper` variants. SVGs remain editable; PNGs are 1600 x 900 px. See `MOTIFS.md` for the complete usage guide.

- Use one motif family per composition.
- Leave generous open space. Keep busy parts away from copy.
- Use the complete logo in its own clear area to identify the studio. A cropped motif does not replace it.
- Preserve the six source colors. Use the approved reading pairs for text.
- Keep motif color treatments within the supplied palette and preserve the original drawing.
- Keep project imagery in its own frame. It may have its own colors.

## Lockups and templates

`lockups/signature-forest.svg` and `lockups/signature-paper.svg` place the original logo and signature phrase together on 1200 x 500 canvases. Matching PNGs are ready to share. Treat the composition as a layout; the official logo geometry remains in `logos/`.

The three templates are new, editable 1600 x 900 compositions:

- `templates/editable/project-forest.svg`: a project announcement with a headline and short description.
- `templates/editable/quote-paper.svg`: the source signature, Small experiments. Useful things., paired with a cropped symbol. Keep the signature or replace it with a short thought.
- `templates/editable/image-frame.svg`: a large image area with a separate brand signature.

Replace sample copy and imagery before publishing. Keep text within its intended area, preserve logo clear space, and check the finished layout at the size people will read it. Use the SVGs in `templates/editable/` for editing, then export a PNG for social uploads. The SVGs directly in `templates/` have outlined text for consistent production rendering. Matching PNGs show the supplied starting compositions.

## Swag concepts and artwork

The collection applies the same Sage, Forest, Ink, Paper, Mist, and utility White palette to shirts, sweaters, fleece, hoodies, socks, hats, beanies, eyewear, and drinkware.

- `swag/mockups/apparel-collection.png`: the apparel concept board.
- `swag/mockups/accessories-collection.png`: the accessories concept board.
- `swag/mockups/glassware.png`: Studio glass etched tumblers and Flow glass highballs.
- `swag/PRODUCTION.md`: production methods, placement, and supplier guidance.
- `swag/artwork/README.md`: the exact vector artwork and instructions for its use.

The concept images explore appearance, materials, and placement. They are not manufactured products, stock photography, or files to print directly. Use the exact vector artwork for print, embroidery, and engraving. Choose the blank garment or object with the supplier, confirm the material and color match, and approve a physical sample before ordering a run.

## Interface building blocks

`components/brand-components.css` extends `tokens/brand.css` with reusable web parts. Open `components/index.html` to see the component specimen, then follow `COMPONENTS.md` for setup and use. The CSS is optional; the original tokens remain useful on their own.

`icons/` contains fourteen matching functional SVGs. See `icons/sheet.svg` for the set and `ICONS.md` for accessible use. Use functional icons with clear labels, and reserve the original ejmlabs symbol for brand identity.

The X kit is at `social/x-kit/index.html`. Its separate ZIP is `social/ejmlabs-x-kit.zip`. Use those canvases for X profiles and posts rather than stretching the general social card.

## Added web settings

The guide does not define web layout, spacing steps, corner radii, responsive behavior, or animation. This kit adds a small set of named values in CSS and JSON:

- Spacing: 4, 8, 12, 16, 24, 32, 48, 64, 96, and 128 px.
- Radii: 4, 12, 24, and 999 px.
- Layout: 1200 px content width, 24 px mobile gutter, 48 px desktop gutter.
- Motion: a 32-second ambient cycle, linear ambient motion, and 180 ms interface transitions.
- Accessibility: show a static composition when reduced motion is requested. Pause animation while the page is hidden. Cap canvas pixel ratio at 2.

These are implementation defaults, not claims about the source guide. The website may tune its mathematical parameters while keeping motion calm and the brand signature clear.

The browser and social exports are new applications of the extracted artwork. The PDF refers to such files but does not embed them. The original shape is preserved, including in the small favicon.

Motifs, lockups, templates, interface icons, web components, the X kit, and swag concepts are also kit additions. They are not presented as content extracted from the PDF. `REVIEW.md` records that distinction.

## Web use

```html
<link rel="stylesheet" href="/design-kit/tokens/brand.css">
<link rel="icon" href="/design-kit/favicon/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/design-kit/favicon/favicon.ico" sizes="16x16 32x32 48x48">
<link rel="apple-touch-icon" href="/design-kit/favicon/apple-touch-icon.png">
<link rel="manifest" href="/design-kit/favicon/site.webmanifest">
<meta name="theme-color" content="#F6F5EF">
<meta property="og:image" content="https://YOUR-DOMAIN/social/social-card.png">
<img src="/design-kit/logos/ejmlabs-primary.svg" alt="ejmlabs" width="351" height="60">
```

Use your actual public URL for social metadata. For a 60 px high full logo, the symbol is about 56.4 px high, so leave at least 28.2 px clear around the logo. Do not change its width and height independently.

## Sources and licenses

The original guide is retained in `reference/`. The logo and brand remain the owner's supplied artwork. No new license is asserted over the identity.

Manrope and IBM Plex Mono use the SIL Open Font License 1.1. Keep the original `Manrope-OFL.txt` and `IBMPlexMono-OFL.txt` with redistributed font files. The license text governs use and redistribution.

Official sources, retrieved 18 October 2026:

- Manrope project page: https://fonts.google.com/specimen/Manrope
- Manrope complete font: https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf
- Manrope license: https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt
- IBM Plex official project: https://github.com/IBM/plex
- IBM Plex Mono complete Medium font: https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/IBMPlexMono-Medium.ttf
- IBM Plex Mono license: https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/OFL.txt
- WCAG contrast guidance: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
