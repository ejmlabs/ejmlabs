# Tasks

## 1. Retire the helper

- [x] 1.1 Delete `ui/rust/ejm_tui.rs` and `ui/tui.html`.
- [x] 1.2 Rewrite `ui/TUI.md` to point at the `ejm-tui` crate and the contract in ejm-ui.
- [x] 1.3 Remove links to the deleted files from `README.md`, `CATALOG.md`, `REVIEW.md`, `ui/OPEN.md` and `index.html`.

## 2. Verify

- [x] 2.1 Run `node design-kit/scripts/check-kit.mjs` and `node design-kit/scripts/build-ui.mjs --check`, and search the repo for the deleted file names.
