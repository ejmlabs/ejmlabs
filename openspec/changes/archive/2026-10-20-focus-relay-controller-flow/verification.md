# Verification

Date: 2026-10-20. Change: `focus-relay-controller-flow`.

## Scope

ejm-ui owns the fixed native setup and workspace-header recipes, one-column
workspace and public native guard. Relay composes them and derives its visible
stage from existing invitation and authenticated session state. It adds no
transport, crypto, persistent storage or execution policy.

The content rule lives in `ejm-ui/QUALITY.md#content`, its public Checks guide
and its shared design skill. Six root AGENTS files and seven existing consumer
skills apply the rule. Guidance covers Studio, UI, CLI, IDE, harness and Chess.
It does not establish that every existing interface has been audited.

## Completed checks

| Check | Result |
| --- | --- |
| Public native contract tests | 20 passed |
| Native CSS generation and current-artifact check | Passed |
| Shared UI owner checks | Passed |
| Shared workspace TypeScript | Passed |
| Relay design ownership | Passed, 25 authored files and 16 rendered route states |
| Relay and controller TypeScript | Passed |
| Focused Relay core/privacy/protocol tests | 62 passed across four files |
| Native-host browser and interface tests | 8 passed, one worker, 16.5 seconds |
| Production controller build and Worker dry run | Passed |
| CLI public docs/site check | Passed, 94 tests and every route within its existing budget |
| Public gallery Checks guide build/route tests | 60 passed |
| Edited skill validation | 8 passed |
| Local guidance links and anchors | 107 passed |
| CLI skill routing | Passed |
| Harness contributor policy and self-tests | Passed, 4 self-tests |
| Scoped guidance diff checks | Passed in all six repositories |
| Git index preservation | Exact matches in all six repositories |
| Protected Relay sources | Exact baseline matches |

Shared owner checks cover current generated CSS, brand artwork, containerless
components, the component catalog, tree shaking, source boundaries and generated
merge data. The affected CLI public reference builds at
`/docs/reference/relay-browser/`.

## Browser review

The first batched review used the actual local Worker fixture at
`http://127.0.0.1:57009/control`. The review adapter uses a test account and does
not proxy encrypted WebSockets. Connected-session evidence must come from the
existing native-host browser fixture.

- Dark setup at 1035 x 1034: one 32px heading, 672px setup column, no horizontal
  overflow and no visible or focusable session workspace.
- Dark setup at 360 x 800: no horizontal overflow; the 44px Connect action fits
  within the viewport and the trust disclosure remains readable.
- Short screen at 1280 x 600: natural document scrolling, visible main overflow,
  32px heading and reachable controls. The page is 686px high before the final
  redundant idle-status removal.
- Batched finding: remove the redundant initial "Not paired" label and its
  status dot. Keep connection progress, failure and recovery feedback.

Final confirmation at 1035 x 1034 and 360 x 800 shows one 32px setup heading,
no idle label or dot, a hidden workspace and no horizontal overflow. The phone
Connect button is 44px high and ends at 642.75px in its 800px viewport. Root
saved final screenshots and DOM metrics, restored the original desktop viewport
and left the local preview open.

Root also inspected the light desktop and phone setup captures, authenticated
desktop session, view-only dark phone, approval and uncertain-action recovery
captures from the real local Worker/native-host fixture. Output and permission
state remain visible; recovery retains the transcript and original instruction,
and the view-only composer is absent. Fingerprints are masked in fixture
screenshots. The fixture auto-approves locally; the approval-stage check holds
encrypted application frames and does not test the manual native approval UI.

The eight browser checks cover first-snapshot gating, invalid invitation focus,
one-shot live focus, retained uncertainty without replay, view-only access,
explicit clearing, rejected tampered ciphertext, signed-out asset denial,
system themes, no-JavaScript privacy forms and reduced motion. Reduced-motion
samples have opacity 1, no transform and zero animations. Idle theme captures
at 1280 x 900 and 390 x 844 have no horizontal overflow.

## Final byte gates

| Asset | Measured bytes | Existing limit |
| --- | ---: | ---: |
| Native CSS, gzip level 6 | 9,247 | 14,336 |
| Preloaded fonts | 34,536 | 71,680 |
| Controller app.js, raw | 20,471 | 23,062 |
| Production WebAssembly, raw | 484,136 | 1,572,864 |

The controller script grows by 1,239 raw bytes for stage and focus handling.
Native CSS is 9,174 bytes at gzip level 9, a 78-byte increase under that same
comparison. The controller script gate covers app.js; all controller JavaScript
including unchanged protocol and generated WASM glue is 49,564 raw bytes.
No budget was widened and no execution-speed improvement is claimed.

The dry-run Worker bundle is 1,182,053 raw bytes and 290,668 at gzip level 6,
unchanged from the controller-flow starting bundle. Its measured gzip growth
is zero, within the retained 32,768-byte growth limit. The matching-compression
comparison is in root-worker-growth.json.

## Preservation

Root snapshots recorded the six shared presentation paths and twelve Relay
paths before editing. Protocol, build-budget source, Worker, account/privacy
handler and Wrangler configuration hashes still match. The staged CLI diff
retains SHA-256
`45d8778cbf8832e57526b46ed40cae3100fefb353f5881a0edf972dcf3ba055d`.
The shared UI index remains empty. The separate governance snapshots confirm
the other project indexes are unchanged.

## Evidence and limits

Local evidence: `/private/tmp/ejm-relay-flow-20261020/`.

- `shared-result.json`: changed shared paths, native contracts and CSS/font bytes.
- `governance-result.json`: all 18 guidance paths and their focused checks.
- `root-preservation.json`: exact staged and protected-source comparisons.
- `root-worker-growth.json`: matching-compression Worker growth measurement.
- `relay-result.json`: final consumer checks, bytes, native fixture and limits.
- `production-build-confirm.log`, `browser-tests-confirm.log`: final build and
  browser confirmation after idle-status removal.
- `root-ui-owner.log`, `root-ui-typecheck.log`, `root-cli-site-final.log`: root
  checks, including the final late public-guide verification paragraph.
- `browser/`: before and after screenshots from the review page.

Unrelated full native CLI, harness and IDE suites and a new native product build
are outside this presentation correction. No paid model call, physical-device
test, commit, push, package publication or deployment was run for it. These
checks establish local source and fixture behavior, not a production release.
