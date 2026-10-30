# Project marks (local copies)

Project marks that the pinned `@ejm/tokens` package does not export yet: byte copies of the ui and calm marks, and gerry's marks, which were drawn here. The home and projects pages import them directly.

| File | Source repo | Branch | Commit | Path | sha256 |
| --- | --- | --- | --- | --- | --- |
| `ui/mark-ink.svg` | ejmlabs/ejm-ui | `feat/ui-mark-u-block` | `59cd155aeff24aa286f0a4a2a8d42d1f53f6e9d2` | `packages/tokens/assets/projects/ui/mark-ink.svg` | `664018cba612f3b41320ee3e15a9f08b4d98fcea5a494a367b6a5acca0f30475` |
| `ui/mark-paper.svg` | ejmlabs/ejm-ui | `feat/ui-mark-u-block` | `59cd155aeff24aa286f0a4a2a8d42d1f53f6e9d2` | `packages/tokens/assets/projects/ui/mark-paper.svg` | `61dff70ba1884ee7354ee743603a3fb9e938bfd30c8e86e8c700fbfc6600db52` |
| `calm/mark-ink.svg` | ejmlabs/ejm-calm | `design/calm-logo` | `bd3c1f14ad1d0709ab44e5973f9c7b2a02394742` | `logos/fluke/mark-ink.svg` | `55d1e7ebf8b8b289c2ccc746a94f9367cf46835c784be7a4a6335d673746119a` |
| `calm/mark-paper.svg` | ejmlabs/ejm-calm | `design/calm-logo` | `bd3c1f14ad1d0709ab44e5973f9c7b2a02394742` | `logos/fluke/mark-paper.svg` | `95498aadca57ae37e572d7154acecd2352123983d42ee8189ef160b5d3e40e9b` |
| `gerry/mark-ink.svg` | ejmlabs/ejmlabs | `design/gerry-mark` | drawn in this change | `site/src/assets/projects/gerry/mark-ink.svg` | `74964c8040a891410ff2ce1a7a3791cb2765386b78155f1f81745232f47d6c9a` |
| `gerry/mark-paper.svg` | ejmlabs/ejmlabs | `design/gerry-mark` | drawn in this change | `site/src/assets/projects/gerry/mark-paper.svg` | `c5f6470ecf19d7b0cce62462dad91d86a24afb8bea6545715a29606edb77b5ef` |

The calm fluke mark was selected by the maintainer on 25 October 2026. The ejm-ui u-and-block mark replaced the earlier grid-e mark on 29 October 2026 (ejm-ui PR #44). Their source branches are not merged yet; refresh these copies if the source files change before they land.

The gerry mark is concept C from the October 2026 gerry concepts: a ribbon G that starts as a tapered tip, like the cli, ide and harness marks, on the 256 grid with the family's 36-unit weight. The maintainer selected it on 28 October 2026. It is an original, not a copy; move it to `@ejm/tokens/assets/projects/gerry/` with the others. It is used on the Mist products band, which follows the page theme, so both the Ink and Paper files are in use.

calm's band on the projects page is Sage, so only its Ink mark is used today. The Paper file is kept so a later band change needs no new copy.

## Rights

These marks are ejmlabs brand artwork. They are not covered by the MIT license of the site or of either project and keep their own rights (see `brand-kit/RIGHTS.md`). They are not part of the public brand-kit downloads.

## Replacing them

Once ejm-ui publishes `@ejm/tokens/assets/projects/<id>/` for `ui` and `calm`, import from there (as the cli, ide and harness marks do) and delete these copies and this note.
