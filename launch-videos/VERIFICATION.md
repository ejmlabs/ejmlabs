# Final film checks

## Review status

This record concerns earlier cuts and captures only. The revised scripts and
[visual storyboards](storyboards.html) await story approval. They have not
been captured, rendered or media-verified. Existing exports remain unapproved.

Earlier cuts checked on 19 October 2026. The files use the actual native products
and public SDKs. Fixed local model replies make each capture repeatable. The
tools, file effects, test commands and saved sessions execute for real.

## Exports

| Film | Duration | Frames | Size | Loudness | True peak |
| --- | --- | --- | --- | --- | --- |
| ejm-cli | 22.40s | 672 | 2,273,098 bytes | -16.2 LUFS | -3.9 dBFS |
| ejm-ide | 20.90s | 627 | 1,937,603 bytes | -16.3 LUFS | -4.2 dBFS |
| ejm-harness | 20.43s | 613 | 1,715,795 bytes | -16.3 LUFS | -4.2 dBFS |

All three are 1920 by 1080, 30fps, H.264 High 4.1, yuv420p, with AAC at 48kHz
stereo. MP4 metadata precedes media data for fast start. Each is within the
20 to 35 second duration budget and 50 MiB size budget.

`verification.json` retains full probes, hashes and measured results. Each file
decoded from start to finish with FFmpeg's error checks enabled. Frame counts
match the stated durations. Automated analysis found no black interval. Still
holds on source output and title cards are deliberate. Loudness and peak checks
passed; subjective listening quality was not assessed.

## Visual and playback review

Representative frames from every scene were inspected at the delivery size.
An independent reviewer checked legibility and compared the visible results
with the saved source evidence. All three result posters are clean frames.
The earlier edit played completely in the in-app browser. The faster electronic
recut passed complete decode and independent visual review; its browser playback
check is still in progress. Local playback does not establish a social
platform's later transcode.

- CLI: the native replay label, granted tools, two failing test cases, actual
  boundary edit and final five passing tests match 35 saved native events.
- IDE: completed reads, navigation, highlight and write match the saved tool
  items. The native diff shows 19 added lines and the 2160-cent assertion. Edi
  says it has not run the tests. The separate fixture test check passed 2/2.
  The persisted model-message fallback anomaly is described in its source note.
- Harness: four real tools change the quantity calculation. The same tests
  move from one failure to three passes. A fresh Python process and worker read
  the same 25 persisted events after the JavaScript worker closes normally.

The footage contains isolated sample data and the approved IDE window. Failed
captures and the optional failed IDE second turn do not appear in the films.

## Resource record

Encoding ran sequentially with four encoder threads and two filter threads.
Measured encode times were about 5.6s for CLI, 6.4s for IDE and 5.1s for harness.
The exact values and commands are retained in `build/*-render.json`. Peak child
resident memory is a process-batch measurement in those records, not an
isolated per-film benchmark. These are delivery measurements, with no claimed
performance improvement. Rust capture builds used two jobs and existing caches.

## Ownership, docs and publication

The shared bounded terminal recorder belongs to ejm-ui's public Node-only
`@ejm/shots/recording` export. Its 12 focused contract tests and workspace
typecheck passed before capture. Its API and limits are documented in that
package's README. Product fixtures, capture adapters and film assembly belong
to ejmlabs. This adds no website runtime dependency or production product
feature, so website and product guide behavior needs no change.

The repository README links to this workflow. The source notes, licenses and
reproduction commands were reviewed, and their relative Markdown links resolve.
The handoff archive requires a ZIP integrity check and a member hash manifest
after the last edit.

These assets are local and have not been posted to X, uploaded to a video
platform or deployed to a website. Keep the music and font credits with revised
exports. The music credit is included in each film and in the source README.
