# account-entry-presentation Specification

## Purpose

Give public account pages a clear next step while preserving authentication, consent and entitlement boundaries.

## Requirements

### Requirement: Protected browser entry
Relay SHALL serve its shared sign-in presentation to signed-out HTML requests for protected browser pages at HTTP 401. API requests SHALL retain JSON authentication errors. Sign-in return URLs SHALL accept only exact configured-origin account, device, control and privacy paths without query or fragment.

#### Scenario: Signed-out browser opens control or privacy
- **WHEN** an unauthenticated request accepts HTML
- **THEN** the response shows a shared sign-in page with the intended local destination
- **AND** protected account or session content is absent

#### Scenario: API request is unauthenticated
- **WHEN** an unauthenticated request uses an API endpoint or does not accept HTML
- **THEN** it retains a JSON 401 response

#### Scenario: Untrusted callback is supplied
- **WHEN** a callback uses another origin, path, query or fragment
- **THEN** sign-in rejects it or uses the safe default

### Requirement: Account actions follow available state
Relay SHALL show billing and privacy actions only when their configuration, consent and account state permit them. Unavailable actions SHALL have a short useful explanation. Rights requests, withdrawal, anonymous opt-out, Global Privacy Control and retention information SHALL remain available as required.

#### Scenario: Billing is not configured
- **WHEN** a signed-in account opens its page without usable billing configuration
- **THEN** checkout is absent and the page explains availability without an operator checklist

#### Scenario: Consent is not current
- **WHEN** a user has not met the age and consent requirements for a profile action
- **THEN** that action is absent and the next valid step is clear

#### Scenario: Global Privacy Control is active
- **WHEN** a privacy page is rendered with a live Global Privacy Control signal
- **THEN** rejoin is absent and the privacy explanation remains visible

### Requirement: Registry device approval remains explicit
The registry SHALL retain its device-code confirmation, full permission disclosure, permanent publisher-name warning and session revocation controls when adopting shared presentation.

#### Scenario: A publisher connects a terminal
- **WHEN** the registry displays a device request
- **THEN** approval remains disabled until the user confirms the code and origin of the request
- **AND** the full session permissions remain visible before approval
