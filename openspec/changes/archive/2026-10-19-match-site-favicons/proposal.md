# Proposal

## Why

Browser icons should identify the same projects as the page logos. CLI already has the intended Sage and Ink treatment, while the studio icon uses Forest and Paper and permanent icon URLs can retain older browser choices.

## What Changes

- Use the existing ejmlabs symbol in Ink on Sage for its browser and device icons.
- Consume the shared site's content-versioned icon and manifest links on all four sites, retaining existing direct asset URLs.
- Keep the three product marks and icon artwork unchanged.
- Carry the previously verified shared playback optimization into the studio rebuild, whose last published build predates it.
- Keep the public brand download and retained icon URLs in sync, then publish and verify the checked builds.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `ejmlabs-site`: Require the studio browser identity to match the current symbol and refresh changed icon assets through shared site infrastructure.

## Impact

- `ejm-ui` owns the upstream `@ejm/tokens` asset exports and `@ejm/site/vite` icon delivery. It has no OpenSpec directory and follows its normal owner workflow.
- `ejmlabs` consumes those public exports, retains approved download assets, and owns this adoption and publication change. No private sibling implementation is imported.
- CLI, IDE and harness need checked site rebuilds for the shared head update, with no product source or native application icon changes.
- The dependency direction remains sites to shared UI packages. No browser JavaScript, CSS, new dependency or runtime behavior is added.
- Review public brand guidance and the shared build guide. Verify asset identity, cache refresh, unchanged product client bundles, the studio's recorded playback adoption, route output and live publication. Preserve the IDE release API, Worker routing and storage bindings.
