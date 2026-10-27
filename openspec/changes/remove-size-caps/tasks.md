# Tasks

## 1. Remove caps

- [x] 1.1 Delete the `budget` script and lift the `budget` limits in `site/src/site.tsx`.
- [x] 1.2 Remove byte-budget wording from `README.md`, `site/README.md` and earlier change notes.

## 2. Measure load time

- [x] 2.1 Add `lighthouse` and `site/scripts/perf.mjs` with the `perf` script.
- [x] 2.2 Record `site/perf-baseline.json` and document the command in `README.md`.

## 3. Verify

- [x] 3.1 `node scripts/check.mjs`, `npm --prefix site test`, the site build, `npm --prefix site run perf`, strict OpenSpec validation and gitleaks pass.
- [ ] 3.2 After a pin that drops the ejm-ssg gate, delete the `budget` line in `site/src/site.tsx`.
