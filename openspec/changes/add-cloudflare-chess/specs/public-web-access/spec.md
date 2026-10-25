# Spec Delta

## Purpose

Requires the chess product host to stay publicly reachable and protected. Studio link destinations for chess are planned in `link-ejm-chess`.

## ADDED Requirements

### Requirement: Chess host worldwide public access

The public host `chess.ejmlabs.com` SHALL NOT block or challenge requests solely because of their source country.

#### Scenario: Ordinary visitor outside the United States

- **WHEN** a visitor outside the United States requests a public chess page without triggering a threat control
- **THEN** the chess host serves it without a country restriction or private-service sign-in

#### Scenario: Chess game connection

- **WHEN** an authorized player outside the United States connects to their game without triggering an abuse control
- **THEN** the chess host accepts the authorized connection without a country-only block or challenge

### Requirement: Chess production entry points retain edge protection

The chess public production site SHALL serve traffic through its protected custom domain. Unnecessary production workers.dev addresses and version URLs SHALL be disabled. Deployment configuration SHALL preserve these limits. Intentional chess previews SHALL have a separate, verified access policy before publication.

#### Scenario: Alternate production URL

- **WHEN** an anonymous client requests an unwanted alternate production Worker hostname for chess
- **THEN** that hostname does not serve the production chess application

#### Scenario: Production redeployment

- **WHEN** the chess site is redeployed from its checked-in configuration
- **THEN** it does not reopen a production workers.dev address or version URL

#### Scenario: Intentional preview

- **WHEN** a chess preview is published outside the production zone's protection
- **THEN** its access policy is enforced and verified independently of the production WAF

#### Scenario: Chess account and game routes

- **WHEN** the checked chess build is published
- **THEN** canonical sign-in, live game connections, and public leaderboard reads work under explicit host protection without a blanket WAF or authentication bypass
