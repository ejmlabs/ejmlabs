# Proposal

## Why

The checked site changes need committed public source and verified publication.
Hosted main has newer work, while the local sites depend on shared source that
has not reached the hosted UI revision.

## What Changes

- Assemble scoped release branches from current hosted main and preserve local
  staged changes, unrelated source and newer public contracts.
- Publish the shared site prerequisites and fixes through bounded reviewable
  commits, then pin consumers to the accepted UI revision.
- Correct guides to describe the runtime available from their published source.
- List ejm-ui on the Studio homepage, Projects page and footer, using existing shared components and the gallery identity.
- Curate the already implemented project-family isolation contracts into separate
  owner and host prerequisites, then align public guides with accepted source.
- Repair the Linux-only UI watcher gate from its recorded failure, preserving
  native file events, design enforcement and existing test deadlines.
- Commit the Studio, product and native presentation changes with their docs.
- Exclude retained dependency snapshots from IDE test discovery while keeping
  all product tests and immutable source bytes intact.
- Use the existing protected review rules, build and transfer budgets, and
  configured Cloudflare targets. Record rollback and deployed source identities.
- Resolve missing targets and backend prerequisites before any first launch of
  the gallery or registry. The owner selected ui.ejmlabs.com and registry.ejmlabs.com.

## Capabilities

No new requirement changes. This is source reconciliation, dependency pinning,
documentation correction and release work for existing presentation and
project-family isolation contracts. The latter were planned and implemented
in the owners' completed `separate-project-scope` changes but remain absent
from protected public source.
The change sets `skip_specs: true`.

## Impact

ejm-ui owns public shared packages, demos, native profiles and site builds.
ejmlabs owns Studio and this coordinated release record. CLI, IDE, Harness and
Chess own their composition and guides. Relay and registry retain their current
auth, transport, storage and policy owners. Dependency direction remains
consumer to shared owner. This change does not authorize a game launch,
feature-gate changes, billing activation, unrelated runtime publication or
replacement of existing security controls.
The separately curated isolation prerequisite may change source package
contracts as already planned; it does not publish native installers or SDKs.
