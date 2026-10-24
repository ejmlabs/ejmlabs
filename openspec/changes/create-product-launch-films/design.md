# Design

## Context

See proposal.md for the release goal. The existing shared capture package runs real terminal products but exports stills. The websites' authored playback is unsuitable as film source. A cached real IDE and Rust worker are available, and local FFmpeg and librsvg are installed. The user approved macOS recording confined to the IDE window.

## Goals / Non-Goals

**Goals:** Three complete, cohesive product films, real tool effects, public-interface consumption, readable details, small local tooling and reproducible source evidence.

**Non-Goals:** Product features, website or installer releases, publishing to X, real customer data, paid model calls, a parallel UI, or a new general video framework.

## Decisions

### Actual footage and deterministic model input

Current work stops at scripts and storyboards. The user must approve the three stories before any new fixture implementation, capture or video rendering. The review page is a static planning artifact. Its shot sketches do not claim to be recorded product pixels.

The revised CLI story plans native session creation, the session picker, actual active/queued status and steering under load. It targets 200 managed runs within one harness instance, with a smaller pool of model requests and local jobs. The IDE story follows the existing Harbor sample from calculate_total through quote_order and settle_order, then reads both source files in split editors. The harness story shows the real public SDK lifecycle, adds an application tool, and presents a scoped native-core benchmark. It does not imply a built-in dashboard or issue tracker integration.

Earlier retry, pricing navigation, test-writing, session-history captures and issue-board story drafts remain history. They do not verify the revised narratives. New native actions and results must be captured after review. Existing adapters invoke public commands and do not add product tools.

Replay preserves repeatability and privacy. It does not prove model reasoning. Source notes name this limit and distinguish tested tool effects from model claims. No personal auth or state is read. Source snapshots and binary hashes identify what appears in the footage.

### Owner boundaries

ejmlabs owns `launch-videos/`: stories, task fixtures, product-specific capture adapters, media assembly, manifests and delivery. These adapters use product commands and SDK exports. They do not import private sibling source.

ejm-ui owns reusable timed PTY recording and terminal rendering under a public `@ejm/shots` contract. It has no OpenSpec root, so the extension follows its normal package workflow with owner checks and docs before adoption. Product runtimes remain unchanged. A capture driver in a scratch IDE source copy is a recorded test adapter, not a released product feature.

### Local maintained media tools

Use the installed FFmpeg compositor and librsvg for final assembly, with canonical local fonts and logo assets. FFmpeg supplies encoding, crops, transforms, transitions, audio mixing and media validation. This keeps website dependencies and runtime cost at zero and avoids a second browser-based animation runtime.

Remotion was evaluated through its current official renderer and license docs. Its team eligibility is not established here. Motion Canvas has an official video exporter but no documented simple headless CLI. Neither is needed for footage-led films with titles, timed cuts and camera moves. The scripts remain thin, product-specific edit decisions over maintained tools.

### Art direction and story

Use Sage #8A9A7B, Ink #202721, Paper #F6F5EF, Forest #29443B and Mist #E8EDE3 from the current identity, with Manrope for titles and the product's own type inside captures. Preserve logo geometry and proportions. The user's revised direction is punchy, upbeat and modern, with upbeat lo-fi music. Avoid long dissolves, continuous slow zooms and waiting states. Product footage occupies most of each film. End on the matching mark, MIT label and product URL.

- CLI story: many agents share one machine. Establish the terminal, show configured work limits and launch at recorded speed, then the native session picker and active/queued status during a defined workload. Switch and steer a run. Stop a run executing a local check, show its slot release and another queued check starting. Capture actual process-tree resources and responsiveness. The proposed target is 200 managed active runs with an explicit capacity override, not 200 executing builds. This count needs fresh verification before entering a film. Never use 100 separate CLI processes to imply one governor.
- IDE story: before changing the code, understand it. Search calculate_total, read how it combines discounted line totals, follow its callers, open orders.rs and split it beside money.rs. The visible conclusion is that quote_order and settle_order share the calculation. Keep source primary, preserve inferred graph labels and do not claim the graph proves runtime behavior or correctness. No AI edit is required for this story.
- Harness story: a fast core, a clear API and tools that fit the application. Establish the release-data question at the opening. Make create-to-start the source reading target, keeping the complete event/wait/close path in context. Show a scoped native-engine benchmark, then define and register the release-data tool and show its actual result. Preserve worker requirements and replay limits.
- Every film closes with Open source / MIT and a concrete invitation at the product URL: profile the CLI, improve code navigation, or build and share a harness tool. Use existing GitHub links as directed by the user; do not imply that repository visibility has changed.

The detailed scripts, exact actions, seven timed panels per film and proof needs are in `launch-videos/STORIES.md`, presented visually in `launch-videos/storyboards.html`. They are review drafts. Every film identifies the product category near the start and ends with one contribution invitation at its product URL. An optional read-through script is supplied for each; the default viewing plan uses readable captions and upbeat lo-fi and makes no assumption that narration has been commissioned.

Use upbeat lo-fi with verified rights. Open on a recognizable task or problem and establish the product category. Genuine product actions show the cause and useful work. Brief captions carry essential meaning at phone size; native requests and results provide the reading target when legible. Hold the useful outcome before the final invitation. Do not add invented product chrome, unearned success counts or claims about measured execution speed. If model replay is used, retain an honest visible disclosure and the source record; it does not prove independent model reasoning.

### Reference review and camera choices

Inspect actual public launch footage from Cursor, OpenAI and Anthropic, including timed frames around camera transitions. Record official sources, observed timestamps and limits in the delivery notes. These observations describe the visible films, not unverified claims about their production tools or soundtracks.

Use the shared pattern found in those references: one brief claim, a concrete task, visible product actions and a readable result. Give native product pixels the canvas and each shot one reading target. Use a brief establishing view, deliberate moves or cuts into relevant actions, and stable reading holds. Short editorial captions may explain the task or benefit without imitating product controls. Retain reference media only in temporary research folders, outside the delivery.

### Budgets and verification

The storyboards propose 30 seconds per film, within the existing 20 to 35 second contract and 50 MiB 1080p budget. Timing is an editorial plan, not product latency. Story review comes first. A later rough cut must remain understandable muted at phone width without a source README. Reviewers should identify the product, task, result and next action. Technical media checks cannot substitute for this review. Limit Rust builds to two jobs and encode sequentially with bounded threads. No new browser code enters the websites.

CLI defaults allow 100 managed sessions, eight model requests, four local jobs and one heavy job. These are admission settings, not proof that every host runs that workload well. Reserve budgets are not OS memory caps. Before a numerical scale claim, capture the real CLI with a pinned workload, host, binary, process-tree RSS, CPU and input/cancel timing. A hundred saved idle sessions do not meet this check. Do not borrow the harness-only RSS figure for the CLI.

The existing native Rust benchmark records 100 managed sessions, 300 fixed Bash checks and a 1.210-second execution phase on a 24 GiB Mac. That is one offline replay run, not SDK host overhead, total elapsed time, remote-model speed or old-laptop acceptance. It supports planning the speed shot only. After story approval, refresh the measured run and retain its host, revision, phase and scope in the film. Do not promise the old number or invent comparative results.

Use ffprobe for codec, dimensions, frame rate, frame count and duration. Decode every final file with FFmpeg. Inspect representative frames from every scene, check cuts, readable crops, blank-frame detection, full timeline coverage, audio loudness and peaks. Use a local review page for playback and keep posters and a verification report. A render start or preview does not complete delivery.

## Risks / Trade-offs

- Dense code can become unreadable in a feed. Use focused close shots and inspect native-size frames.
- Local replay can imply live model reasoning. Retain the visible product replay state and state the capture method in notes.
- A cached app can differ from later working-tree changes. Record the exact revision and include only features proven by that build.
- Native capture can expose unrelated content. Use the approved single-window method and isolated sample data.
- Source audio may need attribution. Retain license evidence and delivery credits, or use original sound design.
- Driver code can accidentally change behavior. Keep it in scratch, record its patch, and invoke unchanged public product commands.

## Migration Plan

Add an isolated media workspace and consume the shared capture contract only after its owner verifies it. Deliver local files with source notes. There is no production rollout. Remove or replace an export through normal file review if a capture fails its evidence or quality checks; preserve failed takes for diagnosis until delivery.
