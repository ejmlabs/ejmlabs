# Spec Delta

## Purpose

Defines how an ejmlabs site opens: a hero that shows the product as layered, floating windows with real depth and a staged entrance, so a visitor sees the product before reading about it.

## ADDED Requirements

### Requirement: Layered product windows in the hero
A hero variant SHALL be able to present one to three product windows (terminal, IDE, engine) layered directly on the page ground (no hero panel or slab), each with a window frame, a defined elevation, and content from the real product's documented behavior.

#### Scenario: Hero shows the product
- **WHEN** a page uses the product hero with an ejm-cli window
- **THEN** a terminal window with the real screen layout appears layered on the page with a visible elevation
- **AND** the window is labelled as a simulated screen wherever it is not a live demo

#### Scenario: Windows stay honest
- **WHEN** a product window shows output
- **THEN** every command, tool name and state shown matches behavior documented in the product's README
- **AND** no invented benchmark, customer or number appears

### Requirement: Depth system
The kit SHALL define named elevation levels for floating surfaces, used only by product windows, overlays and menus, and no other surface SHALL cast a shadow.

#### Scenario: Elevation is reserved
- **WHEN** a card, tag, callout or panel is rendered
- **THEN** it has no drop shadow
- **AND** a product window or overlay uses one of the named elevation levels

#### Scenario: Depth works in dark mode
- **WHEN** the page theme is dark
- **THEN** floating windows remain visibly separated from the page ground through shadow and tone
- **AND** all text inside them keeps at least 4.5:1 contrast

### Requirement: Staged entrance
The hero SHALL reveal its copy, then its product windows, in a short ordered sequence that uses only transform and opacity and finishes within 1.2 seconds.

#### Scenario: Motion is allowed
- **WHEN** the page loads with no reduced-motion preference
- **THEN** copy appears first, then windows, in order, and the final state matches the static layout

#### Scenario: Reduced motion
- **WHEN** the visitor prefers reduced motion or scripts are disabled
- **THEN** the hero appears complete with no animation and no hidden content

### Requirement: Composition adapts to every screen
The hero composition SHALL reflow from a 320px phone to a 5120px ultrawide with no horizontal overflow, keeping the product windows legible.

#### Scenario: Small screens
- **WHEN** the viewport is 375px wide
- **THEN** the windows stack beneath the copy, scale to fit, and stay readable
- **AND** no element is wider than the viewport

#### Scenario: Ultrawide screens
- **WHEN** the viewport is 3440px wide
- **THEN** the copy and windows use the width in a deliberate two-column composition
- **AND** the headline does not float small in empty space
