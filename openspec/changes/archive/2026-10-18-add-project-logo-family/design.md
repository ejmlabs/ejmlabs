# Design

## Context

The canonical kit contains exact studio logo paths, local Manrope and IBM Plex Mono fonts, and SVG composition scripts. The three product sites currently reuse those studio assets. See proposal.md for the reason to add project identities.

## Goals / Non-Goals

**Goals:** Make the project marks recognizable as a family through their drawing, with portable assets and a clear visual review.

**Non-Goals:** Replace the studio logo, deploy a site, or change application icons in the consuming repositories.

## Decisions

### Use vector artwork

Draw product-specific SVG ribbons using the source mark's rounded turns and open counters. CLI suggests a prompt and IDE a divided workspace. After the user rejected the dense Harness weave, refine Harness to an open H made from two broad curved halves with inward arms and a generous center gap. Use two simple filled shapes, with no woven crossings. Raster generation was considered, but editable geometry and clean small-size rendering fit an extension of the existing vector identity.

### Keep one palette and consistent typography

Read the existing brand tokens. Use Sage for primary marks, Ink for light-surface names, and Paper for reversed work. Set the lowercase product names in local Manrope 600. Preserve the original studio wordmark paths wherever they appear in the preview. Different product colors would weaken recognition of the family.

### Use maintained export tools

Keep custom code to artwork and composition. Use HarfBuzz's SVG output for shaped font outlines and librsvg for PNG rendering. The existing fontTools helper was considered, but its dependency is absent; HarfBuzz is already installed and supplies the complete outlines. Production SVGs embed their geometry and require no font install. Editable wordmark sources retain live text.

### Store the family together

Use `design-kit/projects/{cli,ide,harness}/` for marks, name lockups, and square icons. Add a family preview and usage guide at `design-kit/projects/`. Rebuild through `design-kit/scripts/build-projects.mjs` and link from the kit README and catalog.

## Risks / Trade-offs

- Small counters can close at favicon size. Check 16, 24, and 32 px and provide square exports with generous clear space.
- New project identities are additions to the guide, not recovered source artwork. State their provenance in the usage guide.
- Font and renderer differences can change live text. Outline production wordmarks and keep editable sources separate.
- Other work is active in the kit. Add focused assets and links while preserving concurrent edits.
