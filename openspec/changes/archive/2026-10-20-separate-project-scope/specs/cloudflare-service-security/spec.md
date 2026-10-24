# Spec Delta

## MODIFIED Requirements

### Requirement: Complete service boundary inventory

The operating record SHALL identify each in-scope project zone and deployed service, its public or private entry points, protection boundary, owner, and verification status. It SHALL distinguish active delegation from pending setup and record unavailable checks as unknown. Unrelated resource inventories and operations SHALL remain in their owning records.

#### Scenario: Zone has incomplete delegation

- **WHEN** a zone remains initializing without matching public delegation or an active edge certificate
- **THEN** the record identifies the setup gap and does not describe the domain as a verified Cloudflare-protected site

#### Scenario: Provider has several preview products

- **WHEN** a Worker is reviewed for alternate exposure
- **THEN** the review covers its production workers.dev address, version URLs, current Worker Previews, and custom domains separately

#### Scenario: Shared account contains unrelated services

- **WHEN** a project audit uses an account that also holds unrelated products or private services
- **THEN** its retained inventory includes only in-scope project resources
- **AND** it preserves outside service boundaries without copying their identities or operating records into the project
