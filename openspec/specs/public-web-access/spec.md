# public-web-access Specification

## Purpose

Let people worldwide discover and download ejmlabs products while preserving attack protections and private service boundaries.

## Requirements

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

Changing public access SHALL preserve country restrictions, Access applications, webhook method restrictions, and authentication on other hosts and services. Project records SHALL describe this boundary without importing unrelated proprietary product identities or operations.

#### Scenario: Private service remains private

- **WHEN** public host security rules are changed
- **THEN** existing country restrictions and Access policies on unrelated private hosts remain intact
- **AND** project documentation records only the scope needed to protect that boundary

### Requirement: Accurate operational evidence

Operational documentation SHALL distinguish configured country access from observed regional reachability and record active protections, verification limits, and recovery steps without credentials.

#### Scenario: Verification from one network

- **WHEN** checks run from only one source network
- **THEN** the report states that country restrictions were inspected but reachability from every country was not tested

### Requirement: Public production entry points retain edge protection

The four public production sites SHALL serve traffic through their protected custom domains. Unnecessary production workers.dev addresses and version URLs SHALL be disabled. Deployment configuration SHALL preserve these limits. Intentional previews SHALL have a separate, verified access policy before publication.

#### Scenario: Alternate production URL

- **WHEN** an anonymous client requests an unwanted alternate production Worker hostname
- **THEN** that hostname does not serve the production application

#### Scenario: Production redeployment

- **WHEN** a public site is redeployed from its checked-in configuration
- **THEN** it does not reopen a production workers.dev address or version URL

#### Scenario: Intentional preview

- **WHEN** a preview is published outside the production zone's protection
- **THEN** its access policy is enforced and verified independently of the production WAF

#### Scenario: Canonical clients remain compatible

- **WHEN** alternate production URLs are disabled
- **THEN** canonical pages, documentation, release metadata, and existing digest-bound downloads retain their expected browser and machine-client behavior
