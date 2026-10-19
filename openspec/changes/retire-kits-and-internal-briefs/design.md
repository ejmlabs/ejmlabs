# Design

## Context

See [the proposal](proposal.md) for the scope and reason. The current site is
`site/src/index.html`. Its build runs the retained UI and web generators, copies
the design kit, and creates a ZIP. The live home, theme, demos, headers, fonts,
and other product sites still use that retained kit. The earlier docs phase
removed an unlinked redesign brief whose named scene modules do not exist.

## Goals / Non-Goals

**Goals:** Retire obsolete downloads and social/swag handoffs now, with bounded
diffs, current guides, and an unchanged active runtime asset tree.

**Non-Goals:** This phase does not adopt React or `@ejm/*`, replace kit downloads,
remove the remaining live kit, change license terms, change canonical workflow
sources, deploy, or claim browser or hosted acceptance.

## Decisions

- Remove archive generation and offers rather than assemble replacement ZIPs.
  The user asked to retire these kits. Existing Git history preserves them.
- Filter `social/x-kit/`, `swag/`, and ZIP files out of the copied site tree.
  Remove their current gallery links and sections in the same change. Retain
  other kit paths until the owning package can replace their live contracts.
- Remove 38 obsolete paths: three committed ZIPs; `source/`, `README.md`,
  `index.html`, and `profile-copy.md` in both X kit copies; and the five unused
  helpers named in the tasks. Keep all retained font files with their notices.
- Split remaining deletions. Either complete 53-file X kit copy would exceed
  the 1 MB review diff limit by itself because of outlined SVG text. Root
  rendered X assets plus swag can form one later bounded slice; copied rendered
  X assets form another. Neither is a live site input after this phase.
- Keep the existing Node build and checker interfaces. Add output checks to
  the site's existing tests for the changed public contract, including retired
  material, working local links, exact copied assets, and response headers.
- `ejm-ui` remains the shared owner. A later clean source assembly must resolve
  its public exports, then Studio can adopt them and remove the live kit. A
  renamed folder or another copied shared implementation is not adoption.

## Risks / Trade-offs

- Old kit ZIP and X/swag URLs stop being emitted. Current pages and docs must
  remove those offers; this phase does not create redirects or replacement kits.
- Broad deletion could break live styling or another consumer. Preserve hashes
  and file modes of all retained kit files except the named gallery/docs edits.
  Keep generators required by the existing build and consistency checks.
- Historical provenance describes retired material. Keep that record and add
  a dated scope note rather than rewrite its source observations.
- A local pass is not publication. Leave hosted reviews, browser checks, and
  deployment status explicit, and do not archive the unfinished migration.

## Migration Plan

1. Revise the docs-only plan, remove its spec skip, and define output behavior.
2. Remove the bounded obsolete paths and archive work, filter retired material,
   and update the current gallery, guides, changelog, and output tests together.
3. Run the site build and tests, inspect local links and headers, verify retained
   asset bytes and modes, strict OpenSpec validation, whitespace, and diff caps.
4. Use normal exact-commit human admission, two AI passes, and protected checks.
   No hosted run or public deployment is part of local preparation.
5. Land the remaining bounded inert-file removals, establish trusted public UI
   source, then adopt owner exports and retire the remaining live kit.
6. Verify the migrated site in browser sizes and themes, then sync specs and
   archive only after all tracked work and required reviews are complete.

Revert this phase's commit and rebuild to restore its prior source output. A
live rollback still requires the normal publication decision and verification.

## Studio check entry precursor

Studio owns the local `node scripts/check.mjs` entry. Until public owner
adoption, it imports the retained `design-kit/scripts/check-kit.mjs` without
copying or changing that implementation. Existing local commands and the site
test hook use the entry. The build keeps its existing generation and copy steps.

The compatibility gap is that shared governance still invokes the legacy kit
path, while Studio has not adopted a pinned public `ejm-ui` check contract.
`ejm-ui` owns shared tokens and site checks; `ejmlabs/.github` owns the shared
governance command; Studio owns the consumer entry and its assembly checks.
The shared command can adopt the Studio entry in a later reviewed change.
Dependency direction stays from Studio to the public UI owner.

Keep the entry when replacing its temporary import with public owner checks and
Studio assembly checks. Remove the legacy fallback and checker only after
pinned public exports resolve in a clean checkout and pass owner and consumer
checks, with no remaining kit dependency. Verify the bridge against the existing
site tests and exact before/after output bytes and modes. No source adoption,
workflow change, hosted acceptance, or publication is part of this precursor.

The local precursor passes all three existing site tests under Node 24.19.0.
Direct and entry commands produce the same output and exit status for both a
successful check and a temporary invalid-class probe, restored after the check.
Before/after builds emit the same 238 paths and 9,535,524 bytes; every output
file preserves its bytes and mode. All 236 retained kit source paths and 41
workflow paths keep their Git blobs and modes. The affected guides and plan
pass 30 local Markdown link checks, including three heading anchors, strict
OpenSpec validation, whitespace checks, and the cumulative PR bounds. Browser,
hosted reviews, and deployment remain unrun for this precursor.

## Earlier Verification

The docs phase checked 17 distinct local link targets, strict OpenSpec, and
whitespace. Site and browser checks were not run for that earlier docs phase.

## Current Local Verification

The bounded output phase passed local checks on 19 October 2026:

- `npm --prefix site test` passed all three output tests under Node 24.19.0.
  Its setup checks generated kit consistency and contrast before running the
  real site build.
- The emitted home page and gallery pass the existing local link, anchor,
  structure, metadata, class, and asset checks. No ZIP, X kit subtree, swag
  subtree, or retired gallery offer remains in the output.
- Copied runtime directories and font notices match source bytes. Emitted
  response headers match `design-kit/web/_headers` exactly.
- Exactly 38 additional tracked paths were removed, totaling 8,897,945 source
  bytes. All 393 retained paths outside the 11 named edited files preserve
  their main-branch bytes and modes, including 10 notice/license paths and 41
  workflow-related paths. The edited existing files retain their modes too.
- The 21 Markdown references in the affected guides and plan resolve to 15
  distinct local targets. Changed text has no em dashes.
- Strict OpenSpec validation, whitespace, and whole-PR admission bounds pass.
  The final diff measurements are recorded in the PR summary.

The generated output contains 238 files and 9,535,593 bytes. This is a local
output measurement, not a before/after speed or footprint claim. No owner
package check, browser review, Cloudflare dry run, hosted CI, AI review, or
publication ran for this local phase. Remaining source removals, trusted public
UI assembly, Studio adoption, live kit retirement, and browser checks stay open.

## Root X and swag removal verification

The next bounded source slice removes 54 inert files totaling 8,209,750 bytes:
the root X kit, its bundled font copies and notices, and the retired swag
artwork, mockups, and handoff docs. That slice left the copied X kit for task 3.2.
Active brand masters and live font notices keep their bytes and modes.

All three existing site tests pass under Node 24.19.0. A real build before and
after deletion emits the same 238 paths. Only the two updated kit guides differ;
all 236 other output files retain their bytes, including runtime assets and
headers. Strict OpenSpec and whitespace checks pass. This local evidence does
not establish hosted review, browser acceptance, or deployment of this slice.

## Copied X removal verification

Task 3.2 removes the remaining 38 inert files under `design-kit/social/x-kit/`,
totaling 1,904,357 source bytes. The bundled font copies and their notices are
removed together. The build already excludes this subtree; no active build
input changes. All 310 retained paths outside the seven edited guides and plan
files keep their Git blobs and modes, including active assets, font notices,
and all workflow sources. The original provenance observations stay unchanged.

All three existing site tests pass under Node 24.19.0. The before/after builds
emit the same 238 paths. Only the two updated kit guides differ; all 236 other
output files retain their bytes and modes, including runtime assets and headers.
The 21 local Markdown references in affected guides and plan files resolve to
15 distinct targets. Strict OpenSpec and whitespace checks pass. This slice
adds no deletion tests and makes no browser, hosted review, or deployment claim.
Public owner source assembly, Studio adoption, and live kit retirement stay open.
