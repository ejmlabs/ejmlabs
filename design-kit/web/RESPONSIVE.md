# Screen sizes

Every ejmlabs site must work from the smallest screens (an iPhone mini at 375 px, old phones at 320 px) to the largest (a 45 inch 21:9 ultrawide at 3440 x 1440, and a 5120 x 1440 super ultrawide). Nothing may feel cramped, clipped, tiny or lost in the middle of an empty screen.

The rules live in `web/parts/40-responsive.css`, which is built into `web/site.css`. It only overrides existing parts and **adds no classes**, so there is nothing new to learn: build pages from `web/PATTERNS.md` and they follow. Open `web/responsive.html` to see the steps live, with a readout of the size you are on.

## The page needs one tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

`viewport-fit=cover` lets the page run under a notch and a home bar. The kit then keeps text, headers and the footer clear of them with `env(safe-area-inset-*)`. Without the tag every inset is 0, the page keeps the browser's default margins around the notch, and nothing breaks, but the full-bleed look on notched phones is lost. Put the tag on every page.

## Breakpoints

Mobile first. The base rules are the phone rules, and each step adds to them.

| Width | Name | Why it exists | What changes |
| --- | --- | --- | --- |
| 320 | Floor | The narrowest phone still in use. | Content is 288 px wide. Under 360 px the header logo is 28 px, and the announcement bar aligns left. |
| 375 | Phone | iPhone mini and most phones. Rules apply up to 419 px. | 16 px gutters. Buttons stack full width. Display type 32 to 48 px. Card padding tightens. |
| 480 | Large phone | Phones that are wide enough for normal headings. | Display, heading and stat sizes step up to their fluid values. |
| 640 | Menu | The menu button gives way to the plain nav (base). | Unchanged here; listed because the header depends on it. |
| 760 | Tablet | Portrait tablets. | 48 px gutters, 24 px hero panel radius, two project columns. |
| 900 | Split | Side by side layouts become useful. | Split, sidebar and docs layouts, two column heads (base). |
| 1240 | Docs | A third column fits. | Docs table of contents sits beside the text (base). |
| 1600 | Wide | Laptops at full width and desktop monitors. | Column 1360 px, gutters 64 px, docs rails 260 px, cards and features need wider columns, hero panel up to 64 percent of the screen height. |
| 1920 | Full HD | The first scaled step. | `--ejm-scale` 1.125, column 1520 px. Type, spacing and radii grow together. |
| 2200 | Ultrawide | 21:9 starts here. | Two column compositions: FAQ and link lists split in columns, projects spread, heads give the heading more room, display headline allows 16 characters. |
| 2560 | QHD | Large monitors. | `--ejm-scale` 1.25, column 1760 px. |
| 3200 | 45 inch, 4K | The LG UltraGear class and 4K. | `--ejm-scale` 1.375, column 2000 px. |
| 4400 | Super ultrawide | 32:9 screens. | `--ejm-scale` 1.5, column 2360 px. |

Other conditions the part answers: `max-height: 500px` (landscape phones and split screens), `pointer: coarse` (touch targets) and `hover: none` (no sticky hover).

## Variables

| Variable | Meaning |
| --- | --- |
| `--ejm-scale` | 1 up to 1919 px, then 1.125, 1.25, 1.375, 1.5. The root font size follows it (`rem` scales), and the type, space and radius tokens are multiplied by it under `.ejm-site`. Fixed pixel sizes in the base part are scaled by hand in the part. Use `calc(Npx * var(--ejm-scale))` for a new fixed size. |
| `--ejm-content-width` | The column: 1200, 1360, 1520, 1760, 2000, 2360 px. The page, panel and sticky header all read it. |
| `--ejm-gutter-step` | The gutter of the current step: 16, 24, 48, then 64 px scaled. |
| `--ejm-page-gutter` | The gutter used by `ejm-page` and the hero panel. It is the step, or a side safe area if that is larger. |

## Device matrix

`scripts/shoot.mjs` runs every page against these screens.

| Name | Size at pixel ratio | What it guards |
| --- | --- | --- |
| iphone-se1 | 320 x 568 at 2 | The narrowest phone. No overflow, no broken words, 200 percent text. |
| iphone-mini | 375 x 812 at 3 | The phone design target, and the top and bottom safe areas. |
| android-small | 360 x 800 at 3 | The most common Android width. |
| iphone-15 | 393 x 852 at 3 | A current phone with a notch. |
| iphone-pro-max | 430 x 932 at 3 | The widest phone. Nothing may stretch. |
| phone-landscape | 812 x 375 at 3 | Short screens, side safe areas, a hero panel that fits the screen. |
| ipad-mini | 744 x 1133 at 2 | Tablet portrait, just under the 760 and 900 steps. |
| ipad-landscape | 1024 x 768 at 2 | Split layouts and side nav with touch input. |
| laptop | 1440 x 900 at 2 | The reference size. |
| desktop-fhd | 1920 x 1080 at 1 | The first scaled step. |
| qhd | 2560 x 1440 at 1 | The column and type keep up. |
| ultrawide-45 | 3440 x 1440 at 1 | 21:9 and curved. Two column compositions, narrow reading text. |
| uhd-4k | 3840 x 2160 at 1 | Wide and tall at once. |
| super-ultrawide | 5120 x 1440 at 1 | 32:9. Must still look intended. |

## Checklist

Small screens:

- [ ] The viewport tag above is on the page.
- [ ] No horizontal page scroll, down to 280 px. Tables and code scroll inside their own box.
- [ ] Gutters are 16 px from 320 to 419 px.
- [ ] Display type fits at 320 px without breaking words. Headings and buttons use `overflow-wrap: break-word`. Only code and long identifiers such as `harness.ejmlabs.com` may break anywhere.
- [ ] Buttons stack full width under 420 px.
- [ ] One column everywhere under 760 px.
- [ ] Every control a finger can reach is 44 px tall and wide, including footer links, logos and the in-page index.
- [ ] Nothing depends on hover. Hover-only effects sit inside `@media (hover: hover)`, and the part switches the base hover effects off where there is no hover.
- [ ] Safe areas: the page, sticky header and footer clear a notch and a home bar.
- [ ] Short screens under 500 px high: the hero panel and header fit in one screen, and the sticky header scrolls away.
- [ ] Any full height block uses `svh` or `dvh`, never plain `vh`, so the browser bars do not clip it. Use `min-block-size: 100svh`.
- [ ] `text-size-adjust` is 100 percent. Layouts survive 200 percent text at 320 px (`EJM_SHOOT_TEXT=2`).

Large screens:

- [ ] The column steps 1200, 1360, 1520, 1760, 2000, 2360 px, and gutters grow with it.
- [ ] Type, spacing and radii scale from 1920 px. The brand scale is untouched below it.
- [ ] Reading text stays near 68 characters per line, and lead text near 54.
- [ ] Grids add columns instead of stretching cards. Card columns have a minimum that scales with the type.
- [ ] The hero panel and display type use the width. The panel follows the column and the signature art covers it.
- [ ] Bands run full width. Motif art covers and is centered, never tiled awkwardly. Tiles scale with the type.
- [ ] Docs gain a wider reading column and a visible table of contents.
- [ ] Figures and images stop growing at a sensible size.
- [ ] At 2200 px and up, long lists use columns, so the page is not a thin strip in a wide window.

## How to run the tool

```
node scripts/shoot.mjs <url> [--out dir] [--only name,name] [--theme dark|light] [--full]
```

It starts headless Google Chrome, loads the page at each screen in the matrix, waits for fonts, and saves a PNG per screen. It prints a table with the page height, the scroll width, whether the page overflows, and the number of tap targets under 44 px on touch screens. It lists each offending element with its position. The exit code is 1 when any screen overflows.

- `--out dir` sets where PNGs go. The default is a folder in the system temp directory.
- `--only` runs some of the names above.
- `--theme dark` adds `?theme=dark` to the address and asks the browser for the dark color scheme.
- `--full` saves the whole page as strips of up to 2400 CSS px, named `page-name-1.png`, `page-name-2.png`. Without it you get one PNG per screen, cut off at 16000 device pixels of height. The table marks a cut page with a plus sign.

Pages are shot with reduced motion so entrance animations cannot hide content. Touch screens also emulate a coarse pointer without hover, and iPhone sizes get a simulated notch and home bar.

Environment variables for one-off checks:

| Variable | Effect |
| --- | --- |
| `EJM_SHOOT_EXTRA` | Extra screens, `name:WxH@dpr`, comma separated, `t` after the ratio for touch. Example: `fold:280x653@2t`. |
| `EJM_SHOOT_TEXT` | Multiplies every font size, for example 2 for 200 percent text. |
| `EJM_SHOOT_CAP` | Keeps only the top N CSS px of each screenshot. |
| `CHROME` | Path to the Chrome executable. |

The kit uses absolute `/design-kit/` paths in pages written from the starter. To shoot one, serve a folder that holds the kit at `/design-kit`, for example the site `dist` folder.

## Classes

This part adds no classes. It overrides these existing parts at the steps above:

| Part | What the responsive part does |
| --- | --- |
| `ejm-page` | Gutters by step, kept clear of safe areas, column by step. |
| `ejm-display`, `ejm-h2`, `ejm-lead`, `ejm-article__title` | Fluid sizes for phones, caps that scale up from 1920 px. |
| `ejm-hero` | Panel padding, radius and height by size. On short screens the panel and index compress. |
| `ejm-band`, `ejm-head`, `ejm-footer` | Vertical rhythm scales. The footer keeps clear of the home bar. |
| `ejm-header`, `ejm-header--sticky`, `ejm-menu` | Safe areas, a smaller logo on phones, 44 px targets, no sticking on short screens. |
| `ejm-cluster`, `ejm-button` | Buttons stack under 420 px. |
| `ejm-cards`, `ejm-features`, `ejm-cols`, `ejm-stats`, `ejm-projects` | Column minimums scale on large screens so the count grows slowly. |
| `ejm-docs`, `ejm-sidebar-layout`, `ejm-sidenav`, `ejm-toc` | Wider rails on large screens, 44 px links on touch, static on short screens. |
| `ejm-faq`, `ejm-links` | Two columns from 2200 px, and a width cap before that. |
| `ejm-table`, `ejm-terminal`, `ejm-code` | Scroll inside their own box. The current row of a table can carry `aria-current="true"`. |
| `ejm-figure` | Caps its size on large screens. |
| `ejm-logo` | Never wider than the column, smaller in the header on phones. |

## Writing new parts

Use tokens for sizes, so the scale reaches them. Use `minmax(0, 1fr)` and `min-inline-size: 0` for grid and flex children that hold text. Use `auto-fit` with a minimum column width, not a fixed count, unless the count is part of the meaning. Put hover effects inside `@media (hover: hover)`. Keep controls 44 px. Do not use `vh` for full height blocks.
