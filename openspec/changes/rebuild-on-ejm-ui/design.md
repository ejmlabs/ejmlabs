# Design

## Context

Observed today:
- `design-kit/` in this repo is hand-written CSS parts (`web/parts/*.css` built into `site.css`), vanilla scripts (`theme.js`, `motion.js`, `analytics.js`, `demo.js`, `gallery.js`, `docs.js`), generators for color (`ui/theme.json` to CSS, Rust, Monaco, terminals) and art (`scripts/build-art.mjs`), shared checkers and a device-matrix tool (`scripts/shoot.mjs`).
- `site/` builds ejmlabs.com with a plain Node script into `site/dist` for a Cloudflare Worker with static assets.
- `ejm-ide` already runs React 19, Tailwind 4.3, Vite 8, Radix, `class-variance-authority` and a shadcn `components.json` (new-york style), with a separate `website/` Vite site. `ejm-cli/site` and `ejm-harness/site` are static Worker folders.
- Node 23.10 and pnpm are installed locally. `site/package.json` asks for Node 24.
- The owner chose: TypeScript, real React (streamlined, no Preact), Tailwind, shadcn/ui, Vite SPAs, a new `ejm-ui` repo, and both Ink and Rust terminal components. The owner also chose the containerless editorial direction.

Constraints: brand fonts Manrope and IBM Plex Mono, brand palette, Sage leads, no em dashes, 320px to 5120px, light and dark, accessibility 4.5:1, honest simulated visuals. Other sessions work on the project repos and on `public-repository-standards`; this change must not edit them without coordination.

## Goals / Non-Goals

**Goals:**
- One repo, `ejm-ui`, that is the system: tokens, theme, components, hooks, layouts, views, art, demos, gallery.
- Sites that are fast and small by construction, with budgets enforced by the build.
- A design that looks like a studio at the level of Anthropic and Stripe, in ejmlabs' own language.

**Non-Goals:**
- No npm publishing, GitHub remote creation or pushes. The owner's 2026-10-19 request authorizes website deployment after the requested fixes and checks.
- No new fonts, palette or brand guide changes.
- No React Native or native mobile targets.
- No copying of any reference's layout, imagery or words.

## Decisions

**1. Repo layout: an npm workspace** (pnpm was planned but the local pnpm shim is broken, and npm workspaces need no extra tool).
```
ejm-ui/
  packages/tokens   theme.json, brand tokens, generators (CSS vars, Tailwind @theme, Rust, Monaco, terminals)
  packages/ui       components/ui (shadcn source), hooks, layouts, views, styles.css, art
  packages/demos    scenario data and lazy demo islands (cli, ide, harness)
  apps/gallery      the gallery and docs site, built with the packages above
  scripts/          matrix, budgets, art, em dash and stale-file checks
```
*Alternative:* one package. Rejected: the tokens must be usable by Rust and the IDE without pulling in a UI framework.

**2. Vite and React SPA with a small prerender package.** `packages/ssg` builds the client bundle and a server bundle, renders every route with `react-dom/server`, writes static HTML per route, and hydrates on load with `hydrateRoot`. Routing is `wouter` (about 2 KB). First paint needs no JavaScript, and navigation is client-side with focus moved to the page heading. React Router framework mode was tried first: it gave about 110 KB gzip of JavaScript for an empty page, against about 71 KB measured for React alone plus a small router, so the smaller route was taken.
*Alternatives:* Astro islands (declined by the owner), React Router framework mode (too heavy), Preact (declined by the owner, who chose one real React runtime).

**3. Tailwind v4 with the theme in CSS.** Tokens become `@theme` variables generated from `theme.json` and brand tokens, so utilities, shadcn components and generated Rust and Monaco themes share one source. Dark mode follows a `data-theme` attribute and `light-dark()`. Only used utilities ship; the CSS budget is checked.

**4. shadcn/ui on React.** Components are copied-in shadcn source on React 19 with Radix where it earns its weight. Where a native element replaces a primitive (dialog, details, popover), the component uses the native element and records why. Each component gets a render test, a keyboard test and an accessibility check. The IDE app uses the same components with no adapter.

**5. Containerless editorial language, built as components.** Layout parts are `Band` (full-bleed Paper, Mist, Sage, Ink), `SectionHead`, `Rows` and `Row` (hairline, hover tone and arrow), `Facts`, `Stat`, `Hero`, `ProductWindow`, `Callout` (left rule and text label), `CodeBlock`. There is no card or panel component. Tags are plain mono text. Elevation exists only on `ProductWindow`, menus and overlays.
*Alternative:* keep a soft card. Rejected by the owner.

**6. Motion with no animation library.** CSS keyframes and transitions, the Web Animations API, `IntersectionObserver` reveal, and the View Transitions API for routes, all on transform and opacity, all disabled to the final state under reduced motion. A tiny library is added only if a measured need appears and the budget allows it.

**7. Performance budgets, enforced.** Initial budgets per route, gzip: JavaScript 95 KB (React and react-dom measured at about 71 KB, router, hydrate, theme, header; raised from 75 KB after the prerender package measured an empty React site at 71 KB), CSS 14 KB, two preloaded WOFF2 fonts under 70 KB total, HTML under 30 KB. Demo island 40 KB and code highlighting 20 KB, both lazy. Targets under throttled mobile: LCP at or below 1.2 seconds, CLS under 0.05. The numbers are the starting point and are tuned from measurement; breaches fail the build.

**8. Theme without a flash.** A tiny synchronous `theme-boot.js` (under 1 KB) reads the `ejm-theme` cookie (shared on `.ejmlabs.com`) and sets `data-theme` before first paint. It is an external file so the security policy keeps `script-src 'self'`.

**9. Carry-over assets move, not fork.** Brand assets, fonts (WOFF2), `theme.json` and generators, `build-art.mjs`, analytics tokens, `_headers`, demo scenario JSON, `QUALITY.md` and `shoot.mjs` are moved into `ejm-ui`. Anything moved keeps its checks. `design-kit/` stays read-only until sites migrate, then is removed in a final task.

**10. Consumption.** Sites depend on `ejm-ui` packages by version. Until a remote exists and the owner approves one, consumers install tarballs built with `npm pack` or a `file:` link, and an adoption guide documents both. The ejmlabs.com site in this repo is rebuilt first as the reference consumer. The cli, ide and harness sites are rebuilt in their own repos, coordinated with the sessions working there, with local commits only.

**12. Layers for every GUI type.** `@ejm/core` (framework-neutral, strict TypeScript: state machines, component contract of props and states, formatting) feeds four targets: web components (`packages/ui`, React, used by sites and the Tauri IDE app), `@ejm/ink` (React for terminals), and `crates/ejm-tui` (Rust ratatui widgets). Every target reads the generated theme tokens. A parity script compares the component contract with each target's catalog and fails on a missing component or state. Terminal groups use spacing and one rule, never box frames, and every state reads under NO_COLOR.
*Alternative:* one renderer for all. Rejected: Rust terminals cannot run React.

**11. Real product shots (owner decision, 2026-10-18: "we need real product shots not imitations").** Product imagery on every site is a real capture of the real product, never a drawn or re-created window. ejm-ide is captured from the running desktop app window; ejm-cli and ejm-harness are captured from real terminal sessions of the real binaries (run in a pseudo-terminal, ANSI output rendered by a terminal emulator with the product's own colors and font). Each shot carries metadata (product, version or commit, date, theme, how it was captured) and a caption, and a check verifies the metadata matches the current product source. Shots are optimized images (AVIF and WebP with a PNG fallback, explicit sizes, a preloaded hero image, lazy below the fold) counted in the performance budgets. The interactive demos remain simulated, and stay labelled as simulated; they are never presented as a screenshot. The earlier simulated static windows are replaced by shots wherever they stood in for product imagery.
*Alternative:* keep drawn windows labelled simulated. Rejected by the owner.

**11b. Authentic demos.** Product views use local scripted scenario engines and follow the actual product's layout, terms and supported controls. Remove demo-only pause/reset bars, prompt chips, fake titlebars and review actions absent from the real product. CLI keeps its terminal hierarchy and bordered composer. Harness shows real SDK/journal terminal output instead of an invented dashboard. IDE follows its current workspace and assistant panel through a narrow presentation adapter, rather than embedding the full app: the app entry alone measures 1,444 KiB gzip against the 40 KiB island budget. Page copy discloses scripted sample data and no model calls, without inserting badges or extra chrome into the product. Actual IDE captures should show useful agent activity and real tool calls and edits through a supported native session path, with honest provenance.

**11c. Calm continuity.** The hero's real capture crossfade is the focal sequence. Page navigation uses a short eased crossfade; explicit theme changes use the native View Transitions API with an immediate fallback and reduced-motion bypass. Row, button and navigation feedback supports an action, without repeated scroll reveals, continuous loops or first-paint text/image fades. Shared CSS and the existing theme control carry the work, with no new package and unchanged byte budgets.

## Risks / Trade-offs

- **React costs more than Preact** (about 55 KB more gzip) → lean router, prerendered HTML, lazy islands, and budgets that fail the build. If the owner later wants to trade back, only `packages/ssg` and the aliases change.
- **Drift between targets** (web, Ink, Rust) → one component contract in `@ejm/core` and a parity check.
- **SPA for "ultra fast"** costs more JavaScript than static pages → prerender every route, lazy everything heavy, hard budgets, and measure.
- **Radix and icons add weight** → prefer native elements, import icons individually, watch the budget on every component.
- **Big breaking change** → build `ejm-ui` and the ejmlabs.com site first; keep `design-kit` until sites migrate; no deploy without approval.
- **Subjective quality** → rubric, matrix, side-by-side critique and imitation review, repeated at the end.
- **Parallel work** → each package and app has one owner; shared files (workspace config, tokens) are done first by one agent.
- **Other repos' sessions** → project site rebuilds are coordinated by message and committed locally, not pushed.

## Migration Plan

1. Create `ejm-ui` locally with the workspace, tokens and Tailwind theme, and move the carry-over assets with their checks.
2. Build the component library, hooks and layouts, then the gallery site as the first consumer.
3. Rebuild ejmlabs.com in `site/` on `ejm-ui` with prerendering and budgets.
4. Rebuild the cli, ide and harness sites in their repos; adopt tokens and components in the IDE app.
5. Run the full matrix, performance report and critique; fix findings; review for imitation.
6. Retire `design-kit/web` and the old checks; archive `raise-visual-bar` as superseded.
7. Publish the checked websites under the owner's 2026-10-19 authorization, verify the canonical HTTPS routes and retain the previous deployment identities. Remotes and package releases still need separate approval.
Rollback: preserve the old kit and prior Worker deployments, and use the recorded deployment identities if a live website check reveals a regression.

## Shared site audit, 2026-10-20

The owner requested a review of every active site and adoption of ejm-ui for all
visual components and interactions. This pass completes the remaining site
adoption work, without changing product runtimes, video work or Git indexes.

- `@ejm/ui` owns brand rendering, hero variants, route-aware rows, site CSS source
  profiles, docs layout and controls. Page copy and composition remain local.
- `@ejm/site/docs` owns the Node-only Markdown compiler built on marked. It
  supports existing heading anchors, tables, nested lists, callouts and code
  tabs. Each product supplies source files, metadata and link resolution.
- `@ejm/ui/docs` owns the serialized docs model and renderer. Navigation and
  controls stay live around static prose. `@ejm/ssg` owns static markup and
  route-aware links; UI receives a static boundary through a public prop.
- `@ejm/shots` exposes Node-readable product metadata. Capture source validation
  stays with its owner, rather than consumer access to private sibling paths.
- Consumers import only public package exports. They do not scan private source
  folders, copy UI class strings, add theme rules or reach into Hero internals.

The four sites and gallery retain their existing byte limits. Shared control
tests protect copy lifecycle, live docs navigation, file downloads and route
links. Consumer checks protect routes, anchors and product content. Browser
checks cover narrow and wide layouts, themes, reduced motion and keyboard use.

## Local commit prerequisites, 2026-10-20

The owner resumed local commits after the site audit. Isolated candidates keep
the site's exact staged content and the repository's committed hook config.
Normal hooks remain required. Native checks run serially with two build jobs
and existing target caches to bound disk and CPU use.

Both CLI and harness baseline lockfiles failed the current RustSec audit for
`rustls-webpki` 0.103.15 and `webpki-root-certs` 1.0.9. Their owners applied
only the compatible 0.103.16 and 1.0.10 patch updates. Existing dependency
ranges, normal dependency sets and features stay the same. The root-certs
minimum Rust version rises from 1.70 to 1.71, below the projects' 1.89 floor.
No public API, site contract or new package is involved. Product verification
records explain why public setup and API guides need no change for these
lockfile updates. No performance improvement is claimed.

The harness deadline test assumes its lease has been released when the deadline
returns. The documented API allows active background work to finish afterward.
Use the existing public `governor.wait_idle()` barrier within a bounded Tokio
timeout before asserting zero running work. Keep the install deadline, error
and no-persistence assertions. This changes test synchronization only; product
guides and production code need no change.

Each owner records exact candidate checks, preserves unrelated staged hunks
and native edits, and integrates a successful commit without checking out
files over the working tree. The studio records the five local commit IDs.
Publishing, native feature commits and video work remain separate.

## Website publication, 2026-10-20

The owner explicitly requested publication after the five local commits. Export
the committed repositories into a temporary sibling layout, install their locked
web dependencies and build the studio, CLI, IDE and harness sites there. Shared
UI starts at `2c2ee13`, with only the verified fragment-navigation fix below added
before the final builds; no dirty native, governance or video source enters a build.
No registry package, native installer or source visibility change is required.

The clean IDE build exposed authored links to six absent source files in its
home and guides. The existing docs validator correctly rejects them. The IDE
owner will correct those links in authored public content and qualify references
to unfinished tooling, then create a focused local documentation commit. Keep
the validator unchanged, use only existing committed destinations, and rebuild
and recheck the candidate before IDE publication. Shared UI APIs and byte limits
stay unchanged; do not include untracked governance or native source.

Anonymous HTTPS checks during publication now return 200 for the studio, CLI,
IDE, harness and shared UI GitHub repositories. Studio, CLI and IDE still carry
old private-access notices. Their owners will remove those notices in focused
content commits and recheck the affected builds. Keep existing public source
URLs, setup anchors and contribution links. Retain accurate limits for unpublished
installers and registry packages. This changes content only, with no new shared
UI contract, native behavior, dependencies or byte limits.

Live browser checks reproduced an SSG navigation defect: the IDE home link to
the developer guide's contribution section reaches the correct URL but lands
below the section. A fresh direct visit and the same-page contents link reach
the heading correctly. The shared router renders an empty Static destination
before its fallback reload, after changing history and trying to scroll.
Fix cross-route fragment links in ejm-ui's public SSG owner before those steps,
using native document navigation. Preserve same-page fragments and ordinary
client navigation. Add focused coverage for a fragment destination with Static
prose, update public routing guidance, and rebuild and verify all four consumers
without adding dependencies or raising limits.

Each site owner supplies its content and existing Worker configuration. The
shared UI public contracts are unchanged. Only the four existing canonical
Workers are deployed, after dry runs and candidate checks. Preserve disabled
`workers_dev` and preview URLs. Keep the IDE's existing private release bucket
binding and verify metadata and invalid-download behavior without uploading an
installer or changing storage access. No gallery deployment is configured.

Record each source commit, build inventory, prior and new Worker version, live
route and asset result, response headers and relevant controls. Verify both
studio ZIPs and every changed route over HTTPS. Existing native hooks and local
browser reviews remain evidence from the commit checkpoint; do not repeat native
builds. The known two harness guide-reference failures remain visible and task
11.2 stays open. Keep unrelated work and staged blobs intact and retain release
evidence after removing temporary source and dependency exports.

## Earlier open questions

- The Ink target needs a Node runtime, so it ships for TypeScript tools only; the Rust crate serves ejm-cli and Rust tools.
- Which Node version is the target, 23 (installed) or 24 (as `site/package.json` asks)? The build assumes both work; the lockfile and CI choice is for the owner when a remote exists.
