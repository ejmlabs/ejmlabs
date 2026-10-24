# Spec Delta

## Purpose

Defines how ejmlabs sites run: Vite and React single-page apps with prerendered routes, smooth transitions and strict performance budgets.

## ADDED Requirements

### Requirement: Prerendered single-page apps
Each site SHALL be a Vite and React SPA whose every route is prerendered to static HTML at build time and hydrated on load.

#### Scenario: First paint without JavaScript
- **WHEN** a route is loaded with JavaScript disabled
- **THEN** the full content, header, footer and theme are present and readable
- **AND** links work as normal page navigations

#### Scenario: Client navigation
- **WHEN** JavaScript runs and a visitor follows an internal link without a cross-route fragment to content available in the client
- **THEN** the route changes without a full reload and focus moves to the new page heading

#### Scenario: Fragment in server-only prose
- **WHEN** a visitor follows an internal link with a fragment to a different pathname or query, including a destination with Static prose
- **THEN** the router uses native document navigation before changing history or rendering an empty destination
- **AND** the browser lands on the requested section from the complete prerendered document
- **AND** same-document fragment links keep their existing focus and scroll behavior

### Requirement: Performance budgets
Each route SHALL meet written budgets for initial JavaScript, CSS and fonts, and the build SHALL fail when a budget is exceeded.

#### Scenario: Budget breach
- **WHEN** a route's initial JavaScript exceeds the budget
- **THEN** the build fails and names the route and the size over budget

#### Scenario: Heavy features are lazy
- **WHEN** a route has a product demo or code highlighting
- **THEN** that code loads only when needed and is not in the initial bundle

### Requirement: Route transitions
Route changes SHALL use the View Transitions API with a CSS fallback, animating transform and opacity only, and SHALL show the final state immediately under reduced motion.

#### Scenario: Reduced motion
- **WHEN** the visitor prefers reduced motion
- **THEN** routes change with no animation and nothing is hidden or delayed

### Requirement: Shared site behavior
Every site SHALL provide the light and dark toggle at the far right of the header with the shared `ejm-theme` cookie on `.ejmlabs.com`, Cloudflare Web Analytics that respects Do Not Track, the shared security headers, and external links marked as external.

#### Scenario: Theme follows across sites
- **WHEN** a visitor picks dark on one ejmlabs site and opens another
- **THEN** the second site renders dark on first paint with no flash

#### Scenario: Calm explicit theme switch
- **WHEN** a visitor uses the theme control and motion is allowed
- **THEN** a supported browser crossfades between themes without delaying the preference change
- **AND** reduced motion, an unsupported API or a skipped transition leaves the chosen theme visible immediately
