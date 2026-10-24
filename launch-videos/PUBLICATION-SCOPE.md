# Public source handoff

Prepared on 2026-10-24. This is source retention for review. The revised
stories still await approval. No new capture, benchmark, render or release
verification was performed for this PR.

## Included sources

The PR includes stories, storyboards, capture and assembly tools, isolated
demo fixtures, historical fixture events and source notes. Raw media, rendered
exports, generated assets and build output remain excluded. This source tree
alone is not a finished film delivery kit.

The CLI source archive remains byte-for-byte unchanged. Its SHA256 is
`181b89a50e65934db450fb0ebe3d1773a9980aff53f73471b865112308cbb392`.
Its 150 regular relative members match `sources/cli/source-manifest.json`.
The archive's existing revision note and capture limits still apply: it differs
from the recorded binary and has not been rebuilt or recaptured.

## Publication revisions

- `STORIES.md` and `storyboards.html` replace private absolute source locations
  with public repository links. These links use `main`; source and line numbers
  can change. Recheck the basis against the selected capture revision before
  producing the films.
- The capture tools use sibling checkout paths with environment overrides.
  Syntax checks do not prove a new capture or build.
- `verification.json`, `sources/cli/capture.json`,
  `sources/ide/source.json`, `sources/ide/diff-source.json`,
  `sources/ide/raw-probe.json`, `sources/ide/diff-probe.json`,
  `sources/ide/graph/setup.json` and `sources/ide/graph/launch.json` are redacted
  publication copies. Personal home paths were replaced by repository-relative
  paths or a named Node version. Each carries a publication marker.
- Documentation and HTML whitespace was normalized. Blank-line whitespace in
  `sources/cli/tests.before.txt` was removed; its test event text is unchanged.

The original records remain in the original private working copy. Historical
hashes, results and limits remain as recorded. Those hashes do not identify
the redacted JSON bytes. No recapture or revalidation is implied.

## Private omission

`storyboard-review.jpg` is omitted because it shows the private review
conversation and editor chrome. It remains in the original private working
copy. The clean storyboard source is included.

These source and portability edits change no public product or website
behavior. Product guide publication remains separate.
