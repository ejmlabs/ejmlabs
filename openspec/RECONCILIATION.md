# PR source reconciliation

Prepared on 2026-10-24 for the request to preserve all outstanding work in this
repository with an OpenSpec handoff. Start with [the handoff](HANDOFF.md).

## Source and base

The original checkout had nine local commits, 33 modified tracked files and
283 untracked files. Its HEAD was
`90f31eeb4dc1b8d813e7a2a824994e25ee97c8f2`. This PR was prepared in an isolated
checkout, leaving that working tree intact.

The PR starts from accepted `main` at
`40fc2852e265aa39bb89b0f9e18b97cb0ab1d68c`. Several local changes had already
landed through other PRs. The final source was reconciled against that base;
the nine old local commits are not added as PR ancestry.

## Included work

| Area | Treatment |
| --- | --- |
| OpenSpec | Retain outstanding proposals, designs, specs, tasks and scoped historical records. Add repository and chess continuation guides. |
| Project rules | Retain current ownership, documentation, package, resource and test rules in contributor and local workflow guidance. |
| Studio | Preserve accepted runtime, UI source pin, dependency lock, public assets, build and tests. Add the package-ownership reference to the site guide and handoff links to the root guide. |
| Brand source | Retain distinct artwork, editing and generator sources, review boards and earlier UI experiments. Label them as frozen history with current public owner links. |
| Launch films | Retain scripts, fixtures, story drafts and scoped capture records. Explain publication revisions and missing media in [the film scope](../launch-videos/PUBLICATION-SCOPE.md). |

Task checkboxes were not completed, reset or archived during PR preparation.
Accepted standards and retirement task records take precedence over stale
local copies. Historical results keep their original verification limits.

## Reconciled and omitted material

- Preserve accepted workflow pins, source-review context and dependency-source
  records. Older local copies do not replace them.
- Preserve upstream removal of obsolete X kit, favicon and preview-script
  copies. Eighteen conflicting old paths were removed from the reconciliation
  checkout rather than restored to the public tree.
- Omit 125 project exports that match accepted public `@ejm/tokens` source
  byte for byte: 31 each for CLI, IDE and Harness, 28 for Relay and four family
  boards. The accepted owner revision is
  `a5551a056b04bc0c3472afc443621a552747613c`. Distinct editing and review sources
  remain here; active consumers use the public owner exports.
- Omit `launch-videos/storyboard-review.jpg`, which contains a private review
  conversation. Keep the clean storyboard source. Normalize personal paths in
  the public capture records, label those copies as revised, and preserve their
  historical hashes and source-identity limits.
- Generalize the private credential reference in the historical chess launch
  record. No credential value is part of this PR.
- Keep ignored builds, dependencies, rendered media, runtime state, private
  provider records and chess source-retention archives outside Git. The private
  recovery note retains their locations and the detailed omission inventory.

The chess runtime belongs to its product repository. This PR includes its
planning and recovery handoff. It does not contain the complete runtime,
provider configuration or private qualification traces.

## Verification boundary

The PR description records the checks run for this source head. Preparation
checks protect source integrity, syntax, links, planning consistency and the
public publication boundary. They do not establish a new capture, native
build, hosted review, deployment, load qualification or public launch.

Studio runtime and dependency contracts match the accepted base, so this
handoff does not require another browser or provider workload. No player-facing
guide or public route changes. Product publication and its live documentation
checks remain in the owning changes.

The protected review process still requires human readiness and approval for
the exact PR head. Opening the draft does not start an authorized paid review
or waive a required gate.
