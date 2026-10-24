# Spec Delta

## ADDED Requirements

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
