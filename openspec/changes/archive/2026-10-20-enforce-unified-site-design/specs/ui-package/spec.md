# Spec Delta

## ADDED Requirements

### Requirement: Shared site design authority
ejm-ui SHALL own site typography, spacing, controls, branding, themes, motion, and reusable page composition. Consuming sites SHALL supply content, routes, product data, and semantic state through public shared contracts. They SHALL NOT define a second visual recipe.

#### Scenario: Change the shared design
- **WHEN** a shared site recipe changes and the four sites rebuild against it
- **THEN** each site uses the changed recipe without a consumer style edit

### Requirement: Site design enforcement
The shared site build SHALL reject consumer CSS rules, inline styles, local visual classes, and unsupported shared-component overrides. It SHALL name the source location and direct the author to the owning shared contract. Consumers SHALL NOT disable this check.

#### Scenario: Consumer attempts a local override
- **WHEN** a site adds a local stylesheet rule or a styled JSX element
- **THEN** its build fails with the file and reason before publication

#### Scenario: Static boundary remains available
- **WHEN** a site uses the shared Static boundary with its structural contents wrapper
- **THEN** the build accepts it while preserving static content and live shared controls

### Requirement: Shared motion policy
Site heroes SHALL use one shared entrance policy with no per-site motion switch. Heading and body content SHALL stay visible at first paint, and reduced motion SHALL show final states without travel.

#### Scenario: Open a product site
- **WHEN** CLI, IDE, or Harness loads with motion enabled
- **THEN** its hero uses the same shared entrance sequence

#### Scenario: Motion is reduced
- **WHEN** reduced motion is requested or scripts are unavailable
- **THEN** all content remains readable and no script is required to reveal it

### Requirement: Shared composition coverage
Shared components SHALL cover the active sites' section rhythm, content columns, metrics, actions, text, branding, footer identity, asset previews, and product playback presentation. Missing patterns SHALL be added to ejm-ui before consumer adoption.

#### Scenario: A site needs another pattern
- **WHEN** content requires a pattern absent from the shared library
- **THEN** the pattern is implemented and checked in its shared owner and consumed through a public export

### Requirement: Uniformity preserves site contracts
Design consolidation SHALL preserve route content, heading semantics, keyboard use, static navigation, no-script content, theme behavior, and existing asset budgets. Local verification SHALL NOT imply deployment.

#### Scenario: Check a consolidated site
- **WHEN** the site builds and its normal checks run
- **THEN** its routes and shared controls work within the existing byte limits without a site-specific visual exception
