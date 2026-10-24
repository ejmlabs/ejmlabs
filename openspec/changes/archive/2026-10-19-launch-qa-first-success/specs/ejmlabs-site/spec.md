# Spec Delta

## MODIFIED Requirements

### Requirement: Accurate project content
The projects page SHALL state each project's status, license and platforms as its README does, without claiming installers, registry releases or acceptance that the README says are pending.

The site SHALL retain the owner's chosen GitHub destinations and describe source availability per project at the setup and source entry points. A repository that is public SHALL NOT be labelled as awaiting public access.

#### Scenario: Status is stated plainly
- **WHEN** a reader opens `/projects/`
- **THEN** ejm-cli is described as built from source with public source access pending, ejm-ide as early development with public source access pending, native support still being tested and no signed installers, and ejm-harness as available from public source with no registry packages

#### Scenario: A public visitor cannot build yet
- **WHEN** a project requires source access that a public visitor does not have
- **THEN** the project facts state that limit before setup and source actions and offer the available browser example without claiming a native run
