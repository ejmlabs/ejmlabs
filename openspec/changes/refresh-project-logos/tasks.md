# Tasks

## 1. Review and prototype

- [x] 1.1 Write the review of the current cli, ide and harness marks (what reads generic, what differs from the symbol's nested ribbons) in `design-kit/projects/REVIEW.md`, and verify it covers each project with at least two concrete points
- [x] 1.2 Measure the symbol's ribbon width, gap and terminal shapes and record the ratios in the generator, and verify the script prints them
- [x] 1.3 Prototype the three marks as stroked ribbon paths with shared width and gap, convert to filled outlines, and verify the output SVGs contain no strokes and only brand colors
- [x] 1.4 Render a large and a 16, 24 and 32 px board in light and dark, view them, and iterate until each mark is recognisable at 32 px and no gap closes at 16 px; verify with a script that the minimum gap at 16 px is at least 1 px

## 2. Regenerate assets

- [x] 2.1 Replace the marks in `scripts/build-projects.mjs` and regenerate every project asset (marks, logos, icons, favicons, touch icons, manifest, social card, editable logos); verify two runs are identical
- [x] 2.2 Update the family boards (`family-light`, `family-dark`), `projects/index.html`, the guide `projects/README.md` and the CSS mask files for `ejm-logo--cli`, `--ide` and `--harness`; verify the kit checks pass
- [x] 2.3 View every regenerated asset class (mark, logo, icon, favicon, social card) in light and dark and verify none is clipped or low contrast

## 3. Adoption

- [ ] 3.1 Message the sessions working in `ejm-cli`, `ejm-ide` and `ejm-harness` with what changed and how to re-sync, and verify each acknowledged
- [ ] 3.2 Confirm the files exist in the shape the ejm-ui move expects, and verify the paths are listed in the move manifest

## Workflow follow-up

- Re-syncing the kit and regenerating native icons happens in each product repo's own session.
- Deploys and publishing need the owner's approval and are not part of this change.
