# Public web access

> Project-scoped excerpt revised October 20, 2026. Unrelated account resources and operations are omitted. This is not the original full account record or a new live audit.

## Purpose

Let people worldwide discover and download ejmlabs products while preserving attack protections and private service boundaries.

## ADDED Requirements

### Requirement: Worldwide public access

The public hosts `ejmlabs.com`, `ide.ejmlabs.com`, `cli.ejmlabs.com`, and `harness.ejmlabs.com` SHALL NOT block or challenge requests solely because of their source country.

#### Scenario: Ordinary visitor outside the United States

- **WHEN** a visitor outside the United States requests a public page without triggering a threat control
- **THEN** the site serves it without a country restriction or private-service sign-in

### Requirement: Attack protections remain active

Public requests SHALL remain subject to exploit scanner filtering, Cloudflare's managed WAF, platform DDoS protection, HTTPS enforcement, and existing service authentication. Public access SHALL NOT use a blanket security bypass.

#### Scenario: Scanner probe

- **WHEN** a visitor requests `/.env` or `/wp-login.php` on a public host
- **THEN** the edge blocks the request

#### Scenario: Ordinary documentation request

- **WHEN** a visitor requests an existing documentation page
- **THEN** the WAF evaluates the request without imposing a country condition

### Requirement: Private services retain their boundaries

Changing public access SHALL preserve country restrictions, Access applications, webhook method restrictions, and authentication on other hosts and services.

#### Scenario: Private service remains private

- **WHEN** public host security rules are changed
- **THEN** existing country restrictions and Access policies on unrelated private hosts remain intact

### Requirement: Accurate operational evidence

Operational documentation SHALL distinguish configured country access from observed regional reachability and record active protections, verification limits, and recovery steps without credentials.

#### Scenario: Verification from one network

- **WHEN** checks run from only one source network
- **THEN** the report states that country restrictions were inspected but reachability from every country was not tested
