# Tasks

## 1. Studio standards

- [x] 1.1 Add uniform README, contributor, security, support, and ownership guidance; verify links and design asset license scope.
- [x] 1.2 Add canonical version and changelog metadata for the studio site; verify the shared version validator accepts it.

## 2. Shared pipeline adoption

- [x] 2.1 Add immutable shared workflow callers for human admission, quality, AI review, and draft releases; verify workflow syntax and no PR/push event launches costly jobs.
- [x] 2.2 Apply available GitHub protections and dependency alerts; verify settings by reading the GitHub API.
- [x] 2.3 Refresh the normal product workflow callers to retained shared revision `965cd684713ae91a7804745eddd452cc392af11d`; verify pinned standards and templates, rejection of the shared-only missing-key caller, actionlint, strict OpenSpec, and whitespace without claiming product gates or live acceptance.

## 3. Verification

- [x] 3.1 Run design kit checks and studio tests/build, standards checks, and strict OpenSpec validation; record results and remaining release blockers.

- [ ] 3.2 Verify human admission, self approval, stale commits, revocation, failed checks, missing secrets, and release tag refusal in GitHub; record live evidence before declaring public readiness.

### Partial live evidence

- [Adoption PR #1](https://github.com/ejmlabs/ejmlabs/pull/1) reviewed head `fe32db61781b35f1e6dac4dfc1cc6bfc5ccdf48b` merged as `9529e97ce7a48d3edaed5cda9cb3c18c42b6b6e1`. The merged tree matches the reviewed head.
- The current human maintainer posted [readiness](https://github.com/ejmlabs/ejmlabs/pull/1#issuecomment-6258987017) and [approval](https://github.com/ejmlabs/ejmlabs/pull/1#issuecomment-6259196078) for that head. Trusted automation recorded native bot approval, confirming explicit maintainer self approval for this recovery.
- **Quality** and **Repository standards** passed in [run 39194692823](https://github.com/ejmlabs/ejmlabs/actions/runs/39194692823). The old default caller passed `--skip-git-repo-check` twice, so AI review stopped before a model call. A maintainer explicitly approved a one-time exception for **AI review** only. Every other required check and administrator enforcement stayed active. Full protection was restored immediately after merge and exactly matched the saved snapshot. This recovery does not count as two AI reviews of the adoption patch.
- [Verification PR #2](https://github.com/ejmlabs/ejmlabs/pull/2), reviewed head `4c7d95789c62da13afb4a274245774769e3ae0d8`, merged as `dc4d2680dcd308916b2686e310e1ade0d18efb7b`. The current human maintainer posted [readiness](https://github.com/ejmlabs/ejmlabs/pull/2#issuecomment-6259543046) and [approval](https://github.com/ejmlabs/ejmlabs/pull/2#issuecomment-6259545679). All five required statuses passed, including **AI review**, in [readiness run 39198778017](https://github.com/ejmlabs/ejmlabs/actions/runs/39198778017) and [approval run 39198795943](https://github.com/ejmlabs/ejmlabs/actions/runs/39198795943). This confirms acceptance of the repaired caller at `5fae851502c2e3c31d4df9a44f8d56c2cb49e098`.
- [Harness stale-head run 39233021628](https://github.com/ejmlabs/ejm-harness/actions/runs/39233021628) rejected an old readiness commit before preparation or AI work.
- In shared [fixture PR #12](https://github.com/ejmlabs/.github/pull/12), [Test A run 39240795382](https://github.com/ejmlabs/.github/actions/runs/39240795382) stopped both AI passes at the missing-key guard before Codex execution; AI review was the only unmet merge requirement. [Test B run 39241261759](https://github.com/ejmlabs/.github/actions/runs/39241261759) and [its revoke run 39241394569](https://github.com/ejmlabs/.github/actions/runs/39241394569) verified cancellation of active Quality work, failure of both human gates, native approval dismissal, and no later success restoration. These two fixture runs made zero Codex model calls. The fixture PR was closed without merging.
- The studio caller at refreshed shared revision `965cd684713ae91a7804745eddd452cc392af11d` still needs live acceptance. Duplicate-release-tag tests and genuine outsider, bot, and nonmaintainer cases remain unverified. Shared guard coverage does not establish refreshed studio or IDE runtime acceptance. Task 3.2 stays open.

### Local caller refresh evidence

- From baseline `dc4d2680dcd308916b2686e310e1ade0d18efb7b`, both callers match the normal consumer generator at `965cd684713ae91a7804745eddd452cc392af11d`. Standards with that revision's community templates, rejection of its shared-only missing-key caller, actionlint, strict OpenSpec validation, and whitespace checks passed. Only the two callers and this change's design and task records changed. No product gate or live admission ran for this metadata refresh, and no public site content changed.

## Workflow follow-up

- Sync completed specs and archive after all tracked work and required verification succeed.
