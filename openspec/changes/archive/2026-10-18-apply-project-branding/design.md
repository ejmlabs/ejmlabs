# Design

## Context

See proposal.md for motivation. The canonical generator already builds outlined SVG logos with HarfBuzz and renders PNGs with librsvg. Product sites copy selected kit assets through sync scripts. Their current headers use the studio CSS mask. The studio site already has project title links.

## Goals / Non-Goals

**Goals:** Keep artwork canonical, builds repeatable, and runtime cost limited to small local SVG masks. Match existing clear space and responsive header sizing.

**Non-Goals:** Product behavior changes, a new runtime UI for Harness, publication, and changes to the original studio artwork.

## Decisions

- Extend the existing generator for browser bundles and outlined social cards. librsvg renders image sizes; maintained Pillow packages the ICO from those renders. No custom binary encoder is needed. Python can be selected through `PYTHON` for local tool installations.
- Reuse `.ejm-logo` layout and add one modifier per project. Store each logo's true aspect ratio and symbol boundary in CSS. Keep the mark Sage by default and support the existing monochrome modifier for Sage surfaces. The mask and `currentColor` retain the established theme and forced-color behavior without image swapping scripts.
- Replace studio project title text with an accessible logo span inside the same named link. Keep the heading and repository names accessible. All other studio branding stays as supplied.
- Product repositories own their sync and integration changes, and import the full project browser bundle plus only the masks needed by shared CSS.

## Risks / Trade-offs

- Asset imports can be lost on regeneration. Update the product sync scripts and compare copied hashes after running them twice.
- The Harness lockup is wider than CLI and IDE. Check at 320px and keep header sizing within the existing responsive rules.
- Concurrent site and kit changes exist. Keep edits local and report any existing unrelated checker failures.
- Browser bundles add build files. Browser pages still request only their own mask, favicon and shared CSS, with no new JavaScript.

## Migration Plan

Generate the bundles, rebuild shared CSS, update the studio project links, then sync each product. Run static and visual checks before syncing specs and archiving. Rollback restores prior source references and regenerates outputs. Publishing is outside this change.
