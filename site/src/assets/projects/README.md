# Project marks (local copies)

Byte copies of project marks that the pinned `@ejm/tokens` package does not export yet. The home and projects pages import them directly.

| File | Source repo | Branch | Commit | Path | sha256 |
| --- | --- | --- | --- | --- | --- |
| `ui/mark-ink.svg` | ejmlabs/ejm-ui | `split/21-assets` | `539073873796322a6a9aba00681143ccb9a35bb0` | `packages/tokens/assets/projects/ui/mark-ink.svg` | `08ff7f3099ba18d9e1dc2a1e309fa3d444d996bbb7832b7d401aa91caaa8b049` |
| `ui/mark-paper.svg` | ejmlabs/ejm-ui | `split/21-assets` | `539073873796322a6a9aba00681143ccb9a35bb0` | `packages/tokens/assets/projects/ui/mark-paper.svg` | `1f99047803cbcc92149f9c37867e8bcbec384091b9283267266177a3872c4296` |
| `calm/mark-ink.svg` | ejmlabs/ejm-calm | `design/calm-logo` | `bd3c1f14ad1d0709ab44e5973f9c7b2a02394742` | `logos/fluke/mark-ink.svg` | `55d1e7ebf8b8b289c2ccc746a94f9367cf46835c784be7a4a6335d673746119a` |
| `calm/mark-paper.svg` | ejmlabs/ejm-calm | `design/calm-logo` | `bd3c1f14ad1d0709ab44e5973f9c7b2a02394742` | `logos/fluke/mark-paper.svg` | `95498aadca57ae37e572d7154acecd2352123983d42ee8189ef160b5d3e40e9b` |

Both marks were selected by the maintainer on 25 October 2026 as the current ejm-ui grid-e mark and the calm fluke mark. Their source branches are not merged yet; refresh these copies if the source files change before they land.

calm's band on the projects page is Sage, so only its Ink mark is used today. The Paper file is kept so a later band change needs no new copy.

## Rights

These marks are ejmlabs brand artwork. They are not covered by the MIT license of the site or of either project and keep their own rights (see `brand-kit/RIGHTS.md`). They are not part of the public brand-kit downloads.

## Replacing them

Once ejm-ui publishes `@ejm/tokens/assets/projects/<id>/` for `ui` and `calm`, import from there (as the cli, ide and harness marks do) and delete these copies and this note.
