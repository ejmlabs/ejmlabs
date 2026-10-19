# Proposal

## Why

Public contributors need current source guidance. An obsolete redesign handoff
contradicts the repository's OpenSpec setup, and the docs still name the
retained design kit as the shared implementation owner.

## What Changes

- Remove `CLAUDE_REDESIGN_BRIEF.md` after checking references and its obsolete
  source paths. Keep public brand guides, notices, and workflow review sources.
- Correct the root and site guides to describe current public source and the
  split between Studio content and shared `ejm-ui` contracts.
- Record the remaining owner-first site migration and kit retirement. Keep
  `design-kit/`, `x-kit/`, live build inputs, and generated archives until their
  dependencies have replacements and the affected contracts pass.

## Capabilities

### New Capabilities

None in this documentation phase. This change declares `skip_specs: true`.

### Modified Capabilities

None. Before runtime migration, revise this plan and add the relevant behavior
specs instead of extending a documentation-only exception.

## Impact

`ejmlabs` owns Studio content, discovery, brand guidance, and public download
assembly. `ejm-ui` owns shared tokens, components, and site infrastructure.
Later consumption must flow from Studio to pinned public owner exports,
without private sibling imports or copied shared implementations. This phase
changes docs and removes a handoff only. It adds no package, build work, runtime
cost, or deployment. Check local docs links, OpenSpec, and whitespace; leave
site migration and public source assembly tasks open.
