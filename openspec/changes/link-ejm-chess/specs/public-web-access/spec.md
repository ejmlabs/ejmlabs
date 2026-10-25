# Spec Delta

## Purpose

Keeps studio links to chess on the public canonical host, as ordinary public links.

## ADDED Requirements

### Requirement: Canonical chess destinations
Every published studio link to chess or a chess guide SHALL use `https://chess.ejmlabs.com`. It SHALL NOT use a `workers.dev` hostname, a deployment version URL, or an unpublished preview host as the public destination.

#### Scenario: A visitor follows a published chess link
- **WHEN** a visitor follows a published studio link to chess or a chess guide
- **THEN** the destination is on `https://chess.ejmlabs.com`

#### Scenario: The canonical host is not published
- **WHEN** chess is not published at `https://chess.ejmlabs.com`
- **THEN** the studio does not publish a `workers.dev` hostname, deployment version URL, or preview host as the public chess destination

### Requirement: Studio chess links stay public
A published studio chess link SHALL be an ordinary public web link. The studio SHALL NOT place a country restriction or a private-service sign-in between the visitor and that link.

#### Scenario: A visitor outside the United States
- **WHEN** a visitor outside the United States uses a published studio chess link
- **THEN** the studio serves that link without a country restriction or a private-service sign-in

#### Scenario: An anonymous visitor
- **WHEN** an anonymous visitor uses a published studio chess link
- **THEN** the studio does not require an account before the visitor can follow the link
