# Design

## Context

All four sites already use public shared packages and import-only stylesheets. Drift remains in JSX utilities, Hero motion opt-outs, caller-controlled heading and brand sizes, arbitrary footer brand nodes, and demo note placement. Existing shared entry profiles and Static boundaries keep bytes low. See proposal.md for scope.

## Goals / Non-Goals

Goals: one visual authority, shared patterns for current content, an enforced consumer boundary, and the IDE's shared entrance on CLI and Harness.

Non-goals: native app UI, relay transport or auth, product-copy changes, publishing, and automatic changes to already deployed bundles. Shared source changes reach linked sites on rebuild and authorized publication.

## Decisions

1. ejm-ui owns the opinionated site surface. Hero has one visual and motion recipe. Section headings use semantic purposes instead of numeric size and layout choices. Header and footer accept structured identity, and shared Brand derives dimensions from placement. Site composition can still express content order, IDs, links, ARIA, product data, and state. Broad arbitrary style props are not a substitute for a missing component.
2. Reuse existing public layout, text, control, and demo APIs. Add a small public site-composition module for section bodies, columns, metrics, actions, text/link treatment, media, and metadata only where current markup needs it. Keep semantic patterns fixed in the library. Product-specific copy and release lookup stay in their sites. Preserve live demos outside Static and server-only prose within it.
3. The existing ejmSite plugin owns a default source-validation pass. Use Vite's public TSX parser and PostCSS's maintained CSS parser. Declare PostCSS directly in the owning Node-only package. Reject authored rules and local imports in consumer CSS, inline styles and style elements, visual className attributes, and opaque visual overrides. Permit only the public shared CSS imports, content-scan exclusion, and Static's literal structural contents wrapper. No per-site allowlist or disable flag. Library-owned gallery source may demonstrate internals; the starter models the strict consumer contract.
4. Do not parse source with a handwritten JSX or CSS parser. Tests exercise actual Vite build acceptance and rejection, aliases and namespaces, valid code examples, dev updates, and changed shared output. Validation is a maintainability gate, not a security sandbox.
5. The motion focal point is the existing shared Hero sequence: copy rises subtly while remaining painted, then actions and the useful product view enter. Existing route and theme transitions provide continuity. Controls keep shared feedback. No scroll animation blanket, new motion package, repeating sequence, or hidden default content is needed.
6. Ownership and direction: ejm-ui packages/ui owns component recipes, packages/demos owns playback presentation, packages/site owns consumer validation; ejmlabs owns studio content, each product owns its site and guides. Consumers depend on public shared exports. No private sibling imports or reverse product dependencies.

## Budgets and verification

Keep every current route limit unchanged: studio, CLI, and Harness JS 95 KiB, CSS 14 KiB, HTML 30 KiB and fonts 70 KiB; IDE retains its existing configured limits. No browser runtime dependency is added. Measure build time for the new source check and route transfer sizes after consolidation. Run affected shared types and behavioral tests, generated checks, all four site gates, and the starter and gallery checks affected by the public API changes. Native Rust and SDK gates have no changed contract and are outside this site-only change.

Review desktop and phone in both themes in one batch, including keyboard navigation, reduced motion, hero motion, demo controls, no-script content and footer identity. Fix concrete findings in one batch and confirm once. Preserve all unrelated work and staged bytes. No commit, push, or deployment is part of this change.

## Risks / Trade-offs

- Stronger contracts break permissive examples: migrate consumers, gallery, starter, tests and docs in the same change.
- Full JSX class rejection needs enough shared coverage: migrate all active site source rather than grant exceptions.
- Small existing JS headroom: use deep imports, retain Static, reuse recipes and trim shared code rather than raise budgets.
- SSR content could become hidden if motion depends on hydration: keep CSS-only entrances and final no-script/reduced-motion states.
- Concurrent source work: record scoped baselines and index hashes before edits, assign ownership, and preserve unrelated hunks.

## Migration Plan

Add and check shared contracts first, migrate all four sites and examples, enable validation, run the bounded review and gates, update adoption guidance, sync this delta, then archive verified local work. A later authorized release rebuilds and deploys affected sites together. Rollback restores source and rebuilds the prior recipes; there is no data migration.
