# Spec Delta

## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: Use suitable maintained packages

Project instructions MUST forbid handrolling when a trusted, maintained package meets functional, security, footprint, and performance requirements. They MUST require checking standard tools and existing dependencies first, evaluating suitable packages including measured resource cost, and documenting alternatives and the unmet requirement with evidence before custom code. Measured footprint or speed constraints can rule out a package; preference or assumption cannot.

#### Scenario: A suitable package exists

- **WHEN** a contributor considers custom code for behavior that a trusted, maintained package provides within the functional, security, footprint, and performance requirements
- **THEN** the instructions require using the smallest suitable option and limiting custom code to product behavior and thin adapters
- **AND** the rule covers production code, tests, fixtures, scripts, and tooling

#### Scenario: A package misses a measured budget

- **WHEN** measurements show that a package cannot meet a required footprint or speed budget
- **THEN** the instructions allow ruling it out with evidence of the alternatives and unmet requirement before writing custom code

### Requirement: Every instruction entry point states the rules

The root `AGENTS.md` and every project-owned `SKILL.md` MUST put footprint and speed before the package, test-value, and campground rules while preserving skill metadata and existing workflow instructions.

#### Scenario: A skill is loaded alone

- **WHEN** a contributor loads any project skill without the root instructions
- **THEN** the skill still states the footprint and speed priority before the package, test-value, and campground rules
