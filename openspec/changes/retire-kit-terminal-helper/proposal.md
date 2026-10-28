# Proposal

## Why

The design kit still ships `ui/rust/ejm_tui.rs`, a hand-written terminal helper, its specimen page `ui/tui.html`, and a guide built around them. ejm-cli now draws from the `ejm-tui` crate in ejm-ui, which follows the shared component contract. The kit copy is superseded and teaches boxed parts (a composer box, an overlay picker) that the contract forbids.

## What Changes

- Delete `ui/rust/ejm_tui.rs` and `ui/tui.html`.
- Rewrite `ui/TUI.md` as a short summary that points to the ejm-ui guide, the `ejm-tui` crate and `packages/core/contract.json`.
- Update `README.md`, `CATALOG.md`, `REVIEW.md`, `ui/OPEN.md` and the kit index so nothing links to the removed files.
- Keep `ui/rust/ejm_theme.rs` and its generator unchanged.

## Capabilities

### New Capabilities

- `kit-terminal-guidance`: the kit sends terminal app authors to the ejm-ui crate and contract.

### Modified Capabilities

None.

## Impact

Design kit documentation and one specimen page. The Studio site does not read these files. No publication or deployment is implied.
