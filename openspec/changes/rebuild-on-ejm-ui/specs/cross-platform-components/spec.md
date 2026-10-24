# Spec Delta

## Purpose

Defines how one component system reaches every ejmlabs GUI type: React web and desktop, TypeScript terminals through Ink, and Rust terminals through ratatui, with shared logic, shared states and shared theme.

## ADDED Requirements

### Requirement: Strict TypeScript
All JavaScript-side code in `ejm-ui` SHALL be strict TypeScript, and the type check SHALL be part of the repo check.

#### Scenario: Type error
- **WHEN** a component has a type error
- **THEN** the repo check fails and names the file

### Requirement: Headless core
`@ejm/core` SHALL hold framework-neutral logic (state machines, the component contract of props and states, formatting) with no dependency on React, Ink or the DOM.

#### Scenario: Core without a UI framework
- **WHEN** `@ejm/core` is imported in a plain Node test
- **THEN** it runs without React, Ink or a DOM

### Requirement: One React runtime for web and desktop
The same React components SHALL serve the sites, the gallery and the IDE desktop app with no adapter or compat layer.

#### Scenario: IDE app adoption
- **WHEN** the IDE app imports a component from `@ejm/ui`
- **THEN** it renders under the app's React 19 and passes the same tests as on the web

### Requirement: Ink terminal components
`@ejm/ink` SHALL provide terminal components for the contract's primitives (text, rows, status, stat figure, table, empty, loading and error states, prompt) from the generated theme, and every state SHALL remain readable under NO_COLOR.

#### Scenario: No color
- **WHEN** NO_COLOR is set
- **THEN** every state is distinguishable by text or glyph

### Requirement: Rust terminal crate
`crates/ejm-tui` SHALL provide ratatui widgets and helpers for the same primitives and states, generated from the same theme, usable by ejm-cli and other Rust tools, with tests.

#### Scenario: Crate tests
- **WHEN** `cargo test` runs in the crate
- **THEN** every widget and state test passes, including the NO_COLOR path

### Requirement: Parity gate
A check SHALL compare the component contract with the web, Ink and Rust catalogs and fail when a component or state is missing in a target that claims it.

#### Scenario: Missing state
- **WHEN** the Rust crate lacks a state that the contract lists for a component it claims
- **THEN** the parity check fails and names the component and the state
