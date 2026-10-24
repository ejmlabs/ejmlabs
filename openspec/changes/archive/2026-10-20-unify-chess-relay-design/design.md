# Design

## Context

See proposal.md. Primary ejm-ui has the released strict site recipes and existing
uncommitted application/native-profile work. Chess consumes an older isolated
UI sibling with additional board, clock, disclosure, radio, prose, table and
identity contracts. Relay consumes the primary public static HTML profile.
Both product trees contain substantial existing uncommitted work.

## Goals / Non-Goals

Use the established ejmlabs visual world throughout both products. Put all
spacing, type, control, responsive and motion choices in ejm-ui. Keep Chess
centered on play and Relay centered on sessions and output. This is a local UI
migration, without changing public admission, authentication, chess rules,
server clocks, Stockfish, Noise, privacy policy, billing or deployment.

## Decisions

### Shared owner first

Selectively port missing public Chess contracts into primary ejm-ui. Retain its
newer header, typography, control and site recipes. Preserve the existing lazy
cm-chessboard adapter and piece assets instead of writing a board engine. Merge
additive table behavior without regressing existing loading/density contracts.
Keep Chess undiscoverable in unrelated site navigation while launch is closed.

Extend the public layout family with fixed application flow, grouping, form,
field, action, section, game workspace, player strip, board placeholder and move
history recipes. Props describe content, DOM identity, accessibility and state;
they do not accept consumer classes, styles or design settings. Existing
SiteLayout/Header identity and application SectionHead remain the shell.

Chess owns `src/site.tsx`, pages, the thin board adapter, replay and operations
composition. Replace local CSS and visual JSX overrides with those exports.
Relink its declared file packages to primary UI only after required contracts
exist. Keep React 19 and the current SSG router.

### One Chess identity source

Compare the existing Studio, CLI, IDE, Harness and Relay marks before drawing
the Chess replacement. Use their geometric construction and restrained shapes,
with an identifiable Chess silhouette. Review the mark beside that family at
header and favicon sizes. ejm-ui owns the canonical source, themed variants,
favicon output, public asset paths and generation checks. Consumers keep their
existing public asset imports. Keep the name and closed launch visibility.
This changes the project mark, not the retained chess piece set.

### Native parity without another runtime

Relay stays on the existing public `@ejm/ui/static.css` contract. Align native
header height/artwork, application titles, form rhythm, workspace proportions
and entrance motion with the canonical shared tokens and React recipes.
Existing control recipes remain the common button/field authority. Relay owns
only its semantic page templates, route content and controller event wiring.
Generated CSS stays in UI, not a copied consumer stylesheet.

Keep Relay's system theme, no browser storage, no analytics, no-JavaScript
privacy forms, strict CSP, tab-only keys and account-gated controller assets.
Do not import a site cookie/theme adapter. Streaming text keeps stable nodes;
entrance motion occurs once per discrete arrival. Motion uses transform and
opacity, short shared durations, and an immediate reduced-motion final state.

### Enforcement and verification

Apply the existing public React design guard to Chess's full source tree. Add
a public native-template ownership check and wire it into Relay's build. Use
existing parsers/dependencies or small product-specific adapters; add no runtime
dependency for presentation. Test actual drift failures, not incidental copy.

Retain Chess's 180/20 KiB application and 95/14 KiB guide JS/CSS limits, 70 KiB
fonts and 30 KiB HTML. Retain Relay's 14 KiB CSS, 70 KiB fonts, 23,062 raw-byte
controller JavaScript, 1.5 MiB production WASM and 32 KiB Worker gzip growth
limits. Measure both light/dark desktop/phone layouts and reduced motion.
Run focused UI/consumer checks and normal builds. Do not rerun sustained chess
qualification for presentation-only changes or claim native/production proof.

## Risks / Trade-offs

- Diverged UI trees: port only named contracts and prove public export resolution.
- Broad product WIP: snapshot touched files/index and preserve domain changes.
- Workspace overflow: verify board, moves, output and composer at phone widths.
- Privacy regression: retain native forms and existing security/asset tests.
- Bundle growth: keep boards lazy, native Relay runtime unchanged and budgets fixed.

## Migration Plan

Capture current source and asset baselines. Extend shared contracts, adopt in
consumers, run guards/types/focused tests/builds/budgets, then inspect both
products together in a bounded desktop/phone and light/dark browser pass. Fix
observed defects as one batch and confirm once. Update public developer guides
and adoption docs. Sync the new UI requirements and archive verified work.
Retain patch/evidence records so only this design change can be reversed without
discarding existing product work. No publication is included in this change.
