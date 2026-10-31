# ejmlabs.com

The ejmlabs site: a Vite and React site on the ejm-ui design system, prerendered to static HTML and served by a Cloudflare Worker with static assets. Copy introduces open source projects and one commercial product, links to the open source code and contribution guides, and leaves room for future projects outside AI and developer tools.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home: a text hero, how we work, open source projects with approved project marks and links to each project site, the commercial product, example sessions and ways to contribute. Served as static HTML without hydration. |
| `/projects/` | CLI, IDE, harness, UI and calm with their marks, source and guide links. Agent projects link to recorded sessions; UI links to its component gallery; calm links to a seeded scene and its README. |
| `/try/` | CLI, IDE and harness completing useful work in autoplay example sessions, with Pause or Resume and Restart. Meaningful static views remain available without scripts. |
| `/about/` | What guides the work, room for projects beyond AI and developer tools, and quiet Company details naming `ejmlabs, llc`. |
| `/brand/` | Approved logo previews, file and variant guidance, palette, clear space, rights, and brand and swag downloads. |
| `/download/` | Builds by product and platform from `public/releases.json`, one-line install, how to check a download, the unsigned note and report links. Offers no file until a release is listed. |
| `/privacy/` | What analytics measures and what is stored, and what the download and report links touch. |

## Releases

`public/releases.json` is the only list of released files: product, version, target, GitHub release-asset URL, size and SHA-256 for each. It is empty until a release is published. `scripts/releases.mjs` validates it (HTTPS, a digest, no duplicate target, one version per product, a versioned asset URL on the repository that owns the product), and the build stops on a bad list. The build writes `dist/install.sh` from the same list (`scripts/install.template.sh`, shellchecked and covered by fixtures in `test/install.test.mjs`), and the Download page and each project's "get started" text read it too. To list a release, add its artifacts to the file in a reviewed change; do not replace a listed file, publish a new version instead.

## Local preview

Needs Node 24, the `zip` and `unzip` commands, and ejm-ui checked out next to this repository (`../ejm-ui`) with `npm install` run once inside it.

```sh
cd site
npm install
npm run build
npm run preview
```

Open [the site](http://127.0.0.1:4827/). `npm run dev` runs the Vite dev server (client render only).

The `@ejm/*` packages are linked with `file:../../ejm-ui/packages/*`, so a local development server can load edits from ejm-ui. Built sites receive them when rebuilt and published. Once a registry exists and the owner approves publishing, replace the links with versions (see `ejm-ui/ADOPTION.md`).

## Files

- `index.html` has the two `@ejm/ssg` markers. The head tags, `theme-boot.js`, the icons, the manifest and `_headers` are written by `@ejm/site` during the build. Do not keep copies of them.
- Browser icons use the current mark in Ink on Sage. Shared build code versions icon and manifest URLs from their content, including install icons referenced by the manifest. The original direct filenames still work. This adds no client script or stylesheet.
- `src/site.tsx` lists the routes and their heads. Every route is a lazy route, so the entry holds only the shell.
- `src/shell.tsx` is the frame: the approved mark beside the name in one home link, header with the theme toggle last, footer, analytics.
- `src/pages/` has the routes. `src/stages/HomeContent.tsx` and `src/stages/BrandContent.tsx` hold static home and asset-guide content, rendered through the public `Static` boundary from `@ejm/ssg`. Native links and downloads remain available without page JavaScript.
- `src/pages/Try.tsx` consumes `LazyCliPreview`, `LazyIdePreview` and `LazyHarnessPreview` from the public per-product `@ejm/demos/islands/*-preview` entries. Shared code owns their geometry, static fallback, playback, controls and lifecycle.
- `src/stages/HomeContent.tsx` places approved project marks beside the Current projects names through the shared `Row` title slot. Ink marks remain legible on Sage in both page themes; each row keeps one accessible project link. Shared `Brand` keeps row names on one line; footer project labels use a non-breaking hyphen (U+2011) because footer links take plain text.
- `src/assets/projects/` holds byte copies of the ui and calm marks, which the pinned `@ejm/tokens` does not export yet, and gerry's Ink and Paper marks, which were drawn here. Its `README.md` records source, commit, checksums and rights; replace the copies with `@ejm/tokens/assets/projects/<id>/` imports once ejm-ui publishes them. They are not part of the public downloads.
- `src/pages/Projects.tsx` uses the shared `Brand` component in the `SectionHead` title slot. Mist and Paper switch between approved Ink and Paper assets with the page theme; Sage keeps Ink in both themes. `Brand` reserves each image's proportions and leaves the heading to supply its accessible name. The header and home project rows use the same component.
- `src/content.ts` has the project facts (and the gerry link), taken from each project's README, and reviewed source availability, plus each project's secondary action and contribution link (calm has no contribution guide, so none is shown). Repository URLs come from the shared project registry; ui and calm are not in it yet and are defined there locally.
- `src/head.ts` selects ejmlabs defaults from `@ejm/site/head`, which imports the font list directly and keeps the component barrel out of the first load.
- `public/` has `robots.txt` and `sitemap.xml`.
- `scripts/build.mjs` runs `ejm-ssg build`, resolves approved image/icon assets from public token exports, then builds both public ZIPs from named file allowlists. Internal notes, comparisons, generators, HTML and nested archives stay out of `dist/design-kit/`.
- Studio favicon downloads and retained public URLs read the public `@ejm/tokens/assets/favicon/*` exports, the same source used by the site's browser icons. The retained working kit is not a second source for active assets. Local motif and template copies are removed; ZIP assembly keeps resolving its named motif and template allowlist from the owner exports only.
- `brand-kit/` holds the public usage guides and rights summary. The Brand page reads palette values from the public `@ejm/tokens/assets/brand/palette.json` export. The build includes the existing root `LICENSE` unchanged and the original font notices. Swag contains the eight SVG masters and manifest unchanged, plus three previews labelled as concepts. Working playbooks and image prompts are not downloads.
- `dist/` and `.ejm-ssg/` are generated. Never edit them.
- `wrangler.jsonc` configures Workers static assets (`./dist`, with the 404 page), the apex domain, and a separate preview environment.

## Package boundaries

This site owns its text, route composition, project facts, guide destinations,
and public download assembly. Product repositories own their guides and runtime
behavior. Keep reusable components and site behavior in ejm-ui and consume its public exports when a change spans repositories.

`ejm-ui` owns the public `@ejm/*` contracts consumed here: tokens and themes,
components and interactions, the project registry, analytics, shared head and
headers, prerendering, demo machinery, and capture tooling. Fix reusable behavior
there and consume its public exports. Keep page copy and composition here. Do
not import private package source, copy shared implementations, or make shared
packages depend on this site. Local `file:` dependencies still follow these
rules. Approved public brand files come from `@ejm/tokens/assets/*`; Studio retains the swag masters and concept previews and owns public download assembly.

Before changing a shared contract, name its owner, public interface, downstream
impact, and owner/consumer checks in the plan and review. Report any unrun checks
or compatibility gaps. A local build does not publish either repository.

## Rules this site keeps

- Build pages from public `@ejm/ui` components with deep imports (`@ejm/ui/layout/Band`). ejm-ui owns type, spacing, branding, themes, motion, controls, and composition. Supply content, route data, and accessible state. Use `SectionBody`, `Columns`, `Actions`, notes, asset previews and links from `@ejm/ui/layout/SiteContent`; extend the shared owner when a pattern is missing.
- `ejmSite` checks authored site source during builds and development. Local CSS rules or imports, inline styles, style elements, visual `className` values, and unsupported visual overrides fail with a source location. Only the public shared CSS imports, the content-scan exclusion, and the literal `Static className="contents"` structure are allowed. Header and footer take structured identity; headings take a semantic purpose. Hero motion has one shared policy and respects reduced motion. Keep browser examples in `@ejm/demos/ShowcaseFrame`.
- Page weight has no byte cap. Load time is the bar: `npm run perf` fails when first contentful paint on `/`, `/download/` or `/projects/` is a second or more slower than `perf-baseline.json`. Use well-maintained packages instead of hand-rolled code, and lazy load what a route does not need first.
- The copy welcomes people to run, study, change, and contribute to the open source projects. gerry is commercial and proprietary, and written in lowercase like the other project names: say only what its own site says, label it not released, link to its site, and keep it out of the open source rows, license lines and source links. Keep personal team-size framing, invented adoption or sales claims, and em dashes out of the text. Current projects do not limit the direction of future work.
- Standalone page actions use the shared button treatment, including text links, to retain 44 px touch targets. Inline prose links use the shared inline link.
- One `h1` per route, the skip link first, the theme toggle last in the header, external links marked `rel="external"`.

## Checks

```sh
npm run typecheck
npm run build
npm test             # reads the built HTML of every route
npm run perf         # first contentful paint against perf-baseline.json; needs Chrome
```

`npm test` builds when `dist/` is missing. The home checks keep the sections in order, the text hero, one-line project names and project links available without scripts and prevent project previews, carousel controls and image preloads from returning. The public `@ejm/ui/styles-site.css` profile owns the shared component sources. The site imports public demo styles and declares no private package source scans or local visual rules.

## Home and example sessions

Home sections, in order:

1. Hero: "Open source tools. Products for business." with the shared text `Hero` and its ripple art.
2. "How we work.": start small, make it useful, share the tools.
3. "Open source projects.": approved marks and direct links.
4. "Commercial products.": gerry, with its mark and a link to its own site. The band is Mist, so the mark switches from Ink to Paper in dark mode.
5. "See it in action.": a link to the example sessions.
6. "Help improve a project."

`src/pages/Home.tsx` serves every section from `src/stages/HomeContent.tsx` through one `Static` boundary, so the page does not hydrate. It uses the shared hero, section heading and row recipes. It has no product preview slideshow, carousel controls or image preloads. Open source projects shows approved Ink marks on the shared Sage surface, whose light scheme stays the same in both page themes. Product screenshots belong on the product sites.

Try shows each product's native layout with sample code and recorded local output. CLI follows a code fix through tests and a diff. The IDE example shows Edi reading, searching and making reviewed edits. Those edits and tool updates are authored; its added tests were not run. The visible note states that limit. Harness shows tool admission and retained history in its real terminal presentation. The browser makes no model or tool calls. Shared fixtures and their provenance live in `ejm-ui/packages/demos`, rather than this site. Its IDE styles come from the separate `@ejm/demos/ide-preview.css` import, so CLI and harness consumers do not have to ship them.

The cli, ide, harness, ui and calm repositories are public. gerry is proprietary and has no repository or guides here. Its mark appears only on Home; the Projects intro and the footer name it. Source builds still require the documented sibling checkout and compatible revisions. Project pages link to source, contribution guides and source-build instructions. Keep unpublished installer and package limits beside setup choices. CLI, IDE and harness offer recorded browser examples; these do not prove a native installation or model run. UI links to its live component gallery and docs. Its software and docs are MIT licensed; brand assets retain their own rights. calm links to a seeded scene and its README; it has no docs site or contribution guide yet. Recheck anonymous repository access during release preparation and update the project facts, home, project actions and footer together. Build, check and publish affected pages before claiming that live content has changed.

All three examples use the same shared responsive frame and preserve its dimensions as playback loads. The public lazy entries preserve static server content, load playback near the viewport and start when visible, without prior input. Native product actions are passive. Only Pause or Resume and Restart control playback, outside the product viewport. The IDE keeps its full native workspace in a horizontal scroll region on narrow screens. Named workspace, code and message regions also support keyboard scrolling. A run finishes on its useful final state without looping. Offscreen and background tabs pause progression, a manual pause remains in effect, reduced motion shows a completed state, and restart cancels the prior run. Loading does not move focus into the product. The shared `Static` boundary serves the home content and keeps its internal links routed through the shared client.

Try places one disclosure beside each playback. The Harness terminal formats values from its retained historical recording; resource figures describe admission reservations, not measured process memory. The recording does not prove provider support in a newer source revision.

The header and route transitions share the existing 320ms motion tokens. Explicit theme switches crossfade when the browser supports View Transitions; reduced motion and unsupported browsers switch immediately. Shared content remains visible at first paint.

The dry run below checks the Worker bundle locally and does not publish it:

```sh
npx --no-install wrangler deploy --config wrangler.jsonc --dry-run
```

An actual deploy runs from the merge commit on main, as the studio-deploy skill describes.

## Keep docs current after each change

Review the public docs with every change. Update affected pages in the same change, including relevant setup, configuration, workflows, APIs, examples, errors, limits, and recovery. Keep navigation, links, examples and reference material aligned. If no public docs are affected, record the reason in the change summary.

Product guides live in each project's repository and are linked from `/projects/`. Edit this site only for discovery: the project facts in `src/content.ts` and the routes above. Keep planned, implemented, tested, and released behavior distinct, and state verification, availability, security, and performance limits plainly. A successful local build proves the source can be assembled; it does not prove publication. Report which source changed and which checks passed. Include affected docs in the normal review and release process described in `../CONTRIBUTING.md` and `../RELEASING.md`. After authorized publication, verify the affected public pages, guide destinations, navigation, and response headers over HTTPS before claiming the live site is updated.

## Cloudflare hosting

The canonical address is [ejmlabs.com](https://ejmlabs.com/). The verified Cloudflare account is `478a0db3a110d8503c16abbc1db27af4`; the apex zone is active. Cloudflare serves `dist/`, which holds the site, `/ejmlabs-design-kit.zip` and `/ejmlabs-swag-kit.zip`.

Publishing follows protected source review and a merge to main. Use the existing custom-domain mapping and record the new Worker version. After a deploy, check every route, the two downloads and the response headers over HTTPS.

See [Cloudflare security operations](SECURITY-OPERATIONS.md) for canonical hosts, preview access, credentials, verification, and recovery.
