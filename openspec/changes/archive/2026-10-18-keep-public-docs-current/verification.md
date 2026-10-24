# Verification

## Completed checks

- All seven instruction entry points contain the same five policies in order, with footprint and speed first.
- Removing the inserted docs paragraph reproduces each instruction file's captured prior content exactly. Skill metadata, earlier policies, and workflow instructions are preserved.
- All six skills pass the maintained `skill-creator` frontmatter validator.
- Scoped additions contain no em dashes or trailing whitespace. The contributor guide's human admission and review section is preserved verbatim.
- `openspec validate keep-public-docs-current --strict` passes.
- Both delta specs are synced. `openspec validate --specs` passes all three current specs; existing titles, Purpose sections, and untouched requirements remain intact.
- `npm --prefix site run build` passes and regenerates the shared kit assets and studio output through the existing build.

## Existing site check failures

`npm --prefix site test` passes the shared response-header check and fails two other existing checks. The current kit pages and catalog reference undefined classes `ejm-card`, `ejm-cards`, `ejm-projects`, and `ejm-parts`; the studio home page also references these classes. The failures concern active site and kit work outside this guidance change. No test or runtime source was changed to bypass them.

## Publication status

This change updates local instruction and contributor sources. It does not publish or deploy the public site, and live publication was not verified. The new guidance requires affected public routes and pages to be checked after authorized publication before reporting the live site as current.
