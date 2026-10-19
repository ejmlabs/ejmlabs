# Tasks

## 1. Current documentation cleanup

- [x] 1.1 Remove the unlinked `CLAUDE_REDESIGN_BRIEF.md` after checking its absent scene modules; preserve current guides, notices, and workflow review sources.
- [x] 1.2 Correct root/site guides and changelog for current source and shared ownership; verify affected local Markdown links resolve.
- [x] 1.3 Verify that earlier docs-only slice with strict OpenSpec and whitespace checks; record unrun runtime and hosted checks.

## 2. Bounded output retirement

- [x] 2.1 Revise this plan through OpenSpec, replace the docs-only spec skip with `studio-site-output` behavior, and define rollback; verify strict validation before implementation.
- [x] 2.2 Retire ZIP generation and offers, X kit pages, and the swag gallery; exclude their paths and ZIPs from generated output, update public guides and existing output tests, and verify the site build, local links, headers, and retired-path absence.
- [x] 2.3 Remove three committed ZIPs, both X kit copies' `source/`, `README.md`, `index.html`, and `profile-copy.md`, plus `scripts/build-brand-extensions.cjs`, `scripts/make-brand-previews.py`, `scripts/verify-brand-kits.py`, `design-kit/scripts/build-social.mjs`, and `design-kit/scripts/outline-text.py`; verify exactly 38 new deletions and unchanged retained runtime bytes/modes, notices, and canonical workflow sources.
- [x] 2.4 Verify the whole pending PR stays below 200 files, 12,000 changed lines, and 1,000,000 normal diff bytes; run strict OpenSpec and whitespace checks and record local results and unrun hosted/browser checks.

## 3. Remaining source and file retirement

- [x] 3.1 Remove the inert root X rendered assets/fonts together with their font notices, and retired swag assets in a separate bounded slice; verify no output or active build dependency and current docs.
- [x] 3.2 Remove the inert copied X rendered assets/fonts together with their font notices in a separate bounded slice; verify no output or active build dependency and current docs.
- [x] 3.2a Expose the retained checker through Studio-owned `node scripts/check.mjs`, route existing local commands and the site test hook through it, and document its compatibility gap and removal condition; verify unchanged checker behavior, build output, assets, notices, and workflow bytes.
- [x] 3.2b Restore the exact pinned shared contributor template, keep local check and migration guidance in Studio's root and site guides, and verify focused docs links, pinned standards, strict OpenSpec, whitespace, PR bounds, and unchanged runtime blobs/modes and retained output; reuse prior runtime checks and require fresh exact-head acceptance before hosted admission.
- [x] 3.2c Prepare coupled shared caller and public UI source manifest adoption with exact canonical old/new review data and current guides; verify clean public source identities, existing preparation contracts, pinned standards, affected docs, unchanged runtime/font blobs and output bytes/modes, strict OpenSpec, whitespace, and PR bounds. Leave hosted acceptance open.
- [ ] 3.3 After that installation merges, verify a fresh admitted PR uses the installed shared caller and exact public `ejm-ui` source archive/context, passes owner and consumer contracts and both complete AI reviews, and satisfies every protected check before adopting owner APIs or removing fonts.

## 4. Studio adoption and live kit retirement

- [ ] 4.1 Adopt the needed public `@ejm/*` exports with current guides; verify owner checks, Studio build, assets, metadata, headers, notices, and clean source resolution.
- [ ] 4.2 Remove the remaining live design kit and duplicate shared code after its dependencies are replaced or retired; verify consumer links and preserve required brand masters, notices, and provenance.
- [ ] 4.3 Verify the migrated site at desktop/mobile sizes in both themes, keyboard focus, overflow, console/CSP, and affected routes; record asset/request measurements and actual publication status.

## Workflow follow-up

- Keep dependent migration tasks open until their prerequisites and checks pass.
- Use exact-commit human readiness and approval, two completed AI reviews, and all protected checks for each PR.
- Sync specs and archive only after all tracked work and required reviews are complete. Publication and deployment require their own recorded results.
