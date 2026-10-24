# Spec Delta

## ADDED Requirements

### Requirement: Browser identity exports

Each project SHALL provide a matching SVG favicon, multi-size ICO, touch icon, install icons and manifest, and 1200 by 630 social card. These assets SHALL use its current project mark and be reproducible from the canonical source.

#### Scenario: Import branding into a project site

- **WHEN** a project site imports the project's browser identity bundle
- **THEN** browser tabs, installed shortcuts, and social previews show that project's mark and name

### Requirement: Theme-aware site identities

The shared site kit SHALL provide each project logo with its name in the surface's foreground color, a Sage mark, and monochrome treatments for Sage and forced-color surfaces, without a new runtime dependency. The studio site's project listing SHALL show each project logo while keeping the studio header and footer identity.

#### Scenario: Read a project identity across themes

- **WHEN** a reader changes the site's theme
- **THEN** each project logo keeps its shape and its name follows the surface's foreground color

#### Scenario: Browse the studio's projects

- **WHEN** a reader opens the studio project list
- **THEN** CLI, IDE, and Harness each show their own logo and keep a link with the full project name
