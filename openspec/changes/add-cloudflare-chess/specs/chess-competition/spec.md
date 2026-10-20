# Spec Delta

## Purpose

Provide accountable ranked matchmaking and worldwide chess leaderboards whose ratings remain correct through retries, concurrent games, and fair play corrections.

## ADDED Requirements

### Requirement: Account access for ranked play

Ranked play SHALL require a signed-in account with verified email and no ranked restriction. Guests SHALL retain casual access. Account identity SHALL come from a validated session. Session and recovery secrets SHALL remain private, revocable, time limited, and excluded from public profiles and logs.

#### Scenario: Guest requests ranked play

- **WHEN** a guest chooses a ranked queue
- **THEN** the service offers account sign-in and does not admit the guest to ranked matchmaking

#### Scenario: Session is revoked or an account is restricted

- **WHEN** the account next requests ranked admission
- **THEN** the service checks current authorization and rejects access without relying on a stale public read model

#### Scenario: Login email cannot be delivered

- **WHEN** the mail service is unavailable or its quota is exhausted
- **THEN** the service reports a retryable sign-in problem without granting a session, exposing account existence, or disabling verification

### Requirement: Small ranked format set

The initial ranked formats SHALL be 5+3 blitz and 10+5 rapid, with separate ratings and global leaderboards. Players SHALL see the format, increment, rated status, and provisional rating before joining. No official FIDE or other service rating SHALL be implied.

#### Scenario: Player changes format

- **WHEN** a player moves from blitz to rapid
- **THEN** the service uses that format's rating and queue rather than combining the two ratings

### Requirement: Honest global matchmaking

Matchmaking SHALL pair distinct eligible human accounts in the same format, prefer compatible rating and connection regions, and widen the search within a published policy. It SHALL permit only one ranked reservation, live game, or unsettled ranked result per account across all formats. Empty queues SHALL show a waiting state and a cancel action.

#### Scenario: Concurrent queue requests

- **WHEN** the same account requests both ranked queues from different tabs
- **THEN** only one active reservation is granted

#### Scenario: No suitable opponent exists

- **WHEN** the queue cannot find an eligible opponent
- **THEN** the player remains in a truthful waiting state or cancels without facing an undisclosed bot or fabricated player

#### Scenario: Prior result has not settled

- **WHEN** an account requests another ranked game while its previous result is pending
- **THEN** admission waits for that settlement and the player sees its status instead of entering with a stale rating

#### Scenario: Match creation is interrupted

- **WHEN** a pairing is retried after a partial failure
- **THEN** it creates at most one match, preserves assigned seats, and eventually releases unused reservations

#### Scenario: Eligibility changes while waiting

- **WHEN** a queued or reserved account becomes restricted before its game starts
- **THEN** pairing and start checks reject ranked participation and release the unused reservation

### Requirement: Exactly once ranked settlement

A completed eligible ranked game SHALL update both players' ratings as one accepted settlement. Retries, duplicate results, and concurrent completions SHALL NOT apply partial or repeated changes. Clients SHALL receive a pending state until the authoritative settlement is recorded.

#### Scenario: Duplicate result delivery

- **WHEN** the same completed game's result is delivered more than once
- **THEN** only its original accepted settlement affects ratings and completed-game counts

#### Scenario: Conflicting result delivery

- **WHEN** a result with the same identity but a different outcome is submitted
- **THEN** the service rejects the conflict and records it for investigation without overwriting the accepted result

#### Scenario: Result storage is temporarily unavailable

- **WHEN** a completed game's rating settlement cannot finish
- **THEN** the game result remains recorded, rating changes stay pending, and retry resumes without requiring either player to remain connected

### Requirement: Versioned rating policy

The product SHALL publish its Glicko-2 online adaptation, initial state, provisional status, rating-period and inactivity policy, and version. Updates SHALL retain rating, deviation, volatility, inactivity state, and enough history to reproduce both players' pre-game and post-game ratings. Inactivity SHALL affect uncertainty and ranking eligibility without an unexplained loss of skill points.

#### Scenario: Rating update is reproduced

- **WHEN** an operator replays an accepted result using its recorded policy and prior states
- **THEN** the same authoritative rating values are produced, subject only to the published display rounding

### Requirement: Established global leaderboard entries

Leaderboards SHALL rank eligible established accounts by the selected format's rating and show provisional, inactive, restricted, and pending states honestly. Eligibility SHALL include published requirements for account age, completed games, distinct opponents, uncertainty, recent activity, and fair play standing. Empty rankings SHALL contain no invented entries.

#### Scenario: New account has a high provisional rating

- **WHEN** an account has not met the established-player requirements
- **THEN** its rating is marked provisional and it does not displace established players in the global ranking

#### Scenario: Leaderboard projection is delayed

- **WHEN** rating changes have not yet reached the public leaderboard
- **THEN** the page shows its update time and the participant sees the settlement state without an unsupported promise of immediate global consistency

#### Scenario: Ratings are tied

- **WHEN** two eligible players have the same rating at published display precision
- **THEN** the documented ranking and stable pagination policy handles the tie without duplicate or missing entries

### Requirement: Ranked farming controls

Only eligible matchmade games SHALL affect competitive ratings. The service SHALL enforce a published repeated-opponent policy and detect suspicious reciprocal wins, early resignations, account clusters, and rating transfers for review. Invitations, self-play, and cancelled unstarted games SHALL NOT grant competitive credit.

#### Scenario: Repeated-opponent limit is reached

- **WHEN** a pair reaches the published ranked limit for the rolling window
- **THEN** matchmaking does not offer another rated game between them in that window and casual play remains available

### Requirement: Auditable rating corrections

Confirmed fair play corrections SHALL retain the original game record, identify the decision and affected results, and publish a reproducible corrected rating history. Retried corrections SHALL NOT apply twice. The product SHALL NOT repair nonlinear ratings by blindly subtracting historical point changes.

#### Scenario: A rated game is voided after later games

- **WHEN** a reviewed decision removes a result that influenced later ratings
- **THEN** the correction uses the documented replay policy and publishes one consistent corrected leaderboard generation with an auditable decision reference

#### Scenario: A game completes during rating repair

- **WHEN** a game completes while a correction is replaying earlier results
- **THEN** its result remains recorded and settles once in the documented order after repair, without mixing account ratings, eligibility, or public ranks from different correction generations
