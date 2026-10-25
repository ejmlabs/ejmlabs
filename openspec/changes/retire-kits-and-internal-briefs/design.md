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

### Installed-pin verification

Installation [PR #9](https://github.com/ejmlabs/ejmlabs/pull/9) merged as
`2aa9fd26f39b5a7de1f2ecca63aa84e29d53e69a` after both complete AI reviews and
all required checks passed. Its old caller still could not prove the newly
installed UI handoff. Prepare a fresh guide-only PR against this protected base
to test the installed caller, UI archive/context, dependency install, and Studio
checks. Preserve callers, pins, static review data, runtime files, fonts, and
notices. Reuse the unchanged runtime build proof and check local source identity,
docs, standards, strict OpenSpec, whitespace, and diff bounds. Task 3.3 remains
open until fresh human admission, both complete hosted reviews, and every
protected check pass. Owner API adoption, live kit removal, browser checks, and
site deployment remain separate work.

### Installed-pin acceptance completed

[PR #10](https://github.com/ejmlabs/ejmlabs/pull/10), head
`75800f7d7783ce9ae21f466c7fc147d2b48097d8`, passed fresh admission against
the installed shared pin in
[run 39347228551](https://github.com/ejmlabs/ejmlabs/actions/runs/39347228551).
All eight jobs and five protected statuses passed. Both actual
`gpt-6.1-sol` medium reviews returned `complete:true` with no findings. Native
review `5579343214` records the exact-head human approval. The PR merged
normally as `15b4271e1bb69b13af010e3cdbe40fa50c041f31`; its tree matches the
reviewed head and main protection stayed unchanged.

Strict artifact and executed-log verification binds the public UI archive to
`7cf86428d0266297901ee52d0e137df100f8c23d`, all 894 Git blobs and modes,
and archive SHA-256
`c4208ea475f6bb8d788368acb3059c1d529d1ce6e37e143dce688a4f6706a461`.
Preparation, owner dependency installation, canonical Quality commands, and
both reviewers' full product/UI archive extraction executed. This closes task
3.3. It proves no browser acceptance or site deployment.

## Bounded public asset adoption

Start this actual adoption slice from that verified merged main. Consume six
complete asset families through `@ejm/tokens/assets/*`: favicon (9 files),
fonts (6), icons (16), lockups (9), logos (12), and social (12). Their 64 local
copies total 1,916,019 source bytes. The selected owner families have exactly
the same file inventory, Git blobs, and modes, with no extra owner files.
Motifs and templates remain because their outlined SVG deletions would exceed
the review byte limit in this slice.

Studio owns the small assembly mapping from those exports to existing
`dist/design-kit/<family>/` URLs. `ejm-ui` owns every selected asset and font
notice. Resolve public file anchors with Node's standard `createRequire`
resolver, normalizing native separators for public specifiers, then copy the
complete directories with the existing Node file copy API. Reuse that resolver
in the existing output check; do not create a
second resolver, asset manifest, downloader, or shared implementation.

The only layout adapter fixes the sibling source setup already supplied by
trusted preparation: `<workspace>/ejmlabs` (Studio) and
`<workspace>/ejm-ui` (the exact public pin). Anchor package resolution at the
installed UI root, whose lockfile installation creates the workspace package
links. Local users make the same source layout and run the documented
`npm ci --ignore-scripts` command. A missing checkout or link fails through
normal Node resolution. No private import or fallback copy is permitted.
The adapter is Studio output composition, not another owner build engine.
Remove this legacy URL mapping when full owner site adoption replaces the
remaining retained kit assembly.

Delete only the 64 selected local asset files, including the font files and
their two original notices together. Emit the identical owner notices beside
the fonts. Leave legacy specimen guides unchanged in output; current root and
site guides explain that the complete `/design-kit/` reference is assembled by
the build and that the raw source subtree is no longer standalone. Retain
historical provenance and current license scope.

Before and after builds must match all 238 paths, 9,535,524 bytes, and file
modes. Reuse the three existing site tests, extend their source-byte check to
the six public families and modes, run the affected token generator/provenance
checks, and verify every selected public resolution against the fixed owner
Git tree. Check current docs, pinned standards, strict OpenSpec, whitespace,
and the whole PR's normal and conservative diff forms against 200 files,
12,000 changed lines, and 1,000,000 bytes. Add no new broad runtime suite.

This slice rotates no workflow or source pin and changes no CSS, JavaScript,
page markup, metadata, headers, or rendered output. Full owner API adoption,
the remaining live kit and duplicate code removal, and browser verification
stay open in tasks 4.1 through 4.3. Fresh human acceptance and all protected
hosted gates are required before merge. Reverting this slice restores the
local copies and previous assembly; deployment is a separate owner decision.

### Local asset adoption verification

On 19 October 2026, both source trees and Node's public resolver confirm exact
selected-family inventory equality: all 64 owner files match the removed
Studio Git blobs, modes, sizes, and hashes, with no extra files. The build
removes 1,916,019 duplicate source bytes. The small assembly helper uses only
Node APIs and the existing installed owner workspace; no package dependency,
download service, or workflow change is added. Local builds now need that
workspace setup, which hosted Quality already performed before this slice.

- Baseline and adopted builds both emit exactly 238 paths and 9,535,524 bytes.
  Every file's bytes and mode match, including all 64 owner assets, both font
  notices, metadata, response headers, and retained reference guides.
- All three existing Studio site tests, the direct retained checker, the
  affected token generator check (17 outputs and contrast), and the owner's
  244-file local provenance check pass under Node 24.19.0.
- The pinned standards validator checks all affected Markdown guides and plan
  files, including 50 links, and preserves the exact shared community templates.
  Strict OpenSpec, whitespace, and both normal and conservative PR bounds pass.
  The final PR summary records the exact diff and net source measurements.
- All 261 untouched Studio tracked paths preserve their Git blobs and modes.
  Callers, pins, static review sources, licenses, versions, notices, page markup,
  CSS, and scripts outside Studio assembly and its existing output test remain
  unchanged. The isolated UI checkout retains its exact Git source after its
  existing lockfile install and focused checks.

These results close local tasks 3.4 and 3.5. They do not establish fresh hosted
CI or AI review of this slice. No browser review, Cloudflare dry run, release,
or deployment ran. Full owner site adoption, the remaining live kit removal,
and browser verification remain open; no runtime speed claim is made.

## Bounded motif and template adoption

The six-family adoption in [PR #11](https://github.com/ejmlabs/ejmlabs/pull/11)
passed all eight jobs and five protected checks in
[run 39349439187](https://github.com/ejmlabs/ejmlabs/actions/runs/39349439187).
Both actual `gpt-6.1-sol` medium reviews were complete with no findings.
Native review `5579479728` matched the exact human approval. It merged normally
as `0e9f6bf252d16e85da835b1332f0ca4a73398200`, with main protection unchanged.
The reviewed and merged tree is `769d5d1980fd3a59857406808eb6f27e0d9c5d5e`.

Start the next source slice from that exact main. Extend the existing public
asset resolver with the complete `motifs` and `templates` directories from
`@ejm/tokens/assets/*`. All 92 files match the prior Studio inventories, Git
blobs, bytes and modes at unchanged UI pin
`7cf86428d0266297901ee52d0e137df100f8c23d`. The earlier 64 owner assets stay
adopted. Studio owns only the existing legacy output-path mapping; UI remains
the source owner. Add no package, downloader, private import or second resolver.

Remove the measured first group of 41 motif files: the dots, echo, flow, orbit
and ripple families, including their nested tile files. They total 3,264,491
source bytes and 878,155 deletion-only diff bytes. Keep the other 39 motifs and
12 templates for the next bounded deletion. Once complete public families
supply output, these remaining copies are not the source authority.

Stop invoking `build-motifs.mjs --check` from the retained checker. Preserve
every other theme, contrast, CSS, class and catalog check until the later site
runtime migration replaces those contracts. The local motif generator remains
historical reference and is not called by the current build or checker.
Do not regenerate local motif copies or edit that generator for new artwork.

The builder currently copies the raw checker script as a reference file.
Removing its motif check therefore changes the emitted
`design-kit/scripts/check-kit.mjs` bytes. This is the sole output-byte change;
preserve all 238 output paths and modes and the other 237 files exactly.
Every rendered/runtime asset, original font notice, metadata file and response
header remains byte-for-byte identical. Do not claim complete output-byte
equality or add an adapter merely to retain the obsolete raw checker bytes.

The existing site output test already reads `sharedAssets`; its public
resolution and source-byte/mode checks expand to all eight families without
another test or copied implementation. Verify all 156 public resolutions,
exact complete-family inventory and Git blob/mode equality, the 41 deletions,
affected owner token/provenance checks, three existing Studio tests, and a
standalone build. Compare the full output inventory with the one named raw
script exception. Check affected current guides, pinned standards, strict
OpenSpec, whitespace and normal/conservative whole-PR bounds.

No workflow, source pin, dependency, license, version or uniform community
template changes. Keep rendered historical guides unchanged; current root and
site guides state that raw kit source is partial, owner motifs/templates are
assembled from the fixed public source, and local motif generation is retired
from the normal check. Require fresh exact-head human admission, both complete
reviews and every protected check before merge. Runtime adoption, the remaining
live kit removal, browser checks and deployment stay open. Reverting this slice
restores the local copies and old checker without changing the UI owner.

### Local motif/template verification

On 19 October 2026, all 92 newly adopted motif/template files match the exact
owner inventories, Git blobs, modes, sizes and SHA-256 values. All 156 public
asset resolutions select the fixed UI checkout. Exactly 41 selected local
motifs are deleted and the other 51 motif/template copies remain unchanged.
No removed motif is recreated by the normal checker or build.

The three existing Studio tests, standalone build, direct consistency entry,
token generator check (17 outputs and contrast) and 244-file local owner
provenance check pass under Node 24.19.0. The existing output test covers the
expanded public families without another test. The generated inventory stays
at 238 paths with every mode unchanged. The raw checker reference grows by
60 bytes to document its changed check set; all other 237 files retain their
exact bytes. No rendered/runtime asset, font notice, metadata or header changes.

Pinned standards, affected Markdown links, strict OpenSpec, whitespace and
normal/conservative whole-PR bounds pass. All 221 untouched tracked paths
preserve their Git blobs and modes, including the workflows, source pins,
static review data, license/version files, generator, builder and test.
The final PR summary records the complete diff and net source reduction.
The isolated UI tracked checkout stays at its exact pin after its existing
lockfile install and focused checks. These local results close tasks 3.6 and
3.7; tasks 4.1 through 4.3 remain open. No fresh hosted CI, AI review, browser
check, Cloudflare dry run, release or deployment ran for this slice.

## Remaining local motif and template copies

Land this source-only slice on protected main
`40fc285`, after the Studio rebuild (#17) and shared UI adoption (#18-#24).
Remove exactly the measured 51 slice B paths: 39 motifs and 12 templates
totaling 2,223,201 source bytes. They match the public owner and supply no
build output; `site/scripts/build.mjs` resolves its named motif and template
allowlist from `@ejm/tokens/assets/*`. Keep runtime, generators, resolver, caller/source pins,
versions, licenses and static review context exact. Retained kit references in
`design-kit/web/`, `design-kit/index.html` and kit guides are working-kit
material outside the site build and stay unedited. Update current root and
site guides with the changelog for the completed source deletion. Studio owns
this cleanup and output assembly; `ejm-ui` owns the public token assets.

Use the pinned UI source `a5551a056b04bc0c3472afc443621a552747613c` from
`.github/ui-source.json`. Build before and after deletion and require all
output paths, bytes and modes to be identical. Run the consistency entry, site
tests, typecheck, build and budget; add no deletion-only test. Do not edit
rendered historical kit guides. Reverting this slice restores only the source
copies and current guidance; output stays exact.

Local checks do not establish hosted review, browser rendering or deployment.
The new head needs fresh human admission, both complete AI reviews and every
protected gate. Keep tasks 4.1 through 4.3 open, with full owner site adoption
and live kit retirement still pending. Do not sync or archive the unfinished
change.

### Local remaining-copy verification

The exact 51 deleted files match the pinned public-owner Git blobs. Before and
after builds both emit 184 files and 9,454,596 bytes with identical file bytes
and modes; the two public ZIPs hold identical entries, bytes and modes and
differ only in entry timestamps, which every build sets. The consistency
entry, 23 site tests, typecheck, build and budget pass under Node 24.22.1.
These local results close tasks 3.8 and 3.9 only. No hosted CI, AI review,
browser check, Cloudflare dry run, release or deployment ran for this slice.

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
