# Open visual language

The application kit is open, soft and calm. Panels are told apart by tone and space, not by a box around everything. This page is the rulebook that `ui/app.css`, `ui/index.html` and `ui/tui.html` are built to. Apps stay compact, but compact is not boxy.

## Principles

1. **Tone before outline.** Regions step up through the surface roles (`ground`, `panel`, `editor`, `raised`, `overlay`) and are separated by space. A hairline (`line`) appears only where a divider does real work: under the title bar, between table rows, between list sections, above a docked panel body, and on form fields (`control-border`, 3:1). Messages, tool calls, empty states, banners, stat tiles and cards are tonal blocks with no outline.
2. **Soft, consistent shapes.** Controls 8 px. Buttons, chips, tags, badges, counts and switches are pills (999 px). Tool cards, menus, popovers and toasts 12 px. Dialogs, the palette and panels 16 px. Shadows belong to overlays only, and stay very soft.
3. **Open spacing.** The 4 px base, but between groups use 12, 16, 24 and 32. Rows are 32 px high with 12 px side padding, controls 32 px, large 40. Add `ejm-ui--compact` to the app root for the IDE: rows 28, controls 28. Never stack bordered boxes tightly, and align to columns.
4. **Quieter labels.** Labels, panel titles, table headers, menu section labels and list section heads are 12 px sentence case in the muted role. Plex Mono is for values, paths, names, ids and code only.
5. **Selected is tone plus a marker.** A selected row, tab, tree item or activity item is a `tint-1` tone with a 2 px primary marker on the leading edge. A selected chip, segment, page or toggle is a filled `tint-2` pill. Hover is one tone step. Focus is always the visible 2 px ring (`focus` role) with a 1 px offset.
6. **Fluid and responsive.** Mobile first, 320 px to 5120 px, no horizontal page scroll. The shell stacks: the sidebar sits above the main area (and the aside below it). Tabs scroll sideways. Tables scroll inside their own container. Dialogs become bottom sheets in a container under 560 px. Toolbars wrap, forms are one column, and a settings section stacks its label above its controls. Primitives that must adapt to where they are placed use container queries (`container-type: inline-size`): settings, stat tiles, charts, tool cards, panels and the dialog backdrop. On touch screens (`pointer: coarse`) every control is at least 44 px high.
7. **Open documentation.** `ui/index.html` and `ui/tui.html` are documents: a calm intro, a compact sticky pill index (a scrolling chip row on a phone), then one section per group with a title, one sentence and the primitives on open ground. Class names and notes sit behind a quiet disclosure. Sample data is labelled. Wide screens get a comfortable maximum width and multi-column compositions.

## Derived tones

Light themes have very close surface steps, so the kit mixes two roles to make one tonal step that reads in both themes. These are CSS custom properties defined on `.ejm-ui` from roles only. They are not new colors, and `theme.json` stays the single source.

| Property | Mix | Used for |
| --- | --- | --- |
| `--ejm-ui-block` | `line-strong` 30% into `raised` | Tonal blocks: tool calls, empty states, stat tiles, tables, toolbars, drop zones, code on a page |
| `--ejm-ui-fill` | `line-strong` 50% into `raised` | Buttons, segmented track, kbd, tags, chips |
| `--ejm-ui-fill-hover` | `line-strong` | Hover on a fill |
| `--ejm-ui-wash` | `hover` 50% into transparent | Hover on rows, tree items, list items, tabs |

Size properties, also set on `.ejm-ui`: `--ejm-ui-h` (control, 32), `--ejm-ui-h-sm` (28), `--ejm-ui-h-lg` (40), `--ejm-ui-row` (32). Compact and coarse pointers change them in one place.

## What changed, by primitive

| Primitive | What changed |
| --- | --- |
| Shell, titlebar, sidebar, aside, statusbar | Hairlines removed except under the title bar. Sidebar and status bar are `panel`, main is `editor`. Under 760 px the shell stacks. |
| Pane head, panel | Sentence-case 12 px titles, no outer frame. Panels are 16 px tonal blocks. A hairline stays only between a panel head and its body. |
| Tabs | No dividers. Rounded tab tops, selected tab joins the editor with a 2 px primary line. Scrolls sideways. |
| Rows, tree, list, vtabs, activity | 32 px, rounded 8 px, wash on hover, `tint-1` plus a 2 px primary marker when selected. Section heads are 12 px sentence case. |
| Button | Pill, 32 px, tonal fill with no border. Primary stays Sage. Group and split button join with a 2 px gap. |
| Input, textarea, select | 32 px, 8 px radius, the one kept outline (`control-border`). Focus is the 2 px ring. |
| Check, radio, switch | Rows are 32 px. Switch is a 36 by 20 pill. Boxes keep their 3:1 edge. |
| Segmented control, chip, pager, toggle | Pill shapes. Selected is a filled tint pill, with a check glyph on chips. No outline. |
| Badge, tag, count, kbd | Pills or soft keycaps in tint or fill. No border. |
| Menu, popover, palette, tooltip, toast | `overlay` tone, 12 to 16 px radius, no border, one very soft shadow. Section labels are 12 px sentence case. |
| Dialog | 16 px, no inner hairlines, bottom sheet in a container under 560 px. |
| Banner, empty state, error state | Tonal blocks with no border. Icons are soft shapes. |
| Message, tool call, diff | User message is a `tint-1` block. Tool call is a 12 px `--ejm-ui-block`. Diff sits on `editor`. No outlines. |
| Table | Tonal block, hairline between rows only, header 12 px sentence case, scrolls inside its wrapper. |
| Stat, key-value, chart, hbar, stackbar | Tiles are tonal blocks. Charts and tiles adapt to their container. Bars and tracks are soft. |
| Settings | Label and controls side by side wide, label above controls when the container is narrow. |
| Drop zone | Tonal block, no dashes. Over and invalid keep one edge, because color alone is not allowed to say it. |
| Terminal preview | 12 px radius. It paints `ground` like a real terminal, so it keeps one hairline. |
| Label, caption | Label is 12 px muted sans, sentence case, no tracking. |

## Writing for the specimens

Sentence case. Plain concrete words. Label every sample figure as sample data. No dashed placeholders. Controls show their states in a labelled row, with the label in 13 px muted text.
