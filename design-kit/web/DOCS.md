# Docs experience

Historical source and review record. See the [retained-source notice](../README.md). File paths, commands, and asset availability below describe the earlier kit, not current production.

The parts and the script that make documentation fast to scan, calm to read and good to copy from. Open `web/docs.html` to see all of it on one real page: a sidebar of pages, a reading column of at most 68 characters, an "On this page" contents list, code blocks with a language label and a copy control, language tabs, reference tables, callouts, and previous and next links. The page documents how to use the kit itself.

The parts live in `web/parts/19-docs.css` (built into `web/site.css`) and one small script, `web/docs.js`. They build on the base docs layout (`ejm-docs`, `ejm-docs__nav`, `ejm-docs__toc`, `ejm-docs__main`), the side navigation and contents lists (`ejm-sidenav`, `ejm-toc`), `ejm-callout` and `ejm-table`, which `web/PATTERNS.md` already lists. Everything reads the band role variables, the tone variables of the open layer and the `--ejm-theme-*` names, so light and dark follow with no extra rules. There are no breakpoints of their own beyond the ones the base docs layout uses (900 and 1240 px), and no literal colors.

## What works with no script

Layout, contents jumps, callouts, tables, code blocks (they scroll inside their own box), the sidebar links and the previous and next links all work with scripts disabled. On a phone the sidebar and the contents are native `details` controls named "Documentation" and "On this page". Language tab groups show every panel, stacked, each under its own label. The copy buttons, the tab list, the sidebar filter and the heading links appear only when `docs.js` runs.

## Layout

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-docs` (`__nav`, `__toc`, `__main`) | A documentation page. The sidebar is on the left, the reading column in the middle and the contents on the right from 1240 px. Between 900 and 1239 px the contents sit above the text. Under 900 px both fold into `details` controls. | A single short page; use a band. | `__nav` and `__toc` are `details.ejm-collapse` with a `summary` that names them. `__main` also carries `ejm-prose`. Mark the current page in the sidebar with `aria-current="page"`. |
| `ejm-docs--page` | The docs layout is the whole page, directly in `main`. Put it on the same element as `ejm-page` and `ejm-docs`. It adds page spacing and sets the reading column to at most 68 characters with the sidebar and contents on either side. | Inside a band or a specimen. | The reading column never grows past 68ch (`--ejm-docs-measure`), at any screen width. Wide screens put the extra room between the columns. |
| `ejm-docs__head` | The top of the reading column: trail, title, lead. | Anywhere but first in `ejm-docs__main`. | A `header` with an `ejm-breadcrumb`, the single `h1` and a lead. |
| `ejm-docs__title`, `ejm-docs__lead` | The page's `h1` (title) and one or two sentences under it (lead). | More than one title per page. | The title balances its line breaks. The lead is muted and limited to 60 characters wide. |
| `ejm-docs__anchor` | You do not write it. `docs.js` adds it to each `h2` and `h3` that has an `id`. It is a link to that heading, visible on hover or keyboard focus on wide screens. | Writing it by hand. | The visible `#` is hidden from assistive technology and the link text reads "Link to this section". |

## Contents and sidebar

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-toc` inside `ejm-docs__toc` | The "On this page" list. Nest a second `ul` for `h3` entries; nested entries indent and are muted. | More than about twelve entries. | Every `href` must point at an `id` on the page. With `docs.js` the heading being read gets `aria-current="true"`; without it every entry still jumps to its heading. |
| `ejm-sidenav` inside `ejm-docs__nav` | The list of pages, grouped, each group with an `ejm-sidenav__title`. | More than about fifteen entries without the filter. | Give the `nav` an `aria-label`. Mark the current page with `aria-current="page"`. Each entry is a link to a real page. |
| `ejm-docs__filter` | A filter for the sidebar. Put it inside `ejm-docs__nav`, above the `nav`. Always set the `hidden` attribute in the markup: `docs.js` shows it, so a visitor with no script does not see a control that cannot work. | A sidebar of fewer than six entries. | A `div` with a visually hidden `label`, an `input` (`type="search"`, class `ejm-input`) and the `ejm-docs__count` live region. The input is 44 px high. |
| `ejm-docs__count` | The result count under the filter. | Anywhere else. | A `p` with `role="status"`, empty at first. `docs.js` writes "3 results" or "1 result" while a filter is typed, and clears it when the field is cleared. |

## Code blocks and tabs

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-codeblock` (`__bar`, `__lang`, `__copy`) | Any code or command a reader will copy. A rounded block with a bar above the code. The bar holds the language label on the left; `docs.js` adds the Copy button on the right. | One word or a short inline name; use inline `code`. | A `figure` with a `div.ejm-codeblock__bar` holding `p.ejm-codeblock__lang` (for example "HTML"), then `pre.ejm-code` with `tabindex="0"`, `role="group"` and an `aria-label`, then `code`. The `pre` scrolls inside the box. The copy button is a real `button` named "Copy" plus the language, 44 px high on touch screens. It reads the text of the `pre`, so keep prompts and output out of copyable blocks. |
| `ejm-tok-comment`, `ejm-tok-keyword`, `ejm-tok-string`, `ejm-tok-number`, `ejm-tok-type`, `ejm-tok-function`, `ejm-tok-property` | Optional syntax colors, as `span` elements inside the code. Seven roles are enough. | Meaning that needs to survive without color. Code must read correctly with the spans removed. | Colors come from the theme syntax roles and are darkened in light mode so they pass 4.5:1 on the code ground. Comments are italic. |
| `ejm-tabs` (`__list`, `__tab`, `__panel`, `__label`) | The same task shown in several languages, such as CSS, TypeScript and Rust. Switching one group switches every group that has a tab with the same name. | Content that is not parallel. Different steps belong in headings. | Markup: `div.ejm-tabs[data-ejm-tabs]` holding a `div.ejm-tabs__panel` per language, each with a `p.ejm-tabs__label` (the name) and an `ejm-codeblock`. Optional `data-tabs-label` names the tab list ("Language" by default) and `data-selected` on a panel starts there. `docs.js` builds `__list` and the `__tab` buttons, hides the labels and hides all but one panel. With no script every panel shows, under its label. |

## Callouts and reference tables

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-callout` (`--tip`, `--warning`) | A short aside the reader must not miss. Inside docs it has room above and below and its label is bold. | General emphasis. | `div.ejm-callout` with `role="note"`. The first element is `p.ejm-callout__label`, and its text is "Note", "Tip" or "Warning". The label carries the meaning; the fill only backs it up. At most two per screen of text. |
| `ejm-table--ref`, `ejm-table__code` | Parameters, options and reference values: a name, a type or value, a default and a description. Use it together with `ejm-table`. | Narrative content, or data with more than about six columns. | The first column is a `th scope="row"` in mono. `ejm-table__code` sets a cell in mono and muted, such as a type or default. Figures are tabular. The wrapper is the scroll container: `role="region"`, an `aria-label` and `tabindex="0"`. On a narrow screen the table scrolls inside its own box and the page does not. Add a `caption`. Use `ejm-table__num` for right-aligned numbers. |

## Previous and next

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-docs__pager` (`__pager-link`, `__pager-link--next`, `__pager-dir`, `__pager-name`) | The last element of a page: a link to the page before and the page after. Two tonal blocks side by side from 36rem, stacked below. With only one neighbor the one block takes the full width. | A page that has no sequence. | A `nav` with `aria-label="Previous and next pages"`. Each link has `rel="prev"` or `rel="next"`, a `__pager-dir` ("Previous" or "Next") and a `__pager-name` with the title of the adjacent page, so the link says where it goes. The next link is aligned to the end. |

## Script

`web/docs.js` is the only script docs add. It is about 200 lines, has no dependencies, and is safe under the kit content security policy (`'self'`). Load it deferred in the head with the other kit scripts: `<script src="/design-kit/web/docs.js" defer></script>`.

| Behavior | What it does | Markup it needs |
| --- | --- | --- |
| Scroll-aware contents | An `IntersectionObserver` watches the headings the contents list links to. The heading most recently passed in the top quarter of the window becomes current: its link gets `aria-current="true"` and the others lose it. At the very end of the page the last entry is current. Activating an entry (click, or Enter on a focused link) moves keyboard focus to the heading, scrolls to it (smoothly, unless the visitor prefers reduced motion), updates the address and folds the phone control away. Modified clicks (command, control, shift) keep their normal meaning. | `a[href="#id"]` links inside `.ejm-docs__toc`, and headings with those ids. |
| Copy buttons | Adds a Copy button to the bar of every `.ejm-codeblock`. Activating it puts the text of the `pre` on the clipboard. The button text becomes "Copied" for two seconds, and a polite live region says "Copied HTML code" for assistive technology. If the clipboard is blocked, the code is selected instead and the live region says to use the keyboard shortcut. | `.ejm-codeblock` with `.ejm-codeblock__bar`, `.ejm-codeblock__lang` and a `pre`. |
| Language tabs | Builds the WAI-ARIA tabs pattern: `role="tablist"`, `role="tab"` with `aria-selected`, `role="tabpanel"` with `aria-labelledby`. Only the selected tab is in the tab order (roving tabindex). Left and Right (and Up and Down) move to the neighboring tab and wrap, Home and End go to the first and last, and the panel changes as focus moves. Choosing a language also selects it in the other groups that have it. | `[data-ejm-tabs]` with `.ejm-tabs__panel` children, each with a `.ejm-tabs__label`. Optional `data-tabs-label` and `data-selected`. |
| Sidebar filter | Shows the hidden filter. While the visitor types, entries (`li` in `.ejm-docs__nav`) that do not contain the text are hidden, groups with no entries left are hidden, and the count is written to the live region ("3 results"). Escape clears the field. | `.ejm-docs__filter` (with `hidden`) holding an `input` and `.ejm-docs__count`, and a `.ejm-sidenav` made of groups. |
| Heading links | Adds a `#` link to every `h2[id]` and `h3[id]` in `.ejm-docs__main`. | Headings with ids. |

## Using it

Build a docs page from the head scripts block of `web/starter.html` plus `docs.js`, a sticky header, the three stylesheets and `<main id="main">` holding one `div.ejm-page.ejm-docs.ejm-docs--page`. Inside it put the sidebar `details`, the contents `details` and `div.ejm-docs__main.ejm-prose`, in that order. In the reading column: the `ejm-docs__head`, then `h2` sections (each with an `id` the contents list links to), and last the `ejm-docs__pager`. See `web/docs.html`.
