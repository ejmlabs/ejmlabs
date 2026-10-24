# Tasks

## 1. Instruction policy

- [x] 1.1 Add the shared public docs policy after the existing four rules in `AGENTS.md` and all six project skills; verify all seven have the same five policies in order, prior content is preserved, and each skill passes the maintained validator.

## 2. Contributor and site guidance

- [x] 2.1 Update `CONTRIBUTING.md` and `site/README.md` with docs review, useful depth, ownership, source paths, checks, and publication evidence; review the prose against current routing and run `npm --prefix site test` and `npm --prefix site run build`, recording any unrelated failures without expanding scope.

## 3. Integration verification

- [x] 3.1 Verify scoped changes have no whitespace errors or em dashes, all prior policies and workflow text remain intact, and `openspec validate keep-public-docs-current --strict` passes; record check results and the distinction between local source updates and live publication.

## Workflow follow-up

- Sync both delta specs, preserving the existing Purpose sections and untouched requirements.
- Archive the completed change under `2026-10-18-keep-public-docs-current` and verify the archived artifacts.
