# Spec Delta

## ADDED Requirements

### Requirement: Product playback contains scrolling
Shared IDE playback SHALL keep its workspace within the playback frame through loading, playback, completion, and restart. Vertical scrolling SHALL stay inside editor and chat regions. Narrow screens SHALL retain horizontal access to the complete workspace.

#### Scenario: Scroll a completed example
- **WHEN** a visitor scrolls the IDE example after playback completes
- **THEN** the workspace stays within its frame without exposing blank space below it
- **AND** editor and chat regions retain their own scrolling

#### Scenario: Restart on a narrow screen
- **WHEN** a visitor restarts IDE playback on a narrow screen
- **THEN** the workspace keeps the frame height and remains accessible horizontally

## MODIFIED Requirements

### Requirement: Site design enforcement
The shared site build SHALL reject consumer CSS rules, inline styles, local visual classes, and unsupported shared-component overrides. It SHALL name the source location and direct the author to the owning shared contract. Consumers SHALL NOT disable this check.

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
