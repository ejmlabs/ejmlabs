# Design

## Context

Observed: `design-kit/scripts/build-projects.mjs` defines each mark as hand-written SVG paths (prompt and cursor, a bracket panel and its 180 degree rotation, a bridge and its mirror), renders PNGs with librsvg, outlines names with HarfBuzz and packs ICOs with Pillow. The studio symbol is two nested ribbons with a tapered inner terminal and a round outer terminal. The current marks are single fat glyphs with no nesting, so they do not share the symbol's structure.

## Goals / Non-Goals

**Goals:** a coherent family that visibly descends from the symbol; three distinct ideas; legible at 16 px; reproducible generation.
**Non-Goals:** changing the studio logo, wordmark, palette or fonts; deploys; animating the marks.

## Decisions

**1. Draw marks as stroked ribbon paths, then convert to outlines.** Each mark is a set of centerline paths with a constant stroke width and round caps, offset in parallel, so ribbon width and gap are parameters shared by all three marks. A script outlines the strokes to filled paths (so SVGs stay fill-only, as the kit requires) and checks that the gap never falls below a minimum at 16 px.
*Alternative:* hand-drawn filled paths as today. Rejected: width and gap cannot be kept equal by eye.

**2. Rhythm taken from the symbol.** Ribbon width and gap are measured from the symbol (outer ribbon width to inner gap ratio) and reused. Terminals are round on the outside end and taper on one inner end, as in the symbol.

**3. Three ideas, one grammar.** cli: two nested chevrons whose inner ribbon turns into a cursor bar. ide: two nested brackets facing each other, left open at top and bottom. harness: two nested uprights joined by a crossbar ribbon that continues the inner line.

**4. Review first.** The script writes a before and after board, and the guide records the review, so the change is judged by eye at 16, 24, 32 and large sizes in light and dark.

**5. Where it lands.** The change lands in `design-kit/projects` now. The ejm-ui move carries the files and generator unchanged. Product repos re-sync in their own sessions.

## Risks / Trade-offs

- **Nested ribbons clog at 16 px** → minimum gap check, and a simplified two-ribbon favicon variant if needed.
- **Marks drift toward the studio symbol and lose their identity** → each keeps its own silhouette and is compared on the family board.
- **Subjective result** → render large and small boards and iterate before regenerating every asset.

## Migration Plan

1. Prototype the three marks and review them on a board.
2. Regenerate all derived assets and update the guide and preview.
3. Re-sync the kit in the three product repos in their own sessions; regenerate native icons.
Rollback: restore the previous generator and assets from git.

## Open Questions

None that change what is built. The harness open H was approved earlier; its silhouette is kept (two uprights and a crossbar) and only its construction changes.
