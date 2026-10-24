# Spec Delta

## Purpose

Defines the `ejm-ui` repo: the single home of ejmlabs tokens, theme, components, hooks, layouts, views and art, and how sites consume it.

## ADDED Requirements

### Requirement: One design system repo
The `ejm-ui` repo SHALL contain packages for tokens, the Tailwind theme, components, hooks, layouts, views and art, plus a gallery site built with the same packages.

#### Scenario: Fresh checkout
- **WHEN** a developer clones `ejm-ui`, installs and runs the build
- **THEN** every package builds and the gallery site builds without manual steps
- **AND** the test and check commands pass

### Requirement: Single source for color and brand
Colors SHALL come from `theme.json` and brand tokens, and the Tailwind theme, CSS variables, Rust theme, Monaco themes and terminal schemes SHALL be generated from them, with a check that fails when a generated file is stale.

#### Scenario: Stale generated file
- **WHEN** `theme.json` changes and generated files are not rebuilt
- **THEN** the check command fails and names the stale file

### Requirement: Consumption by sites and apps
Sites and apps SHALL consume `ejm-ui` as versioned packages, and the repo SHALL document how each of ejmlabs.com, cli, ide and harness sites and the IDE app adopt it.

#### Scenario: Site adopts the system
- **WHEN** a site follows the adoption guide
- **THEN** it renders with the shared theme, header, theme toggle and footer without site-specific CSS for those parts

### Requirement: No outward actions
Creating a remote, pushing, publishing a package or deploying SHALL NOT happen as part of building the repo and SHALL require the owner's explicit approval.

#### Scenario: Local only
- **WHEN** the repo is created
- **THEN** it exists locally with committed history and no remote

### Requirement: Public site contracts own design and behavior
All active sites SHALL consume public ejm-ui package exports for visual
primitives, tokens, navigation, theme behavior, docs controls and product
playback. Sites SHALL keep authored content and product-specific link policy
local. Shared gaps SHALL be fixed in their owning package before adoption.

#### Scenario: Consumer design boundaries
- **WHEN** a site builds its styles and page components
- **THEN** it uses public package CSS and component exports without scanning
  private sibling source or copying shared interaction implementations

#### Scenario: Docs remain interactive
- **WHEN** prose is prerendered without hydration
- **THEN** navigation, contents, code-copy controls and code tabs still run
  through shared components, with no local control adapter

#### Scenario: Cross-route fragment in Static prose
- **WHEN** a shared site link names a fragment on a different pathname or query
- **THEN** the SSG router uses native document navigation before rendering the destination
- **AND** the complete prerendered document supplies the target section, without a consumer workaround
- **AND** same-document fragments and ordinary client navigation retain their existing behavior
