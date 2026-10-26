# Spec Delta

## Purpose

Defines how the ejm-ui design system is distributed for use outside its repository.

## ADDED Requirements

### Requirement: Public packages are an explicit list
Only the packages listed in the release plan SHALL be published to a public registry. Packages not listed, and the `ejm-tui` crate, SHALL stay private. All published packages SHALL share one version and pin each other exactly.

#### Scenario: Publish set
- **WHEN** the first ui release is prepared
- **THEN** the publish set is the listed packages (`tokens`, `core`, `ui`, and `ssg` if included) and every other workspace package keeps `private: true`

#### Scenario: Pin check
- **WHEN** a package depends on another published package
- **THEN** it depends on the exact released version

### Requirement: Verified, credential-safe publication
A package SHALL be published only after the packed-consumer proof passes against the exact tarballs, a human maintainer approves the version, and the registry scope is confirmed owned. Publication SHALL carry registry provenance from the repository's workflow, and no registry token SHALL be stored in a repository file.

#### Scenario: Proof before publish
- **WHEN** a maintainer starts publication
- **THEN** the packed-consumer proof has passed on the same commit

#### Scenario: Scope not owned
- **WHEN** the registry scope is not confirmed owned
- **THEN** nothing is published and the site shows no install line

### Requirement: Brand materials follow their stated rights
A published package SHALL NOT carry brand artwork whose rights are reserved unless the owner has approved that redistribution. Every published package SHALL include its license and third-party notices.

#### Scenario: Tokens package contents
- **WHEN** `@ejm/tokens` is packed for publication
- **THEN** the tarball contains no reserved brand logo or artwork file unless approval is recorded, and keeps font files with their original notices

### Requirement: An install line only for real packages
The site SHALL show an install line for ejm-ui only after the registry confirms every package in that line at the stated version, and SHALL state the Node and bundler requirements.

#### Scenario: Packages exist
- **WHEN** the registry lists the published packages at the version
- **THEN** the page shows `npm install @ejm/ui @ejm/tokens react react-dom tailwindcss` with the Node requirement and a link to the bundler setup

#### Scenario: Packages do not exist
- **WHEN** any package in the line is missing from the registry
- **THEN** the page shows no install line for ejm-ui
