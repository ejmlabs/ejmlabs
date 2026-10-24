# Spec Delta

## Purpose

Defines application and terminal surfaces built from the same theme source: dashboard, charts, states and terminal parity.

## ADDED Requirements

### Requirement: Dashboard without boxes
The component library SHALL provide a dashboard of stat figures, a chart, a hairline table and an activity list that reflows from 375px to 3440px with no horizontal overflow.

#### Scenario: Reflow
- **WHEN** the dashboard is viewed at 375px and at 3440px
- **THEN** it has no horizontal overflow and every chart and table stays readable

### Requirement: Accessible charts
Charts SHALL use the six brand hue roles, carry a text legend and a table alternative, and show values without relying on color alone.

#### Scenario: Chart text
- **WHEN** a chart renders
- **THEN** a legend names every series in text and the values are available as a table

### Requirement: Empty, loading and error states
Every list, table and panel SHALL define empty, loading and error states with a plain sentence and one action where an action exists.

#### Scenario: Empty list
- **WHEN** a list has no items
- **THEN** it shows a short sentence and one action, not a zero or a blank area

### Requirement: Terminal parity and one theme source
The terminal guide and helpers SHALL follow the same states, spacing and color roles, grouping with spacing and rules instead of box frames, and remain readable under NO_COLOR. Web, Rust, Monaco and terminal themes SHALL be generated from `theme.json` with contrast gates of 4.5:1 text and 3:1 control border and focus.

#### Scenario: No color
- **WHEN** NO_COLOR is set
- **THEN** every state is distinguishable by text or glyph
