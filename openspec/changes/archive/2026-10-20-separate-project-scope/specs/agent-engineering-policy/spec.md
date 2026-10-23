# Spec Delta

## ADDED Requirements

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
