# Design

## Context

See `proposal.md` for the purpose and scope. This is a plan for a new product. This change has not provisioned or verified chess resources, an application, an account flow, or a public hostname.

The local studio UI-migration checkout consumes public `@ejm/*` packages through declared local dependencies. The shared project registry covers four existing identities. Public header/build hooks already support additive CSP sources; chess must verify its policy through those hooks before adding an API. The new `ejm-chess` checkout and upstream `ejm-ui` checkout are outside this change's write scope. This planning home grants no authority to edit either one.

The owner confirmed that accounts are required for ranked play, guests may play casual games, and the owner will review flags and appeals through a private admin page. The proposed default formats are 5+3 blitz and 10+5 rapid. Reviewer availability does not establish detection quality or launch readiness.

### Planning baseline prerequisite

The modified deltas were authored against local main specs at commit `3917ca01886280c93795c84126084c32a4415aad`. The reviewed GitHub base, `c92a4a0df2944e6ac6c22498ad4d132f0518d569`, contains only `.gitkeep` under `openspec/specs/` and lacks these targets:

| Spec | Modified requirement |
| --- | --- |
| `ejmlabs-site` | `Home page` |
| `documentation-discovery` | `Direct guide links` |
| `public-web-access` | `Worldwide public access` |
| `public-web-access` | `Public production entry points retain edge protection` |

Land or reconcile these baselines through separate reviewed work, refresh the four requirement blocks against accepted main, and verify spec mergeability before affected studio implementation or sync/archive. Do not publish unrelated local changes to fill the gap. Strict change validation checks format and scenarios; it does not prove these modified deltas can merge into a missing baseline. The package observations above describe the local migration, not a verified adoption on remote main.

## Goals / Non-Goals

**Goals:**

- Keep board input and authoritative game processing small, with one durable owner for each state transition.
- Make reconnects, duplicate delivery, restarts, rating repair, and provider outages explicit parts of the design.
- Use Cloudflare for application hosting, storage, mail transport, background execution, and abuse controls.
- Keep public package boundaries and product-owned guides intact.

**Non-Goals:**

- A distributed game clock, a custom chess engine, a custom authentication system, or a second design system.
- Tournaments, prizes, chat, spectators, variants, teaching tools, or public live engine analysis at launch.
- Claims of perfect cheat prevention, exact FIDE adjudication, unlimited capacity, or released behavior before acceptance checks.

## Decisions

### 1. Choose owners and extend shared contracts first

| Owner | Public contract and downstream impact |
| --- | --- |
| `ejm-chess` | Owns the game Worker, assets, Durable Objects, auth composition, ratings, fair play, admin, and product guides. Consumes declared public dependencies. |
| `ejm-ui` | Extends `@ejm/site/projects` with chess identity and an unreleased-project discovery gate. Owns existing public build/header options, any verified policy extensions, shared controls, shell, tokens, and prerendering. |
| `ejmlabs` | Adds honest studio discovery, product-guide links, and the canonical chess host to the public security operations contract after verified publication. |

The direction is chess/studio into `@ejm/tokens`, deep `@ejm/ui` exports, `@ejm/site`, and `@ejm/ssg`. Chess does not use or change the agent harness. Read each owner's instructions and establish scoped work before editing there. Use OpenSpec where the owner already has a root; otherwise work normally and do not initialize it without a user request. The inspected `ejm-ui` checkout has no OpenSpec root. Preserve the ongoing site migration and unrelated files.

The upstream chess registry identity and discovery gate are known contract gaps. Resolve them in `ejm-ui` before adoption; do not copy its registry/header generator or import sibling private source. Current `otherSites()` exposes every entry and consumers use live declared `file:` packages, so merely adding chess can publish premature links on an unrelated rebuild. Add an explicit unreleased/discoverable contract: local/preview builds may use chess metadata while shared navigation excludes it. Existing discovery output remains unchanged until product and guide destinations are verified; only then enable chess discovery.

The public `ejmSite({ project, headers })` API already accepts a custom `Project`, and `HeadersOptions.extra` adds CSP sources for same-host WebSockets and Turnstile. Reuse those contracts and test the actual auth flow. These APIs generate static `_headers`; verify Worker responses separately rather than assuming they inherit static policy. The current `form-action 'none'` default does not by itself prove chess needs a replacement API. Add a narrow shared extension only if verified behavior cannot be expressed through existing public options; record that gap and preserve default policies. Test all four existing identities, the hidden/new chess identity, existing static policies, and the narrow chess policy without wildcard or unrelated-host grants. This plan adds no compatibility adapter.

Alternative: put chess inside the studio. Rejected because a stateful game and its guides need a product owner, independent deployment, and bounded runtime dependencies.

### 2. Use established packages behind thin product adapters

| Package | Use and constraint |
| --- | --- |
| [`chess.js`](https://github.com/jhlywa/chess.js) | Legal moves, position history, SAN, PGN, checkmate, and supported draw predicates. The server decides outcomes through a separate, documented online adjudication policy. |
| [`cm-chessboard`](https://github.com/shaack/cm-chessboard) | SVG board, pointer input, promotion and accessibility extensions. Mount/destroy it through one React adapter; keep it out of static guide bundles. |
| [`glicko2`](https://github.com/mmai/glicko2js) | Server rating calculations, including empty rating periods. Product code supplies the versioned online rating policy and serialization. |
| [Better Auth](https://better-auth.com/blog/1-5#cloudflare-d1-support) | Native D1 adapter, magic links, anonymous guests, sessions, and database-backed auth rate limits. No custom credentials or guest-token engine. |
| [Stockfish](https://github.com/official-stockfish/Stockfish) | Pinned native engine and network files in a private analysis Container image, with notices and source obligations reviewed for the chosen distribution. |

Pin compatible stable versions and record licenses, advisories, maintenance evidence, Worker compatibility, startup, and bundle measurements in the owning change. Prefer direct D1 integration over adding an ORM only for auth. Do not replace a package because of an unmeasured footprint concern.

The board code is MIT, but its piece assets have separate licenses. Do not ship the noncommercial Staunty set by default. Use the commercial-compatible Wikimedia set with its CC BY-SA attribution and obligations, or an approved licensed set. Verify the files actually included in the build.

Alternative: hand-built board, rules, ratings, or login. Rejected because correctness and maintenance would become product obligations without evidence of a package gap.

### 3. Use one small control plane and one object per game

| Cloudflare resource | Authority or purpose |
| --- | --- |
| Workers Static Assets and application Worker | Prerendered routes, lazy play UI, HTTP/auth APIs, validated WebSocket upgrades. |
| `Game` SQLite-backed Durable Object per game | Seats, ordered events, legal position/history, clock deadlines, durable receipts, terminal result, and delivery outbox. |
| One launch `Competition` SQLite-backed Durable Object | Both ranked queues, regional preferences, active-account reservations, both rating pools, immutable rating events, processed results, projection outbox, and correction cursor. |
| D1 | Primary auth state; query projections for profiles, games, completed PGNs, leaderboards, and capped private fair-play evidence. |
| Queues and capped native Stockfish Containers | Postgame analysis with retry, deduplication, bounded work, and a dead-letter path. |
| Turnstile and Cloudflare security controls | Signup/guest-creation abuse prevention, request limits, WAF and DDoS protection. |

Moves never pass through `Competition`, D1, an engine, or a queue. The single control object is an explicit launch capacity bound, not a claim of unlimited global writes. Split it only after measurements identify a bottleneck and a new plan preserves cross-format account reservations and atomic rating changes.

Do not add KV or R2 initially. Completed PGNs and bounded evidence fit D1 until measured growth shows otherwise. Set storage alerts and review capacity before approaching the database limit; adding storage later needs a measured owner change. D1 is not a game clock or active position authority.

Alternative: several regional control objects at launch. Deferred because cross-region account locks and result ordering would add coordination machinery before capacity requires it.

### 4. Keep auth on the primary and guest access narrow

Compose Better Auth's [magic-link](https://better-auth.com/docs/plugins/magic-link) and [anonymous](https://better-auth.com/docs/plugins/anonymous) plugins with native D1. Send login links through the library callback and Cloudflare Email Sending. Store hashed link identifiers and use the library's expiry and single-use verification. Never log links, verification values, cookies, or email bodies.

Use an explicit canonical origin, host-only Secure/HttpOnly cookies, appropriate SameSite settings, origin/CSRF protections, trusted `CF-Connecting-IP`, and [database-backed rate limits](https://better-auth.com/docs/concepts/rate-limit). Auth and revocation reads use primary D1 semantics. Do not enable an unconstrained read-replica or stale cookie-cache path for authorization.

Anonymous sessions may create and join casual invitations. Only a verified non-anonymous account may enter ranked queues. Guest accounts expire under a documented cleanup policy after active-game checks. Account linking waits until the identity has no active game; live seats never change identity midgame. Clearing a guest cookie loses that browser's seat access.

At WebSocket upgrade, the Worker validates the session, origin, game membership, and session expiry, then supplies trusted identity through the internal binding. A room ID or client-supplied user ID grants no seat. Reconnects repeat these checks; active connections have a bounded revalidation/expiry policy. Limit connections and frames per identity, reject oversized messages, and avoid credential-bearing URLs.

Email Sending is [public beta](https://developers.cloudflare.com/email-service/) and needs paid-plan access, sending-domain onboarding, quota checks, and verified login delivery before public accounts open. A missing mail service closes new sign-in attempts without weakening verification. Passkeys can be added later through the maintained plugin after a separate scope decision.

Alternative: OAuth-only or passkey-first signup. Deferred to keep the first login and recovery path small and fully Cloudflare hosted.

### 5. Reuse the site shell and keep the board central

Use explicit `@ejm/ssg` routes for `/`, `/play/`, `/leaderboard/`, `/history/`, `/help/`, `/rules/`, `/fair-play/`, `/privacy/`, and `/admin/`. Open a game as `/play/?game=<id>`; do not assume dynamic path matching. Auth and application APIs remain Worker routes. Private/authenticated content is not prerendered or cached publicly.

The play view prioritizes the board, two clocks, opponent, move list, and a few clear actions. Provide click/tap and drag input, keyboard/text moves through the board extension, all promotion pieces, visible focus, legible coordinates, reduced motion, optional muted-by-default sound, and clear reconnect/pending-move states. Verify touch targets and screen-reader use on the assembled product. A premove is a local intention revalidated by the server when its turn arrives; no move is sent on the opponent's turn.

Use public tokens and controls for the shell and dialogs. Keep board-specific styling in its thin adapter and imported package assets. Import no engine into play, and lazy-load the board and auth client only where needed. No promotional film or demo runtime belongs in the first play load.

Alternative: a new landing-page design system or a homegrown SVG interaction layer. Rejected because the existing public shell and board package already own those jobs.

### 6. Persist events and deadlines, not clock ticks

Capture the authoritative server timestamp at handler entry before external I/O. A move request contains a bounded command ID, expected game sequence, and move coordinates/promotion. It contains no trusted clock, position, rating, result, or client timestamp.

For every game command, check existing terminal state and the recorded active deadline before accepting a draw, resignation, or move. Validate actor/seat, sequence, turn, and move legality where applicable. A timestamp at or beyond the active deadline flags before another action can conclude the game. A valid move consumes elapsed server time, applies the format's increment, switches the active side, and commits its event, new state, receipt, and next due work through durable storage before acknowledgement/broadcast. Illegal moves and duplicates do not reset time or add increment. Preserve repeat-command receipts so a lost acknowledgement cannot apply a move twice; conflicting reuse is rejected. Checkmate takes precedence over generic automatic-draw predicates on an accepted mating move.

Store starting position, ordered accepted moves, full repetition history or replayable history, clock state, deadlines, participant IDs, rule-policy version, and terminal reason. A FEN alone cannot restore repetition rights. On reconnect, send an authoritative snapshot plus events after the client's last sequence, or a complete bounded resync when necessary. A replacement player connection invalidates the old connection's move authority.

Clients animate clocks with a local monotonic clock and server snapshots. Disconnects do not pause ranked clocks. No client timestamp or artificial network delay earns time; initial clocks use server-arrival semantics with no lag credit. Publish that policy and measure distant play before changing it. Schedule the next real deadline or outbox retry, not a per-second callback. Late alarms recompute from the persisted deadline and never grant extra time.

[Hibernating WebSockets](https://developers.cloudflare.com/durable-objects/best-practices/websockets/) keep connections while object memory resets. Persist game state in SQLite and only per-connection identity/sequence metadata in socket attachments. Use idempotent alarms and restart recovery. Do not use intervals that prevent hibernation.

Alternative: browser clocks or frequent server ticks. Rejected because client claims are untrusted and tick loops add cost without improving the authoritative deadline.

### 7. Match once and rate through one atomic owner

`Competition` holds separate 5+3 and 10+5 queues, with nearby-region and rating preferences that widen over waiting time. Match players only within the same format. Recheck current eligibility when pairing and when starting a reservation. Use authoritative queue tickets and leases, color balancing, cancellation, and idempotent game IDs. One account may hold only one queued/reserved/active/settling ranked slot across both formats. Proposed repeated-pair policy: no more than two ranked games for the same unordered pair in a rolling 24 hours; validate its effect on small queues before public ranked launch.

Reserve both accounts and a game-creation intent atomically before initializing `Game`. Retry initialization under the same ID. A lost reply must not create a second match. Reconcile pending reservations against the game's actual state before releasing them; never expire a live game's reservation because a control-plane message was delayed. Invitation games are always unrated, including account-to-account games. Guests never enter ranked queues.

Proposed Glicko-2 profile: initial rating 1500, deviation 350, volatility 0.06, tau 0.5. Each accepted match is one active rating period for its two players. Before their next match settles, apply one library empty-period update per whole inactive UTC week, with deviation capped at 350. Store the exact timestamps and policy version so week boundaries replay identically. Apply inactivity lazily to those two players only; do not scan the population or subtract skill points for inactivity. This is a documented online adaptation, not an external federation rating.

For a registered ranked game, validate its participants, format, terminal digest, and result version. Use one SQLite transaction to check the unique processed-result marker, read both states, apply the package calculation, write both states and immutable pre/post event records, release reservations, and add projection intents. Same result repeats are no-ops; conflicting results become an incident. Neither clients nor general D1 consumers may write rating authority.

Proposed leaderboard eligibility is 20 rated games, eight distinct opponents, account age seven days, deviation at most 100, activity within 30 days, and no active restriction. Keep this profile versioned and visibly mark provisional accounts. These are uncalibrated defaults; test their effect before ranked launch. Apply stable tie ordering and paginate indexed projections.

Alternative: compute ratings in independent queue consumers. Rejected because unordered deliveries and shared opponents permit lost updates and nondeterministic histories.

### 8. Use durable outboxes and replay rating corrections

`Game` commits its terminal result and a pending delivery record in the same storage transaction. Its alarm calls `Competition` through a binding using a stable event ID; only a durable acknowledgement clears the record. `Competition` persists acceptance and both-player updates atomically. Retry after lost replies is safe. Alarm scheduling tracks the earliest clock, reservation, or outbox work without overwriting earlier due work.

`Competition` keeps a separate durable outbox for D1 projections and analysis messages. D1 upserts use pool, account/game ID, rating epoch, and monotonic event version. Old or duplicate projection deliveries cannot overwrite newer state. Publish related result/rating projection rows in an atomic D1 batch; acknowledge only after commit. Queues are [at least once and unordered](https://developers.cloudflare.com/queues/reference/how-queues-works/), so analysis jobs also use game, engine, and profile version keys. Queue acceptance and a DO write are not a shared transaction.

Public read models may lag briefly and show their update state. Use [D1 Sessions API bookmarks](https://developers.cloudflare.com/d1/best-practices/read-replication/) when a user's next read must include a completed projection; otherwise wait or read authority for the narrow operation. Never describe read replicas as globally instantaneous.

A review or technical correction appends an immutable decision that references the original game/event. Capture a stable event watermark and recompute the affected pool from a verified checkpoint before the earliest affected result, replaying subsequent events and their policy versions in order through that watermark. Do not subtract old rating deltas: later ratings depend on earlier states and opponents. Run bounded replay batches with a durable cursor, validate a shadow epoch, then atomically publish the new projection epoch. Keep original records and the reason for repair auditable. Account ratings, eligibility, and public ranks carry the accepted epoch; do not expose a mixture during publication.

Pause new ranked admission for the affected pool during repair; existing games may finish and persist pending settlement. Resume those settlements in a recorded order after the new authority is committed. Repeated correction requests and crashes resume the same job. Restore/rollback never reintroduces an older epoch over newer accepted events.

Alternative: best-effort background writes or reversing historic point changes. Rejected because those approaches lose work or corrupt rating history after failures and appeals.

### 9. Resolve adjudication limits before public play

Use `chess.js` for the behavior it supplies, and make the online rule policy explicit: move acceptance, checkmate, stalemate, repetition, move-count draws, resignation, agreed draws, flags, aborts, and service failure. Distinguish claim-based draws from automatic draws and record the terminal rule version.

`chess.js` cannot fully establish every dead position or whether only the non-flagging side can mate through any legal continuation. A general draw predicate is not a side-specific timeout decision. Do not claim exact FIDE compliance, infer mating possibility from engine scores, or silently handroll a full rules engine. Before release, document and test a concrete online adjudication policy, assess maintained adjudication dependencies if needed, and obtain owner acceptance of any stated limit. This unresolved accuracy requirement blocks public play, especially ranked outcomes.

Evaluate the MIT-licensed maintained Rust [CHA-Solver](https://github.com/miguel-ambrona/chasolver) as a narrow adjudication dependency in a bounded WASM or existing private Container path. Its proof or mating line can support an outcome, but its resource-capped search can return unknown and its fast classifier is incomplete. Measure compatibility and cost before adoption. Unknown freezes play as pending adjudication with no settlement; the owner reviews the supported outcome or records an unrated technical void. Bind every game to a policy version and publish this limit. This is a package feasibility gate, not authority to invent an exact solver or to claim full FIDE compliance. Use the [FIDE Online Chess Regulations](https://handbook.fide.com/chapter/OnlineChessRegulations), including automatic online draws, as the reference when reviewing any policy difference.

Preserve fixtures for practical edge cases: underpromotion, en passant, castling rights after reconstruction, repetition, move-count boundaries, mate on a deadline, bare king and minor-piece flag cases, and blocked dead positions. Protect product adjudication contracts rather than reimplementing the dependency's own test suite.

Alternative: call `isGameOver()` and award every flag as a win. Rejected because that hides known errors in draw and timeout behavior.

### 10. Keep fair play private, bounded, and reviewed

Prevent protocol and account abuse first: authoritative rules, bounded rates, authenticated seats, replay rejection, one ranked reservation, farming/repeated-pair checks, and server move timing. Validate Turnstile tokens server-side on signup/guest-creation or abuse step-up, not every move. A challenge token proves no chess skill or engine-free play.

After completion, enqueue bounded analysis with a pinned Stockfish version, network checksum, options, and analysis profile. Native [Cloudflare Containers are generally available](https://developers.cloudflare.com/changelog/post/2026-04-13-containers-sandbox-ga/) on Workers Paid. Start with an explicitly capped sleeping pool and fixed safe engine inputs. Bound instances, consumer concurrency, positions, nodes/CPU, wall time, memory, retries, and daily spend. Stop or defer analysis when its budget is reached; never block move processing. Do not force full NNUE analysis into the Worker's 128 MB, single-threaded runtime.

Store completed PGN and a capped structured evidence summary in D1, not unbounded engine output. Keep evidence, reports, IP/security telemetry, and reviewer notes private. Document retention and deletion before collection; hold decision evidence through the published appeal window after notice and any timely appeal. Record missed/failed analysis and queue lag; a missing report is neither clearance nor guilt. Queue/alarm retries need a dead-letter/reconciliation path, because automatic [alarm retries are finite](https://developers.cloudflare.com/durable-objects/api/alarms/).

The owner will use a private `/admin/` view for reports, position/context review, related games, decisions, and appeals. Protect that view and every admin API with the approved Cloudflare Access policy and application owner authorization, validate the Access token, and keep session/restriction checks fresh. Public game/leaderboard APIs never expose evidence or emails.

Engine agreement, centipawn loss, move timing, and shared IPs are signals, not automatic sanctions. Do not collect tab focus or invasive fingerprints in v1. An accuracy threshold never bans or restricts an account by itself. Case-based restrictions require a corroborated human decision, a review deadline, player-visible reason/status, and expiry unless supported renewal is recorded; objective abuse throttles do not imply cheating findings. Calibrate on representative legitimate games and controlled assistance examples, preserve uncertainty, audit human decisions, offer a clear private appeal route, and repair ratings through replay. Reviewer availability is confirmed; working review tools, calibration, and bounded review capacity still gate ranked launch. Pause admission if that capacity cannot support credible competition.

Alternative: a single match-accuracy cutoff or browser monitoring presented as proof. Rejected because either can punish strong legitimate players while missing selective assistance.

### 11. Treat budgets as acceptance targets, not measurements

| Path | Proposed initial target and check |
| --- | --- |
| Initial play route | At most 180 KB gzip JavaScript, including its initial shared code; report lazy chunk sizes separately. |
| Static product guides | At most 95 KB gzip initial JavaScript; no board, auth workflow, or engine chunk in the guide load. |
| Product layout/assets | At most 20 KB gzip CSS on play, 14 KB on guides, 70 KB fonts, and 30 KB HTML per route; report board/piece asset costs. Existing studio budgets remain in force. |
| Move validation | p95 server CPU at most 10 ms on representative positions and histories. |
| Durable move commit | p95 service time at most 50 ms, excluding WAN; separately report end-to-end latency by tested region. |
| Admission envelope | Exercise 1,000 live games and 20 settlements/second, including reconnect bursts and both formats; derive the enforced admission cap from passing results. |
| Analysis | Benchmark locally and estimate cost before provisioning; under an owner-approved canary spending ceiling, measure deployed cold start, memory, nodes/second, queue delay, and cost per 1,000 games before wider use. |

All figures above are proposed and unmeasured. No worldwide performance or concurrent-player guarantee follows from them. Record hardware/provider context, workload, samples, and failure rates with results. A budget miss requires a measured change or an explicit accepted trade-off, not a silent target increase.

Use Cloudflare's maintained Worker/DO test tools and focused browser tests. Cover duplicate moves/results, timeout races, hibernation, reconnects, failed init, outbox failure windows, stale projection delivery, revocation, guest/ranked separation, rating replay and restart, API/admin authorization, accessibility, and regional clock fairness. Avoid expensive unrelated product suites.

### 12. Publish the operational contract with the product

Product-owned guides cover setup, architecture/public interfaces, configuration, local development, migrations, formats, server-arrival clocks, adjudication limits, reconnect recovery, provisional ratings, leaderboard eligibility, fair play, privacy, appeals, queue failures, rating repair, backups, admission, and rollback. Keep route links, examples, API errors, package notices, and generated pages in the normal docs build.

Extend the canonical-host policy specifically to `chess.ejmlabs.com`, keeping worldwide access, TLS, managed WAF, and DDoS protections. Avoid blanket challenges on auth APIs and WebSockets. Disable unwanted `workers.dev` and preview URLs; use a separately protected preview. Configure existing public CSP options for same-host `wss`, auth connections and Turnstile script/frame/connect origins; extend the owner API only for a verified missing capability. No wildcard policy or hand-maintained duplicate `_headers` file.

## Risks / Trade-offs

- [One global Competition object can bottleneck or delay matching/ratings] -> Keep it off the move path, bound admission and queues, measure the stated envelope, and plan a split only with preserved global invariants.
- [A game object has one physical region] -> Prefer nearby players, widen searches transparently, test distant pairs, and publish server-arrival semantics. [Location hints are best effort](https://developers.cloudflare.com/durable-objects/reference/data-location/), not a worldwide latency guarantee.
- [Adjudication package limits can cause incorrect results] -> Block public release until the documented policy, dependencies, difficult positions, and owner acceptance meet the accuracy contract.
- [Engine signals cause false positives or weak screening] -> Keep sanctions human reviewed, calibrate, accept appeals, publish limits, and stop ranked admission when review is unavailable.
- [Analysis/mail are paid or quota constrained] -> Verify Email beta access/domain delivery and measure capped Containers under a spending ceiling before enabling the dependent feature.
- [D1 projections or storage lag/grow] -> Version writes, use primary auth reads and session bookmarks where needed, alert on lag/capacity, and retain retryable authority outside projections.
- [Deployments or provider outages interrupt games] -> Test reconnect/version compatibility, preserve durable events, and use a documented technical-abort policy that voids affected ratings when server records are unreliable; player disconnects alone do not qualify.
- [Owner checkout/API scope is unavailable] -> Establish scoped work and access in `ejm-chess`/`ejm-ui` during apply through each owner's existing workflow; do not work around missing shared APIs in studio files or initialize OpenSpec without a user request.

## Migration Plan

1. Review this planning change, then enter apply only after a new implementation request. Establish owner checkouts, instructions, and scoped work through each owner's existing workflow; do not initialize OpenSpec without a user request. Reconcile the baseline specs before affected studio implementation or sync/archive. No repository or resource is created by this document.
2. Add and check the upstream chess registry/discovery contracts, verify existing public header options, and extend them only for a proven gap before consumer adoption. Keep unreleased chess out of existing cross-site discovery while building the product/docs locally.
3. Implement and test active-game recovery, auth, atomic competition/outboxes, projections, corrections, private review, and the resolved adjudication policy. Run bundle, service, load, accessibility, and failure checks.
4. Before resource creation, obtain the deployment/spending scope, verify Workers Paid and Email beta eligibility, onboard the sender domain, and measure/approve the analysis budget. Prepare scoped secrets, additive D1 migrations, DO migrations, backups, retention and recovery runbooks. Do not place credentials in artifacts.
5. After separately authorized deployment, test the protected preview and exact public host/routes: two distinct browsers, a guest invitation, verified-account ranked eligibility, promotion, clocks, reconnect, terminal settlement, leaderboard update, report, owner review, appeal, and replay repair. Verify access denial, headers, aliases, delivery, quotas, regional latency, and deployed revision. A dry run or configured setting does not establish these results.
6. Open public ranked admission only after accuracy, reviewer tools/calibration, resource, load, and operations gates pass. Enable shared chess discoverability and add studio discovery only after product and guide publication are verified. On failure, close new admission, preserve/drain active games and outboxes, and roll back compatible code through the normal release process. Do not restore an old database over accepted game/rating events; use journal replay and versioned projections. Sync specs and archive only verified completed scope.
