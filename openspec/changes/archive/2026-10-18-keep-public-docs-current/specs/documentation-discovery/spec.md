# Spec Delta

## ADDED Requirements

### Requirement: Maintain documentation through each change

Contributor guidance MUST require a public docs review for every change. Product repositories MUST own their guide content, navigation, builds, and checks. The studio MUST own discovery links and shared docs layout guidance. Contributors MUST update affected documentation in the same change or record why no public docs update is needed.

#### Scenario: A product guide or route changes

- **WHEN** a product change affects its user or developer guide, documentation route, or shared docs layout
- **THEN** contributors update the affected guide content and studio discovery links where relevant
- **AND** they use the owning repository's existing source files, builds, and checks

### Requirement: Report documentation publication honestly

Contributor guidance MUST require checking affected documentation and including it in the normal release process. It MUST distinguish source updates and local checks from verified live publication. Guides MUST state relevant availability, verification, security, and performance limits plainly.

#### Scenario: A guide is ready for release

- **WHEN** affected docs have been updated and checked locally
- **THEN** the change summary records the source and check results
- **AND** the summary claims a live update only after publication and the affected public pages have been verified

#### Scenario: New guide routes enter the studio index

- **WHEN** the studio adds discovery links to new product guide routes
- **THEN** the product guides are published and their destinations verified before the studio update is published
- **AND** normal release authorization still applies
