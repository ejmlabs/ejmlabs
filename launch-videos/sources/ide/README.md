# Native ejm-ide film source

This film shows a real native ejm-ide window working in a disposable copy of the
Harbor example. The model input comes from a localhost replay provider. The IDE
executes the file tools, checks source versions, reviews the proposed write,
saves the file and records the diff through its normal code paths.

## What the recording proves

- `read_file` read `src/orders.rs` and `src/money.rs` from the sample workspace.
- `open_file` and `highlight_code` received acknowledgements from the native UI.
- `write_file` received automatic review and added a 19-line regression test.
- The saved file and native recorded diff include the quantity, discount and
  `2160`-cent assertion.
- A separate `cargo test` check passed both sample tests. Edi did not run those
  tests. Its visible summary states that limit.

This records product behavior with fixed model responses. It does not establish
the reasoning of a hosted model, a signed release, or platform acceptance.

## Files

| File | Purpose |
| --- | --- |
| `capture.json` | Method, revision, window, media hashes and limits. |
| `source.json`, `binary.json` | Source archive, scratch patch and native binary identity for the task take. |
| `startup-driver.patch` | Test-only native startup and action adapter for the task take. |
| `diff-startup-driver.patch`, `diff-binary.json` | The later capture-only window restore and focus adapter for the valid result shot. |
| `source-verification.json` | 522 other tracked source files match the recorded revision. |
| `provider.mjs` | The task's localhost model responses, including its review response. |
| `provider-requests.jsonl` | Actual provider requests from the successful task. |
| `native-turn.json` | The completed turn and its actual tool items. |
| `workspace/before/`, `workspace/after/` | Full tracked sample files before and after the native edit. |
| `workspace.diff` | The actual Git diff after the edit. |
| `test-check.txt`, `test-check.json` | The separate fixture test command and result. |
| `cues.json` | Editing cues in seconds from each source movie. |
| `raw-probe.json`, `diff-probe.json` | Native recording metadata. |

`native-turn.json` contains two forms of the tool record. Its `items` hold the
completed tools, their success flags, returned source versions and captured
changes. The persisted model `messages` contain a fallback sentence saying a
tool was interrupted. That fallback does not match the completed tool items or
the proven disk write. Use the completed items, real provider request results
and saved workspace as the evidence. This capture task does not change that
separate persistence behavior.

## Capture setup

The source revision is `bde96726270afe16777a3ae6461064367ce4d204`. It predates
later uncommitted IDE edits. `../../capture/ide-prepare.py` creates the scratch
tree from that revision, prepares a clean Harbor workspace and records the
test-only native adapter. It refuses to replace an existing capture tree.

The adapter uses Tauri's public window evaluation API to drive the unchanged
native composer and panel controls. It seeds no chat database and substitutes
no tool results. Its task-owned action files are retained here. The provider
binds only to `127.0.0.1:18787`; its fake task key is not a credential. The Vite
frontend binds only to `127.0.0.1:1420`. The app uses a fresh isolated HOME.

The task build command was:

```sh
env CARGO_TARGET_DIR=/private/tmp/ejm-ide-native-session-20261019/target \
  cargo build --manifest-path src-tauri/Cargo.toml --locked --offline --jobs 2
```

The task used the existing native dependency cache and declared public UI
packages. No dependency or runtime code was added to the websites. No public
product documentation changes are needed because this work adds film source
and disposable capture tooling, without changing the shipped IDE.

The first native task build took 23.09 seconds with two jobs. The result-shot
driver build took 14.93 seconds. The latter adds only native window restore and
focus calls. Both variants retain their own patch and binary record.

The signed scratch `.app` wrapper was launched through LaunchServices with the
isolated HOME, workspace, replay endpoint and task-only key. The source editor's
existing font preference was set to 16. The existing project-panel and Edi-pane
controls supplied the framing. The actual app remains the source of all chrome.

## Approved window recording

The user approved macOS recording confined to the IDE window. CoreGraphics
enumerated only windows owned by that task process. The capture selected its
window ID rather than the desktop, a rectangle, or another app.

```sh
screencapture -x -o -v -V 55 -l 67268 native-edit.mov
```

The result is variable frame rate, H.264, 2560 by 1640 pixels, without audio.
The final assembly converts it to a constant frame rate. macOS draws a recording
badge over the titlebar. A crop may exclude that badge. The product pixels
remain unmodified inside the chosen crop.

The first typing test was discarded because WebKit throttled a background
window's timers before a task was submitted. The successful task uses elapsed
time to pace the composer, with the native window active. A later optional
second-turn navigation failed with `This IDE request is no longer current` and
is excluded from the film. A blank first result take is also excluded. Those
failed takes remain in the scratch evidence folder identified in `capture.json`.

## Verification

The source movie was decoded from start to finish with FFmpeg. Representative
frames cover the composer, source navigation, highlight, native write and diff.
The actual source and diff hashes, provider calls and completed tool items are
retained. Final encoding and playback checks belong to the film assembly's
verification report.
