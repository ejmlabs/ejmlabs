# Documentation verification

## Scope

User and developer guides for ejm-cli, ejm-harness, and ejm-ide, hosted on each project's existing domain. Each project owns its three docs routes. The studio adds six direct guide links plus menu and footer discovery.

## Local checks

- Studio: `npm --prefix site test` passes all three tests; `npm --prefix site run build` and the canonical kit site checker pass. The README lists the same routes and owners as the built project sites.
- CLI: canonical kit checks pass for the homepage and all three docs pages. All 92 local route and fragment links and 36 source-file links resolve. Twenty-one offline command checks pass with isolated temporary state.
- Harness: canonical kit checks pass for four pages, along with all 82 local route and fragment links, source-file checks, formatting, and policy checks. The documented JavaScript and Python offline examples each print `Demo: Hello` and `completed`.
- IDE: site build, site types, docs route/source-reference checker, formatting, lint, and kit checks pass. Built docs have estimated gzip first-load sizes of 164 to 169 KB including shared CSS, JavaScript, logos, and both fonts, below the 200 KB limit.
- A separate source review found no concrete defects in onboarding commands, SDK examples, source paths, section anchors, or built route coverage.

## Browser review

All three docs indexes, user guides, and developer guides were reviewed in the in-app browser at actual widths of 320, 375, 768, and 1440 pixels in light and dark themes: 72 states. After theme and entry transitions settle, page scroll width equals client width. Each page has one H1 and the right current sidebar link. No script-enabled console warnings or errors were observed.

Keyboard Enter opens the mobile contents control. Section links close it and focus the target heading. Copy buttons announce `Copied Shell code`. Harness sidebar filtering announces its result count and clears with Escape; ArrowRight changes the selected example from TypeScript to Python.

A temporary loopback fixture blocks scripts with CSP. All nine docs routes remain readable at 375 and 1440 pixels: 18 states. Native contents controls and section links work for all three user guides. Both harness example languages remain visible without JavaScript. The fixture does not change project files.

The studio's six guide choices were reviewed on desktop and at 375 pixels, including light and dark themes. They fit without horizontal overflow. A separate script-blocked studio preview retains all six links at 375 pixels, with no page overflow and keyboard focus moving from the CLI user guide to its developer guide.

## Full project gate limits

These documentation checks do not establish that every application gate is green:

- CLI: architecture, formatting, strict Clippy, 70 unit tests, 5 integration tests, release build, rustdoc, Cargo Machete, and Cargo Deny passed. The final PTY check failed at `scripts/check_terminal.py:120`: the test expects `What shall we build?`, while the current UI says `Describe a task...`. This is an unrelated existing application change. Its docs change remains open at 6/7 tasks.
- Harness: policy/selftests, rustfmt, strict Clippy, Rust tests and doc tests, 11 language-host tests, all-target build, rustdoc, Cargo Machete, and Cargo Deny passed. The gate was interrupted with exit 130 during the Python protocol-generator check after free disk space became critically low. The npm/Python tail was not reached. Its docs change remains open at 5/6 tasks.
- IDE: formatting, lint, TypeScript, 611 tests in 40 files, and strict Clippy passed. Native Cargo tests failed with exit 101 while creating `src-tauri/target/debug/deps/libejm_ide_lib.a`: `No space left on device`. Native tests and the final application build remain unverified. Its docs change remains open at 5/6 tasks.

No further native builds or disk cleanup were attempted. The site deployments contain website assets; the IDE's unchanged distribution Worker also serves its existing release API and download routes.

## Publication

The user's request to put the guides on their sites authorizes publication. All four Wrangler dry runs pass. The project sites are published before the studio links. Previous live Worker version IDs are recorded for rollback:

| Site | Previous version |
| --- | --- |
| CLI | `d9d4c383-1d85-4006-9d3a-67e851e16b1a` |
| Harness | `c6a60fea-860e-4890-a3d3-0e80e7760549` |
| IDE | `c6876ecb-c10f-46b4-a280-95b835e817ad` |
| Studio | `e42eb500-4a74-4248-829d-c85b22759b44` |

All four deployments succeeded. All nine live docs routes and four homepages return HTTP 200 and byte-match the reviewed local files. CSP, content-type protection, and referrer headers remain present. The live browser review confirms each guide's heading, current navigation, mobile layout, and script controls, with no console warnings or errors. Code copy announces success under the production CSP.

| Site | New version | Live docs |
| --- | --- | --- |
| CLI | `5d0374da-01c7-47a9-a615-5d1fcf04f61d` | <https://cli.ejmlabs.com/docs/> |
| Harness | `b1144f6a-0ed9-4528-a096-dfd50264cfa0` | <https://harness.ejmlabs.com/docs/> |
| IDE | `16e35e15-379b-45a7-8772-8eff01c397f8` | <https://ide.ejmlabs.com/docs/> |
| Studio | `d4587f56-7947-4d57-a5e7-d1f93a4fbadb` | <https://ejmlabs.com/#documentation> |

The live studio section has all six canonical guide links and visible keyboard focus. Its kit home, UI kit, and design-kit ZIP return HTTP 200. The IDE release API still returns the same JSON as before deployment; its editor image returns 200 and a missing page returns 404. No installer, release metadata, R2 object, or application binary was published.

Each project's implemented documentation requirements are synced to its durable `site-documentation` spec. The project changes remain active with their incomplete full gates visible. The studio `documentation-discovery` spec is synced and validates strictly.

## Local review routes

- CLI: <http://127.0.0.1:4831/docs/>
- Harness: <http://127.0.0.1:4832/docs/>
- IDE: <http://127.0.0.1:4833/docs/>
- Studio: <http://127.0.0.1:4827/#documentation>
