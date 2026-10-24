# Verification

## Shared identity and studio integration

- Generated browser bundles for all three projects, including 16/32/48 ICO frames, 180px touch icons, 192px and 512px install icons, and 1200 by 630 social cards.
- Ran the generator twice and compared SHA-256 hashes for all 99 files under `design-kit/projects/`. Outputs matched exactly.
- Checked all three manifest names and their local icon references with Pillow and Python's JSON parser. Icon backgrounds and social cards are opaque.
- `scripts/verify-brand-kits.py` passed: 17 HTML files, 220 SVGs, 148 PNG dimensions, zero failures.
- `node --check design-kit/web/demo.js` passed. The simulated CLI header and no-script transcripts carry the same `>_ ejm-cli` text as the real terminal header.
- Studio `npm run build` passed and emitted the complete kit and ZIP.
- CUA checked the studio project list at 1280px and 320px in light and dark. No horizontal overflow. Accessible project links retain `ejm-cli`, `ejm-ide`, and `ejm-harness`. All masks resolve to their matching project SVGs with 48px heights and their canonical aspect ratios. Name colors follow Ink in light and the theme text in dark.
- Original studio artwork under `design-kit/logos/` was not edited.
- Strict OpenSpec change validation and `git diff --check` passed.

## Existing concurrent-work failures

Studio `npm test` ran, with one passing test and two failing tests. The kit and page checks report missing definitions for `ejm-card`, `ejm-cards`, `ejm-projects`, and `ejm-parts`. These missing styles existed before this integration. The same issue was recorded in the earlier logo-family archive. No logo asset or modifier is named in the failures. The concurrent layout work remains intact.

The local studio preview server was already listening on port 4827. It served the rebuilt site. No additional server was left running.

## Product repositories

Each product repository tracks its own implementation and gate results. The integration includes product site/docs headers, browser bundles and social metadata, CLI terminal text, IDE titlebar and generated native icons, and Harness root/SDK README artwork. All use repeatable canonical imports and keep studio footer credit. Product preview checks cover light and dark on desktop and phone widths.

The CLI gate is blocked by concurrent Rust formatting and a stale lockfile. Harness's gate passes policy and formatting but fails on existing Claude provider Clippy findings. These are separate from the branding acceptance checks. See each repository's branding verification notes for the exact commands and results.

No commit, push, publication, or deployment was performed. Remote README asset URLs become available when the corresponding site is deployed.
