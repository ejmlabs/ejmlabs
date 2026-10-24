# documentation-discovery Specification

## Purpose

Helps people find user and developer documentation for the three ejmlabs projects from the studio site.

## Requirements

### Requirement: Direct guide links

The studio site SHALL offer a user guide and a developer guide for ejm-cli, ejm-harness, and ejm-ide. Each link SHALL open the corresponding guide on that project's domain.

#### Scenario: Find a project guide

- **WHEN** a visitor opens the studio documentation section
- **THEN** each project has named user and developer guide links
- **AND** the links use the project's canonical domain

### Requirement: Documentation navigation

The studio menu and footer SHALL link to its documentation section. The section SHALL remain readable and usable without JavaScript.

#### Scenario: Follow documentation navigation

- **WHEN** a visitor activates Documentation in the menu or footer
- **THEN** the visitor reaches the documentation section
- **AND** all six guide links remain available with JavaScript disabled

### Requirement: Responsive guide discovery

The documentation section SHALL use the site's shared theme and preserve readable links without horizontal page overflow at phone and desktop widths.

#### Scenario: Read documentation choices on a phone

- **WHEN** a visitor opens the studio site at a width of 375 pixels in either theme
- **THEN** all project guide choices fit within the page
- **AND** the links remain available through keyboard navigation

### Requirement: Maintain documentation through each change

Contributor guidance MUST require a public docs review for every change. Product repositories MUST own their guide content, navigation, builds, and checks. The studio MUST own discovery links and shared docs layout guidance. Contributors MUST update affected documentation in the same change or record why no public docs update is needed.

#### Scenario: A product guide or route changes

- **WHEN** a product change affects its user or developer guide, documentation route, or shared docs layout
- **THEN** contributors update the affected guide content and studio discovery links where relevant
- **AND** they use the owning repository's existing source files, builds, and checks

### Requirement: Report documentation publication honestly

Contributor guidance MUST require checking affected documentation and including it in the normal release process. It MUST distinguish source updates and local checks from verified live publication. Guides MUST state relevant availability, verification, security, and performance limits plainly.

#### Scenario: A guide is ready for release

- **WHEN** affected docs have been updated and checked locally
- **THEN** the change summary records the source and check results
- **AND** the summary claims a live update only after publication and the affected public pages have been verified

#### Scenario: New guide routes enter the studio index

- **WHEN** the studio adds discovery links to new product guide routes
- **THEN** the product guides are published and their destinations verified before the studio update is published
- **AND** normal release authorization still applies
