# Verification

## Shared changes

ejm-ui owns this repair through the public @ejm/demos, @ejm/ui and @ejm/site
contracts. Consumers still supply content and routes. No product runtime,
release API, native application, provider or credential behavior changed.

The IDE showcase now keeps one workspace tree through its lifecycle and a
complete responsive height chain. Editor and messages retain vertical scroll;
the outer workspace retains horizontal access. Hidden diff labels use the
existing inline screen-reader utility. Their prior absolute positioning
escaped the chat pane and extended the outer scroll range after diffs appeared.

The compact merge generator now retains the maintained object-fit group for
the public logo recipe. Its public cn bundle grows from 6,835 to 6,864 gzip
bytes. Unrelated utility source and tests retain their captured hashes.

The development design guard revalidates once on watcher readiness. A real
fixture reproduced a file created during the initial crawl without an add
event. The new deterministic regression failed before the repair and passes
after it. The validator itself is unchanged. There is no polling, extra timer,
per-request scan, browser dependency or new package.

## Checks

- Full shared npm run check passes: 819 tests in 85 files, types, asset and
  generated theme checks, parity, merge coverage, source and catalog checks.
- The focused lifecycle regression failed before the height repair and passes
  after it. It checks stable workspace and scroll-region nodes through start,
  completion and restart, plus disposal of pending work.
- All 32 design guard tests pass, including both the deterministic startup
  regression and the unchanged real-watcher integration check.
- Studio types, build and 23 site tests pass. Maximum route JavaScript is
  92.1 KiB and CSS is 13.6 KiB, within the existing 95 and 14 KiB limits.
- IDE production build, site and Worker types, three docs checks and six site
  checks pass. Maximum JavaScript is 100.5 KiB and CSS is 15.2 KiB, within the
  existing 110 and 15.5 KiB limits.
- CLI and Harness site checks and budgets pass against the final shared source.
  Their prior 95 KiB JavaScript and 14 KiB CSS limits remain unchanged.

The final checks used local Node 26.12.0. Earlier aggregate runs exposed the
merge group gap and startup race described above. One initial image subprocess
timed out; its isolated rerun and the final aggregate pass. No check or budget
was weakened.

## Browser evidence

CUA reviewed the built local IDE Worker in the reported 1035-pixel viewport
and at 375 pixels. At desktop width the outer viewport has 587 pixels of client
height and scroll height through playback and completion. At phone width both
are 429 pixels. Outer scrollTop remains zero when code and messages move from
Home to End. Completed editor and message content exceeds its inner height and
still scrolls. Phone horizontal access moves scrollLeft from zero to 40 pixels,
while document width remains 375 pixels. Restart preserves the frame height
and resumes playback on both sizes.

Before the repair, completed outer scroll height was 1,602 pixels for the same
587-pixel desktop frame, and focusing code could move its outer scrollTop.
The final browser measurements and screenshot are saved under
`/private/tmp/ejm-unified-sites-9qgh2zp6/scroll-fix/`.

## Documentation and release boundary

Shared demo and site docs now explain the scrolling and watcher lifecycle
contracts. User guides need no runtime change because the products did not
change. Clean release projections, normal commit hooks and live publication
checks are the next release steps. This verification records local results,
not a deployment or source-visibility claim.
