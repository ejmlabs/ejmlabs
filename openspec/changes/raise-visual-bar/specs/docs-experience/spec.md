# Spec Delta

## Purpose

Defines the documentation experience for ejmlabs projects: navigation, in-page orientation, code presentation and reference tables that make docs fast to scan and pleasant to read on any screen.

## ADDED Requirements

### Requirement: Docs layout
The docs layout SHALL provide a section sidebar, a reading column of at most 68 characters, and an on-this-page table of contents, collapsing the sidebar and table of contents into accessible controls on narrow screens.

#### Scenario: Desktop
- **WHEN** a docs page is viewed at 1440px
- **THEN** the sidebar, reading column and table of contents appear side by side
- **AND** the current page is marked in the sidebar

#### Scenario: Phone
- **WHEN** a docs page is viewed at 375px
- **THEN** the sidebar and table of contents are reachable through labelled controls
- **AND** the page does not scroll horizontally

### Requirement: Scroll-aware contents
The table of contents SHALL mark the heading currently in view, and activating an entry SHALL move focus and scroll to that heading.

#### Scenario: Reading marks position
- **WHEN** the visitor scrolls past a section heading
- **THEN** the matching contents entry becomes the current one

#### Scenario: Without scripts
- **WHEN** scripts are disabled
- **THEN** every contents entry still jumps to its heading

### Requirement: Code blocks
Code blocks SHALL show a language label and a copy control, SHALL support grouped language tabs, and SHALL scroll inside their own box on narrow screens.

#### Scenario: Copy
- **WHEN** a visitor activates the copy control
- **THEN** the block's code text is placed on the clipboard
- **AND** the control confirms the copy in text for assistive technology

#### Scenario: Language tabs
- **WHEN** a group offers Rust, TypeScript and Python
- **THEN** the visitor can switch with the keyboard using arrow keys and the selected tab is announced

### Requirement: Reference tables and callouts
Docs SHALL provide parameter tables and callouts (note, tip, warning) in which meaning is carried by a text label, not by color alone.

#### Scenario: Callout without a box
- **WHEN** a callout appears
- **THEN** it is set apart by a left rule and its text label, with no filled or bordered box

#### Scenario: Warning callout
- **WHEN** a warning callout appears
- **THEN** it begins with the text label "Warning"

### Requirement: Page filter and sequence
Docs SHALL offer a client-side filter over the sidebar entries and previous and next links at the end of each page.

#### Scenario: Filter
- **WHEN** a visitor types in the filter
- **THEN** only matching sidebar entries remain visible and the count of results is announced

#### Scenario: Sequence
- **WHEN** a visitor reaches the end of a page
- **THEN** previous and next links name the adjacent pages
