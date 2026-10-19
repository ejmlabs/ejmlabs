# Source review

Reviewed all six pages visually and extracted the PDF text and vector content.

Kit version 1.2.0 preserves the source identity and adds a broader set of applications, including site and application kits. The source guide remains version 1.0, October 2026.

## Retirement note, 19 October 2026

This document retains the original extraction and gallery observations below. The Studio build now excludes kit ZIPs, X kit pages, and swag output; their gallery offers and archive generation are retired. Source and handoff files, both X kit copies, and swag files are removed. References below describe the earlier material and checks, not current downloads or a new browser review. Active brand masters, licensed fonts and notices, and extraction records remain intact. This cleanup has not been deployed or verified on the public site.

## Confirmed source rules

| Page | Confirmed material |
| --- | --- |
| 1 | Brand version 1.0, October 2026; complete logo; studio description; signature phrase. |
| 2 | Fancy e symbol plus complete lowercase name; primary, solid Ink, and reversed Paper variants; full-logo clear space of half the symbol height; standalone clear space of one quarter symbol width; 180 px full-logo and 24 px symbol examples; dedicated 16 px favicon instruction. |
| 3 | Sage, Forest, Ink, Paper, Mist, and utility White; four approved reading pairs; Sage on Paper limited to artwork and decoration. All five printed contrast ratios match independent calculation. |
| 4 | Manrope for main text with 400 body and 600 headings; IBM Plex Mono for technical use; exact five-role type scale; sentence case and generous leading. |
| 5 | Cropped and repeated symbol graphics; complete signature on project pages; clear symbol in avatars; room for separate project imagery. |
| 6 | SVG and PNG logos; social assets; browser icons; CSS and JSON color tokens; fonts with original OFL licenses; README with usage and source URLs. |

## Gaps in the supplied PDF

- The PDF names `logos/`, `social/`, `favicon/`, `tokens/`, `fonts/`, and `README.md`, but those files are not attached to it.
- The source SVG is mentioned but absent. Its exact visible artwork is recoverable from native PDF vectors.
- The PDF contains no raster images. The logo is 10 filled paths with 537 cubic segments and 12 subpaths.
- Its embedded TrueType fonts are subsets. They are not suitable as complete web-font resources.
- The 180 px and 24 px sizes are shown examples. The guide does not explicitly call them minimums.
- The 16 px favicon is mentioned but absent. This kit supplies a new export using the unchanged symbol and the prescribed clear space.
- The guide gives no spacing scale, web layout rules, corner-radius scale, responsive system, or motion settings.
- There is no rule for additional text colors or combinations beyond the approved pairs. Check any new combination before using it for reading.

## Kit additions

The kit supplies the missing files, complete licensed fonts, transparent PNG exports, icon sizes, outlined social-card SVG, CSS variables, machine-readable design tokens, and a visual index.

New spacing, layout, radius, and motion settings are labeled as additions. The social and browser assets apply the original artwork to new canvases. The logo geometry, prescribed palette, type families, type weights, and source clear-space rules remain exact.

## Version 1.1.0 extensions

The source guide calls for cropped and repeated symbol graphics but does not supply a finished motif library. This release supplies named compositions and the practical parts needed to use the identity across posts and interfaces.

| Addition | Relationship to source |
| --- | --- |
| Signature crop motifs | New crops of the unchanged original symbol, following page 5's direction. |
| Echo motifs | New repeated-form compositions, following page 5's direction. |
| Flow and Orbit motifs | New mathematical linework that complements the identity. These shapes are not extracted from the PDF and do not replace the logo. |
| Forest and Paper signature lockups | New layouts using the original artwork, palette, and supplied signature phrase. |
| Project, signature or short-thought, and image-frame templates | New editable layouts. Any sample content is a placeholder, not a claim about studio projects or customers. |
| Twelve interface icons | A new functional drawing set. The icons are not additional brand marks. |
| Web components | Optional CSS and a local specimen extending the source typography, colors, and added web tokens. |
| X profile kit | New Sage and Forest applications for platform-specific profile and post canvases. |
| Swag concept boards | New apparel, accessory, eyewear, and drinkware mockups showing the brand direction. These are concept images, not manufactured products or source artwork. |
| Swag vector artwork | Eight sized SVG artwork masters prepared separately for production use, with placement and supplier guidance. |

The motif library contains eight SVGs and eight matching PNGs at 1600 x 900 px. The two signature lockups have SVG and PNG versions at 1200 x 500 px. The three templates have SVG and PNG versions at 1600 x 900 px. The visual index links to every motif variant, the lockups, templates, separate icon and component specimens, and the three swag concept boards. The apparel and accessories boards are each 1536 x 1024 px. The glassware board is 1774 x 887 px and shows Studio glass etched tumblers and Flow glass highballs. Editable template SVGs live in `templates/editable/`; the production SVGs directly in `templates/` use outlined text. The Paper template begins with the source signature and a cropped symbol.

New usage guidance recommends one motif family per composition, generous open space, a separate clear area for the full logo, and the approved text-color pairs. The six-color palette is retained. These composition choices are kit guidance; the source PDF does not prescribe the finished layouts.

## Source extraction verification

- Source artwork extracted directly, without tracing.
- All 10 paths, 537 cubic segments, and 12 subpaths retained.
- Exact native bounds measured from cubic extrema.
- Contrast results match the guide to two decimal places.
- Full-logo PNG width: 2400 px. Symbol PNG width: 1024 px.
- Avatar: 1024 x 1024 px. Social card: 1200 x 630 px.
- ICO contains 16, 32, and 48 px images.
- Full original fonts and OFL licenses are included.
- Source file hash and export dimensions are recorded in `reference/extraction-report.json`.

The extraction report describes the source artwork and original exports. The added motifs, templates, icon set, components, and X kit do not change its source hash or geometry record. Their usage documentation is in `MOTIFS.md`, `COMPONENTS.md`, `ICONS.md`, and `social/x-kit/`. Swag concepts and production artwork are documented separately in `swag/PRODUCTION.md` and `swag/artwork/README.md`. The mockup images are visual references; production uses the exact vector artwork.

## Gallery and package checks

The expanded gallery, X profile specimen, and component specimen were reviewed at desktop and 390 px phone widths. The phone layouts have no horizontal overflow. All three swag boards load in the gallery. Download labels were enlarged, and the phone profile avatar was reduced to keep the banner content clear.

The concept boards define appearance and material direction. The eight SVG masters define exact artwork and suggested physical size. The highball wrap requires supplier confirmation against the chosen glass.

## Version 1.2.0 extensions

These additions are not extracted from the PDF. They apply the source palette, type and signature to sites and applications.

- **Site kit** (`web/`, `SITES.md`): the page shell, hero, bands, project cards, principles and footer. The hero motion is the kit's own 32 second linear ambient cycle, and it stops under reduced motion.
- **Application kit** (`ui/`, `UI.md`): a dark and light theme built on Sage, Forest, Ink, Paper and Mist. The guide defines no status, diff or syntax colors, so those are additions. They were reconciled from the existing ejm-ide theme and ejm-cli terminal palettes, and checked for 4.5:1 on every surface.
- **One light-mode syntax change:** the macro color moved from `7A7A22` to `6F6F1D` because the earlier value measured 4.30:1 on the editor.
- **Terminal guide** (`ui/TUI.md`) documents the `ejm-cli` screen, its five text roles, its fallbacks and its keys. Kit values differ slightly from those in `ejm-cli` today; the guide lists each difference.
- **Parts, not guidance.** Five more motif families with tiles, a full library of site patterns (`web/PATTERNS.md`), application primitives for forms, feedback, data, navigation and overlays (`ui/PRIMITIVES.md`), and terminal helpers with a widget catalog (`ui/rust/ejm_tui.rs`, `ui/TUI.md`). `CATALOG.md` indexes them.
- **Two roles added to the app theme** after the primitives exposed gaps: `info`, and `control-border`, which keeps form field borders at 3:1 or better on every surface.
- **Generators** (`scripts/build-ui.mjs`) write the CSS, Rust, Monaco and terminal files from `ui/theme.json` and fail on a contrast regression.
