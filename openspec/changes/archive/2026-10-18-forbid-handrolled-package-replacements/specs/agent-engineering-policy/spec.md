# Spec Delta

## Purpose

Give contributors consistent rules for package reuse, useful tests, and safe local cleanup wherever project instructions are loaded.

## ADDED Requirements

### Requirement: Use suitable maintained packages

Project instructions MUST forbid handrolling functionality when a trusted, maintained package meets the requirements. They MUST require checking standard tools and existing dependencies first, evaluating suitable packages, and documenting alternatives and the unmet requirement before custom code. Convenience, size, or fewer dependencies alone MUST NOT justify an exception.

#### Scenario: A suitable package exists

- **WHEN** a contributor considers custom code for behavior that a trusted, maintained package provides
- **THEN** the instructions require using the suitable option and limiting custom code to product behavior and thin adapters
- **AND** the rule covers production code, tests, fixtures, scripts, and tooling

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

### Requirement: Every instruction entry point states the rules

The root `AGENTS.md` and every project-owned `SKILL.md` MUST state all three rules explicitly while preserving skill metadata and existing workflow instructions.

#### Scenario: A skill is loaded alone

- **WHEN** a contributor loads any project skill without the root instructions
- **THEN** the skill still states the package, test-value, and campground rules
