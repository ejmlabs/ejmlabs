# Design

## Context

See `proposal.md` for motivation and the delta spec for behavior. The root try page wraps three public lazy demos in a private `Deferred` gate and different maximum widths. That gate waits for engagement, so a visible example does not start on its own. Current CLI ends at a blocked patch; harness prints only the two-line offline SDK example. The shared package already has cancellable generators, injected clocks, external-store snapshots, native product views and public viewport and reduced-motion hooks.

The current root try route uses 87.4KiB JavaScript, 13.3KiB CSS and 6.8KiB HTML gzip. Its fixed limits are 95KiB JavaScript, 14KiB CSS and 30KiB HTML. LCP must remain at or below 1.2 seconds and CLS below 0.05 on the existing mobile profile. Shared island limits remain 40KiB gzip, with 14KiB initial cost above React. Measure the direct lazy entries before accepting a larger initial bundle.

## Goals / Non-Goals

**Goals:** Let visitors watch complete tasks in familiar product interfaces, with consistent geometry and quiet controls. Keep static HTML useful, browser work bounded and the public copy clear.

**Non-Goals:** Change product runtimes, add provider connections, create installers, restore home preview slideshows or build another design system.

## Decisions

### Shared ownership and public contracts

`ejm-ui/packages/demos` owns playback, viewport geometry, controls, lazy enhancement, native presentation, recorded scenarios and lifecycle tests. `ejmlabs` imports `LazyCliShowcase`, `LazyIdeShowcase` and `LazyHarnessShowcase` through the existing public per-product lazy entries. The old `Lazy*Demo` names remain compatibility aliases. Root's try page no longer routes these through its private engagement gate. CLI, IDE and harness consumers adopt the same shared exports under their own site changes. No private sibling source imports or copied playback engine.

`ejm-ui/packages/tokens` owns the native neutral ramp used by the IDE adapter. The public site `window.css` export must generate these existing variables from `theme.json` alongside semantic variables. The first dark-theme matrix exposed missing ramp variables and inherited dark text on a dark canvas. Fix that shared export rather than copying colors into the site or importing the app's dark-default root theme. Rebuild all four consumers and measure CSS against their existing limits.

### Static first, lazy playback

Retain completed native views in prerendered HTML and reserve the same frame for the enhanced run. Keep renderer and scenario code out of the initial browser bundle where needed through the shared lazy owner's SSR handoff. Loading and autoplay are separate: a nearby frame can load, but progression starts only while visible. A no-script visitor still sees a meaningful example and working project links.

The mobile gate also counts playback loaded near the first viewport. The first implementation transferred 103.0KiB of JavaScript on `/try/`, despite its 86.9KiB initial import graph. Split scenario and frame data into product-specific leaf modules, remove unused interactive CLI controller imports, and keep the public barrels compatible. That reduced actual transfer to 96.6KiB, still above the unchanged 95KiB limit. Generate the CLI playback sequence from the checked headless engine so the browser does not need source-file and patch machinery. Retain the public engine and compare every recorded state and timestamp with it. Use the existing cancellable clock and one authored workflow, with no loading delay or engagement gate added to pass the budget.

### Motion and resource use

The focal sequence is a task moving from investigation to an observable result. Output advances at a readable pace, with pauses for code, tool calls, diffs and summaries. Reuse the existing cancellable clock instead of adding an animation dependency. A finite run holds its last state; it has no loop timer. Manual pause covers orchestration and stream delays. Offscreen or hidden documents suspend work, and reduced motion presents the completed state. Restart cancels the prior run before resetting it.

### Spatial structure

Each project heading and task description lead into one common stage, then a compact row with Pause or Resume and Restart. The native view is passive and receives no focus, but its visible text remains available to readers. The product keeps its own chrome. Shared geometry uses a landscape desktop frame and a taller phone frame for all three, with native text sizes retained. Product adapters choose useful visible content rather than shrinking the entire desktop to unreadable text.

### Source-backed workflows

CLI starts with fixed write and shell grants and uses an actual minimal Harbor fixture to record a deterministic retry fix, boundary tests and diff checks. It has no invented review command. Edi uses its real read, search and automatically reviewed write tools; it does not claim to execute tests through a nonexistent shell tool. Harness stays a plain SDK terminal and records actual offline events, tool queue admission and bounded retained history. Reservations are labelled as reservations. Fixture source and output provenance stay in the shared owner; browser playback performs no tool or model requests.

### Public copy and docs

Use task descriptions and watch actions. Replace the root home section, try intro, Projects action, privacy fact and metadata that describe the old interactive behavior. Keep the short example/no-model disclosure outside native surfaces. Update root's source guide and each product's affected public guide. The main home remains text and project links, without previews.

## Risks / Trade-offs

- Three fallback renderers can exceed the initial JavaScript budget. Preserve server markup in the shared lazy owner and measure the final route without raising limits.
- A fixed desktop viewport can hide useful content on phones. Use a common taller phone viewport and verify actual text, outcomes and overflow in both themes.
- Pause can leave later prompts running. Cover orchestration and engine output with one cancellable clock and test restart, visibility, manual pause and disposal.
- Attractive output can imply unsupported product behavior. Ground commands and results in recorded fixtures and current native sources, with concise disclosure in page copy.

## Migration Plan

Build and check the shared owner, then the root and three product consumers. Review one batched phone and desktop pass in both themes, fix concrete defects together and confirm once. Freeze each checked build, record current Worker versions for rollback, publish under the standing user authorization and compare live pages/assets with those builds. Record identities, playback proof and unrun checks before syncing specs and archiving each completed site change.
