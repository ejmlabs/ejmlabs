# Verification

## Scope and ownership

ejm-ui owns the fixed site recipes, branding, spacing, typography, theme,
motion, content composition, demo framing, and build enforcement. The four
sites supply content, routes, product links, and semantic state through public
exports. Dependency direction remains from each site into shared packages.
No harness runtime, terminal runtime, native desktop, or release API contract
changed.

The shared Hero, SectionHead, Brand, SiteHeader, and SiteFooter no longer
accept the removed visual overrides. SiteContent supplies the shared text,
columns, metrics, actions, asset previews, and section rhythm. ShowcaseFrame
owns playback width and disclosure placement. CLI and Harness use the same
hero entrance as IDE. Text stays painted during its CSS entrance; reduced
motion skips travel.

The ejmSite source guard runs by default in development and production. It
rejects local visual classes, inline styles, CSS rules, raw style markup,
opaque property spreads, and unsupported shared component overrides. It uses
Vite's public parser and directly declared PostCSS. It allows the structural
Static contents wrapper and the public docs navigation data helper. Its only
internal example exception is the exact library-owned gallery root. Consumers
have no disable option. This checks engineering ownership, not hostile source.

## Checks

Evidence is saved at `/private/tmp/ejm-unified-sites-9qgh2zp6`.

| Owner or consumer | Result |
| --- | --- |
| Shared UI and demos | 78 tests in 9 files, types, generated artifacts, tree shaking, source coverage, and catalog checks pass. |
| Shared site and SSG build | 107 tests in 9 files pass, including real accepted and rejected builds and failed-build error preservation. |
| Gallery | All 18 built routes pass the existing asset limits. |
| Starter | Types and production build pass with existing limits. |
| Studio | Types, production build, and all 23 route, link, static content, asset, and policy tests pass. |
| CLI | Normal site gate passes all 94 tests; explicit budget and formatting checks pass. |
| Harness | Normal site gate passes all 39 tests; explicit budget and formatting checks pass. |
| IDE | Production build, site and Worker types, all 3 docs route checks, and all 6 site route checks pass. |

Final maximum route sizes in KiB:

| Site | JavaScript | CSS | Fonts | HTML | Existing JS / CSS limits |
| --- | ---: | ---: | ---: | ---: | --- |
| Studio | 92.1 | 13.5 | 33.7 | 10.5 | 95 / 14 |
| CLI | 94.6 | 13.0 | 33.7 | 19.5 | 95 / 14 |
| Harness | 92.8 | 12.7 | 33.7 | 20.4 | 95 / 14 |
| IDE | 100.5 | 15.2 | 33.7 | 17.1 | 110 / 15.5 |

Font and HTML limits stay at 70 and 30 KiB. No limit was raised. Static brand
content and product 404 bodies stay in generated HTML instead of browser
scripts. Standalone mark assets avoid repeating small SVG strings in scripts.
The isolated InlineLink entry avoids pulling page composition into eager
shells. Shared content grids now constrain their minimum width so long code
examples cannot widen a phone page.

Under Node 26.12.0, 10 fresh source guard scans per tree had median costs of
4.49 ms for Studio, 2.16 ms for CLI, 2.07 ms for Harness, 3.84 ms for IDE,
and 0.72 ms for the starter. Cached medians were 0.04 to 0.11 ms. These are
local measurements, not performance promises. The guard adds no browser
dependency. CLI and Harness final gates took 3.10 and 3.07 seconds locally.

## Browser review

Reviewed the four local built sites at desktop and phone widths in both
themes. The final confirmation found no document overflow at 320 pixels on
any home page. All four share their heading scale and all three product
playbacks use the same frame width at phone size. Logos load in both themes.

Pause changes to Resume, and Restart resumes playback, on CLI, IDE, and
Harness. The shared phone menu closes with Escape and returns focus to Menu.
The built CLI and Harness 404 pages retain headings and working home links.
Studio About, Projects, and Brand fit 375 pixels and preserve native public
asset links. The IDE download page retains its live status and honestly shows
the empty local release store. Console review found no warning or error in
the final QA tab.

Reduced motion was checked through shared CSS and contract tests, not OS
media emulation. No-script content was checked through built HTML and the
normal static site gates. Python previews verified the built 404.html files;
existing configuration tests cover the production unknown-path setting. The
IDE preview used the local Worker with an empty local R2 release store.

The first review found one CLI source example widening a phone page. The
single correction was made in the shared content layout and confirmed on
all four sites. No consumer style exception was added.

## Docs, preservation, and release boundary

Shared adoption, component, site, and demo docs, gallery and starter examples,
and affected product contributor guides now describe the fixed contracts,
default guard, rebuild requirements, and public package ownership. Runtime
user guides need no behavior change because this work only changes site
presentation and contributor contracts. The affected public docs builds pass.

Independent review found no remaining local visual overrides except the
structural Static contents wrapper, no private sibling imports, and no new
accessibility or hydration finding. All five Git indexes match their captured
baseline byte-for-byte, all HEADs remain unchanged, and unrelated tracked
patches remain intact. Preservation evidence names the scoped files and limits
of the untracked-file comparison.

The offline lock refresh could not fetch an unrelated uncached Tailwind
optional archive. The existing lock format was preserved with the one direct
PostCSS dependency declaration matching installed version 8.5.31. No runtime
dependency was added. Native and Rust gates were not run because their
contracts did not change.

This work is local. No commit, push, package publication, or site deployment
was performed. Shared design edits affect consumers when they rebuild against
the changed package. Future missing patterns belong in ejm-ui before site
adoption; this work does not claim coverage of every possible future interface.
