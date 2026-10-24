# Release verification

Verified and published on 2026-10-20, America/Los_Angeles.

## Source and deployment identities

All five source commits passed their normal hooks and were integrated into the
primary local `main` branches. Unrelated tracked edits, untracked work and the
CLI's three staged files were preserved. Source history was not pushed.

| Repository | Source commit |
| --- | --- |
| ejm-ui | `7ac2b2d4e3540d0e216a5200b67770c5f6d30aeb` |
| ejmlabs | `824a3a0b48413608f069f3eedd85a6b293f5189b` |
| ejm-cli | `fa172e6b7e750e7581b35d113870ae3cd3c853ec` |
| ejm-ide | `a9997ce2d610b7bc17a6c2d0bb1347afd1aafa7e` |
| ejm-harness | `e0e914d01afcba01bfe83a8b374139e9ed09d60e` |

All four existing Cloudflare Workers deployed successfully. Deployment readback
confirmed each listed version serves 100 percent of traffic. Worker configs,
custom domains and the IDE's release API and R2 binding were retained.

| Site | Worker version | Prior version saved for rollback |
| --- | --- | --- |
| https://ejmlabs.com/ | `2ecab826-078f-4da0-931d-894ca8e73ff7` | `bb4570c6-a871-4c4b-9a44-ef6758dcdaf1` |
| https://cli.ejmlabs.com/ | `db52e8ab-f5bd-4a18-9cac-ba91cf0c649b` | `048c4c55-9780-4bc6-b003-dabaada98fdb` |
| https://ide.ejmlabs.com/ | `23199b62-ea36-460c-a2db-96a982c803e0` | `13294aad-d858-4194-bf2f-92346f710bc6` |
| https://harness.ejmlabs.com/ | `0c1d3608-29c2-4ab3-84ad-795a1d585f54` | `d0016ec5-0df4-4ca0-889d-64fb60ea70d5` |

## Checks before publication

Clean sibling worktrees contained only the selected release source. Installed
third-party dependencies were reused only after matching locked versions. All
public `@ejm/*` exports resolved to the release UI checkout. Consumer lock changes
only completed linked site-package metadata; no packages were upgraded.

The shared UI check passed 819 tests in 84 files, types, source rules, 298 local
assets, generated outputs, 29-state web/Ink/Rust parity, tree shaking and CSS
checks. A focused clean-fixture run passed 38 tests in three files; these overlap
the full suite. The design guard passed 32 tests. CLI and Harness also passed
their required native commit gates without bypasses.

| Site | Checks | Built routes | Maximum gzip KiB: JS / CSS / fonts / HTML |
| --- | --- | --- | --- |
| Studio | Types, build, 23 tests, budget | 7 | 92.2 / 13.5 / 33.7 / 10.5 |
| CLI | Site check, build, 94 tests, budget | 14 | 94.7 / 13.0 / 33.7 / 19.9 |
| Harness | Site check, build, 39 tests, guide format, budget | 5 | 92.8 / 12.7 / 33.7 / 13.2 |
| IDE | Build, types, route checks, three docs checks, budget | 6 | 100.5 / 15.2 / 33.7 / 16.0 |

Existing JS/CSS/fonts/HTML limits stayed at 95/14/70/30 KiB for Studio, CLI and
Harness, and 110/15.5/70/30 KiB for IDE. All four upload dry runs passed with
unchanged configs. The integration helper passed seven preservation fixtures.

## Documentation

Shared docs cover the fixed design recipes, source guard and playback contracts.
Harness guides now describe the selected release's exported providers, worker
discovery, Unix credential file permissions and executor limits. Unsupported
vault, provider, packaging and Windows claims and absent repository links were
removed. Existing anchors, SDK examples and claim checks were retained. Test
bootstrap and Chrome cleanup fixes do not change a public product contract.

## Live verification

All four home pages, the three product documentation indexes, Studio About and
all four missing-page recovery screens loaded in the normal browser. Headers
displayed the matching product marks. Desktop document width stayed at 1035 px.

The live IDE playback completed and restarted on desktop and phone layouts.
The desktop demo's client and scroll heights both stayed at 587 px. Editor
scrolling moved from 0 to 634 px, and chat from 0 to 1407 px, with outer scroll
top at zero. At 375 px document width, the demo's client and scroll heights both
stayed at 429 px after completion and restart. Its inner workspace retained an
800 px scroll width inside 343 px; keyboard navigation moved it horizontally
without adding document overflow or vertical blank space.

The raw HTTP verifier remains partial: 123 static responses matched the built
bytes, MIME types and expected security/cache headers. IDE release API GET and
HEAD checks passed. Another 37 requests received Cloudflare 403 challenge HTML:
28 HTML routes, four missing routes, four manifests and one unknown API route.
Every nonchallenged response passed. Challenged HTML, manifest and 404 hashes
remain unverified. Browser route checks provide separate rendering evidence;
they do not replace an exact byte comparison. No challenge was bypassed and no
security setting was weakened. All four build inventories stayed unchanged.

## Evidence and limits

Local evidence root: `/private/tmp/ejm-publish-20261020-fyom1gms`.

- Source commits and preservation: `commits/summary.json` and
  `integration-<repo>.json`.
- Build checks and budgets: `consumer-checks/` and
  `ui-release-check-green.log`.
- Current production versions: `production-after/deployment-summary.json`.
- HTTP results: `production-after/20261021T015859543561Z/verification.json`.
- Browser metrics and screenshots: `production-after/browser/`.
- Prior versions and rollback commands: `production-before/`.

This release publishes websites. It does not publish source history, packages
or native installers. Checks ran on macOS. The public IDE release list was
reachable and contained no installers; no release artifact was downloaded.
Remote analytics, unused brand archive contents and worldwide edge behavior
were outside the HTTP proof. The earlier design and scrolling changes already
synced their specifications. This publication change has no specification delta.
