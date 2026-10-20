# Spec Delta

## Purpose

Protect competitive chess with preventive controls, reproducible evidence, accountable review, and appeals while stating the limits of engine-cheating detection.

## ADDED Requirements

### Requirement: Layered preventive controls

The service SHALL enforce participant authorization, legal moves, deadlines, ranked eligibility, and bounded request rates. Signup, matchmaking, and reporting abuse controls SHALL be enforced on the server. Bot challenges SHALL NOT be presented as proof that a player is unassisted.

#### Scenario: Challenge response is replayed

- **WHEN** an abuse-sensitive request supplies an invalid, expired, or reused challenge token
- **THEN** the service rejects the protected action without interrupting an unrelated ongoing game

#### Scenario: A player floods a game connection

- **WHEN** a participant exceeds the published message limits or sends oversized messages
- **THEN** the service rejects excess input, bounds resource use, and preserves the recorded game and opponent's access

### Requirement: Server recorded fair play evidence

Fair play evidence SHALL come from recorded server moves, timing, results, and account history. Client engine evaluations SHALL NOT be trusted. Evidence SHALL identify its game version, analysis version, and source records so a reviewer can reproduce the relevant findings.

#### Scenario: Client submits a claimed engine score

- **WHEN** a client submits a score or accuracy claim for an opponent
- **THEN** it cannot alter the trusted analysis record or directly change ranked standing

### Requirement: Bounded postgame engine screening

Engine screening SHALL run after games and remain separate from live move handling. Screening SHALL prioritize reports, suspicious patterns, and leaderboard candidates, and include random sampling. Its findings SHALL consider meaningful decisions and multiple games, rather than engine agreement alone.

#### Scenario: A short forced game has high accuracy

- **WHEN** a game contains mostly forced or obvious moves
- **THEN** a high agreement score alone does not establish engine assistance or trigger a sanction

#### Scenario: Analysis is backlogged

- **WHEN** the analysis service reaches its concurrency or spending limit
- **THEN** work remains pending or enters a visible retry state, live games continue, and the service does not describe unscreened leaderboard candidates as reviewed

### Requirement: Reports and private review

Participants SHALL be able to report a completed game through a bounded reporting flow. Only authorized reviewers SHALL access private evidence. A reviewer SHALL record a decision, reason, evidence references, and any account or ranking action. Reporter identities and internal detection details SHALL NOT be exposed publicly.

#### Scenario: Participant reports suspected assistance

- **WHEN** a participant reports a completed game
- **THEN** the report is recorded once, the participant receives its status, and no automatic penalty follows from the report alone

#### Scenario: Public user requests a case

- **WHEN** an unauthorized user requests private evidence or a review decision endpoint
- **THEN** the service returns no private case or reporter data

### Requirement: Evidence based sanctions

Engine-use sanctions and case-based ranked restrictions SHALL require an authorized human decision with corroborated evidence. Accuracy, one brilliant game, IP address, tab focus, or report count alone SHALL NOT justify either. Restrictions SHALL have a reason, review deadline, and player-visible status. Objective request-abuse throttles SHALL NOT imply engine-use findings.

#### Scenario: Players share a network

- **WHEN** several accounts use the same household, school, club, or public connection
- **THEN** shared network data alone does not close accounts or remove their ratings

#### Scenario: Review is inconclusive

- **WHEN** the reviewer finds insufficient evidence
- **THEN** the service records that outcome without an engine-use sanction and resolves any case-based temporary restriction according to the published policy

#### Scenario: Temporary restriction reaches its deadline

- **WHEN** a case-based restriction expires without a supported reviewer decision to renew it
- **THEN** ranked access is restored and the expiry is recorded in the case history

### Requirement: Appeals and rating repair

Affected account owners SHALL receive a decision notice and an appeal path. Authorized reviewers SHALL record appeal outcomes and corrections. Rating repair SHALL follow the reproducible correction contract and SHALL NOT expose another person's private evidence.

#### Scenario: An appeal reverses a decision

- **WHEN** a reviewer overturns a sanction
- **THEN** the account's restriction and affected ratings are repaired through auditable, idempotent actions and the player receives the updated decision

### Requirement: Fair play privacy and retention

The product SHALL publish the purpose and bounded retention of account, connection, report, and analysis data before collection. Decision evidence SHALL remain available through the appeal window after notice and any timely appeal. Raw secrets SHALL NOT enter evidence. Live moves SHALL NOT include private telemetry or analysis. The first release SHALL NOT require cameras, screen recording, or invasive device fingerprinting.

#### Scenario: Evidence retention expires

- **WHEN** a record reaches its published expiry and is outside its appeal window and any documented timely-appeal hold
- **THEN** the service deletes or minimizes it while retaining only the permitted audit and rating-replay record

#### Scenario: Player has time to appeal

- **WHEN** a player receives a decision notice shortly before ordinary evidence expiry
- **THEN** the decision evidence is held through the published appeal window and any timely appeal so ordinary expiry cannot defeat review

### Requirement: Bounded and recoverable analysis operations

Analysis SHALL have enforced instance, concurrency, job, retry, storage, and spending controls. Failed work SHALL be visible to operators and safe to retry without duplicate cases or sanctions. Private analysis services SHALL NOT be publicly callable as unrestricted engine endpoints.

#### Scenario: Analysis fails after processing

- **WHEN** a job is retried after its result was saved but acknowledgement was lost
- **THEN** the accepted analysis identity is reused without charging another investigation or applying any action twice

### Requirement: Honest fair play launch gate

Public ranked launch SHALL require a working review and appeals process, a documented evaluation of screening errors, and tested abuse and correction paths. The owner SHALL be the initial reviewer. The product SHALL state that engine assistance cannot be fully prevented in unsupervised browser chess.

#### Scenario: A readiness gate is unmet

- **WHEN** screening, review, appeals, or rating correction is not ready
- **THEN** the product remains a clearly labelled beta with public competitive launch disabled, while verified casual play can remain available
