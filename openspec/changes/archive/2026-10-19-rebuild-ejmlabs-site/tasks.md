# Tasks

## 1. Site on ejm-ui

- [x] 1.1 Replace `site/` with a Vite and React site on the ejm-ui packages (`file:` links, `resolve.dedupe`, Tailwind, `ejmSite`, `ejmSsg`), and verify `npm run build` produces `dist` and passes the budget check
- [x] 1.2 Write the routes (home, projects, try, about, brand, privacy, 404) in the lab voice and verify each prerenders with one `h1`
- [x] 1.3 Adapt `scripts/build.mjs` to build, then keep the two ZIP downloads and the hotlinked kit folders, add `not_found_handling` to `wrangler.jsonc`, and verify the files are in `dist`

## 2. Tests

- [x] 2.1 Write `test/site.test.mjs` over the built HTML (one h1, skip link first, toggle last, head, external links, voice, em dashes, links resolve, downloads, `_headers`, analytics absent) and verify `npm test` passes

## 3. Budgets and performance (10.2)

- [x] 3.1 Run `ejm-ssg budget` and record JS, CSS, fonts and HTML per route in the verification notes
- [x] 3.2 Run `scripts/perf.mjs site/dist` and record LCP and CLS per route; fix overages by lazy loading or trimming, never by raising budgets

## 4. Behaviour and look (10.3)

- [x] 4.1 Verify the theme toggle persists across two ejmlabs hosts on one local server (cookie on `.ejmlabs.com`)
- [x] 4.2 Verify analytics, headers and external links in the built output and the running page
- [x] 4.3 Run the viewport matrix for every route in light and dark (zero overflow, zero small tap targets)
- [x] 4.4 Look at home at laptop, iphone-mini and ultrawide-45 in both themes, iterate, and measure colour balance (Sage 25 to 35 percent, Forest under 10)

## 5. Close

- [x] 5.1 Update `site/README.md`, commit locally, and report issues for the ejm-ui owners
- [x] 5.2 Wire the hero to the real product shot when `@ejm/shots` and `ProductShot` exist in ejm-ui. Completed for the initial publication, then removed by task 5.17 at the owner's request.
- [x] 5.3 Rewrite the home, About, project descriptions and metadata for an open source community, remove personal team-size framing, leave room for projects outside AI, and verify the built text and links
- [x] 5.4 Rotate the hero through real CLI, IDE and harness captures with project and pause controls; verify keyboard, touch, reduced motion, no-script fallback, zero layout shift and unchanged size limits. Completed for the initial publication, then removed by task 5.17 at the owner's request.
- [x] 5.5 Place the approved logo beside the header name and verify it in both themes at phone and desktop widths
- [x] 5.6 Add quiet Company details to About with the owner-confirmed name `ejmlabs, llc`, update affected docs, and verify the built page without unverified registration claims
- [x] 5.7 Align Try with the authentic shared simulations, remove redundant page chrome, preserve the clear scripted-data disclosure, and verify keyboard, phone and no-script behavior within existing budgets
- [x] 5.8 Fix long About row headings at phone and narrow desktop widths, verify natural word wrapping and keep the shared type hierarchy
- [x] 5.9 Redesign Brand for public use and build both ZIPs from public asset allowlists, concise usage guides and rights notices; verify contents, links and responsive page layout
- [x] 5.10 Add calm shared theme and page transitions and subtle control feedback, preserve reduced motion and immediate first paint, then verify behavior and unchanged size/performance limits
- [x] 5.11 Review every public route, metadata description and capture caption for clear open source project copy aimed at users and contributors, and check linked guide descriptions against their projects
- [x] 5.12 Publish the checked build to the existing canonical Cloudflare host under the owner's 2026-10-19 authorization, verify live routes, downloads, assets and headers, and record the deployment identity
- [x] 5.13 Record the same useful native IDE session in Light and Dark Appearance, retain source and image provenance, optimize both variants and verify theme selection, matching geometry and existing budgets on the IDE site
- [x] 5.14 Republish the checked root site with its final home layout and the IDE site with matched native captures, verify HTTPS pages and the IDE image bytes in both themes, preserve the release API and record the new deployment identities
- [x] 5.15 Use the existing standard ejm-ui display scale for the IDE home heading, verify responsive wrapping and header consistency in both themes, and include it in the checked IDE publication
- [x] 5.16 Add the approved CLI, IDE and harness marks beside their Current projects names through the shared Row title slot, verify contrast, responsive layout and accessible links in both themes, and publish the checked root site

- [x] 5.17 Remove the main home preview slideshow, capture controls, preload/catalog wiring and unused local modules, update affected docs and tests, verify the type-led home in both themes within existing budgets, and publish it

## Verification notes

The following numbers are the original handoff baseline. They precede the 2026-10-19 continuation and are retained as history. Final continuation evidence follows below when verification is complete.

**Budget (`ejm-ssg budget`, KiB gzip; limits js 95, css 14, fonts 70, html 30)**

| Route | JS | CSS | Fonts | HTML |
| --- | --- | --- | --- | --- |
| `/` | 88.2 | 13.6 | 33.7 | 7.6 |
| `/projects/` | 93.1 | 13.6 | 33.7 | 4.9 |
| `/try/` | 88.8 | 13.6 | 33.7 | 6.3 |
| `/about/` | 91.7 | 13.6 | 33.7 | 3.6 |
| `/brand/` | 91.6 | 13.6 | 33.7 | 3.7 |
| `/privacy/` | 88.1 | 13.6 | 33.7 | 3.2 |
| `/404` | 87.1 | 13.6 | 33.7 | 2.7 |

**Performance (`scripts/perf.mjs site/dist`, throttled mobile, KB transferred and ms, median of 5)**

| Route | JS | CSS | FCP | LCP | CLS | LCP no JS |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 89.3 | 13.8 | 720 | 724 | 0.000 | 608 |
| `/404.html` | 87.8 | 13.8 | 727 | 728 | 0.000 | 588 |
| `/about/` | 93.0 | 13.8 | 722 | 724 | 0.000 | 611 |
| `/brand/` | 92.9 | 13.8 | 730 | 732 | 0.000 | 607 |
| `/privacy/` | 89.2 | 13.8 | 759 | 763 | 0.000 | 588 |
| `/projects/` | 94.6 | 13.8 | 705 | 708 | 0.000 | 600 |
| `/try/` | 89.9 | 13.8 | 729 | 732 | 0.000 | 608 |

(First run, before the fixes: home LCP 1516 ms from the hero entrance, try 114.4 KB JS from a demo loading at load. Fixed as design decisions 6 and 8 describe. /projects/ transfers 94.6 of 95 KB, so it has little room.)

**Theme (two hosts, Chrome `--host-resolver-rules` mapping `ejmlabs.com` and `cli.ejmlabs.com` to the local servers on ports 4892 and 4893):** first visit light; click gives `ejm-theme=dark; domain=.ejmlabs.com; path=/; SameSite=Lax; one year`; the second host loads dark; `?theme=light` shows light and is not saved; toggling on the second host makes the first host light.

**Analytics (same mapping):** on `127.0.0.1` no beacon and no cookies; on `ejmlabs.com` the beacon with the ejmlabs token loads; with Do Not Track or Global Privacy Control it does not. The prerendered HTML never contains it.

**Matrix (`shoot.mjs`, all 14 sizes, light and dark, every route and the 404 page):** zero overflow and zero small tap targets in all 196 size and theme rows (14 sizes, 7 routes, 2 themes).

**Colour balance (`check-balance.mjs`, laptop `--full`; Sage, Forest):** home 28.6 and 0.2, projects 33.6 and 0.3, try 25.9 and 0.2, about 32.3 and 0.2, brand 29.6 and 0.2, privacy 26.8 and 0.2 (light; dark within 0.1 of light).

## 2026-10-19 initial publication evidence

This section records the first four-site publication. Its slideshow, dark-only IDE image, measurements and deployment identities are historical. The final follow-up evidence below supersedes them for the home and IDE sites.

The final build and TypeScript check pass. All 23 built-site tests pass, including public ZIP contents, no-script product views, source links and capture metadata. The last change removes a demo-only sentence from the CLI Help footer; 45 shared scenario and CLI checks pass. The final rebuild retains identical CSS and unchanged initial-load size limits. This text-only change does not alter first paint or layout, so the completed timing and viewport runs were not repeated.

**Final build budgets (KiB gzip; limits unchanged at JS 95, CSS 14, fonts 70, HTML 30):**

| Route | JS | CSS | Fonts | HTML |
| --- | --- | --- | --- | --- |
| `/` | 88.1 | 13.4 | 33.7 | 9.5 |
| `/404` | 85.7 | 13.4 | 33.7 | 2.9 |
| `/about/` | 90.5 | 13.4 | 33.7 | 3.9 |
| `/brand/` | 91.6 | 13.4 | 33.7 | 5.2 |
| `/privacy/` | 86.7 | 13.4 | 33.7 | 3.3 |
| `/projects/` | 91.8 | 13.4 | 33.7 | 5.1 |
| `/try/` | 87.4 | 13.4 | 33.7 | 6.8 |

**Final throttled mobile timing, median of three runs:**

| Route | LCP ms | CLS | TBT ms | LCP without JS ms |
| --- | --- | --- | --- | --- |
| `/` | 1036 | 0 | 0 | 1312 |
| `/404.html` | 728 | 0 | 0 | 644 |
| `/about/` | 715 | 0 | 0 | 636 |
| `/brand/` | 708 | 0 | 0 | 788 |
| `/privacy/` | 704 | 0 | 0 | 636 |
| `/projects/` | 704 | 0 | 0 | 632 |
| `/try/` | 740 | 0 | 0 | 644 |

The maintained runner reports no budget or performance breaches. Its no-script home result is 1312 ms, above the strict 1200 ms target and within the configured 15 percent tolerance. The runner records that value rather than gating it. Evidence: `/private/tmp/ejmlabs-site-perf-public-final-20261019.json` and `/private/tmp/ejmlabs-build-release-20261019.log`.

**Responsive and visual review:** all 196 route, theme and viewport states from 320px to 5120px have zero horizontal overflow. The only touch-size flags are eight disabled controls in the native IDE simulation on Try; enabled controls meet 44px. The matrix runner therefore exits nonzero on those disabled-control flags. Final phone, laptop and ultrawide screenshots confirm the logo, natural About word wrapping, public Brand layout and native product surfaces. About was also inspected at the 1035px in-app browser width. Evidence: `/private/tmp/ejmlabs-matrix-final-20261019/`.

**Interaction:** in-app browser checks confirm all three hero selections, pause/resume, correct light harness capture and stable reserved hero height. Reduced-motion matrix renders the paused state. Static HTML contains the first real capture, hidden inactive controls and all three native Try views. Keyboard focus reaches the CLI message input through both deferred loading stages; `/help` opens the native help view. Shared delayed-resolution tests protect focus transfer without stealing focus after a visitor leaves. The 32 focused theme and navigation tests pass, including skipped transitions and immediate fallback. No new motion dependency was added.

**Authenticity and public copy:** native IDE capture `ide/workspace-agent` shows Edi reading two files and applying a reviewed edit. The Rust product path runs the tools and saves the session; responses replay through a local provider. Provenance, version and date remain recorded. CLI and harness captures follow the page theme; IDE retains its available native dark capture in both themes. All site routes, metadata, captions and the linked product guides were reviewed for public project language. The owner chose the existing GitHub links and plans to open the repositories soon; the sites state that public access is coming soon. About states only the confirmed entity name, `ejmlabs, llc`.

**Public downloads:** the brand archive contains 166 files and 4,374,757 bytes; swag contains 16 files and 5,721,240 bytes. Public allowlists exclude internal playbooks, scripts, audit pages and generation prompts. The original artwork license, font notices, eight swag SVG masters and manifest are preserved. Existing hotlinked image and icon folders remain available. Public guides cover variants, clear space, rights and file choice.

**Publication artifact:** `/private/tmp/ejmlabs-publication-20261019/dist` contains the final 322 files. Its manifest SHA-256 is `81465ffb21069dc71049cc2ea04518351df80f35fb3fc73c90d93ab416427fba`. Deployment and HTTPS results follow after verification.

**Initial four-site publication:** all 28 public page bodies match the tested builds byte for byte. The 170-check HTTPS run passes routes, titles, canonical URLs, referenced assets, both ZIPs, 404 responses, HTTPS redirects, security headers and unchanged IDE release data. Five additional public Brand asset links also match byte for byte. Cloudflare readback confirms all four custom domains and disabled workers.dev and preview URLs. The live root theme switch, IDE selection and pause control work. The native IDE image and caption load on the IDE site; all four installer platforms still state in development with no download links. Evidence: `/private/tmp/ejm-sites-live-verification-20261019.json`, `/private/tmp/ejmlabs-brand-live-assets-20261019.json`, `/private/tmp/ejm-sites-worker-readback-20261019.json` and `/private/tmp/ejmlabs-live-proof-20261019/index-light-laptop.png`.

| Host | Deployment | Version |
| --- | --- | --- |
| ejmlabs.com | `07e3f502-f3e2-450e-a982-45041889afc5` | `06004258-df03-4864-a9a9-ad5d5d5cd6a3` |
| cli.ejmlabs.com | `93f7c40a-2269-4750-af1a-2a1d8a203edc` | `49604bd4-80b1-4472-ae5b-5134a18458ac` |
| ide.ejmlabs.com | `e6343648-0feb-4e0c-acc2-977dd30acd56` | `aa8bf419-f6ec-483d-907f-2294e6ae2da5` |
| harness.ejmlabs.com | `4fb9926b-e740-4ffa-bc15-84556582865a` | `f923b7ab-70ee-4f7e-ab67-60537bb20c2d` |

The owner then requested consistent light and dark IDE imagery. Tasks 5.13 and 5.14 refine the completed capture work and require the two affected sites to be republished. The initial dark-only capture and publication remain historical evidence, not final theme acceptance.

## 2026-10-19 final home and IDE follow-up

**Final scope:** the home hero keeps its shared heading, copy, actions and ripple art. It has no project previews, slideshow controls, rotation timer or capture preloads. Unused local shot modules and the direct shot dependency are removed. Current projects uses the approved CLI, IDE and harness marks through the existing shared Row title slot. Reserved 32px decorative marks retain one accessible link per project. Approved Ink on Sage measures 5.09:1 contrast in both page themes. The shared heading size keeps the longer harness name readable beside its mark.

**Root checks:** the final build and TypeScript checks pass. All 23 built-site tests pass, including project links without scripts, absence of the removed previews and preloads, public ZIP contents and route contracts. The final responsive run covers 320, 375, 744, 812, 1024, 1035, 1440 and 5120px in both themes: 16 states, zero horizontal overflow and zero undersized active controls. Phone, tablet, narrow desktop and laptop screenshots were inspected. Evidence: `/private/tmp/ejmlabs-build-followup-final-20261019.log`, `/private/tmp/ejmlabs-test-followup-final-20261019.log`, `/private/tmp/ejmlabs-home-final-matrix-light-20261019.log`, `/private/tmp/ejmlabs-home-final-matrix-dark-20261019.log` and `/private/tmp/ejmlabs-home-final-matrix-20261019/`.

**Final root budgets (KiB gzip; limits remain JS 95, CSS 14, fonts 70, HTML 30):**

| Route | JS | CSS | Fonts | HTML |
| --- | --- | --- | --- | --- |
| `/` | 87.0 | 13.3 | 33.7 | 10.5 |
| `/404` | 85.7 | 13.3 | 33.7 | 2.9 |
| `/about/` | 90.5 | 13.3 | 33.7 | 3.9 |
| `/brand/` | 91.6 | 13.3 | 33.7 | 5.2 |
| `/privacy/` | 86.7 | 13.3 | 33.7 | 3.3 |
| `/projects/` | 91.8 | 13.3 | 33.7 | 5.1 |
| `/try/` | 87.4 | 13.3 | 33.7 | 6.8 |

**Home timing:** the maintained throttled mobile runner reports median LCP 715ms, FCP 713ms, CLS 0 and TBT 0 over three runs. Without scripts, median LCP is 660ms and CLS is 0. No limit is exceeded. This run follows slideshow removal and precedes only the below-fold Row heading-size adjustment. The final stylesheet bytes and initial byte budgets are unchanged, and that adjustment leaves the hero and first-paint path intact. Evidence: `/private/tmp/ejmlabs-home-followup-perf-20261019.json`.

**IDE appearance and heading:** the IDE site now uses the existing `text-display` scale used by the other sites. Actual Light and Dark native captures show the same saved Harbor session with two completed file reads and an applied, reviewed +19-line edit. Both original PNGs are 2880 by 1900 and remain unedited. A scratch-only public Tauri theme override selected Light for that process; no frontend code, shared WebKit storage or global macOS appearance was changed. The provider resumed through a model-list read without a new agent turn. Native capture services and the local IDE preview were stopped after verification.

The IDE build, types and docs checks, 102 IDE tests, 33 shared shot tests and strict nine-shot audit pass. Browser checks cover eight system/page theme combinations, 16 correct image selections including theme changes, two no-script phone cases and native demo focus handoffs, with no console errors or horizontal overflow. Four maintained phone/laptop captures cover both themes. The IDE's three-run mobile median LCP is 1172ms, FCP 902ms, CLS 0 and TBT 0. Initial JS is 109.1KiB transferred and CSS is 15.07KiB, within the IDE's existing limits. Its broader desktop adoption change remains active for work outside this website release.

**Frozen publication artifacts:** the root artifact at `/private/tmp/ejmlabs-home-publication-20261019/dist` contains 227 files and 16,667,800 bytes; manifest SHA-256 `e1582590fc0b79b06fb00dcd1394206e12b9844a162df0e0316d2d8fd9750c20`. The IDE artifact at `/private/tmp/ejm-ide-native-pair-publication-20261019/dist` contains 57 files and 2,655,223 bytes; manifest SHA-256 `7482aa066f9eea97bec415f78c6c12d6a7d395b185aad147eaf67662bfbb0404`. Every file was compared with its checked active build before deployment.

**Final live verification:** all 151 HTTPS checks across all 28 public pages pass. Page bodies, initial assets, responsive image sources and both ZIPs match the checked builds byte for byte. Redirects, 404 handling, scanner paths, headers and unchanged IDE release data pass. The native IDE Light and Dark 1440w AVIFs return the exact checked bytes, 52,882 and 53,955 respectively. The four installer targets remain in development; no installer or package release was made. Cloudflare readback confirms all four canonical production domains with workers.dev and preview URLs disabled. Live browser checks confirm the native IDE image changes with the page theme and the root home has project links without a slideshow. A live 1035px home screenshot confirms all three approved marks and readable names with no horizontal overflow.

| Host | Deployment | Version |
| --- | --- | --- |
| ejmlabs.com | `7b59fe5f-768f-422b-9035-4aa850696a93` | `6552e48f-ce09-4885-9b53-1831039dd1a6` |
| cli.ejmlabs.com | `93f7c40a-2269-4750-af1a-2a1d8a203edc` | `49604bd4-80b1-4472-ae5b-5134a18458ac` |
| ide.ejmlabs.com | `0bd29f49-4293-48ef-9a62-4de32ac2f1c1` | `31daf441-cdb6-4c3e-918a-5cbd507e9bbf` |
| harness.ejmlabs.com | `4fb9926b-e740-4ffa-bc15-84556582865a` | `f923b7ab-70ee-4f7e-ab67-60537bb20c2d` |

Live evidence: `/private/tmp/ejm-sites-live-followup-verification-20261019.json`, `/private/tmp/ejm-ide-native-pair-live-20261019.json`, `/private/tmp/ejm-sites-worker-readback-20261019.json`, `/private/tmp/ejmlabs-followup-postdeploy-history-20261019.json`, `/private/tmp/ejm-ide-followup-postdeploy-history-20261019.json` and `/private/tmp/ejmlabs-home-live-followup-proof-20261019/index-light-narrow-desktop.png`.

**Documentation and boundaries:** the root source guide describes the final home and removed slideshow wiring. The IDE guide and capture provenance describe the native theme pair. The home-only composition change does not alter product APIs, setup or runtime workflows, so the product guides need no additional edits for it. No repository visibility, R2 release object, source push or commit was changed by this continuation. Unrelated work and the broader shared UI adoption plans remain in place.
