# Tasks

## 1. Studio standards

- [x] 1.1 Add uniform README, contributor, security, support, and ownership guidance; verify links and design asset license scope.
- [x] 1.2 Add canonical version and changelog metadata for the studio site; verify the shared version validator accepts it.

## 2. Shared pipeline adoption

- [x] 2.1 Add immutable shared workflow callers for human admission, quality, AI review, and draft releases; verify workflow syntax and no PR/push event launches costly jobs.
- [x] 2.2 Apply available GitHub protections and dependency alerts; verify settings by reading the GitHub API.
- [x] 2.3 Refresh the normal product workflow callers to retained shared revision `965cd684713ae91a7804745eddd452cc392af11d`; verify pinned standards and templates, rejection of the shared-only missing-key caller, actionlint, strict OpenSpec, and whitespace without claiming product gates or live acceptance.
- [x] 2.4 Adopt retained shared revision `aa4144fa978d711a5e009b384718b4cf27cf87bf` in both normal callers and use its `scripts/export_review_context.py` to generate canonical old/new source snapshots and a manifest under `.github/review-context/`. Verify its fixed allowlist, combined 750,000-byte cap, exact Git blob metadata, inert file modes, pinned standards and templates, actionlint, strict OpenSpec, whitespace, and admission bounds. Keep snapshots for offline static review only; never import or execute them. Export and verify local Git objects without network or a private token; remove the obsolete pair in a later reviewed rotation. Leave hosted acceptance under task 3.2.

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
- The initial caller refresh at shared revision `965cd684713ae91a7804745eddd452cc392af11d` did not establish complete AI acceptance. The replacement at `aa4144fa978d711a5e009b384718b4cf27cf87bf` needs fresh human admission and live acceptance. Duplicate-release-tag tests and genuine outsider, bot, and nonmaintainer cases remain unverified. Shared guard coverage does not establish refreshed studio or IDE runtime acceptance. Task 3.2 stays open.

### Incomplete caller-review evidence

- [Studio PR #3](https://github.com/ejmlabs/ejmlabs/pull/3) at `662765b7031637bcdc70fb2f414d18e81761cabd` received human readiness and separate approval. [Run 39244751207](https://github.com/ejmlabs/ejmlabs/actions/runs/39244751207) executed the default caller at `dc4d2680dcd308916b2686e310e1ade0d18efb7b`, pinned to shared revision `5fae851502c2e3c31d4df9a44f8d56c2cb49e098`. It did not execute the proposed `965cd684713ae91a7804745eddd452cc392af11d` caller.
- Both actual `gpt-6.1-sol` medium passes returned no findings but explicitly reported incomplete assessment because the archived PR lacked both shared workflow implementations. The old validator accepted the outputs. These success statuses do not satisfy complete review acceptance. The PR was converted to draft and remains unmerged; existing human comments were preserved. A repaired head requires fresh human readiness and approval, complete model results, and every required check. Task 3.2 remains open.

### Local caller refresh evidence

- From baseline `dc4d2680dcd308916b2686e310e1ade0d18efb7b`, both callers match the normal consumer generator at `965cd684713ae91a7804745eddd452cc392af11d`. Standards with that revision's community templates, rejection of its shared-only missing-key caller, actionlint, strict OpenSpec validation, and whitespace checks passed. Only the two callers and this change's design and task records changed. No product gate or live admission ran for this metadata refresh, and no public site content changed.
- The local completion repair now pins both normal callers to retained shared revision `aa4144fa978d711a5e009b384718b4cf27cf87bf`. Its shared exporter produced 32 exact old/new canonical blobs plus the manifest, totaling 582,279 bytes against the combined 750,000-byte limit. Commit, tree, original mode, blob hash, size, SHA-256, file set, and every exported byte match local Git objects; exported files are nonexecutable. Normal templates, pinned community standards, alternate-route rejection, actionlint, strict OpenSpec, whitespace, and projected source and admission bounds passed. Studio's kit/site checks do not scan this root review data. No snapshot was imported or executed, and no network, private token, native/full product gate, CI, or model run was used for preparation. The new guard has not run through the product's default caller. Task 3.2 remains open for fresh human decisions and complete hosted acceptance.

## Workflow follow-up

- Sync completed specs and archive after all tracked work and required verification succeed.
