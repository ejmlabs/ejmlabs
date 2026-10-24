# Design

## Context

See `proposal.md` for the requested policy. Seven instruction entry points already share the footprint, package, test-value, and campground rules. The studio's `site/src/index.html` links to product-owned guides. `site/README.md` identifies the source, build, and hosting process; `CONTRIBUTING.md` defines human review and release gates.

## Goals / Non-Goals

**Goals:** Make the docs duty available when any project skill is loaded alone. Give contributors concrete source paths, checks, ownership, and evidence needed for publication claims.

**Non-Goals:** Add a docs platform, new runtime tooling, or another product portal. Publication and deployment remain separate release actions.

## Decisions

- Append the same public docs rule after the four existing policies in `AGENTS.md` and all six project skills. A root-only rule would leave independently loaded skills incomplete. Preserve metadata and workflow text.
- Keep product guide content in its owning repository. Use the studio guide to route contributors to the three existing docs sites, shared layout guidance, and studio discovery links. Duplicating guides here would create competing sources.
- Require affected docs in the same change and a reason for changes with no public docs impact. Define depth by useful setup, configuration, workflows, APIs, examples, errors, limits, and recovery, according to relevance.
- Use existing site tests and the build for validation. Report local results separately from live publication, and preserve the current review and release gates. A new wording test would duplicate a prose review without protecting runtime behavior.

## Risks / Trade-offs

- Shared policy text can drift across independently loaded skills. Verify all seven entry points against the agreed paragraph without adding a permanent text-matching test.
- Other sessions are changing the site and design kit. Make scoped prose edits, preserve their files, and report any unrelated check failures.
- A successful build does not prove live availability. Require verification of affected public routes after authorized publication before claiming the live site is current.
