# Design

## Decisions

1. **Lift the pinned gate through config, not through a new pin.** The gate runs inside the `ejm-ssg` Vite plugin at the end of every build and offers no skip. `defineSite` takes per-kind limits, so `budget` sets all four to `Infinity`. This is the smallest change that stops the gate failing the build; the build still prints its "all routes within budget" line until ejm-ui drops the gate and a later pin is adopted, at which point the `budget` line in `site/src/site.tsx` is deleted. The ejm-ui pin does not change in this change.
2. **Lighthouse for timing.** It is the maintained tool for first contentful paint and ships the standard mobile 4G profile (150 ms round trip, 1.6 Mbit/s down, 4x CPU slowdown), applied by simulation, so the number does not depend on the machine's own network. The script drives its command line and parses the JSON, with no browser-control code of its own.
3. **Median of three, baseline in a file.** One run is noisy. The script records the median per route in `site/perf-baseline.json`; a check fails when a route's median is 1000 ms or more above it. `-- --update` rewrites the baseline after a deliberate change.
4. **Static server.** The script serves `dist/` with `python3 -m http.server`, as the existing `preview` script does.

## Risks

- Timing varies across machines. The baseline is recorded on the machine that checks, and a one-second window is wide against the roughly 100 ms spread seen between runs. Record a fresh baseline after changing the machine or Chrome version.
- `lighthouse` adds a large development-only dependency tree. It is not part of the shipped site.
