# Design

## Decisions

1. Rewrite sentences rather than swap words. The canonical line is "ejmlabs is a one-person lab for small experiments, useful software, and open source tools."
2. The brand guide is still the source of the old wording. Notes about where text came from stay factual ("the brand guide says independent studio") and `design-kit/REVIEW.md` records that the owner changed the description on 2026-10-18.
3. `x-kit/` and `design-kit/social/x-kit/` hold the same files and are edited identically. ejm-ui carries a copy under `packages/tokens/assets/social/x-kit/`. It is edited to match the source and its two sha256 rows in `PROVENANCE.md` are updated by hand, so the "copied unchanged from the kit" statement stays true and `assets.mjs --local` stays green. `--sync` is not used because it would also copy other sessions' unfinished kit edits.
4. Files that reproduce the brand guide's legal text (LICENSE) or are owned by other work are left alone and reported.
