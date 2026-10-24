# Design

## Context

See proposal.md. Five primary checkouts contain concurrent work. CLI has three
staged files; CLI and Harness have required native commit hooks. The verified
site scope was projected onto each local HEAD in sibling release worktrees.
Each site consumes public file packages from the release ejm-ui checkout.

## Goals / Non-Goals

Prove and publish the selected bytes, preserve unrelated work, retain normal
hooks and existing asset budgets, and keep a known rollback version per site.
Do not publish source history, packages, installers, native WIP or new services.

## Decisions

Fix test bootstrap rather than reuse old build output: load starter documents
after its build hook, copy the performance fixture's public folder only when
present, and retain the existing narrow Chrome exit and profile cleanup fix.
Use standard Node hooks and filesystem APIs without another dependency, test
duplication, retries around assertions or weaker time limits.

Use sibling clean worktrees and reviewed scoped patches. Reuse installed third
party dependencies only when versions match; all @ejm links and shared bins
must point to release packages. Refresh lock metadata with npm and inspect the
diff for unrelated upgrades. Build those exact projections before publication.

Correct guide claims exposed by the clean repository-claim checks. Inspect the
selected runtime interfaces, then describe only those supported APIs, commands
and files. Remove links to absent repository files and unimplemented security
or platform guarantees. Keep useful setup and contribution guidance. This is a
docs correction, without new runtime implementation or weaker claim checks.
Preserve the primary checkout's separate work on later runtime features.

Normal commit hooks run against the selected clean source. Pin each resulting
commit and fast-forward the primary checkout only after parking selected files
and checking disjoint staged paths. Restore other WIP bytes and verify index
and unrelated patches. Abort and restore files if a fast-forward is rejected;
never force a ref or replace the index to complete integration.

Publish with the existing Wrangler configs. Save prior deployment versions,
dry-run each upload, then check HTTPS routes, missing routes, headers, asset
identity and the repaired playback. Keep the existing IDE release API and R2
binding. A build or Wrangler success alone does not prove the live result.

## Risks / Trade-offs

- Mixed source can leak unrelated work: review exact patch and build closure.
- Dependency symlinks can resolve to the primary UI: inspect resolved paths.
- Hooks can reject commits: retain required gates and report concrete failures.
- Integration can collide with staged work: preserve it, use disjoint paths and
  recover from pinned snapshots on failure.
- Publication can regress: restore the saved immutable Worker version.

## Migration Plan

Check shared source and four consumers, commit through normal hooks, integrate
with preservation proof, dry-run and deploy existing Workers, then verify live
bytes and browser behavior. Record commit and deployment identities separately.
