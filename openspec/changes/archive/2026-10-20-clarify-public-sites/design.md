# Design

## Context

See proposal.md and the accepted site-rules-review-2026-10-20.md for findings. All repositories contain prior work. Save source and index baselines, assign each owner a separate scope, and preserve unrelated changes. The Studio repository holds the coordinated plan, as it does for the earlier shared-site and Chess changes.

## Goals / Non-Goals

Goals: make a visitor's next step clear, apply the public ejm-ui design boundary to every reviewed surface, and preserve required product facts and account protections.

Non-goals: provider or game-runtime changes, paid transactions, new dependencies for native rendering, repository publication, or production deployment.

## Decisions

1. Make the existing @ejm/site/vite guard unconditional. Remove its opt-in option instead of adding another policy toggle. Keep the shared owner's existing internal gallery boundary. Consumers remove obsolete options and consume public exports.
2. Keep public copy local. Remove repetition, group actions by intent, and put setup branches before commands. Preserve accurate release limits and revise repository access claims using signed-out evidence. Historical recordings cannot establish current runtime support.
3. Keep Harness playback a terminal. Format values from retained recorded output and retain the raw recording and provenance. Use one nearby disclosure per playback. Do not invent a dashboard or rerun unsupported providers.
4. Use @ejm/ui/static.css, public fonts and token artwork for native registry pages. Keep authored static source separate from generated copied assets, validate both source and representative documents through @ejm/site/native, and use existing DOM APIs without raw HTML injection. Preserve form IDs and API contracts. Alternative React hydration adds no needed behavior and increases cost.
5. Relay serves sign-in HTML at 401 only for browser HTML requests; API requests retain JSON 401. Allow OAuth return only to exact configured-origin account, device, control and privacy paths without query or hash. Presentation reads existing local entitlement and consent state, adds no provider requests or new polling, and preserves trust and uncertain-action handling.
6. Chess hides closed choices and states availability once near the decision. Keep account requirements, optional recovery limits and clock warnings. Source improvements do not prove that its older live deployment changed.

## Owners and public interfaces

| Owner | Files and contracts | Downstream checks |
| --- | --- | --- |
| ejm-ui | @ejm/site/vite, @ejm/site/native, public UI components, demos and gallery | guard regressions, native contracts, gallery and demo budgets |
| ejmlabs | site content, discovery, Try and brand guidance | static routes, links, design guard and byte budgets |
| ejm-cli | site content and Relay host adapter | site gate, auth and state regressions, native guard and frontend budget |
| ejm-ide | website content and affected guides | site type, build, docs and static contracts |
| ejm-harness | site guides, registry native presentation and build | site gate, registry auth and static assets, native guard |
| Chess | existing React consumer and content | type, build, design guard and route checks |

## Risks / Trade-offs

- Existing dirty source can change during work: compare baselines and never reset, stage or replace unrelated changes.
- Short copy can conceal consent or recovery: retain those facts at the decision and test state-based visibility.
- Native registry assets can be blocked by the edge allowlist: extend only known same-origin public assets and verify auth remains required for API paths.
- Local file dependencies can hold old package snapshots: refresh them before consumer checks without raising budgets.
- Public source and local code may differ: describe current source revision and retain installer and registry-release limits.

## Migration Plan

Build shared packages first, refresh consumer file dependencies, run focused checks and inspect representative rendered routes in both themes and phone and desktop widths. Record measured bytes and unrun checks. Keep release gates separate. A later authorized deployment must verify canonical hosts and assets before claiming publication.
