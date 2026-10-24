# Retained project logo sources

## Current source status

Production exports live in the public `@ejm/tokens/assets/projects/*` contract
owned by `ejm-ui`. Studio pins shared source revision
`a5551a056b04bc0c3472afc443621a552747613c`. The 125 matching exports are
omitted here to preserve that ownership. This folder retains construction tools,
review boards, and the distinct Relay editing sources.

The historical guide below records earlier asset selection and local checks.
Its references to local finished logos, fonts, family boards, and masks may now
resolve only in the shared owner. The HTML is retained source, not a current
standalone gallery. Rebuild commands require the historical input snapshot in a
scratch directory. They are not the production build workflow. Application use
and live publication have not been checked by this handoff.

## Historical guide


Logos for **cli**, **ide**, and **harness**, drawn from the ejmlabs studio mark's
nested ribbons: parallel ribbons of one width and one gap, round terminals, and
an open turn. These are new project identities, not artwork extracted from the
brand guide. The original studio logo remains in [`../logos/`](../logos/).

Open [the family preview](index.html) to compare light and dark treatments and
small-size examples. The preview boards are also available as
[`family-light.svg`](family-light.svg), [`family-light.png`](family-light.png),
[`family-dark.svg`](family-dark.svg), and [`family-dark.png`](family-dark.png).
[`before-after.png`](before-after.png) compares the previous marks, the straight-ribbon first pass, and these, and
[`REVIEW.md`](REVIEW.md) records what was wrong with the old marks and why each
changed.

## Relay local review

The [Relay identity guide](relay/README.md) covers its curved handoff mark,
local review board and targeted export. Shared-package adoption, CLI use and
publication are pending; the existing family boards remain unchanged.

## The family

| Project | Mark |
| --- | --- |
| cli | A bowed prompt chevron nested in a wider echo ribbon with a long taper, and a cursor bar. |
| ide | Two facing brackets with large flowing corners, each with a nested bar, around an open workspace. |
| harness | A dot (the agent) with one strap winding around it and closing in a long taper. Not a letter: one governor loop over the engine's sessions. |

## How the marks are built

Every mark uses the same measured rhythm. The studio symbol's ribbon width to gap
ratio is 1.58 : 1 (measured by `tools/measure-symbol.mjs`). The project marks use
ribbons 36 units wide with a 22.7 unit gap in the 256 unit box, so the pitch
between nested ribbons is 58.7. Terminals are round (a semicircle of half the
width), except the taper: one on an outer ribbon, drawn as a long fine tip along
the ribbon's curve. cli has one taper and harness one; ide is point symmetric, so
it has two. Centrelines are chains of lines and arcs of different radii, which
gives the symbol's flow: gentle curves that tighten at turns. There are no
strokes: the generator outlines each ribbon to a filled path. Offsets of lines
and arcs are exact lines and arcs, so nested ribbons stay parallel.

The engine is `tools/ribbons.mjs`, the constructions are `tools/marks.mjs`, and
[`candidates.png`](candidates.png) shows every construction tried.
[`symbol-compare.png`](symbol-compare.png) puts the symbol beside the marks at
160, 64, 32, and 16 px.

Palette: only Sage, Forest, Ink, and Paper appear in marks, logos, icons, and
favicons. `tools/check-marks.mjs` verifies that, and that no ribbon gap closes at
16, 24, and 32 px.

Each mark has its own silhouette, and the shared ribbon grammar ties the family together, with color: Sage
`#8A9A7B`, Ink `#202721`, Paper `#F6F5EF`, and Forest `#29443B`. Names use lowercase
Manrope 600. The studio's custom wordmark remains separate from these project
names.

## Choose an asset

Every project folder contains the same files. Replace `cli/` below with `ide/`
or `harness/` to choose another project.

| File | Use |
| --- | --- |
| `cli/mark-sage.svg` | Standalone primary mark on Paper or Mist. |
| `cli/mark-ink.svg` | Single-color mark on Paper, Mist, or Sage. |
| `cli/mark-paper.svg` | Reversed mark on Forest or Ink. |
| `cli/logo-primary.svg` | Sage mark with Ink name on Paper or Mist. |
| `cli/logo-ink.svg` | Single-color horizontal logo on Paper, Mist, or Sage. |
| `cli/logo-paper.svg` | Reversed horizontal logo on Forest or Ink. |
| `cli/icon-sage.svg` | Ink mark on a Sage square for an app icon or avatar. |
| `cli/icon-forest.svg` | Paper mark on a Forest square for an app icon or avatar. |
| `cli/favicon-16.png`, `favicon-24.png`, `favicon-32.png`, `favicon-48.png` | Small square exports on Sage, at the named pixel sizes. They draw the same mark larger (its longer side fills 80 percent of the square) so the ribbon gaps stay open at 16 px. |
| `cli/favicon.svg`, `favicon.ico` | Browser tab icons. The ICO contains 16, 32, and 48 px images. |
| `cli/apple-touch-icon.png`, `android-chrome-192.png`, `android-chrome-512.png`, `site.webmanifest` | Shortcut icons and the project install manifest. Keep them together. They are rendered from `favicon.svg`, so they use the same larger 80 percent cut as the favicons. |
| `cli/social-card.svg`, `social-card.png` | A 1200 × 630 project card for social metadata. |
| `cli/editable/logo-primary.svg`, `logo-ink.svg`, `logo-paper.svg` | Editable horizontal logos with live Manrope text. |

Each mark, horizontal logo, and square icon has a matching PNG beside its SVG.
Mark PNGs are 1024 px wide; horizontal logo PNGs are 2400 px wide. Their heights
follow the artwork. Square icons are 1024 × 1024 px.

Project names in production SVGs are outlined with HarfBuzz. These files need no installed
fonts or remote assets. The SVG and PNG marks and horizontal logos have
transparent backgrounds. Square icons and favicons include their background.

To edit the live-text sources, install `../fonts/Manrope-Variable.ttf` first.
Its OFL license is supplied beside the font. The production SVGs do not need it.

## Placement

- Leave at least one quarter of the mark's width clear around transparent marks.
- Leave at least half the mark's height clear around horizontal logos.
- Square icons already include the mark's quarter-width clear space. Preserve
  the full square canvas.
- Scale both dimensions together. Keep the drawing, name spacing, and colors.
- Use the supplied small exports for favicons, then check the result at its
  displayed size.
- Keep the complete ejmlabs studio logo in its own clear area when crediting
  the studio on a project page.

Sage on Paper is decorative artwork, not a reading color. Use Ink or Forest for
text on light surfaces. See [the main logo rules](../README.md#logo-rules) for
the studio identity.

## Rebuild

Run from the repository root:

```sh
node design-kit/scripts/build-projects.mjs
```

The script needs Node.js, HarfBuzz's `hb-view`, librsvg's `rsvg-convert`, and Python 3 with Pillow for ICO output. It uses the first of `python3` and `/usr/bin/python3` that has Pillow; set `PYTHON` to override. It adds no npm or pip dependency. Set `PROJECTS_OUT` to write somewhere other than this folder. The script prints the measured symbol ratios and the project ribbon width and gap when it runs, and two runs produce identical files.
It uses the local fonts in `design-kit/fonts/` and the existing brand palette.
Custom code defines the project artwork and its layout; HarfBuzz outlines text
and librsvg renders PNGs.

Two checks accompany the build. Run them from the repository root:

```sh
node design-kit/projects/tools/check-marks.mjs     # strokes, colors, centring, gaps at 16, 24, 32 px
node design-kit/projects/tools/measure-symbol.mjs  # re-measures the symbol's ribbon width, gap, and taper
```

## Use in sites and products

Use `ejm-logo ejm-logo--cli`, `ejm-logo ejm-logo--ide`, or `ejm-logo ejm-logo--harness` in site headers. These CSS masks follow the page theme. Keep the studio logo in the footer credit. See [the theme guide](../web/THEME.md) for accessible markup.

Each product's design-kit sync script imports its own browser bundle under `/design-kit/projects/<project>/` and any masks referenced by the shared CSS. Point favicon, manifest, touch icon, and social metadata links there. Keep these imports in the sync script so rebuilding does not restore the studio assets.

Use the supplied square icons as the native app icon source. Generate platform formats with the product's existing build tools. Terminal products use a text version of the prompt motif and keep plain and `NO_COLOR` rendering. Package READMEs can show the Sage square above a text heading so the project name stays readable on light and dark pages.
