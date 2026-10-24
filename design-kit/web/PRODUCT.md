# Product windows and depth

Historical source and review record. See the [retained-source notice](../README.md). File paths, commands, and asset availability below describe the earlier kit, not current production.

The catalog of the product hero: simulated windows of ejm-cli, ejm-ide and ejm-harness, layered on a stage, with three levels of elevation and a short staged entrance. Open `product.html` to see it in light and dark. The styles are `parts/16-hero.css` (built into `site.css`). There is no script: the layout and the entrance are CSS.

## What it is

A **product window** is a static, simulated screen. It is drawn from kit classes, not from a screenshot, so it follows the page theme, scales with its container and can be checked by the class guard. It is not a live demo: for something the visitor can try, use the demo frame (`DEMOS.md`).

A **stage** layers one to three windows. Above 30rem of stage width the windows overlap on a fixed 48 by 54 em canvas, and the canvas scales with the stage, so the composition keeps its shape from a tablet to a 5120 px screen. Below 30rem the windows stack, each one offset 5% to alternate sides and tucked 2.4em under the next, and the IDE shows only its chat pane.

The **product hero** puts the copy in one column and the stage in the other, on the Sage panel. Under 900px the copy comes first and the stage sits below it.

## Honesty rules

These are not optional. A window that breaks one does not ship.

1. **Say it is simulated, in visible text.** Every `ejm-product` needs a `ejm-product__label` that begins "Simulated screen". `scripts/check-site.mjs` fails a page that has an `ejm-product` without it.
2. **Name only what the product documents.** Every command, key, tool word and state in a window must appear in that product's README. The windows use the words `read`, `write`, `grants: read`, `replay`, `Enter`, `Ctrl+C`, `/help`, `File write`, `proposed`, and the governor's `resource governor` and `event journal`. The raw tool ids of the harness (such as `read_file`) are not in the READMEs, so a window shows the plain verb.
3. **No invented numbers, customers or benchmarks.** The only numbers are the documented default limits (8 model requests, 4 local jobs, 1 heavy job), stated in the ejm-cli README and in ejm-harness `docs/architecture.md`. Journal events are labelled sample and carry no counts or times.
4. **One source for the words.** Window text comes from `web/demos/` (`cli.json`, `ide.json`, `harness.json`, `harbor.json`): the prompt, the reply, the file path, the diff lines, the blocked notice and the code of `src/retry.rs`. Change the scenario there first, then the window.
5. **Decorative to assistive technology.** The stage is `aria-hidden="true"`. The label is real text outside it, so a screen reader reads one sentence, not a terminal. Nothing in a window is focusable, and windows ignore the pointer, so the layering never traps focus.

## Elevation

Three tokens, defined in `16-hero.css` with light and dark values. Only product windows, menus and overlays use them. No card, tag, callout or panel casts a shadow (see `OPEN.md`).

| Token | Use it for | Do not use it for |
| --- | --- | --- |
| `--ejm-elevation-rest` | A small overlay or menu that sits close to the ground, or a window that must read as quiet. | A card, tag, callout, panel or any content surface. |
| `--ejm-elevation-raised` | A popover, dropdown or menu over content. | Anything that does not float. |
| `--ejm-elevation-float` | A product window on a stage, a dialog, a toast. The default of `ejm-product__window`. | Resting content. |

Each token is a stack of soft shadows, near to far. In dark mode they are deeper and add a faint top edge of light, so a window still separates from a dark ground. Use them as `box-shadow: var(--ejm-elevation-float)`. Set `data-elevation="rest"`, `"raised"` or `"float"` on a window to choose a level.

## Put a product hero on a page

Copy `product.html`. The skeleton:

```html
<div class="ejm-hero ejm-product-hero">
  <header class="ejm-header ejm-page">...</header>
  <div class="ejm-hero__body ejm-page">
    <div class="ejm-product-hero__copy ejm-enter">
      <p class="ejm-eyebrow">label</p>
      <h1 class="ejm-display">The main point. <span class="ejm-display__quiet">The second beat.</span></h1>
      <p class="ejm-lead">One or two sentences.</p>
      <div class="ejm-cluster"><a class="ejm-button" href="#next">Action</a></div>
    </div>
    <figure class="ejm-product">
      <div class="ejm-product__stage" aria-hidden="true">
        <div class="ejm-product__window ejm-product__window--ide">...</div>
        <div class="ejm-product__window ejm-product__window--cli">...</div>
        <div class="ejm-product__window ejm-product__window--harness">...</div>
      </div>
      <figcaption class="ejm-product__label">Simulated screen. ejm-cli, ejm-ide and ejm-harness, not a live demo.</figcaption>
    </figure>
  </div>
</div>
```

Window order in the markup is the order of the entrance and the stacking order, back to front: IDE, CLI, harness. A stage with one window needs no `--` modifier; a stage with two windows should use the same modifiers (`--ide` and `--cli`).

Tone and state live in attributes: `data-tone` on a line (`dim`, `accent`, `err`, `warn`, `add`, `del`, `mark`), `data-selected="true"` on a tab, `data-from="you"` on a chat message, `data-syn` on a code span (`kw`, `ty`, `fn`, `cm`), `data-wrap` on a line that should wrap, `data-elevation` on a window. Every tone carries a glyph or a word, never color alone.

## The entrance

Copy first, then windows, then the label, in one sequence that ends at 1.02 s. The copy uses the kit's `ejm-enter` (each child rises 16 px and fades in, 60 ms apart). The windows follow from 320 ms, 120 ms apart, each rising 32 px. The label fades in at 600 ms. Only `transform` and `opacity` animate. The animation fills backwards, so the final layout is the resting style: with reduced motion, or with CSS animation unavailable, the hero is complete and nothing is hidden. Scripts are not involved, so turning scripts off changes nothing.

## Classes

### Frame and stage

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-product` | On the `figure` that holds one stage and its label. It names the container (`ejm-product`) that the stage and windows measure. | Around anything that is not a simulated screen. | Needs one `ejm-product__label`. One stage per figure. |
| `ejm-product__stage` | Around the one to three windows. Stacks them below 30rem and layers them above. | Around anything but windows. | `aria-hidden="true"`. Windows are in back to front order. |
| `ejm-product__label` | Under the stage, always. The visible "Simulated screen" sentence. | Hiding, shrinking or removing it. | A `figcaption`. Starts with "Simulated screen". A short sentence that names the products shown. |
| `ejm-product-hero` | On an `ejm-hero` to make the panel a two-column composition with the stage. | A hero with no product windows. | The copy first in the markup. The h1 stays in the copy column. |
| `ejm-product-hero__copy` | Around the eyebrow, h1, lead and buttons in the product hero. Add `ejm-enter` to stage them. | Anything else. | Normal reading order, one h1. |

### Window

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-product__window` | Each window. A rounded frame with the float shadow, a title bar and a body, in the page theme. | A live demo (use `ejm-demo`). | Decorative. Not focusable, ignores the pointer. `data-elevation` picks `rest`, `raised` or `float`. |
| `ejm-product__window--cli`, `ejm-product__window--ide`, `ejm-product__window--harness` | The slot a window takes on a stage: back right, front left, front right. | More than one of each in a stage. | The same name as the product inside. |
| `ejm-product__bar` | The title bar: dots, title, meta. | Controls. | Plain text. |
| `ejm-product__dots` | The three window dots, in the bar. | Anything else. | An empty span, no color of its own. |
| `ejm-product__title`, `ejm-product__meta` | The product name and a quiet mono note (the folder, "sample") in the bar. | Marketing text. | One short phrase each. |
| `ejm-product__body` | The body of a window. | Writing a layout of your own. | Combine with `ejm-product__term`, `ejm-product__ide` or `ejm-product__gov`. |

### Content

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-product__term` | The body of an ejm-cli window: header, transcript, composer, hints, top to bottom, as in `ui/TUI.md`. | A page-level terminal (use `ejm-terminal`). | Lines are `ejm-product__line`. Use only README words. |
| `ejm-product__line` | One line of mono text: a terminal line, a code line, a diff line, a journal event. | Prose. | `data-tone` for color, `data-wrap` to wrap. A glyph or word carries the meaning. |
| `ejm-product__composer` | The rounded message box in a terminal window. | A real field. | A span that reads "Message". Not an input. |
| `ejm-product__ide` | The body of an ejm-ide window: editor pane, then chat pane. One column below 30rem, chat only. | Other products. | Holds two `ejm-product__pane`. |
| `ejm-product__pane` | One pane of the IDE: editor or chat. | Outside `ejm-product__ide`. | The second pane is one tone deeper. |
| `ejm-product__tabs`, `ejm-product__tab` | The tab row of a pane. `data-selected="true"` marks the open file or chat. | Real navigation. | Spans, not tabs or links. |
| `ejm-product__code` | The editor text with line numbers, drawn by CSS. | Editing. | Lines are `ejm-product__line`; `data-syn` colors a span; `data-tone="mark"` marks the current line. |
| `ejm-product__msg`, `ejm-product__who`, `ejm-product__text` | One chat message with its speaker. `data-from="you"` tints the visitor's message. | A long conversation. | Two or three messages at most. |
| `ejm-product__tool`, `ejm-product__tool-head` | A tool call card in the chat. The head has the tool word, the file and the state. | A tool the IDE does not document. | Use "File write" and a state such as "proposed". |
| `ejm-product__diff` | The diff inside a tool call. Lines use `data-tone="add"` or `"del"`. | More than five lines. | Each changed line starts with `+` or `-`, so color is not the only signal. |
| `ejm-product__gov` | The body of an ejm-harness window: governor limits and the event journal. | Other products. | Two captions, one stat list, one journal. |
| `ejm-product__cap` | A small caption inside a window. | Headings. | Sentence case, muted. |
| `ejm-product__stats`, `ejm-product__stat` | The governor's default limits: a figure and its label. | Results, speed or capacity claims. | Only the documented defaults. A list of three. |

## Checks

- `node scripts/check-site.mjs web/product.html` passes, which includes the simulated-label rule.
- `node scripts/shoot.mjs http://localhost:PORT/design-kit/web/product.html --theme light` and `--theme dark` report no horizontal overflow and no tap target under 44 px at every size of the matrix (320 to 5120 px).
- With reduced motion or scripts off, every window, line and label is present and opaque at load.
