# Site patterns

The catalog of every named part in `web/site.css`. Open `web/patterns.html` to see each one live, with its exact markup. Build a page by choosing from this list. If nothing fits, add a pattern to `site.css` and to this file rather than writing page CSS. See `SITES.md` for the rules, the choosing guide and the page recipes.

All parts use `ejm-` classes and brand tokens only. They are mobile first, have no horizontal scroll at 320 px, keep 44 px touch targets, show focus, stop moving under reduced motion, and keep their borders and text in forced-colors mode. Put `ejm-page` on the inner wrapper of every band. Nested heading levels follow the page outline.

Grounds: Paper, Mist, Sage, Forest and Ink. Every part reads the ground it sits on (`--ejm-ground`, `--ejm-muted`, `--ejm-hairline`), so any part works on any band. Cards, terminals and project cards bring their own ground.

## Product demos

An interactive, simulated version of a product, built from `ejm-demo` and `data-ejm-demo`. See `DEMOS.md` for the markup, the honesty rules and the three demos (ejm-cli, ejm-ide, ejm-harness). Every product site carries one.

## Foundations

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-site` | On the `<body>` of every page. It sets ink on Paper, the type, selection color and smooth scrolling. | On an application screen: use `ejm-ui`. | One per page. |
| `ejm-skip` | As the first link on every page, pointing at `#main`. | Never leave it out. | Hidden until it takes focus. |
| `ejm-band` (`--mist`, `--flow`, `--sage`, `--forest`, `--ink`) | For every full-width section. Put `ejm-page` inside it. | Nesting one band in another. | Alternate Paper and Mist, with one Sage band for the page's big brand moment. Forest and Ink bands are rare accents, one at most. One heading per band. Text on Sage is Ink. |
| `ejm-display` (`__quiet`) | For the hero `h1`, with an optional quiet second beat. | For section headings: use `ejm-h2`. | One per page. Keep each line under about 14 characters. |
| `ejm-lead` | For the one or two sentences under a hero heading. | For ordinary body text. | About 54 characters wide. |
| `ejm-mono` | For a name, version or path inside a sentence. | For whole paragraphs. | Typographic only; it adds no meaning. |

## Layout

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-split` (`--2-1`, `--1-2`, `--reverse`, `--center`) | Two things belong side by side: text and a figure, a statement and its status. | There are three or more items, or one is a lone paragraph. | Stacks on mobile in source order. `--reverse` changes only the visual order, so keep the source order meaningful. |
| `ejm-cols` (`--2`, `--3`, `--4`) | Three or four items of the same kind with no frame. | The items are objects with a name and a link; use `ejm-cards`. | Plain `ejm-cols` fits as many 240 px columns as the width allows. Keep items to a few lines. |
| `ejm-measure` (`--narrow`) | Running text outside `ejm-prose` and `ejm-article`. | On cards, grids or headings. | 68 characters, or 52 with `--narrow`. |
| `ejm-center` | One centered statement, closing line or empty state. | Body text longer than three lines. | Centers its children and any `ejm-cluster`. |
| `ejm-sidebar-layout` (`--end`, `--sticky`) | A nav or aside next to one main column on a project page. | Long documentation; use `ejm-docs`. | Side first on mobile. Use `ejm-sidenav` inside it. `--sticky` keeps the side in view from 900 px. |
| `ejm-sidenav`, `ejm-toc` | A list of pages (`ejm-sidenav`) or of headings on this page (`ejm-toc`) with one current item. | More than about twelve links in one list. | Mark the current link with `aria-current`. Give every `nav` an `aria-label`. |
| `ejm-bleed` | A wide figure that should reach the page column edge. | The image should span the whole screen; place it outside `ejm-page`. | Put it inside `ejm-page`. Always give the image `alt`. |
| `ejm-collapse` | A block that folds into a button on small screens, such as the docs nav. | Content that should always be open. | A `<details>`. The summary is a 44 px button. |
| `ejm-sr` | Text for screen readers only, such as "Page " before a page number. | Hiding content that sighted users need. | Never hide focusable elements with it. |

## Header and navigation

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-announce` (`--forest`, `--ink`) | One short, true message above the header. | Marketing, or more than one message. | One line and one link. The link is a 44 px target. |
| `ejm-header--sticky` with `--paper` or `--forest` | A multi-page site or a long page. The bar stays on top. | A one-screen page. | Place it directly under `<body>`, not in the hero. Do not add `ejm-page`; the bar aligns itself to the column. |
| `ejm-menu` | Always with the sticky header, and optionally with the hero header. | Never on its own. | CSS-only `<details>`. Under 640 px the links drop down under the bar. From 640 px it is the plain nav. The label hides under 420 px but stays available to screen readers. |
| `ejm-subnav` | Links to the sections of one page or project. Also the in-page index. | More than about eight links. | Scrolls sideways inside itself. Mark the current link with `aria-current`. |
| `ejm-breadcrumb` | Pages two or more levels deep. | The home page or a flat site. | The last item has `aria-current="page"` and is not a link. |
| `ejm-pagination` | A long ordered list split across pages. | Three pages or fewer. | `aria-current="page"` on the current number. Use `rel="prev"` and `rel="next"`. Hide the gap with `aria-hidden`. |

## Heroes

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-hero` (Sage panel, default) | The home page. | Inner pages. | A rounded Sage panel with the signature art, under the header on a Paper page. One `h1`, one lead, at most two buttons, an index of links. Ink type, Forest second beat. Buttons are Ink on Sage. |
| `ejm-hero--forest` | The one reversed moment a site wants, such as a launch. | Every page. | The old full-bleed Forest hero with Orbit drifting behind it; stops under reduced motion. Use the Paper logo in its header. |
| `ejm-hero--paper` | A calmer opening for docs, a project or a text site. | You want the strongest brand moment. | Use the primary logo in its header. The quiet beat of the headline is Forest, not Sage, for contrast. |
| `ejm-hero--split` (`__copy`, `__visual`) | The product is the picture: a terminal, a code sample, a screenshot. | The visual would be decoration. | The visual stacks under the copy on mobile. Give any image real `alt`. |
| `ejm-hero--compact` | The top of every inner page. | The home page. | Breadcrumb, `h1`, one-line lead. Works with the Sage panel or Paper. |
| `ejm-terminal` (`__bar`, `__body`, `__prompt`) | Real command output or a short session. | As a screenshot or decoration. | A `<pre>` with `tabindex="0"` and an `aria-label` so it scrolls by keyboard. Show output that exists. |

## Sections

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-head` with `ejm-eyebrow`, `ejm-h2`, `ejm-head__text` | Opening every band. | Never skip it for a band that has a heading. | Label, one `h2`, two or three sentences. |
| `ejm-features` (`ejm-feature`) | Three to six short points about one thing. | Steps or objects. | Icon from the kit as an `ejm-icon` span (takes the text color) or an `<img>` with `alt=""`. Title in a few words, one sentence of text. |
| `ejm-stats` (`ejm-stat`) | Two to four plain facts that are true today. | You would have to invent or round up a number. | A `<dl>`: label in `dt`, figure in `dd`. Figures are mono with tabular numerals. |
| `ejm-steps` (`ejm-step`) | An ordered process of three to five steps. | Unordered points. | An `<ol>`. The numbers come from the list. Vertical on mobile, across from 800 px. |
| `ejm-timeline` (`ejm-timeline__item`) | A real history or changelog. | Plans you have not committed to. | An `<ol>` with `<time>` where there is a date. |
| `ejm-quote` (`--center`) | One sentence worth pulling out. | Invented testimonials. | `<figure>` with `<blockquote>` and a `figcaption` that names the source. Once per page. |
| `ejm-cards` with `ejm-card` | A set of objects with name, tag, sentence and link. | Paragraphs of text. | Card titles use the heading level that fits. One descriptive link per card. |
| `ejm-links` (`--compact`, `rel="external"`) | A list of resources or pages. | Content that needs a description longer than one line. | Rows, each with an arrow. External links get the up-right arrow. The link text must make sense alone. |
| `ejm-faq` (`__item`, `__answer`) | Three to eight real questions. | Essential information. | `<details>` and `<summary>`. Works without script and by keyboard. Answers of one to three sentences. |
| `ejm-cta` (`--center`, `--split`) | The last band before the footer. | More than once per page. | A Sage band, or Mist when a Sage band sits just above. A heading, one sentence, one or two buttons. Forest or Ink only for the page's one reversed moment. |
| `ejm-projects`, `ejm-project` (`--base`), `ejm-parts` | The flagship project cards on the home page. | A long list of small things; use `ejm-cards`. | One `ejm-project--base` card for the foundation. |
| `ejm-principles`, `ejm-principle` | Numbered habits, best on a Sage band. | More than three or four. | An `<ol>`; the numbers are generated. |
| `ejm-status` | The "project / status" note. | Anything that is not a short fact. | A `<dl>`. |

## Content

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-callout` (`--tip`, `--warning`) | A short aside the reader must not miss. | General emphasis. | The label (note, tip, warning) is written out, so meaning never depends on border or color. At most two per page. |
| `ejm-table` (`--sticky`, `.ejm-table__num`, `.ejm-table__hash`) | Data with more than one dimension. | A list would do. | The wrapper is the scroll container: `role="region"`, `aria-label` and `tabindex="0"`. Use `caption`, `scope` on headers and tabular figures. Under about eight columns. Put a long hash or checksum in `.ejm-table__hash` so it wraps inside its cell. |
| `ejm-showcase` (`--reverse`) | A code or terminal block beside the text that explains it. | Screenshots; use `ejm-figure`. | Real code in `ejm-code` or `ejm-terminal`. Give a scrollable block `tabindex="0"` and an `aria-label`. |
| `ejm-figure` | A screenshot, diagram or picture of the work. | Decoration. | Real `alt` text and a caption that says what it shows. |
| `ejm-tags` | A short list of labels. | Status people must notice. | Plain tags are labels. Linked tags (`a.ejm-tag`) get a 44 px target. |
| `ejm-logo-row` | A "built with" list. | Customers or partners you do not have. | Mono names by default. A small `<img>` needs `alt`. |
| `ejm-icon` (12 icon modifiers) | An inline icon that takes the text color. | A meaningful icon with no text. | Decorative: `aria-hidden="true"`. Otherwise add text beside it. |

## Docs and articles

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-docs` (`__nav`, `__toc`, `__main`) | Documentation of any length. | A single short page. | Side nav left, `ejm-prose` in the middle, contents right from 1240 px. Under 900 px the nav and contents fold into `ejm-collapse` buttons. |
| `ejm-article` (`__header`, `__title`, `__lead`, `__meta`) | Long-form writing. | Pages that are mostly lists or cards. | One column at 68 characters and 18 px type. Put the text in `ejm-prose` inside it. Use a real date in `__meta`. |
| `ejm-prose` | Running text with headings, lists, links, quotes, inline code and figures. | Layout. | Inside the site it restores paragraph, list and heading spacing, bullets, link underlines and code chips. |

## Motif backgrounds

Add one utility class to a band or hero. The file follows the surface of the band: Paper, Mist, Sage, Forest or Ink. Choose one family per page and keep a quiet area for text. Motifs are decorative and carry no information.

| Class | Use it when | Notes |
| --- | --- | --- |
| `ejm-motif-grid`, `ejm-motif-dots`, `ejm-motif-contour`, `ejm-motif-ripple`, `ejm-motif-stripe` | Texture for a band or hero. Grid and dots suit technical or note pages, contour and ripple suit research and closing bands, stripe suits process pages. | Files: `motifs/<name>-<surface>.svg`. |
| `ejm-motif-echo`, `ejm-motif-flow`, `ejm-motif-orbit`, `ejm-motif-signature` | The original families. Signature is the cropped symbol, for covers and profile bands. | Files: `motifs/<name>-<surface>.svg`. Signature uses `signature-crop-<surface>.svg`. The Mist and Ink surfaces of these four reuse the Paper and Forest files until their own files exist. |
| `ejm-motif--tile` | Repeat the small tile instead of one large image, with grid, dots, stripe or echo. | Files: `motifs/tiles/<name>-tile-light.svg` on Paper and Mist, `-dark.svg` on Forest and Ink. Echo uses `echo-tile.svg`. |
| `ejm-hero` with a motif class | A hero whose subject does not suit Orbit. | The motif replaces the drifting Orbit, so there is no ambient motion. |

## Markup for the patterns that need exact structure

### Sticky header with the mobile menu

```html
<header class="ejm-header ejm-header--sticky ejm-header--paper">
  <a class="ejm-header__logo" href="/" aria-label="ejmlabs home"><img src="/design-kit/logos/ejmlabs-primary.svg" alt="ejmlabs" width="234" height="40"></a>
  <details class="ejm-menu">
    <summary><span class="ejm-menu__label">Menu</span></summary>
    <nav class="ejm-nav" aria-label="Main">
      <a href="/projects/" aria-current="page">Projects</a>
      <a href="/approach/">How we work</a>
    </nav>
  </details>
</header>
```

Use `ejm-header--forest` with the Paper logo for a Forest bar. Add `<nav class="ejm-subnav" aria-label="On this page">` after the `details` for an in-page index. The nav is a normal list of links from 640 px and a drop-down panel under it, with no script. Browsers that do not support `::details-content` keep the Menu button at every width.

### Steps, stats and features

```html
<ol class="ejm-steps">
  <li class="ejm-step"><h3 class="ejm-step__title">Ask one question</h3><p class="ejm-step__text">One sentence.</p></li>
</ol>

<dl class="ejm-stats">
  <div class="ejm-stat"><dt class="ejm-stat__label">open source projects</dt><dd class="ejm-stat__value">3</dd></div>
</dl>

<div class="ejm-features">
  <div class="ejm-feature">
    <span class="ejm-feature__icon"><span class="ejm-icon ejm-icon--code" aria-hidden="true"></span></span>
    <h3 class="ejm-feature__title">A few words</h3>
    <p class="ejm-feature__text">One sentence.</p>
  </div>
</div>
```

### FAQ, callout and table

```html
<div class="ejm-faq">
  <details class="ejm-faq__item"><summary>A real question?</summary><div class="ejm-faq__answer"><p>A short answer.</p></div></details>
</div>

<aside class="ejm-callout ejm-callout--warning"><p class="ejm-callout__label">warning</p><p>What the reader must know.</p></aside>

<div class="ejm-table" role="region" aria-label="What the table shows" tabindex="0">
  <table>
    <caption>What the table compares</caption>
    <thead><tr><th scope="col">Name</th><th scope="col" class="ejm-table__num">Count</th></tr></thead>
    <tbody><tr><th scope="row">Row</th><td class="ejm-table__num">3</td></tr></tbody>
  </table>
</div>
```

### Docs layout

```html
<div class="ejm-docs">
  <details class="ejm-collapse ejm-docs__nav"><summary>Documentation</summary>
    <nav class="ejm-sidenav" aria-label="Documentation"><div><p class="ejm-sidenav__title">projects</p><ul><li><a href="#" aria-current="page">Page</a></li></ul></div></nav>
  </details>
  <details class="ejm-collapse ejm-docs__toc"><summary>On this page</summary>
    <nav class="ejm-toc" aria-label="On this page"><ul><li><a href="#one" aria-current="true">One</a></li></ul></nav>
  </details>
  <div class="ejm-docs__main ejm-prose"><!-- h1, text, h2 sections --></div>
</div>
```

### Article

```html
<article class="ejm-article">
  <header class="ejm-article__header">
    <p class="ejm-eyebrow">notes</p>
    <h1 class="ejm-article__title">Title</h1>
    <p class="ejm-article__lead">One sentence.</p>
    <p class="ejm-article__meta ejm-eyebrow"><time datetime="2026-10-18">18 October 2026</time></p>
  </header>
  <div class="ejm-prose"><!-- text --></div>
</article>
```
