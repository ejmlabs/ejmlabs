# ejm-harness film source

This film shows useful work surviving a normal worker close. The public
JavaScript SDK runs a real native Rust worker that fixes order quantities and
checks the result. JavaScript reads the saved completion and a real passing
test result. The worker closes, then a fresh Python process and worker read
those same saved values through the public Python SDK.

The selected take is `../../raw/harness/master.mp4`: 19.833 seconds of silent
source footage, 1880 by 1040 pixels at 30 fps. It is source for the final film.
The earlier take and its adapters are preserved in `../../raw/harness-earlier/`.

## What is real

- Native `shell`, `read_file`, and `patch_file` tool execution.
- Node's built-in test runner: the quantity test fails first, then all three tests pass.
- The changed file and its before and after SHA256 hashes.
- The saved event journal: 25 events and four real tool results in this take.
- The completion text and final shell result read from that journal before close and again from a fresh Python process afterward.
- Full structural equality between the Python and JavaScript journals, plus equality of the selected saved completion and tool result.
- The terminal bytes, recorded through a real PTY and rendered by the public `@ejm/shots/recording` terminal capture API.

This is a developer SDK example. The adapter formats public SDK responses and
prints excerpts of the SDK calls used in the run. The opening condenses the
four real tools into one view. Most of the reading time goes to the completed
JavaScript record, normal close and matching Python record. Complete tool
output remains in the evidence files.

## Saved result shown on screen

Both readers select `run_finished.summary` from the saved events. They find
the last `tool_started` shell call in that run, then join its real
`tool_finished` result by `run_id` and `call_id`. The display uses these returned
values:

- `summary.text`: “Order totals now include every quantity. All three tests pass.”
- `tool_finished.output.content`: the actual `✔ counts each quantity (...)` line.
- `tool_finished.output.data.exit_code`: `0`.
- The same session and run IDs, abbreviated to eight characters on screen.

The Python output comes from its own SDK events. It then checks its full
journal and selected values against the JavaScript evidence. It does not use
the JavaScript sidecar as the source of its displayed result.

## Source cues

Times below refer to the rendered source master. The 10 Hz terminal renderer
rounds visible changes to the next sample; exact byte arrival times remain in
`recording.json`. `scenes.json` joins each marker's recorded byte chunks so its
label and complete text remain available when the PTY splits a write.

| Visible time | Source action | Keyframe |
| --- | --- | --- |
| 0.1 s | JavaScript SDK setup and task | `frame-00001.png` |
| 2.0 s | The real quantity test fails | `frame-00002.png` |
| 3.0 s | The native tool reads `orders.mjs` | `frame-00003.png` |
| 3.5 s | The native tool applies the checked patch | `frame-00004.png` |
| 4.3 s | The same real quantity test passes | `frame-00005.png` |
| 5.6 s | JavaScript reads the saved completion and test result | `frame-00006.png` |
| 10.4 s | The JavaScript worker has closed normally | `frame-00007.png` |
| 11.7 s | A fresh Python process calls the public SDK | `frame-00008.png` |
| 12.7–19.833 s | Python displays the same saved completion and test result | `frame-00009.png` |

Keyframes live in `../../raw/harness/terminal/`. `capture.json` records exact
marker times, media hashes, capture limits and the checks for this take.

## Repeatability and limits

The provider uses fixed local replay responses. The model's planned calls and
completion text are supplied in advance. The journal really saves that text;
the passing tool result independently comes from the real Node test command.
File reads, the checked edit, shell commands, test results, saved events and
the separate Python readback execute during capture. The worker closes
normally. This does not demonstrate live model reasoning, network providers,
a security sandbox, resumed execution or crash recovery.

The replay fixture computes its edit precondition from the initial sample file and verifies that the real read tool returned the same hash. It verifies each started call against the planned arguments before displaying its result. Editorial holds after real SDK events make the output readable. They do not measure execution time.

`source-identity.json` records the clean source revision and the hashes of the worker and public SDK files used. The sample workspace and harness state live in a new temporary directory for each take. The child receives a small explicit environment and an isolated home.

## Reproduce

Requirements: Node 24, Python 3.11 or later, FFmpeg, Google Chrome, the built
public harness SDKs and native worker, and the local `@ejm/shots` capture
package. The capture adapter accepts `EJM_HARNESS_DIR` and `EJM_UI_DIR` to name
those checkouts. The defaults name the verified local caches used for this
delivery. Direct no-hold runs also accept `EJM_HARNESS_WORKER_PATH` to select a
different verified worker.

From `launch-videos/`:

```sh
node capture/harness-capture.mjs record
node capture/harness-capture.mjs render
```

Run the render command only while no other shared Chrome capture runs. It
produces changed terminal PNG states and an FFmpeg concat timeline. Capture is
bounded to 100 columns, 24 rows, a 35-second process timeout, 40 seconds of
recording and 1 MiB of terminal output. Editorial holds total 19.4 seconds;
actual command and process time adds to that duration.

Build a silent source master with bounded encoding threads. Use the new
`recording.json` duration when repeating a capture; the duration below belongs
to this selected take.

```sh
ffmpeg -hide_banner -loglevel error -y -filter_threads 2 \
  -f concat -safe 0 -i raw/harness/terminal/frames.ffconcat \
  -vf fps=30 -t 19.833333 -an -c:v libx264 -threads 2 \
  -preset fast -crf 17 -pix_fmt yuv420p -movflags +faststart \
  raw/harness/master.mp4
```

The capture and renderer add no browser code or dependencies to any website.

For a fast SDK and tool check with no editorial holds:

```sh
EJM_FILM_PACE=0 EJM_FILM_EVIDENCE=/private/tmp/harness-film-check \
  node capture/harness-session.mjs
```

`PYTHON` can select a different Python 3.11 or later executable. The default is `/opt/homebrew/bin/python3`.

## Evidence

The final take writes `raw/harness/recording.json`, `scenes.json`, and `evidence/`:

- `capture-receipt.json`: real test exit codes, file hashes, process identity, and journal count.
- `test-before.json`, `read-orders.json`, `fix-quantity.json`, `test-after.json`: uncut worker tool receipts.
- `journal.json` and `summary.json`: public SDK reads of the native journal and run result.
- `js-readback.json`: the actual saved completion, joined tool events and displayed test line selected by JavaScript.
- `python-restore.json` and `python-restore.txt`: the fresh reader's identity, independently returned values and equality checks.
- `orders.before.mjs`, `orders.after.mjs`, `workspace.diff`: the actual workspace effect.
- `responses.json`: exact fixed provider responses for the take.

The selected take passed syntax checks, a separate no-hold preflight, real
workspace and test checks, journal and selected-result equality, native/SDK
source hashes, full source-master decode and visual checks of the completed
work, close and Python readback. The JavaScript PID was 19274 and the fresh
Python PID was 19417. Exact source and media records live in `capture.json`.

The earlier take and preflight evidence remain under
`../../raw/harness-earlier/`. One render attempt stopped during headless Chrome
startup in the restricted process sandbox. The same public renderer succeeded
with process escalation and an isolated Chrome profile. Final film assembly,
music and release checks belong to the main delivery verification.
