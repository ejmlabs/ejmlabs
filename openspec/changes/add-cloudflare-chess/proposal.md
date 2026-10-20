# Proposal

## Why

Create `chess.ejmlabs.com`: a small, dependable online chess game where people worldwide can find opponents and compete on global leaderboards. Chess players need a clear board, correct clocks and results, and a fair play process they can trust.

## What Changes

- Plan a separate `ejm-chess` product, hosted entirely on Cloudflare, with a responsive board, live human opponents, reconnects, game history, and PGN export.
- Require accounts for ranked games and allow guests to play casual games, as confirmed by the owner. Start with proposed 5+3 blitz and 10+5 rapid formats, separate ratings, and one worldwide leaderboard per format. Friendly invitations are unrated.
- Make the server authoritative for seats, legal moves, clocks, and outcomes. Use maintained chess, board, auth, and rating packages rather than writing replacements.
- Add layered fair play controls: abuse prevention, server records, postgame engine screening, farming checks, reports, private review, appeals, and rating compensation. The owner has confirmed they will review flags and appeals at launch. Do not promise that a browser game can prevent all engine assistance.
- Keep the interface focused on playing. Support touch, mouse, keyboard, underpromotion, reduced motion, and clear connection states.
- Reuse public `@ejm/*` contracts. Add upstream chess identity and an unreleased-project discovery gate; use existing public header/build options and extend them only for verified policy gaps. Retain product-specific game behavior in chess. Existing cross-site menus must not expose chess before verified publication.
- Publish product help, rules, fair play, privacy, and operations guidance with the product. Add studio discovery links only after their destinations are live and verified.

## Capabilities

### New Capabilities

- `chess-play`: Live chess, casual invitations, board interaction, authoritative clocks and adjudication, reconnects, and completed game records.
- `chess-competition`: Account eligibility, ranked matchmaking, ratings, settlement, and global leaderboards.
- `chess-fair-play`: Preventive controls, private engine evidence, review, appeals, rating repair, and bounded analysis operations.

### Modified Capabilities

- `ejmlabs-site`: Discover the chess product and use an accurate Play action without treating it as a coding tool or a simulated showcase.
- `documentation-discovery`: Link to chess-owned player and developer guides after publication.
- `public-web-access`: Extend public access and protected canonical-host requirements to `chess.ejmlabs.com`.

## Impact

| Owner | Planned responsibility and public contracts |
| --- | --- |
| New `ejm-chess` product | Game Worker and assets, game and competition Durable Objects, D1 auth and read models, background analysis, product guides. Consume published package exports through declared dependencies. |
| `ejm-ui` | `@ejm/site/projects` chess identity and discovery gating, existing public head/header policy options and any verified extensions, tokens, controls, and shell contracts. No chess rules or account state in shared UI. |
| `ejmlabs` | Studio discovery/content, affected public docs links, and chess-host security operations. Preserve current site migration and unrelated dirty files. |

Dependency direction is chess and studio into public UI packages. Chess does not depend on the agent harness. This repo-local change is the planning home; it does not grant write access to a sibling product or to `ejm-ui`. Apply must establish the owner checkouts and scoped work before edits there, using OpenSpec where an owner already has a root and working normally otherwise.

The three modified capability deltas depend on local UI-migration main specs absent from the reviewed GitHub base. Reconcile those baselines through separate reviewed work and verify the deltas can merge before affected studio implementation or spec sync. Strict change validation alone does not establish that prerequisite.

Cloudflare services proposed: Workers Static Assets, Workers, SQLite-backed Durable Objects, D1, Queues, Turnstile, Email Service, and a capped Stockfish Container pool. Email Sending is in public beta; paid-plan access, domain onboarding, delivery, container cost, and regional latency remain deployment gates. No resources have been provisioned and no live behavior has been verified.

This proposal changes no production code or public pages. Product implementation, publication, and fair play readiness require the apply workflow and its checks. Public ranked launch also requires an available reviewer and a tested adjudication policy.
