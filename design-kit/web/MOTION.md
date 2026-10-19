# Motion

The motion system for every ejmlabs site. One set of tokens, a short list of named parts, one small script. Open `web/motion.html` to see each part live, with a replay button for the entrances and reveals. The rest of the kit is in `PATTERNS.md`; the rules for sites are in `SITES.md`.

The parts live in `web/parts/30-motion.css` (built into `web/site.css`) and `web/motion.js`. Never write page CSS for motion. Choose a part, or add one here.

## Principles

1. **Motion explains change.** Something arrives, leaves, opens, or is pressed. If nothing changes, nothing moves.
2. **Calm.** Small distances, soft landings, no bounce, no overshoot. The only thing that loops is the ambient Orbit drift (32 seconds, linear).
3. **Short.** Feedback takes 90 to 150 ms. Things that open take 240 ms. Things that arrive take 420 ms. Nothing a visitor waits on is longer than 720 ms.
4. **Eased out.** Arrivals decelerate, exits accelerate and are faster than arrivals. State changes use the kit's interface curve.
5. **Content first.** Content is in the page and readable without script, without animation support and with reduced motion. Motion is added on top, never required.
6. **One entrance, quiet reveals.** The hero enters once on load. Below it, bands reveal once as they scroll into view. Nothing replays.

## Tokens

All are CSS custom properties on `:root`, in `web/parts/30-motion.css`. They add to `tokens/brand.css`, which still owns `--ejm-duration-ambient` (32000ms, linear) and `--ejm-duration-interface` (180ms) with `--ejm-ease-interface`.

| Token | Value | Use it for |
| --- | --- | --- |
| `--ejm-duration-instant` | 90ms | Press feedback: the 0.98 button scale. |
| `--ejm-duration-fast` | 150ms | Hover color, underline, focus ring, border emphasis, anything leaving (menu close). |
| `--ejm-duration-base` | 240ms | Menus and dropdowns opening, FAQ and collapse height, card lift, nav underline, small moves. |
| `--ejm-duration-slow` | 420ms | Reveal and entrance: things arriving on screen. |
| `--ejm-duration-slower` | 720ms | Count-up and the rare large move. Nothing is longer. |
| `--ejm-duration-interface` | 180ms | Existing. Page cross-fade and the theme switch. Zero under reduced motion. |
| `--ejm-duration-ambient` | 32000ms | Existing. The Orbit drift only. |
| `--ejm-ease-standard` | `cubic-bezier(0.2, 0.7, 0.3, 1)` | State changes. It is `--ejm-ease-interface`. |
| `--ejm-ease-enter` | `cubic-bezier(0, 0, 0.2, 1)` | Things arriving: reveal, menu open, focus ring. Decelerates. |
| `--ejm-ease-exit` | `cubic-bezier(0.4, 0, 1, 1)` | Things leaving: menu close. Accelerates. |
| `--ejm-ease-emphasis` | `cubic-bezier(0.16, 1, 0.3, 1)` | The hero entrance only. A long, soft landing. |
| `--ejm-ease-linear` | `linear` | Ambient motion and scroll-linked progress, where speed must follow the scroll. |
| `--ejm-distance-small` | 8px | Menu rise, stagger children, small offsets. |
| `--ejm-distance-medium` | 16px | Reveal rise, entrance rise. |
| `--ejm-distance-large` | 32px | The hero headline's entrance rise. Nothing else. |
| `--ejm-stagger-step` | 60ms | The gap between siblings. Up to the twelfth child; later ones share its delay. |

Picking a duration: bigger on screen or farther traveled means longer; leaving is shorter than arriving. If two tokens seem to fit, take the shorter one.

Two local knobs exist for the typewriter: `--ejm-type-step` (40ms per character) and `--ejm-chars` (set by `motion.js` from the text length). A reveal or entrance can be delayed with `--ejm-delay` or `--ejm-enter-delay`; use it sparingly, since the stagger already orders things.

## Setup for every page

Put the script first in `<head>`, before the style sheets, as a plain synchronous tag. It is about 1 KB over the wire and must run before the first paint so `html.ejm-js` exists when reveals are hidden. Do not use `defer`, `async` or `type="module"`: a late class makes content flash visible and then hide.

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="/design-kit/web/motion.js"></script>
  <link rel="stylesheet" href="/design-kit/tokens/brand.css">
  <link rel="stylesheet" href="/design-kit/components/brand-components.css">
  <link rel="stylesheet" href="/design-kit/web/site.css">
</head>
```

`motion.js` adds `ejm-js` to `<html>` only when `IntersectionObserver` exists. Reveal styles apply only under `html.ejm-js`, so a visitor without script sees everything. If anything in the script throws, it removes the class again. It works under a strict content security policy: no `eval`, no inline handlers, and it only sets properties through the DOM.

For a page that has a scroll progress line, add one element as the first child of `<body>`: `<div class="ejm-scroll-progress" aria-hidden="true"></div>`. Cross-document page transitions need nothing in the page; loading `site.css` is enough, on both pages of the navigation.

`window.ejmMotion` has two methods. `ejmMotion.refresh(container)` prepares parts you add to the page later (it skips ones it has seen). `ejmMotion.replay(container)` plays reveals, entrances, typing and counts again; a button with `data-ejm-replay="#some-id"` calls it for that element, with no extra script. Use replay for specimens, not for real pages.

## Catalog

Reduced motion means `prefers-reduced-motion: reduce`, including when it is switched on while the page is open. In every case the finished page is shown and no content is hidden.

### Arrival

| Class | Use it when | Do not use it when | Reduced motion | Accessibility |
| --- | --- | --- | --- | --- |
| `ejm-reveal` (`--up`, `--fade`, `--scale`, `--left`) | A band head, a figure, a block of text, anything below the first screen that should arrive as it scrolls in. Bare is `--up` (16 px rise). `--fade` is opacity only, `--scale` grows from 0.96, `--left` slides in 16 px from the start side. | The element is in the hero or the first screen (use `ejm-enter`), is a single line of body text in a long article, or is a control people need immediately. Never on `body`, a whole `main`, or a sticky bar. | Shown at once, no animation. | Needs script to hide; with none, visible. Revealed once, 420 ms, never hidden again. Hidden content is still in the accessibility tree and found by search, and finding it scrolls it in. |
| `ejm-stagger` | The children of a list, grid or set of cards that should arrive one after another: `ejm-cards`, `ejm-projects`, `ejm-features`, `ejm-steps`, `ejm-principles`, `ejm-stats`. Put it on the container; the children do the moving. | More than about twelve children, or children that load later (call `ejmMotion.refresh()`). Do not put `ejm-reveal` on the children as well. | Shown at once. | Source order is the reading order; the stagger follows it. The whole set is done in under 1.2 s. |
| `ejm-enter` (`--fade`) | The hero on load: put it on `ejm-hero__body`, the panel. The panel fades and rises 8 px once, then eyebrow, headline, lead, buttons and index arrive in order, the headline rising farthest. In a split hero put it on `ejm-hero__copy` instead. The panel only translates, never scales, so its rounded corners stay put. `--fade` uses opacity only. Pure CSS. | Anywhere below the hero, on inner pages with a compact hero, or on the header of a site that uses page transitions (the logo and nav stay put instead). | No animation. | Content is in the DOM and painted from the first frame in browsers without animation. Total under 0.7 s. |
| `ejm-count` | A number in `ejm-stat__value` that should count up once, when it scrolls into view. Write the final number in the text: `3`, `1,240`, `99.9%`. | Numbers that are not facts, or that someone may copy at once. Not for a changing live value. | The final number shows at once. | The final text is in the DOM for no-script and is the only text screen readers get (the counting digits are hidden from them). Tabular numerals stop the figures shifting. |
| `ejm-typewriter` | One line of terminal text that types out in steps, in a terminal or on a solid band. It slides a ground-colored cover away, so only transform animates. | Multi-line text, text over a picture or motif, or a headline. | Text shows at once. | The text is in the DOM from the start. Under script it waits until visible. Keep the line short; 40 ms a character. |
| `ejm-cursor` | A caret after terminal text. Blinks 8 times at 0.8 a second, then rests solid. | Anywhere it would look like a text field. | Solid caret, no blink. | Decorative: it is generated content. Never blinks more than 3 times a second and never loops. |

### Feedback

These apply to existing parts automatically; there is no class to add.

| Part | What it does | Reduced motion | Notes |
| --- | --- | --- | --- |
| `ejm-button` | Hover changes color in 150 ms. Pressing scales to 0.98 in 90 ms. | Color only, no scale. | Disabled buttons do not press. |
| `ejm-link`, `ejm-prose` links, `ejm-announce` links, `ejm-breadcrumb` | The resting underline thickens from 1 px to 2 px. | Same (no movement). | Underline stays at rest, so links never depend on hover. |
| `ejm-nav` links | The underline grows from the start in 240 ms. | Fades; no growth is needed. | Current page keeps its full underline. |
| `ejm-hero__index`, `ejm-footer` links, `ejm-project__name` links, `ejm-links__title` | The underline fades in under the text. | Same. | Forced colors always show the underline. |
| `ejm-links` arrow | The arrow slides 4 px (3 px diagonal for external). Existing. | None. | |
| `ejm-card`, `ejm-project` | A card that contains a link lifts 2 px and its border goes to full text color, only where the device has hover. Keyboard focus inside the card also darkens the border, with no lift. | Border only, no lift. | Cards without a link do not move, so movement always means something is clickable. |
| `ejm-tag`, `ejm-pagination`, `ejm-subnav`, `ejm-sidenav`, `ejm-toc` | Background or border color eases in 150 ms. | Same (no movement). | |
| `ejm-faq`, `ejm-collapse` | Open and close with an animated height and a fade, 240 ms, where the browser supports `::details-content` and `interpolate-size`. Elsewhere it is instant. The plus icon turns, as before. | Instant. | A `<details>`: keyboard, find in page and no-script behavior are unchanged. In `ejm-docs` the nav and contents animate only while they are a toggle. |
| `ejm-menu` | Under 640 px the links fade in with an 8 px rise (240 ms) and leave in 150 ms. Elsewhere the nav is plain. | Instant. | Needs `::details-content`; older browsers keep the plain button. |
| Focus ring | The ring draws out from the element in 150 ms. | Appears at once. | The kit's focus rules are unchanged; only the arrival is animated. Never remove the ring. |
| `ejm-announce` | Link underline only. It does not animate in: it sits on every page and would flash on each navigation. | | |

### Scroll and page

| Class | Use it when | Do not use it when | Reduced motion | Accessibility |
| --- | --- | --- | --- | --- |
| `ejm-scroll-progress` | A long page or docs page. A 3 px Sage line at the top that grows with the scroll. First child of `<body>`. CSS only, via `animation-timeline: scroll()`. | A short page, or a page that already has a progress indicator. | Not shown. | Add `aria-hidden="true"`: it repeats what the scrollbar says. Hidden where scroll timelines are unsupported. |
| `ejm-sticky-shrink` | On `ejm-header--sticky`. Over the first 96 px of scroll the logo shrinks to 90% and a hairline fades in under the bar. CSS only. | A header that is not sticky. | The hairline still fades in; the logo does not shrink. | Layout never changes, so nothing jumps. Where unsupported, the header keeps its normal border. |
| Page transitions | Multi-page sites. `@view-transition` cross-fades between pages in 180 ms, and the logo and nav stay in place (named `ejm-logo` and `ejm-nav`, the nav being the menu, or the tools group with the theme button, of the page's own header). | Never needs to be turned on or off. | Off. | Only where the browser supports cross-document view transitions. Names are unique per page, so headers inside examples are left alone. |
| Theme switch | `document.startViewTransition()` in `theme.js` uses the same 180 ms root cross-fade, defined in this file. Wrap the call so it is skipped when `prefers-reduced-motion: reduce` matches. | | No animation. | |

## Page recipes

### Landing page

The order a visitor sees, top to bottom:

1. Header in place, not animated. Sticky header with `ejm-sticky-shrink`, plus `ejm-scroll-progress` on a long page.
2. Hero: `ejm-enter` on `ejm-hero__body`. Eyebrow, headline, lead, buttons, index. Orbit drifts behind, as ever.
3. First band: `ejm-reveal` on the band head, `ejm-stagger` on its cards.
4. Facts: `ejm-stagger` on `ejm-stats`, `ejm-count` on each `ejm-stat__value`.
5. Anything with a terminal: `ejm-typewriter` and `ejm-cursor` on one line.
6. Closing band: `ejm-reveal--fade` on the call to action.

```html
<div class="ejm-hero__body ejm-page ejm-enter">
  <p class="ejm-eyebrow">label</p>
  <h1 class="ejm-display">The main point. <span class="ejm-display__quiet">The second beat.</span></h1>
  <p class="ejm-lead">One or two sentences.</p>
  <div class="ejm-cluster"><a class="ejm-button" href="#first">Primary action</a></div>
</div>

<div class="ejm-head ejm-reveal">...</div>
<div class="ejm-projects ejm-stagger">...</div>
<dl class="ejm-stats ejm-stagger"><div class="ejm-stat"><dt class="ejm-stat__label">projects</dt><dd class="ejm-stat__value ejm-count">3</dd></div></dl>
<p class="ejm-terminal__body"><span class="ejm-typewriter ejm-cursor">ejm-ide open .</span></p>
```

For `web/starter.html`: add the script tag first in `<head>`, add `ejm-enter` to the `ejm-hero__body` element, add `ejm-reveal` to each `ejm-head`, and add `ejm-stagger` to `ejm-projects` and `ejm-principles`.

### Docs page

Calm and still. No entrance, no reveals on running text. Sticky header with `ejm-sticky-shrink`, `ejm-scroll-progress` as the first child of the body, `ejm-collapse` for the nav and contents on small screens (they animate), page transitions between pages. Code and tables never animate in.

### Theme switch

`theme.js` calls `document.startViewTransition(change)` when the browser has it and the visitor has not asked for reduced motion, and applies the theme directly otherwise. The 180 ms cross-fade is the whole effect: no wipe, no circle, no slide.

## Performance rules

May animate: `transform` and `opacity`. These stay on the compositor and never trigger layout.

May transition for state feedback, because they are tiny and paint only: `color`, `background-color`, `border-color`, `text-decoration-color`, `text-decoration-thickness`, `outline-color`, `outline-offset`.

One exception to layout-free: the height of a `<details>` disclosure (`ejm-faq`, `ejm-collapse`), on the `::details-content` box only, 240 ms, which cannot be done with a transform.

Must not animate: `width`, `height`, `top`, `left`, `margin`, `padding` or anything else that moves neighbors, except the disclosure above. No `box-shadow` or `filter` animation. No `will-change` left on permanently.

Mechanics: reveals use CSS animations with `backwards` fill, so nothing keeps a transform after it ends and hover transforms still work. The observer uses `IntersectionObserver`, one per page, no scroll listeners, no layout reads. Scroll-linked parts are pure CSS scroll timelines. Each reveal runs once and stops observing.

How to test:

1. Reload with script blocked, or delete `ejm-js` from `<html>` in the inspector: every part must be visible.
2. Turn on reduced motion (DevTools, Rendering, Emulate prefers-reduced-motion): nothing moves, nothing is hidden.
3. In the console, `document.getAnimations().map(a => [a.animationName, a.effect.getTiming().duration])` during an entrance: durations must match the token table, and the names must be `ejm-` ones.
4. Performance panel while scrolling: no layout or style recalculation per frame from the kit.
5. Open `web/motion.html` and press the replay buttons.

## Not allowed

- Scroll jacking, smooth-scroll hijacking, or snap-scrolling that fights the wheel.
- Parallax, or any motion that moves text while it is being read.
- Autoplay carousels, marquees, tickers, auto-rotating anything.
- Anything that loops, other than the ambient Orbit drift. The caret blinks eight times and stops.
- Anything that flashes more than three times in a second.
- Bounce, overshoot, spring or elastic easing.
- Hiding content so it can animate in without a fallback: every hidden state sits under `html.ejm-js` and `prefers-reduced-motion: no-preference`.
- Page-load spinners, skeleton shimmer, and animated gradients.
- Revealing the same element twice, or replaying reveals on scroll up.
- Durations over 720 ms, other than the ambient drift.
- Colors that are not brand tokens or band roles. Motion adds no new colors.
- Writing animation in page CSS or inline styles. Add a part here instead.
