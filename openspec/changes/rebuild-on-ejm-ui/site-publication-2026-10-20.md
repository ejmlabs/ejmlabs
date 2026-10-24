# Website publication, 2026-10-20

## Published

The owner authorized publication of the redesigned studio and three product
websites. All four final Worker versions serve 100% of their existing production
traffic. No Git push, registry package or native installer was published.

| Website | Content commit |
| --- | --- |
| [ejmlabs.com](https://ejmlabs.com/) | `caa4ec7f23fb80792e7a4afdb5fc4f8a28a86cea` |
| [cli.ejmlabs.com](https://cli.ejmlabs.com/) | `3061ff798b9e35287e09b8516b8c9cb7bee88aaf` |
| [ide.ejmlabs.com](https://ide.ejmlabs.com/) | `c2928803a8a904fa3113e7e95e95d673ff66ce59` |
| [harness.ejmlabs.com](https://harness.ejmlabs.com/) | `6312657cc7302e2e2e082da5fc604bb42e749ed6` |

Every build consumes shared UI `69cbd4f83e816e613d54a09bf012fd8f2b61bf49`,
a focused successor to `2c2ee13e0672f8420e65e27ffa159f6ebaea520d`.
Clean sibling exports and locked web dependencies exclude unrelated native,
governance, design asset and video work. Tracked source proofs cover all 665
studio, 171 CLI, 485 IDE, 252 harness and 1,008 UI files.

## Ownership and fixes

- `ejm-ui` owns the shared SSG router. Links to a fragment on another pathname
  or query now use native document navigation, so server-only guide prose is
  present before the browser seeks its heading. Same-page fragments and ordinary
  client navigation retain their behavior. The five-file commit updates the
  routing regressions, public SSG README and adoption guide. It adds no package
  dependency and raises no byte limit.
- `ejmlabs`, `ejm-cli` and `ejm-ide` own their public copy. Anonymous GitHub HEAD
  requests returned 200 for all five repositories. Obsolete private-source
  warnings were removed; unpublished installer and registry package limits
  remain explicit. All three product contribution-guide destinations returned
  200. No repository visibility setting was changed.
- `ejm-ide` owns its source and download links. The focused predecessor commit
  `883f62c9f13cc3ece9413baadc4eaacede4a136e` corrects six absent source-file
  destinations and labels unfinished release tooling as planned. The canonical
  source-link validator and explicit guide anchors remain unchanged.
- Consumers use public `@ejm/*` exports. No consumer navigation adapter, copied
  shared implementation or dependency from shared UI back to a product was added.

## Checks before publication

Node 24.19.0 and the locked dependencies built every final consumer. Wrangler
4.151.1 passed dry runs for all four existing production configurations.

| Owner | Final checks |
| --- | --- |
| Shared UI | Required `npm run check`: 81 files, 779 tests passed; focused SSG tests 24/24 and SSG types passed |
| Studio | Typecheck, build and 23/23 tests passed |
| CLI | `npm run check`: 94/94 tests, 14 routes and generated headers passed; its unchanged normal commit hook also passed |
| IDE | `site:build`, `site:check`, `site:docs:check` and `site:test` passed |
| Harness | Typecheck, build and all five route budgets passed; 37/39 tests passed, with the same two recorded guide/source-reference failures |

The first shared UI check encountered missing ignored fixture/build outputs and
sandbox restrictions on local servers and Chrome. After preparing the existing
starter and empty fixture directory, the unchanged normal check passed with
local server and browser access. No test or hook was bypassed.

### Existing route budgets

Values below are the build's rounded maximum KB values. JavaScript, CSS and HTML
are gzip measurements; fonts use their existing transfer-size calculation.
Every route passed its unchanged limits.

| Site | JS | CSS | Fonts | HTML | JS / CSS limit |
| --- | ---: | ---: | ---: | ---: | --- |
| Studio | 94.8 | 13.6 | 33.7 | 10.5 | 95 / 14 |
| CLI | 95.0 | 12.9 | 33.7 | 19.3 | 95 / 14 |
| IDE | 100.1 | 15.0 | 33.7 | 15.5 | 110 / 15.5 |
| Harness | 93.3 | 12.6 | 33.7 | 14.1 | 95 / 14 |

All sites retain font and HTML limits of 70 KB and 30 KB respectively.

## Deployment versions

The prior column records the version before this publication session. The final
column includes the shared router fix and corrected public copy. Version readback
confirmed each final version at 100% traffic.

| Worker | Prior version | Final version |
| --- | --- | --- |
| studio | `4ceacd2f-6a64-469d-b223-f884621ac943` | `bb4570c6-a871-4c4b-9a44-ef6758dcdaf1` |
| cli | `573fa036-517c-45e0-bd33-7edccd75fa78` | `048c4c55-9780-4bc6-b003-dabaada98fdb` |
| ide | `2712428f-2c29-4af0-b1ce-33bb25863514` | `13294aad-d858-4194-bf2f-92346f710bc6` |
| harness | `de62beea-34c3-42a1-99fe-fdd3e57d5fa8` | `d0016ec5-0df4-4ca0-889d-64fb60ea70d5` |

## Live verification

| Site | Verified HTML entries | Exact assets | Passed | Requests |
| --- | ---: | ---: | ---: | ---: |
| studio | 7 | 218 | 225/225 | 226 |
| cli | 14 | 33 | 47/47 | 47 |
| ide | 6 | 42 | 48/48 | 49 |
| harness | 5 | 30 | 35/35 | 35 |

All 355 public files passed. The 32 HTML entries include each site's unique
missing-route 404 check. Generated `_headers` files are checked as local inputs;
their CSP, content-type protection and referrer policy are verified on live HTML.
Both studio ZIP downloads and every listed logo, favicon, font, script and style
asset matched the release inventory byte for byte.

Cloudflare inserts a known 834-byte beacon and challenge fragment into HTML.
The verifier accepts only that exact insertion immediately before the original
closing body tag, with strict request-field validation, then requires all other
HTML bytes to match the hashed release file. Raw response hashes, removed bytes,
fields and retry attempts remain in the reports. No production protection or
analytics setting was changed. The checker rejected nine deliberate mutations
before use. Final CLI and harness requests all passed on their first attempt;
studio and IDE each needed one strict retry.

The IDE home Contribution guide link now focuses and visibly shows
`/docs/developer-guide/#contributing` in both the local production build and the
published site. Screenshots record the old landing and the corrected heading.
The published studio homepage was also checked in the browser.

IDE API responses match their pre-deploy values:

- `GET /api/releases`: 200 with schema version 1 and an empty artifact list.
- `GET /downloads/not-a-target`: 404 JSON.
- `POST /api/releases`: 405 JSON, allowing GET and HEAD.

All four canonical domain mappings are unchanged. Workers.dev and preview URL
flags remain false. IDE `ASSETS` and `RELEASES` bindings are unchanged, including
`ejmlabs-ide-releases`; no installer or storage policy was changed. Cloudflare
returned domain mappings in a different list order, so control equality was
confirmed after sorting only that list. Bucket public-access policy was not
queried separately.

## Preservation and remaining work

CLI's three original staged changes retain their exact binary patch SHA256:
`45d8778cbf8832e57526b46ed40cae3100fefb353f5881a0edf972dcf3ba055d`.
The other four primary indexes were empty at verification. UI's 1,013 and IDE's
597 recorded source entries match their snapshots. CLI matches 417 of 418:
concurrent work changed `adaptive-agent-capacity/verification.md`, which was
recorded and preserved. Studio's unrelated README edit and other work remain.
New UI, CLI and IDE commits are durable in their primary object stores and do
not depend on temporary exports.

Harness's two known guide/source-reference failures remain tracked in task
11.2. The clean release source lacks some APIs and tools described by those
guides; uncommitted native work was not imported to make the checks pass. This
publication does not claim those native features are released. IDE metadata
still lists no installers, and registry packages were not published.

Only the verified `ui-package` fragment scenario was synced into the main spec.
All seven main specs and the strict active change validate. The broader change
remains active for its unfinished native, gallery, capture and device work.

## Evidence and cleanup

Evidence is retained in `/private/tmp/ejmlabs-sites-release-53qgq0_1`:

- `release-source-commits.json`, `final-consumer-source-proof.json`,
  `ui-fragment-export-source-match.json` and `final-deployment-versions.json`.
- Four `*-assets.json`, `*-final-deploy.log`, `*-final-dry-run.log` and
  `*-live-check-normalized.json` files, plus final owner and consumer gate logs.
- `ide-api-before.json`, `ide-api-final.json`, `public-source-access.json`,
  `studio-contribution-guide-head-check.json` and browser screenshots.
- `controls-before.json`, `controls-after.json` and
  `final-primary-preservation.json`.

The retained cleanup report records removal of only the five owned temporary
source exports after verification. Logs, inventories, screenshots, commit proofs
and helper scripts remain. The temporary local preview server was stopped.
