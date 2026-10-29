---
name: studio-site
description: Use before you change ejmlabs.com in the ejmlabs studio: pages, routes, copy, the project directory in content.ts, project marks, releases.json, install.sh, the brand or swag ZIPs, site/brand-kit or design-kit files, site tests, or perf-baseline.json.
---

# Changing ejmlabs.com

Studio supplies text, route data and download lists; ejm-ui supplies the design. A change is
right when the built site reads well without scripts, the tests over `dist` pass, and load time
stays within the baseline.

## Set up

Work in a clean clone with a clean ejm-ui clone beside it at the pin. Never move or build from
a sibling checkout that holds someone else's branch: it breaks the typecheck or skews the build.

```sh
git clone https://github.com/ejmlabs/ejm-ui.git ../ejm-ui
git -C ../ejm-ui checkout --detach "$(node -p "require('./.github/ui-source.json').revision")"
npm --prefix ../ejm-ui ci --ignore-scripts
node scripts/check.mjs   # installs the site lock without scripts, then typechecks
```

## Where things live

| Change | Edit |
| --- | --- |
| A route or its head | `site/src/site.tsx`, the page in `site/src/pages/`, and `site/public/sitemap.xml` |
| Home or Brand text | `site/src/stages/HomeContent.tsx`, `site/src/stages/BrandContent.tsx` |
| Project facts, links, actions | `site/src/content.ts` |
| Header, footer, analytics | `site/src/shell.tsx` |
| Released files, `install.sh`, brand and swag ZIPs | see references/downloads.md |

## Pages and design

- Compose pages from public `@ejm/ui` deep imports (`@ejm/ui/layout/Band`) and the
  `@ejm/ui/layout/SiteContent` pieces (`SectionBody`, `Columns`, `Actions`, notes, asset
  previews, links). When a pattern is missing, add it to ejm-ui and adopt the new pin.
- The `ejmSite` build plugin fails on local CSS rules or imports, inline styles, style
  elements, visual `className` values and unsupported overrides. The only exceptions are the
  public shared CSS imports, the content-scan exclusion and `Static className="contents"`.
- Every route is lazy, so the entry holds only the shell. Home and Brand content render through
  one `Static` boundary from `@ejm/ssg` and do not hydrate. Links and downloads work without
  page JavaScript.
- One `h1` per route, the skip link first, the theme toggle last in the header, external links
  `rel="external"`. Standalone actions, text links included, use the shared button treatment
  (44 px targets); links inside prose use the shared inline link.
- Home keeps its sections in the order `site/test/site.test.mjs` checks, with no product
  previews, carousel controls or image preloads. Product screenshots belong on product sites.
- Try consumes the lazy `@ejm/demos/islands/*-preview` entries. Fixtures, playback and their
  provenance live in `ejm-ui/packages/demos`, never here. Keep each disclosure beside its
  playback; the browser makes no model or tool calls.

## Copy and the project directory

- Take project facts from each project's own README and state status as it does. Product guides
  stay in their repositories; this site links to them from `/projects/`.
- The copy welcomes people to run, study, change and contribute. Current projects do not limit
  future work. No team-size framing, invented adoption or sales claims, or em dashes.
- gerry: say only what its own site says, label it not released, link to its site, and keep it
  out of open source rows, license lines and source links. Its mark appears only on Home.
- A project change touches its facts in `content.ts`, the home row, the projects page, the
  footer and the tests together. Repository URLs come from the shared registry
  (`@ejm/site/projects`); a project not in it yet is a local constant in `content.ts`.
- Marks come from `@ejm/tokens/assets/projects/ID/`. A mark ejm-ui does not export yet is a
  byte copy in `site/src/assets/projects/`, with source, commit and SHA-256 in that folder's
  README. Replace it with the export once ejm-ui ships it.
- Recheck anonymous repository access before the site calls a repository public.

## Tests

- `npm test` builds `dist`, then `node --test` reads the built output. Add each check to the
  file that owns the area: `site.test.mjs` (routes, structure, voice, links, marks, brand ZIPs,
  headers, sitemap), `download.test.mjs` (Download page, report links), `releases.test.mjs`
  (the release list validator), `install.test.mjs` (`install.sh` fixtures and shellcheck).
- `install.test.mjs` skips shellcheck when it is not installed. Report a skip as not run.
- Look at each visible change in the built site (`npm run preview`, 127.0.0.1:4827) at 375 px
  and desktop, light and dark. The last header button toggles the theme.

## Load time

- `npm run perf` measures first contentful paint for `/`, `/download/` and `/projects/` on the
  built site (median of three Lighthouse desktop runs, needs Chrome) and fails at 1000 ms or more
  over `site/perf-baseline.json`. CI does not run it: run it for any change that adds to a first
  load, and report it as not run when Chrome is missing.
- There is no byte cap. Never re-record the baseline to make a change pass. Record a new one
  (`npm run perf -- --update`) only for an intended change, with the before and after numbers
  and the reason in the PR.

## Read next

- [references/downloads.md](references/downloads.md): before you touch `releases.json`,
  `install.sh`, report links, the brand or swag ZIPs, `site/brand-kit/` or `design-kit/`.
