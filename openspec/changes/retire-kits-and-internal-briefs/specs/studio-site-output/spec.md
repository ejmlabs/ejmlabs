# Spec Delta

## Purpose

Defines the Studio site's generated public output so visitors see current
material while needed assets, notices, and response headers remain usable.

## ADDED Requirements

### Requirement: Retired kit offers are absent

The Studio site SHALL omit kit ZIP downloads, X kit pages, and the swag gallery
from its generated public output and current navigation. It SHALL offer no
replacement archives for this retirement.

#### Scenario: Site output is built

- **WHEN** a contributor builds the Studio site from this source
- **THEN** the output contains no ZIP files, X kit subtree, or swag subtree
- **AND** the home page and brand gallery offer none of those retired resources

### Requirement: Live asset contracts remain usable

The Studio site SHALL retain the CSS, scripts, fonts, icons, motifs, and response
headers required by its current pages. Retained assets and font notices SHALL
preserve their source bytes and remain reachable at the paths those pages use.

#### Scenario: Current pages load from generated output

- **WHEN** a contributor checks the generated home page and brand gallery
- **THEN** their local links and assets resolve within that output
- **AND** the output carries the source response headers and required notices

### Requirement: Verification scope is clear

The Studio guides SHALL distinguish local output checks from hosted checks,
browser verification, and publication. They SHALL keep the remaining shared UI
adoption and live kit retirement work visible until that work is verified.

#### Scenario: Local checks pass

- **WHEN** a contributor reads the cleanup evidence after a successful local build
- **THEN** it reports the checks performed and the hosted and browser checks unrun
- **AND** it makes no claim that the public site has been deployed or verified
