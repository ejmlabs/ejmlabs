# Design

## Context

See `proposal.md` for motivation. This repository has six generated OpenSpec skills and no root `AGENTS.md`. The skills can be loaded on their own. Other sessions have unrelated work in the checkout.

## Goals / Non-Goals

**Goals:** Each instruction entry point states the same three rules. Skill metadata and existing workflow steps remain valid.

**Non-Goals:** This guidance change does not audit the product's test suite or replace runtime code.

## Decisions

- Put the rules directly in each skill. A shared reference alone would not meet the request for explicit guidance in every skill.
- Use three short sections with consistent text. Package exceptions need a concrete unmet requirement; tests need distinct protection; cleanup stays safe and local.
- Add root instructions with the existing writing and OpenSpec rules so future agents find the policy at project entry.
- Inspect coverage and use the existing skill and OpenSpec validators. A new test that only matches this prose would add no useful protection.

## Risks / Trade-offs

- Repeated rules can drift. Keep the wording consistent in this change and inspect all entry points before completion.
- Refreshing generated OpenSpec skills can replace local additions. Reapply these project rules whenever generated guidance is refreshed.
