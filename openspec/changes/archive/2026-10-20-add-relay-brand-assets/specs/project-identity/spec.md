# Spec Delta

## MODIFIED Requirements

### Requirement: Related and distinct project marks

The design kit SHALL provide separate CLI, IDE, Harness and Relay symbols with the studio identity's rounded ribbon forms and existing colors. Each symbol SHALL remain distinct without color. The studio's original logo files SHALL remain unchanged.

#### Scenario: Compare the project family

- **WHEN** the four project marks appear together in one color
- **THEN** each has a distinct silhouette and shares the studio mark's curved ribbon language

## ADDED Requirements

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
