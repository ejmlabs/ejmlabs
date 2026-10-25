# Spec Delta

## Purpose

Keeps chess product guides with the chess owner. Studio links to those guides after publication are planned in `link-ejm-chess`.

## ADDED Requirements

### Requirement: Chess owns its guides

The chess product SHALL own its player, developer, fair play, privacy, and operations documentation and build checks. Player guidance SHALL cover time controls, online adjudication, reconnects, ranked eligibility, ratings, reporting, and appeals. Developer guidance SHALL cover setup, public APIs, deployment, data recovery, and measured service limits.

#### Scenario: Player opens fair play guidance

- **WHEN** a player follows the chess guide's fair play link
- **THEN** the published policy explains permitted play, reports, review, appeals, retained data, and detection limits without exposing private detection thresholds or credentials

#### Scenario: Contributor prepares a release

- **WHEN** chess behavior or configuration changes
- **THEN** its guides, examples, navigation, API reference, and relevant recovery steps are updated and checked with the owning product build before publication is claimed
