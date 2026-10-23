# project-identity Specification

## Purpose

Provides distinct, related visual identities for CLI, IDE, and Harness within the ejmlabs design kit.

## Requirements

### Requirement: Related and distinct project marks

The design kit SHALL provide separate CLI, IDE, Harness and Relay symbols with the studio identity's rounded ribbon forms and existing colors. Each symbol SHALL remain distinct without color. The studio's original logo files SHALL remain unchanged.

#### Scenario: Compare the project family

- **WHEN** the four project marks appear together in one color
- **THEN** each has a distinct silhouette and shares the studio mark's curved ribbon language

### Requirement: Portable logo assets

Each project SHALL have SVG and PNG symbols, lowercase name lockups, Ink and Paper single-color variants, a Sage primary variant, and square icons for light and dark surfaces. Production SVGs SHALL render without installed fonts or remote assets. Transparent exports SHALL retain alpha.

#### Scenario: Use the logo outside the repository

- **WHEN** a project logo SVG or PNG is copied to another application
- **THEN** it renders with the intended geometry and color without loading a font or a remote file

#### Scenario: Choose a surface treatment

- **WHEN** a project mark is placed on Paper, Sage, or Forest
- **THEN** the kit supplies a suitable primary or single-color variant

### Requirement: Review and usage guidance

The project identity kit SHALL include light and dark family previews, asset selection and clear-space guidance, and a documented export command.

#### Scenario: Review the complete family

- **WHEN** the user opens the family preview
- **THEN** all three project names and marks appear together with their light and dark treatments and small-size examples

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

### Requirement: Relay artwork can be reviewed locally

The Relay asset bundle SHALL include a local light and dark review with the related project marks and Relay samples at 16, 24 and 32 px. Its guide SHALL distinguish locally prepared assets from shared-package adoption and publication.

#### Scenario: Review Relay before adoption

- **WHEN** the user opens the local Relay asset preview
- **THEN** the Relay mark, lowercase name, surface variants and small-size samples are visible alongside the existing family
- **AND** the guide identifies shared-package and application adoption as pending until verified

### Requirement: Targeted export preserves other projects

A targeted Relay export SHALL create the complete portable and browser identity bundle without changing the existing CLI, IDE, Harness or studio artwork. Repeating the same export with the same tools and inputs SHALL produce identical asset bytes.

#### Scenario: Export only Relay

- **WHEN** the asset generator is asked for Relay alone
- **THEN** it exports only Relay assets and its local review files
- **AND** the existing three-product artwork and comparison boards remain unchanged

#### Scenario: Use Relay outside the repository

- **WHEN** the user copies a Relay production SVG or PNG to another application
- **THEN** it renders without remote assets or an installed font and transparent artwork retains alpha

#### Scenario: Repeat the export

- **WHEN** the same Relay inputs are exported twice into separate empty directories
- **THEN** corresponding file names and bytes are identical
