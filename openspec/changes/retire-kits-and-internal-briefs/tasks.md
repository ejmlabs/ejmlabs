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
- [ ] 3.2 Remove the inert copied X rendered assets/fonts together with their font notices in a separate bounded slice; verify no output or active build dependency and current docs.
- [ ] 3.3 Establish pinned public `ejm-ui` source or package assembly through public exports; verify clean source resolution and owner contract checks.

## 4. Studio adoption and live kit retirement

- [ ] 4.1 Adopt the needed public `@ejm/*` exports with current guides; verify owner checks, Studio build, assets, metadata, headers, notices, and clean source resolution.
- [ ] 4.2 Remove the remaining live design kit and duplicate shared code after its dependencies are replaced or retired; verify consumer links and preserve required brand masters, notices, and provenance.
- [ ] 4.3 Verify the migrated site at desktop/mobile sizes in both themes, keyboard focus, overflow, console/CSP, and affected routes; record asset/request measurements and actual publication status.

## Workflow follow-up

- Keep dependent migration tasks open until their prerequisites and checks pass.
- Use exact-commit human readiness and approval, two completed AI reviews, and all protected checks for each PR.
- Sync specs and archive only after all tracked work and required reviews are complete. Publication and deployment require their own recorded results.
