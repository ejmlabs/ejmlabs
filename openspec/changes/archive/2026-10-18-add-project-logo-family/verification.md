# Verification

Verified 18 October 2026.

- Rebuilt all artwork with `node design-kit/scripts/build-projects.mjs`.
- Inspected the light and dark family boards and the revised Harness symbol. The user's dense-weave concern was addressed with an open H made from two simple filled shapes.
- Checked 24 project SVG/PNG pairs and 12 favicons with XML parsing and Pillow. Dimensions match, transparent exports retain alpha, square icons are opaque, and icon clear space meets the quarter-mark-width rule.
- Checked production SVGs for live text, raster images, duplicate IDs, and external references. None found. Editable text placement uses HarfBuzz's actual glyph offsets; the usage guide names the supplied font to install.
- Ran `scripts/verify-brand-kits.py` with Pillow: 17 HTML files, 214 SVGs, and 136 PNG dimensions passed with zero failures, including PNG decoding and color checks.
- `git diff --check` passed for the touched area. `git diff --exit-code -- design-kit/logos/` confirmed the original studio logo files were unchanged.
- `openspec validate add-project-logo-family --strict` passed.

The broader `node design-kit/scripts/check-kit.mjs` check reports existing class/catalog drift for `ejm-card`, `ejm-cards`, `ejm-projects`, and `ejm-parts` in other active work. This logo change adds no CSS classes and leaves those files with their owners. The asset and link verifier passes.
