# Site theme: dark mode and the toggle

Historical source and review record. See the [retained-source notice](../README.md). File paths, commands, and asset availability below describe the earlier kit, not current production.

Every ejmlabs site has a light and a dark theme, one toggle in the same place on every page, and one remembered choice across all *.ejmlabs.com sites. This file is the catalog entry for the theme parts. Open `web/theme.html` to see the toggle, the colors and the main surfaces in both themes. `web/patterns.html` and `web/starter.html` already carry the toggle.

The theme is part of `web/site.css` (the part file is `web/parts/20-dark.css`) plus one small script, `web/theme.js`. There is no page CSS to write. If you build a page from the named parts and the band role variables, it already works in both themes.

## What to add to a page

In the head, after the theme-color meta tag, load the script synchronously. Synchronous is on purpose: it sets the theme before the first paint, so there is no flash of the wrong theme. The content security policy only needs `'self'` scripts.

```html
<meta name="theme-color" content="#F6F5EF">
<script src="/design-kit/web/theme.js"></script>
```

In the header, put the navigation and the toggle together in the tools wrapper, with the toggle last, so it sits at the far right on every site. The toggle markup is identical everywhere:

```html
<header class="ejm-header ejm-page">
  <a class="ejm-header__logo" href="/"><span class="ejm-logo" role="img" aria-label="ejmlabs"></span></a>
  <div class="ejm-header__tools">
    <details class="ejm-menu">
      <summary><span class="ejm-menu__label">Menu</span></summary>
      <nav class="ejm-nav" aria-label="Main">...</nav>
    </details>
    <button class="ejm-theme-toggle" type="button" data-theme-toggle aria-pressed="false"><span class="ejm-icon ejm-icon--moon" aria-hidden="true"></span><span class="ejm-sr">Dark mode</span></button>
  </div>
</header>
```

The label never changes. `aria-pressed` says whether dark mode is on. The icon is a moon while the page is light (it offers dark) and a sun while the page is dark (it offers light); the icon swap comes from the pressed state in CSS, so there is nothing to update by hand. Without JavaScript the toggle stays hidden and the page follows the system setting.

## Classes added

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-header__tools` | Inside every `ejm-header`: wraps the navigation (or the `ejm-menu`) and the theme toggle, so the toggle is at the far right. | Never put anything else after the toggle. | A plain flex row. The Menu button and the toggle stay side by side under 640 px; only the link list collapses. |
| `ejm-theme-toggle` | Once in every header, as the last child of `ejm-header__tools`. | As a general icon button, or more than once in a header. | A real `button`, 44 by 44 px, with `data-theme-toggle`. The visible label is "Dark mode" for screen readers (in `ejm-sr`) and never changes. `aria-pressed` reflects dark. Keyboard focus draws a 2 px ring in the text color. Under 640 px it gets a border to match the Menu button. Forced colors use ButtonText and CanvasText. Hidden when the page has no `data-theme` (no script). |
| `ejm-icon--moon`, `ejm-icon--sun` | Modifiers of `ejm-icon` for `icons/moon.svg` and `icons/sun.svg`. The toggle uses the moon and swaps to the sun by itself. | Do not set the sun in the toggle markup. | Decorative: `aria-hidden="true"`. |
| `ejm-logo` (`--mono`, `--large`, `--spaced`) | The full logo in a header, footer or band, as a `span` with `role="img"` and an `aria-label`. The wordmark takes the surrounding text color and the symbol stays Sage, so one element works on Paper, Mist, dark grounds, Forest and Ink. | The ground is Sage: use `--mono` so the symbol follows the text. For a logo that must be a file, keep the `img` approach with `logos/ejmlabs-primary.svg` (light grounds) or `logos/ejmlabs-paper.svg` (dark grounds); the primary file does not adapt to dark. | It is a CSS mask of `logos/ejmlabs-ink.svg`. Clear space is half the symbol height: headers and bands already pad for it, and `--spaced` adds it around a lone logo. Height is 40 px (`--large` is 48 px; the sticky header uses 36 px). Under forced colors it draws in CanvasText. When it sits inside a link, give the link the accessible name or let the logo supply it. |
| `ejm-logo--cli`, `ejm-logo--ide`, `ejm-logo--harness` | Add to `ejm-logo` for a product header or studio project listing. Each uses its canonical project mask and true aspect ratio. | Keep the studio header and footer as `ejm-logo` without a project modifier. | Use `aria-label="cli"`, `"ide"`, or `"harness"` with `role="img"`. Inside an explicitly named link, the span can be `aria-hidden="true"`. The mark stays Sage and the name follows `currentColor`; add `ejm-logo--mono` on Sage. All variants keep the existing header sizing and forced-color support. |
| `ejm-scheme` (`--light`, `--dark`) | A specimen or preview that must show one theme whatever the page theme is, such as the side-by-side panes on `web/theme.html`. | Do not use it to theme a real section of a site: the site follows the visitor's choice. | For `--dark`, add `ejm-ui` and `data-theme="dark"` to the same element so the dark theme colors are defined inside it. The pane paints its own ground and text color. |

## How the cookie and the script work

`theme.js` is about 100 lines with no dependencies. It runs in the head and does this:

1. Reads the saved choice. If there is none, it follows the system setting (`prefers-color-scheme`) and keeps following it, live, until the visitor picks a theme.
2. Sets `data-theme="light"` or `data-theme="dark"` on the `html` element.
3. Wires every `[data-theme-toggle]` button with one delegated click listener, so buttons present at load or added later work. It keeps `aria-pressed` in sync. A control with `data-theme-set="dark"` (or `light`) sets that theme directly; the specimen page uses it.
4. Saves the choice when the visitor uses a toggle.
5. Updates the `meta name="theme-color"` tag. The authored color is the light color. Add a `data-dark` attribute to the tag when the top of your page keeps one color in both themes; otherwise dark uses the page ground, #131614.
6. Dispatches a `CustomEvent` named 'ejm-themechange' on `document` when the theme changes, with `detail.theme`.
7. Crossfades with `document.startViewTransition` when the browser has it and the visitor has not asked for reduced motion. The transition CSS is in the motion part.

`window.ejmTheme` has three methods: `get()` returns 'light' or 'dark', `set('dark')` changes and saves the theme, `toggle()` flips it. A query string `?theme=dark` or `?theme=light` overrides the saved choice for that page view and is never saved. Use it for screenshots and tests.

### Cookie contract

| Setting | Value |
| --- | --- |
| Name | `ejm-theme` |
| Value | `light` or `dark`. No cookie means the visitor has not chosen. |
| Domain | `.ejmlabs.com`, set when the host is ejmlabs.com or ends with .ejmlabs.com, so the choice carries across ejmlabs.com, cli., ide. and harness. |
| Path | `/` |
| Max-Age | 31536000 (one year) |
| SameSite | `Lax` |
| Secure | Added on https. |
| Other hosts | localhost and any other host use `localStorage` with the same key. All storage calls are in try and catch, so a blocked store only means the choice is not kept. |

The cookie is first party, holds no personal data and is read only by the page script. Other sites on the family can read it the same way: match `ejm-theme=(light|dark)` in `document.cookie`.

## How the dark theme is built

Colors are written once. A set of custom properties named `--ejm-theme-*` holds each themed color as `light-dark(light value, dark value)`, and the page switches halves with `color-scheme`. `color-scheme: dark` comes from `html[data-theme="dark"]` (set by the script) or, for visitors with no script, from the system setting. The dark values are the application theme roles from `ui/theme.css` (`--ejm-ui-*`); no new colors were added. Browsers without `light-dark()` simply stay light.

| Surface | Light | Dark |
| --- | --- | --- |
| Page and Paper bands | Paper | `--ejm-ui-ground` (#131614) |
| Mist bands, announcement bar, figure frame | Mist | `--ejm-ui-editor` (#1c211d) |
| Cards, project cards, surfaces | Paper with a hairline | `--ejm-ui-raised` with a `--ejm-ui-line-strong` hairline |
| Terminal | Ink | `--ejm-ui-raised` |
| Code block | Forest with Paper text | `--ejm-ui-editor`, or `--ejm-ui-raised` inside a Mist band; no outline, the tone does the work |
| Text, muted text | Ink, Forest | `--ejm-ui-text`, `--ejm-ui-text-muted` |
| Links, quiet second beat on a page ground | Forest | `--ejm-ui-accent` |
| Primary button | Sage with Ink text, hover Forest | Sage with Ink text, hover a lighter Sage (30 percent white) |
| Focus ring | Forest | `--ejm-ui-focus` (Sage) on buttons, the text color elsewhere |
| Form field | white, Forest border | `--ejm-ui-editor`, `--ejm-ui-control-border` |
| Sage panels and Sage bands | Sage with Ink text | unchanged: they keep Sage and Ink in both themes |
| Forest hero, Forest bands | Forest with Paper text | unchanged |
| Ink bands and the footer | Ink | unchanged |

Reversed surfaces (Sage panels and bands, Forest, Ink, the harness project card) switch back to `color-scheme: light` inside themselves, so every part placed on them keeps its light look. Cards and terminals return to the page theme wherever they sit, except cards inside a Sage band, which stay Paper.

### Motifs in dark

Each motif file follows the surface it sits on. Paper and Mist bands use the Ink file for grid, dots, contour, ripple and stripe, and the dark tile when tiled. Echo, flow, orbit and signature only exist in Paper and Forest, so on a dark page a Paper or Mist band that carries one of them becomes a Forest panel with Paper text; the roles follow, so the text stays readable. The Paper hero uses the Forest orbit in dark. Sage panels keep their Sage symbol art.

## Contrast, measured

Measured with a script from the real color values (WCAG ratios). Text needs 4.5:1, large type and field borders need 3:1. Every row passes.

### Dark theme

| Pair | Colors | Ratio | Needs |
| --- | --- | --- | --- |
| Body text on page ground | #e3e5dc on #131614 | 14.32:1 | 4.5:1 |
| Body text on Mist band (editor) | #e3e5dc on #1c211d | 12.85:1 | 4.5:1 |
| Body text on card (raised) | #e3e5dc on #262c27 | 11.21:1 | 4.5:1 |
| Strong text on page ground | #f6f5ef on #131614 | 16.68:1 | 4.5:1 |
| Muted text on page ground | #a8b4a2 on #131614 | 8.43:1 | 4.5:1 |
| Muted text on Mist band (editor) | #a8b4a2 on #1c211d | 7.56:1 | 4.5:1 |
| Muted text on card (raised) | #a8b4a2 on #262c27 | 6.60:1 | 4.5:1 |
| Link and accent text on page ground | #b8c6aa on #131614 | 10.15:1 | 4.5:1 |
| Accent text on Mist band (editor) | #b8c6aa on #1c211d | 9.10:1 | 4.5:1 |
| Accent text on card (raised) | #b8c6aa on #262c27 | 7.95:1 | 4.5:1 |
| Quiet tag text on tint | #b8c6aa on #2f4a3e | 5.39:1 | 4.5:1 |
| Quiet display line on page ground (large) | #b8c6aa on #131614 | 10.15:1 | 3:1 |
| Code text on code block (editor) | #e3e5dc on #1c211d | 12.85:1 | 4.5:1 |
| Code text on code block inside a Mist band (raised) | #e3e5dc on #262c27 | 11.21:1 | 4.5:1 |
| Placeholder (muted) on field (editor) | #a8b4a2 on #1c211d | 7.56:1 | 4.5:1 |
| Disabled button text (muted) on panel | #a8b4a2 on #1c211d | 7.56:1 | 4.5:1 |
| Primary button: Ink on Sage | #202721 on #8A9A7B | 5.09:1 | 4.5:1 |
| Primary button hover: Ink on lighter Sage | #202721 on #adb8a3 | 7.40:1 | 4.5:1 |
| Tag: Ink on Sage | #202721 on #8A9A7B | 5.09:1 | 4.5:1 |
| Sage panel and band: Ink text on Sage | #202721 on #8A9A7B | 5.09:1 | 4.5:1 |
| Sage panel: second beat Forest on Sage (large only) | #29443B on #8A9A7B | 3.52:1 | 3:1 |
| Forest band: Paper text on Forest | #F6F5EF on #29443B | 9.69:1 | 4.5:1 |
| Forest band: Mist muted text on Forest | #E8EDE3 on #29443B | 8.90:1 | 4.5:1 |
| Forest-lit motif band: Paper on Forest | #F6F5EF on #29443B | 9.69:1 | 4.5:1 |
| Paper hero over Forest orbit: muted lead on Forest | #a8b4a2 on #29443B | 4.90:1 | 4.5:1 |
| Paper hero over Forest orbit: accent beat on Forest (large) | #b8c6aa on #29443B | 5.89:1 | 3:1 |
| Ink band: Mist text on Ink | #E8EDE3 on #202721 | 12.85:1 | 4.5:1 |
| Focus ring (Sage) on page ground | #8a9a7b on #131614 | 6.06:1 | 3:1 |
| Focus ring (Sage) on card (raised) | #8a9a7b on #262c27 | 4.75:1 | 3:1 |
| Focus ring (Sage) on Mist band (editor) | #8a9a7b on #1c211d | 5.44:1 | 3:1 |
| Field border on page ground | #6a7c6c on #131614 | 4.09:1 | 3:1 |
| Field border on card (raised) | #6a7c6c on #262c27 | 3.20:1 | 3:1 |
| Theme toggle icon (text) on page ground | #e3e5dc on #131614 | 14.32:1 | 3:1 |
| Card edge (decorative) on page ground | #465349 on #131614 | 2.25:1 | decorative |

### Light theme (unchanged parts, for reference)

| Pair | Colors | Ratio | Needs |
| --- | --- | --- | --- |
| Body text: Ink on Paper | #202721 on #F6F5EF | 14.00:1 | 4.5:1 |
| Muted text: Forest on Paper | #29443B on #F6F5EF | 9.69:1 | 4.5:1 |
| Muted text: Forest on Mist | #29443B on #E8EDE3 | 8.90:1 | 4.5:1 |
| Primary button: Ink on Sage | #202721 on #8A9A7B | 5.09:1 | 4.5:1 |
| Primary button hover: Paper on Forest | #F6F5EF on #29443B | 9.69:1 | 4.5:1 |
| Sage panel: Ink on Sage | #202721 on #8A9A7B | 5.09:1 | 4.5:1 |
| Focus ring (Forest) on Paper | #29443B on #F6F5EF | 9.69:1 | 3:1 |
| Field border (Forest) on Paper | #29443B on #F6F5EF | 9.69:1 | 3:1 |

## Adding dark support to a new pattern

1. Take text, surface and line colors from the band role variables: `--ejm-fg` for text, `--ejm-muted` for quiet text, `--ejm-ground` for the surface behind it, `--ejm-hairline` for borders. Buttons read `--ejm-btn-bg`, `--ejm-btn-fg`, `--ejm-btn-bg-hover`, `--ejm-btn-fg-hover` and `--ejm-btn-ring`.
2. Never write a literal brand color (`--ejm-paper`, `--ejm-mist`, `--ejm-ink`, `--ejm-forest`) for text or a surface. That is what breaks in dark.
3. If a part needs its own surface, add a `light-dark()` custom property next to the `--ejm-theme-*` ones and use it. Keep the light half equal to the light look that exists today.
4. Use `currentColor` for icons, borders and focus rings so they follow the text color.
5. If the part has an image that is not a color (a motif file), pick the dark-surface file. Use the switch pair `--ejm-dk` and `--ejm-lt`: `var(--ejm-dk, url(light-file)) var(--ejm-lt, url(dark-file))`.
6. Do not set `background:` as a shorthand on a band or hero; use `background-color`, or the motif utilities lose their image.
7. Check it with `?theme=dark` and `?theme=light`, then run the contrast pairs for any new color combination. Add a new class to this catalog.

## Known limits

- The cookie only crosses sites under ejmlabs.com. Preview hosts and localhost keep their own choice.
- `ejmlabs-primary.svg` used as an image does not adapt; use `ejm-logo`.
- The echo, flow, orbit and signature motifs turn a Paper or Mist band into a Forest panel in dark until Ink versions of those four files exist.
