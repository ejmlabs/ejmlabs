# Spec Delta

## Purpose

Defines the craft bar for ejmlabs application and terminal interfaces: dashboards, charts, tables, empty states and fine detail that match the quality of the site, consistent in light and dark.

## ADDED Requirements

### Requirement: Dashboard composition
The application kit SHALL provide a dashboard composition of stat figures (large numbers with labels, no boxes), a chart, a table and an activity list that reflows from a phone to an ultrawide without clipping.

#### Scenario: Reflow
- **WHEN** the dashboard is viewed at 375px and at 3440px
- **THEN** it has no horizontal overflow at either size
- **AND** every chart and table remains readable

### Requirement: Charts
Charts SHALL use the six brand hue roles, carry a text legend and a table alternative, and show values without relying on color alone.

#### Scenario: Accessible chart
- **WHEN** a chart renders
- **THEN** a legend names every series in text
- **AND** the underlying values are available as a table or text list

### Requirement: Empty, loading and error states
Every list, table and panel in the kit SHALL define empty, loading and error states with a plain sentence and one action where an action exists.

#### Scenario: Empty list
- **WHEN** a list has no items
- **THEN** it shows a short sentence and one action
- **AND** it does not show a zero or a blank area

### Requirement: No containers in applications
Application and terminal screens SHALL group content with spacing, hairline rules and tone, not with bordered or filled boxes.

#### Scenario: Dashboard without boxes
- **WHEN** the dashboard renders
- **THEN** stat figures, chart, table and activity list sit on the page ground separated by space and hairlines
- **AND** the terminal guide groups panes with spacing and a single rule, not box-drawing frames

### Requirement: Terminal parity
The terminal guide and helpers SHALL describe and produce screens that follow the same states, spacing and color roles as the application kit, in dark, light and no-color modes.

#### Scenario: No color
- **WHEN** the NO_COLOR variable is set
- **THEN** every state is still distinguishable by text or glyph

### Requirement: Theme consistency
Every application primitive SHALL meet 4.5:1 text contrast and 3:1 control-border contrast in both themes.

#### Scenario: Contrast check
- **WHEN** the kit's contrast check runs
- **THEN** it passes for every role on every surface in both themes
