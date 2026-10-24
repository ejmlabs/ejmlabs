# Spec Delta

## Purpose

Defines ejmlabs.com on the ejm-ui design system: its routes, the voice of its copy, the shared site behaviour, its byte budgets and its downloads.

## ADDED Requirements

### Requirement: Routes
The site SHALL serve `/`, `/projects/`, `/try/`, `/about/`, `/brand/` and `/privacy/` as prerendered HTML, each with one `h1`, a title, a description and a canonical URL, plus a `404.html` marked `noindex`.

#### Scenario: Every route is complete without scripts
- **WHEN** a route is loaded with JavaScript disabled
- **THEN** its header, content and footer are present and the links work as page navigations

#### Scenario: Unknown path
- **WHEN** a visitor requests a path that does not exist
- **THEN** the Worker serves the 404 page

### Requirement: Voice of the copy
Copy SHALL address users and contributors of public open source projects, describe the work and ways to participate, and keep release limits clear without internal review language. This applies to every public route, metadata description, capture caption and linked guide. It SHALL allow future projects outside AI, avoid personal team-size framing and invented sales or adoption claims, and contain no em dashes.

#### Scenario: Built text is checked
- **WHEN** the tests read the built text of every route
- **THEN** no one-person lab description, invented sales claim or em dash is found

#### Scenario: Current work leaves room for future projects
- **WHEN** a visitor reads the home and About pages
- **THEN** CLI, IDE and harness are presented as current MIT-licensed projects, and ejmlabs is not limited to AI or coding tools

### Requirement: Accurate project content
The projects page SHALL state each project's status, license and platforms as its README does, without claiming installers, registry releases or acceptance that the README says are pending.

The site SHALL retain the owner's chosen GitHub destinations and explain that public repository access is coming soon until the owner opens those repositories.

#### Scenario: Status is stated plainly
- **WHEN** a reader opens `/projects/`
- **THEN** ejm-cli is described as built from source, ejm-ide as early development with native support still being tested and no signed installers, and ejm-harness as available from source with no registry packages

### Requirement: Home page
The home page SHALL lead with display type, public project copy and direct actions, SHALL NOT show project previews or simulated product windows, SHALL list ejm-cli, ejm-ide and ejm-harness as external rows to their own sites, use a Sage band, and end with the Ink footer.

#### Scenario: No imitation on the home page
- **WHEN** the home page is parsed
- **THEN** it contains no simulated product window

#### Scenario: Project rows
- **WHEN** the home page is parsed
- **THEN** the three project links point to cli, ide and harness on ejmlabs.com and carry `rel="external"`

#### Scenario: Project marks beside names
- **WHEN** a visitor reads Current projects at phone or desktop widths in either page theme
- **THEN** each name has its approved mark beside it with clear contrast on Sage, reserved dimensions and one accessible project link without a duplicate image label

### Requirement: Text-led home hero
The home hero SHALL show its shared heading, copy and actions without a project preview slideshow, carousel controls, image preloads or rotation code. The project list SHALL remain available with or without scripts.

#### Scenario: Main site without previews
- **WHEN** a visitor opens the home page in either theme
- **THEN** its heading and project links are present, and there is no product capture slideshow, carousel control or image preload

### Requirement: Logo beside the name
The header SHALL show the approved ejmlabs logo beside the ejmlabs name in light and dark themes, within one accessible home link.

#### Scenario: Header identity
- **WHEN** a visitor opens any route
- **THEN** the mark and name are visible together and assistive technology announces one home link

### Requirement: Demos on the try page
The try page SHALL offer the ejm-cli, ejm-ide and ejm-harness demos as static views that load their interactive code only when the visitor has scrolled near them or uses them. They SHALL follow the real product's current layout and supported interactions, without demo-only toolbars, prompt chips, invented dashboards or window chrome. Page copy SHALL disclose that the views use scripted sample data and make no model calls.

#### Scenario: First load
- **WHEN** `/try/` loads on a phone
- **THEN** no demo code is requested until a demo nears the viewport or is used

#### Scenario: Product interface remains authentic
- **WHEN** a visitor uses a demo
- **THEN** controls and layout match the current product, and simulation disclosure appears in page copy rather than extra product chrome

### Requirement: Quiet company details
The About page SHALL include a small Company details section naming the owner-confirmed legal entity, `ejmlabs, llc`. It SHALL NOT claim a jurisdiction, entity number, current registration status or public registry link unless verified.

#### Scenario: Company identity
- **WHEN** a visitor reads the end of About
- **THEN** the legal entity is stated without a promotional badge or a new Terms agreement

### Requirement: Shared site behaviour
Every route SHALL have the skip link first, the theme toggle last in the header, the `ejm-theme` cookie on `.ejmlabs.com`, Cloudflare Web Analytics that is absent on localhost and off for Do Not Track and Global Privacy Control, external links marked `rel="external"`, and the `_headers` file generated by `@ejm/site`.

#### Scenario: Theme follows across hosts
- **WHEN** a visitor picks dark on `ejmlabs.com` and opens `cli.ejmlabs.com`
- **THEN** the second host renders dark on first paint

#### Scenario: Analytics off locally
- **WHEN** the site is served from localhost
- **THEN** the prerendered HTML and the running page contain no analytics beacon

### Requirement: Budgets and performance
Every route SHALL stay within JavaScript 95, CSS 14, fonts 70 and HTML 30 KB gzip, and a throttled mobile load SHALL have Largest Contentful Paint at or under 1.2 seconds and Cumulative Layout Shift under 0.05. Budgets SHALL NOT be raised to pass.

#### Scenario: Budget breach
- **WHEN** a route exceeds a budget
- **THEN** the build fails and names the route and the overage

### Requirement: Brand downloads
The Brand page SHALL provide a public guide to choosing and using approved assets and link `ejmlabs-design-kit.zip` and `ejmlabs-swag-kit.zip`, both built into `dist`. Downloads SHALL contain public assets, usage guidance and existing rights notices, without internal implementation playbooks, generators, audit notes or image-generation prompts. The asset folders that other sites link to SHALL stay online.

#### Scenario: Downloads work
- **WHEN** the build finishes
- **THEN** both ZIP files exist in `dist`, begin with the ZIP signature and are linked from `/brand/`

#### Scenario: Kit is for public use
- **WHEN** a visitor opens a downloaded kit
- **THEN** a short public guide explains the included assets and rights, and internal implementation and generation material is absent

### Requirement: Readable About headings
About row headings SHALL remain readable from 320px to 5120px without breaking ordinary words into isolated trailing letters.

#### Scenario: Contribution heading
- **WHEN** About is viewed at phone and narrow desktop widths
- **THEN** the contribution heading wraps between words and retains a clear size hierarchy

### Requirement: Calm motion
Page navigation, theme switches and control feedback SHALL use calm transitions with no new motion dependency. Reduced motion SHALL suppress nonessential movement and initial content SHALL remain visible without delayed text or image fades.

#### Scenario: Theme change
- **WHEN** a visitor changes theme
- **THEN** a supported browser crossfades to the selected theme, while reduced motion or an unsupported browser changes theme immediately

### Requirement: Verified website publication
After owner-authorized publication the site SHALL serve the checked build from its canonical HTTPS host, including all public routes, downloads, referenced assets and shared security headers.

#### Scenario: Published build
- **WHEN** the completed build is deployed
- **THEN** live HTTPS checks confirm every route, both ZIPs, referenced assets and response headers, and record the deployment identity
