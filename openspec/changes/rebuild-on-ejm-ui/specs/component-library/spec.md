# Spec Delta

## Purpose

Defines the shadcn/ui-style component library on React, with hooks and layouts, for every ejmlabs site and application.

## ADDED Requirements

### Requirement: shadcn/ui source on React
Components SHALL be copied-in shadcn/ui source styled with Tailwind and class-variance-authority, running on React 19 in strict TypeScript, with native elements used where they replace a heavier primitive.

#### Scenario: Component works
- **WHEN** a component test renders it with React
- **THEN** it renders, handles keyboard use and passes its accessibility checks

#### Scenario: Heavy primitive replaced
- **WHEN** a Radix primitive adds weight that a native element avoids (for example dialog, details, popover)
- **THEN** the component uses the native element and the choice is recorded in the component's doc

### Requirement: Component coverage
The library SHALL provide, at minimum: button, link, input, textarea, select, switch, checkbox, tabs, tooltip, dialog, menu, toast, badge, separator, table, code block with copy, callout, theme toggle, header, footer, page band, section head, rows list, stat figure and product window.

#### Scenario: Every component is documented
- **WHEN** a component exists
- **THEN** the gallery shows it in light and dark with its states, props and guidance

### Requirement: Hooks and layouts
The library SHALL provide hooks (theme, media and container queries, reduced motion, in-view reveal, clipboard, hotkeys) and layouts (site, docs, app shell) that sites compose, so a page is built from views and layouts without page-level CSS.

#### Scenario: Page without custom CSS
- **WHEN** a new route is built from layouts, views and components
- **THEN** it needs no new CSS file and passes the quality checks

### Requirement: Accessible by default
Every interactive component SHALL have visible focus at 3:1, a 44px touch target on coarse pointers, correct roles and keyboard behavior, and text contrast of 4.5:1 in both themes.

#### Scenario: Keyboard use
- **WHEN** a visitor uses only the keyboard
- **THEN** every control is reachable, operable and announces its state
