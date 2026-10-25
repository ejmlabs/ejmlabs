# Spec Delta

## Purpose

Lets studio visitors discover the published chess product at its own site, with copy that matches that product.

## ADDED Requirements

### Requirement: Verified chess project link
The studio SHALL list chess as an external project linking to `https://chess.ejmlabs.com` only after that product is publicly released and the destination has been verified. The link SHALL use `rel="external"`. Existing ejm-cli, ejm-ide, and ejm-harness project links SHALL remain.

#### Scenario: Chess is ready for discovery
- **WHEN** the chess product has been published and `https://chess.ejmlabs.com` has been verified
- **THEN** each studio project list that names the current products includes a chess link to that URL with `rel="external"`
- **AND** the ejm-cli, ejm-ide, and ejm-harness links remain

#### Scenario: Chess is not published
- **WHEN** the chess destination is not yet published and verified
- **THEN** the studio either omits chess or labels it as planned
- **AND** it shows no active Play claim and no live chess project link

#### Scenario: Shared packages include an unreleased chess identity
- **WHEN** the studio is built with shared packages that include chess before its site is published and verified
- **THEN** shared and studio navigation omit chess

### Requirement: Accurate chess presentation
Published chess discovery SHALL describe a multiplayer browser game and SHALL offer a Play action to the verified canonical site. Its status, source access, license, and availability SHALL match the published chess facts. It SHALL NOT use coding-tool setup, a simulated showcase, or a claim that every studio project has the same license.

#### Scenario: Play opens the published game
- **WHEN** a visitor uses the published chess Play action
- **THEN** it opens `https://chess.ejmlabs.com`
- **AND** the entry describes a multiplayer browser game and states any published beta limit

#### Scenario: Chess facts differ from the coding tools
- **WHEN** the published chess status, source access, license, or availability differs from the coding-tool projects
- **THEN** the chess entry states the chess facts
- **AND** it does not claim that every studio project has the same license, offer coding-tool setup, or present a simulated chess session
