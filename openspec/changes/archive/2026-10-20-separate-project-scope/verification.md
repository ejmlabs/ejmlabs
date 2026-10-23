# Verification

This record covers the initial local cleanup. The later authorized publication and live checks for all four sites are recorded in [site-publication.md](site-publication.md).

## Scope

The studio, CLI, harness, IDE, and shared UI were audited as independent open source projects. This repository owns studio guidance, retained security records, and the launch source archive. Other product changes use their owning workflows. No public shared UI source change was needed.

## Studio results

- Project-owned contents and paths: no unrelated proprietary product references found after cleanup. The scan includes hidden files and generated site output; Git internals and installed dependency trees are excluded.
- Seven retained or generated archives, with 719 members: no matching member names or decompressed contents.
- Launch source archive: all 150 revised file hashes match `source-manifest.json`; its archive digest is recorded there. Ten historical source files had identity-only edits; the added revision note states that no rebuild or recapture ran. `capture.json` retains its original source and binary hashes and historical results.
- Retained security JSON parses. Scoped audit excerpts identify omitted unrelated resources and do not claim to reconstruct the complete account snapshot.
- Site typecheck passed.
- Site build passed and rebuilt both public downloads.
- All 23 site tests passed.
- All seven routes passed existing JavaScript, CSS, font, and HTML budgets. No budget was raised and no runtime dependency was added.
- Strict validation of `separate-project-scope` and all seven main specs passed. All three delta requirement blocks match the synced main specs. The security inventory requirement now limits records to project resources in a shared account.
- Scoped writing and diff whitespace checks passed. A whole-tree whitespace check reported an existing trailing blank line in `design-kit/web/CONTAINERLESS.md`, outside this change; that concurrent edit was preserved.

The shell selected Node 23 by default. Final typecheck, build, all 23 tests, and route budget checks passed with the installed Node 24.19.0 runtime required by the site package. An earlier check also passed on Node 26.

## Documentation and release

The public discovery pages and kit downloads were reviewed and passed their existing build checks. Changed operating guidance is repository documentation; project guides are owned by the product repositories. Publication is not established by these local checks. No site deployment, account operation, credential migration, or Git history rewrite ran.

## Owner and consumer checks

The harness owns the manifest and optional registry contract. The CLI owns explicit registry selection, local package workflows, and its guides. The IDE owns its naming and site guidance. Their final check results are recorded in their matching change records.

- Harness: the focused package suite, SDK suites, and site checks passed. The full harness gate and registry gate passed on retry, including native and WebAssembly Clippy, Rust tests, schema and SQLite checks, API and auth tests, SDK checks, dependency audits, and local deployment dry runs. The first full harness run failed at `capacity::registry::tests::released_lifetime_slots_reuse_stable_files`; both the isolated retry and the complete gate retry passed. The record retains that failure rather than claiming the first run passed. The final raw scan covered 20,547 files; its only remaining matches were 24 stale lint-cache records, which were removed and checked again. All eight archive audits, covering 728 members, passed. No verified live registry origin was introduced.
- CLI: explicit registry selection and the optional public harness installer are integrated. Four package behavior tests, 179 unit tests, 22 integration tests, five relay library tests, strict Clippy, release builds, and documentation checks passed. The site passed 94 tests and its existing route budgets. Independent terminal checks, 85 relay tests, seven browser tests, WebAssembly builds, and the local deployment dry run also passed. The full gate stopped at the certificate dependency advisory RUSTSEC-2026-0381; those dependency pins were not changed. Later relay checks used installed dependencies without repeating `npm ci`.
- IDE: guidance and local disposable artifacts were cleaned. Its final binary-aware scan found no references, and all eight main specs passed validation. No IDE runtime contract consumed the changed manifest or registry default, so no native build or runtime test was needed.
- Shared UI: the read-only audit found no references in source, generated files, symlink targets, or the retained brand archive. No UI edit or consumer contract change was needed.
- Studio review: an independent reviewer checked the scoped records, all 150 launch archive member hashes, archive digest, and provenance. No concrete correctness issue remained. Useful project audit, alert, and incident response guidance was retained.

The studio, harness, CLI, and IDE changes are synced and archived in their owning repositories as `2026-10-20-separate-project-scope`. These local records do not establish native acceptance on other operating systems, live registry availability, or publication. The temporary studio review baseline was removed after review.
