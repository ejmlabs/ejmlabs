# Spec Delta

## ADDED Requirements

### Requirement: Project detail marks
The Projects page SHALL show each approved project mark beside its heading. Marks SHALL remain legible on their band in either page theme, reserve their dimensions and avoid repeating the heading to assistive technology. The names and marks SHALL be present without scripts and remain readable at phone and desktop widths.

#### Scenario: Project identity in both themes
- **WHEN** a visitor opens `/projects/` in Light or Dark
- **THEN** the CLI, IDE and harness headings each show the matching approved mark with clear contrast and no duplicate accessible label

#### Scenario: Static and responsive headings
- **WHEN** the page is viewed with scripts disabled or at phone and desktop widths
- **THEN** each mark remains beside its project name without clipping or horizontal page overflow
