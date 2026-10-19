# Tasks

## 1. Current documentation cleanup

- [x] 1.1 Remove `CLAUDE_REDESIGN_BRIEF.md` after confirming its scene modules are absent and no tracked public guide links to it; preserve current guides, notices, and canonical workflow review sources.
- [x] 1.2 Correct the root and site guides and changelog for public source, current build inputs, and the Studio-to-`ejm-ui` owner direction; verify local Markdown links in the affected guides resolve.
- [x] 1.3 Verify the bounded docs-only diff with strict OpenSpec validation and `git diff --check`; record the runtime and hosted checks left unrun.

## 2. Public owner contract prerequisite

- [ ] 2.1 Establish a pinned public `ejm-ui` source or package assembly using its actual public export map; verify a clean public checkout resolves the needed contracts without private sibling files and record owner contract checks.
- [ ] 2.2 Before runtime work, revise this plan through OpenSpec, replace `skip_specs: true` with the relevant behavior specs, and define kit route/download migration and rollback; verify strict validation and review the owner/consumer contract.

## 3. Studio adoption and kit retirement

- [ ] 3.1 Adopt only the needed public `@ejm/*` exports for Studio content and assembly, with current docs; verify owner checks, Studio build, assets, metadata, headers, license notices, and clean public source resolution.
- [ ] 3.2 Remove `design-kit/`, `x-kit/`, their generators, duplicate shared implementations, and stale kit guidance after each remaining dependency is replaced or retired; verify no live build or consumer link depends on the removed files and preserve required Studio brand masters, licenses, and provenance.
- [ ] 3.3 Verify the migrated site at desktop and mobile widths in light and dark mode, with keyboard focus, overflow, console/CSP, and affected public routes/downloads; record emitted asset/request measurements and actual publication status in the public docs.

## Workflow follow-up

- Keep dependent runtime tasks open until their prerequisites and checks pass.
- Use exact-commit human readiness and approval, two completed AI reviews, and all protected checks for each PR.
- Sync specs and archive only after all tracked work and required reviews are complete. Publication and deployment require their own recorded results.
