# Tasks

## 1. Project identity

- [x] 1.1 Add the approved marks beside the project headings through shared public interfaces, update the source guide, and verify types, build budgets, existing route tests, theme contrast, static headings and phone/desktop layout.

## 2. Publication

- [x] 2.1 Publish the checked root build, verify the live Projects HTML and mark assets match it, confirm the home remains without previews, and record the deployment identity and a live screenshot.

## Workflow follow-up

- Sync the verified project detail requirement to the main spec, validate it and archive this change.

## Verification

- The Projects headings use approved public token assets through the shared `SectionHead.title` node slot. Five SVG variants provide three visible decorative marks: Ink stays fixed on Sage, while Mist and Paper switch between Ink and Paper. All images reserve 40px square space, have empty alt text and are hidden from assistive technology. Browser accessibility headings retain their original project names.
- TypeScript passes. All 23 existing built-site checks pass. The Projects route is 92.1KiB JS, 13.3KiB CSS, 33.7KiB fonts and 5.2KiB HTML gzip. All seven routes stay within their unchanged limits. The first default-inline build reached 97.6KiB JS; the final build uses Vite's existing `?no-inline` asset option.
- The maintained viewport runner passes eight states: 320, 375, 1035 and 1440px in Light and Dark. No horizontal overflow or undersized active controls. Full-page screenshots were inspected at phone and narrow desktop widths, including all three marks in Dark. Public SVG contrast is at least 5.09:1 across the page's surfaces.
- The source guide records Projects page marks and theme handling. No product setup, runtime workflow or API changed, so product guides need no further edits. No new dependency or permanent test was added. The Impeccable mechanical detector reports no findings in the changed page.
- Local evidence: `/private/tmp/ejmlabs-project-marks-build-final-20261019.log`, `/private/tmp/ejmlabs-project-marks-tests-20261019.log`, `/private/tmp/ejmlabs-project-marks-design-check-20261019.json`, `/private/tmp/ejmlabs-project-marks-matrix-light-20261019.log`, `/private/tmp/ejmlabs-project-marks-matrix-dark-20261019.log` and `/private/tmp/ejmlabs-project-marks-matrix-20261019/`.
- The frozen checked build is `/private/tmp/ejmlabs-project-marks-publication-20261019/dist`: 231 files, 16,681,218 bytes. Manifest SHA-256: `bda2f6a9d5cdb439314e24777cfaf8e76693e2516058aa6f48621efb86e88689`.
- Three throttled mobile runs pass the unchanged performance gates: median LCP 724ms, FCP 720ms, CLS 0 and TBT 0. The script-free check has LCP 704ms and CLS 0. Report: `/private/tmp/ejmlabs-project-marks-perf-20261019.json`.
- Production deployment `5daef90f-7f4a-4ec5-a0b3-6b6d6a902f5b` serves version `a8cdd5e3-6a3b-4b2a-9637-a89e5e6b8a99` at 100% on `ejmlabs.com`. The live screenshot shows all three approved marks beside their names: `/private/tmp/ejmlabs-project-marks-live-proof-20261019/projects-light-narrow-desktop.png`. No source files were committed or pushed.
- All 37 production checks pass across six HTML pages, their initial assets including all mark variants, both ZIP downloads, the 404 response, HTTPS redirect, scanner response and security headers. HTML matches the frozen build byte for byte after allowing only the two recognized terminal Cloudflare Web Analytics and challenge precursor scripts, whose order varies. All asset and download hashes match without normalization. The home retains no project preview slideshow. Report: `/private/tmp/ejmlabs-project-marks-live-verification-20261019.json`.
