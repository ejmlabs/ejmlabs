# Proposal

## Why

The current demos ask visitors to explore shallow interactions and use different frame sizes. Visitors should be able to watch each project complete useful work, with consistent presentation and simple playback controls.

## What Changes

- Replace the try page's interactive examples with finite autoplay sessions, using shared public showcase entries from `ejm-ui`.
- Give CLI, IDE and harness the same responsive viewport and stable dimensions before and after enhancement.
- Keep each product's own interface. Allow only Pause, Resume and Restart outside the product surface.
- Show complete, source-backed workflows: a tested CLI fix, automatically reviewed IDE edits, and harness tools, admission and retained history.
- Start when visible, pause offscreen and in background tabs, respect reduced motion and end on a useful result.
- Replace internal demo language across the affected root pages and metadata with clear public copy. Keep a short, honest example-session disclosure.
- Verify the shared owner and affected sites, then publish the checked builds under the existing owner authorization.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `ejmlabs-site`: Replace the try page's interactive demo contract with passive, consistently sized autoplay showcases and meaningful recorded workflows.

## Impact

`ejmlabs` owns page copy, discovery, metadata, the try page's composition and its source guide. It consumes `LazyCliShowcase`, `LazyIdeShowcase` and `LazyHarnessShowcase` from the public `@ejm/demos/islands/*-lazy` entries.

`ejm-ui` owns playback, lazy loading, sizing, native presentation adapters, scenarios, recorded local fixtures and focused tests. Its tokens package also exposes the existing native neutral ramp through public `@ejm/tokens/window.css`, generated from the same theme source, so native IDE colors work in both site themes. That repository has no OpenSpec root and follows its normal workflow. CLI, IDE and harness own their public-site composition and guides under their own scoped changes. Dependencies remain from sites to public shared UI exports, with no private sibling imports, copied engines, new motion package or real browser provider/tool connection.

All four sites consume the shared change. Their existing byte and performance budgets stay fixed. No product runtime or installer contract changes.
