# Spec Delta

## ADDED Requirements

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

## MODIFIED Requirements

### Requirement: Every instruction entry point states the rules

The root `AGENTS.md` and every project-owned `SKILL.md` MUST put footprint and speed before the package, test-value, campground, and public docs rules while preserving skill metadata and existing workflow instructions.

#### Scenario: A skill is loaded alone

- **WHEN** a contributor loads any project skill without the root instructions
- **THEN** the skill still states the footprint and speed priority before the package, test-value, campground, and public docs rules
