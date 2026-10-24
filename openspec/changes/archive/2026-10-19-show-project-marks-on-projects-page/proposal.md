# Proposal

## Why

The home page shows each project's approved mark, while the Projects page shows only names. Visitors should see the same project identity in both places.

## What Changes

- Place the approved CLI, IDE and harness marks beside their Projects page headings.
- Keep the marks legible on each existing band in Light and Dark themes, with reserved dimensions and no repeated screen-reader label.
- Check the built page at phone and desktop widths, retain existing byte limits and publish the checked root site.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `ejmlabs-site`: require approved marks beside the project detail headings.

## Impact

`ejmlabs` owns this page composition and its source guide. It consumes the public `SectionHead.title` node slot and approved `@ejm/tokens/assets/projects/*` SVG exports from `ejm-ui`. Dependency direction stays from site to shared UI. No shared contract, product runtime, package dependency or product guide changes. Existing build, route tests and targeted browser checks cover the affected consumer. Website publication uses the owner's standing authorization.
