# agent-engineering-policy Specification

## Purpose

Give contributors consistent rules for package reuse, useful tests, and safe local cleanup wherever project instructions are loaded.

## Requirements

### Requirement: Prioritize small footprint and fast execution

Project instructions MUST make small footprint and fast execution the primary engineering goals within correctness, security, and required behavior. They MUST cover memory, CPU, startup time, latency, artifact size, I/O, and dependency cost. They MUST require relevant budgets, representative measurements for improvement claims, and documented trade-offs and regression justifications.

#### Scenario: A design affects resource use

- **WHEN** a contributor chooses a design, package, test, or cleanup that could affect resource use or speed
- **THEN** the instructions prioritize the smallest suitable design and the fastest measured option for the real workload
- **AND** they require avoiding needless services, background work, allocations, copies, and abstractions

#### Scenario: Speed and footprint conflict

- **WHEN** improving speed increases footprint or reducing footprint slows execution
- **THEN** the instructions require measurements and a documented trade-off for the workload
- **AND** correctness, security, and required behavior still hold

### Requirement: Use suitable maintained packages

Project instructions MUST forbid handrolling when a trusted, maintained package meets functional, security, footprint, and performance requirements. They MUST require checking standard tools and existing dependencies first, evaluating suitable packages including measured resource cost, and documenting alternatives and the unmet requirement with evidence before custom code. Measured footprint or speed constraints can rule out a package; preference or assumption cannot.

#### Scenario: A suitable package exists

- **WHEN** a contributor considers custom code for behavior that a trusted, maintained package provides within the functional, security, footprint, and performance requirements
- **THEN** the instructions require using the smallest suitable option and limiting custom code to product behavior and thin adapters
- **AND** the rule covers production code, tests, fixtures, scripts, and tooling

#### Scenario: A package misses a measured budget

- **WHEN** measurements show that a package cannot meet a required footprint or speed budget
- **THEN** the instructions allow ruling it out with evidence of the alternatives and unmet requirement before writing custom code

### Requirement: Tests earn their place

Project instructions MUST require every test to protect meaningful behavior, a project contract, or a concrete regression risk. They MUST require removing or replacing tests that provide no distinct protection and matching test cost to risk.

#### Scenario: A test has no useful protection

- **WHEN** a test only mirrors implementation, checks incidental wording or source shape, duplicates equivalent coverage, or retests a dependency without protecting a project contract
- **THEN** the instructions require removing or replacing that test

#### Scenario: An edit has low impact

- **WHEN** a reversible edit has low impact
- **THEN** the instructions do not require adding a test by default

### Requirement: Leave the area better

Project instructions MUST require leaving the area touched better than it was found through safe, relevant, verifiable cleanup. They MUST preserve behavior and unrelated work, keep cleanup within the task's scope, and record larger follow-up work.

#### Scenario: Nearby cleanup is safe

- **WHEN** a contributor finds a nearby defect, stale instruction, dead code, or needless complexity
- **THEN** the instructions require fixing it when the change is safe, relevant, and easy to verify
- **AND** larger work is recorded for follow-up

### Requirement: Keep public docs current, honest, and detailed

Project instructions MUST require a public docs review for every change and updates to all affected pages in the same change. Guides MUST provide enough detail to use, operate, and extend the current product. Changes with no public docs impact MUST record the reason in their summary.

#### Scenario: A change affects documented behavior

- **WHEN** a change affects setup, configuration, workflows, APIs, examples, errors, limits, or recovery
- **THEN** the instructions require updating the affected public documentation in the same change
- **AND** the guides include the relevant detail for users and contributors

#### Scenario: A change has no public docs impact

- **WHEN** a contributor finds that a change does not affect public documentation
- **THEN** the instructions require recording the reason in the change summary

### Requirement: Ground documentation claims in evidence

Project instructions MUST distinguish planned, implemented, tested, and released behavior. They MUST require plain statements of verification, availability, security, and performance limits, checks of affected docs through the existing build, and verified publication before claiming that the live site is current.

#### Scenario: Source changes are ready before publication

- **WHEN** documentation source has been updated and checked but publication has not been verified
- **THEN** the instructions require reporting the source and check status accurately
- **AND** they forbid claiming that the live site has been updated

#### Scenario: Documentation moves through release

- **WHEN** a change affects public docs content, routes, navigation, examples, generated content, or reference material
- **THEN** the instructions require keeping those parts in sync through the existing docs build and normal release process
- **AND** verification and availability limits remain explicit

### Requirement: Every instruction entry point states the rules

The root `AGENTS.md` and every project-owned `SKILL.md` MUST put footprint and speed before the package, test-value, campground, and public docs rules while preserving skill metadata and existing workflow instructions.

#### Scenario: A skill is loaded alone

- **WHEN** a contributor loads any project skill without the root instructions
- **THEN** the skill still states the footprint and speed priority before the package, test-value, campground, and public docs rules

### Requirement: Assign each concern to its package owner

Project instructions MUST assign shared execution, auth, and tool behavior to the harness; terminal behavior to the CLI; desktop behavior to the IDE; shared visuals and site tooling to ejm-ui; and studio content, discovery, and brand downloads to ejmlabs. They MUST require checking the owning public contract before adding shared behavior to a consumer.

#### Scenario: A shared behavior needs a change

- **WHEN** a change affects behavior that several products use
- **THEN** the instructions require fixing it in its owning shared package and adapting consumers through public contracts
- **AND** product view state and host-specific adapters stay with their product

#### Scenario: A studio page needs a shared primitive

- **WHEN** a studio page needs a reusable component, token, theme, or site build behavior
- **THEN** the instructions route the shared change to ejm-ui and keep page content and composition in ejmlabs
- **AND** retained design-kit files do not become a second authority for active UI tokens

### Requirement: Keep dependencies on public shared contracts

Project instructions MUST require acyclic dependencies through public shared interfaces. They MUST forbid shared runtime packages depending on consuming products, private sibling-source imports, and copied shared implementations. Temporary adapters for a missing public contract MUST name the gap, upstream owner, compatibility checks, and removal condition.

#### Scenario: A consumer needs an internal shared function

- **WHEN** a product needs behavior that the owning package does not expose
- **THEN** the instructions require extending the public contract in the owner
- **AND** they reject importing sibling internals or copying the implementation

#### Scenario: A documented contract gap needs an adapter

- **WHEN** an existing public contract cannot yet support required product behavior
- **THEN** the instructions allow only a narrow adapter with a recorded gap, upstream target, compatibility checks, and removal condition
- **AND** the exception does not permit expanding a second implementation of shared behavior

### Requirement: Record and check changes across packages

Project instructions MUST require plans and reviews to name affected owners, public interfaces, dependency direction, and downstream impact. Work across repositories MUST follow each repository's instructions and the authorized scope. Checks MUST cover changed owner behavior and affected consumer contracts, with unrun checks and known gaps reported.

#### Scenario: A public contract changes

- **WHEN** a change affects several packages or repositories
- **THEN** the instructions require an owner-first plan, scoped coordination, and checks of affected consumer contracts
- **AND** contributors report checks that were not run and remaining compatibility gaps

### Requirement: Apply boundary rules through every instruction entry point

The root AGENTS.md MUST define package ownership and dependency rules. Every project-owned SKILL.md MUST require reading those rules and applying them to its workflow, including planning, implementation, review, spec sync, and archive. Existing skill metadata and workflow steps MUST remain intact.

#### Scenario: A skill is loaded without root instructions

- **WHEN** a contributor loads any local skill on its own
- **THEN** it requires reading the root package boundaries before acting
- **AND** its instructions require public interfaces, owner-first changes, and boundary checks appropriate to its workflow

### Requirement: Keep open source projects independent

Project instructions MUST keep the studio and its open source projects independent of unrelated proprietary products. Source, guides, examples, metadata, service defaults, assets, and retained records MUST stay within their owning project scope. Filtered evidence MUST state its limits and MUST NOT claim to be an unchanged original.

#### Scenario: Unrelated product details appear in a project file

- **WHEN** a contributor finds another proprietary product's identity, endpoint, credential reference, source link, or operational record
- **THEN** the contributor removes that material from the open source project's files
- **AND** preserves the project's own documented behavior without inventing replacement services or evidence

#### Scenario: Retained evidence is filtered

- **WHEN** a retained audit or source snapshot is changed to remove unrelated product details
- **THEN** its scope and any revised integrity records identify the change
- **AND** historical results are not presented as verification of the revised source
