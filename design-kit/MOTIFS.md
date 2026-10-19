# Motifs, lockups, and templates

Version 1.1.0 additions to the ejmlabs design kit. The original PDF remains the authority for the identity, palette, type, and clear space. These new assets extend its instruction to crop and repeat the symbol. Flow and Orbit are new geometric companions.

## Four motif families

| Family | Construction | Best use |
| --- | --- | --- |
| Signature crop | The original symbol, enlarged and cropped without changing its paths | Profile headers, project covers, section backgrounds |
| Echo | The original symbol repeated on a staggered tile | Packaging, end cards, quiet background texture |
| Flow | 27 continuous mathematical paths with controlled spacing | Experiments, process notes, motion backdrops |
| Orbit | 23 nested ellipses with a shared centre and rotation | Research, technical covers, large presentation backgrounds |

Each family has a Forest and Paper SVG plus a 1600 x 900 PNG. The SVGs scale without loss. The PNGs are opaque, ready-made backgrounds.

Transparent building blocks are also included:

- `motifs/signature-crop.svg`
- `motifs/echo-tile.svg`, a seamless 480 x 360 tile
- `motifs/flow-lines.svg`
- `motifs/orbit-lines.svg`

## Use with restraint

Choose one motif family per composition. Leave a quiet area for text. Use the complete logo separately, with its prescribed clear space. A background symbol may crop; an avatar or identity signature must remain whole.

Keep geometry proportional. Crop using a frame rather than stretching paths. Use only the supplied palette. Low-contrast motifs are decorative and must not carry information. Put readable text on a quiet surface in Ink on Paper, Paper on Forest, or another approved reading pair.

The Flow and Orbit graphics are geometric artwork. They do not represent measured scientific data, the solar model, or a new logo. Do not place all four motif families together or turn the motif into the identity mark.

## Signature lockups

`lockups/signature-forest` and `lockups/signature-paper` combine the original complete logo with the source signature, “Small experiments. Useful things.” Both include external clear space. Canvas: 1200 x 500.

The original custom wordmark paths are retained. The signature is Manrope. These are composition templates, not replacements for the core logos.

## Project and post templates

All templates are 1600 x 900:

- `templates/project-forest`: project title, description, logo, and cropped symbol. Replace the placeholder copy before publishing.
- `templates/quote-paper`: a ready-to-use signature post. Replace its text for a short quote or project thought.
- `templates/image-frame`: a 1456 x 634 image area at x=72, y=170. Replace the “Project image” placeholder with a real screenshot or image. Keep the logo and margins.

Production SVGs have outlined text. SVGs in `templates/editable/` and `lockups/editable/` retain live text. Install the included fonts before editing those files. Their exact type, size, and placement are carried by the SVG attributes. Keep the original font licenses when redistributing fonts.

## Other building blocks

- `ICONS.md` and `icons/`: a small interface icon family.
- `COMPONENTS.md` and `components/`: opt-in web components and layout recipes.
- `social/x-kit/`: X profile assets, templates, upload guidance, and draft copy.

No social account has been created or changed. Templates do not make product, release, or customer claims.

## Nine motif families

Version 1.2.0 adds five generated families: grid, dots, contour, ripple and stripe. They are built by `node scripts/build-motifs.mjs` (seeded math, no dependencies, identical output every run). `node scripts/build-motifs.mjs --check` confirms the files on disk match the generator and use only palette colors. Edit the script, not the SVGs.

The families listed under "Four motif families" above were drawn separately and are not touched by the generator.

| Family | Mood | Best surface | Works in | Does not work in |
| --- | --- | --- | --- | --- |
| Signature crop | Personal, identity | Forest, Paper | Hero, social, print | Dense data views, small cards |
| Echo | Quiet, repeated | Forest, Paper | Band, packaging, end card, print | Hero art (it is a texture, not a focal piece) |
| Flow | Moving, process | Forest, Paper | Hero, band, social | Tables, forms |
| Orbit | Research, large scale | Paper, Forest | Hero, social, presentation | Small cards, empty states |
| Grid | Precise, technical | Paper, Mist | Hero, band, card, empty state, print | Social posts (too faint when shrunk) |
| Dots | Soft, printed | Paper, Forest | Hero, band, card, social, print | Dense text blocks, small cards |
| Contour | Natural, exploratory | Paper, Mist | Hero, social, print covers | Narrow bands (a single contour reads as a stray line) |
| Ripple | Expanding, resonant | Forest, Ink | Hero, social, end card | Cards, empty states, tables |
| Stripe | Directional, rhythmic | Mist, Ink | Band, card, empty state, social | Hero when text sits on the busy side |

How to read the table: "best surface" is the ground where the family looks most at home, though every generated family ships on Paper, Mist, Forest and Ink. "Does not work in" means the result usually reads as noise or as a mistake. It is not a ban.

## Naming scheme

Generated motifs follow one pattern, so a name tells you what the file is.

- `motifs/<name>-<surface>.svg`: full art, 1600 x 900, opaque. Surfaces are `paper`, `mist`, `forest` and `ink`. The ground is the brand color for that surface. Lines are Forest on Paper and Mist, Sage on Forest and Ink, at low opacity.
- `motifs/<name>-<surface>.png`: the same art as an opaque 1600 x 900 PNG, rendered from the SVG with headless Chrome. The PNGs are not produced by the generator. Regenerate them from the SVGs if the generator changes.
- `motifs/<name>-lines.svg`: transparent, Forest lines at full strength, for layering. Set `opacity` (0.15 to 0.3) on the element or in CSS before placing it on a surface. Lines on a dark surface need a Sage recolor, so use the `-forest` or `-ink` art there instead.
- `motifs/tiles/<name>-tile-light.svg` and `motifs/tiles/<name>-tile-dark.svg`: seamless 240 x 240 tiles with a transparent ground, available for grid, dots and stripe. Light uses Forest lines for light surfaces. Dark uses Sage lines for dark surfaces. Opacity is already baked in at a quiet level. Tiles are decorative and carry `aria-hidden="true"`.

Full-art and lines SVGs carry `role="img"`, a `<title>` and an `aria-label`. When you use one purely as decoration in HTML, put it in CSS (`background-image`) or give an `<img>` an empty `alt`.

### Files per family

| Family | Art (4 surfaces, SVG and PNG) | Lines | Tiles |
| --- | --- | --- | --- |
| grid | `grid-paper`, `grid-mist`, `grid-forest`, `grid-ink` | `grid-lines.svg` | `grid-tile-light.svg`, `grid-tile-dark.svg` |
| dots | `dots-paper`, `dots-mist`, `dots-forest`, `dots-ink` | `dots-lines.svg` | `dots-tile-light.svg`, `dots-tile-dark.svg` |
| contour | `contour-paper`, `contour-mist`, `contour-forest`, `contour-ink` | `contour-lines.svg` | none |
| ripple | `ripple-paper`, `ripple-mist`, `ripple-forest`, `ripple-ink` | `ripple-lines.svg` | none |
| stripe | `stripe-paper`, `stripe-mist`, `stripe-forest`, `stripe-ink` | `stripe-lines.svg` | `stripe-tile-light.svg`, `stripe-tile-dark.svg` |

Contour and ripple have no tile because their large shapes do not repeat without a visible seam.

## Using motifs as CSS backgrounds

Art fills a surface once. Use `cover` and anchor it so the quiet area sits where the text goes.

```css
.hero {
  background: #29443B url("motifs/ripple-forest.svg") right bottom / cover no-repeat;
  color: #F6F5EF;
}
```

Tiles repeat. Use `background-image` with `repeat` on top of a brand color, and keep the tile at its native 240 px.

```css
.band-light {
  background: #F6F5EF url("motifs/tiles/grid-tile-light.svg") repeat;
}
.band-dark {
  background: #29443B url("motifs/tiles/dots-tile-dark.svg") repeat;
}
```

Transparent `-lines` files layer over any ground you choose, for example a photo scrim or a Mist card.

```css
.card {
  background: #E8EDE3 url("motifs/stripe-lines.svg") center / cover no-repeat;
}
```

Keep the lines file faint by setting opacity on a pseudo-element, since `background-image` has no opacity of its own:

```css
.card { position: relative; background: #E8EDE3; }
.card::before {
  content: ""; position: absolute; inset: 0; opacity: 0.2;
  background: url("motifs/stripe-lines.svg") center / cover no-repeat;
}
.card > * { position: relative; }
```

## Contrast and restraint

- Motifs are decoration. They carry no information and may be dropped without loss of meaning.
- Never put body text over a motif that is stronger than low-opacity hairlines. The shipped art is already at that level, so do not raise its opacity.
- Keep the motif behind a surface that holds text at 4.5:1 or better: Ink on Paper, Ink on Mist, Paper on Forest, Paper on Ink. If a heading or paragraph crosses lines, check the result with the lines at their darkest point, not their average.
- Use the quiet side. Grid, dots, ripple and stripe are built with a calm area (the left of the frame for dots, grid and stripe, the upper left for ripple). Put copy there.
- Do not stretch. Scale art with `cover` or a matching aspect ratio, never to a distorted box.

## One motif family per surface

Pick one family for each surface and stay with it. A page may use different families on different surfaces (a Forest hero with Ripple, a Paper footer with Grid), but never stack or mix families on one surface and never show all nine together. Mixing erases the point of a motif, which is to give one surface a single recognisable texture.

## Signature crop on Sage

`motifs/signature-crop-sage.svg` is the signature crop for the hero panel: a lighter tint of the symbol on Sage, the brand's lead color. Ink text on it keeps 5.09:1 or better. Use it behind a Sage panel only; on Paper or Mist use `signature-crop-paper.svg`, and on Forest use `signature-crop-forest.svg`.

## Ink and Mist versions of the older families

Echo, Flow, Orbit and Signature crop now also come in `-ink` and `-mist`, so every family works on every ground: Paper and Mist bands in light mode, and dark pages, where the Ink file sits on the page without turning the band into a Forest panel. These four are recolors of the Paper files (Sage lines on Ink, Forest lines on Mist) and are not part of `build-motifs.mjs`.
