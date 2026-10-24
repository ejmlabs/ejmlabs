# Spec Delta

## Purpose

Defines the typographic and editorial language of ejmlabs pages inside the brand fonts: display scale, rhythm, metadata rows, feeds, buttons and links, so pages read with a confident, consistent voice.

## ADDED Requirements

### Requirement: Display and text scale
Headings and body text SHALL follow a fluid scale in Manrope and IBM Plex Mono that adds a display tier above the brand's 48px, with tracking, line height and wrapping set per tier.

#### Scenario: Display type scales with the screen
- **WHEN** the viewport grows from 375px to 3440px
- **THEN** display type grows fluidly without breaking words
- **AND** body text stays between 17px and 20px with a line height between 1.5 and 1.7

#### Scenario: Wrapping is balanced
- **WHEN** a heading wraps onto several lines
- **THEN** the lines are balanced and no line ends in a single short word

### Requirement: Metadata rows
The kit SHALL provide a row pattern that lists labelled facts (for example version, license, stack, status) with a mono label, a value and a hairline between rows.

#### Scenario: Facts for a project
- **WHEN** a project card lists its license and stack
- **THEN** each fact appears as a labelled row with a visible divider and tabular alignment

#### Scenario: Facts on a narrow screen
- **WHEN** the container is under 360px wide
- **THEN** each row stacks its label above its value without clipping

### Requirement: Feed rows
The kit SHALL provide a feed pattern for dated entries such as releases and notes, with a title, a short description, a date and a category, scannable without cards.

#### Scenario: Release list
- **WHEN** a page lists three releases
- **THEN** each appears as a row with title, description, date and category, separated by space and a single divider

#### Scenario: Keyboard use
- **WHEN** a visitor tabs through the feed
- **THEN** each entry's link receives a visible focus indicator

### Requirement: Buttons and links
Buttons and links SHALL have defined rest, hover, focus and pressed states, including an arrow motion on call-to-action buttons, and SHALL keep a 44px touch target on touch screens.

#### Scenario: Call to action
- **WHEN** a visitor hovers a call-to-action button with an arrow
- **THEN** the arrow moves a short distance and the surface changes tone
- **AND** reduced-motion visitors see the tone change only

#### Scenario: Touch target
- **WHEN** the device has a coarse pointer
- **THEN** every button and link target is at least 44px in both directions
