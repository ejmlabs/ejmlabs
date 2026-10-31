# Project marks (local copies)

Project marks that the pinned `@ejm/tokens` package does not export, or exports in a different form. The home and projects pages import them directly. The ui marks were byte copies and now come from `@ejm/tokens/assets/projects/ui/`, like the cli, ide and harness marks.

| File | Source repo | Branch | Commit | Path | sha256 |
| --- | --- | --- | --- | --- | --- |
| `calm/mark-ink.svg` | ejmlabs/ejm-calm | `design/calm-logo` | `bd3c1f14ad1d0709ab44e5973f9c7b2a02394742` | `logos/fluke/mark-ink.svg` | `55d1e7ebf8b8b289c2ccc746a94f9367cf46835c784be7a4a6335d673746119a` |
| `calm/mark-paper.svg` | ejmlabs/ejm-calm | `design/calm-logo` | `bd3c1f14ad1d0709ab44e5973f9c7b2a02394742` | `logos/fluke/mark-paper.svg` | `95498aadca57ae37e572d7154acecd2352123983d42ee8189ef160b5d3e40e9b` |
| `gerry/mark-ink.svg` | ejmlabs/ejmlabs | `design/gerry-mark` | drawn in this change | `site/src/assets/projects/gerry/mark-ink.svg` | `74964c8040a891410ff2ce1a7a3791cb2765386b78155f1f81745232f47d6c9a` |
| `gerry/mark-paper.svg` | ejmlabs/ejmlabs | `design/gerry-mark` | drawn in this change | `site/src/assets/projects/gerry/mark-paper.svg` | `c5f6470ecf19d7b0cce62462dad91d86a24afb8bea6545715a29606edb77b5ef` |

The calm fluke mark was selected by the maintainer on 25 October 2026. Its source branch is not merged yet; refresh these copies if the source file changes before it lands. `@ejm/tokens` has no `calm` family yet. Once ejm-ui publishes `@ejm/tokens/assets/projects/calm/`, import from there and delete the calm copies.

The gerry mark is concept C from the October 2026 gerry concepts: a ribbon G that starts as a tapered tip, like the cli, ide and harness marks, on the 256 grid with the family's 36-unit weight. The maintainer selected it on 28 October 2026. It is an original, not a copy. `@ejm/tokens/assets/projects/gerry/` now exports a gerry mark, but its files are not byte copies of these: they add `width` and `height` of 1024 and an `xlink` namespace, and draw the block inside the ribbon's single path with the opposite arc direction, where these use a second path. Rendered at 256 px in a browser, the two sets match (no pixel differs by more than 24 of 255, Ink and Paper). These copies stay until the maintainer chooses to switch to the export. They are used on the Home products section, which follows the page theme, so both the Ink and Paper files are in use.

calm's section on the projects page follows the page theme, so both its Ink and Paper marks are in use.

## Rights

These marks are ejmlabs brand artwork. They are not covered by the MIT license of the site or of either project and keep their own rights (see `brand-kit/RIGHTS.md`). They are not part of the public brand-kit downloads.
