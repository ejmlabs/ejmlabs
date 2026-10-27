# Design

## Decisions

1. **Lift the pinned gate through config, not through a new pin.** The gate runs inside the `ejm-ssg` Vite plugin at the end of every build and offers no skip. `defineSite` takes per-kind limits, so `budget` sets all four to `Infinity`. This is the smallest change that stops the gate failing the build; the build still prints its "all routes within budget" line until ejm-ui drops the gate and a later pin is adopted, at which point the `budget` line in `site/src/site.tsx` is deleted. The ejm-ui pin does not change in this change.
2. **Lighthouse for timing.** It is the maintained tool for first contentful paint and ships a desktop profile (40 ms round trip, 10 Mbit/s down, no CPU slowdown), a normal connection, applied by simulation, so the number does not depend on the machine's own network. The script drives its command line and parses the JSON, with no browser-control code of its own.
3. **Median of three, baseline in a file.** One run is noisy. The script records the median per route in `site/perf-baseline.json`; a check fails when a route's median is 1000 ms or more above it. `-- --update` rewrites the baseline after a deliberate change.
4. **Serve with compression through a maintained server.** `serve` compresses responses as the CDN does, so the measurement describes what visitors receive and does not penalise bytes the CDN never sends. `compression` is overridden to ^1.8.2 to clear an advisory in the version `serve` pins.

## Risks

- Timing varies across machines. The baseline is recorded on the machine that checks, and a one-second window is wide against the roughly 100 ms spread seen between runs. Record a fresh baseline after changing the machine or Chrome version.
- `lighthouse` adds a large development-only dependency tree. It is not part of the shipped site.
- The build records the lifted limits as `Infinity`, which JSON writes as `null` in `.ejm-ssg/build.json`; a manual `ejm-ssg budget` run would read them as zero. It goes away with task 3.2.
