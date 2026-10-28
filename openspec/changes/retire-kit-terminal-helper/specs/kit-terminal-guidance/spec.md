# Spec Delta

## Purpose

Keep the design kit's terminal guidance pointing at the components ejm-ui owns.

## ADDED Requirements

### Requirement: Terminal guidance points to the owner
The design kit SHALL direct terminal app authors to the `ejm-tui` crate and the component contract in ejm-ui, and SHALL NOT ship its own terminal helper code.

#### Scenario: Reading the kit's terminal guide
- **WHEN** a reader opens `ui/TUI.md` in the design kit
- **THEN** it names the ejm-ui guide, the `ejm-tui` crate and `packages/core/contract.json`, and describes no boxed composer or popup
