# Spec Delta

## Purpose

Keeps load time as the only performance bar for the site, with no cap on bytes or dependencies.

## ADDED Requirements

### Requirement: No size or dependency caps
The repository SHALL NOT fail a build, test, check or review on the byte size of a page or asset, or on the number of dependencies. Established, actively maintained packages SHALL be preferred to hand-rolled code regardless of their size.

#### Scenario: A larger library is adopted
- **WHEN** a route adds a maintained library that makes its scripts larger
- **THEN** the build and tests pass unless the route's first contentful paint regresses by a second or more

### Requirement: Measured first contentful paint
`npm --prefix site run perf` SHALL serve the built site and measure first contentful paint for `/`, `/download/` and `/projects/` on Lighthouse's desktop throttle profile (40 ms round trip, 10 Mbit/s, no CPU slowdown), a normal connection, served with compression, as the median of three runs. It SHALL fail when any route is 1000 ms or more slower than the baseline recorded in `site/perf-baseline.json`.

#### Scenario: A change adds a whole second
- **WHEN** a change makes a route paint one second or more later than its baseline
- **THEN** the command exits non-zero and names the route, its measurement and its baseline

#### Scenario: A change stays within the window
- **WHEN** every route paints less than one second later than its baseline
- **THEN** the command passes and prints each measurement
