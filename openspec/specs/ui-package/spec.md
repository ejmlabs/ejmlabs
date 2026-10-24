# UI Package Specification

## Purpose

Defines the `ejm-ui` repo: the single home of ejmlabs tokens, theme, components, hooks, layouts, views and art, and how sites consume it.

## Requirements

### Requirement: One design system repo
The `ejm-ui` repo SHALL contain packages for tokens, the Tailwind theme, components, hooks, layouts, views and art, plus a gallery site built with the same packages.

#### Scenario: Fresh checkout
- **WHEN** a developer clones `ejm-ui`, installs and runs the build
- **THEN** every package builds and the gallery site builds without manual steps
- **AND** the test and check commands pass

### Requirement: Single source for color and brand
Colors SHALL come from `theme.json` and brand tokens, and the Tailwind theme, CSS variables, Rust theme, Monaco themes and terminal schemes SHALL be generated from them, with a check that fails when a generated file is stale.

#### Scenario: Stale generated file
- **WHEN** `theme.json` changes and generated files are not rebuilt
- **THEN** the check command fails and names the stale file

### Requirement: Consumption by sites and apps
Sites and apps SHALL consume `ejm-ui` as versioned packages, and the repo SHALL document how each of ejmlabs.com, cli, ide and harness sites and the IDE app adopt it.

#### Scenario: Site adopts the system
- **WHEN** a site follows the adoption guide
- **THEN** it renders with the shared theme, header, theme toggle and footer without site-specific CSS for those parts

### Requirement: No outward actions
Creating a remote, pushing, publishing a package or deploying SHALL NOT happen as part of building the repo and SHALL require the owner's explicit approval.

#### Scenario: Local only
- **WHEN** the repo is created
- **THEN** it exists locally with committed history and no remote

### Requirement: Public site contracts own design and behavior
All active sites SHALL consume public ejm-ui package exports for visual
primitives, tokens, navigation, theme behavior, docs controls and product
playback. Sites SHALL keep authored content and product-specific link policy
local. Shared gaps SHALL be fixed in their owning package before adoption.

#### Scenario: Consumer design boundaries
- **WHEN** a site builds its styles and page components
- **THEN** it uses public package CSS and component exports without scanning
  private sibling source or copying shared interaction implementations

#### Scenario: Docs remain interactive
- **WHEN** prose is prerendered without hydration
- **THEN** navigation, contents, code-copy controls and code tabs still run
  through shared components, with no local control adapter

#### Scenario: Cross-route fragment in Static prose
- **WHEN** a shared site link names a fragment on a different pathname or query
- **THEN** the SSG router uses native document navigation before rendering the destination
- **AND** the complete prerendered document supplies the target section, without a consumer workaround
- **AND** same-document fragments and ordinary client navigation retain their existing behavior

### Requirement: Shared site design authority
ejm-ui SHALL own site typography, spacing, controls, branding, themes, motion, and reusable page composition. Consuming sites SHALL supply content, routes, product data, and semantic state through public shared contracts. They SHALL NOT define a second visual recipe.

#### Scenario: Change the shared design
- **WHEN** a shared site recipe changes and the four sites rebuild against it
- **THEN** each site uses the changed recipe without a consumer style edit

### Requirement: Site design enforcement
The shared site build SHALL reject consumer CSS rules, inline styles, local visual classes, and unsupported shared-component overrides. It SHALL name the source location and direct the author to the owning shared contract. The check SHALL run by default and consumers SHALL NOT disable it.

#### Scenario: Consumer attempts a local override
- **WHEN** a site adds a local stylesheet rule or a styled JSX element
- **THEN** its build fails with the file and reason before publication

#### Scenario: Static boundary remains available
- **WHEN** a site uses the shared Static boundary with its structural contents wrapper
- **THEN** the build accepts it while preserving static content and live shared controls

#### Scenario: CSS appears during development startup
- **WHEN** a local visual stylesheet is created while the development server starts
- **THEN** requests after startup reject it with its source location
- **AND** requests recover after the stylesheet is corrected

#### Scenario: Consumer omits or disables a legacy option
- **WHEN** a consumer omits the old opt-in option or passes its old false value
- **THEN** consumer visual overrides still fail the build

### Requirement: Shared motion policy
Site heroes SHALL use one shared entrance policy with no per-site motion switch. Heading and body content SHALL stay visible at first paint, and reduced motion SHALL show final states without travel.

#### Scenario: Open a product site
- **WHEN** CLI, IDE, or Harness loads with motion enabled
- **THEN** its hero uses the same shared entrance sequence

#### Scenario: Motion is reduced
- **WHEN** reduced motion is requested or scripts are unavailable
- **THEN** all content remains readable and no script is required to reveal it

### Requirement: Shared composition coverage
Shared components SHALL cover the active sites' section rhythm, content columns, metrics, actions, text, branding, footer identity, asset previews, and product playback presentation. Missing patterns SHALL be added to ejm-ui before consumer adoption.

#### Scenario: A site needs another pattern
- **WHEN** content requires a pattern absent from the shared library
- **THEN** the pattern is implemented and checked in its shared owner and consumed through a public export

### Requirement: Uniformity preserves site contracts
Design consolidation SHALL preserve route content, heading semantics, keyboard use, static navigation, no-script content, theme behavior, and existing asset budgets. Local verification SHALL NOT imply deployment.

#### Scenario: Check a consolidated site
- **WHEN** the site builds and its normal checks run
- **THEN** its routes and shared controls work within the existing byte limits without a site-specific visual exception

### Requirement: Product playback contains scrolling
Shared IDE playback SHALL keep its workspace within the playback frame through loading, playback, completion, and restart. Vertical scrolling SHALL stay inside editor and chat regions. Narrow screens SHALL retain horizontal access to the complete workspace.

#### Scenario: Scroll a completed example
- **WHEN** a visitor scrolls the IDE example after playback completes
- **THEN** the workspace stays within its frame without exposing blank space below it
- **AND** editor and chat regions retain their own scrolling

#### Scenario: Restart on a narrow screen
- **WHEN** a visitor restarts IDE playback on a narrow screen
- **THEN** the workspace keeps the frame height and remains accessible horizontally

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

### Requirement: Controller presentation follows connection state
Shared controller presentation SHALL show connection and approval tasks before the live workspace. Session output and action controls SHALL appear after authenticated session data arrives. A later connection loss SHALL retain the session and uncertain-action feedback while showing recovery. Setup errors and focus targets SHALL remain reachable. Shared presentation SHALL preserve trust, host permissions, bounded scrolling and existing byte limits.

#### Scenario: First connection
- **WHEN** a visitor has not received authenticated session data
- **THEN** the page shows the invitation or host-approval task as its main content
- **AND** the unused workspace occupies no space and has no keyboard stops
- **AND** the browser trust disclosure and acknowledgment remain part of pairing

#### Scenario: Host allows the session
- **WHEN** the first authenticated session snapshot arrives
- **THEN** the page reveals its full-width output and permission-aware action controls
- **AND** connection details remain available without dominating the workspace
- **AND** focus moves to a visible session target once, without following streaming updates

#### Scenario: Connection fails or is lost
- **WHEN** setup fails or a displayed session loses transport
- **THEN** feedback and recovery controls remain visible and keyboard reachable
- **AND** a displayed transcript and uncertain-action feedback remain available
- **AND** reconnect does not resend an uncertain mutation or repeatedly move focus

#### Scenario: Visitor clears the connection
- **WHEN** the visitor explicitly disconnects and clears the session
- **THEN** the page restores the connection task with a visible focus target
- **AND** the old workspace and tab-only session material are cleared

### Requirement: Visible copy earns its place
Shared design guidance SHALL use the fewest words that preserve meaning. It SHALL prefer a clear visual or omit redundant content, retain text needed for accessible names, decisions, consent, errors and recovery, and keep detail available when needed. Project instructions and relevant UI/site skills SHALL apply this rule.

#### Scenario: A visual or existing context explains the task
- **WHEN** a visual or existing context conveys the same meaning clearly
- **THEN** the interface omits redundant explanatory copy
- **AND** controls retain clear names and keyboard and assistive access

#### Scenario: Brevity would hide needed meaning
- **WHEN** removing text would obscure an action, status, risk, consent or recovery
- **THEN** the interface keeps the shortest clear explanation
- **AND** supporting detail remains available at the point where it is needed

### Requirement: Native registry design parity
Extension registry pages SHALL use the public native ejm-ui profile for layout, theme, fonts, forms and controls. Build checks SHALL reject authored local visual recipes and raw HTML injection while preserving ordinary form and API behavior.

#### Scenario: Registry assets are built
- **WHEN** the registry builds
- **THEN** its shared stylesheet, fonts and project mark are served from its own origin
- **AND** authored pages pass the shared native design check

### Requirement: Recorded Harness output remains traceable
Harness playback SHALL show useful recorded work in its terminal presentation. Any formatted figures SHALL derive from retained raw recording fields. Nearby disclosure SHALL identify the local recording and distinguish admission reservations from measured process use.

#### Scenario: A visitor watches the recorded workflow
- **WHEN** Harness playback shows running, queued and completed work
- **THEN** its values match the retained recording
- **AND** the page does not claim a worker or model runs in the browser
