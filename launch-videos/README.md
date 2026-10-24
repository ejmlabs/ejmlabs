# Product launch films

Three short films are being planned for ejm-cli, ejm-ide and ejm-harness. Final footage will come from the native products and public SDKs.

## Current stage: story review

See [publication scope](PUBLICATION-SCOPE.md) for retained sources, path
redactions and omitted private material in this PR.

Start with the [visual scripts and storyboards](storyboards.html) or the
[complete text draft](STORIES.md). Draft 2 follows the products' core values:
CLI speed and resource control with many agents, IDE source reading, and
harness speed, simplicity and extensibility. Every film invites people to
help improve the open-source project.

All three scripts are review drafts. New fixtures, capture and video rendering
wait for the user's story approval. Shot sketches illustrate the plan and are
not recorded product pixels. Every revised story needs new footage.

## Earlier source and exports

Existing files in `exports/` are earlier, unapproved cuts. They do not show the
new narratives. Existing source notes and verification records apply
to the captures and versions they name; they do not verify the new plan.

The final release kit, manifest and checksums have not been assembled. After
story approval and verified capture, the intended delivery is one 1080p30
H.264/AAC MP4, poster and editable source per product, followed by a checked ZIP.

The [earlier checks](VERIFICATION.md), [earlier social drafts](PUBLISHING.md)
and [reference review](REFERENCE-REVIEW.md) remain available for context.

The commands below describe the existing assembly pipeline. Do not run new
capture, preparation or rendering until the stories have been approved.
Future editing uses Python, FFmpeg and librsvg:

```sh
python3 scripts/prepare-media.py
python3 scripts/render.py cli ide harness
python3 scripts/verify.py
python3 scripts/package.py
```

Node and sibling checkouts are needed to refresh canonical assets or capture
new product runs. Earlier captures and edits remain source history.

## Earlier captures and limits

The earlier captures used disposable workspaces and isolated product state. CLI and harness used local replay for fixed model replies; their native tools, file edits, test commands and stored events executed for real. The earlier IDE cut followed native index relationships and source navigation without a model call. Those captures do not verify the revised stories. Editorial holds and cuts improve readability and do not measure execution speed.

- [CLI source](sources/cli/README.md): native Rust terminal output through a real PTY and xterm renderer.
- [IDE source](sources/ide/README.md): approved recording of the native IDE window. Search, inferred graph links and source navigation use the existing app commands. The earlier test-writing footage is retained separately.
- [Harness source](sources/harness/README.md): public JavaScript and Python SDKs with a real native worker. Its normal close and reopen demonstrate persistence, not crash recovery.

Source notes retain revision and binary hashes, replay inputs, real tool receipts and file diffs. Personal accounts, paid providers and customer data are not used. The capture tooling and film package do not change product runtime behavior.

## Rebuild

Requirements: Node 24, Python 3.11 or later, FFmpeg with libx264, librsvg, and the sibling ejm-ui checkout. Native source capture also needs the product builds named in each source note. On macOS, capture the IDE window only with the user's approval and the operating system's screen recording permission.

The IDE preparation script defaults to sibling `ejm-ide`, `ejm-ui` and
`ejm-harness` checkouts. Override them with `EJM_IDE_DIR`, `EJM_UI_DIR` and
`EJM_HARNESS_DIR`. The harness capture adapter also accepts `EJM_UI_DIR`.
These portable defaults have not been used for a new capture. Match the
recorded revisions and build requirements before running the old workflow.

From this directory:

```sh
npm install --ignore-scripts --bin-links=false
npm run assets
```

The kit excludes standalone music under the artist's terms. Download the source
under those terms and prepare the local excerpt:

```sh
curl -fL 'https://files.freemusicarchive.org/storage-freemusicarchive-org/tracks/3BCABCRdk09jT6975KTOmLw1hMLcFS36ZzodCUyB.mp3' \
  -o assets/music-source.mp3
ffmpeg -hide_banner -loglevel error -y -ss 8 -t 60 -i assets/music-source.mp3 \
  -ar 48000 -ac 2 -c:a pcm_s24le assets/music.wav
python3 scripts/prepare-media.py
```

Run each product's capture commands from its source note. Only one shared Chrome terminal-render process may run at once. Convert the CLI and harness frame timelines to editing masters with FFmpeg, for example:

```sh
ffmpeg -f concat -safe 0 -i raw/harness/terminal/frames.ffconcat \
  -vf fps=30 -c:v libx264 -preset fast -crf 15 -threads 4 \
  -pix_fmt yuv420p -movflags +faststart raw/harness/master.mp4
```

The cut list in `edits/<project>.json` names source files and seconds. To make or revise a film:

```sh
python3 scripts/render.py cli
python3 scripts/render.py ide
python3 scripts/render.py harness
python3 scripts/verify.py
```

Encoding is sequential with four encoder threads and two filter threads. Each final file has a 50 MiB budget and a 20 to 35 second duration budget. Build logs and exact commands stay in `build/`. Review the extracted scene frames and watch every complete film after encoding. Automated decode and loudness checks do not replace a visual review or listening check.

The cuts use a short problem card, direct cuts between useful actions,
focused native detail shots and an outcome card with the product URL. Product
footage has no persistent outer header, footer or step caption. Source footage
runs at its captured speed; a `hold` repeats the last frame for reading time.
An optional `panY` follows a native control or result and uses seconds relative
to its cut. `problemSeconds` and `outcomeSeconds` set each card's reading time.
The upbeat lo-fi score is normalized near -16 LUFS. There is no verified BPM
claim. Earlier edits and reference footage stay outside the kit.

## Brand and credits

Project marks and fonts come through the public `@ejm/tokens/assets/*` export. `assets/manifest.json` records their hashes. Manrope and IBM Plex Mono keep their SIL Open Font License notices. Brand art retains the rights stated by ejmlabs.

Music: [Fresh by Alex-Productions](https://onsound.eu/track/fresh/). The artist
permits commercial social videos and monetized videos with a credit in the
video description. The films use shortened excerpts, fades and adjusted levels.
Each end card includes a credit. Include this exact credit in each social post:

> Energetic Hip Hop | Fresh by Alex-Productions | Music promoted by https://onsound.eu/

The excerpt covers 8 to 68 seconds of the original track. The original local
media bundle retains `assets/music-license.json` and `assets/music-license.md`
with permission, download, excerpt, hashes and use limits. Those records are
excluded with generated assets from this source PR. Recover the records and
recheck current terms before rendering or publishing. Paid ads and the other
uses listed by the artist need a separate license. Standalone MP3 and WAV files
stay outside the ZIP. The music is not covered by the projects' MIT license.
Retain music and font credits.

## Scope and publication

These are local release assets. This task does not post them to social media, publish product binaries, change source visibility or deploy a website. Website and product user guides need no behavior changes. The capture contract's API documentation belongs to ejm-ui; this guide covers the film workflow and its limits.
