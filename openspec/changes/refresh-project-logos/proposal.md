# Proposal

## Why

The cli, ide and harness logos in `design-kit/projects/` are single thick glyphs (a prompt chevron, a bracket pair, an H of two halves). They read as generic icons. The ejmlabs symbol has a distinct structure: nested, parallel ribbons of constant width with equal gaps, rounded terminals, and one open turn. The owner asked for the three project logos to be reviewed and revised so they look like the ejmlabs logo, using it as inspiration.

## What Changes

- Redraw the cli, ide and harness marks as one family built from the symbol's visual grammar: two or three nested parallel ribbons, the same stroke-to-gap rhythm, rounded terminals, and one open end. Each keeps its own silhouette and idea.
  - cli: a prompt chevron drawn as nested ribbons that run into a cursor bar.
  - ide: two nested bracket ribbons that face each other around an open workspace.
  - harness: two nested uprights joined by a ribbon crossbar, an open H.
- Regenerate every derived asset (marks, horizontal logos, square icons, favicons, touch icons, manifests, social cards, family boards, editable logos, CSS mask files).
- Record a written review of the current marks and the reasons for each change.
- Replace the old marks at the source. The product repos pick them up by re-syncing in their own sessions.
- Not in scope: the ejmlabs studio logo and wordmark, the brand palette and fonts, product names, deploys.

## Capabilities

### New Capabilities
- `project-logos`: The cli, ide and harness marks, derived assets, legibility and review.

### Modified Capabilities

None. `openspec/specs/` has no existing capabilities.

## Impact

- **Code and assets:** `design-kit/projects/**`, `design-kit/scripts/build-projects.mjs`, the project logo guide and family preview; after the ejm-ui move, the same files under `packages/tokens/assets/projects`.
- **Systems:** `ejm-cli`, `ejm-ide` and `ejm-harness` re-sync the kit; the IDE's native icons are regenerated from the new square icon in that repo. No deploys.
- **Risk:** small sizes (16 px favicons) must stay legible, so each mark is checked at 16, 24 and 32 px.
