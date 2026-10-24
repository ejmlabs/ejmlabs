# Spec Delta

## Purpose

Defines an illustration and surface system generated from the ejmlabs symbol, with soft in-palette gradients and grain and optional draw-on motion, used where other brands would use custom artwork.

## ADDED Requirements

### Requirement: Deterministic generated art
The kit SHALL generate its illustration assets from the symbol by a deterministic script, so the same inputs always produce the same files, and the files SHALL use only brand colors.

#### Scenario: Regeneration is stable
- **WHEN** the art generator is run twice
- **THEN** both runs produce identical files
- **AND** the generator's check mode reports the committed files as current

#### Scenario: Palette discipline
- **WHEN** an art file is inspected
- **THEN** every color is a brand color or a brand color at reduced opacity

### Requirement: Art for named places
The system SHALL provide art for the hero, section dividers, empty states and error pages, each in light and dark treatments.

#### Scenario: Empty and error states
- **WHEN** a screen shows an empty state or an error page
- **THEN** it can use a matching illustration that does not carry meaning on its own
- **AND** the illustration has empty alternative text or an accessible label as its role requires

#### Scenario: Dark treatment
- **WHEN** the theme is dark
- **THEN** each art asset has a dark treatment with no pale boxes or lost lines

### Requirement: Surface treatments
The system SHALL offer soft gradient and grain surface treatments in brand colors for large panels, and text over them SHALL keep at least 4.5:1 contrast.

#### Scenario: Text over a gradient
- **WHEN** copy sits on a gradient panel
- **THEN** every text color against the lightest and darkest point behind it is at least 4.5:1

### Requirement: Draw-on motion
Line art MAY animate by drawing on once when it enters view, SHALL use only transform, opacity and stroke offset, and SHALL show its final state immediately under reduced motion or without scripts.

#### Scenario: Draw-on plays once
- **WHEN** a line-art element scrolls into view
- **THEN** it draws on within 1.5 seconds and stays drawn

#### Scenario: No motion
- **WHEN** the visitor prefers reduced motion
- **THEN** the finished art is shown at once
