# Spec Delta

## ADDED Requirements

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
