# Open visual language

The site kit is open, calm and soft. Space and tone do the work that outlines and boxes used to do. The layer lives in `web/parts/15-open.css`. It loads after `11-balance.css` and before `20-dark.css`, and it reads only brand tokens, the band role variables (`--ejm-ground`, `--ejm-fg`, `--ejm-muted`, `--ejm-hairline`) and two tone variables, so dark mode follows with no extra rules. Sage still leads, Paper and Mist carry the page, Ink is type and Forest is a rare accent (see `SITES.md`).

## Principles

1. **Space before boxes.** Groups are separated by whitespace and hierarchy, not outlines. Section padding grows fluidly, about `clamp(72px, 11vw, 176px)`. Gaps inside a group are at least 24px, and row and item gaps follow the 8px grid. A visible border is allowed only on form fields, table rows (one hairline), code blocks, and dividers between list items (`ejm-faq`, `ejm-links`, the phone menu).
2. **Tone over outline.** Surfaces are tonal fills: Mist on Paper, Paper on Mist, Sage panels, a pale Paper mix on Forest and Ink. Never a 1px outline around a card, tag, callout or panel, and never a dashed box. No drop shadows except overlays (the phone menu). Cards are for objects only. A set of features, steps, stats or principles is open content, an icon or number plus text on the band, never a row of boxes.
3. **Soft shapes.** Panels, cards, callouts, figures and terminals use the large radius (24px). Buttons, tags, chips, pagination and the menu button are pills (999px). Inputs and code blocks use the medium radius (12px).
4. **Calm, larger type.** Body copy is fluid from 17px to 18px at line height 1.65. Headings keep the brand scale and get generous space above and below. Eyebrows, captions and table headings are 14px sans in sentence case, with no uppercase and no letter spacing. Mono is for names, code, versions and values only. Text measure is 60 to 68 characters.
5. **Open grids.** Asymmetric editorial splits (7/5 heads, 5/7 footers and showcases) instead of equal boxes. At most three items per row. Four items settle into two by two, never three and one. A large hero and wide gutters; everything lines up on the page column.
6. **Light chrome.** The header has no border and no background of its own (Paper on Paper). Navigation is text. A sticky header gets a hairline bottom edge only after the page scrolls, where scroll-driven animation exists. Breadcrumbs, pagination and the subnav are quiet. The footer is open, with generous space.
7. **Fluid and container aware.** Mobile first, no horizontal scroll from 320 to 5120px. Multi-column layouts collapse by 760px. Features, stats, steps, cards, projects, principles and cols read the width of their container (the page column, the docs main column, a sidebar layout main column, a demo frame), not the viewport. Space and type use `clamp()`.
8. **Open specimens.** Each pattern in `patterns.html` is a title, one calm sentence, a large live example on its own tonal ground, and the markup behind a quiet disclosure. The index is a compact list of pills, one scrolling row per group on phones.

## How tone works

`--ejm-tone` is the fill for a surface that sits on the current ground. It is Mist (`--ejm-theme-panel`) on a Paper ground, Paper (`--ejm-theme-raised`) on a Mist band, Paper on a Sage band, and a pale Paper mix on Forest and Ink. `--ejm-tone-alt` is the opposite fill, used one level deeper: the live example in a specimen sits on the tone of its band, and the cards inside it use the alt tone. The `--ejm-theme-*` names come from `20-dark.css`. Each has a brand token as a light fallback, so the layer works even if the dark part is absent.

## What changed

| Pattern | What changed | Before | After |
| --- | --- | --- | --- |
| Section rhythm (`ejm-band`, `ejm-head`) | Fluid padding up to 176px, 7/5 head, sage dot on the eyebrow | 128px bands, 1.1/1 head | Breathing bands, heading wide and text narrow |
| Eyebrow, captions | Sentence case, sans, 14px, no tracking | 12px mono, letter spaced | 14px sans label |
| Body text | 17 to 18px, line height 1.65 | 16px, 26px leading | Calm reading size |
| `ejm-header--sticky`, `ejm-header` | No border; hairline appears after scroll | Border under the bar always | Open bar, soft edge on scroll |
| `ejm-nav`, `ejm-menu` | Text links; menu button is a tonal pill; open menu has rounded foot and one overlay shadow | Outlined button, ruled rows | Quiet text and a pill |
| `ejm-subnav` | Pills, current one tonal | Underlined row with top rule | Quiet pills |
| `ejm-breadcrumb` | Muted with faint underlines | Full-strength links | Quiet trail |
| `ejm-pagination` | Tonal pills, solid current, faded disabled | Outlined squares, dashed disabled | Pills |
| `ejm-sidenav`, `ejm-toc` | No rail; current item a tonal pill | Ruled rail with edge marker | Open list |
| `ejm-hero` | Larger panel padding, index as pills, no rule | Rule above the index | Open Sage panel |
| `ejm-button` | Pill; secondary is a tonal fill | 4px radius, outlined secondary | Soft buttons |
| `ejm-tag`, `ejm-tags` | Pills; quiet tag is a Sage tint | 4px radius chips | Pills |
| `ejm-card`, `ejm-project`, `ejm-projects` | Tonal fill, 24px radius, no border; projects use a 5/7 base card | 1px outlined, 12px radius | Soft tonal objects |
| `ejm-features` | Icon in a tonal circle, no box, three across at most | Outlined icon box, five across | Open icon plus text |
| `ejm-stats` | No rule, large sans figures | Ruled, mono figures | Open numbers |
| `ejm-steps` | Number in a Sage circle, no rail | Left rail with dot | Open numbered steps |
| `ejm-timeline` | Filled Sage dots on a hairline | Ring dots | Quiet line |
| `ejm-quote` | Short Sage mark above, no left rule | 2px left border | Open pull quote |
| `ejm-principles` | Number in a tonal circle, no top rule | Ruled top | Open principles |
| `ejm-faq`, `ejm-links` | Taller rows, outer top rule removed; item dividers stay | Ruled top and bottom | Rows with dividers only between items |
| `ejm-links--compact` | Pill list; one scrolling row on phones | Ruled narrow rows | Chip list |
| `ejm-callout` | Tonal Sage fill, no border; tip and warning use deeper fills | Bordered with 4px edge | Soft panel |
| `ejm-status` | Tonal panel | Left rule on Mist | Soft panel |
| `ejm-table` | One hairline per row, no frame | Framed with radius | Open table |
| `ejm-code`, `ejm-terminal`, `ejm-figure__frame` | 12px code radius, 24px terminal and figure, no borders | 4px to 12px radii with hairlines | Soft |
| `ejm-footer` | More space, sans group labels, no legal rule | Mono labels, ruled legal line | Open footer |
| `ejm-cols`, `ejm-split`, `ejm-showcase` | Three across at most, wider gaps | Up to four across, 64px gaps | Open columns |
| `ejm-pattern` and parts | No frame, large tonal ground, quiet "Show markup" link | Bordered frame, 1px box, heavy index | Open specimen |
| `ejm-placeholder` | Tonal block | Dashed outline | Plain soft block |

## Edits to `10-base.css`

Only rules this layer replaces were removed:

- The framed `ejm-pattern` helper block and the dashed `ejm-placeholder` rule (now in `15-open.css`).
- The 760px `ejm-projects` and `ejm-project--base` column rules (now container based in `15-open.css`).
- The `ejm-pattern__demo` border in the forced-colors block (the layer restores edges for every tonal shape in forced colors).

## Notes for page authors

- Do not add a border to a card, tag, callout or panel. If a surface needs to stand out, change its ground.
- Sections are bands. Put a heading and one kind of content in each band, and let the padding do the separating.
- The container rules need `ejm-page` (or `ejm-docs__main`, `ejm-sidebar-layout__main`) around the pattern, which every band already has.
