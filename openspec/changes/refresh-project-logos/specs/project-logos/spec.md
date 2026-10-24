# Spec Delta

## Purpose

Defines the cli, ide and harness project logos as a family drawn from the ejmlabs symbol's visual grammar, with checks for legibility and consistency.

## ADDED Requirements

### Requirement: Family built from the symbol's grammar
Each project mark SHALL be built from nested, parallel ribbons of one constant stroke width and equal gaps, with rounded terminals and at least one open end, matching the ejmlabs symbol's rhythm.

#### Scenario: Family resemblance
- **WHEN** the three marks are shown beside the ejmlabs symbol
- **THEN** each reads as drawn from the same ribbon language
- **AND** each keeps a distinct silhouette that identifies its project

### Requirement: Distinct project ideas
The cli mark SHALL suggest a prompt running into a cursor, the ide mark a pair of facing brackets around a workspace, and the harness mark an open H joined by a crossbar.

#### Scenario: Recognition at a glance
- **WHEN** a mark is viewed at 32 px
- **THEN** its project idea is recognisable without its name

### Requirement: Legible at small sizes
Every mark SHALL stay legible at 16, 24 and 32 px on Sage, Forest and Paper squares, with ribbon gaps that remain open at 16 px.

#### Scenario: Favicon
- **WHEN** a 16 px favicon is rendered
- **THEN** the ribbons are distinguishable and no gap closes

### Requirement: Palette and asset set
Marks SHALL use only Sage, Forest, Ink and Paper, and each project SHALL ship the same asset set as before (marks, horizontal logos, square icons, favicons, touch icons, manifest, social card, editable logos) regenerated from one script.

#### Scenario: Reproducible
- **WHEN** the generator runs twice
- **THEN** the outputs are identical

### Requirement: Written review
The repo SHALL record a review of the previous marks and the reason for each change, and the new family SHALL be shown with its review on the family preview.

#### Scenario: Review recorded
- **WHEN** a reader opens the project logo guide
- **THEN** it explains what changed and why for each project
