# Design

## Context

The kit already has the structure this change builds on: site CSS generated from ordered parts in `design-kit/web/parts/` (base, color balance, external links, open layer, dark, motion, responsive, demo, gallery), an application kit with one generated theme, shared checkers (`check-kit`, `check-site`, `shoot`), a device matrix from 320px to 5120px, and a catalog test that fails on undocumented classes. See proposal.md for why the bar is rising.

Constraints that shape the approach:
- Brand fonts (Manrope, IBM Plex Mono), palette, logo rules and Sage-leads balance do not change.
- Every part must work in light and dark through the band role variables and `--ejm-theme-*` tokens.
- Other sessions work in this repo. The change `public-repository-standards` is separate and must not be touched.
- The kit is copied into three project repos, so additions must be additive and self-contained.

## Goals / Non-Goals

**Goals:**
- A visible, measurable step up in typography, depth, imagery, docs and product UI, judged against the references at equal sizes.
- Everything new is a named, documented kit part, so sites choose from it and write no CSS.
- Quality is enforced by checks and a rubric, not remembered.

**Non-Goals:**
- No new fonts, no palette changes, no changes to the brand guide or logo.
- No copying of a reference's layout, imagery or text. We study principles and express them as ejmlabs.
- No deployment, no changes to the project repos beyond re-syncing the kit later.
- No live or networked product features in demos or windows.

## Decisions

**0. Containerless editorial is the foundation (owner decision, 2026-10-18).** The earlier look grouped content in rounded tonal boxes and a Sage hero slab. The owner rejected it as ugly and dated. The new language has no containers: grouping comes from display type, whitespace, 1px hairline rows and full-bleed tonal bands. The hero sits on the page ground with floating product windows. Sage leads as full-width page bands (about 30 percent), Forest stays under 10 percent. Controls (buttons, tags, inputs, toggle) keep their shapes. Elevation stays on windows, menus and overlays only. Parts 10, 11 and 15 are rewritten, not extended, and container classes are removed, with a kit check that fails if one returns. The application kit uses stat figures, hairline tables and rules instead of tiles and panels, and the terminal guide groups by spacing and one rule instead of box-drawing frames.
*Alternative:* keep iterating on cards (softer, flatter). Rejected by the owner. *Alternatives not chosen:* immersive full-bleed art, hairline Swiss grid.

**1. New CSS parts, one owner each.** Add `16-hero`, `17-editorial`, `18-art`, `19-docs` between `15-open` and `20-dark`; app changes stay in `ui/app.css`. Each part uses only role variables and tokens, so dark mode inherits and the generator keeps `site.css` consistent.
*Alternative:* edit the existing parts. Rejected: it recreates the merge conflicts the part split removed and makes the change hard to review.

**2. Elevation is a small token set, used sparingly.** Three levels (rest, raised, float) as shadow tokens with light and dark values; only product windows, menus and overlays use them. This keeps the open, shadowless site language and gives depth exactly where products appear.
*Alternative:* shadows on cards. Rejected: it brings back the boxiness the previous revision removed.

**3. Product windows are static compositions built from existing kit parts**, assembled from `ejm-ui` primitives and the terminal classes, labelled as simulated, and sourced from the same scenario data as the demos so content stays honest and in one place. Live demos stay in the demo frame.
*Alternative:* screenshots. Rejected: they go stale, cannot follow the theme, and cannot be checked by the class guard.

**4. Typography stays inside Manrope and Plex Mono** and gains personality through scale contrast, tracking, weight, balanced wrapping, tabular numerals, and mono metadata rows. A display tier (up to about 120px fluid) sits above the guide's 48px; the guide's scale remains for ordinary headings.
*Alternative:* a serif accent like Anthropic. Rejected: new fonts are out of scope and would change the brand.

**5. Illustration is generated, not drawn.** A deterministic Node script derives line art from the symbol's outline (offsets, repeats, crops) into SVG files, in light and dark treatments, with `--check` like the other generators. Gradients and grain are CSS and a tiny SVG noise tile, in brand colors only.
*Alternative:* hand-made artwork. Rejected: not reproducible, hard to theme, hard to keep within the palette.

**6. Docs behaviors are progressive enhancement.** Layout, contents links, callouts and tables work with no script. One small `docs.js` adds scroll-aware contents, copy buttons, language tabs and the sidebar filter, with ARIA tab and live-region patterns. It is added to the checker's allowed kit scripts.

**7. The quality gate has three layers.** A written rubric (`QUALITY.md`), automated checks that already exist plus new ones (art generator check, product-window label check), and a dated critique that screenshots our pages and the references at the same matrix sizes and ranks findings. The critique runs after the build work and again at the end.

**8. Order of work.** Tokens and hero first (they set depth and display scale), then editorial and art in parallel, then docs, then app polish, then the critique and fix pass. Each group lands its own docs and checks.

## Risks / Trade-offs

- **Subjective bar** → The rubric turns it into checkable statements, and the critique is repeatable and recorded.
- **Looking like a copy** → Briefs state principles only; the critique checks for imitation; hero art comes from our symbol.
- **Visual noise creeping back** → Elevation, gradients and grain are reserved for named places and verified in screenshots at phone and ultrawide sizes.
- **Regressions in dark mode, overflow or contrast** → Each group runs the matrix in both themes and the shared checkers before it is complete.
- **Page weight and motion** → Art is small SVG, no new fonts, one small script, transform and opacity only, reduced motion respected.
- **Breaking migration** → Group 0 lands first and migrates every kit page before other groups build on it. The removal check lists any leftover use.
- **Parallel edits colliding** → One part file and one catalog doc per workstream; nobody edits another's part.

## Migration Plan

1. Rewrite the base parts containerless, remove container classes and add the removal check; migrate kit pages.
2. Rebuild the new parts (product, editorial, art, docs, app) on that foundation and land them with checkers green.
3. Update the ejmlabs.com home to use the new parts and run the page checker.
4. Re-sync the kit into the three project repos in separate sessions, migrate their pages, and re-run the checker there.
5. Deploys are a separate, explicitly approved step and are not part of this change.
Rollback is a git revert of this change. Container classes are removed, so pages must be migrated, not patched.

## Open Questions

- Whether the product hero should ship as the default home hero on the three project sites or only on ejmlabs.com. This does not change the specs or tasks, since the part supports both, and can be settled when the sites re-sync.
