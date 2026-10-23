# Proposal

## Why

The project skills repeat engineering rules without naming package owners or dependency direction. Old design-kit guidance can also send shared UI work into this repository after consumers have adopted `ejm-ui`.

## What Changes

- Define ownership across `ejm-harness`, `ejm-cli`, `ejm-ide`, `ejm-ui`, and `ejmlabs` in `AGENTS.md`.
- Require every local skill to apply the ownership rules when planning, changing, checking, or reviewing work.
- Require public package interfaces, owner-first shared fixes, acyclic dependencies, and explicit limits for temporary adapters.
- Explain the studio site's boundary with shared UI packages in contributor and site documentation.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `agent-engineering-policy`: require package ownership, dependency direction, and boundary checks in project instructions and skills.

## Impact

This repository changes instruction files, contributor documentation, and the engineering-policy specification. Product runtime behavior, dependencies, and build outputs stay the same. Companion guidance updates belong to each sibling repository's own workflow; they do not make this repo the owner of product code or shared UI packages. No publication is included.
