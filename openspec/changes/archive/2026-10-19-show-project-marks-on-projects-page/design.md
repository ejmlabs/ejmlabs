# Design

## Context

See proposal.md for scope. The Projects page already maps project data into shared `Band` and `SectionHead` components. Its title slot accepts a React node. The public tokens package exports approved Ink and Paper SVGs. CLI uses Mist, IDE uses Sage and harness uses Paper. Sage keeps a light color scheme in either page theme.

## Goals / Non-Goals

**Goals:** readable approved marks, stable heading layout and the existing page byte limits.

**Non-Goals:** new artwork, shared APIs, product runtime changes, new packages or a page redesign.

## Decisions

- `ejmlabs` owns the composition. Use the public title slot and `@ejm/tokens/assets/projects/*/mark-*.svg` exports. A new shared component would add an API for one consumer composition.
- Serve marks as separate cached SVG assets with Vite's built-in `?no-inline` query. The first measured build with default URL imports embeds SVG data in JavaScript and reaches 97.6KiB gzip, above the 95KiB limit. Separate files retain the approved bytes while removing that data from the route bundle; verify the resulting build and visible image loads. The extra image requests are confined to the page's marks, with reserved geometry and lazy loading.
- Reserve 40px square decorative images with empty alt text and `aria-hidden`. A flex title keeps the mark beside its name and lets the name wrap naturally.
- Mist and Paper use the existing CSS theme-swap pattern. Sage uses one Ink image in both themes. A blanket dark swap would give the Sage mark poor contrast. Asset contrast is at least 5.09:1 across these surfaces.
- Keep JS 95, CSS 14, fonts 70 and HTML 30KiB gzip limits. Add no dependencies, timer or image preload. Run the existing build, type check and built-site tests, then inspect phone and desktop states in both themes. This small presentation change needs no new permanent test.

## Risks / Trade-offs

- A mark could squeeze the longer harness name. Check 320px and the narrow desktop column breakpoint along with laptop widths.
- Theme-specific images add small asset references. The build's unchanged byte gate catches an oversized bundle; browser checks confirm the visible variant loads without scripts.

## Migration Plan

Publish the checked root build under the standing website authorization. Verify HTTPS HTML and asset bytes and record the deployment identity. The prior version `6552e48f-ce09-4885-9b53-1831039dd1a6` is available for rollback. Review the source guide; product guides have no setup or runtime change to document.
