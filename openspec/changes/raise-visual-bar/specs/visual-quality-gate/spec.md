# Spec Delta

## Purpose

Defines a measurable, repeatable quality bar for the ejmlabs kit and sites: a written rubric, a side-by-side critique against reference sites, and automated checks that prevent regressions.

## ADDED Requirements

### Requirement: Written quality bar
The kit SHALL include a document that names the quality dimensions (typography, rhythm, depth, imagery, motion, detail, responsiveness, accessibility) and states what meeting the bar looks like for each.

#### Scenario: Reviewer uses the bar
- **WHEN** a reviewer opens the quality bar
- **THEN** each dimension has concrete, checkable statements rather than adjectives

### Requirement: Reference critique
A critique SHALL compare ejmlabs pages with the reference sites at matching viewport sizes in light and dark, list findings ranked by impact, and record what was fixed and what remains.

#### Scenario: Critique is reproducible
- **WHEN** the critique is repeated
- **THEN** it uses the same viewport matrix and page list
- **AND** it records the date and the findings it closed

#### Scenario: No copying
- **WHEN** the critique proposes a fix
- **THEN** the fix expresses an ejmlabs idea in ejmlabs' own layout, imagery and words, and does not reproduce a reference's layout, imagery or text

### Requirement: Automated gates
The kit's checks SHALL fail on horizontal overflow between 320px and 5120px, on contrast below the stated ratios, on undocumented or undefined classes, on stale generated files, on pages that skip the shared head and header, and on em dashes.

#### Scenario: Overflow regression
- **WHEN** a change makes a page overflow horizontally at any matrix size
- **THEN** the viewport check exits with a failure and names the offending element

#### Scenario: Class regression
- **WHEN** a stylesheet defines a class that no catalog documents
- **THEN** the kit check fails and names the class

### Requirement: Honest visuals
Simulated product visuals SHALL carry a visible simulated label where they are not live demos, and SHALL NOT show numbers, customers or features the products do not have.

#### Scenario: Static product window
- **WHEN** a static product window appears on a page
- **THEN** it is labelled as a simulated screen
