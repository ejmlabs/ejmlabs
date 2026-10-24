# Retained Relay identity review

Finished Relay exports are present in the accepted public
`@ejm/tokens/assets/projects/relay/*` source at revision
`a5551a056b04bc0c3472afc443621a552747613c`. Matching exports are omitted here.
This folder keeps distinct editable SVGs and the original review boards and HTML.

The guide below records the earlier local review. Its adoption notes, file
paths, and commands are historical. The HTML needs the historical asset snapshot
and is not a standalone current gallery. This handoff does not verify CLI use,
application branding, or live publication. See the
[project source status](../README.md#current-source-status).

## Historical guide


Relay's handoff mark and asset bundle are prepared and verified locally under
`add-relay-brand-assets`. Adoption through `ejm-ui` and its public
`@ejm/tokens/assets/*` export, CLI use and publication are pending. This work
does not change the live Relay logo.

Open the local [gallery](index.html), [SVG review board](review.svg) or
[PNG review board](review.png). The board combines light and dark treatments,
a one-color comparison with CLI, IDE and Harness, and 16, 24 and 32 px samples.
See the [project family guide](../README.md) for the existing identities.

## Construction and color

Two staggered curved ribbons leave an open diagonal handoff channel. They use
the family geometry in a 256-unit box: ribbon width **W = 36**, gap
**G = 22.7** and pitch **P = 58.7**. Round terminals and a long outer taper keep
the curved ribbon language of the studio mark.

The lowercase `relay` name uses **Manrope 600**. Production logo SVGs contain
outlined paths, so they need no installed font or remote asset. Editable logo
variants retain live text and need the supplied
[Manrope font](../../fonts/Manrope-Variable.ttf). Its
[OFL license](../../fonts/Manrope-OFL.txt) travels with the font.

| Color | Value | Use |
| --- | --- | --- |
| Sage | `#8A9A7B` | Primary mark and light icon background. |
| Forest | `#29443B` | Dark icon background and text on light surfaces. |
| Ink | `#202721` | One-color mark, name and text on light surfaces. |
| Paper | `#F6F5EF` | Reversed artwork on Forest or Ink. |

Sage on Paper is decorative artwork. Use Ink or Forest for readable text on
light surfaces. Keep the supplied colors and the drawing's proportions.

## Choose an asset

| Category | Files and use |
| --- | --- |
| Standalone marks | `mark-{sage,ink,paper}.svg` and matching PNGs. Use Sage on light surfaces, Ink for one-color work and Paper on dark surfaces. |
| Horizontal logos | `logo-{primary,ink,paper}.svg` and matching PNGs. Primary pairs the Sage mark with the Ink name. Production names are outlined. |
| Editable logos | `editable/logo-{primary,ink,paper}.svg`. Keep these as editing sources; export the outlined version for use. |
| Square icons | `icon-{sage,forest}.svg` and matching PNGs. Preserve the full background canvas. |
| Browser icons | `favicon.svg`, `favicon.ico` and `favicon-{16,24,32,48}.png`. Use the supplied small-size exports. |
| Touch and install icons | `apple-touch-icon.png`, `android-chrome-{192,512}.png` and `site.webmanifest`. Keep manifest paths and icons together. |
| Social card | `social-card.svg` and `social-card.png`, at 1200 × 630 px. |
| Local review | [index.html](index.html), [review.svg](review.svg) and [review.png](review.png). These are review materials. |

Mark PNGs are 1024 px wide; horizontal logo PNGs are 2400 px wide. Their heights
follow the artwork. Square icons are 1024 × 1024 px. Marks and horizontal logos
have transparent backgrounds. Icons and favicons include their background.

## Placement

- Leave at least one quarter of the mark's width clear on every side of a
  standalone transparent mark.
- Leave at least half the mark's height clear around a horizontal logo.
- Preserve the square icon's full canvas, which includes its clear space.
- Scale both dimensions together and retain the name spacing.
- Keep the complete studio logo in its own clear area when crediting ejmlabs.

The [studio logo rules](../../README.md#logo-rules) cover the separate ejmlabs
identity.

## Rebuild only Relay

The local exporter and checker support targeted `--project relay` mode. Run
these commands from the repository root:

```sh
relay_out="$(mktemp -d "${TMPDIR:-/tmp}/ejm-relay-assets.XXXXXX")"
PROJECTS_OUT="$relay_out" node design-kit/scripts/build-projects.mjs --project relay
node design-kit/projects/tools/check-marks.mjs "$relay_out" --project relay
```

The checker takes the output directory before `--project relay`. Open
`$relay_out/relay/index.html` to review the export. This isolated target leaves
the existing CLI, IDE, Harness and root comparison-board outputs unchanged.
Use a second empty output directory to check repeatability.

The existing pipeline needs Node.js, HarfBuzz's `hb-view`, librsvg's
`rsvg-convert` and Python 3 with Pillow for ICO output. If the selected Python
lacks Pillow, set `PYTHON` to an existing Python executable that has it. The
exporter also accepts `HB_VIEW` and `RSVG_CONVERT` overrides. It uses the local
font and adds no package dependency.

## Local verification record

The local export and checks passed with the results below. The folder budget
includes this guide; the generated-file count and bytes exclude it.

| Check | Limit | Measured result |
| --- | --- | --- |
| Each mark SVG | 8 KiB (8192 bytes) | Ink: 2829 bytes; Paper: 2833 bytes; Sage: 2831 bytes. |
| Each outlined logo SVG | 24 KiB (24576 bytes) | Ink: 8467 bytes; Paper: 8471 bytes; primary: 8475 bytes. |
| Complete Relay folder | 1 MiB (1048576 bytes) | 34 generated files, 900891 bytes, plus this guide. Within budget. |
| Two isolated exports | Identical file names and bytes | All 34 generated files matched. |
| Geometry and raster checks | Open gaps and separate components at 16, 24 and 32 px | Two components at each size. Gap-channel p5: 1.24, 1.87 and 2.49 px, respectively. |
| Local review | Light/dark board, one-color family and small-size samples | Combined PNG inspected once; no correction needed. |

Pipeline syntax checks passed. All production SVGs use paths without font or
remote references. The six mark and horizontal-logo PNGs retain transparency;
browser icon dimensions and the ICO's 16, 32 and 48 px entries passed checks.
The pipeline adds no dependency.

The default three-project export reproduced all 104 generated files byte for
byte. All 117 existing artwork files remained unchanged. Relay's review board
stays in its own folder.

These local checks do not establish shared-package adoption, application use
or publication. Those steps need their own protected changes and release
evidence.
