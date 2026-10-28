# Proposal

## Why

The site build fails when a route's gzip JavaScript, CSS, HTML or font bytes pass a fixed limit. The limit was already raised once, from 95 to 97 KB, to fit the Download page, and it blocks libraries such as three.js that do the job well. Byte counts are a poor proxy for what visitors feel. Established, actively maintained packages are preferred over hand-rolled code, and a cap works against that rule. What matters is how soon a page paints.

## What Changes

- Remove the `budget` script and the `budget` limits in `site/src/site.tsx` that raised the JavaScript limit. Remove the byte-budget wording from the README and `site/README.md`, and from the notes of earlier changes.
- Add `npm --prefix site run perf`: it serves the built site and measures first contentful paint for `/`, `/download/` and `/projects/` with Lighthouse on its desktop throttle (a normal connection), served with compression, median of three runs. It fails when a route is one second or more slower than the baseline in `site/perf-baseline.json`.
- Add `lighthouse` (maintained by the Chrome team, needs a local Chrome) and `serve` as development dependencies, with a `compression` override.
- No byte, file-count or dependency-count cap remains in this repository's tests, checks, specs or review criteria.

Out of scope: the ejm-ui pin, the vendored snapshots under `review/`, and headers or CSP.

## Capabilities

### New Capabilities

- `load-time`: Page load time is the only performance bar, and it is measured against a recorded baseline.

### Modified Capabilities

None. `openspec/specs/` holds no baseline for size limits; they lived in the README and the build.

## Impact

`site/` gains `scripts/perf.mjs`, `perf-baseline.json` and one development dependency. The `budget` script goes. The pinned ejm-ssg build runs its own size gate inside `ejm-ssg build` and has no switch to skip it, so this change lifts every limit in the site config. Moving to a pin that drops the gate lets that line go too. Shared headers stay unchanged. No deploy.
