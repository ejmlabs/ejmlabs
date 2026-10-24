# Autoplay verification, 19 October 2026

## Ownership and implementation

The root try page directly consumes the public `LazyCliShowcase`, `LazyIdeShowcase` and `LazyHarnessShowcase` entries from `@ejm/demos`. It no longer uses the local engagement gate or per-product width adapters. The root home, try, Projects, privacy, navigation and route metadata now use public watch copy. `site/README.md` explains the current example sessions and their limits. The home still has no product slideshow.

The shared UI package owns finite playback, reserved frames, native views, recording fixtures and lifecycle behavior. Its existing generator clock handles streaming and orchestration. No animation package or browser provider connection was added. The shared token generator now exposes its existing native neutral ramp through public `window.css`; colors remain derived from `theme.json`.

CLI records a real local retry fix, three passing tests and a clean diff check. Its fixed grants permit the displayed writes and shell commands. Edi shows reads, search and two automatically reviewed edits, preserves the public wrapper and adds deterministic boundary tests. It explicitly asks the developer to run tests locally. Harness records real offline SDK tool events, one running heavy job with another queued, released reservations and a reopened saved session. Fixture source and provenance live with the shared owner.

## Local checks

Node.js 24.19.0 was used for the site builds and checks.

- Root typecheck and production build pass; all 23 static site tests pass, including useful server output, shared frame composition and passive native content.
- Final shared demos suite: 18 files, 124 tests pass. Shared workspace types and scoped whitespace checks pass.
- Shared honesty gate has zero missing claims. Per-product player size checks pass under 40 KiB gzip: CLI 5.7, IDE 15.1, harness 4.0. Public lazy entry cost is 1.6 KiB above React, under the fixed 14 KiB limit; initial entries include no product views or engines. Bundled product-boundary checks reject foreign scenario and frame data. CLI's generated recording contains 17 updates over 48,700ms, with exact displayed-state and timestamp equivalence to its unchanged source engine, plus pause, reset and completion cleanup coverage.
- Token generation and check pass with 17 outputs current and contrast checks passing. Ten token tests cover existing behavior plus emitted neutral values and light, dark and system parity. The standalone window stylesheet grows by 220 bytes gzip, with no JavaScript or dependency increase.
- CLI consumer check: 97 tests pass. Harness consumer check: 39 tests pass. Both separate route budgets pass.
- IDE website build, site and Worker types, static site checks, all three public guide checks and focused Biome checks pass. Its 25 focused shared IDE tests cover finite playback, review before apply, two diffs, retained API, five deterministic tests, restart and passive tool headers.
- Root and shared design detectors report no findings. Scoped diff whitespace checks pass.

| Site / route | JavaScript | CSS | Fonts | HTML |
| --- | ---: | ---: | ---: | ---: |
| ejmlabs `/try/` | 86.9 | 13.6 | 33.7 | 9.0 |
| CLI home | 86.4 | 13.4 | 33.7 | 9.7 |
| IDE home | 101.3 | 15.2 | 33.7 | 11.7 |
| Harness home | 85.4 | 13.2 | 33.7 | 7.4 |

Sizes are KiB gzip. Limits stay at 95 JavaScript, 14 CSS, 70 fonts and 30 HTML for root, CLI and harness. IDE keeps its existing 110 JavaScript and 15.5 CSS limits. Root try HTML grows from 6.8 to 9.0 KiB to serve complete, useful outcomes before playback loads.

## Browser checks

Before the change, three 939px-wide views had heights of 576, 608 and 208px. The new views measure 939 by 586.875px each at the same desktop viewport, including loaded playback and not-yet-loaded static content. Phones use a common 4:5 viewport; desktop uses 16:10. Native text stays readable; narrow IDE views retain the desktop layout and focus the crop toward Edi.

The initial matrix covered root at 320, 375, 1035 and 1440px in Light and Dark, plus CLI and harness at 375 and 1440px in both themes. One correction batch addressed a passive IDE disclosure that still had button semantics and missing neutral variables in the site token export. The confirmation covered root and IDE at 375 and 1440px in both themes. All measured viewports have no horizontal page overflow. The screenshot scanner counts small disabled native IDE buttons; the active external controls meet the touch target size.

Direct browser readback confirms no-input CLI startup, a manual pause that holds output, clean restart, useful finite CLI completion, useful IDE completion and harness autoplay on arrival. Harness ends with queued-work evidence and recovered history. Focus remains on the chosen playback control or page body. The corrected dark IDE uses text `rgb(227, 229, 220)` on `rgb(28, 33, 29)`, has no passive summary controls or active native buttons, and its message log uses `aria-live="off"`.

Shared lifecycle tests cover offscreen and document-hidden pause, preserved manual pause, dynamic reduced-motion completion, Strict Mode and disposal. The screenshot runner uses reduced motion and shows stable completed results. The mobile performance and publication results follow below when complete.

## Mobile performance

The maintained three-run profile uses a 375 by 812px viewport at device scale 3, CPU slowdown 4, 150ms latency and 209715.2 bytes per second down. The first root try measurement transferred 103.0KiB JavaScript. Splitting product data and pure helper imports reduced that to 96.6KiB, still above the unchanged 95KiB limit. The compiled CLI recording removes the source-file and patch machinery from the browser and one request. The final try measurement passes at 96,392 bytes, or 94.13KiB JavaScript, with median LCP 803.7ms, CLS 0, TBT 0 and no long tasks. With scripts disabled, median LCP is 655.8ms and CLS is 0. The root home also passes at LCP 767.7ms and CLS 0.

The three product home pages pass this same profile. CLI transfers 87.28KiB JavaScript with median LCP 1023.7ms; IDE transfers 102.60KiB with LCP 1175.8ms; harness transfers 86.22KiB with LCP 831.7ms. All have CLS 0, TBT 0 and no long tasks. With scripts disabled, median LCP is 979.8, 1107.7 and 807.8ms respectively. The final IDE and harness builds are byte-identical to their measured builds. CLI's initial graph keeps the same main and static modules and shrinks its home entry slightly; only playback imports change. The final CLI player shrinks by another 2,325 bytes gzip. Existing consumer gates pass after the compiled recording refresh, without a new browser matrix or unrelated runtime suites.

## Frozen publication inputs

The single four-site snapshot is `/private/tmp/ejm-showcase-publication-20261019/release.json`. The freeze helper compared sorted paths, sizes and SHA-256 before and after copying each source, then checked all sources again. No further build will replace these inputs.

| Site | Files | Bytes | Manifest SHA-256 |
| --- | ---: | ---: | --- |
| ejmlabs | 226 | 16,701,511 | `beee4b9ed4e7d1afdfde1e6ab078077c55f5dddf40958ba41029cc0444b51a1b` |
| CLI | 95 | 2,262,762 | `66be4ac10f0f034b536f2f551ce4f990a8967661588bf0da8c01fa2eda161def` |
| IDE | 57 | 2,686,608 | `99763136555098dd30cc35a225ec7d53f9b45f5a2d99736eec3488cd41beb2c3` |
| Harness | 73 | 2,809,541 | `90a426ecc0f823162a369741b9172d4857092d545fba589d01e073ecbfd915c5` |

The IDE Worker config, source and manifest hashes match the preflight receipt. Its existing `ASSETS`, `RELEASES`, API and download routing are retained. Production deployment uses the existing configs and frozen assets, with no build command at publication.

## Verified publication

All four production deployments completed on 19 October 2026. Fresh deployment listings confirm each new version receives 100 percent of traffic.

| Site | Deployment | Version |
| --- | --- | --- |
| ejmlabs | `e86ac804-d7f3-4d01-ae38-11df729b248a` | `ba448630-7563-4b7a-ac0c-6ebe910053e3` |
| CLI | `ecad3f19-f369-408e-bb92-03a1a15f2b9c` | `ba4724b5-3beb-43b2-9122-b45709a903df` |
| IDE | `24d1d2b7-f60c-4d48-b21c-7cfd1c63b3f5` | `e504abad-bcb5-4b88-97dd-3698ae47924a` |
| Harness | `5c1ee1e3-12d8-436e-bb2f-2e25dba3b0a7` | `a5a61229-4bc8-465a-b343-945bb1fdb40e` |

The live verifier passes 162 checks across 28 pages. Titles, canonical links, one h1, rendered text and HTML match the frozen builds. Only the two previously observed Cloudflare edge additions are normalized by an exact pattern. Referenced assets, every lazy JavaScript and CSS file, fonts, images and both public brand downloads match their frozen SHA-256 values. HTTPS redirects, custom 404s, shared security headers and scanner rejection pass. IDE release API data matches the predeploy baseline and invalid download paths still return the expected 404.

The live browser at `https://ejmlabs.com/try/` starts CLI without input. All three frames measure 939 by 586.875px with no page overflow. Pause changes to Resume and retains focus; Restart starts one clean run and retains focus. The final live screenshot shows the page, useful CLI result and Pause/Restart controls: `/Users/everettmorgan/.codex/visualizations/2026/10/19/01a15394-2f26-78c0-81f3-2f1518233fda/showcase-live/try-light-review.png`. The capture has no horizontal overflow. The browser's temporary viewport override was cleared, and its live review tab is retained as a deliverable.

## Evidence

- Root: `/private/tmp/ejmlabs-showcase-{types,build,tests,design}-20261019.log`.
- Shared final checks: `/private/tmp/ejm-showcase-compiled-cli-{tests,types,honesty,size,contract}-20261019.log` and the exact chunk graph `/private/tmp/ejm-showcase-compiled-cli-chunks-20261019.json`.
- Shared size, honesty, lifecycle and token logs: `/private/tmp/ejm-showcase-*20261019.*`.
- Matrix: `/private/tmp/ejmlabs-showcase-matrix-20261019/`, `/private/tmp/ejm-{cli,harness}-showcase-matrix-20261019/` and `/private/tmp/ejm-{ejmlabs,ide}-showcase-confirm-20261019/`.
- Product owners retain their scoped verification records beside this change in their repositories.
- Mobile reports: `/private/tmp/ejm-{ejmlabs,cli,ide,harness}-showcase-perf-20261019.json` and `/private/tmp/ejm-showcase-perf-summary-20261019.log`.
- Final passing root try report: `/private/tmp/ejm-ejmlabs-showcase-recorded-perf-20261019.json`.
- Final consumer checks: `/private/tmp/ejmlabs-showcase-recorded-{build,tests}-20261019.log`, `/private/tmp/ejm-{cli,harness}-showcase-compiled-{check,budget}-20261019.log` and `/private/tmp/ejm-ide-autoplay-final-gates-20261019/compiled/`.
- Production logs and identities: `/private/tmp/ejm-showcase-{ejmlabs,cli,ide,harness}-{deploy-20261019.log,postdeploy-20261019.json}`. Previous production identities remain in the matching predeploy JSON files.
- Live check report: `/private/tmp/ejm-showcase-live-verification-20261019.json`; capture log: `/private/tmp/ejm-showcase-live-screenshot-20261019.log`.

## Scope limits

No product runtime, installer, native capture or repository visibility changes were made. Full Rust and native app suites were not run because this change affects site playback and shared visual contracts. All four checked website builds are published and verified. The owner-selected GitHub links and public-access-coming-soon disclosure remain in place.
