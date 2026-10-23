# Chess and Relay design verification

Date: 2026-10-20, America/Los_Angeles. Some evidence timestamps use the next UTC date.

## Result and scope

Chess and Relay now use the current public ejm-ui design contracts. Chess has an original two-ribbon knight mark drawn in the same geometric language as the existing project family. Header, theme, browser favicon and social artwork come from one shared source.

This is verified local work. No commit, push, package publication or deployment was performed for this change. Chess's private-launch and public-play notices remain in place. Existing product launch plans and qualification gates remain separate.

## Owners and public contracts

| Owner | Work | Dependency direction |
| --- | --- | --- |
| ejm-ui | Chess leaf controls, fixed application/game composition, native HTML profile and guard, artwork, public exports, docs and source profiles | Shared packages do not import product source |
| ejm-chess | Product content, game/account state, event handlers and semantic composition through public exports | Chess consumes declared file packages from primary ejm-ui |
| ejm-cli/relay | Worker page templates and controller shell consume the shared native profile | Relay consumes public @ejm/site/native and @ejm/ui/static.css |
| ejmlabs | This coordinated OpenSpec plan, delta and verification record | No application implementation copied into Studio |

The active Chess checkout is `/private/tmp/ejm-chess-2yz1VsKp/ejm-chess`. Its five declared local UI package dependencies resolve to `/Users/everettmorgan/Desktop/ejm-ui`. Absolute file paths are local checkout wiring; the public developer guide explains ordinary sibling-checkout setup. The old isolated `/private/tmp/ejm-chess-2yz1VsKp/ejm-ui` tree is unchanged.

### Shared changes

- Ported the public Chessboard, GameClock, radio group, disclosure and table contracts into primary ejm-ui. Chessboard uses the maintained cm-chessboard package; notices and assets are included.
- Added fixed AppFlow, AppGroup, AppActions, AppHeading, AppField, AppFieldset, AppForm, AppSection and AppPre contracts. Native attributes, events and refs remain available. Visual override props are absent.
- Added GameWorkspace, PlayerStrip, BoardPlaceholder, MovePairs and MoveHistory through the public application module. Game implementation is in a separate internal module so form routes do not import game presentation.
- MoveHistory owns selected-step presentation and scrolls only its bounded list. It does not use document-level scrollIntoView.
- GameWorkspace caps the desktop board by viewport height, with a playable minimum on short landscapes. At 1280 by 900, the board is 532 pixels square and both clocks are visible. At 375 pixels wide, the board is 343 pixels square.
- Application Page uses one shared transform entrance. Reduced motion removes travel and shows final content immediately.
- Added public build-only @ejm/site/native enforcement using existing Vite parsing, PostCSS and maintained parse5. No runtime parser was added to Relay.
- Native HTML now uses the shared 72-pixel header, 36-pixel mark, form rhythm, control recipes, system themes, native mobile menu and motion policy.
- Retained the root docs Prose export. Application Prose has a separate public layout export.
- Added missing maintained tailwind-merge groups to the generated slim configuration. Marketing source profiles explicitly exclude application modules.
- Narrowed the gallery docs source profile to its actual public docs composition. All 282 required utilities remain covered; application components do not enter that route's stylesheet.

### Consumer changes

Chess's eleven page modules and Board, GameReplay and Operations now compose public UI exports. The root stylesheet contains only the public import. Four obsolete local stylesheets were removed. The strict guard scans 64 source files and reports zero visual overrides.

Account controls load at the existing signed-out and signed-in state boundaries. The parent retains requests, validation, error focus, callbacks and reset state. Challenge controls load when needed. These conditional chunks meet the existing entry budget; this change does not claim lower total transfer.

Relay's authored templates, generated route states and controller HTML use the shared native profile. The guard checks 25 authored files and 16 rendered route states. Existing browser trust disclosures, disabled-until-paired controls and ordinary privacy forms remain available.

## Chess identity

Canonical source: `/Users/everettmorgan/Desktop/ejm-ui/scripts/chess-assets.mjs`.

Two curved ribbons suggest a knight through their silhouette and open channel. There is no stock-piece eye, pedestal or copied piece silhouette. All 20 existing public asset paths are retained. The board piece sprite, project name, wordmark typography and registry visibility are unchanged.

- Deterministic generation, 322 local asset hashes and 302 retained source comparisons passed.
- Sixteen identity/favicon tests passed.
- Small-size checks passed at 16, 24 and 32 pixels, including separation between the two ribbons.
- The full artwork family grew from 84,437 to 126,980 raw bytes. The visible Ink header mark grew from 269 to 1,332 gzip bytes. This is a documented artwork cost, within existing mark and wordmark limits, with no new runtime dependency or font.

Preview: `/private/tmp/ejm-chess-relay-design-20261020/chess-logo/chess-logo-preview.png`.

## Checks

| Area | Result |
| --- | --- |
| Shared TypeScript | Passed |
| Full shared suite on final working tree | 95 files, 867 tests passed |
| Shared owner gate | Passed: static profile, art, containerless, component inventory, tree shaking, CSS sources, slim merge parity and catalog |
| Native design regressions | 19 passed |
| Chess leaf verification | 40 tests in 9 files passed before full-suite confirmation |
| Chess typecheck and strict design guard | Passed |
| Chess focused final regressions | 34 tests in 5 files passed |
| Chess production build and both existing budget profiles | Passed |
| Chess Worker dry run | Passed; no deployment |
| Relay typecheck and native design guard | Passed |
| Relay focused Worker checks | 62 tests passed |
| Relay browser interface checks | 4 passed, including no-JavaScript forms and reduced motion |
| Relay production build and Worker dry run | Passed; no deployment |
| Gallery exact build and route budgets | Passed without raising limits |

The shared owner gate initially exposed concurrent docs tab-deferral work. That work was preserved. The final owner gate and full suite both pass with it present. Harmless jsdom canvas and navigation limitations appeared in the full-suite output; no test failed.

### Measured bytes

Chess route figures are gzip bytes from the existing budget checker. Limits remain 180 KiB JavaScript and 20 KiB CSS for applications; 95 KiB JavaScript and 14 KiB CSS for guide routes, including Account. Fonts remain limited to 70 KiB and HTML to 30 KiB.

| Chess route or asset | Measured |
| --- | ---: |
| Account entry JavaScript | 96,159 bytes, 93.9 KiB |
| Home entry JavaScript | 95,969 bytes, 93.7 KiB |
| Play entry JavaScript | 110,356 bytes, 107.8 KiB |
| Replay entry JavaScript | 94,997 bytes, 92.8 KiB |
| Guide entry JavaScript | 89,539 bytes, 87.4 KiB |
| Route CSS | 13,344 bytes, 13.0 KiB |
| Fonts | 34,536 bytes, 33.7 KiB |
| Largest route HTML | 9,293 bytes, 9.1 KiB |
| Conditional credential controls | 2,420 additional gzip bytes |
| Conditional signed-in controls | 4,961 additional gzip bytes |

| Relay or shared asset | Measured |
| --- | ---: |
| Native stylesheet | 47,667 raw bytes; 9,096 gzip bytes at level 9 |
| Native fonts | 34,536 bytes |
| Controller JavaScript | 19,232 raw bytes, within the 23,062-byte limit |
| Production WebAssembly | 484,136 bytes, within 1.5 MiB |
| Worker before | 290,534 gzip bytes |
| Worker after | 290,668 gzip bytes |
| Worker growth | 134 gzip bytes, within the 32 KiB growth budget |
| Exact gallery docs/shell CSS | 12,824 gzip bytes, within 14 KiB |

No latency, throughput, capacity or total-transfer improvement is claimed. Node 26 ran shared/Relay tooling; the existing Node 24 runtime ran Chess tooling. No budget was relaxed.

## Browser verification

Root reviewed the actual local applications in the in-app browser. Final captures and structured observations are in `/private/tmp/ejm-chess-relay-design-20261020/browser`.

- Chess home, signed-in account, game and replay were inspected. Account data controls expand and collapse with keyboard input; no account export or closure was submitted.
- An isolated active fixture accepted `e2e4`, moved the pawn, recorded `1. e4` and showed `Their move.`.
- Replay End selected the fourth half-move, `2… Qh4#`. Home, selected-step state and board flip were checked. Selected-list scrolling remains bounded by the shared implementation and focused regression test.
- Desktop checks at 1280 by 900 and phone checks at 375 by 812 had document width equal to viewport width. Both game clocks fit the desktop viewport after the shared board-cap fix.
- Chess light and dark themes use matching identity artwork. Existing chess-piece colors remain legible on the board.
- Relay final desktop check confirmed the 72-pixel outer header and 36-pixel mark. Its phone fields remain within the 375-pixel document. Native menu keyboard behavior and privacy form labels were inspected.
- Relay's existing browser interface suite verified forms without JavaScript, exact public asset access, theme behavior and reduced motion against the actual isolated Worker.
- Chess reduced motion was sampled with the existing shared capture driver in isolated Chrome at phone and desktop sizes in both themes. All eight early samples showed full opacity, no transform and no active animation. Relay reduced-motion samples also showed final content immediately.

The Relay review URL is `http://127.0.0.1:57009/control`. It uses a review-only local server-side fixture account proxy to the real isolated Worker. It does not proxy encrypted WebSockets. Protocol and privacy checks use the existing test harness directly against the Worker. Fixture credentials remain in a protected local file and are not included here.

The final Impeccable scan reported one flat-type warning for the unbuilt Relay HTML template because its absolute `/shared/ui.css` link cannot resolve as a local source path. This is not a rendered type defect: the final browser computed the primary heading at 51.84 pixels and body at 17.984 pixels. The exact shared stylesheet and route budgets pass. No detector ignore or local styling exception was added.

## Preservation and remaining limits

The initial working and staged diffs, source hashes and modes are retained under the evidence directory. The final preservation audit compared 2,798 baseline files: 2,709 unchanged, 85 changed, 67 additions and four expected Chess stylesheet removals. There are no unexpected removals or unclassified changes. All four staged binary diffs exactly match their starting snapshots. The isolated Chess UI tree is unchanged.

Concurrent CLI transport, TLS, Cargo, CI and OpenSpec work is separate. Concurrent Chess domain, capacity, privacy, operations and qualification work is separate. Concurrent shared docs tab-deferral files are separate. The audit records these paths and hashes without attributing them to the redesign. The index was not changed.

Relay's service, controller runtime, protocol and Wrangler configuration hashes match their starting values. Chess domain rules were not edited by this redesign. Other tasks changed some Chess server and qualification files during this work; this record does not claim the whole backend remained byte-identical.

The full native CLI gate, native-host encrypted browser suite and sustained Chess gameplay/capacity qualification were not rerun for this presentation change. Local UI checks do not prove production readiness, public source availability, package publication or deployment. No changes were published to the four marketing sites in this change.

## Evidence index

Evidence root: `/private/tmp/ejm-chess-relay-design-20261020`.

- `final-preservation.json`: exact path ownership, hashes and staged comparisons.
- `chess-leaves/summary.json`: public leaf contracts, asset port and notices.
- `chess-logo/summary.json` and `asset-checks.json`: artwork provenance, output and size checks.
- `ui-owner-check.log`, `ui-full-tests-final.txt`, `ui-types.log`: final shared owner checks.
- `gallery-docs-profile/summary.json`: source coverage and exact gallery route measurements.
- `chess-design-guard.json`, `chess-public-exports.json`, `chess-budgets.json`, `chess-preservation.json`: consumer contract and build evidence.
- `chess-focused-tests-final.log`, `chess-typecheck-final.log`, `chess-workercheck.log`: final Chess checks.
- `chess-reduced-motion.json`: isolated Chrome motion samples.
- `relay-result.json`, `relay-interface-tests.log`, `relay-worker-growth.json`: Relay checks, protected hashes and bytes.
- `browser/final-browser-checks.json`, final PNGs and `relay-browser/`: actual UI observations and captures.

Public docs were reviewed and updated with the shared contracts, native profile enforcement, consumer setup, replay ownership and local verification limits. Their builds pass locally. Publication remains unverified because this change was not deployed.

## Workflow closeout

All nine implementation tasks are complete. Strict change validation passed. The four added requirements match the main ui-package specification exactly, with its existing title and Purpose preserved. All seven main specifications pass validation. This verified change is archived as `2026-10-20-unify-chess-relay-design` under the existing changes archive.
