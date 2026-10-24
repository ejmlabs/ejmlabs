# Spec Delta

## Purpose

Defines the documentation layout and behaviors, and the product views and interactive demo islands used on every site.

## ADDED Requirements

### Requirement: Docs layout
The docs layout SHALL provide a section sidebar, a reading column of at most 68 characters and an on-this-page contents list, collapsing the sidebar and contents into labelled controls on narrow screens.

#### Scenario: Phone
- **WHEN** a docs page is viewed at 375px
- **THEN** the sidebar and contents are reachable through labelled controls
- **AND** the page does not scroll horizontally

### Requirement: Docs behaviors
Docs SHALL mark the heading in view in the contents, offer code blocks with a language label, copy control and keyboard-operable language tabs, a sidebar filter that announces its result count, callouts and parameter tables whose meaning is carried by text labels, and previous and next links.

#### Scenario: Copy and tabs
- **WHEN** a visitor copies a block or switches a language tab by keyboard
- **THEN** the code reaches the clipboard and the result is announced

#### Scenario: Without scripts
- **WHEN** scripts are disabled
- **THEN** the contents links jump to headings and every tab panel is shown under its label

### Requirement: Real product shots
Product imagery SHALL be a real capture of the real product (the running desktop app window, or a real terminal session of the real binary), with metadata naming the product, version or commit, date, theme and capture method, and a caption.

#### Scenario: Shot is real
- **WHEN** a product shot appears on a page
- **THEN** it was captured from the running product and its metadata matches the current product source
- **AND** it is not a drawn or re-created interface

#### Scenario: Shot is cheap
- **WHEN** a page with a hero shot loads
- **THEN** the image has explicit dimensions, a modern format with a fallback, and the page stays within its byte and LCP budgets

### Requirement: Product views and demo islands
Each product (ejm-cli, ejm-ide, ejm-harness) SHALL have a static product view and a lazy-loaded interactive demo island driven by scenario data with no network use. Layout, terms and controls SHALL follow the current product. Demo-only toolbars, prompt chips, fake titlebars, invented dashboards and actions absent from the product SHALL NOT be shown. Page copy SHALL disclose that the views use scripted sample data and make no model calls.

#### Scenario: Demo labelled
- **WHEN** a demo is shown
- **THEN** page copy states that it uses scripted sample data and no model calls, without adding product chrome

#### Scenario: Product layout is authentic
- **WHEN** a visitor uses a demo
- **THEN** CLI follows the actual terminal layout, IDE follows its actual workspace and assistant panel, and harness shows source-derived terminal output

#### Scenario: Demo is lazy
- **WHEN** a page loads
- **THEN** the demo code is not part of the initial bundle and loads when the demo nears the viewport or is activated
