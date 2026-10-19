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

**Non-Goals:** The original output phase does not adopt React or `@ejm/*`, replace
kit downloads, remove the remaining live kit, change license terms or canonical
workflow sources, deploy, or claim browser or hosted acceptance. The source
admission prerequisite below changes callers and static review data while
preserving the current runtime and output.

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
OpenSpec validation, whitespace checks, and the cumulative PR bounds. That
local preparation ran no browser, hosted checks, or deployment.

### Hosted guidance repair

Keep `CONTRIBUTING.md` byte-for-byte with the pinned shared community template.
Studio's root and site guides own the local check commands, compatibility gap,
upstream owners, and removal condition. Link those guides to each other and to
this plan; do not add product-specific sections to the shared template.

The first admitted [PR #8 run](https://github.com/ejmlabs/ejmlabs/actions/runs/39318957037)
at `6890106a632da571fba295912634449f2c6c94ae` passed Quality and both complete
Codex Sol 6.1 medium reviews, with zero findings. Repository standards rejected
the added `CONTRIBUTING.md` section because it differed from the pinned template.
Restore those exact template bytes and move the guidance into the owner guides.
The repair changes only docs and this plan. Reuse the unchanged runtime tests
and build evidence, verify runtime Git blobs and modes and retained output,
and run focused docs-link, pinned-standard, strict OpenSpec, whitespace, and
whole-PR bound checks. The revised head needs fresh human acceptance before
another hosted admission. Browser review and deployment remain unrun.

The docs repair passes the pinned standards validator, 29 local Markdown link
checks with two heading anchors, strict OpenSpec, whitespace, and the PR bounds.
All 313 untouched tracked paths preserve their Git blobs and modes. The same
238 retained output files preserve their 9,535,524 bytes and modes. Runtime
tests and builds were not repeated because the repair changes no runtime input.
These checks do not admit or review the revised commit on GitHub.

## Public UI source admission prerequisite

Studio starts from protected main
`d943a119ebcce92931d1b3d46c85d287b6cac408`. Rotate both reusable callers and the
release `standards-ref` together from
`aa4144fa978d711a5e009b384718b4cf27cf87bf` to reviewed shared implementation
`6717b433c462e01abaed86e2118e4843827598cb`. Replace the old review-context pair
with exact old/new sources from the canonical exporter. Treat these snapshots
as static data; never import or execute them in builds or checks.

Add `.github/ui-source.json` with only repository `ejmlabs/ejm-ui` and revision
`7cf86428d0266297901ee52d0e137df100f8c23d`, the reviewed public UI main commit.
Use the existing shared source assembly. Do not add a local source downloader,
private-source credential, or another assembly engine. The manifest and its
`.github` parent must be ordinary nonsymlink paths.

`ejmlabs/.github` owns workflow admission, source preparation, and Quality.
`ejm-ui` owns public token, font, and site contracts. Studio owns the manifest,
consumer caller, local check entry, and eventual output assembly. Dependency
direction remains Studio to public UI exports. The selected shared Quality
recipe calls `node scripts/check.mjs`, the site tests, and the site build; it
installs the pinned UI lockfile with lifecycle scripts disabled when the
prepared UI archive exists. This prerequisite adds no product dependency or
runtime adapter.

Trusted preparation reads UI selection from protected base and validates the
proposed manifest separately. This installation PR therefore runs the old
protected caller and cannot prove the proposed workflow or UI source executed.
After protected merge, a fresh admitted PR must verify the new caller, exact UI
archive/context identity, both Codex reviews, and all required checks before
task 3.3 can close. Keep all runtime files and six font files in this step.
Later full-font adoption must consume `@ejm/tokens/assets/fonts/*` through the
public owner source and preserve the existing `/design-kit/fonts/*` URLs and
exact notice bytes. `@ejm/ui/fonts/*` are different subset assets.

Validate generated caller shape, canonical source blobs and modes, manifest
schema and trusted-base selection, clean public owner source resolution,
focused preparation tests, pinned standards, affected Markdown links, strict
OpenSpec, whitespace, and whole-PR bounds. Run the existing small site tests and
build; compare all before/after output paths, bytes, and modes and retained
runtime Git blobs. Do not run broad native suites. Local checks establish no
hosted admission, browser acceptance, release, package publication, or site
deployment. Reverting the coupled caller, review data, and UI manifest through
a reviewed PR restores the prior preparation route without changing assets.

### Local source admission verification

On 19 October 2026, public API readback confirms Studio's starting commit and
UI `7cf86428d0266297901ee52d0e137df100f8c23d` on protected main. Shared
`6717b433c462e01abaed86e2118e4843827598cb` is the sole parent of protected
shared main `4db007789439af05750095991ea097f066660cff`.

- Both caller documents match the accepted generator. The replacement static
  review pair has 33 files and 680,257 bytes, including its manifest; all
  canonical trees, blobs, source modes, sizes, and SHA-256 values match.
- The accepted preparation helper exports the exact public UI commit as a
  local archive. All 894 blobs match tree
  `204df7290b5e87c10de65049413474d85c28f8d3`, totaling 15,527,603 source bytes.
  This proof executes no owner script or model call.
- Five existing preparation/context tests pass, including fixed-owner metadata
  validation, trusted-base UI selection, and exact static context export.
  Accepted standards also pass with affected Markdown link checks.
- The Studio entry, all three existing site tests, and the build pass under
  Node 24.19.0. All 276 untouched tracked paths preserve their Git blobs and
  modes. Every live font and notice stays unchanged; all 238 generated output
  files preserve their 9,535,524 bytes and modes.
- Strict OpenSpec, whitespace, and whole-PR bounds pass. The PR summary records
  final diff measurements.

The exact shared implementation is retained under protected reference
`workflow-pins/6717b433c462e01abaed86e2118e4843827598cb`. Readback matches
tree `c07344ae6f5d5f04408b5423857c5da3d41df896`; active rule 25369476 blocks
updates and deletion with no bypass actors. This confirms source retention,
not actual Actions resolution.
Fresh human acceptance, both hosted reviews, all protected checks, and a later
fresh installed-pin PR remain required. No UI dependency install, owner runtime
suite, browser review, release, package publication, or deployment
ran during this local preparation. Keep tasks 3.3 and 4.1 through 4.3 open.

### UI dependency review context repair

Both admitted PR #9 reviews at
`9766ef87b7ea1d37d29562fa8b49616d6d1a001a` returned `complete:false`, with no
findings. The old trusted-base packet contained the proposed UI pin but no UI
archive, manifests, or lockfile. The new mandatory dependency install could not
be fully assessed. Quality, repository standards, readiness, and maintainer
approval passed. An incomplete review does not satisfy the AI gate.

Add separate static data under `review/dependency-sources/ejm-ui/`: the exact
UI root manifest and full lockfile, all ten root workspace manifests, and the
root license from `7cf86428d0266297901ee52d0e137df100f8c23d`, tree
`204df7290b5e87c10de65049413474d85c28f8d3`. These 13 owner blobs total 189,724
bytes. Follow the existing source snapshot manifest contract: repository,
commit, tree, path, Git mode, blob, size, SHA-256, fixture path, and fixture
mode. Ordinary nonexecutable copies are review data, never imported, executed,
or packaged as a shared implementation. Preserve the owner's license scope.

The complete workspace metadata covers `packages/*`, `apps/*`, and `examples/*`.
Record the verified absence of tracked npm configuration, shrinkwrap, and
Node-version overrides; do not invent empty files. Record lifecycle hooks in
the lockfile and the unchanged `npm ci --ignore-scripts` boundary. This is
static install review context, not a runnable UI checkout or advisory audit.

Keep the fixed shared canonical exporter and its 33-file, 680,257-byte context
unchanged. Adding the owner metadata there would exceed its 750,000-byte cap.
Use the existing Git reader and safe static writer for one-off preparation;
add no permanent exporter, dependency, downloader, or workflow behavior.

Verify all selected bytes, blobs, modes, hashes, workspace coverage, recorded
configuration absences, retained shared context, callers, pins, and runtime
inputs. Check affected docs links, strict OpenSpec, whitespace, and cumulative
PR bounds. Reuse prior site build evidence only after proving every build input
unchanged; do not claim a new build. Fresh exact-head human acceptance and both
complete hosted reviews remain required. Task 3.3 and the live kit migration
stay open. Removing this static context through a reviewed PR reverses the
repair without changing the installation or site output.

Local repair checks confirm all 13 copies against the exact UI Git blobs and
retained archive, including source modes, sizes, and SHA-256. The snapshot has
15 ordinary files and 197,272 bytes including its manifest and guide. Workspace
coverage, recorded configuration absences, pinned standards, 34 local Markdown
links with three anchors, strict OpenSpec, whitespace, and cumulative PR bounds
pass. All 312 earlier source paths outside the seven edited guides and plan
files retain their Git blobs and modes, including the 33-file shared review
context, both callers, UI pin, build inputs, and live fonts. The earlier
238-file build evidence is reused; no new build or UI install ran. A separate
local review found no concrete gap. Hosted completeness remains unverified.

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
