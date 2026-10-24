# Spec Delta

## Purpose

Helps people find user and developer documentation for the three ejmlabs projects from the studio site.

## ADDED Requirements

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
