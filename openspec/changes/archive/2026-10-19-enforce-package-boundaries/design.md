# Design

## Context

See proposal.md for the problem. This repository has six OpenSpec skills and one root AGENTS.md. The site consumes declared `file:` dependencies from sibling `ejm-ui` packages, while retained design-kit references still exist for assets and older workflows. The four product and studio repositories have separate OpenSpec roots. ejm-ui has no OpenSpec root or local skills.

## Goals / Non-Goals

**Goals:** Make package placement and dependency review explicit at every local instruction entry point. Keep contributor guidance aligned with the source the site consumes.

**Non-Goals:** Move runtime code, change package dependencies, create a governance service, or initialize OpenSpec in another repository.

## Decisions

1. Put the ownership table and full boundary rules in root AGENTS.md. Each skill gets a short section that requires reading those rules, names the important owner-first and public-interface constraints, and applies them to that workflow. This keeps each entry point useful without copying the full ownership table six times.
2. Use the current public package exports as the boundary. Local `file:` dependencies remain valid; private source imports and treating generated output as a new authority do not. Shared UI changes belong in ejm-ui even when the symptom appears on the studio site.
3. Document narrow compatibility adapters with their upstream target and removal condition. Existing provider gaps are real, so a rule that claims all behavior is already shared would be false.
4. Update CONTRIBUTING.md and site/README.md. The studio site owns content and composition; ejm-ui owns shared components, tokens, headers, registry, analytics, prerendering, demo machinery, and capture tooling. Product repositories own their guides. Replace the stale contributor pointer to site/src/index.html with the current content and route sources.
5. Validate skill structure, OpenSpec contracts, local documentation links, and the affected site's existing build. No runtime budget changes or new packages are needed. Do not add tests that assert the new wording. Sibling updates are scoped and checked in their own repositories.

## Risks / Trade-offs

- Instruction files guide contributors but do not add compiler or CI enforcement. Report this as a guidance change, without claiming a runtime audit.
- Duplicated short skill sections can drift. Keep ownership details in AGENTS.md and review every skill entry point in this change.
- Worktrees contain unrelated edits. Make narrow edits and inspect the affected hunks without restoring existing work.
- Publication is separate from a local build. Report only source and local check results.

## Migration Plan

Apply the guidance and documentation together, validate, sync the engineering-policy delta, and archive this change. Roll back only these guidance additions if needed; the change does not alter runtime code or dependencies.
