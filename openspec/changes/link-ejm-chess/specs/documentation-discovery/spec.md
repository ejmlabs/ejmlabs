# Spec Delta

## Purpose

Lets studio visitors open the published chess player and developer guides on the chess site.

## ADDED Requirements

### Requirement: Published chess guide links
After the chess player guide and developer guide are published on `chess.ejmlabs.com` and those destinations have been checked, the studio SHALL link to both guides on that host. Those links SHALL NOT replace existing published project links. The studio SHALL NOT host the chess guide text.

#### Scenario: Find the chess guides
- **WHEN** a visitor looks for project guides on the studio site after both chess guide destinations have been verified
- **THEN** the studio links to the chess player guide and the chess developer guide on `https://chess.ejmlabs.com`
- **AND** existing published project links remain

#### Scenario: A chess guide is not verified
- **WHEN** either chess guide destination has not been published and checked
- **THEN** the studio does not link to that guide

#### Scenario: Guide text stays with chess
- **WHEN** the studio publishes a chess guide link
- **THEN** the link leaves the studio site for `https://chess.ejmlabs.com`
- **AND** the studio page does not reproduce chess rules, fair play, privacy, or operations text
