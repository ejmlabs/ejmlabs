# Proposal

## Why

Relay needs its own identity for the account dashboard and browser controller. The user asked to review the work locally and for a Relay logo that follows the ejmlabs brand.

## What Changes

- Add a distinct Relay handoff symbol using the existing curved ribbon grammar and lowercase Manrope name.
- Extend the current asset generator with an explicit single-project mode. Keep its default three-project outputs unchanged.
- Provide the full portable Relay logo, icon, favicon and social-card bundle, plus a light/dark review board with small-size samples and the existing project family.
- Document local asset usage, export commands, measured sizes and the pending shared-package and product adoption.
- Open the tested relay screens through the existing local fixture preview. This does not connect real accounts or a live CLI session.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `project-identity`: Add Relay to the related project identity family and supply a separate local review and portable asset bundle.

## Impact

- Owner: `ejmlabs` owns the brand artwork and usage guidance. Changes are limited to the project-artwork construction, targeted export/check support and `design-kit/projects/relay/`.
- Existing Node, HarfBuzz, librsvg and Pillow supply geometry export, font outlines, PNG rendering and ICO encoding. No package or runtime dependency is added.
- `ejm-ui` remains the owner of shared UI tokens and packaged visual assets. A later protected change can adopt the approved Relay bundle through its public asset export, then `ejm-cli` can consume it. This change does not replace tokens, copy shared UI code or alter a frozen relay build.
- Verify single-color distinction, transparent exports, 16/24/32 px legibility, reproducibility, bounded artifact size and preservation of the existing project assets. The public product docs and deployed relay continue to describe the released build; the new local usage guide labels Relay adoption as pending.
