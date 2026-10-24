# Containerless layout

Historical source and review record. See the [retained-source notice](../README.md). File paths, commands, and asset availability below describe the earlier kit, not current production.

The ejmlabs kit has no containers. A container is a class whose job is to group content in a filled, bordered or shadowed box: cards, panels, tiles, tonal boxes, the hero panel. They are removed. Structure comes from four things only:

1. **Display type** at a large scale, with generous whitespace.
2. **Hairline rows**: 1px rules between rows of related content (`ejm-rows`, `ejm-stats`, `ejm-status`, `ejm-links`).
3. **Full-bleed tonal bands**: `ejm-band--paper`, `--mist`, `--sage`, `--ink`, `--forest`. Sage leads (about 30 percent of a page), Paper and Mist about 60 percent, Forest under 10 percent, Ink for type and the footer.
4. **Floating objects**: product windows and overlays are the only things that cast a shadow.

Controls (buttons, inputs, the theme toggle, menus, pagination) keep their pill shapes. Tags are plain mono text with a slash between them. Code and terminal blocks are objects, not groups, so a flat tonal ground is allowed for them.

`containers-removed.json` lists every removed class name (no leading dot). The removal check reads it. In the tables below the removed names are written without backticks on purpose, so the class guard does not treat them as live classes. Rows marked "owned by later workstream" are still defined in a part or file that another workstream rewrites; they must be gone before the migration step ends.

## How the language works

| Part | How it is built |
| --- | --- |
| Page | Paper ground (a deep Ink page in dark). Bands change the tone full width. Type, space and rhythm are in rem, so they scale with the root size on large screens. |
| Section head | `ejm-head`: a mono kicker (`ejm-eyebrow`, shown as "/ label"), a large heading (`ejm-h2` or `ejm-statement`) and supporting copy (`ejm-head__text`) on a wide two-column measure that stacks on narrow columns. |
| Hero | `ejm-hero` holds the header and `ejm-hero__body`: kicker, `ejm-display` (up to 128px, scaled on ultrawide), `ejm-lead`, buttons, and an optional `ejm-hero__index`. Add an `ejm-hero__visual` child and the body becomes two columns from 1000px, reserving the right for floating product windows. |
| Rows | `ejm-rows` with `ejm-row`: title, description, mono meta and an arrow on one hairline row. A link in the title stretches over the row. Hover washes the row and slides the arrow. |
| Stat figures | `ejm-stats`: large numerals over a mono label, one hairline above each. |
| Callout | `ejm-callout`: a left rule and a mono label. |
| Definition rows | `ejm-status`: a mono term, a value, a hairline between. |
| Footer | `ejm-band--ink` plus `ejm-footer`: signature in large type, link columns, legal line. |

Band roles. Every band sets the same variables, so any part reads correctly on any band: `--ejm-ground`, `--ejm-fg`, `--ejm-muted`, `--ejm-hairline`, `--ejm-wash` (a faint hover tint), `--ejm-tone` (a solid step off the ground for objects) and the button roles `--ejm-btn-*`. Text on Sage is Ink (5.09:1). Forest on Sage (3.6:1) is for large type only, as in the second beat of a display heading.

Dark. The page is a deep Ink, type is Mist, Mist bands become a slightly lighter panel tone, and Sage, Forest and Ink bands keep their brand colors with the same type as in light.

## Container inventory

Every container class that was defined in `web/parts/` (and `components/brand-components.css`, `ui/app.css`) before this rewrite, and what happened to it. Status is `removed` or `kept`.


### Site kit: cards, projects, hero panel (10, 11, 15, components)

| Class | Status | Replacement or reason |
| --- | --- | --- |
| ejm-card | removed | Hairline row (ejm-row) for a list item, or plain type in a column (ejm-feature, ejm-principle). No fill, border or radius. |
| ejm-cards | removed | ejm-rows for a list, ejm-features or ejm-principles for columns of text. |
| ejm-card__title | removed | ejm-row__title in a row, or ejm-feature__title in a column. |
| ejm-project | removed | ejm-row: title, description and mono meta on one hairline row. The featured project is a Sage band with ejm-statement. |
| ejm-projects | removed | ejm-rows. |
| ejm-project__name | removed | ejm-row__title. |
| ejm-project__summary | removed | First sentence of ejm-row__text. |
| ejm-project__text | removed | ejm-row__text. |
| ejm-project__relation | removed | A mono line in ejm-row__meta, for example "built on ejm-harness". |
| ejm-project__meta | removed | ejm-row__meta with ejm-tags (plain mono text separated by slashes). |
| ejm-project__link | removed | The title link of the row. A link in ejm-row__title stretches over the whole row. |
| ejm-project--base | removed | A Sage band (ejm-band--sage) holding ejm-statement and ejm-stats. |
| ejm-parts | removed | ejm-status definition rows (mono term, value, hairline between). |
| ejm-hero--paper | removed | The default hero already sits on the page ground, so there is nothing to opt into. |
| ejm-hero--forest | removed | Put ejm-band--forest on the hero element for a full-bleed Forest hero, or keep the page ground. |
| ejm-figure__frame | removed | No frame. The image is an object placed directly in ejm-figure, with a mono caption. |

### Site kit: parts that were boxes and are now restyled (kept names)

| Class | Status | Replacement or reason |
| --- | --- | --- |
| `ejm-hero__body` | kept | Kept for pages that use it. The Sage rounded panel behind the hero is gone: display type on the page ground. |
| `ejm-hero__index` | kept | Pill links are now plain mono links on one hairline row. |
| `ejm-status` | kept | Tonal box with side border is gone: definition rows with hairlines. |
| `ejm-callout` | kept | Tonal box is gone: a left rule and a mono label. |
| `ejm-quote` | kept | Large type and a mono credit, no rule box. |
| `ejm-tag` | kept | Plain mono text, no pill. Control-like only when it is a link (44 px target). |
| `ejm-tags` | kept | A line of ejm-tag with slashes between them. |
| `ejm-feature` | kept | Icon chip is gone: bare glyph, title, text under a hairline. |
| `ejm-feature__icon` | kept | Bare glyph, no ring or tonal circle. |
| `ejm-features` | kept | Columns of text under hairlines. |
| `ejm-principle` | kept | Mono number replaces the numbered circle. |
| `ejm-principles` | kept | Columns of text under hairlines. |
| `ejm-step` | kept | Mono number replaces the Sage numbered circle. |
| `ejm-steps` | kept | Columns of text under hairlines. |
| `ejm-links--compact` | kept | A plain line of text links, not pills. |
| `ejm-subnav` | kept | The current page is underlined, not a tonal pill. |
| `ejm-sidenav` | kept | Hairline rail with a stronger rule on the current item, not a pill. |
| `ejm-toc` | kept | Hairline rail with a stronger rule on the current item, not a pill. |
| `ejm-table` | kept | Hairlines only, no outer border or radius. |
| `ejm-announce` | kept | A thin full-width band, not a box. |
| `ejm-footer` | kept | The Ink band at the foot of the page. |

### Site kit: controls and objects (kept)

| Class | Status | Replacement or reason |
| --- | --- | --- |
| `ejm-button` | kept | Control: pill. Sage (Ink on light grounds, Sage on Ink) with Ink type. |
| `ejm-button--secondary` | kept | Control: outlined pill, 1px currentColor border (3:1 or better). |
| `ejm-input` | kept | Control: pill field (soft corner on a textarea). |
| `ejm-field` | kept | Control wrapper: label, input and hint. No ground. |
| `ejm-theme-toggle` | kept | Control: round 44 px button with a 1px border. |
| `ejm-menu` | kept | Control: outlined pill that opens the mobile navigation. |
| `ejm-collapse` | kept | Control: outlined pill disclosure. |
| `ejm-pagination` | kept | Control: outlined pill buttons. |
| `ejm-code` | kept | Object: a code block may have a flat tonal ground. It is a thing, not a group. |
| `ejm-terminal` | kept | Object: terminal output may have a flat ground, small radius, no border or shadow. |
| `ejm-surface` | kept | A ground helper for a full-width region. No padding, border, radius or shadow. |
| `ejm-surface--forest` | kept | The Forest ground helper, full width. |
| `ejm-signature` | kept | Object: a logo with its clear space. No ground. |
| `ejm-pattern__demo` | kept | Specimen stage on a flat ground (patterns.html only). Not for site pages. |
| `ejm-placeholder` | kept | Specimen helper: a flat wash, no dashed box. Not for site pages. |
| `ejm-header--sticky` | kept | A frosted full-width bar with a hairline foot. |
| `ejm-header--paper` | kept | The sticky bar on the page ground. |
| `ejm-header--forest` | kept | The sticky bar in Forest. |

### Demo frame (50-demo)

| Class | Status | Replacement or reason |
| --- | --- | --- |
| `ejm-demo__window` | kept | Object: the interactive demo. Flat, one hairline, small radius, no shadow. |
| `ejm-demo__gov` | kept | Inside the demo window: now a hairline section instead of a bordered box. |
| `ejm-demo__session` | kept | Inside the demo window: now a hairline row instead of a bordered box. |

### Hero and product composition (16-hero, owned by later workstream)

| Class | Status | Replacement or reason |
| --- | --- | --- |
| ejm-product-hero | removed | owned by later workstream: hero tint panel goes: type-led hero on the page ground with floating windows. |
| ejm-product__stat | removed | owned by later workstream: stat figure (large numeral, mono label), no tonal tile. |
| ejm-product__stats | removed | owned by later workstream: ejm-stats style row of figures. |
| `ejm-product__window` | kept | owned by later workstream: object: a floating product window is the one place elevation is used. |
| `ejm-product__tool` | kept | owned by later workstream: object inside a product window. |
| `ejm-product__msg` | kept | owned by later workstream: object inside a product window. |

### Art and surfaces (18-art, owned by later workstream)

| Class | Status | Replacement or reason |
| --- | --- | --- |
| ejm-art-frame | removed | owned by later workstream: rounded clipped frame goes: art sits full-bleed on a band or bare on the page. |
| ejm-art-panel | removed | owned by later workstream: padded rounded panel goes: art-led section on a band with display type. |
| `ejm-surface-gradient` | kept | owned by later workstream: band texture only. Must be full-bleed, never a rounded box. |

### Docs (19-docs, owned by later workstream)

| Class | Status | Replacement or reason |
| --- | --- | --- |
| ejm-docs__pager-link | removed | owned by later workstream: bordered link box goes: a hairline ejm-row with the arrow. |
| `ejm-codeblock` | kept | owned by later workstream: object: code with a copy control. |
| `ejm-tabs` | kept | owned by later workstream: control: segmented pill tabs. |

### Gallery (60-gallery, owned by later workstream)

| Class | Status | Replacement or reason |
| --- | --- | --- |
| `ejm-gallery-stage` | kept | owned by later workstream: specimen object: a ground that shows an asset. |
| `ejm-gallery-asset__media` | kept | owned by later workstream: specimen object: the asset itself. |
| `ejm-gallery-asset__pair` | kept | owned by later workstream: specimen object: two assets side by side. |
| `ejm-gallery-swatch` | kept | owned by later workstream: specimen object: a color sample is the thing being shown. |
| `ejm-gallery-pair` | kept | owned by later workstream: specimen object: a contrast sample. |
| `ejm-gallery-copy` | kept | owned by later workstream: control: pill copy button. |
| `ejm-gallery-toast` | kept | owned by later workstream: overlay: elevation allowed. |

### Application kit (ui/app.css, owned by later workstream)

| Class | Status | Replacement or reason |
| --- | --- | --- |
| ejm-ui-panel | removed | owned by later workstream: section with a mono title and a hairline above. No fill, border or radius. |
| ejm-ui-panel--docked | removed | owned by later workstream: same section, docked by position only. |
| ejm-ui-stat | removed | owned by later workstream: stat figure: large numeral, mono label, hairline above, delta in text. |
| ejm-ui-banner | removed | owned by later workstream: callout: left rule and a text label. |
| ejm-ui-empty | removed | owned by later workstream: centered type: a sentence and one action, no ground. |
| ejm-ui-tablewrap | removed | owned by later workstream: hairline table, no ground or radius. |
| ejm-ui-tool | removed | owned by later workstream: hairline row with a state dot and the tool name. |
| ejm-ui-dash__tiles | removed | owned by later workstream: a row of stat figures separated by space and hairlines. |
| `ejm-ui-dialog` | kept | owned by later workstream: overlay: elevation allowed. |
| `ejm-ui-popover` | kept | owned by later workstream: overlay: elevation allowed. |
| `ejm-ui-menu` | kept | owned by later workstream: overlay: elevation allowed. |
| `ejm-ui-tooltip` | kept | owned by later workstream: overlay: elevation allowed. |
| `ejm-ui-toast` | kept | owned by later workstream: overlay: elevation allowed. |
| `ejm-ui-palette` | kept | owned by later workstream: overlay: elevation allowed. |
| `ejm-ui-sidebar` | kept | owned by later workstream: region of an application window (an object), separated by hairlines. |
| `ejm-ui-aside` | kept | owned by later workstream: region of an application window (an object), separated by hairlines. |
| `ejm-ui-statusbar` | kept | owned by later workstream: region of an application window (an object), separated by hairlines. |
| `ejm-ui-toolbar` | kept | owned by later workstream: control bar. |
| `ejm-ui-code` | kept | owned by later workstream: object: code. |
| `ejm-ui-diff` | kept | owned by later workstream: object: a diff. |
| `ejm-ui-log` | kept | owned by later workstream: object: log output. |
| `ejm-ui-msg--user` | kept | owned by later workstream: chat message inside a window, an object. |
| `ejm-ui-drop` | kept | owned by later workstream: control: a drop target keeps its dashed outline as its affordance. |
| `ejm-ui-skel--block` | kept | owned by later workstream: temporary loading shape. |
| `ejm-ui-skel--chart` | kept | owned by later workstream: temporary loading shape. |

## New parts

New or changed classes in this rewrite. Same table style as `GALLERY.md`.

| Class | Use | Notes |
| --- | --- | --- |
| `ejm-band--paper` | A full-bleed band on the page ground. | Use it to set a band apart in code; it looks like the page. |
| `ejm-band--mist` | A full-bleed Mist band (a quiet panel tone in dark). | Mist about 60 percent together with Paper. |
| `ejm-band--sage` | A full-bleed Sage band with Ink type. | The lead tone, about 30 percent of a page. Stays Sage in dark. |
| `ejm-band--ink` | A full-bleed Ink band. | Footer, or one reversed moment. Stays Ink in dark. |
| `ejm-band--forest` | A full-bleed Forest band. | Under 10 percent of a page. |
| `ejm-statement` | A huge sentence for a Sage band, above stat figures. | One per band. Max 24 characters wide, balanced. |
| `ejm-rows` | The hairline list. A `ul` with `ejm-row` items. | `ejm-rows--compact` for smaller titles and tighter rows. |
| `ejm-row` | One row: grid of title, text, meta and arrow. | Stacks in a narrow column and runs in four columns from 760px of column width. |
| `ejm-row__title` | The row name, a heading. | A link inside it covers the whole row. Gets the arrow, up-right when `rel="external"`. |
| `ejm-row__text` | The row description. | One or two sentences, muted. |
| `ejm-row__meta` | Mono facts. | Plain text or an `ejm-tags` line. Right aligned on wide columns. |
| `ejm-rows--compact` | A tighter rows list. | For link lists inside a section. |
