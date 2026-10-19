# Site kit

How every ejmlabs website is built, so they all look the same. `web/site.css` holds the page shell and sections. `web/starter.html` is the page to copy. ejmlabs.com is the first site built from it. For application interfaces see `UI.md`.

## Start a site

1. Copy `web/starter.html` to `index.html`.
2. Keep the `design-kit/` folder with the site, at `/design-kit/` or beside the page. Motif and font URLs are relative to the CSS files.
3. Replace the placeholder copy. Keep the structure.

A site loads exactly three style sheets, in this order, and adds no CSS of its own:

```html
<link rel="stylesheet" href="/design-kit/tokens/brand.css">
<link rel="stylesheet" href="/design-kit/components/brand-components.css">
<link rel="stylesheet" href="/design-kit/web/site.css">
```

If a pattern is missing, add it to `web/site.css`, to `web/PATTERNS.md` and to `web/patterns.html` so the next site gets it too. Do not write page CSS.

## Page anatomy

One page follows this order. Leave a section out rather than reordering.

1. **Header** on the page, then the **hero**: a rounded Sage panel with the signature art. One `h1`, one lead, at most two buttons, and an index of links.
2. **Bands**, alternating Paper and Mist, each with a head (label, `h2`, supporting text) and one kind of content.
3. **Closing band** on Sage for principles or a call to action. Use Forest or Ink here only when you need the page's one reversed moment.
4. **Footer** on Ink: logo and signature, link groups, legal line.

Multi-page sites may use `ejm-header--sticky` instead. It sits directly under `<body>`, above the hero, and the hero then has no header of its own.

The classes are listed in `web/PATTERNS.md`, with when to use each one and when not to. `web/patterns.html` shows every pattern live, with its exact markup. Choose from that set. Do not write page CSS.

Brand components still apply inside: `ejm-page` for the 1200 px column, `ejm-button`, `ejm-tag`, `ejm-code`, `ejm-prose`. Put `ejm-page` on the inner wrapper of every band.

## Choosing patterns

Start from what you need to say, then take the pattern in the list.

- Open the home page: `ejm-hero` (Sage panel). Open a calmer page: `ejm-hero--paper`. Show the product beside the pitch: `ejm-hero--split`. Open an inner page: `ejm-hero--compact` with `ejm-breadcrumb`.
- Introduce a section: `ejm-head` on a band.
- Present two or three things you made: `ejm-projects` on the home page, `ejm-cards` anywhere else.
- Explain what it does in a few points: `ejm-features`. Show plain facts: `ejm-stats`. Show how it works: `ejm-steps`, or `ejm-showcase` with code or a terminal.
- Show what happened and when: `ejm-timeline`.
- Say what you believe: `ejm-principles`, or one sentence in `ejm-quote`.
- Answer questions: `ejm-faq`. Warn or note something: `ejm-callout`.
- Compare things: `ejm-table`. Show a picture of the work: `ejm-figure`.
- List resources or pages: `ejm-links`. Label things: `ejm-tags`. Credit what it is built with: `ejm-logo-row`.
- Write at length: `ejm-article`. Document something: `ejm-docs`.
- Arrange content: `ejm-split` for two, `ejm-cols` for three or four, `ejm-sidebar-layout` for a nav beside content, `ejm-measure` for readable text.
- Help people move around: `ejm-header--sticky` with `ejm-menu`, `ejm-subnav`, `ejm-pagination`.
- Say one thing at the top of every page: `ejm-announce`.
- Ask for one action at the end: `ejm-cta`.
- Add texture to a band: one `ejm-motif-*` class, one family per page.

If two patterns fit, take the plainer one. A band holds one kind of content.

## Page recipes

Leave a step out rather than reordering.

**Landing page**

1. `ejm-announce` (only if there is one true thing to say)
2. `ejm-hero` (Sage panel) with the header above it
3. `ejm-projects` or `ejm-cards` in a Mist band, under `ejm-head`
4. `ejm-features` in a Paper band
5. `ejm-stats` or `ejm-steps` in a Mist band
6. `ejm-principles` on a Sage band
7. `ejm-cta` (center) on Mist, or on Sage when there is no Sage band above it
8. `ejm-footer`

**Project page**

1. `ejm-header--sticky` with `ejm-menu` and `ejm-subnav`
2. `ejm-hero--split` or `ejm-hero--compact`, with `ejm-breadcrumb`
3. `ejm-features` under `ejm-head`
4. `ejm-showcase` with real code or a terminal
5. `ejm-table` for what it is built with, or `ejm-steps` for how to start
6. `ejm-faq` in a Mist band
7. `ejm-cta` (split) on Sage
8. `ejm-footer`

**Docs page**

1. `ejm-header--sticky` with `ejm-menu`
2. `ejm-hero--compact` on Paper, with `ejm-breadcrumb`
3. `ejm-docs`: `ejm-sidenav` on the left, `ejm-prose` in the middle, `ejm-toc` on the right
4. `ejm-callout` for notes and warnings, `ejm-table` and `ejm-code` inside the prose
5. `ejm-pagination` to the previous and next page
6. `ejm-footer`

## Rules

**Logo.** Use the supplied SVGs. The full-color primary logo (Sage symbol, Ink name) on Paper, Mist and in the header, always. Paper logo only on Forest and Ink. Never type the name in Manrope. Keep half the symbol height clear on every side.

**Color.** Sage leads, as in the brand guide ("Sage at the center"). Paper and Mist carry the page, Ink carries the type, Sage is the brand surface and Forest is the quiet accent.
- Aim for about 60 percent Paper and Mist, 30 percent Sage, under 10 percent Forest, and Ink for type and the footer.
- Sage is the hero panel, primary buttons, tags, the page's one big band, and the symbol art. Ink on Sage is 5.09:1, an approved pair, so text on Sage is Ink.
- Forest is for link color, hover states, the large second beat of the headline on Sage (3.6:1, large type only), and at most one reversed panel or band per page.
- Sage on Paper is 2.75:1, so Sage never carries small text on Paper or Mist. Small text on Forest or Ink is Paper or Mist.
- A page that is mostly Forest is wrong. If you reach for Forest as a background, use Sage instead.

**Type.** Manrope 600 for headings, 400 for body, Plex Mono for names, versions and labels. Sentence case. Hero type scales with the viewport; everything else uses the brand scale.

**Writing.** Plain and concrete. Describe what exists. Never claim a product, launch, customer or number we have not shipped. No em dashes.

**Layout.** One subject per band. Hierarchy comes from space and size before lines, lines before boxes. Cards are for objects such as projects. Lists are rows.

**Motion.** One ambient motion, the Orbit lines drifting in the hero over 32 seconds, linear. Interface changes take 180 ms. Everything stops under `prefers-reduced-motion`.

**Accessibility.** Skip link first. One `h1`, headings in order. Visible focus. Links are underlined or clearly marked. Touch targets are at least 44 px. No horizontal scroll at 320 px. Real text, not images of text. `alt` on every image, empty only when decorative.

**Metadata.** Title in the form "Page, ejmlabs". A description, canonical URL, the social card from `social/social-card.png`, favicons from `favicon/`, and `theme-color` set to Sage.

## Checks before shipping

- Look at it at 320, 768 and 1440 px, and at 200% text size.
- Tab through it. Focus must always be visible.
- Turn on reduced motion. Nothing should move.
- Run the site's test. It fails on a broken local link, a missing `alt`, a second `h1`, or a skipped heading level.
