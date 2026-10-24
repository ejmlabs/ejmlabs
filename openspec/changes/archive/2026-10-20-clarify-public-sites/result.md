# Result

All twelve implementation tasks are complete locally. Publication remains a
separate checked release. No staging, commit, push or deployment occurred.

## Owners and changes

- ejm-ui: mandatory design checks, native field/button/group recipes, a working
  gallery example, inherited project heading type, useful retained Harness
  terminal output, phone contents order and correct document-fragment links.
  Fixed playback uses public control parts and stays at least 44 pixels high.
- ejmlabs: shorter Home, Projects, About and Try, direct project actions,
  approved marks, quiet LLC identity, retained public brand guidance and one
  source disclosure per recording.
- CLI and IDE: accurate public source links, fewer repeated sections, clearer
  setup and recovery, and honest download and native acceptance limits.
- Harness: language-specific setup, matching worker/SDK guidance and honest
  provider and historical recording limits.
- Chess: short discovery and account copy, available choices and retained
  recovery, eligibility and clock limits.
- Relay: shared signed-out browser pages, exact callback validation and account
  actions based on existing configuration and authoritative state.
- Extension registry: the public native profile and same-origin assets, with
  full device approval, permissions, publisher-name warning and revocation.

Shared visuals, tokens, recipes, demo machinery and build behavior remain in
ejm-ui. Consumers use public exports and live declared local packages. Native
pages gain no frontend framework. No dependency, minifier or budget changed.

## Verification

| Owner | Local checks |
| --- | --- |
| Studio | Types, seven built routes and 23 tests pass. |
| UI | Focused component, native, playback and site tests pass. The final routing, merge and playback set has 76 passing tests, overlapping earlier sets. Types, generated assets, tree-shaking and all 18 gallery routes pass. |
| CLI | Types, 14 routes, header gate, 93 tests and the three-route cold-load gate pass. |
| IDE | Types, three authored guides, six routes, links and budgets pass. |
| Harness | Types, five routes, 39 tests and budgets pass. |
| Chess | Types, 16 built routes and guide budgets pass. Fourteen existing account and AI contract tests also pass. |
| Relay | Types, schema, 74 focused workerd tests, 27 native states, five browser tests, build and Worker dry run pass. |
| Registry | The full check-registry gate passes, including policy, types, schema, lint, dependencies, audit, two Worker dry runs and 25 workerd tests. |

The final CLI performance gate uses three cold samples per route with scripts
on and off, a 375 by 812 viewport at DPR 3, four times slower CPU, Slow 4G and
150 ms RTT. Home transfers 94.9 KiB JavaScript; the user and developer guides
transfer 93.7 and 93.0 KiB. All three median LCP values are 748 ms, with zero
CLS and TBT. The visible Home demo stays in the measurement. The original
95 KiB limit and every other transfer and paint limit pass.

Saved browser review covers 60 Studio, Chess, registry and product states at
actual phone and desktop widths in both themes without horizontal overflow.
Gallery and Relay have separate responsive checks. Deep guide navigation,
Back/Forward, phone contents, skip navigation, recovery, setup anchors and
playback were checked. The fixed deep heading lands at y=135.60 below the
72 pixel header. External OAuth, paid transactions and game creation were not
exercised.

Affected public guides, package references, README files and skills are updated.
All six repository HEADs and staged changes match their baselines. Existing
dirty work remains. Three old EOF warnings are unchanged; no new whitespace
error was found.

## Limits and evidence

Checks used Node 26.12.0. Node 24, declared by Studio and Chess, was unavailable
and remains untested. Full unrelated native product suites, installer acceptance,
current provider execution, hosted CI adoption and production publication were
not verified. Historical Harness playback does not prove current provider
support. No production speed or capacity improvement is claimed.

Detailed logs, original failed attempts, screenshots, source snapshots and
preservation checks are in `/private/tmp/ejm-site-fixes-20261020`.
The review report is
`/Users/everettmorgan/.codex/visualizations/2026/10/19/01a15394-2f26-78c0-81f3-2f1518233fda/site-fixes-2026-10-20.md`.
