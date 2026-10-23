## MODIFIED Requirements

### Requirement: Site design enforcement
The shared site build SHALL reject consumer CSS rules, inline styles, local visual classes, and unsupported shared-component overrides. It SHALL name the source location and direct the author to the owning shared contract. The check SHALL run by default and consumers SHALL NOT disable it.

#### Scenario: Consumer attempts a local override
- **WHEN** a site adds a local stylesheet rule or a styled JSX element
- **THEN** its build fails with the file and reason before publication

#### Scenario: Static boundary remains available
- **WHEN** a site uses the shared Static boundary with its structural contents wrapper
- **THEN** the build accepts it while preserving static content and live shared controls

#### Scenario: CSS appears during development startup
- **WHEN** a local visual stylesheet is created while the development server starts
- **THEN** requests after startup reject it with its source location
- **AND** requests recover after the stylesheet is corrected

#### Scenario: Consumer omits or disables a legacy option
- **WHEN** a consumer omits the old opt-in option or passes its old false value
- **THEN** consumer visual overrides still fail the build

## ADDED Requirements

### Requirement: Native registry design parity
Extension registry pages SHALL use the public native ejm-ui profile for layout, theme, fonts, forms and controls. Build checks SHALL reject authored local visual recipes and raw HTML injection while preserving ordinary form and API behavior.

#### Scenario: Registry assets are built
- **WHEN** the registry builds
- **THEN** its shared stylesheet, fonts and project mark are served from its own origin
- **AND** authored pages pass the shared native design check

### Requirement: Recorded Harness output remains traceable
Harness playback SHALL show useful recorded work in its terminal presentation. Any formatted figures SHALL derive from retained raw recording fields. Nearby disclosure SHALL identify the local recording and distinguish admission reservations from measured process use.

#### Scenario: A visitor watches the recorded workflow
- **WHEN** Harness playback shows running, queued and completed work
- **THEN** its values match the retained recording
- **AND** the page does not claim a worker or model runs in the browser
