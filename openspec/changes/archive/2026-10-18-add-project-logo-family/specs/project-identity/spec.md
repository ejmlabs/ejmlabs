# Spec Delta

## Purpose

Provides distinct, related visual identities for CLI, IDE, and Harness within the ejmlabs design kit.

## ADDED Requirements

### Requirement: Related and distinct project marks

The design kit SHALL provide separate CLI, IDE, and Harness symbols with the studio identity's rounded ribbon forms and existing colors. Each symbol SHALL remain distinct without color. The studio's original logo files SHALL remain unchanged.

#### Scenario: Compare the project family

- **WHEN** the three project marks appear together in one color
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
