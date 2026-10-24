# Tasks

## 1. Project instructions

- [x] 1.1 Add root `AGENTS.md` with explicit package reuse, test-value, campground, writing, and OpenSpec rules; verify the file states each rule and preserves the user's workflow.
- [x] 1.2 Add the three engineering rules to all six project `SKILL.md` files; verify complete coverage and unchanged frontmatter and workflow bodies.

## 2. Guidance verification

- [x] 2.1 Validate all six skills with the existing skill validator, validate this change with `openspec validate --strict`, and inspect the scoped diff for errors and unrelated edits.

All six skills passed the installed validator that supports existing OpenSpec
`compatibility` metadata, using the existing pre-commit Python environment.
Strict OpenSpec validation and instruction coverage checks passed. The original
six frontmatters and workflow bodies are unchanged. This guidance edit adds no
tests and requires no site or native build.

## Workflow follow-up

- Sync the completed policy to the main spec.
- Archive the completed change and verify the archived record.
