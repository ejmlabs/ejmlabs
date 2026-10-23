# ejmlabs project rules

Never use em dashes. Follow Orwell's rules: use familiar words, active verbs,
and only the words the reader needs.

## Less text, clear meaning

Use the fewest words that preserve meaning. Prefer a clear visual, or no added
content when context already explains the task. Keep meaningful labels,
accessible names, consent and security facts, honest state, and recovery steps.
Avoid cryptic icons and meaning conveyed only by color. Reveal supporting detail
when needed; keep operational docs complete.

Follow the [shared content rule](../ejm-ui/QUALITY.md#content).

## Small footprint and fast execution

Small footprint and fast execution are the primary engineering goals, within
correctness, security, and required behavior. Minimize memory, CPU, startup
time, latency, binary or bundle size, I/O, and dependency cost. Choose the
smallest suitable design and the fastest measured option for the real workload.
Avoid needless services, background work, allocations, copies, and abstractions.
Define budgets for affected paths and measure representative workloads before
claiming an improvement. Document trade-offs when speed and footprint conflict,
and justify any regression. Apply these goals to package choice, tests, and
cleanup.

## Use maintained packages

Do not handroll functionality when a trusted, maintained package already meets
the functional, security, footprint, and performance requirements. Check the
standard library, platform APIs, and existing dependencies first, then evaluate
established packages for maintenance, security, license, compatibility, and
measured resource cost. Use the smallest suitable option and keep custom code
to product-specific behavior and thin adapters. If none fits, document the
alternatives and unmet requirement with evidence before writing custom code.
A measured footprint or speed constraint can rule out a package; preference or
assumption cannot. Apply this rule to production code, tests, fixtures, scripts,
and tooling.

## Tests must earn their place

Every test must protect meaningful behavior, a project contract, or a concrete
regression risk. Do not add or keep tests that merely mirror implementation,
assert incidental wording or source shape, duplicate equivalent coverage, or
retest a dependency without protecting a project contract. If a test provides
no distinct protection, remove or replace it. Match test cost and scope to the
risk; a reversible, low-impact edit does not need a new test by default.

## Campground rule

Leave the area you touch better than you found it. Fix nearby defects, stale
guidance, dead code, and needless complexity when the improvement is safe,
relevant, and easy to verify. Keep cleanup within the task’s scope, preserve
behavior and unrelated work, and record larger follow-up work rather than
starting an unrelated rewrite.

## Keep public docs current, honest, and detailed

For every change, review the public docs site and update all affected
documentation in the same change. Keep it accurate, honest, and detailed enough
for users and contributors to use, operate, and extend the current product.
Cover relevant setup, configuration, workflows, APIs, examples, errors, limits,
and recovery. Distinguish planned, implemented, tested, and released behavior;
state verification, availability, security, and performance limits plainly.
Keep navigation, links, examples, generated content, and reference material in
sync through the existing docs build. Check the affected docs and include them
in the normal release process. If a change has no public docs impact, record
the reason in its summary. Do not claim the live site is updated without
verifying publication.

## Package boundaries

The studio, CLI, harness, IDE, and shared UI form an independent open source
project family. Keep unrelated proprietary products out of their source,
guides, examples, metadata, service defaults, assets, and retained records.
Do not import another product's identity, hosts, credential references,
operations, or licensing claims. Mark filtered historical evidence as scoped
or revised, and keep its integrity records and verification limits accurate.

Choose the owner before choosing the file. Read the affected repository's
instructions and public interfaces before planning or editing across packages.

| Owner | Responsibility |
| --- | --- |
| `ejm-harness` and its crates | Shared agent/session state, provider transport and auth mechanics, tool execution and policy, persistence, resource admission, package runtime, and SDK contracts. |
| `ejm-cli` | Terminal interaction and rendering, CLI commands, bounded view state, and host browser, callback, and relay adapters. |
| `ejm-ide` | Desktop/editor interaction, workspace services, bounded view state, Tauri IPC, and OS/host adapters. |
| `ejm-ui` | Shared tokens and themes, reusable visual components and interaction primitives, site infrastructure, prerendering, demo machinery, and capture tooling. |
| `ejmlabs` | Studio pages and content, project discovery, brand guidance, and public download assembly. Product repositories own their product guides. |

- Products consume public harness and UI contracts. Sites consume public
  `@ejm/*` exports. Harness runtime packages must not depend on consuming products,
  product runtime types, or frontend frameworks. Keep dependencies acyclic.
- Check for an existing public API first. Fix reusable behavior in its owning
  package and keep product composition and host adapters in the consumer. Do
  not import private sibling source or copy a shared implementation into a host.
  Declared local `file:` packages and generated theme outputs are valid ways to
  consume public contracts.
- `ejm-ui/packages/tokens` owns active UI tokens and generated themes. Retained
  `design-kit/` material supports brand assets and earlier links; it is not a
  second authority for current application or site primitives. Shared component,
  token, registry, analytics, header, and build fixes belong in `ejm-ui`.
- A missing shared contract permits only a narrow compatibility adapter. Record
  the gap, upstream owner and public API target, compatibility checks, and
  removal condition before adding or expanding it. Existing adapters do not
  justify a second engine, auth stack, or design system.
- Plans and reviews must name affected owners, public interfaces, dependency
  direction, and downstream impact. Coordinate edits within the authorized
  scope and preserve other work. Check the changed owner and affected consumer
  contracts; report unrun checks and known gaps. Avoid unrelated consumer tests
  when no runtime contract changed.

## OpenSpec

Read the matching project skills in `.agents/skills/`. This project has an
`openspec/` directory. Feature and bugfix work must follow its workflow: explore
or clarify, propose, apply, update the plan when needed, then sync specs and
archive verified work. Never implement those changes directly from a plain
request. Run `openspec init` only when the user asks.
