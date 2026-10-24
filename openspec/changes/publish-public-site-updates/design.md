# Design

## Context

See proposal.md. The primary checkouts contain unrelated dirty work. CLI also
has three pre-existing staged files. Hosted main has newer governance and API
changes. UI uses a separately curated public history; Chess has an empty public
repository and an existing protected private preview. Registry is not deployed.

## Goals / Non-Goals

Produce reviewable committed source and deploy the accepted site artifacts with
clear source identities. Preserve product runtime, stored data, service bindings,
feature gates, access policy and existing release checks.

This release does not publish native installers or SDKs, activate billing or
ranked play, or make a protected preview public.

## Decisions

### Use isolated hosted-main candidates

Take each candidate from fresh hosted main and import only the presentation
prerequisites and fixes it needs. Preserve hosted API and legal metadata. A
dirty-primary push would mix unrelated runtime and bypass current history.
Use scoped commits and keep existing primary indexes intact.

### Release the shared owner first

Reconcile UI in reviewable slices within the existing 200-file and 1 MB review
limits. Preserve newer public exports while adding the missing site contracts.
Build consumers against that exact candidate, then pin the accepted revision.
Never use the primary checkout's private history as a public dependency pin.

Consumer CI selects UI from its protected base. Supply exact install metadata
and the complete changed owner source as inert, hash-bound review fixtures in
bounded prerequisites. Metadata alone does not make component or build changes
readable to review. Accept the owner and those prerequisites before activating
the new consumer pin, then admit the site source against that protected base.
Preserve canonical workflow context and existing review limits.

### Discover the shared UI project

Studio owns the ejm-ui listing and its public gallery, docs and source links.
Reuse the gallery symbol from public token assets and existing shared rows,
branding, disclosures and links. Keep the UI entry separate from the three
recorded agent sessions: link to its component gallery instead of a missing
Try anchor. State that packages are consumed from source and distinguish the
MIT software license from reserved brand assets. No shared API or style change
is needed, and discovery changes remain scoped to Studio.

### Guides describe published contracts

Compare instructions with hosted runtime. Correct current setup or mark pending
behavior as unreleased. Retain recordings and their real provenance without
claiming they prove a current worker run. Preserve useful legacy route targets.

### Publish the existing independent-family contracts first

The user's current rules require this open source family to exclude unrelated
proprietary identity, hosts, defaults and retained records. Public Harness main
still has the previous manifest and registry default, while the owners' completed
`separate-project-scope` changes already define and implement the replacement.
Curate only that isolation delta in a separate Harness prerequisite from accepted
public main. Keep unrelated provider, capacity, credential and platform changes
out of the port. Preserve existing security and regression coverage.

Harness owns `ejm.package.json`, with no legacy alias, removal of the default
registry export, and optional explicit registry selection in `install_source`.
Only registry sources require a client. CLI owns its origin option and errors;
local and third-party sources remain independent. IDE follows the accepted
manifest contract. Keep dependencies directed from hosts to Harness and retain
origin-scoped credentials without migration. No new dependency or service is
needed. Public package and installer availability stays unchanged by this source
publication.

Update package, SDK, registry and public guide fixtures together. Decode and
repack existing archives with maintained standard tools, retain hostile test
cases, and update sizes and hashes. Label any revised historical evidence and
its limits. Do not copy unrelated dirty-primary source or silently rename a
documented contract before its owner exists in accepted public source.

### Repair the native watcher gate from evidence

UI run 39609296553 reproduced no native add event and HTTP 200 after the
existing bounded wait. Increasing the deadline did not solve the failure.
Trace the actual Vite watcher and its initial crawl, reproduce the failure in
the affected backend, and fix fixture lifecycle or shared enforcement in its
owning `ejm-ui` package. Keep real add/change events and HTTP 500/200 recovery
assertions. Preserve test deadlines and production ownership checks. Check the
relevant path before the normal owner gate; request fresh admission for any
new source. Keep the admitted head frozen while its reviews finish.

### Keep retained source outside test discovery

IDE prerequisite #20 exposed that Vitest discovers copied tests under
`review/dependency-sources/`, despite the existing Biome exclusion. IDE owns
this test-runner boundary. Extend Vitest's maintained default exclusions with
that exact directory, preserving application, website and distribution tests.
Keep immutable snapshots byte-identical and do not install their dependencies.
Reproduce the collection failure, verify the corrected discovery list and run
the existing gate. This changes no product API or shared package behavior.

### Keep native deployments bounded

Compare native server source with the deployed revision before a presentation
upload. Do not bundle unrelated server changes as a site release. Preserve
bindings, migrations, stops and access controls. A new registry backend needs
its origin, storage, OAuth and acceptance prerequisites before publication;
the owner selected registry.ejmlabs.com, with ui.ejmlabs.com for the gallery.

### Respect protected review

Push scoped branches and create concrete PRs. Current policy requires human
`/ready FULL_HEAD_SHA` and `/approve FULL_HEAD_SHA` decisions and successful
checks. Do not manufacture those decisions or bypass protection. Prepare all
reviewable work before requesting any remaining human action.

All five repositories require an up-to-date branch and allow squash merges
only. Admit one source part per repository at a time. After its merge, rebase
the next part onto the accepted main, verify retained bytes, then request its
fresh exact-head admission. Independent parts still need this order; parallel
admission cannot preserve their merge eligibility after main advances.

### Repair a failing release prerequisite separately

The Harness gate found RUSTSEC-2026-0382 and RUSTSEC-2026-0383 in the
hosted root lockfile. Check fresh main for an existing correction first. If
needed, prepare a separate lock-only prerequisite for rustls-webpki 0.103.16
and webpki-root-certs 1.0.10, with the smallest required dependency closure.
Keep the Harness owner and its public dependency direction unchanged. Run
the required native and registry gates on that source and record affected
platforms. This fixes TLS trust data and verification, changes no product API,
and does not permit advisory exceptions or relaxed release checks.

## Risks / Trade-offs

- Public and local source differ: preserve hosted contracts and rerun owner and
  consumer checks on the assembled candidate.
- The CLI transfer margin is small: retain the unchanged measured gate and
  visible playback in the measurement.
- Native pages share a backend deployment: compare the server and provider
  state before upload; retain existing closures and private boundaries.
- First-launch targets are missing: prepare source while resolving the owner's
  target choice and real backend credentials; do not serve fixtures as a service.
- Family source contracts differ from local completed work: curate their narrow
  owner and host prerequisites, preserve security regressions and align docs only
  after the matching public source is accepted.

## Migration Plan

1. Record fresh source, Git indexes and current Cloudflare versions.
2. Assemble, check and commit the shared owner and scoped consumers.
3. Create PRs and satisfy their existing protected review gates.
4. Build accepted source with exact dependency pins, publish existing product
   destinations before Studio links, and record new version IDs.
5. Check live routes, guides, assets, downloads, headers and private boundaries.
   Roll back only to a recorded compatible version if recovery is needed.
6. Record undeployed first-launch targets and owner-only actions plainly.
