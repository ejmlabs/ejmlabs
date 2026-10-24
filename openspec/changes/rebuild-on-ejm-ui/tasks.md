# Tasks

## 1. Repo and toolchain

- [x] 1.1 Create `~/Desktop/ejm-ui` as a git repo (local only, no remote) with an npm workspace (`packages/tokens`, `packages/ui`, `packages/demos`, `apps/gallery`, `scripts`), strict TypeScript, Vite, React 19, Tailwind v4 and Vitest; verify `npm install` and `npm run build` succeed on a clean clone
- [x] 1.2 Add `README.md`, `AGENTS.md`, `LICENSE` and `CONTRIBUTING.md` matching the other ejm repos' pattern, and root scripts `build`, `test`, `check`, `dev`; verify `npm run check` runs and exits 0 on the empty workspace
- [x] 1.3 Configure Vite, Vitest and TypeScript for React 19, and verify a test that renders a component using a `forwardRef` and a Radix primitive passes

## 2. Tokens, theme and carry-over

- [x] 2.1 Move brand assets (logos, motifs, icons, favicons, social, WOFF2 fonts) and `theme.json` into `packages/tokens` with their provenance, and verify file hashes match the sources in `design-kit/`
- [x] 2.2 Move the generators and make them emit CSS variables, a Tailwind v4 `@theme` file, Rust `ejm_theme.rs`, Monaco themes and terminal schemes, with a `--check` mode; verify two runs are identical and `--check` fails after an edit to `theme.json`
- [x] 2.3 Port the contrast gates (text 4.5:1, control border 3:1, focus 3:1, on-primary 4.5:1) and verify they pass for both themes and fail on a bad color
- [x] 2.4 Write `packages/ui/src/styles.css` with the Tailwind theme, fonts (WOFF2 with metric-matched fallbacks), the dark theme and the three elevation tokens, and verify the built CSS stays under the 14 KB gzip budget
- [x] 2.5 Move `build-art.mjs`, `check-art.mjs` and the generated art into `packages/ui` and verify `--check` passes and every color is a brand color

## 3. Component foundation (shadcn/ui on React)

- [x] 3.1 Set up `components.json` for the workspace and copy in button, input, textarea, select, switch, checkbox, badge, separator and tooltip; verify each has a render test and a keyboard test
- [x] 3.2 Add tabs, dialog, menu and toast, using native elements where they replace a primitive, and verify keyboard behavior, focus return and live announcements in tests
- [x] 3.3 Add table, code block with copy, callout (left rule and text label), theme toggle, header, footer and external link, and verify roles, 44px touch targets and contrast in both themes by script
- [x] 3.4 Write `COMPONENTS.md` listing every component, its primitive (Radix or native) and reason, and verify every component in `packages/ui` is listed by a script

## 4. Containerless layout language

- [x] 4.1 Build `Band` (Paper, Mist, Sage, Ink), `SectionHead`, `Rows` and `Row`, `Facts`, `Stat` and the display type scale, and verify at 375px and 3440px with a script that display sizes are within range and nothing wraps to a single orphan word
- [x] 4.2 Build the type-led `Hero` with a reserved slot for floating product windows, and verify no panel or slab renders and the hero reflows from 320px to 5120px
- [x] 4.3 Build `ProductWindow` with the three elevation levels and the simulated label, and verify only windows, menus and overlays have a shadow by a computed-style script
- [x] 4.4 Add a check that fails if a card, panel or tile component or class exists in `packages/ui`, and verify it fails on a test fixture that adds one
- [ ] 4.5 Verify Sage covers about 30 percent, Paper and Mist about 60 and Forest under 10 on the gallery home by sampling a screenshot, at laptop and ultrawide sizes

## 5. Hooks, motion and layouts

- [x] 5.1 Write hooks for theme, media and container queries, reduced motion, in-view reveal, clipboard and hotkeys, and verify each with unit tests
- [x] 5.2 Build reveal, staged entrance and micro-interaction primitives (CSS and Web Animations, transform and opacity only), and verify under reduced motion that every element is in its final state with no animation
- [x] 5.3 Build route transitions with the View Transitions API and a CSS fallback, and verify focus moves to the page heading and no "transition skipped" console errors appear
- [x] 5.4 Build `SiteLayout`, `DocsLayout` and `AppShell` layouts, and verify a route built only from layouts, views and components needs no new CSS file

## 6. Product views and demos

- [x] 6.1 Move the demo scenario JSON into `packages/demos` and build the static ejm-cli, ejm-ide and ejm-harness product views from it, and verify every command and tool name appears in that product's README by script
- [x] 6.2 Build the lazy interactive demo islands (cli, ide, harness) with the simulated label and no network use, and verify the demo code is absent from the initial bundle and loads on approach
- [x] 6.3 Build the product hero composition with the staged entrance under 1.2 seconds, and verify reduced motion and no-script show the final layout

## 7. Docs

- [x] 7.1 Build the docs layout (sidebar, 68ch reading column, contents) with phone controls, and verify no overflow at 320px and 5120px
- [x] 7.2 Build scroll-aware contents, language tabs, copy buttons, sidebar filter, parameter tables and previous and next links, and verify by keyboard that each works and announces its result
- [x] 7.3 Write the flagship docs content for `ejm-ui` itself (getting started, tokens, components, theming, checks), and verify it with scripts disabled and in dark mode

## 8. App and terminal surfaces

- [x] 8.1 Build the dashboard (stat figures, chart, hairline table, activity list) and verify no overflow at 375px and 3440px
- [x] 8.2 Build chart primitives with a text legend and table alternative on the six hue roles, and verify the legend and values are in the document text
- [x] 8.3 Build empty, loading and error states for lists, tables and panels, and verify each shows a sentence and one action where one exists

## 9. Gallery site

- [ ] 9.1 Build `apps/gallery` with prerendered routes for home, every component, tokens, motion, art, product views, demos and docs, and verify every route builds to static HTML that renders with scripts disabled
- [x] 9.2 Add analytics, the shared head, theme boot script and security headers, and verify the head, toggle placement and external-link checks pass on every route

## 10. ejmlabs.com on ejm-ui

- [x] 10.1 Rebuild `site/` in this repo as a Vite and React SPA on `ejm-ui` with prerendered routes (home, projects, try it, studio, brand kit, privacy), and verify `npm run build` and the site tests pass
- [x] 10.2 Verify the home meets the budgets (JavaScript, CSS, fonts, HTML) and the performance check prints each route against its budget
- [x] 10.3 Verify the toggle, cookie, analytics, headers and external links behave as on the live site, with the theme persisting to a second local origin on the same cookie domain test

## 11. Project sites and the IDE app

- [x] 11.1 Write the adoption guide in `ejm-ui` (`ADOPTION.md`, proven with a tarball consumer); no live sessions exist for `ejm-cli`, `ejm-ide` or `ejm-harness`, so the migration agents in 11.2 use the guide directly with local commits only
- [ ] 11.2 Rebuild the ejm-cli, ejm-ide and ejm-harness sites on `ejm-ui` in their repos with local commits only, and verify each builds, passes the route checks and meets the budgets
- [ ] 11.3 Adopt the tokens and components in the ejm-ide app without changing its runtime, and verify `npm run verify` passes there

## 12. Quality gates, performance and critique

- [x] 12.1 Move `QUALITY.md` into `ejm-ui`, extend it with performance, and move `shoot.mjs` into `scripts/`; verify the rubric covers all nine dimensions as checkable statements
- [x] 12.2 Build the performance check (HTML, CSS, JavaScript and font sizes, LCP and CLS under throttled mobile) and the budget gate, and verify it fails when a budget is lowered below the current size
- [ ] 12.3 Run the full device matrix from 320px to 5120px in light and dark on every gallery route and on the ejmlabs.com routes, and verify zero overflow and zero small touch targets
- [ ] 12.4 Run the critique against Anthropic and Stripe at the same sizes, fix the top findings and record the date and results; verify every finding is closed or explained
- [ ] 12.5 Review every new visual for imitation of a reference's layout, imagery or text and record the check; verify the critique file lists it

## 13. Retire the old kit

- [ ] 13.1 After 10 and 11 pass, remove `design-kit/web` and the old checks from this repo, keep what moved, and verify nothing in `site/` or `scripts/` references them
- [ ] 13.2 Update the READMEs and the OpenSpec state: mark `raise-visual-bar` as superseded, and verify `openspec validate --strict` passes for the remaining changes

## 14. Cross-platform components

- [ ] 14.1 Build `packages/ssg`, the small prerender package (client and server bundles, `react-dom/server`, static HTML per route, `hydrateRoot`, wouter routing with focus moved to the page heading), move the gallery onto it, and verify the built gallery home has under 95 KB gzip of initial JavaScript and renders with scripts disabled
- [x] 14.2 Build `@ejm/core` (state machines, the component contract of props and states, formatting) as strict TypeScript with no framework dependency, and verify its tests run in plain Node
- [x] 14.3 Type-check strictly across every package and app, and verify `npm run check` fails on an injected type error and passes after it is reverted
- [ ] 14.4 Adopt `@ejm/ui` in the ejm-ide app under its own React 19 with no adapter, and verify `npm run verify` there passes with a component from `@ejm/ui` rendered
- [x] 14.5 Build `@ejm/ink` with the terminal primitives and states from the generated theme, and verify tests pass and every state reads under NO_COLOR
- [x] 14.6 Build `crates/ejm-tui` (move `ejm_tui.rs`, add widgets and the same states, no box frames), generate its theme from `theme.json`, and verify `cargo test` passes including NO_COLOR
- [x] 14.7 Build the parity check comparing the component contract with the web, Ink and Rust catalogs, and verify it fails when a state is removed from one target

## 15. Real product shots

- [x] 15.1 Build the terminal capture tool (`scripts/capture-terminal.mjs`): runs a real command in a pseudo-terminal at a fixed size, records the ANSI output, renders it with a terminal emulator in headless Chrome using IBM Plex Mono and the product's terminal color scheme, in dark and light, and writes PNG with a metadata JSON; verify it reproduces a known command's output exactly (text compare against the PTY transcript)
- [x] 15.2 Capture ejm-cli from the real release binary (an offline replay session that shows a read, a blocked write and the grant notice, using only documented commands) and ejm-harness from its real examples (a session run with the event journal and governor output), light and dark; verify each metadata file records the binary version or commit and the exact command, and the text matches the documented behavior
- [x] 15.3 Capture the ejm-ide desktop app window from the running app (actual dark launch state with editor and project tree, without assistant activity; no chat illustration exists); verify the metadata records the app version or commit and the capture date
- [x] 15.4 Build `ProductShot` (picture element with AVIF, WebP and PNG sources, explicit width and height, dark and light variants that follow the theme, caption with version and date, optional window shadow only if the capture has none) and the image optimization step, and verify the shots weigh within budget and the hero image is preloaded
- [ ] 15.5 Replace the simulated windows used as product imagery (gallery, ejmlabs.com, cli, ide and harness sites) with shots, keep the live demos labelled as simulated, and verify with a script that no page shows a simulated window as product imagery
- [x] 15.6 Add the shot honesty check (metadata present, version or commit matches the product source, date recorded), and verify it fails when a shot's version is stale
- [ ] 15.7 Capture a useful native IDE session with actual assistant chatter, tool calls and edits through a supported product path; record the command, source, date and any deterministic local-provider limit in provenance, optimize the images and verify consuming sites

## 16. Authentic simulations

- [x] 16.1 Remove demo-only shells, pause/reset bars, activation buttons and prompt chips from shared static views and islands; retain a quiet scripted-data disclosure in the consuming page copy
- [x] 16.2 Match CLI terminal hierarchy, composer and supported slash-command interactions to the actual CLI source; verify a read and blocked write still run through the local scenario
- [x] 16.3 Match IDE workspace, editor and assistant panel to current native source; show useful tool activity and edits without invented Accept/Reject controls or a full-app dependency
- [x] 16.4 Replace the invented harness dashboard with source-derived SDK/journal terminal output and documented example interactions
- [ ] 16.5 Update demo docs, scenario honesty checks and affected consumers, then verify lazy loading, no network calls, keyboard use, responsive layout and unchanged size limits

## 17. Calm continuity

- [x] 17.1 Add a native theme crossfade with immediate fallback and reduced-motion bypass; verify preference persistence and skipped-transition recovery
- [ ] 17.2 Ease page transitions and control feedback around the hero's project crossfade without hiding first-paint content, adding a package or exceeding current budgets
- [ ] 17.3 Update motion guidance and verify keyboard use, repeated switching, reduced motion and representative mobile timing

## 18. Shared site audit, 2026-10-20

- [x] 18.1 Audit the four active sites and gallery against public ejm-ui contracts; record local visual and interaction implementations and their upstream owners
- [x] 18.2 Extend public UI contracts for brand lockups, hero options, route-aware rows and package-owned site CSS sources; preserve themes, accessibility and byte budgets
- [x] 18.3 Consolidate Markdown compilation and docs rendering in ejm-ui packages; keep product content and link policy local, with live navigation, code copying and tabs around static prose
- [x] 18.4 Replace consumer static wrappers, branding, hero overrides, private source scans and local docs controls; remove unserved copied IDE design files and use public shot metadata
- [x] 18.5 Update shared adoption guidance and affected site guides, run owner and consumer checks, then inspect desktop and phone routes in both themes

Evidence: [site audit](site-audit-2026-10-20.md). Only the ui-package main spec
was synced for this pass. The broader change remains active for its unfinished
native app and device-matrix work. Local commit work resumed after the audit;
publishing remains outside this checkpoint.

## 19. Local commit checkpoint, 2026-10-20

- [x] 19.1 Record scoped local commits for shared UI, studio and all three product sites; preserve unrelated native, governance and video work and existing staged hunks
- [x] 19.2 Apply only the compatible rustls-webpki 0.103.16 and webpki-root-certs 1.0.10 lockfile updates in CLI and harness; run unchanged normal hooks serially and record exact candidate check limits
- [x] 19.3 Fix the harness deadline test's ordering with its existing bounded idle barrier; preserve deadline and no-persistence coverage, run the focused test and normal hook, and keep unrelated native edits intact

## 20. Authorized website publication, 2026-10-20

- [x] 20.1 Build the studio, CLI, IDE and harness sites from the reviewed commits with clean shared UI 2c2ee13 and locked web dependencies; record candidate checks, byte limits and the known harness guide-reference gap
- [x] 20.2 Verify the four existing Worker targets, prior versions and unchanged bindings and alternate-origin settings; run dry runs and publish only the approved website builds
- [x] 20.3 Verify every published route and required asset over HTTPS, both studio downloads, IDE metadata and invalid-download behavior, and live headers and alternate-origin settings; record Worker versions and preserve unrelated work
- [x] 20.4 Correct IDE home and guide links to absent source files in a focused content commit, mark unfinished release tooling as planned, preserve explicit anchors and the unchanged validator, and rebuild before IDE publication
- [x] 20.5 Remove obsolete private-source notices from studio, CLI and IDE after verifying anonymous access to all five repositories; retain unpublished installer and package limits, commit only scoped content and owner records, and rebuild and publish the corrected sites
- [x] 20.6 Fix and verify cross-route fragment navigation into Static prose in ejm-ui, update the public routing contract, commit scoped owner work, rebuild all four consumers within existing limits, reproduce the fixed IDE link in the browser, and publish and verify the final builds

Publication evidence and remaining limits are recorded in
[site-publication-2026-10-20.md](site-publication-2026-10-20.md).

## Workflow follow-up

- Creating a GitHub remote, pushing and publishing packages still need separate owner approval. On 2026-10-19 the owner authorized website deployment after the requested copy, design and behavior fixes pass their checks. Product and package releases are not included.
- Review and archive the change after the sites migrate.
