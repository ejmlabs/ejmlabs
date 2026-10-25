# Implementation scope and recorded status

This sanitized publication note records the approved owner scope and the
2026-10-21 UTC source status. Private local checkout records, credentials,
recipient addresses, and raw provider evidence are not part of this PR.

## Owners and public interfaces

| Owner | Approved responsibility |
| --- | --- |
| `ejm-chess` | Product Worker and assets, authoritative games and competition, accounts, bounded private jobs, operational controls, and player/developer guides. |
| `ejm-ui` | Shared tokens, chess identity assets, reusable components and layout contracts, gallery fixtures, and capture tooling through public `@ejm/*` exports. |
| `ejmlabs` | Product planning home in this change; studio discovery/content via `link-ejm-chess`. Chess-host security operations stay with `ejm-chess`. |

Implementation uses isolated owner checkouts and preserves unrelated work.
Chess and studio consume public UI contracts through declared dependencies.
Chess does not depend on the agent harness. This planning PR neither publishes
owner implementation source nor grants new provider, release, or merge scope.
Studio discovery remains disabled until product and guide destinations pass
their publication gates.

## Approved behavior and limits

The current proposal, design, requirement deltas, and tasks control behavior.
New games require username/password accounts. Recovery email stays optional
everywhere and serves account security only. Existing guest seats and history
remain recoverable without automatic competitive credit. Browser Stockfish
replaces model API opponents. Replays, shared chess identity, bounded automatic
tournaments, unattended operation, and shared application layouts remain in
scope. Party mode remains a separate brainstorm.

The monthly chess envelope remains $100, including the approved $20 timeout-proof
share and complete billing increments. Stops preserve accepted work and
recovery. Delayed account-wide billing alerts are not a hard invoice cap.
Proposed entrant and concurrency tiers remain qualification targets. No public
capacity or ranked-readiness claim follows from this plan.

## Recorded product evidence, 2026-10-21 UTC

The product's dated account, recovery, inventory, and budget reports record:

- A canary at `https://chess.ejmlabs.com` behind full-host owner Cloudflare
  Access and separate persistent admin authorization. Public new work remains
  stopped and public game feature flags remain disabled.
- The existing $5 Workers Paid base, enabled sender domain, and saved/read-back
  account usage alerts at $45, $70, and $85. The high alert names a
  secret-authenticated stop webhook whose provider test passed. An actual
  threshold-crossing billing event and its email delivery were not observed.
- Username/password signup with and without a recovery email, actual recipient
  verification and password recovery, new-password signin, and observed
  revocation of the earlier session. Exactly two email attempts were recorded,
  and persistent and deployment-wide stops were restored afterward. This proves
  delivery to one approved recipient, not universal deliverability or load.
- Partial isolated native recovery evidence. Complete restore/undo, safe
  cross-store recovery, deployed timeout-proof qualification, sustained
  capacity, and regional measurements remain separate open gates.

These are reports of bounded product checks, not new provider checks performed
by this planning PR. They do not establish current working-tree deployment,
public product source delivery, live guide publication, or a public launch.

## Task status and remaining gates

The approved source snapshot records **54 of 70 tasks complete**. This PR
preserves every task checkbox. Completed local work and dated provider evidence
do not complete an unchecked integration or launch gate.

The sixteen remaining tasks are 3.6, 3.8, 4.5, 6.2, 6.3, 6.4, 7.1, 7.2, 7.3,
10.4, and 18.1 through 18.6. They cover two-player board/accessibility
acceptance, bounded timeout proofs, competitive integration, provider costs and
mail, operational recovery and automated privacy controls, capacity and regions,
protected integration, public ranked launch, studio publication follow-through,
large-event qualification, and the once-only isolated native capacity harness.

Use the owning workflows and checks before release. Do not sync or archive this
change while required product tasks remain incomplete. Studio discovery archive
belongs to `link-ejm-chess`.
