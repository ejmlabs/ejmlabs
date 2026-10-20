# Tasks

Planning is complete; none of the implementation tasks below has been run. Apply must respect the owner scopes and launch gates in `design.md`. The confirmed choices are accounts for ranked games, guests for casual games, and owner review of flags and appeals.

## 1. Establish owners and shared contracts

- [ ] 1.1 Establish an authorized `ejm-chess` product checkout and upstream `ejm-ui` edit scope, read each owner's instructions, and record owner-scoped work before code; verify the scope map, existing changes, and public dependency direction. Do not initialize OpenSpec in a new repo unless the user requests it.
- [ ] 1.2 In `ejm-ui`, extend the exported project registry with chess identity, metadata, guide links, assets, and an unreleased-project discovery gate; verify chess can build while existing `otherSites()`/cross-site navigation output remains unchanged until verified chess publication, including an unrelated consumer rebuild.
- [ ] 1.3 In `ejm-ui`, expose narrow shared header/build policy options for chess auth, same-host WebSockets, and Turnstile; verify generated default policies remain unchanged and chess grants no wildcard or unrelated-host access.
- [ ] 1.4 In `ejm-chess`, pin the maintained packages, declared public UI dependencies, React adapter setup, and properly licensed piece assets; verify a fresh install/build, Worker bundling, notices, shipped asset licenses, and dependency/initial-bundle measurements. Document setup in the product guide.

## 2. Accounts, guest seats, and private data

- [ ] 2.1 Add Better Auth with native D1, anonymous casual sessions, and hashed single-use magic links through a thin Cloudflare Email transport; verify guest/ranked separation, expiry, replay rejection, revocation, generic login errors, and outage behavior with local provider bindings.
- [ ] 2.2 Add current-state account eligibility, host cookies, origin/CSRF checks, bounded auth requests, and server-validated Turnstile at abuse boundaries; verify forged identity, invalid origin, reused challenge, and stale authorization are rejected without exposing secrets.
- [ ] 2.3 Add single-claim casual invitations and authenticated WebSocket admission/revalidation; verify an invitation cannot take an occupied seat, unrelated users cannot read live games, replacement connections cannot race moves, and identity linking cannot change an active seat.
- [ ] 2.4 Add indexed account/profile/game/projection/evidence schemas and migration/cleanup policies; verify private fields never enter public APIs, cleanup preserves active games and appeal-window evidence, and documented local migrations recover safely. Publish account and privacy guidance with these behaviors.

## 3. Correct live play and a focused board

- [ ] 3.1 Implement durable game initialization and both-player readiness with a bounded window; verify concurrent initialization creates one game, unready matches cancel without rating changes, and reservations recover after failures.
- [ ] 3.2 Add accepted-move history, versioned commands, durable receipts, legal-move validation, and authoritative deadlines/increments; verify retries, illegal input, concurrent commands, near-deadline moves, and restart recovery preserve one consistent state.
- [ ] 3.3 Implement terminal-action arbitration and one recorded final outcome; verify late draw acceptance, resign/timeout races, duplicate terminal delivery, and checkmate/draw precedence cannot alter an expired or completed result.
- [ ] 3.4 Complete the narrow adjudication feasibility work against `chess.js` and the maintained CHA-Solver candidate, measuring bounded Worker/WASM or private Container compatibility; deliver the versioned online policy, package-gap evidence, and fixtures for repetition, 50-move boundaries, side-specific material, blocked positions, and unknown verdicts. Implement pending review and unrated technical voids for unresolved cases; verify no unknown verdict grants a fabricated win. Update this change before any different rules or licensing scope is adopted.
- [ ] 3.5 Implement hibernating connections, complete-history reconstruction, resync, local clock rendering, and next-deadline alarms; verify disconnects, missed events, object restart, delayed alarms, and outbox retries preserve clocks and leave no per-second server wake loop. Document the server-arrival and service-abort policy.
- [ ] 3.6 Assemble the board through public UI contracts and a thin package adapter; verify two human browser sessions can complete a casual game using touch, drag, click, keyboard, promotion/underpromotion, and an optional cancellable premove, with usable focus, phone layout, muted sound, and reduced motion.
- [ ] 3.7 Add completed history and PGN export, player-facing rules, controls, and reconnect help; verify an exported real game replays correctly, live/private records stay authorized, and built guides link to the implemented flows without loading an engine.

## 4. Matchmaking, ratings, and worldwide rankings

- [ ] 4.1 Add the single Competition authority, separate 5+3/10+5 queues, widening rating/region preferences, color balancing, repeated-pair policy, and cross-format account reservations through settlement; verify duplicate tabs, cancellation/init races, changed eligibility, empty queues, and stale-rating reentry.
- [ ] 4.2 Implement game-to-competition durable result delivery and atomic both-player Glicko-2 settlement with a unique result identity; verify duplicate/conflicting delivery, partial-failure recovery, overlapping results, period boundaries, lazy inactivity, and stable replay of the versioned adapter policy.
- [ ] 4.3 Add versioned D1 projection outboxes, public profiles, and paginated global leaderboards with established/provisional eligibility and visible update state; verify old/duplicate writes cannot overwrite newer events, ties paginate stably, guests never rank, and empty rankings contain no invented players.
- [ ] 4.4 Add checkpointed rating-correction replay with a watermark, durable cursor, shadow generation, affected-pool admission pause, and reconciliation of games completed during repair; verify crashes/retries and appeal reversal publish matching account, eligibility, and leaderboard state without losing or rating a result twice.
- [ ] 4.5 Publish format, matchmaking, ratings, provisional/activity, eligibility, repeated-opponent, and correction guidance; verify documented examples against the implemented policy and check game/history/leaderboard flows together in two account sessions.

## 5. Fair play and owner review

- [ ] 5.1 Add objective protocol/account/request limits and cheap farming checks across all rated results; verify oversized/flooded input, self-play, reciprocal results, repeated opponents, and shared-network cases without treating one signal as an engine-use finding. Document public limits and operator counters.
- [ ] 5.2 Build the pinned private Stockfish Container image and bounded postgame job pipeline with deduplication, priorities, sampling, retries, dead-letter recovery, and capped D1 summaries; verify fixed safe inputs, resource/time limits, restart/retry behavior, private access, and a local throughput/memory/cost estimate before paid provisioning.
- [ ] 5.3 Implement game reports and the owner-only case/review page and APIs under verified Cloudflare Access plus application authorization; verify public denial, reporter privacy, evidence references, decision records, human-gated temporary restrictions, review deadlines, and automatic expiry without supported renewal.
- [ ] 5.4 Implement player decision notices, appeals, evidence holds through the appeal window, and idempotent restriction/rating repair; verify an appeal can still be reviewed near ordinary retention expiry and a reversed decision restores the account and reproducible ratings.
- [ ] 5.5 Evaluate screening on representative authorized human games and controlled assistance examples, including forced lines and selective assistance; deliver an error/uncertainty report and review-capacity plan, verify no automated accuracy/IP/focus/report-count sanction, and publish fair play, reports, appeal, and retention guidance. Leave public ranked admission disabled until this gate passes.

## 6. Cloudflare configuration and measured operation

- [ ] 6.1 Inventory existing resources and prepare scoped Wrangler bindings, additive D1/DO migrations, canonical host configuration, protected preview/admin routes, and unwanted-alias closure; verify a local deployment dry run, resource ownership, least-privilege secret handling, and the product's deployment/recovery runbook before resource creation.
- [ ] 6.2 Confirm Workers Paid, Email beta access, sending-domain DNS/quotas, owner test addresses, and an explicit canary/deployment spending scope; deliver a provisioning checklist and cost estimate. After authorization, verify real sign-in delivery and capped deployed analysis costs/cold starts rather than treating local mail tests as delivery evidence.
- [ ] 6.3 Add enforced admission/storage/analysis caps, queue-lag and failed-outbox signals, safe backup/export, and recovery/rollback controls; verify provider outage, stuck work, exhausted budget, and restore/replay drills preserve accepted game/rating events. Publish exact operator actions and known limits.
- [ ] 6.4 Measure initial play/guide bytes, move CPU/commit latency, the proposed 1,000-live-game and 20-settlement/second workload, reconnect bursts, and tested regional pairs under authorized load/cost scope; record methods/results and derive enforced limits without claiming unmeasured worldwide performance or silently raising budgets.

## 7. Publication and studio integration

- [ ] 7.1 After authorized deployment, run the protected-preview integration flow with two distinct people/sessions: guest invite, verified ranked accounts, legal play, promotion, timeout/reconnect, pending settlement, ranking, report, owner decision, appeal, and rating repair; record the deployed revision and all unrun checks. Complete accessibility and canonical HTTPS/header/API checks before release.
- [ ] 7.2 Open public ranked admission only after adjudication, screening/review, privacy, capacity, cost, email, and recovery gates pass; verify the live mode and published game/help/rules/fair-play/privacy/developer routes, and document any remaining beta limits.
- [ ] 7.3 After product and guide destinations are verified, enable chess discoverability in the owning shared registry and update `ejmlabs` project rows, Projects copy/Play action, shared-registry adoption, guide discovery, and chess-host security operations; run affected owner contracts and studio build/type/budget/link checks and publish through their authorized release processes. Verify current products, guide links, marks, and downloads still work.

## Workflow follow-up

- Use `openspec-update-change` before materially changing this plan during apply; keep owner-scoped plans and dependency evidence in sync.
- After implementation and required verification, use `openspec-sync-specs` and `openspec-archive-change` in the owning planning home. Preserve incomplete gates as incomplete work and update affected main-spec purpose text when the new product is actually adopted.
- Record local, staged, published, and region-tested results separately. This planning change alone is not a completed product, a spending authorization, or proof of live documentation.
