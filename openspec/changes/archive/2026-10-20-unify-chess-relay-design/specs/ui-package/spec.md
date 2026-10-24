# Spec Delta

## ADDED Requirements

### Requirement: Shared Chess identity
ejm-ui SHALL own an original Chess mark that follows the existing ejmlabs project identity language. The shared identity source SHALL generate matching header, theme and favicon assets. Consumers SHALL use the public generated assets without drawing their own variants.

#### Scenario: Chess identity appears at different sizes
- **WHEN** Chess displays its project mark in a header or browser favicon
- **THEN** it uses the same canonical geometric identity
- **AND** the mark remains legible in light and dark themes

### Requirement: Shared application design authority
Chess and Relay SHALL consume public ejm-ui contracts for all visual presentation and reusable interactions. ejm-ui SHALL own application headings, form rhythm, workspaces, player and move presentation, native HTML styling and motion. Consumers SHALL supply product data, content, domain behavior and semantic state without local visual overrides.

#### Scenario: Application adopts a shared recipe
- **WHEN** a shared application recipe changes and Chess and Relay rebuild
- **THEN** the affected presentation uses the new shared recipe without a consumer CSS edit
- **AND** consumers retain their game, account, transport and encryption behavior

### Requirement: Application design enforcement
Application build checks SHALL reject consumer visual classes, inline styles, local CSS rules and unsupported shared-component overrides. Native HTML consumers SHALL apply the same ownership boundary to templates and generated markup. Checks SHALL allow semantic attributes, product event handlers and public stylesheet imports.

#### Scenario: A consumer adds a local visual recipe
- **WHEN** a React component or native HTML template introduces local visual styling
- **THEN** its design check fails with the source location and shared owner

### Requirement: Application parity preserves access and limits
Shared React and native HTML profiles SHALL use the same tokens, controls, header geometry and calm motion. Native forms SHALL remain usable without JavaScript. Reduced motion SHALL show final content without travel. Existing privacy, keyboard, responsive layout and byte-budget contracts SHALL remain intact.

#### Scenario: A phone opens a game or controller
- **WHEN** a visitor opens Chess or Relay at phone width
- **THEN** controls and content remain reachable without document overflow
- **AND** workspace scrolling remains within its intended content area

#### Scenario: Native privacy form has no scripts
- **WHEN** Relay's privacy form opens without JavaScript
- **THEN** its shared presentation, labels, validation and ordinary form submission remain usable
- **AND** the redesign adds no stored browser identity or analytics
