# Spec Delta

## Purpose

Defines the measurable, repeatable checks and critique that keep ejmlabs visuals at the owner's bar of Anthropic, Stripe and OpenAI without copying them.

## ADDED Requirements

### Requirement: Written bar and critique
The repo SHALL carry a quality rubric (typography, rhythm, depth, imagery, motion, detail, responsiveness, accessibility, performance) and a dated critique that compares pages with the references at matching sizes in light and dark, ranks findings and records fixes.

#### Scenario: No copying
- **WHEN** the critique proposes a fix
- **THEN** it expresses an ejmlabs idea and does not reproduce a reference's layout, imagery or text

### Requirement: Automated gates
Checks SHALL fail on horizontal overflow from 320px to 5120px, touch targets under 44px on coarse pointers, contrast below the stated ratios, stale generated files, bundle budget breaches, em dashes, missing simulated labels, and missing head, header or toggle on a route.

#### Scenario: Overflow regression
- **WHEN** a change makes a route overflow at any matrix size
- **THEN** the matrix check fails and names the element

### Requirement: Performance measured
Each prerendered route SHALL be measured for transfer size of HTML, CSS, JavaScript and fonts, and for Largest Contentful Paint and layout shift under throttled mobile conditions, and the results SHALL be recorded.

#### Scenario: Budget report
- **WHEN** the performance check runs
- **THEN** it prints each route's sizes and timings against its budget and exits non-zero on any breach
