# Gallery parts

The parts that build the brand gallery (`index.html` at the kit root) and the pattern catalog (`web/patterns.html`). Both pages are made only from kit classes plus the gallery parts below (every class name starts with ejm-gallery-), with the same three style sheets, the kit head scripts and no page CSS. The parts live in `web/parts/60-gallery.css` (built into `web/site.css`) and load last, so every name is specific to the gallery. Sites do not need them; they exist so a page that shows assets, color, type and downloads stays open and calm. For the principles they follow see `web/OPEN.md`.

All parts read the band role variables (`--ejm-ground`, `--ejm-fg`, `--ejm-muted`), the tone variables from the open layer (`--ejm-tone`, `--ejm-tone-alt`) and brand tokens. There are no literal colors and no breakpoints of their own: layout answers to the width of its container with container queries, and to `clamp()`. Wrap a group of parts in `ejm-gallery-block`, which is the container they measure.

## Layout

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-gallery-block` | Around each group of gallery parts inside an `ejm-page`: a grid of assets, the swatches, the scale. It names the container (`gallery`) the parts below respond to, and spaces blocks apart. | Around a whole band, or nested in another block. | A plain grid. Put the block's heading, a sentence, then the content in it. Blocks are separated by whitespace, not rules. |
| `ejm-gallery-grid` (`--2`, `--3`, `--lead`, `--tail`, `--wide-left`) | Assets or short text blocks side by side. One column on a narrow container, then two from 40rem and three from 64rem. `--lead` lets the first child span every column, `--tail` the last. `--wide-left` is a 2 to 1 split. | More than three across, or items that need different widths each time. | Never more than three per row. Children are `ejm-gallery-asset` or `ejm-stack`. |
| `ejm-gallery-specimens` | The wrapper for the patterns in one catalog group, under the group's `ejm-head`. | Anywhere else. | Holds `ejm-pattern` sections; the open layer spaces them. |

## Assets and stages

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-gallery-stage` (`--tone`, `--paper`, `--mist`, `--sage`, `--forest`) | A tonal ground, 24 px round, behind an asset or a specimen. `--paper`, `--mist`, `--sage` and `--forest` keep their brand color in both themes, so a logo always sits on a ground it is approved for. Plain and `--tone` follow the page. | On a ground the asset is not approved for: the Paper logo only on Forest or Ink. | A grid that centers its content. An `img` child is capped at 28rem. Give the image real `alt`. A linked tag inside a Sage stage turns Ink. |
| `ejm-gallery-stage--avatar` | A square avatar on a stage. | Any other image. | Caps the image at 14rem and rounds it. |
| `ejm-gallery-asset` (`--hero`) | One downloadable thing: a stage or an image, then a caption with its downloads. `--hero` gives the stage more room, for the primary logo. | A text-only block; use `ejm-stack`. | A `figure`. Parts: `__media` (a rounded image or a link around one), `__pair` (two images on a tonal ground, for the Forest and Paper versions of a motif), `__caption` (name left, downloads right; `__caption--stack` stacks a heading, a sentence and the downloads), `__name` (semibold) and `__meta` (muted size or note beside the name). |
| `ejm-gallery-asset__media`, `ejm-gallery-asset__pair`, `ejm-gallery-asset__caption`, `ejm-gallery-asset__name`, `ejm-gallery-asset__meta` | The parts of an asset, as above. | Outside `ejm-gallery-asset`. | A caption's downloads are an `ejm-tags` list of `a.ejm-tag` with `download`. Add an `ejm-sr` span so the link names what it downloads. |

## Color

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-gallery-swatches` | The palette as large soft tiles. Two across on a narrow container; from 40rem Sage takes a 2 by 2 block and the other four sit beside it. | More than five colors. | A grid. Put `ejm-gallery-swatch--lead` on the first swatch. |
| `ejm-gallery-swatch` (`--sage`, `--forest`, `--ink`, `--paper`, `--mist`, `--lead`) | One color. A `button` with `data-copy="#HEX"` copies the value (see `web/gallery.js`). | Any non-color content. | The name is `__name`, the hex `__hex` (mono, selects in one click without script). Always set `aria-label="Copy Name, #HEX"`. Paper and Mist get a faint inset edge, the one ring in the kit: a light sample must show its own boundary. |
| `ejm-gallery-pairs`, `ejm-gallery-pair` (`--paper`, `--forest`, `--sage`, `--mist`) | Approved text and ground pairs with their contrast ratio. | Pairs that fail; do not show them. | A `ul`. Each item has `__sample` ("Aa", hidden from assistive technology), `__label` (written out, such as "Ink on Paper") and `__ratio` (mono). |
| `ejm-gallery-copy` | A small pill button that copies a value, used with `data-copy` and `ejm-tag`, such as the utility White. | As a general button. | A real `button` with a 44 px target and a visible focus ring. |
| `ejm-gallery-toast` | The one confirmation line, once per page, at the end of `body`. | Any other message. | `role="status"` and `aria-live="polite"`. The script adds `is-shown` for 2.4 seconds. It is an overlay, so it may cast a shadow. |

## Type and icons

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-gallery-specimen` (`--mono`, `__glyph`) | A type family on a stage: a very large "Aa", the name, a sentence and the font download. Put it on an `ejm-gallery-stage`. `--mono` sets the glyph in Plex Mono. | Showing body text; use the scale. | `__glyph` is `aria-hidden="true"`; the name and sentence carry the meaning. |
| `ejm-gallery-scale` (`__row`, `__spec`, `__face`, `__sample`, `__sample--display`, `--heading`, `--body`, `--caption`, `--technical`) | The type scale: size over leading, name and face on the left, a live sample at that size on the right. | A scale you have not set. | A `dl`: the spec is the `dt`, the sample the `dd`. The label sits above the sample under 40rem. |
| `ejm-gallery-icons`, `ejm-gallery-icon` | The kit icons as a plain grid: the icon over its mono name. | Icons with no name. | A `ul` of `ejm-icon` spans (`aria-hidden="true"`) with the name beside them as text. |

## Catalog index

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-gallery-index` (`__group`, `__title`) | The index of the pattern catalog: one row per group, the group name on the left and its pills on the right. | A short list; use `ejm-tags`. | `__title` is an `h3`. Each group holds an `ejm-gallery-chips` list with an `aria-label`. |
| `ejm-gallery-chips` | An `ejm-tags` list that is a horizontally scrolling pill row on a narrow container, so a long list stays one line, and wraps from 48rem. Use it together with `ejm-tags`. | A list people must read in full at once on a phone. | Links keep their 44 px target. The row scrolls by touch and keyboard focus; the scrollbar is hidden. |

## Script

`web/gallery.js` is the only script the gallery adds. It copies the `data-copy` value of a clicked swatch or pill to the clipboard and shows the toast, or selects the hex text when the clipboard is not available. It is about 30 lines, has no dependencies and is safe under the kit content security policy (`'self'`). `index.html` loads it deferred in the head with `data-ejm-app`, which the checker allows for a page's own behavior. Without script the hex values are plain text that selects in one click.

## Using the gallery as a model

A showcase page is a head scripts block (theme, motion, analytics), a sticky header with the menu and the theme toggle and a pill `ejm-subnav`, an `ejm-hero` Sage panel, bands that alternate Paper and Mist with one `ejm-head` each, a Sage closing band and the Ink footer. Inside a band, put one `ejm-gallery-block` per idea. Sage leads (the hero, the download pills, the closing band), Paper and Mist carry the page, Forest appears only as the reversed logo ground and in color specimens.
