# Shared site audit

Date: 2026-10-20. Scope: ejmlabs, CLI, IDE and harness websites, plus the
ejm-ui gallery. This records local verification, not publication.

## Result

Active site consumers now use public ejm-ui package contracts for shared
visuals and interactions. The final independent contract review found no
remaining blocker in this scope. Site content, page composition, product
release data and product-specific link policy remain with each site.

## Findings and changes

| Finding | Owner and public contract | Resolution |
| --- | --- | --- |
| Repeated logo and name markup | `@ejm/ui/shell`: `Brand` | Shared dimensions, theme variants and accessible lockups across the four sites and gallery. |
| Hero descendant overrides and copied heading structure | `@ejm/ui/layout`: `Hero` | Public `titleId`, `footnote` and `motion` options replace consumer overrides. |
| Repeated generic controls and stat overrides | `@ejm/ui`: `Button`, `Input`, `Stat` | Gallery and playback controls use shared primitives; Stat exposes its supported title scale. |
| Row links bypassed the site router; file links could be intercepted | `@ejm/ui/layout`: `Row`; `@ejm/ssg`: Link provider | Rows use the ambient provider. Undeclared file paths retain native navigation, declared routes retain client navigation, and delegated static links preserve query strings and hashes. |
| Consumer CSS scanned private sibling source | `@ejm/ui/styles-site.css`, `@ejm/ui/styles-docs.css`, product CSS exports from `@ejm/demos` | Package owners now declare their own sources. Public site and docs profiles retain shared tokens without loading every app component. |
| Three Markdown parsers and local docs controls | Node-only `@ejm/site/docs`; browser `@ejm/ui/docs` | Shared compiler, serialized model, layout, prose, tables, navigation, contents, code copying and tabs. Product route and link mapping stays local. |
| Static wrappers disabled controls or duplicated hydration behavior | `@ejm/ssg`: `Static`; `@ejm/ui/docs`: shared frames | Removed the studio Deferred engine and consumer control adapters. Prose and highlighted code remain in HTML; shared controls hydrate. |
| Large client code path for static highlighted source | `CodeBlockFrame`, `CodeTabsFrame`, `CodeSource`, `CodeHighlight`, `splitDoc` | Shared frames reuse existing copy and tab behavior. Source and highlighting stay static. Rich nested blocks use the optional shared renderer only when required. |
| Private shot metadata paths | `@ejm/shots/metadata/cli`, `/ide`, `/harness` | Consumers import public JSON exports. |
| Unserved IDE design copy | IDE website, consuming ejm-ui assets | Removed the unused copied public design kit and sync script. The README icon uses the canonical product brand asset. |
| Gallery removed CSS compatibility fallbacks | Gallery build | Removed the local property fallback stripping plugin. The normal build still passes its original limits. |
| Preview server returned stale compressed content after rebuilds | ejm-ui preview tooling | Removed the path-only gzip cache. A real HTTP regression covers rewriting a file at the same path with equal-length content. |
| Toast dismissal test raced a 60 ms timer | Shared UI tests | A controlled clock proves visibility at 59 ms and dismissal at 60 ms. No production timing or test timeout changed. |

## Ownership and dependencies

- Tokens and generated themes remain in `@ejm/tokens`.
- UI components and interaction primitives remain in `@ejm/ui`.
- Markdown compilation lives in the Node-only `@ejm/site/docs` export.
  Its maintained parsing dependencies are marked 18.1.1, yaml 2.9.1,
  entities 8.1.0 and github-slugger 2.0.0. These do not enter browser bundles.
- Browser docs rendering consumes the serialized model in `@ejm/ui/docs`.
  Optional `renderCode` and `renderBlock` composition preserves the static
  boundary without making UI depend on site or SSG packages.
- Routing and prerendering remain in `@ejm/ssg`; demo playback remains in
  `@ejm/demos`. Sites import public exports only.
- The IDE release lookup and OS selection remain local product data behavior.
  No second theme, router, docs engine or control implementation is needed.

Updated public guidance includes the shared adoption guide, package READMEs,
theme and component references, studio site guide, and affected product site
guides. The tooling and test fixes have no public product behavior impact.

## Automated checks

All checks used Node 24.19.0. Byte values below are gzip KB as reported by the
existing site gates. No budget was raised. These results describe the development
checkouts reviewed during the audit. The exact committed harness candidate has
the separate guide-reference limit recorded in the local checkpoint below.

| Site | Maximum route JS | JS limit | Maximum CSS | CSS limit | Checks |
| --- | ---: | ---: | ---: | ---: | --- |
| ejmlabs | 94.8 | 95 | 13.6 | 14 | Types, build, all route budgets, 23 site tests |
| CLI | 94.9 | 95 | 12.9 | 14 | Types, build, all route budgets, 94 site checks including headers |
| IDE | 100.2 | 110 | 15.0 | 15.5 | Website and Worker types, build, all route budgets, three guide checks and six route checks |
| Harness | 93.3 | 95 | 12.6 | 14 | Types, build, all route budgets, 39 site tests |
| Gallery | 88.1 | 95 | 13.6 | 14 | Types, 69 focused tests and final build with all 17 route budgets |

- Final `ejm-ui` `npm run check`: passed, including 776 tests in 82 files,
  type checking, token freshness and contrast, local asset provenance,
  generated Rust theme freshness, component state parity, art, containerless
  rules, component inventory, tree shaking, CSS sources and catalog freshness.
- Public CSS source profiles: site 11.1 KB; site plus docs 12.8 KB.
- Focused coverage protects shared Brand semantics and proportions, Hero
  naming and motion options, Row adapters, native file links, static links,
  parser dialects, rich nested blocks, docs controls and static server freshness.
- Scoped whitespace checks passed. OpenSpec strict change validation and all
  seven main specs passed after syncing only the ui-package capability.
- Existing gallery warnings about routes without lazy preload chunks remain;
  they do not fail builds or budgets. Browser test environments also report
  their existing canvas and cross-document navigation limitations.

The CLI and studio brand route have little JS headroom. Their present builds
pass; future shared additions must keep these same gates.

## Browser review

Reviewed current local production builds through the in-app browser:

- Four home pages at 320 px and 1440 px, in light and dark themes.
- Each product user guide at both widths and in both themes.
- Studio About, Projects and Brand, plus gallery home and docs, at both widths
  and in both themes.
- Reviewed routes have one main heading, no page overflow and no broken images.
- Confirmed CLI docs filtering and reset, contents anchor focus, and copy
  feedback. Confirmed harness language tab clicks and arrow-key focus, and
  IDE phone docs disclosure.
- Final confirmation after the settled builds verified CLI width equals
  scroll width at 320 px in both themes. The setup CTA now fits at 158 px.
  Copy feedback and language-tab keyboard selection still work.

The first CLI preview used stale compressed bytes from the preview cache.
That tooling defect was fixed and the final check used a fresh server over
the current build. Screenshots of shared project branding and dark docs are
saved in this chat's visualization directory. Temporary viewport overrides
were reset after review.

This was a representative desktop and phone review. It does not complete the
older full 320 to 5120 px device-matrix task or native application gates.

## Worktree and workflow state

No files were staged, committed, pushed or deployed during this audit. The
existing CLI and harness staged binary diffs retain their initial SHA-256:

- CLI: `86e452e34c3d45ae4da01b053917ab6bae9d5c278e57e16400eae10ee5180b5a`
- Harness: `8d5ed51f1c28a7fc05024e5d7c8380df1c48bba7c3753eae464fdbef7564f4a4`

Section 18 is complete. The broader change stays active because it also
contains unfinished native app adoption, captures and device-matrix work.
Task 11.2 also includes a separate commit checkpoint. The owner resumed local
commits after this audit. No native capture, video render, Rust gate or outward
action was part of the audit itself.

## Local commit checkpoint, 2026-10-20

The owner resumed local commits after the audit. All five repositories now
contain the scoped site and shared UI commits:

| Repository | Local commit | Scope |
| --- | --- | --- |
| ejm-ui | `2c2ee13e0672f8420e65e27ffa159f6ebaea520d` | Public shared UI, docs, site tooling and gallery adoption |
| ejmlabs | `d293586bfd66eca3e1f491ae5cf1d00a71b47d17` | Studio site adoption and shared UI audit |
| ejm-cli | `347ca50580a0ec625b8c3f4c25e8f8635a25b758` | CLI site, linked public docs and shared UI adoption |
| ejm-ide | `15b5fdf8ebe3e7c141f6ab40e01415cd5912267e` | IDE site adoption and removal of unserved copied design files |
| ejm-harness | `6312657cc7302e2e2e082da5fc604bb42e749ed6` | Harness site adoption and the narrow gate prerequisites below |

### Commit and build verification

- Independent final review found no scope blocker. All five commits pass
  committed whitespace checks. No hook configuration or policy was changed.
- CLI and harness candidates used committed hook configuration in isolated
  checkouts. Both actual normal Git commit hooks passed. Heavy native gates
  ran serially with two Cargo jobs and existing target caches.
- The CLI hook passed architecture, formatting, strict Clippy, unit and
  integration tests, release build, rustdoc, Cargo Machete, Cargo Deny and
  PTY behavior checks. Its exact site candidate passed 94 checks across
  14 routes, types, build, headers and unchanged byte limits.
- The harness hook passed policy, formatting, Clippy, workspace tests and
  doc-tests, eleven language-host tests, all-target builds, rustdoc, Cargo
  Machete, Cargo Deny, generated protocol checks and the npm/Python tail.
  The separately rerun npm gate passed ESLint, Prettier, the TypeScript SDK
  build and all fifteen SDK tests.
- The harness candidate passed site types, build and all unchanged byte
  limits, with 37 of 39 site tests passing. The two failures check authored
  source names in the user and developer guides. They also fail with the
  literal earlier HEAD guides and committed runtime source. The development
  checkout passes all 39 because it contains unfinished implementations.
  No tests were disabled and no unfinished native code was added to make
  these checks pass. Task 11.2 remains open for this guide-reference gap.
- CLI public contributor and developer guidance now marks absent Windows
  wrappers, packaging tools, relay check integration and release automation
  as planned. Current native checks point to the committed `./scripts/check`.
  Existing public anchors and evidence links remain intact.

An initial CLI candidate install duplicated local package identities and
exceeded its JS limit. A locked clean shared UI install restored the reviewed
bundle size without source or budget changes. The harness isolated checkout
initially lacked registry dependencies. Its lock has no local source links;
the verified third-party cache restored the expected dependency setup and the
unchanged npm gate passed. Neither setup issue required a source workaround.

### Narrow native gate prerequisites

Both products include only four added and four removed Cargo.lock lines for
`rustls-webpki` 0.103.15 to 0.103.16 and `webpki-root-certs` 1.0.9 to 1.0.10,
including their checksums. Cached primary RustSec evidence was verified at
database commit `e6f94f3760d5e6c54c1b05f204002263bc025524`. Cargo Deny then
passed without exceptions. Dependency ranges, normal dependency sets and
features remain the same. The root-certs Rust floor rises from 1.70 to 1.71,
below the projects' 1.89 floor. Unrelated resolver drift was rejected.

Harness also includes an existing three-line test hunk that waits at most
two seconds on `governor.wait_idle()` after the install deadline error. The
10 ms deadline and all no-persistence and zero-admission assertions remain.
The focused test passed, then the actual full normal hook passed. The primary
test file already contained this hunk and its working bytes were untouched.
No production runtime or public API changed. These lock and test changes need
no public setup or API guide changes.

The CLI release artifact decreased from 13,820,448 to 13,820,400 bytes.
The local harness debug worker decreased from 53,076,224 to 53,052,976 bytes.
These are artifact observations, not speed or release-performance claims.

### Preservation and evidence

CLI and harness commits were integrated through guarded ref updates without
checking files out over their working trees. CLI's final integration preserved
all 417 recorded source paths byte for byte and mode for mode. Harness's
integration checked 718 paths, including one absent path; all working bytes
and modes were preserved. The two allowed TLS version/checksum pairs are the
only changes made to the working lockfiles during prerequisite preparation.

The UI, studio, IDE and harness indexes are empty. CLI retains exactly its
three original unrelated staged paths and their original blobs and modes:
`.agents/skills/ejm-cli-theme/SKILL.md`, `AGENTS.md`, and
`crates/ejm-cli/src/render.rs`. Other native, governance and video work stays
outside these commits.

Local CLI hook, build and preservation records remain under
`/private/tmp/ejm-cli-site-commit-aht1ha0z/`, including
`review-fix-amend-hook.log`, `candidate-site-review-fix.log`,
`review-fix-integration-report.json` and `cleanup-report.json`.
Harness records remain under `/private/tmp/ejm-harness-site-commit-20261020/`,
including `fifth-normal-hook.log` and `integration-evidence.json`.
Temporary clean checkouts are removed after integration; original source and
target caches are retained.

This checkpoint records local commits and verification. It makes no new push,
deployment, package publication or native release claim. The broader OpenSpec
change remains active for the guide-reference gap, native adoption, captures
and device-matrix work. This verification record adds no public product
behavior, setup or API change.
