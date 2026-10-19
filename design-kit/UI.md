# Application kit

Everything an ejmlabs product needs that is not a marketing page: desktop apps, web apps, terminal apps, editors and terminals. Open `ui/index.html` for the visual reference. For terminal apps read `ui/TUI.md`. For websites read `SITES.md`.

## One source, many targets

`ui/theme.json` is the only place colors are defined. `node scripts/build-ui.mjs` checks contrast and generates everything else. Never edit a generated file; change the theme and rebuild.

| File | For |
| --- | --- |
| `ui/theme.css` | CSS variables, `--ejm-ui-*`, dark and light |
| `ui/app.css` | Application components built on those variables |
| `ui/rust/ejm_theme.rs` | ratatui palettes, 16 color fallbacks and glyphs |
| `ui/monaco/ejmlabs-dark.json`, `ejmlabs-light.json` | Monaco editor themes |
| `ui/terminal/` | iTerm, Warp, Alacritty, kitty, Ghostty and Windows Terminal schemes |

`node scripts/build-ui.mjs --check` fails when a file is stale or any text role drops under 4.5:1 on any surface. The site's tests run it.

## Roles

Dark is the default and light mirrors it. Both start from the brand palette: Sage, Forest, Ink, Paper and Mist. Sage leads: it is `primary` in both themes, so the primary button is Sage with Ink text (5.09:1). Forest is the light-mode `accent` and focus ring, never a surface. Status, special, diff and syntax colors are kit additions because the guide defines none.

| Group | Roles |
| --- | --- |
| Surfaces | `ground`, `panel`, `editor`, `raised`, `overlay`, `hover`, `line`, `line-strong` |
| Text | `text-strong`, `text`, `text-muted`, `text-subtle` |
| Brand | `primary`, `on-primary`, `accent`, `accent-strong`, `tint-1`, `tint-2`, `tint-3` |
| Status | `error`, `warning`, `success`, `special` |
| Diff | `diff-add`, `diff-add-bg`, `diff-del`, `diff-del-bg` |
| Neutral ramp | `n0` to `n15`, deepest surface to strongest text |
| Hues | `hue-1` to `hue-6`, for graphs, lanes and charts |
| Syntax | `syn-comment`, `syn-keyword`, `syn-string`, `syn-number`, `syn-type`, `syn-function`, `syn-macro`, `syn-parameter`, `syn-property`, `syn-constant`, `syn-namespace`, `syn-delimiter` |

Use a role by name. Do not mix a literal hex into component CSS.

## Setup

```html
<link rel="stylesheet" href="design-kit/tokens/brand.css">
<link rel="stylesheet" href="design-kit/ui/theme.css">
<link rel="stylesheet" href="design-kit/ui/app.css">
<html data-theme="dark"> ... <body class="ejm-ui">
```

Without `data-theme` on the root, the system preference decides. Set `data-theme` on any `.ejm-ui` container to theme a part of the screen.

### Tailwind

Map the roles once and keep using utilities.

```css
@theme inline {
  --color-ground: var(--ejm-ui-ground);
  --color-panel: var(--ejm-ui-panel);
  --color-editor: var(--ejm-ui-editor);
  --color-raised: var(--ejm-ui-raised);
  --color-line: var(--ejm-ui-line);
  --color-text: var(--ejm-ui-text);
  --color-muted: var(--ejm-ui-text-muted);
  --color-primary: var(--ejm-ui-primary);
  --color-accent: var(--ejm-ui-accent);
  --color-danger: var(--ejm-ui-error);
}
```

### Monaco

```ts
import dark from './design-kit/ui/monaco/ejmlabs-dark.json';
import light from './design-kit/ui/monaco/ejmlabs-light.json';
monaco.editor.defineTheme('ejmlabs-dark', dark);
monaco.editor.defineTheme('ejmlabs-light', light);
```

## Moving ejm-ide onto the kit

The IDE's `theme.css` and `editor-theme.ts` are the origin of these roles, so the move is a rename.

| ejm-ide | Kit |
| --- | --- |
| `--k0` to `--k15` | `--ejm-ui-n0` to `--ejm-ui-n15` |
| `--primary`, `--accent`, `--on-primary` | same names after `--ejm-ui-` |
| `--accent-light` | `--ejm-ui-accent-strong` |
| `--tint-1` to `--tint-3` | `--ejm-ui-tint-1` to `-3` |
| `--error`, `--warning`, `--success` | same names after `--ejm-ui-` |
| `--violet` | `--ejm-ui-special` |
| `--lane-1` to `--lane-6` | `--ejm-ui-hue-1` to `-6` |

One value changed: the light-mode macro color is darker (`6F6F1D`, was `7A7A22`) because the old one measured 4.30:1 on the editor.

## Layout and density

- Spacing runs on a 4 px base and an 8 px grid. Use the brand spacing steps.
- Controls and list rows are 28 px high. Title bar 36, tab and pane header 32, status bar 24.
- Radius: 4 px for controls, 12 px for overlays and the command palette.
- Separate panels with hairlines (`line`), not boxes. Cards are for objects: a tool call, a result, a record.
- Only overlays cast a shadow. Nothing else floats.
- Touch surfaces need 44 px targets. Desktop density does not carry over to phones.

## Type

Manrope for interface text, IBM Plex Mono for names, values, paths, versions and short labels.

| Style | Size / line | Class |
| --- | --- | --- |
| Label | 11 / 16 mono | `ejm-ui-label` |
| Caption | 12 / 16 | `ejm-ui-caption` |
| Body | 13 / 20 | default |
| Title | 16 / 24, 600 | `ejm-ui-title` |
| Heading | 20 / 28, 600 | `ejm-ui-heading` |

Use sentence case. No em dashes.

## Components

Defined in `ui/app.css`; see each in `ui/index.html`.

- Shell: `ejm-ui-shell`, `ejm-ui-titlebar`, `ejm-ui-sidebar`, `ejm-ui-main`, `ejm-ui-aside`, `ejm-ui-statusbar`, `ejm-ui-pane__head`.
- Navigation: `ejm-ui-tabs` with `ejm-ui-tab`, `ejm-ui-row` for lists and trees. Mark the current item with `aria-selected="true"`.
- Controls: `ejm-ui-btn` with `--primary`, `--ghost`, `--danger`, `--icon`; `ejm-ui-input`; `ejm-ui-kbd`.
- Status: `ejm-ui-badge` with `--success`, `--warning`, `--error`, `--special`.
- Overlays: `ejm-ui-menu`, `ejm-ui-tooltip`, `ejm-ui-toast`, `ejm-ui-palette`.
- Agent work: `ejm-ui-msg` with `--user` and `--assistant`; `ejm-ui-tool` with `data-state="running|ok|error"`; `ejm-ui-diff` with line modifiers.
- Code: `ejm-ui-code` and `ejm-syn-*` token classes.
- Terminal preview: `ejm-term`, for showing a TUI in docs or on a site.

One primary button per view. Use `--danger` only for destructive actions, and confirm them.

## States

Design all of them: empty, loading, error, partial and overflow.

- Empty: "No X yet" plus one useful sentence or action.
- Loading: a skeleton shaped like the final layout.
- Error: say what failed and give a way out. Keep the user's work.
- A value that does not exist yet is a dash, never a zero. Estimated, sample and real data must look different.
- Status uses text or a glyph together with color. A badge says "failed", it does not only turn red.

## Motion

Short and eased out: 120 to 180 ms for interface changes (`--ejm-duration-interface`). The only ambient motion is the running pulse on a tool call, 1.6 s. Everything stops under `prefers-reduced-motion`; `app.css` already handles it.

## Accessibility

Every text role reaches 4.5:1 on every surface, and the build enforces it. Focus is a 2 px primary ring on everything interactive. Keyboard reaches everything. Headings do not skip levels. No horizontal scroll at 320 px for web content.

## Adding or changing a color

1. Edit `ui/theme.json`. Add the role to both themes.
2. Run `node scripts/build-ui.mjs`. Fix any contrast failure by changing the color, not the check.
3. Run `node scripts/build-ui.mjs --check`, then check `ui/index.html` in both themes.
4. If a role is new, add it to the Roles table above.
