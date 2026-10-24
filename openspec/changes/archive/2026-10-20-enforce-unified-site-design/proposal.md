# Proposal

## Why

The sites share ejm-ui but still choose their own motion, heading sizes, spacing, footer identity, and playback note placement. Those escape hatches let sites drift and prevent one shared design change from reaching every site.

## What Changes

- Make ejm-ui the visual authority for all four public sites. Keep content, routes, product data, and accessible state in consumers.
- **BREAKING**: replace visual escape hatches in site-level hero, heading, branding, header, and footer contracts with fixed or semantic shared recipes.
- Add shared composition for section bodies, columns, metrics, actions, text, asset previews, and playback presentation where current content needs it.
- Reject consumer CSS rules, inline styles, local visual utility classes, and unsupported component overrides through the existing shared site build plugin. Keep only the structural Static boundary allowance.
- Migrate ejmlabs, CLI, IDE, and Harness, plus affected gallery and starter examples. CLI and Harness use the same shared hero entrance as IDE, with automatic reduced motion.
- Document how changes in ejm-ui reach linked consumers when they rebuild. Keep existing byte limits and publication boundaries.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `ui-package`: enforce one design authority, shared composition, consistent motion, and actionable failures when a consuming site forks the design.

## Impact

ejm-ui owns public UI contracts, shared composition, motion, demo presentation, and Node-only site validation. Its existing Vite parser and a directly declared maintained CSS parser handle source validation. The four sites own content and composition through those exports. Dependency direction stays from sites to shared packages; no shared package imports a consumer. No native runtime, protocol, crypto, product claims, deployment, or package publication changes are in scope.
