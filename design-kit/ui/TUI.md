# Terminal app guide

The terminal guide now lives in `ejm-ui`, which owns every terminal component. Read `packages/tokens/rust/TUI.md` there. This page is a short summary.

- **Components** come from the contract, `packages/core/contract.json` in ejm-ui. Rust apps depend on the `ejm-tui` crate (`crates/ejm-tui`) and JavaScript CLIs on `@ejm/ink`; both print the same lines for the same inputs. Run `cargo run --example showcase` in `crates/ejm-tui` to see every component and state.
- **Colors** come from `theme.json`. `rust/ejm_theme.rs` is generated from it, and the crate keeps a copy of the ejm-ui build of that file.
- **Containerless.** No boxes, frames or tonal panels, no composer box and no popups. Groups are separated by a blank row and one hairline rule. Never paint a background.
- **Conversation blocks.** A transcript is made of `Message`, `ToolCall`, `Markdown` and `CommandMenu`. The workspace around it is `SessionHeader`, `ActivityLine`, `ResourceLine` and `workspace_controls`, laid out by `WorkspaceLayout`.
- **Plain.** Every state is named by a word, a glyph or both, so it reads under `NO_COLOR` and in ASCII. Empty, loading and error states have one plain sentence and at most one action.
