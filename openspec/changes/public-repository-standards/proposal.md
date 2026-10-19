# Proposal

## Why

The product repos have diverging release and contribution rules, and the studio has no release pipeline. A shared baseline will make public maintenance predictable without coupling product versions.

## What Changes

- Adopt the shared workflows and standards in `ejmlabs/.github`, pinned to immutable commits.
- Require a human maintainer to admit each exact PR commit before quality checks or AI review can run, with bounded work and no automatic reruns.
- Require a PR, current maintainer approval, resolved conversations, and passing quality, standards, and two Codex review passes before merging.
- Allow a maintainer to approve their own current commit explicitly, without bypassing checks.
- Standardize contributor, security, support, license, documentation, and dependency maintenance guidance.
- Add independent semantic versions, release notes, version consistency checks, immutable tags, checksums, and a manual draft release pipeline.
- Preserve existing work and keep publication, package uploads, deployment, and paid security enrollment separate from setup.
- Add a common standards consumer and quality gate for the design kit and studio site.
- Document ownership of brand assets separately from source code licensing.

## Capabilities

### New Capabilities

- `repository-governance`: Consistent contribution, maintainer review, security checks, and repository policy.
- `semantic-releases`: Independent SemVer releases with checked metadata and reproducible source artifacts.


### Modified Capabilities

None. OpenSpec was initialized for this work and has no existing capability specs.

## Impact

Studio documentation, site metadata, repository settings, workflow callers, and the shared standards integration.
