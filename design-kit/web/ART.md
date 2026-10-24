# Symbol art and surfaces

Historical source and review record. See the [retained-source notice](../README.md). File paths, commands, and asset availability below describe the earlier kit, not current production.

Illustration and surface treatments for places where other brands would commission artwork. The art is not drawn by hand: `scripts/build-art.mjs` samples the outline of the ejmlabs symbol (`logos/symbol-sage.svg`), turns it into a distance field, and makes the art from its offsets (contour lines at set distances), repeats and crops. It uses only the brand palette: Forest, Sage, Mist and Paper at full or reduced opacity. The result is calm line work that sits behind or beside text. See it live in `web/art.html`.

The parts live in `web/parts/18-art.css` (built into `web/site.css`). Colors come from the band role variables, `--ejm-theme-*` tokens and brand tokens, so every piece follows light and dark. Sage leads: Sage fills and Sage surfaces carry the page, Forest is only the hairline.

## The files

`node scripts/build-art.mjs` writes `art/` and `node scripts/build-art.mjs --check` confirms the files on disk are current (twice in a row gives identical bytes). `node scripts/check-art.mjs` checks every color in `art/` is a brand color, and that text over every gradient surface keeps 4.5 to 1 at the lightest and darkest point, with grain at its strongest. Edit the script, never the SVGs.

| Place | Files in `art/` (each as `-light` and `-dark`) | Size |
| --- | --- | --- |
| Hero | `hero` | 1600 by 900 |
| Dividers | `divider-flow`, `divider-ripple` | 1600 by 150 and 1600 by 140 |
| Empty states | `empty-start` (nothing yet), `empty-search` (no results), `empty-done` (all caught up) | 800 by 500 |
| Error pages | `error-lost` (page missing), `error-fault` (server problem) | 800 by 500 |
| Grain | `grain-light` (Ink specks), `grain-dark` (Paper specks) | 160 by 160 tile |
| Draw-on | `inline/<name>.svg` for every piece above except the hero | paste into the page |

Light files draw Forest hairlines and Sage fills, for Paper, Mist and Sage grounds. Dark files draw Sage hairlines and Mist accents, for Forest, Ink and the dark page. Both are transparent, so there is no pale box on any ground. Files are small: the empty and error pieces are 6 to 23 KB, the hero about 40 KB.

## Art

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-art` (`--hero`, `--flow`, `--ripple`, `--start`, `--search`, `--done`, `--lost`, `--fault`) | You want one of the generated pictures as an image box: a `div` that paints the right file for the theme and keeps its aspect ratio. The modifier names the piece. | You need a picture that carries information, or you want a photo. | Always `aria-hidden="true"` and empty. It is decoration and must never be the only carrier of a message. Put the meaning in the heading and text beside it. |
| `ejm-art--compact` | An empty state or an error page: centres the picture and caps it at 28rem. | A hero or a divider, which should run the width of their container. | Put it above an `h2` or `h3` and one sentence that says what to do next. |
| `ejm-art--on-light`, `ejm-art--on-dark` | The art sits on a ground that does not follow the page theme and the automatic rules do not know it. Sage bands, the hero panel and Sage surfaces already count as light; Forest and Ink bands, the terminal and the Forest surface already count as dark. | The art is on the page ground, a Mist band or a card. Leave it alone and it follows the theme. | Chooses the file, so lines never vanish into their own ground. |
| `ejm-art-frame` (with `ejm-art--cover` on the art) | A panel with the art filling its back, cropped and never stretched, fading out toward the copy so words stay clear. Put the art div first, then the copy. | More than one per page. Never put art behind dense or long text. | The art is `aria-hidden`. The frame is the panel, so give it a ground such as `ejm-surface-gradient`. On phones the art is anchored low and half as strong. |
| `ejm-art-panel` (`--large`) | A padded, rounded panel of copy over a surface or art. `--large` is the hero size: tall, with the copy held to the left 36rem. | Inside another panel. | A grid. Put an eyebrow, a heading, text and a button in it. |

## Draw-on line art

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-art--draw` | The small pieces (empty states, errors, dividers) should draw themselves once when they scroll into view. Paste the file from `art/inline/` into the page: it already carries `ejm-art ejm-art--draw ejm-reveal ejm-reveal--fade`. Lines take their color from the theme. | The hero, or anything very large: it stays an image. Or when it would draw more than once, such as in a list that re-renders. | Inline `svg` with `aria-hidden="true"` and `focusable="false"`. Motion is stroke offset and opacity only, about 1.3 seconds in all, once. The finished art is what you see without script and under reduced motion. |
| `ejm-art__accent`, `ejm-art__fill` | These two are already inside the pasted files: the accent line (Sage on light, Mist on dark) and the soft Sage fill. | Anywhere else. | Part names, not meant to be written by hand. |

How it works. The files carry no colors, only `currentColor` and the two part classes, and every ring is its own `path` with `pathLength="1"`. `18-art.css` sets the colors and the dash. With `html.ejm-js` (added by `motion.js`) and no reduced motion, each path starts undrawn, and when `motion.js` marks the svg `is-visible` (it does this once, through `ejm-reveal`) each path draws in order, 40 ms apart. Without script, `html.ejm-js` never exists, so none of it applies. Under reduced motion the media query does not match, so none of it applies. Print always shows the finished art. The page keeps the pasted copies current: `build-art.mjs` rewrites the files between the `<!-- inline:name -->` markers in `web/art.html`.

## Surfaces

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-surface-gradient` | One large panel needs depth without a photo. The default follows the theme: Paper to Mist with two Sage glows in light, the dark editor tones with a faint Sage glow in dark. | Behind small cards, many panels in a row, or any text that is not Ink on light or the page text on dark. | Sets `color`, `--ejm-fg` and `--ejm-muted` for you. Text over every point of it, with grain, is 4.5 to 1 or better (the light minimum is 4.80 to 1 for the Forest muted text). |
| `ejm-surface-gradient--sage` | The big Sage moment of a page, with Paper and Mist light spilling in. Reversed: it keeps its colors in both themes. | A page that already has a Sage band or hero in view. | Ink text only. Ink on the darkest point is 5.09 to 1 (4.54 to 1 with grain). The button turns Ink. |
| `ejm-surface-gradient--forest` | The one reversed moment: Forest sinking to Ink with a little Sage. Reversed in both themes. | More than once per page. | Paper text, Mist for muted text. Lowest pair is 4.5 to 1 or better, with grain. |
| `ejm-surface-grain` | A fine noise tile laid under the content of a surface, so a large gradient has tooth. Add it to any gradient surface, or to a plain ground. | On a surface smaller than a card, or over text that is not already 4.5 to 1. | A tiny SVG tile (about 450 bytes). Ink specks reach 8 percent alpha, Paper specks 5 percent, and the contrast check includes them. It sits below the content and takes no pointer events. |

Combine them as `ejm-surface-gradient ejm-surface-gradient--sage ejm-surface-grain`. Add `ejm-art-panel` for padding and radius.

## Rules

- One idea per page: a hero picture, one divider style, one large surface. Do not stack them all.
- Art is decorative. Hide it from assistive technology, and never let it carry a message, a status or a label.
- Do not recolor the files or draw your own. If you need a new piece, add it to `build-art.mjs` so it stays inside the palette and reproducible.
- Do not put art or grain under long text. The hero fades out toward the copy; keep copy to a short heading, a lead and buttons.
- Do not animate the art with anything but the draw-on above.
