# Proposal

## Why

The project logos exist in the kit, but the sites and products still show shared studio artwork. The user wants each project to use its own identity.

## What Changes

- Supply browser icons, manifests, and social cards for CLI, IDE, and Harness from the existing logo generator.
- Add theme-aware project logo variants to the shared site CSS.
- Show each project logo in the studio site's project listing.
- Document the import contract for product sites and app assets. Product repositories track their integration separately.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `project-identity`: Provide repeatable browser branding and shared site logo treatments, and apply the family to the studio project listing.

## Impact

Changes `design-kit/scripts/build-projects.mjs`, generated project assets, shared logo CSS and guidance, and `site/src/index.html`. Uses existing HarfBuzz and librsvg tools plus Python Pillow for ICO packaging. No browser runtime dependency, deployment, or publication is added.
