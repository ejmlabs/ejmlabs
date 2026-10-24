# Tasks

Direction update (2026-10-18): the owner chose containerless editorial. Group 0 is new and lands first. Tasks reopened for rework on the new foundation are marked "(rework)". The art generator and the docs behavior script keep their work.

## 0. Containerless foundation

- [ ] 0.1 List every container class in `web/parts/` and `ui/app.css` (cards, panels, tiles, tonal boxes, hero panel and their variants) in `design-kit/web/CONTAINERLESS.md` with the containerless replacement for each, and verify every one is listed by script
- [ ] 0.2 Rewrite `10-base.css`, `11-balance.css` and `15-open.css` containerless: page ground, full-bleed tonal bands (Paper, Mist, Sage, Ink), hairline rows, type-led sections and a type-led hero with no panel; verify `node scripts/build-web.mjs` builds and `check-kit.mjs` reports catalogs complete
- [ ] 0.3 Update `20-dark.css`, `40-responsive.css` and `50-demo.css` so bands, hairlines, demos and the theme toggle work containerless in light and dark; verify with `scripts/shoot.mjs` on `web/starter.html` at the full matrix with zero overflow
- [ ] 0.4 Add a removal check to `scripts/check-kit.mjs` and `check-site.mjs` that fails when a removed container class is defined, documented or used, and verify it fails on a test page that uses one
- [ ] 0.5 Migrate the kit pages (`index.html`, `web/patterns.html`, `web/demos.html`, `web/starter.html`, `web/theme.html`, `web/motion.html`, `web/responsive.html`, `ui/index.html`, `ui/tui.html`) and update `CATALOG.md`, `PATTERNS.md` and `OPEN.md`; verify check-kit, check-site and the matrix pass in both themes

## 1. Quality bar and baseline

- [x] 1.1 Write `design-kit/QUALITY.md` with the quality dimensions (typography, rhythm, depth, imagery, motion, detail, responsiveness, accessibility) as checkable statements, and verify `node design-kit/scripts/check-kit.mjs` still passes
- [x] 1.2 Capture baseline screenshots of the ejmlabs home, gallery and docs-like pages and of the reference sites at the matrix sizes in light and dark with `scripts/shoot.mjs`, and write a dated baseline in `design-kit/web/CRITIQUE.md` ranking findings by impact; verify the file lists at least ten findings with a size and theme for each
- [x] 1.3 Add `docs.js` to the allowed kit scripts in `scripts/check-site.mjs` and verify the checker accepts a page that loads it and still rejects an unknown script
- [x] 1.4 Add a checker rule that a page containing `ejm-product` carries a visible simulated label, and verify it fails a page without the label and passes one with it

## 2. Depth and product composition

- [x] 2.1 Add `web/parts/16-hero.css` with three elevation tokens (rest, raised, float) for light and dark, and verify the tokens exist in `site.css` and `node scripts/check-kit.mjs` passes
- [ ] 2.2 (rework) Build the product window frame and the layered stage composition, and verify `web/product.html` renders them in light and dark with `scripts/shoot.mjs`
- [x] 2.3 Fill the ejm-cli, ejm-ide and ejm-harness windows from the same scenario data as the demos, and verify every command and tool name shown appears in that product's README
- [ ] 2.4 (rework) Add the product hero variant with the staged entrance (copy, then windows, under 1.2 seconds, transform and opacity only), and verify with the browser that reduced motion and no-script show the final layout with nothing hidden
- [ ] 2.5 (rework) Make the composition reflow from 320px to 5120px, and verify `scripts/shoot.mjs` reports zero overflow and zero small touch targets at every matrix size in both themes
- [ ] 2.6 Document every new class in `web/PRODUCT.md` and verify `check-kit.mjs` reports the catalogs complete

## 3. Editorial typography

- [x] 3.1 Add `web/parts/17-editorial.css` with the display tier, tracking, balanced wrapping and tabular numerals, and verify computed font sizes at 375px and 3440px stay within the specified ranges with a script
- [ ] 3.2 (rework) Build the metadata rows (`facts`) with mono labels and hairlines, and verify they stack without clipping in a 340px container
- [x] 3.3 Build the feed rows for dated entries, and verify keyboard focus is visible on every entry link
- [x] 3.4 Refine buttons and links (arrow motion, rest, hover, focus, pressed, 44px touch targets), and verify under coarse pointer emulation that every target is at least 44px and that reduced motion keeps only the tone change
- [ ] 3.5 (rework) Document the parts in `web/EDITORIAL.md`, add the live page `web/editorial.html`, and verify the zero-overflow matrix in both themes

## 4. Symbol art system

- [x] 4.1 Write `scripts/build-art.mjs` that derives line art from the symbol deterministically with a `--check` mode, and verify two runs produce identical files and `--check` passes
- [x] 4.2 Generate art for hero, dividers, empty states and error pages with light and dark treatments, and verify with a script that every color is a brand color or a brand color at reduced opacity
- [x] 4.3 Add `web/parts/18-art.css` with the art classes plus soft gradient and grain surfaces, and verify with a contrast script that text over the lightest and darkest gradient point is at least 4.5:1
- [x] 4.4 Add the draw-on behavior that plays once on entry and shows the final state immediately without scripts or under reduced motion, and verify both paths in the browser
- [x] 4.5 Document the system in `web/ART.md`, add `web/art.html`, and verify the matrix and the kit checks pass

## 5. Docs experience

- [ ] 5.1 (rework) Add `web/parts/19-docs.css` for the sidebar, reading column and contents layout with phone controls, and verify there is no horizontal overflow at 320px and 5120px
- [x] 5.2 Write `web/docs.js` for the scroll-aware contents, copy buttons, language tabs and sidebar filter with the correct ARIA patterns, and verify by keyboard that tabs, copy and filter work and announce their results
- [ ] 5.3 (rework) Build the callouts with text labels and the parameter tables, and verify a warning callout starts with the text label
- [x] 5.4 Add previous and next links, and verify they name the adjacent pages
- [ ] 5.5 (rework) Document everything in `web/DOCS.md`, build the flagship `web/docs.html` page, and verify it works with scripts disabled, in dark mode, and across the matrix

## 6. Application and terminal polish (containerless)

- [ ] 6.1 Build the dashboard composition of stat figures, a chart, a hairline table and an activity list, with no boxes, in `ui/app.css`, and verify there is no overflow at 375px and 3440px
- [ ] 6.2 Build the chart primitives with a text legend and a table alternative on the six hue roles, and verify the legend and values are present in the document text
- [ ] 6.3 Complete the empty, loading and error states for every list, table and panel, and verify each shows a sentence and one action where an action exists
- [ ] 6.4 Bring the terminal guide and helper functions to the same state and spacing language, add tests for the new helpers, and verify `cargo test` passes in the scratch crate and every state reads under NO_COLOR
- [ ] 6.5 Document in `ui/PRIMITIVES.md` and `ui/TUI.md`, and verify `node scripts/build-ui.mjs --check` and the matrix on `ui/index.html` pass in both themes

## 7. Adoption, critique and integration

- [ ] 7.1 Rebuild the ejmlabs.com home on the containerless language with the new parts and verify `node design-kit/scripts/check-site.mjs site/src/index.html --require demo` and `cd site && npm test` pass
- [ ] 7.2 Update `design-kit/CATALOG.md`, `SITES.md` and `README.md` for the new parts, and verify `check-kit.mjs` passes
- [ ] 7.3 Run the full device matrix in light and dark on every kit page and the home page, and verify zero overflow and zero small touch targets
- [ ] 7.4 Repeat the reference critique against the new pages, fix the top findings, and record the results with the date in `design-kit/web/CRITIQUE.md`; verify the file shows each baseline finding as closed or explained
- [ ] 7.5 Review every new visual for imitation of a reference's layout, imagery or text, and verify the critique records the check and any change made

## Workflow follow-up

- Re-sync the kit into ejm-cli, ejm-ide and ejm-harness in their own sessions and re-run the page checker there.
- Deploys of any site need the owner's explicit approval and are not part of this change.
- Archive the change after review.
