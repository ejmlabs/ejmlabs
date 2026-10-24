# Contributing

Start with the [README](README.md), [project rules](AGENTS.md), and [development guide](site/README.md). Use small PRs, clear titles, and checks matched to the actual risk. Follow the existing formatting, architecture, and accessibility rules. If `openspec/` exists, plan and apply feature or bug fixes through OpenSpec, then sync and archive completed changes.

## Human admission and review

Opening or updating a PR does not authorize CI or AI spending. A current human maintainer with GitHub **maintain** or **admin** permission posts `/ready FULL_HEAD_SHA` as a standalone PR comment after checking the scope and proposed workflow changes. Use the full current 40-character commit SHA. Draft PRs cannot be admitted. A new commit needs a new decision. Check limits and run time are bounded; repeated events do not authorize another review.

After reviewing that commit, a maintainer posts `/approve FULL_HEAD_SHA`. Maintainers may explicitly approve their own work. GitHub cannot record an author's native approval, so trusted automation records the human comment as a bot approval and a required **Maintainer approval** status. The comment and all checks remain required. Native review alone does not replace this explicit gate. Keep both readiness and approval comments unchanged. Editing or deleting one revokes the decisions. `/revoke FULL_HEAD_SHA` cancels the admitted run and blocks merge. To retry a failed run, revoke, investigate, and post a fresh ready comment. Do not use Actions rerun to replay an admission.

The required statuses are **Human readiness**, **Maintainer approval**, **Quality**, **Repository standards**, and **AI review**. AI review uses `gpt-6.1-sol`, medium reasoning, in two independent passes. A missing key, incomplete output, or blocking finding fails the gate. Address findings in a new commit and request fresh admission. Do not bypass the requirements as an administrator.

## Package ownership

Follow the [package boundaries](AGENTS.md#package-boundaries) before choosing
where to change behavior. `ejm-harness` owns shared execution, provider/auth
mechanics, tools, persistence, and package runtime. `ejm-cli` and `ejm-ide` own
their product interfaces and host adapters. `ejm-ui` owns shared tokens,
components, site infrastructure, demos, and capture tooling. This repository
owns studio content, discovery, brand guidance, and download assembly.

Use public package contracts and keep dependencies acyclic. Fix shared behavior
in the owner, then adapt consumers; do not import sibling internals or copy a
shared implementation. A temporary adapter must name the missing contract,
upstream owner, compatibility checks, and removal condition. Plans and reviews
must state the affected owners, public interfaces, dependency direction, and
downstream impact. Follow each affected repository's rules, coordinate within
the authorized scope, and report the owner/consumer checks and any known gaps.

## Public documentation

Review the public docs site with every change. Update all affected pages in the same change, with enough detail for users and contributors to use, operate, and extend the current product. Cover relevant setup, configuration, workflows, APIs, examples, errors, limits, and recovery. If no public docs are affected, record the reason in the change summary.

Each product repository owns its user and developer guides, navigation, build, and checks. This repository owns the guide destinations and project facts in `site/src/content.ts`, page composition in `site/src/pages/`, and routes in `site/src/site.tsx`. Shared documentation components and site tooling live in `ejm-ui`; `design-kit/web/DOCS.md` is retained guidance for the earlier kit. Follow the source routing and commands in the [site guide](site/README.md#keep-docs-current-after-each-change), update navigation and references, and regenerate derived content through the existing build.

Distinguish planned, implemented, tested, and released behavior. State verification, availability, security, and performance limits plainly. Run the affected docs checks and include the pages in the normal review and release process. Report source updates and local results separately from publication. Claim the live site is current only after verifying publication and the affected public pages. Publish and verify new product guide routes before publishing ejmlabs site links to them.

## Changes and reporting

Keep documentation and `CHANGELOG.md` current. Update all release metadata together when changing `VERSION`; see [releases](RELEASING.md). Never add keys, tokens, personal data, local logs, or private customer files. Use fake fixtures. Report vulnerabilities through [Security](SECURITY.md), and follow the [Code of Conduct](CODE_OF_CONDUCT.md).
