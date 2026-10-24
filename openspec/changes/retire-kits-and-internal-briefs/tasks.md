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
- [x] 3.2d Supply the exact UI root manifest, full lockfile, all ten workspace manifests, and license as separate static review context with source identity and hashes; verify bytes, modes, workspace coverage, recorded configuration absences, current docs, unchanged canonical context, callers, pins and runtime inputs, strict OpenSpec, whitespace and cumulative PR bounds. Require fresh exact-head acceptance and complete reviews; leave installed-pin acceptance open.
- [x] 3.3 After that installation merges, verify a fresh admitted PR uses the installed shared caller and exact public `ejm-ui` source archive/context, passes owner and consumer contracts and both complete AI reviews, and satisfies every protected check before adopting owner APIs or removing fonts.
- [x] 3.4 Adopt the six public token asset families favicon, fonts, icons, lockups, logos, and social through Node's package resolver and the existing pinned sibling UI setup; remove their 64 exact local copies, preserve the complete emitted inventory, bytes, modes, and font notices, and update current source-setup guides without changing rendered reference guides.
- [x] 3.5 Verify exact selected-family inventory and Git blob/mode equality, all 64 public resolutions, affected owner token/provenance checks, three existing Studio tests, before/after output equality, current docs links, pinned standards, strict OpenSpec, whitespace, and normal/conservative PR bounds; record source reduction, all local results, and unrun hosted/browser/deployment work.
- [x] 3.6 Adopt the complete public 80-file motif and 12-file template families through the existing resolver, remove the measured 41 dots/echo/flow/orbit/ripple copies, stop invoking the local motif generator from the retained checker while preserving its other contracts, and update current guides for the sole emitted raw checker-script byte change.
- [x] 3.7 Verify all 156 public asset resolutions, complete selected-family inventories and Git blobs/modes, the exact 41 deletions, affected owner token/provenance checks, three existing Studio tests and a standalone build, all 238 output paths/modes with only the raw checker-script bytes changed, current docs links, pinned standards, strict OpenSpec, whitespace, and whole-PR bounds; record local results and unrun hosted/browser/deployment work.
- [x] 3.8 Remove exactly the remaining 39 motif and 12 template copies from the measured slice B inventory, preserving the adopted public families, resolver, runtime, generators, workflows, pins, versions, licenses and static review context. Update current source guides and changelog without editing rendered historical guides.
- [x] 3.9 Verify all 51 removed copies match pinned public-owner blobs and all before/after output paths, bytes and modes. Run the consistency entry, site tests, typecheck, build and budget. Record source reduction and unrun hosted/browser/deployment work; leave tasks 4.1 through 4.3 open.

## 4. Studio adoption and live kit retirement

- [ ] 4.1 Adopt the needed public `@ejm/*` exports with current guides; verify owner checks, Studio build, assets, metadata, headers, notices, and clean source resolution.
- [ ] 4.2 Remove the remaining live design kit and duplicate shared code after its dependencies are replaced or retired; verify consumer links and preserve required brand masters, notices, and provenance.
- [ ] 4.3 Verify the migrated site at desktop/mobile sizes in both themes, keyboard focus, overflow, console/CSP, and affected routes; record asset/request measurements and actual publication status.

## Workflow follow-up

- Keep dependent migration tasks open until their prerequisites and checks pass.
- Use exact-commit human readiness and approval, two completed AI reviews, and all protected checks for each PR.
- Sync specs and archive only after all tracked work and required reviews are complete. Publication and deployment require their own recorded results.
