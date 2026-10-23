# Outstanding work handoff

Checkpoint: 2026-10-22, America/Los_Angeles. This is a draft preservation PR,
not a release candidate. No CI admission, merge, deployment or video render
is requested by opening it.

## Start here

1. Read `AGENTS.md`, `CONTRIBUTING.md` and the owning change below.
2. Run `openspec list --json`, then `openspec status --change NAME --json`
   and `openspec instructions apply --change NAME --json` before implementation.
3. Recheck linked PR heads, required checks and deployed versions. This record
   is a checkpoint, not live state.
4. Split this aggregate draft into coherent reviewable changes before admission.
   Keep the existing file/byte limits and protected checks. Do not admit this
   entire snapshot merely to spend review quota on a handoff.
5. Resolve shared contracts in ejm-ui, then pin and check consumers. Preserve
   accepted governance and dependency pins until their replacement is reviewed.

## What this PR preserves

- Pending Studio copy and shared-link composition, project and contributor docs.
- Project rules and OpenSpec skill guidance, including minimal clear copy,
  package ownership, maintained packages and measured resource costs.
- Active plans, scoped historical records and spec changes for the sites,
  Chess, Relay branding, public repository standards and launch films.
- Launch-film scripts, storyboards, editable capture tooling and fake fixtures.
  Stories remain unapproved. Do not render, capture or post new films yet.

The baseline is accepted Studio main `40fc2852e265aa39bb89b0f9e18b97cb0ab1d68c`.
The source checkout was on `90f31ee`; full identity and every pending path's
SHA-256 and disposition are in [outstanding-files.json](outstanding-files.json).
The primary checkout and index were not changed. This PR adds no sibling source.

Current main already includes the Studio redesign, ejm-ui discovery and wrapping
fix. Those are not new work in this PR. Current workflow pins, UI source pin,
review context and newer governance plans are preserved rather than replaced by
older untracked local copies.

Retired design-kit edits are retained as [retired-kit.patch](retired-kit.patch)
for owner reconciliation, not restored as active UI. Relay assets already have
an owning ejm-ui package and a local archive plan. Do not create a second design
system. Local generated Relay assets and media evidence remain in the original
checkout; the inventory names and hashes them. Ignored recordings, exports,
node_modules and private machine records are not source deliverables.

## OpenSpec map

| Change | State and next action |
| --- | --- |
| `publish-public-site-updates` | Release coordination remains open. Review this handoff, resolve owner prerequisites, then verify each publication and record identities. |
| `rebuild-on-ejm-ui` | Shared design migration has local and merged work. Reconcile unchecked tasks with accepted owner and consumer commits before claiming completion. |
| `add-cloudflare-chess` | Partial implementation. Read its current tasks and verification records; do not infer public launch, ranked play or billing approval. Existing Studio PR #14 overlaps planning. |
| `reconcile-chess-planning-baseline` | Local tasks marked complete. Validate the reconciliation against current Chess source before archive. |
| `create-product-launch-films` | Story approval and new authentic capture remain open. `launch-videos/STORIES.md` is the narrative source. Earlier cuts are rejected drafts. |
| `public-repository-standards` | Preserve the newer accepted-main plan; prior local planning copies are superseded. |
| `raise-visual-bar`, `refresh-project-logos`, `lab-voice` | Older plans retained. Reconcile against the shared design owner and already merged work; do not redo accepted changes. |

Archived change names record prior local decisions, not proof of a current live
release. Do not mark unchecked tasks done or archive release work until its
stated acceptance evidence exists. After verified completion, use
`openspec-sync-specs` for relevant deltas and `openspec-archive-change`.
The release-only `publish-public-site-updates` change skips spec deltas.

## Cross-repository release chain

| Owner | Checkpoint | Next step |
| --- | --- | --- |
| Studio | PR #24 merged at `40fc2852e265aa39bb89b0f9e18b97cb0ab1d68c`; wrapping publication previously verified as Worker version `8d7e00a6-93d6-4db9-a02b-bfc997397a2c` | Preserve one-line project names. Verify fresh live state before claiming it remains current. |
| UI | [#20](https://github.com/ejmlabs/ejm-ui/pull/20), `85100061b9dfc415a54376ff5a33c319bffb2e22` | Fresh run `39858680642` had both reviews fail with quota exceeded and no reports. Quality passed; both review reports are missing. No new retry is authorized. Complete protected gates before merge. |
| Relay / CLI | [#23](https://github.com/ejmlabs/ejm-cli/pull/23), `f9a95d6a68cab1483573f48246a8ec688712521d` | Fresh run `39858637109` failed both reviews with quota exceeded; remaining platform jobs cancelled by its owner. Preserve the concurrent shutdown fix. |
| Capacity / Harness | [#33](https://github.com/ejmlabs/ejm-harness/pull/33), `a02087bb8abcbb5f599ac426e5760141dd68f06b` | Its owner requested fresh admission for repairs. Do not reuse approval for an older head. |
| Capacity / CLI | [#31](https://github.com/ejmlabs/ejm-cli/pull/31), `479d2ba7bf9e3991ee606ae17f751d7b9843c09f` | Source prerequisites and activation need accepted Harness contracts and their own gates. |
| Terminal redesign | CLI OpenSpec `revamp-terminal-workspace`, nine local tasks complete | Still unmerged. Adopt accepted UI renderer and transcript prerequisites, reconcile capacity and Relay, run normal gates, then obtain exact-head admission. |

The Relay owner is the remote-control chat `01a151c3-3e01-7303-8085-b68054b523ac`.
Do not duplicate its admission, migration or deploy actions. Preserve the held
CLI main `78810826cd376588d3303f13bc237309fb5170a8` until its protected merge,
current UI/Harness/workflow pins, closed signups, two-account cap and billing off.
Read-only Cloudflare preflight passed; migration `0003_device_export.sql` remains
pending. No Relay migration, deployment or activation occurred at this checkpoint.

Both review workflows use the GitHub Actions `OPENAI_API_KEY` secret. A restored
chat quota did not prove API quota: four fresh review jobs returned the provider
quota error. Verify the correct API project's quota and obtain a new retry
decision. Never expose credentials or bypass review requirements.

## Terminal integration evidence and remaining defect

The isolated capacity-plus-Relay candidate is at
`/private/tmp/ejm-terminal-workspace-20261022/integration/ejm-cli` on the original
machine. It is uncommitted, not a release artifact, and not included as Studio
source. Its full check passed 199 native, 22 integration and five crypto tests,
Clippy, release compilation, docs and dependency audits. It then failed the
remote-entry SIGTERM PTY case: expected exit 1, got -15. Investigate signal
registration and cancellation in that integration; do not weaken the assertion
or attribute this failure to the unchanged Relay PR. Its recorded Harness pin
also needs the accepted 0.2.0 revision before release.

Local evidence root: `/private/tmp/ejm-terminal-workspace-20261022`.
Durable terminal evidence: the original chat's visualization directory,
`terminal-redesign-evidence/release-integration-status.json`.
These local paths are recovery pointers, not portable proof or public downloads.

## Acceptance checklist for the next owner

- [ ] Review the inventory; move each pending source change through its owning plan.
- [ ] Resolve the Try page demo export and required-source mismatches against the accepted UI pin.
- [ ] Split the aggregate draft to fit existing review limits without inert slices
      that hide changed behavior from reviewers.
- [ ] Run OpenSpec validation, affected site tests, typecheck, build and budgets
      against the exact accepted dependencies. Record actual results below.
- [ ] Resolve the terminal SIGTERM integration failure and Harness pin mismatch.
- [ ] Obtain fresh admission for each changed commit or failed-run retry.
- [ ] Read both complete review reports and pass all protected checks before merge.
- [ ] Build accepted source, publish only authorized targets, and verify URLs,
      assets, headers, deployment identities and rollback versions.
- [ ] Update task checkboxes from evidence, sync applicable specs, then archive.

## Checks for this draft

See `CHECKS.md` beside this file. Historic local tests above do not validate
this aggregate draft or establish a published terminal binary.

The accepted root setup commands are preserved. `pending-readme.patch` retains
the local prose alternative, which referenced retired kit commands. Reconcile
that prose without restoring those commands. The pending Try page also changes
Preview islands to Showcase islands; verify truthful playback notes and the
accepted demo contract before promoting it. This draft exceeds the 1 MB review
bound and must be split before admission.
