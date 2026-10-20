# Spec Delta

## Purpose

Let people play dependable live chess worldwide, with clear controls, authoritative rules and clocks, and recovery after connection loss.

## ADDED Requirements

### Requirement: Cloudflare hosted game service

The game, its authoritative services, stored player data, and background analysis SHALL run on Cloudflare. Production SHALL use `https://chess.ejmlabs.com`. Documentation SHALL distinguish proposed, locally tested, staged, and released behavior.

#### Scenario: Production service inventory

- **WHEN** the product is prepared for release
- **THEN** its deployment record identifies its Cloudflare resources and verified canonical routes without claiming worldwide latency from a single-network check

### Requirement: Human multiplayer and casual invitations

Players SHALL be able to play another person through ranked matchmaking or a casual invitation. Guests SHALL be limited to casual games. Invitations SHALL grant only an unoccupied seat and SHALL NOT grant another player's identity or control. Friendly invitations SHALL be unrated.

#### Scenario: Guest joins an invitation

- **WHEN** a guest opens a valid casual invitation and accepts an available seat
- **THEN** the service binds that seat to the guest session and shows both players the selected time control and unrated status

#### Scenario: An occupied seat is requested

- **WHEN** someone reuses an invitation after its seat has been claimed
- **THEN** the request does not take over either participant's seat

### Requirement: Authoritative move acceptance

The service SHALL validate the participant, seat, turn, legal move, game version, and deadline before accepting a move. Accepted moves SHALL be recorded before acknowledgement. A client SHALL NOT set an authoritative position, clock, rating, or result.

#### Scenario: Forged or stale move

- **WHEN** a client sends an illegal move, an opponent's move, an expired move, or a stale game version
- **THEN** the service rejects it without advancing the game and returns the current authorized state

#### Scenario: Acknowledgement is lost

- **WHEN** a player retries an accepted command with the same command identity
- **THEN** the original acknowledgement is returned without applying a second move or clock increment

### Requirement: Server clocks and game start

Clocks SHALL start only after both seats are ready. The service SHALL use its own recorded deadlines and move receipt times, award the published increment once per accepted move, and keep clocks running during a participant's disconnection. Client timestamps and delayed timeout processing SHALL NOT create extra time.

#### Scenario: Move arrives after a deadline

- **WHEN** a move reaches the authoritative service at or after the moving player's deadline
- **THEN** the game is adjudicated as a timeout using the published mating-potential rule, even if its timeout task ran late

#### Scenario: One player never becomes ready

- **WHEN** the published readiness window expires before both players are ready
- **THEN** the unstarted match is cancelled without a rating change and any matchmaking reservation is released

### Requirement: Single authoritative termination

Every game-ending action SHALL check the recorded active deadline and existing terminal state before changing the result. Only one terminal outcome SHALL be accepted. Draw acceptance, resignation, retries, and timeout processing SHALL NOT replace an already determined outcome.

#### Scenario: Draw accepted after time expires

- **WHEN** a player accepts a draw after the active clock's deadline but before the timeout task runs
- **THEN** the service records the timeout outcome rather than changing the expired game into an agreed draw

#### Scenario: Terminal actions race

- **WHEN** two game-ending commands are processed concurrently or retried
- **THEN** all participants receive the same recorded terminal outcome and ranked settlement is emitted only for that outcome

### Requirement: Published online adjudication

The product SHALL publish and version its draw and timeout policy. It SHALL support checkmate, resignation, accepted draw offers, stalemate, automatic threefold and 50-move draws, and documented material draws. Full FIDE compliance SHALL NOT be claimed without verified dead-position and side-specific timeout adjudication.

#### Scenario: Repeated positions across a restart

- **WHEN** play repeats a legal position after a reconnect or service restart
- **THEN** adjudication uses retained move history and relevant position rights rather than comparing only board placement

#### Scenario: Timeout against a bare king

- **WHEN** a player's time expires and the opponent has only a king
- **THEN** the service records a draw rather than a win

#### Scenario: Unresolved adjudication cases

- **WHEN** a known timeout or dead-position case has no correct implementation under the published policy
- **THEN** public ranked release remains disabled until the policy and implementation agree and the case has a regression fixture

#### Scenario: Checkmate and draw boundary coincide

- **WHEN** an accepted legal mating move also reaches a move-count or repetition boundary
- **THEN** the service records checkmate according to the published precedence rather than replacing it with a generic draw result

#### Scenario: Draw offer is answered

- **WHEN** a player accepts an active opponent draw offer or replies with a legal move
- **THEN** acceptance concludes the game as drawn, while the move rejects the offer and continues play

### Requirement: Unresolved adjudication stays pending

Every game SHALL retain its rule-policy version. If bounded adjudication cannot determine an outcome under that policy, play SHALL stop with a visible pending result and no rating settlement. A reviewer SHALL resolve the supported outcome or record an unrated technical void; uncertainty SHALL NOT silently become a timeout win.

#### Scenario: Mating-potential analysis is inconclusive

- **WHEN** an adjudication tool reaches its resource limit without determining whether the non-flagging player can mate
- **THEN** the result remains pending for review, both clocks stop, and neither player receives a fabricated win or loss

### Requirement: Focused and accessible board controls

The playing screen SHALL center the board, clocks, participants, moves, and essential game actions. Players SHALL be able to move using touch, drag, click, and keyboard; choose any legal promotion; and use the board at phone and desktop sizes. Motion, sound, and move hints SHALL respect player settings and accessibility needs.

#### Scenario: Keyboard underpromotion

- **WHEN** a keyboard user promotes a pawn
- **THEN** all four promotion choices are reachable, the chosen legal move is submitted, and focus returns to a useful board location

#### Scenario: Phone play and reduced motion

- **WHEN** a player uses a 360-pixel-wide screen with reduced motion enabled
- **THEN** the board and clocks remain usable without horizontal page overflow or required animation

#### Scenario: Invalid local interaction

- **WHEN** a player cancels a selected move or attempts an illegal destination
- **THEN** no move is submitted and the current authoritative position remains clear

### Requirement: Recoverable live state

Participants SHALL see connection status and recover the latest recorded position, history, clocks, and result after a connection or service restart. A disconnected client SHALL NOT show an unacknowledged move as confirmed or continue submitting stale moves.

#### Scenario: Connection returns after missed moves

- **WHEN** a participant reconnects with an older game version
- **THEN** the service restores the current state and clearly shows any timeout or other result that occurred while disconnected

### Requirement: Private live play and completed game records

Participants SHALL have access to their game history and completed PGN exports. Public records SHALL exclude email, session data, private fair play evidence, and connection metadata. Live state SHALL be available only to authorized participants in the first release; completed-game visibility SHALL follow the published privacy policy.

#### Scenario: Unrelated account requests live state

- **WHEN** an unrelated account requests a game that is still in progress
- **THEN** it receives no private position, player session, or analysis data

#### Scenario: Completed game export

- **WHEN** a participant exports a completed game
- **THEN** the PGN contains its legal moves, time control, result, and termination reason without private account or investigation information
