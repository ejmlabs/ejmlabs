# Tasks

## 1. Studio standards

- [x] 1.1 Add uniform README, contributor, security, support, and ownership guidance; verify links and design asset license scope.
- [x] 1.2 Add canonical version and changelog metadata for the studio site; verify the shared version validator accepts it.

## 2. Shared pipeline adoption

- [x] 2.1 Add immutable shared workflow callers for human admission, quality, AI review, and draft releases; verify workflow syntax and no PR/push event launches costly jobs.
- [x] 2.2 Apply available GitHub protections and dependency alerts; verify settings by reading the GitHub API.

## 3. Verification

- [x] 3.1 Run design kit checks and studio tests/build, standards checks, and strict OpenSpec validation; record results and remaining release blockers.

- [ ] 3.2 Verify human admission, self approval, stale commits, revocation, failed checks, missing secrets, and release tag refusal in GitHub; record live evidence before declaring public readiness.

### Partial live evidence

- [Adoption PR #1](https://github.com/ejmlabs/ejmlabs/pull/1) reviewed head `fe32db61781b35f1e6dac4dfc1cc6bfc5ccdf48b` merged as `9529e97ce7a48d3edaed5cda9cb3c18c42b6b6e1`. The merged tree matches the reviewed head.
- The current human maintainer posted [readiness](https://github.com/ejmlabs/ejmlabs/pull/1#issuecomment-6258987017) and [approval](https://github.com/ejmlabs/ejmlabs/pull/1#issuecomment-6259196078) for that head. Trusted automation recorded native bot approval, confirming explicit maintainer self approval for this recovery.
- **Quality** and **Repository standards** passed in [run 39194692823](https://github.com/ejmlabs/ejmlabs/actions/runs/39194692823). The old default caller passed `--skip-git-repo-check` twice, so AI review stopped before a model call. A maintainer explicitly approved a one-time exception for **AI review** only. Every other required check and administrator enforcement stayed active. Full protection was restored immediately after merge and exactly matched the saved snapshot. This recovery does not count as two AI reviews of the adoption patch.
- Fresh acceptance of the repaired caller at `5fae851502c2e3c31d4df9a44f8d56c2cb49e098` remains pending under all required gates. Stale-head, revocation, failed-check, missing-secret, and duplicate-release-tag verification also remain pending. Task 3.2 stays open until these live checks pass.

## Workflow follow-up

- Sync completed specs and archive after all tracked work and required verification succeed.
