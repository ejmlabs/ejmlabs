# Design

## Context

See [the proposal](proposal.md) for the reason for this change.
`CLAUDE_REDESIGN_BRIEF.md` names three absent Sun scene modules and says there
is no OpenSpec directory. No tracked guide links to it. The current static
site instead uses `site/src/index.html`; its build refreshes, copies, and
archives `design-kit/`. Tests, response headers, fonts, and published links
also depend on that retained source.

## Goals / Non-Goals

**Goals:** Keep current contributor guidance in the root and site guides;
remove the obsolete handoff; make the owner and migration dependencies clear.

**Non-Goals:** Runtime, site layout, build inputs, public routes, license terms,
workflow review snapshots, and deployment are outside this first phase.

## Decisions

- Delete the unlinked handoff rather than retain its private machine paths and
  obsolete instructions. Current guides already describe the actual site.
- Treat `design-kit/` as a temporary build dependency. `ejm-ui` owns shared
  tokens, components, and site infrastructure; `ejmlabs` owns Studio content,
  discovery, brand guidance, and public download assembly. Consumers must use
  the owner's public exports. Renaming kit folders or copying their code would
  keep the same duplicate authority and private source dependency.
- Keep this phase documentation-only with `skip_specs: true`. The later
  runtime phase must remove that marker and add behavior specs through the
  update workflow before implementation. The pending tasks record that gate.
- Use existing Git, OpenSpec, and local link checks. No dependency, background
  work, runtime overhead, or new test suite is needed for a handoff deletion.

## Risks / Trade-offs

- Deleting a live kit would break the site, headers, and archives. Keep those
  files until public owner source assembly and Studio adoption pass.
- Public kit routes and downloads have existing links. Inventory their
  replacement or relocation before retiring paths, then check downstream
  product links and preserve the required notices and brand provenance.
- Docs can overstate progress. Label adoption and publication checks as
  pending until the corresponding source and hosted evidence exist.

## Migration Plan

1. Remove the obsolete brief, correct current guides, and check docs links,
   strict OpenSpec validation, and whitespace in a protected documentation PR.
2. Verify the existing `ejm-ui` export map and a pinned public source or package
   assembly that a clean public checkout can resolve. Keep dependencies from
   Studio to that owner, with no owner dependency on Studio runtime.
3. Update this plan and behavior specs, then adopt only the needed public
   `@ejm/*` exports. Preserve Studio content, accessibility, metadata, response
   headers, brand masters, provenance, and font licenses. Measure the emitted
   asset and request costs before making performance claims.
4. Remove `design-kit/`, `x-kit/`, their generators, duplicate shared code, and
   stale kit guidance once their remaining dependencies have been replaced or
   deliberately retired. A rename or another copied kit is not a migration.
5. Run the owner contract checks, Studio site and docs build, local asset and
   route checks, and desktop/mobile, theme, keyboard, overflow, console, and CSP
   checks. Use normal human admission, both AI passes, and protected merges.
   Publication remains a separate operation with its own verified result.

Revert this documentation commit to restore the handoff if needed. Runtime
migration needs its own reviewed rollback before changing published output.

## Phase 1 Verification

The docs cleanup checked 17 distinct local link targets in the affected guides
and this plan, with no missing files. Strict OpenSpec validation and whitespace
checks passed. The deleted brief had no inbound public guide links; all three
scene modules it named were absent.

Site build, browser, owner package, deployment, hosted CI, and AI review checks
were not run for this docs-only phase. Runtime adoption, kit retirement, and
their verification remain open tasks. No live-site publication is claimed.
