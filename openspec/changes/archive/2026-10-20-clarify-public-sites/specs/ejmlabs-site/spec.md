## MODIFIED Requirements

### Requirement: Accurate project content
The projects page SHALL state each project's status, license and platforms as its README does, without claiming installers, registry releases or acceptance that the README says are pending.

The site SHALL retain the owner's chosen GitHub destinations and describe source availability per project at the setup and source entry points. A repository that is public SHALL NOT be labelled as awaiting public access.

#### Scenario: Status is stated plainly
- **WHEN** a reader opens `/projects/`
- **THEN** CLI, IDE and Harness have public source links and accurate build and release limits
- **AND** no supported installer or registry release is claimed before it exists

#### Scenario: A public visitor cannot build yet
- **WHEN** a project requires source access that a public visitor does not have
- **THEN** the project facts state that specific limit before setup and source actions and offer the available browser example without claiming a native run

## ADDED Requirements

### Requirement: Concise project discovery
The home and Projects pages SHALL make current projects and their next steps easy to find without repeated invitations or descriptions. About SHALL retain quiet company identity and room for future projects outside AI. Try SHALL place one clear disclosure beside each playback rather than repeat it in introductory copy.

#### Scenario: A visitor chooses a project
- **WHEN** a visitor opens Home or Projects
- **THEN** approved project marks and direct project entry points are visible
- **AND** supporting guides and contribution links are grouped by intent

#### Scenario: A visitor watches an example
- **WHEN** a playback appears on Try
- **THEN** one nearby note states its recorded or simulated nature and that no live model or worker runs there
