# Proposal

## Why

The owner wants every ejmlabs site, component and design to be fast, small and beautiful, built on React, Tailwind and shadcn/ui, with TypeScript throughout, and judged the current container-based look "ugly and dated". The present kit is hand-written CSS parts and vanilla scripts inside the `ejmlabs` repo. It works, but it cannot grow into a real component system: there are no typed components, hooks, layouts or views, each project site copies loose files, and the visual language is the wrong one. A dedicated `ejm-ui` repo, built on the owner's chosen stack and a new containerless design language, becomes the single source for every site and application.

The earlier change `raise-visual-bar` set the quality bar and produced useful parts (symbol art generator, docs behaviors, quality rubric, product window content), but its CSS-parts architecture and container look are being replaced. This change supersedes its unfinished groups.

## What Changes

- **New repo `ejm-ui`** (local at `~/Desktop/ejm-ui`, same pattern as `ejm-cli`, `ejm-ide`, `ejm-harness`). It holds tokens, the Tailwind v4 theme, shadcn/ui components on React, framework-neutral headless logic, hooks (composables), layouts, views, the symbol art, demos and a gallery site that is built with itself.
- **Stack.** Strict TypeScript, Vite, real React 19 (no Preact, no compat layer), Tailwind CSS v4, shadcn/ui copied-in source components with Radix where needed. One runtime everywhere: sites, the gallery and the IDE app.
- **Cross-platform components.** The same system reaches every GUI type: web (React), the Tauri desktop app (the same React components), terminals in TypeScript (Ink, React for terminals) and Rust terminals (a `ejm-tui` ratatui crate). A framework-neutral `@ejm/core` holds the shared state machines, component contract (props and states) and tokens, and a parity check keeps the targets aligned.
- **Site runtime.** All four sites (ejmlabs.com, cli, ide, harness `.ejmlabs.com`) become Vite and React single-page apps. Every route is prerendered at build time to static HTML, so first paint needs no JavaScript and hydration is cheap. Each route has explicit byte budgets.
- **Design language: containerless editorial** (owner decision). No cards, panels, rounded tonal boxes or Sage hero slab. Structure comes from display type, whitespace, hairline rows and full-bleed tonal bands. Product windows float with depth on the page. Sage leads as page tone, Forest stays under 10 percent. Brand fonts and palette are unchanged.
- **Motion.** Entrance, scroll reveal, route transitions (View Transitions API) and micro-interactions, built from CSS and Web Animations, transform and opacity only, with reduced motion respected.
- **Authentic demos.** Simulations follow current product layouts and supported controls, with no demo-only toolbar, prompt chips, fake window chrome or invented harness dashboard. Page copy states that data is scripted and no model is called. IDE captures should show useful activity in the actual assistant panel, including tool calls and edits.
- **Calm motion.** The hero's project crossfade is the focal sequence. Native View Transitions preserve continuity on page and theme changes, with small control feedback, reduced-motion support and no delayed first-paint content or new animation package.
- **Carried over, not rewritten:** brand assets and tokens, `ui/theme.json` as the single color source with its generators (Rust `ejm_theme.rs`, Monaco themes, terminal schemes), the TUI helpers, `scripts/build-art.mjs`, analytics site tokens, the `_headers` policy, demo scenario data, `QUALITY.md`, the critique process and `shoot.mjs` matrix checks.
- **Replaced:** `design-kit/web/parts/*.css`, `web/*.js` and the hand-written catalog pages. The old kit is kept read-only until the sites have migrated, then removed.
- **BREAKING:** every class name and page in the old web kit goes away. The three project sites must be rebuilt on `ejm-ui`. The IDE desktop app adopts the tokens and components, as it already runs React.
- Website publication is authorized by the owner's 2026-10-19 request after the requested fixes pass their checks. Publishing packages, creating remotes and pushing still need separate approval.
- **Local commit prerequisites.** Run normal repository hooks against isolated site candidates. CLI and harness lockfiles need only two compatible TLS patch updates, `rustls-webpki` 0.103.16 and `webpki-root-certs` 1.0.10, to satisfy the current dependency audit. Preserve unrelated native work, package interfaces and site byte limits.
- Correct the harness deadline test's cleanup ordering with its existing public idle barrier and a bounded wait. Keep its deadline and no-persistence assertions and all production behavior unchanged.
- **Authorized website publication, 2026-10-20.** Build the four canonical sites from the reviewed local commits with shared UI `2c2ee13`, run deployment dry runs, publish their existing Workers and verify live routes and assets. Preserve native work, private storage, alternate-origin settings and the recorded harness guide-reference limit. This does not publish packages or native releases.
- Correct IDE public guide links that point to absent, uncommitted governance and platform files before its publication. Use existing committed source destinations or plain availability notes. Preserve the unchanged canonical-source link validator and keep native and governance implementations outside this fix.
- Anonymous release checks now confirm that all five source repositories are public. Remove obsolete source-access warnings from studio, CLI and IDE content before completing publication, while retaining accurate installer and package availability limits.
- Fix the shared SSG router's cross-route fragment navigation: guide links must land on their requested heading when the destination uses server-only prose. Keep the fix in ejm-ui, then rebuild and verify all four consumers within their existing limits.

## Capabilities

### New Capabilities
- `ui-package`: The `ejm-ui` repo, its packages, token pipeline, Tailwind theme and consumption by sites.
- `site-runtime`: Vite and React SPAs with build-time prerendering, routing, transitions, analytics, theme persistence and byte budgets.
- `component-library`: shadcn/ui components on React, hooks and layouts, accessible and themable.
- `cross-platform-components`: Strict TypeScript components and a headless core shared by web, desktop, Ink and Rust terminal targets, with a parity gate.
- `containerless-design-language`: The visual language: bands, rows, display type, hero, product windows, depth, art and motion.
- `docs-and-product-views`: Docs layout and behaviors, product window views and interactive demo islands.
- `app-and-terminal-surfaces`: Dashboard, chart and state components for applications, and terminal parity, from one theme source.
- `quality-gates`: The rubric, critique, budgets, matrix and accessibility checks that keep the result honest.

### Modified Capabilities

None. `openspec/specs/` has no existing capabilities.

## Impact

- **New code:** the `ejm-ui` repo (packages, gallery app, scripts, tests).
- **Changed code:** `site/` in this repo becomes the ejmlabs.com Vite and React app; `design-kit/` is frozen, then retired; the project repos' `site/` or `website/` folders are rebuilt on `ejm-ui` in their own sessions.
- **Dependencies added:** `react`, `react-dom`, `wouter`, `@vitejs/plugin-react`, `vite`, `ink`, `ratatui`, `tailwindcss`, `@tailwindcss/vite`, `class-variance-authority`, `tailwind-merge`, `clsx`, Radix primitives where a native element is not enough, `lucide` icons (tree-shaken), `vitest`. No animation library by default.
- **Systems:** Cloudflare Workers static assets for each site stay as they are. Analytics tokens and headers carry over.
- **Risk to existing work:** only checked website builds replace the existing canonical deployments; retain prior deployment identities for rollback.
