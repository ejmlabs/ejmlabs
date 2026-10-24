# Editorial parts

Historical source and review record. See the [retained-source notice](../README.md). File paths, commands, and asset availability below describe the earlier kit, not current production.

The type and rhythm parts that give a page its voice: a display tier, mono metadata, labelled facts, a dated feed, and buttons and links with an arrow. They live in `web/parts/17-editorial.css` (built into `web/site.css`), load after the open layer and before the dark part, and read only the brand tokens and the band role variables (`--ejm-ground`, `--ejm-fg`, `--ejm-muted`, `--ejm-hairline`, `--ejm-btn-*`), so every band and both themes follow. Type is Manrope and IBM Plex Mono only. See `editorial.html` for a live page and `OPEN.md` for the layer underneath.

Confidence comes from scale contrast, tight tracking at large sizes, balanced wrapping and tabular numerals, not from extra fonts or boxes.

## Rules that apply everywhere

- Headings (`h1` to `h4`) and block quotes wrap balanced, so a heading never ends on one short word. Paragraphs, list items and descriptions wrap with `text-wrap: pretty`. Both are set at zero specificity, so a rule of your own can still override them.
- Dates, tables, counters and stat values use tabular numerals, so columns of figures line up.
- Body text is 17 to 18px with a line height of 1.65 up to 1919px, then follows the screen scale to 20px. It stops at 20px from 3200px up: reading size does not keep growing, whitespace and display type carry the extra room.

## Type

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-display` with `ejm-display--xl` | One statement per page, usually the hero heading. Fluid from 44px on a phone to 120px, tracking -0.05em, line height 1. | More than once per page, or for ordinary section headings; use `ejm-h2`. | Write the class on the page's one `h1`, or on a `p` when the heading is elsewhere. Keep it to a short phrase; lines are balanced and words never break. Pair with `ejm-display__quiet` for a second beat. |
| `ejm-display` with `ejm-display--lg` | A second large statement, such as a section opener or a pull line. Fluid from 36px to 80px, tracking -0.04em. | Next to an `--xl` in the same view without a reason for the contrast. | Same wrapping as `--xl`. Inside `ejm-stack` it gets extra room below, so a label after it does not crowd it. |
| `ejm-meta` | A short mono label for a version, date, size or other value. 14px, muted, tabular. | Running text or headings; mono is for names and values only. | Keep it to a few words. It reads the muted role, so it keeps its contrast on Paper, Mist, Sage, Forest and Ink. |
| `ejm-numeral` | Inline figures that must align or keep lining numerals, such as "17 and 20 px" in a sentence. | Whole paragraphs. | A `span` around the number. Same text for assistive technology; only the figure shapes change. |

## Facts

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-facts` | A short list of labelled facts about one thing, such as version, license, stack and status. A `dl` that measures its own width: label beside value from 360px, label above value below it. | Free text, or a comparison across many things; use `ejm-table`. | Use `dl`. Each row is `ejm-facts__row` holding one `dt` (the label) and one `dd` (the value). Values wrap, never clip, and align as tabular figures. A hairline sits between rows, none above the first or below the last. |
| `ejm-facts__row` | The pair of one label and one value inside `ejm-facts`. | Outside `ejm-facts`. | One `div` per fact, with `dt` first. The `div` grouping inside a `dl` is valid HTML and keeps the pair together for screen readers. |

## Feed

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-feed` | A list of dated entries such as releases, notes or changes, scannable without cards. An `ol`, newest first. Wide: date, title with description, category. Narrow: date and category on one line, then title and description. It measures its own width. | A few unrelated links; use `ejm-links`. | Each entry is `ejm-feed__item`. Entries are separated by space and one hairline. Give the list a heading before it. |
| `ejm-feed__item` | One entry in `ejm-feed`. | Outside it. | A `li` with, in this order, `ejm-feed__date`, `ejm-feed__title`, `ejm-feed__text` and `ejm-feed__category`. The whole row is the click target through the title link. |
| `ejm-feed__date` | The entry's date. Mono, muted, tabular. | A date range or free text. | Use `time` with a `datetime` attribute. |
| `ejm-feed__title` | The entry's title. | Outside `ejm-feed__item`. | An `h3` (or the level your outline needs) that holds one `ejm-feed__link`. Titles wrap balanced. |
| `ejm-feed__link` | The link inside the title. | Anywhere else. | One link per entry with a clear name. It stretches over the row, so the whole row is the target (at least 44px tall on touch). Focus draws a 2px ring around the whole row, in the band's ring color, and hover underlines the title. |
| `ejm-feed__text` | One short sentence that says what the entry is. | Long paragraphs. | Muted, up to 60 characters wide. Optional. |
| `ejm-feed__category` | The entry's kind, such as Release or Note. | Status or a tag list; use `ejm-tag`. | One or two words, plain text. Optional. |

## Buttons and links

The button colors come from the band (`--ejm-btn-*`, see `SITES.md`): Sage with Ink text on light grounds, Ink on Sage, Sage on Forest and Ink. This part adds states and an arrow without changing those colors.

| State | Primary button | Secondary button | Link |
| --- | --- | --- | --- |
| Rest | Band button color | Soft tonal fill | Underlined, accent color |
| Hover | Hover color of the band (Forest on light, lighter Sage in dark) | Deeper tonal fill | Thicker underline |
| Focus | 2px ring in the band's ring color, 3px away | Same | Same, with a small radius |
| Pressed | Hover color mixed with Ink, and a 2% shrink (tone only under reduced motion) | Deepest tonal fill | Hover color |

| Class | Use it when | Do not use it when | Content and accessibility |
| --- | --- | --- | --- |
| `ejm-button` with `ejm-button--arrow` | A call to action that moves the visitor forward, on the primary or the secondary button. The arrow moves 4px right on hover and focus. Add `rel="external"` for an up-right arrow that moves up and right. | More than one per band, or for actions that submit or delete. | Keep the label a plain verb phrase. The arrow is decoration and adds no text. Under reduced motion the arrow stays still and only the tone changes. On touch screens every button is at least 44px in both directions. |
| `ejm-link` with `ejm-link--arrow` | A standalone link that goes on to another page or section, such as "Read the guidance". Semibold, no resting underline, underline on hover and focus. | A link inside a sentence, which keeps its underline and the line it is in; or a link that leaves the site, which keeps the small external arrow. | An `a` with a clear name. At least 44px in both directions on touch screens. The arrow moves 4px on hover and focus unless the visitor asked for reduced motion. |

## Page rules

- One display statement per page. Use `--lg` for a second, and `ejm-h2` for every section heading.
- Facts for a thing, a feed for a time, `ejm-links` for a set of destinations. Do not put cards around a feed.
- Mono is for dates, versions and values. Labels, categories and body copy are Manrope.
- Do not set a font size, tracking or wrapping on a page. If a size is missing, ask for a tier here.
