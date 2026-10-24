# Proposal

## Why

Chess uses an older isolated UI tree, and Relay's native HTML shell has separate
layout recipes. Both need the same opinionated design, readable type, controls
and calm motion as the newly unified sites, with all visual choices owned by
ejm-ui.

## What Changes

- Bring Chess's existing public board, clock, form and identity contracts into
  the current shared owner without replacing newer site recipes.
- Replace the generic Chess mark with an original geometric mark that follows
  the existing ejmlabs identity language. Generate its header and favicon
  variants from the shared identity source.
- Extend fixed application composition for forms, game workspaces, player rows,
  move history and supporting content. Remove Chess's local visual overrides.
- Align Relay's existing shared native HTML profile with the same typography,
  header geometry, spacing, control recipes and motion. Retain native forms and
  its system-theme privacy contract.
- Check React and native consumers for local visual drift, and document the
  public contracts and local verification limits.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `ui-package`: Extend exclusive shared design ownership and enforcement to
  Chess and Relay, including application composition and the native profile.

## Impact

ejm-ui owns tokens/assets, components, application recipes, native HTML styling,
motion and design checks. Chess owns its page content, game state and board
adapter. CLI owns Relay's routes, native form composition and controller state.
Dependencies flow from both consumers into public @ejm exports, never back into
a product. Studio owns this cross-repository plan and the specification record.

The existing Chess source is `/private/tmp/ejm-chess-2yz1VsKp/ejm-chess`; Relay is
`/Users/everettmorgan/Desktop/ejm-cli/relay`. Preserve existing uncommitted work,
game launch gates, server authority, account flows and encryption behavior.
This change adds no service, analytics, browser persistence or public access.
Verify locally; publication remains a separate action.
