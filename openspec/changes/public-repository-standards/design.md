# Design

## Context

At the start of this audit, the projects were private and main had no branch protection. Product workflows ran on every PR with failing remote runs, and the two hosts required a sibling harness checkout. All products currently use version 0.1.0. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:** Share maintenance policy and trusted automation, keep each product independently versioned, and require a human to admit and approve the exact PR head.

**Non-Goals:** Publishing product releases, package uploads, installer signing, deployment, history rewrites, and buying private-repository security products during setup.

## Decisions

1. Use the user-selected ejmlabs/.github repository for reusable workflows, executable standards, templates, and runbooks. Consumers pin a reviewed full SHA. Product checks keep their established gate commands.
2. Use trusted default-branch issue-comment or manual dispatch entry points. A human maintainer issues `/ready <full-head-sha>` before quality or AI runs. New commits have no inherited readiness. Outsider and bot events do not launch jobs. Restrict GitHub fork workflows to approval by all external contributors and keep untrusted jobs read-only.
3. Keep readiness separate from `/approve <full-head-sha>`. The latter requires a current human maintainer and records native bot approval for self review where GitHub forbids native author approval. Main requires at least one native approval and the maintainer gate, plus required checks, resolved discussions, linear history, and no force pushes or deletion. Administrators do not bypass the merge requirements.
4. Run exactly two independent Codex passes using `gpt-6.1-sol` with medium reasoning, trusted prompts and configuration, read-only permissions, no PR build or test execution, and isolated model credentials. Post results in a separate job. Missing credentials or invalid output fail closed. Bound the diff, output, time, and concurrent runs. Check replayed admission identifiers before spending budget.
5. Keep a root VERSION and CHANGELOG.md in each product. Validate all releasable package versions. A common manual pipeline accepts an exact checked main commit and matching version, refuses existing tags, and creates only a draft release with source archives, checksums, and provenance. Document native binary and registry publication gates explicitly.
6. Keep licenses and brand notices distinct. Preserve each product's MIT license and bundled font licenses; include license text in SDK packages. The studio's design assets retain their existing ownership terms.
7. Enable available free repository protections and dependency alerts now. Do not enroll private repos into billed secret protection. Record the required public-only activation checks before any visibility change.

## Risks / Trade-offs

- Shared workflow changes affect several products. Immutable caller pins and reviewed update PRs bound rollout.
- Human readiness costs a small metadata action and can delay outside contributions. The expensive checks remain unavailable until deliberate admission.
- CLI and IDE consume pinned sibling harness revisions. The 2026-10-18 plan recorded the owner's decision to wait for a public harness and use no private cross-repository token. IDE hosted checks remain blocked under that policy. CLI's current dependency access belongs to its separate credential task. This refresh changes no consumer harness pin or credential and grants no dependency access. Later pin updates need review and hosted acceptance through the owning task.
- API review needs a scoped OPENAI_API_KEY and provider budget settings. Setup does not prove a successful paid review.
- Local disk space is constrained. Coordinate Cargo checks, use focused existing caches, and report missing full platform evidence honestly.
- Source and history scans reduce known risk; partial scan coverage and platform-specific tests remain explicit.

## Migration Plan

Create and test the shared repository first. Add pinned consumers and version metadata, then apply and read back repository settings. Run the project gates and first admitted PR through the new pipeline when the required credentials are present. Keep repositories private until blockers are resolved. Roll back a bad workflow update by restoring the previous immutable caller pin.

## Studio adapter

The studio quality profile runs the design kit freshness checks and site tests/build. Keep brand kit archives generated through the existing build, and do not relicense the studio's visual assets by adding a broad source license.

## Shared workflow refresh

The initial local refresh generated both normal product callers from shared revision
`965cd684713ae91a7804745eddd452cc392af11d`, retained under its protected
`workflow-pins/965cd684713ae91a7804745eddd452cc392af11d` reference. This adopts
the shared SemVer prerelease validation and explicit removal of `GITHUB_TOKEN`
from the Codex reviewer environment. Preserve human admission, maintainer
approval, all required checks, and two medium Codex passes. The missing-model-key
test caller remains exclusive to the shared standards repository.

This change updates workflow metadata and its verification record. It changes no
studio product behavior or public site content. Check the exact pinned standards
and community templates, caller syntax, strict OpenSpec validation, and
whitespace. Product gates and live acceptance are separate evidence; this local
refresh does not repeat or claim them.

## Completion guard and review source context

The admitted review of [studio PR #3](https://github.com/ejmlabs/ejmlabs/pull/3)
at `662765b7031637bcdc70fb2f414d18e81761cabd` ran through
[run 39244751207](https://github.com/ejmlabs/ejmlabs/actions/runs/39244751207).
Its trusted default caller came from
`dc4d2680dcd308916b2686e310e1ade0d18efb7b` and executed shared revision
`5fae851502c2e3c31d4df9a44f8d56c2cb49e098`. The proposed
`965cd684713ae91a7804745eddd452cc392af11d` caller did not run. Both model
summaries reported incomplete reviews because the archive lacked the old and
new shared workflow implementations. The old validator accepted those outputs,
so their success statuses do not establish complete AI acceptance. The PR was
converted to draft before the source-context repair below. Its original human
comments were preserved and did not admit the changed head.

Both normal callers in the merged repair select retained shared revision
`aa4144fa978d711a5e009b384718b4cf27cf87bf`. The shared schema requires
a boolean `complete`; it permits `false` so a reviewer can report a limit. The
trusted validator accepts only `complete: true` and rejects a missing, false, or
nonboolean value. Keep exact admitted-head and pass validation, two serial
`gpt-6.1-sol` medium passes, and all merge protections. Do not add a product
alternate route or treat the incomplete reviews as acceptance.

`ejmlabs/.github` owns `scripts/export_review_context.py`, the shared generator
for this source context. Export exact canonical Git blobs for the old and new
shared revisions into `.github/review-context/<oldsha>/` and
`.github/review-context/<newsha>/`, with the exporter manifest. Use its fixed
allowlist and enforce the combined 750,000-byte cap before writing. Verify the
manifest's commit, tree, file mode, blob hash, and size against the canonical
local Git objects. The exporter needs no network or private token. These
nonexecutable snapshots are data for offline static review only; never import
or execute them. Generate them only through the shared exporter, and remove the
obsolete pair during a later reviewed pin rotation.

The studio has no broad root Ruff or Prettier scan. Its existing checks stay
within the design kit and `site` directory, so these snapshots need no formatter
exclusion. No inspected product check imports or executes the snapshots.

The shared repository owns the guard, exporter, and consumer templates. The
studio owns its normal pinned callers and review data; no runtime dependency
points from the shared repository back into a product. This repair changes no
product runtime, dependency, lockfile, site, or public API. It enforces the
existing governance requirement that incomplete reviews block merging. Product
guidance needs no public site change, and no publication is claimed. Verify exact
snapshots, pinned
standards and templates, actionlint, strict OpenSpec validation, and whitespace.
Local preparation exported 32 exact source blobs and a 9,067-byte manifest,
totaling 582,279 bytes. Canonical blob and manifest equality, inert file modes,
normal template and community standards, alternate-route rejection, actionlint,
strict OpenSpec, whitespace, and projected admission bounds passed. No native
or full product gate was repeated for these workflow and review-data changes.
Preparation started no CI or model run. The later owner-admitted evidence below
does not close task 3.2. Do not sync, archive, or declare public readiness yet.

## Installed completion guard acceptance

[Studio PR #3](https://github.com/ejmlabs/ejmlabs/pull/3) at repaired head
`fdfbf0203d348e37750bc14eae12cd4d3d434b08` received fresh human
[readiness](https://github.com/ejmlabs/ejmlabs/pull/3#issuecomment-6269402303)
and separate [approval](https://github.com/ejmlabs/ejmlabs/pull/3#issuecomment-6269427080).
[Run 39267660933](https://github.com/ejmlabs/ejmlabs/actions/runs/39267660933)
passed all five required checks. Both actual `gpt-6.1-sol` medium passes
explicitly completed the scoped review, including both supplied workflow
implementations, with no findings. Their artifact digests were verified.

The PR merged normally, without an exception, as
`a1b3fa068b7147410d0f72217d522b47ecd36759`. The merged tree
`acc81ea509770f973c083b27cc35b16d300c3079` equals the reviewed tree. Current
human decisions and native approval were verified before merging, and full
branch protection was unchanged afterward.

That run still used the trusted base caller at shared revision
`5fae851502c2e3c31d4df9a44f8d56c2cb49e098`. The merge installed
`aa4144fa978d711a5e009b384718b4cf27cf87bf` on studio main; it did not execute
that revision's completion guard. A new source head needs fresh human readiness
and separate approval, two actual complete medium reviews whose results contain
`complete: true`, and all five required checks through the installed caller.
This documentation change prepares that acceptance run without changing the
caller, static source context, or product behavior. It starts no CI or model run.

These notes have no public site content or runtime API impact. No site publication
is claimed. Keep provider spending caps and GitHub budgets, genuine outsider,
bot and nonmaintainer tests, IDE limits, and the separately authorized first
release and existing-tag refusal acceptance open. Task 3.2 remains unchecked.
