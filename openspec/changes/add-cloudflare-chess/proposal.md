# Proposal

## Why

Create `chess.ejmlabs.com`: a small, dependable online chess game where people worldwide can find opponents and compete on global leaderboards. Chess players need a clear board, correct clocks and results, and a fair play process they can trust.

## What Changes

- Plan a separate `ejm-chess` product, hosted entirely on Cloudflare, with a responsive board, live human opponents, reconnects, game history, and PGN export.
- Require explicit username/password accounts for all new games, as requested by the owner on 2026-10-20. This supersedes guest casual admission. Preserve existing guest games and history without promoting their identities. Recovery email is optional at signup and for competition. Use any supplied private email for verification and password recovery only, with no marketing; explain that skipping it leaves no email password reset. Start with proposed 5+3 blitz and 10+5 rapid formats, separate ratings, and one worldwide leaderboard per format. Friendly invitations are unrated.
- Make the server authoritative for seats, legal moves, clocks, and outcomes. Use maintained chess, board, auth, and rating packages rather than writing replacements.
- Adopt the pinned MIT CHA-Solver package for bounded private timeout proofs under a new saved rules profile. Reserve proof capacity and two finite attempt credits before ranked game admission; validate positive mating witnesses against retained history through an independent maintained rules package. Preserve unknown results and the original 30-second technical-void deadline. Qualify difficult positions, failure recovery, provider bounds, and a small proof pool within the existing $100 monthly budget before enabling the profile. This follow-up extends completed package feasibility and does not claim full FIDE adjudication.
- Add layered fair play controls: abuse prevention, server records, postgame engine screening, farming checks, reports, private review, appeals, and rating compensation. The latest unattended-operation request supersedes the earlier offer to review flags. Reports and engine signals remain informational when no reviewer is active. Do not promise that a browser game can prevent all engine assistance.
- Keep the interface focused on playing. Support touch, mouse, keyboard, underpromotion, reduced motion, and clear connection states. Add a remembered Show legal moves toggle, on by default, with legal destination dots and capture rings when selecting a piece on the player's turn.
- Add private match replays from authoritative PGN, with move selection, keyboard navigation, board flipping, and download.
- Add a chess logo and favicon family in the shared token owner and consume public exports. Keep unreleased discovery disabled.
- Run opt-in, bounded round-robin tournaments automatically at fixed UTC cadences, with no-show handling, standings, and restart recovery. Use unrated games and separate event standings until competitive gates pass.
- Make ordinary runtime unattended through automatic expiry, bounded recovery and retention, and technical voids for unresolved adjudication. Never automate cheating convictions from statistical signals.
- Replace the earlier OpenRouter opponent with optional unrated browser Stockfish practice, as requested on 2026-10-20. Serve a pinned maintained single-thread engine from the Cloudflare site, load it only for computer play, and offer named difficulty settings without claimed Elo. The server still validates every move, clock, and result. No model API, provider key, or token quota is needed.
- Support hundreds and thousands of entrants through versioned timed arenas with continuous bounded pairing, pause/resume, shared account reservations, and paged cached standings. The four-player round-robin preview remains a separate format. Qualify 2,000 entrants and 1,000 combined live games first, then the proposed 10,000-entry/5,000-live tier; these targets are not public capacity claims. Party mode remains a separate brainstorm with no approved implementation scope.
- Build the approved once-only isolated native capacity harness before live load. Reserve at most $25 within the existing $50 core share of the unchanged $100 budget, with 20,000 permanently charged synthetic admissions. The required combined run contains 18,000 regular native results over 900 seconds and 1,000 distinct delayed results. Preserve production ceilings, original scale/retention targets, and a separate frozen-candidate provisioning/load approval checkpoint.
- Use ejm-ui throughout every chess route, including the board surface, clocks, prose, fields, radio choices, disclosures, tables, notices, loading states, and actions. Add missing reusable contracts in the shared owner before consumer adoption; product components compose public exports and retain domain behavior without custom visual primitives. Reuse public `@ejm/*` contracts, including the shared Select for product form choices. Add upstream chess identity and an unreleased-project discovery gate; use existing public header/build options and extend them only for verified policy gaps. Retain product-specific game behavior in chess. Existing cross-site menus must not expose chess before verified publication.
- Use compact, consistent page spacing for application routes. Stack descriptions beneath page titles, group fields and actions by purpose, keep links within sentences inline, and let loading tables honor the selected density. Preserve shared component appearances, useful form and table widths, and the centered board.
- Make compact application layouts a supported shared ejm-ui contract. Extend existing Page and SectionHead options, publish named spacing aliases and a complete gallery example, add browser geometry checks in both themes at phone and desktop widths, migrate chess, and integrate only these shared changes into the main local ejm-ui checkout. Preserve marketing defaults and unrelated work; local integration does not publish or deploy a package.
- Publish product help, rules, fair play, privacy, and operations guidance with the product. Add studio discovery links only after their destinations are live and verified.
- Operate chess within the owner's $100 monthly Cloudflare budget, authorized on 2026-10-20. The owner approved a $20 timeout-proof share on 2026-10-21 UTC, replacing the proposed $10 share without raising the total or admission limits. Include complete billing increments without assuming shared included usage is available. Add conservative enforced workload limits, separate stops for new games, email, and optional server analysis, and billing alerts. Preserve active games, accepted results, and recovery work when admission stops. Provider alerts are delayed account-wide notices, not a hard invoice cap.

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
| New `ejm-chess` product | Game Worker and assets, game and competition Durable Objects, D1 auth and read models, background analysis, private bounded timeout proofs, product guides. Consume published package exports through declared dependencies. |
| `ejm-ui` | `@ejm/site/projects` chess identity and discovery gating, existing public head/header policy options and any verified extensions, tokens, controls, and shell contracts. No chess rules or account state in shared UI. |
| `ejmlabs` | Studio discovery/content, affected public docs links, and chess-host security operations. Preserve current site migration and unrelated dirty files. |

Dependency direction is chess and studio into public UI packages. Chess does not depend on the agent harness. This repo-local change is the planning home; it does not grant write access to a sibling product or to `ejm-ui`. Apply must establish the owner checkouts and scoped work before edits there, using OpenSpec where an owner already has a root and working normally otherwise.

The three modified capability deltas extend four requirements present in the accepted local studio migration. GitHub main `c92a4a0df2944e6ac6c22498ad4d132f0518d569` still lacks those specification paths. The separate reviewed change `reconcile-chess-planning-baseline` records only the four prerequisite blocks for those absent remote paths and proves actual OpenSpec mergeability; it preserves the richer local specs and imports no migration code. Product verification proceeds independently. Studio discovery waits for verified product and guide destinations, and spec sync or archive waits for the baseline proof. Strict change validation alone does not prove mergeability.

Cloudflare services proposed: Workers Static Assets, Workers, SQLite-backed Durable Objects, D1, Queues, Turnstile, Email Service, a capped Stockfish Container pool, and a separate private capped CHA-Solver Container pool. Email Sending is in public beta; paid-plan access, domain onboarding, delivery, container cost, and regional latency are deployment gates. At the initial proposal, no resources had been provisioned and no live behavior had been verified. The dated 2026-10-21 UTC product evidence now records a protected canonical-host canary, the existing Workers Paid subscription, sender onboarding, saved budget alerts and a tested stop webhook, and account verification/password recovery for one approved recipient. Public new work remains stopped. Complete recovery, deployed proof and analysis costs, capacity, regional qualification, and public ranked launch remain open. See `implementation-scope.md` for the publication boundary and evidence limits.

This proposal changes no production code or public pages. Product implementation, publication, and fair play readiness require the apply workflow and its checks. Public ranked launch requires a tested unattended adjudication, abuse, privacy, recovery, and capacity policy with honest engine-detection limits.
