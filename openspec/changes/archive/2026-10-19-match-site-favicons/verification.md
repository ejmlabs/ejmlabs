# Verification

Verified and published on 2026-10-19.

## Ownership and result

- `ejm-ui` owns canonical studio icon generation and shared content-versioned delivery. The studio symbol paths are unchanged. All four families now use Ink on Sage. CLI, IDE and harness artwork remains unchanged.
- `ejmlabs` consumes public `@ejm/tokens/assets/favicon/*` exports for retained public URLs and the brand ZIP. Its nine retained working files match those exports. Public download guidance and build documentation are current.
- All sites consume `@ejm/site/vite`; no private sibling implementation was imported. No dependency, browser script, stylesheet, application icon or Worker behavior was added by the favicon fix.

## Owner checks

- Shared owner: 13 tests across three files, workspace TypeScript and scoped diff checks pass. All 298 assets match provenance and retained sources. All 96 protected product/logo files are unchanged. The 24 PNGs match SVG pixels, and 12 ICO frames match their PNGs. Regenerating the nine studio files produces identical bytes.
- Studio: build, all 23 site tests, type check and every route budget pass. The existing public archive test now compares the nine icon files with canonical public exports.
- CLI: build, types, static/head/header/docs gates, 97 tests and route budgets pass. All 18 JS/CSS files, 14 rendered bodies and eight icon images remain byte-identical.
- IDE: build, type, static/docs and budget gates pass. All 14 JS/CSS assets, six bodies, 28 canonical brand files, consumer source and distribution runtime/config remain unchanged. Only heads and the emitted manifest changed.
- Harness: build, types, static/head/header/docs gates, 39 tests and route budgets pass. All ten JS/CSS files, five rendered bodies and eight icon images remain byte-identical.
- All heads declare the ICO's actual 16, 32 and 48 px sizes. Existing direct root icon paths still work; both manifest install-icon references use the family content version.

## Studio playback adoption

The studio's prior published build predates the already verified shared compiled playback optimization. The checked rebuild adopts that existing work without changing any demo source during this favicon task. All seven studio page bodies and all stylesheet bytes remain identical.

The complete studio JavaScript output decreases from 392,107 to 389,073 raw bytes and from 131,591 to 128,667 gzip bytes, measured with Python gzip at a fixed timestamp. This is an asset-size comparison, not a new browser performance measurement. Existing route budgets pass without changes. Prior recording parity covers exact visible updates and timestamps, lifecycle controls and disposal; the prior full shared suite passed 127 tests. No full mobile performance rerun was needed for the icon-only product builds.

## Publication

The four checked asset trees were frozen with file sizes and SHA256 manifests at `/private/tmp/ejm-favicon-publication-20261019/release.json`. Existing Worker configurations were retained. IDE's Worker, manifest, routing and R2 binding hashes remain unchanged.

| Site | Icon content version | Deployment | Worker version |
| --- | --- | --- | --- |
| ejmlabs | `6b911c21380c` | `4290a449-0b9b-41d6-8fc3-248983410bfe` | `4ceacd2f-6a64-469d-b223-f884621ac943` |
| CLI | `8756304753c5` | `3fd2d9d9-3366-44a4-963a-1113bae2ee1e` | `573fa036-517c-45e0-bd33-7edccd75fa78` |
| IDE | `684a359f2507` | `179cfa75-7eba-42a1-8262-1ac649b52c3f` | `4e8061c3-565a-4310-926c-2d6e590c31d1` |
| Harness | `aa9104b1d43a` | `e7739897-bdf2-46f8-85cf-ef18039c8b7f` | `de62beea-34c3-42a1-99fe-fdd3e57d5fa8` |

Each deployment is at 100 percent. All 191 live checks pass across 28 pages, with exact checked icon and asset bytes, versioned and fallback icon paths, public ZIPs, HTTPS, 404 behavior and security headers. Only the previously observed narrow Cloudflare HTML additions are normalized. IDE's release API matches its fresh pre-publication baseline, and invalid download routes still return JSON 404 responses.

The live browser confirms CLI's refreshed icon head and running player, and the studio Try page's refreshed icon head, three existing examples and no horizontal overflow. The saved visual proof shows the four live SVG icons at 16, 32 and 48 px on light and dark surfaces. Already open browser tabs may need a reload to refresh their cached icon choice.

## Evidence

- `/private/tmp/ejm-favicon-site-tests-20261019.log`
- `/private/tmp/ejm-favicon-assets-check-20261019.json`
- `/private/tmp/ejm-favicon-reproducibility-20261019.json`
- `/private/tmp/ejm-favicon-head-versions-20261019.json`
- `/private/tmp/ejmlabs-favicon-kit-sync-20261019.json`
- `/private/tmp/ejmlabs-favicon-{build,tests,types,budget}-20261019.log`
- `/private/tmp/ejmlabs-favicon-consumer-after-20261019.json`
- `/private/tmp/ejm-cli-favicon-adoption-equivalence-20261019.json`
- `/private/tmp/ejm-harness-favicon-adoption-equivalence-20261019.json`
- `/private/tmp/ejm-favicon-ide-20261019/comparison.json`
- `/private/tmp/ejm-showcase-compiled-ide-contract-20261019.log`
- `/private/tmp/ejm-showcase-compiled-ide-tests-20261019.log`
- `/private/tmp/ejm-favicon-deployment-receipts-20261019.json`
- `/private/tmp/ejm-favicon-live-verification-20261019.json`
- `/Users/everettmorgan/.codex/visualizations/2026/10/19/01a15394-2f26-78c0-81f3-2f1518233fda/favicons-live/index-light-proof.png`

No unrelated active OpenSpec change is completed by this release. No commits or pushes were made.
