# Web components

A small, optional CSS library for ejmlabs interfaces. Open `components/index.html` for the specimen. No package, framework, JavaScript, external font service, or build step is needed.

The original guide defines the logo, six colors, type families, and weights. Every component, interaction state, layout primitive, responsive rule, and dark-surface treatment here is a new web extension. These additions do not change the source artwork or claim to be part of the PDF.

## Install

Load the existing tokens first, then the components. Adjust paths for your project.

```html
<link rel="stylesheet" href="/design-kit/tokens/brand.css">
<link rel="stylesheet" href="/design-kit/components/brand-components.css">
<main class="ejm-surface">
  <div class="ejm-page ejm-section ejm-stack">
    <h1 class="ejm-title">A small experiment</h1>
    <p class="ejm-text">Describe the work in plain language.</p>
  </div>
</main>
```

All selectors require an `ejm-` class or sit inside a specific opted-in component. There is no global reset. An existing page retains its own margins and styles. Apply `ejm-surface` to the part of the page that should inherit the brand font, reading colors, and selection style.

## Links and buttons

```html
<a class="ejm-link" href="/work">Browse experiments</a>
<a class="ejm-button" href="/work">Explore the work</a>
<button class="ejm-button ejm-button--secondary" type="button">Pause animation</button>
<button class="ejm-button" type="button" disabled>Unavailable</button>
<button class="ejm-button" type="button" aria-busy="true" disabled>Saving changes</button>
```

Use links for navigation and real buttons for actions. Attach the actual behavior in your app. Underlines remain visible on text links. Controls have a minimum height of 44 px, keyboard focus rings, and hover states. A disabled native button is inoperable; do not use only `aria-disabled` on a working link. Explain why a real action is unavailable in nearby text. During loading, set `aria-busy`, prevent duplicate actions, and keep a readable action label.

## Text input

```html
<div class="ejm-field">
  <label class="ejm-field__label" for="project-name">Project name</label>
  <input class="ejm-input" id="project-name" name="project-name"
    type="text" aria-describedby="project-name-hint">
  <p class="ejm-field__hint" id="project-name-hint">Choose a short, descriptive name.</p>
</div>
```

For a validation failure, add `aria-invalid="true"`, point `aria-describedby` to an error message, and use `ejm-field__error` on that message. Start with an explicit label such as `Error: Enter a project name.` The thicker border is an additional cue. Keep a visible label; a placeholder cannot replace it. Give each instance a unique input and description ID. Use the correct input type, autocomplete value, and validation for the actual field. Validation logic is not part of this CSS library.

Native `disabled` and `readonly` inputs have a Mist surface. Disabled controls cannot be edited or submitted; readonly text inputs remain focusable and are submitted. The specimen demonstrates static states and stores nothing.

## Status tags

```html
<span class="ejm-tag">In progress</span>
<span class="ejm-tag ejm-tag--quiet">Draft</span>
<span class="ejm-tag ejm-tag--solid">Reference</span>
```

Tags are labels, not controls. Write the state in text so meaning never depends on color. Use a live region only when an actual state change needs to be announced. The palette does not define a warning or error color; use explicit text and suitable semantics instead of inventing one.

## Project card

```html
<article class="ejm-card">
  <span class="ejm-tag ejm-tag--quiet">Brand reference</span>
  <h2 class="ejm-card__title">ejmlabs design kit</h2>
  <p class="ejm-text">Logo artwork, fonts, color tokens, and the source guide.</p>
  <a class="ejm-link" href="/design-kit/">Explore the kit</a>
</article>
```

Use the heading level that fits the page. Keep a descriptive link within the card, rather than making every nested element a click target. For an empty list, show a plain message explaining what is absent and, where useful, a real next action. Do not fill it with invented project or customer data.

## Prose and code

```html
<div class="ejm-prose">
  <h2>Notes from the experiment</h2>
  <p>State what happened and what you learned.</p>
  <a class="ejm-link" href="/notes">Read the notes</a>
</div>
<pre class="ejm-code" tabindex="0" aria-label="Example CSS"><code>.experiment {
  color: var(--ejm-ink);
}</code></pre>
```

Prose has a 68-character target measure. Code preserves whitespace and scrolls horizontally without widening the page. Give a scrollable code block a keyboard focus target and a useful accessible label. Escape `<`, `>`, and `&` when inserting source code into HTML.

## Layout primitives

| Class | Purpose |
| --- | --- |
| `ejm-page` | Centered 1200 px maximum wrapper with 24 px gutters, growing to 48 px on wider screens. |
| `ejm-section` | 64 px vertical spacing, growing to 96 px on wider screens. |
| `ejm-stack` | Vertical group with 24 px gaps. |
| `ejm-stack--compact` | Add to `ejm-stack` for 12 px gaps. |
| `ejm-cluster` | Wrapping row with 12 px gaps. |
| `ejm-grid` | Responsive columns with a 280 px preferred minimum, collapsing to the available width. |
| `ejm-rule` | One-pixel separator using the inherited reading color. |
| `ejm-title`, `ejm-heading` | Manrope 600 display and section headings. |
| `ejm-text`, `ejm-caption` | Body and caption helpers. |

Combine only the primitives the content needs. Do not apply a grid to a lone paragraph or put cards inside cards.

## Dark surfaces and logo clear space

```html
<section class="ejm-surface ejm-surface--forest">
  <div class="ejm-page ejm-section ejm-stack">
    <h2 class="ejm-heading">A quiet space for the work</h2>
    <a class="ejm-button" href="/work">Explore the work</a>
  </div>
</section>
```

The Forest variant uses Paper text and adapts links, buttons, and focus rings. Cards and inputs keep their own light surfaces. Use this variant on a complete section rather than nesting it inside another themed component.

```html
<a class="ejm-signature" href="/" aria-label="ejmlabs home">
  <img src="/design-kit/logos/ejmlabs-primary.svg" alt="ejmlabs">
</a>
```

The signature wrapper limits the full logo to 280 px and reserves 24 px around it, enough for the guide's half-symbol-height clear space at that size. It scales down within narrower containers. Use `ejmlabs-paper.svg` on Forest. For other sizes or standalone symbols, follow the source clear-space rules in `README.md`; do not stretch or recreate the wordmark.

## Accessibility and limits

- Reading pairs use the guide's exact colors. Ink on Sage, Forest on Mist, Ink on Paper, and Paper on Forest all pass normal-text AA contrast. White input surfaces use Ink or Forest text.
- Focus uses a two-pixel ring with four-pixel separation. Check that your page does not clip it with `overflow: hidden`.
- Interface transitions use the existing duration token, which becomes zero for reduced motion. There is no automatic component animation.
- Forced-color mode retains native control colors and outlines tag and card boundaries.
- Component classes supply presentation. Your app owns semantics, loading announcements, validation, state changes, data handling, and real action behavior. Test those in the page where the components are used.
