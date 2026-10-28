# Design

## Context

ejm-ui owns the terminal components (`crates/ejm-tui`, `@ejm/ink`) and the full terminal guide (`packages/tokens/rust/TUI.md`). Its asset import no longer copies the kit's helper or guide.

## Goals / Non-Goals

Remove the superseded helper and its specimen, and point readers at the owner. Do not change the generated theme files, the application specimen `ui/index.html`, or the site.

## Decisions

Keep `ui/TUI.md` as a short summary rather than a full copy, so the kit cannot drift from the owner's guide. Delete `ui/tui.html` because it only rendered the removed helper's output; the crate's showcase example replaces it.

## Risks / Trade-offs

A reader without ejm-ui checked out sees only the summary. The summary names every path to open there.
