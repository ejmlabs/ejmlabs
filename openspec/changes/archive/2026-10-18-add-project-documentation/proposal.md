# Proposal

## Why

People need user and developer guides for ejm-cli, ejm-harness, and ejm-ide on each project's site. The studio page should make those guides easy to find.

## What Changes

- Add a documentation section to the studio page with direct user and developer guide links for all three projects.
- Add documentation links to the studio menu and footer.
- Coordinate the three project sites through separate repository changes that own their guides, navigation, and verification.
- Check the guides together for consistent navigation, phone layout, themes, and honest source-release instructions.

## Capabilities

### New Capabilities

- `documentation-discovery`: Direct paths from the studio page to user and developer guides on the three project domains.

### Modified Capabilities

None. The active `raise-visual-bar` change owns the shared documentation components.

## Impact

This repository changes `site/src/index.html` and the existing site documentation. Each project repository owns its own static guides and build configuration. No application APIs or dependencies change. The request to put the guides on their sites authorizes publication after local review. Publish the three project sites before the studio links.
