# Spec Delta

## Purpose

Protect Cloudflare account resources and service entry points while preserving public access, private service boundaries, and working automation.

## ADDED Requirements

### Requirement: Complete service boundary inventory

The operating record SHALL identify each accessible zone and deployed service, its public or private entry points, protection boundary, owner, and verification status. It SHALL distinguish active delegation from pending setup and record unavailable checks as unknown.

#### Scenario: Zone has incomplete delegation

- **WHEN** a zone remains initializing without matching public delegation or an active edge certificate
- **THEN** the record identifies the setup gap and does not describe the domain as a verified Cloudflare-protected site

#### Scenario: Provider has several preview products

- **WHEN** a Worker is reviewed for alternate exposure
- **THEN** the review covers its production workers.dev address, version URLs, current Worker Previews, and custom domains separately

### Requirement: Administrative access requires MFA

The account SHALL require MFA for human administration. Access reviews SHALL record member roles and distinguish pending invitations from accepted access without publishing personal identities or recovery information.

#### Scenario: Administrator access review

- **WHEN** accepted account membership is reviewed
- **THEN** each human administrator has MFA and a role appropriate to the recorded use

### Requirement: Automation uses bounded authority

Automation credentials SHALL grant only the resources and operations required by their recorded consumer. Reviews SHALL include data-reading permissions, expiry, and applicable source restrictions. A credential SHALL NOT gain token-creation authority merely to deploy a site or audit settings.

#### Scenario: Site deployment credential

- **WHEN** a consumer only deploys one Worker
- **THEN** its credential cannot manage unrelated Workers, account members, billing, or other credentials

#### Scenario: Broad read credential

- **WHEN** a credential can read account-wide databases, object storage, logs, or Worker code
- **THEN** the review treats those data permissions as authority requiring a stated use and a bounded scope

### Requirement: Credential replacement preserves recovery

Credential migration SHALL identify consumers, store replacement secrets in an approved secret store, prove the required operations, and preserve independent recovery before retiring an old credential. Secret values SHALL NOT appear in source, logs, chat, or audit evidence.

#### Scenario: Consumer remains unknown

- **WHEN** a broad credential has an unmapped consumer
- **THEN** the migration records the unresolved dependency and does not claim completion or revoke the credential blindly

#### Scenario: Replacement fails verification

- **WHEN** the replacement cannot perform a required operation
- **THEN** the migration retains working recovery and corrects the scope before retiring the old credential

### Requirement: Effective edge protections are verified

Active proxied services SHALL retain strict origin TLS, HTTPS enforcement, DNS integrity, DDoS protection, and available managed WAF protection. Verification SHALL distinguish provider defaults, customer rules, and observed outcomes. Missing customer entrypoints alone SHALL NOT establish that automatic Free WAF protection is absent.

#### Scenario: Free zone has no customer managed entrypoint

- **WHEN** the API returns no explicit customer managed-phase deployment for a Free zone
- **THEN** the record accounts for Cloudflare's automatic Free Managed Ruleset and states any remaining verification limit

#### Scenario: Active DNSSEC zone

- **WHEN** DNSSEC is reported as verified
- **THEN** the public parent DS matches the provider's key tag, algorithm, digest type, and digest

### Requirement: Private service and storage boundaries remain intact

Hardening SHALL preserve Access protection, application authentication, webhook method and signature controls, private storage, and binding-only services. It SHALL NOT introduce public storage access or a broad security bypass to restore availability.

#### Scenario: IDE release download

- **WHEN** the IDE serves release metadata or a digest-bound download through its Worker
- **THEN** the underlying R2 bucket remains private and the established cache, range, and digest behavior remains intact

#### Scenario: Private staging application

- **WHEN** an anonymous visitor requests a protected staging route
- **THEN** Access denies or redirects the request before the private application is served

#### Scenario: Webhook exception

- **WHEN** an endpoint intentionally bypasses Access for provider callbacks
- **THEN** the exception remains limited by host, anchored path, permitted method, and application verification

### Requirement: Direct origins and monitoring have explicit controls

Services outside the HTTP proxy SHALL have a recorded purpose and verified origin authentication, TLS where applicable, and network exposure. Checks SHALL preserve media protocols and monitoring semantics. Unverified origin controls SHALL remain open findings.

#### Scenario: Direct media service

- **WHEN** a DNS-only media endpoint is reviewed
- **THEN** the review verifies its required protocols and origin controls before changing proxy or firewall settings

#### Scenario: Monitoring Worker

- **WHEN** a Worker uses workers.dev as its only intended monitoring endpoint
- **THEN** the endpoint is retained until its authenticated contract and replacement path have been verified without sending a false heartbeat

### Requirement: Evidence supports each completion claim

The result SHALL record before and after controls, compatibility checks, rollback steps, unresolved findings, and limits of verification. Shared documentation SHALL omit secrets, personal identities, and private origin details. Configuration checks SHALL NOT be described as authenticated workflow or worldwide reachability tests.

#### Scenario: Origin checks are incomplete

- **WHEN** the edge is configured securely but origin authentication or network controls remain unverified
- **THEN** the result reports the remaining work and does not claim complete service security

#### Scenario: Documentation is only edited locally

- **WHEN** operating or public documentation changes have not been published and checked
- **THEN** the result reports the local changes without claiming the live docs are updated
