# Outstanding work handoff

Status recorded on 2026-10-24 for the PR that preserves outstanding Studio
source and OpenSpec work. This file is a continuation guide. It does not
change a proposal, task, release policy or approval.

## Start here

1. Read [project rules](../AGENTS.md) and choose the repository that owns the
   next change before editing.
2. Read the selected change's proposal, design, delta specs and tasks. Run
   `openspec list --json`, `openspec status --change <name> --json` and
   `openspec instructions apply --change <name> --json` from this repository.
3. Use the OpenSpec workflow for implementation. Revise approved scope through
   `openspec-update-change` when needed. Keep unfinished tasks unchecked.
4. Read the [chess handoff](changes/add-cloudflare-chess/HANDOFF.md) before
   restoring chess source or resuming launch work.
5. Read [source reconciliation](RECONCILIATION.md) for included work, preserved
   upstream changes, omissions and the public publication boundary.

The original working-tree audit had nine active changes. Source reconciliation
also preserves accepted-base work and its evidence. The table records the
2026-10-24 handoff snapshot after those choices. Current task files and fresh
CLI output are authoritative if progress changes. Counts describe checked
tasks, not deployment or public availability.

## Change inventory

| Change and task record | Checked | Remaining work |
| --- | ---: | --- |
| [add-cloudflare-chess](changes/add-cloudflare-chess/tasks.md) | 58/71 | Ranked proof and recovery, full tournament capacity run, remaining player checks, publication and discovery. See its handoff. |
| [publish-public-site-updates](changes/publish-public-site-updates/tasks.md) | 6/13 | Owner and consumer checks, accepted dependency pins, scoped PRs, publication and live verification. |
| [reconcile-chess-planning-baseline](changes/reconcile-chess-planning-baseline/tasks.md) | 4/4 | Review completed prerequisite evidence before sync and archive. No chess release is proved. |
| [rebuild-on-ejm-ui](changes/rebuild-on-ejm-ui/tasks.md) | 65/81 | Consumer adoption, gallery and device checks, captures, demos, transitions, old-kit removal and docs. |
| [create-product-launch-films](changes/create-product-launch-films/tasks.md) | 6/11 | Obtain story approval, capture approved workflows, edit and render films, then complete provenance. |
| [lab-voice](changes/lab-voice/tasks.md) | 5/5 | Review completed scope before sync and archive. |
| [refresh-project-logos](changes/refresh-project-logos/tasks.md) | 7/9 | Consumer acknowledgements and verification of the UI move manifest. |
| [raise-visual-bar](changes/raise-visual-bar/tasks.md) | 16/40 | Finish or explicitly reconcile remaining visual work. No recorded decision supersedes this change. |
| [public-repository-standards](changes/public-repository-standards/tasks.md) | 7/8 | Task 3.2: remaining hosted admission, review and release-refusal cases. Accepted source evidence replaces the stale unchecked working-tree copy. |
| [retire-kits-and-internal-briefs](changes/retire-kits-and-internal-briefs/tasks.md) | 18/21 | Tasks 4.1 to 4.3: public UI adoption, remaining live-kit retirement, browser and publication evidence. Preserved from accepted base. |

Neither all checked tasks nor a successful PR build alone closes a change.
Review required evidence, sync verified delta specs, then archive completed
scope through the matching skills. Incomplete changes remain active.

## Owners and dependencies

| Owner | Work to keep there |
| --- | --- |
| `ejmlabs` | Studio content, discovery, public download assembly and this planning record. |
| `ejm-ui` | Public `@ejm/*` components, tokens, themes, assets, registry, site infrastructure and shared checks. |
| `ejm-harness` | Shared runtime, auth mechanics, tool execution, persistence and package contracts. |
| `ejm-cli` and `ejm-ide` | Their host adapters, native interaction, product sites, guides and release artifacts. |
| `ejm-chess` | Chess runtime, rules, accounts, ratings, tournaments, product guides and deployment. Its retained source is outside this repository. |

Products consume public owner exports. Keep rules and runtime state out of
shared UI. A local source copy or `file:` dependency is not an accepted
protected source pin. This PR does not substitute for owner PRs, native
releases or backend activation.

Read [publication preparation](changes/publish-public-site-updates/preparation.md)
for recorded source candidates, PR links and dependency order. Those identities
and checks are dated evidence. Recheck current heads and accepted bases before
using them. The recorded order is:

1. Accept the Harness family prerequisite and the shared UI owner stack through
   the required reviews and exact-commit human decisions.
2. Refresh consumer bootstrap stacks and source fixtures for the accepted
   owner. Retarget stacked PRs after each merge.
3. Accept protected consumer pins, then admit each site source change against
   that dependency.
4. Build accepted source, publish each authorized target, and record deployment
   identities plus live route, guide, asset, download and header checks.

Gallery, registry, Relay and chess have distinct backend and first-launch
requirements. A presentation PR does not establish any service's availability.
Preserve their private boundaries and existing workflow protections.

## Evidence and source recovery

Treat these as separate states:

| State | What establishes it |
| --- | --- |
| Preserved | A source snapshot or archive with checked inventory and hashes. |
| Locally verified | Named checks against the recorded source and environment. |
| Accepted | Required reviews and checks for the exact source head. |
| Deployed | Provider receipt and readback of the deployed revision. |
| Public | Successful access and product-flow checks on the canonical host. |

Historical results remain useful when their contracts are unchanged. Do not
repeat completed drills without a concrete remaining risk. Do not promote a
historical result into a claim about a later source revision.

The PR preparation has a private recovery note outside the public tree. It
records retained source locations and private evidence. Keep credentials,
private destinations, provider configuration, raw journals and runtime state
out of the public PR. Chess archive hashes and recovery limits are recorded in
the [chess handoff](changes/add-cloudflare-chess/HANDOFF.md#retained-source).

## Next actions

1. Review the PR's reconciliation and check summary. Preserve accepted-base
   evidence and unrelated outstanding work.
2. Choose one owner-scoped change from the table. Refresh its apply instructions
   and act on the current task file.
3. For chess, restore retained source before any new build or execution. Old
   qualification jobs and schedules must stay closed.
4. For publication, refresh source identities and follow the recorded dependency
   order. Keep publication tasks open until live checks pass.
5. Sync and archive only verified completed scope. Record all unrun checks and
   remaining decisions in the owning change.

These handoff documents change no public runtime or player-facing guidance.
Product documentation and publication work remain with the tasks above. No
live-site update is claimed by this handoff.
