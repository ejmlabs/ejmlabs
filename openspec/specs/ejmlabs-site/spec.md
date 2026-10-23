# ejmlabs-site Specification

## Purpose

Defines ejmlabs.com on the ejm-ui design system: its routes, the voice of its copy, the shared site behaviour, its byte budgets and its downloads.

## Requirements

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

The site SHALL retain the owner's chosen GitHub destinations and describe source availability per project at the setup and source entry points. A repository that is public SHALL NOT be labelled as awaiting public access.

#### Scenario: Status is stated plainly
- **WHEN** a reader opens `/projects/`
- **THEN** CLI, IDE and Harness have public source links and accurate build and release limits
- **AND** no supported installer or registry release is claimed before it exists

#### Scenario: A public visitor cannot build yet
- **WHEN** a project requires source access that a public visitor does not have
- **THEN** the project facts state that specific limit before setup and source actions and offer the available browser example without claiming a native run

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
The try page SHALL show CLI, IDE and harness completing useful work in passive autoplay sessions. Each SHALL use the same responsive frame, native product layout and reserved dimensions. Example-session disclosure SHALL appear in page copy, without internal demo language or real model and tool calls from the browser.

#### Scenario: First load
- **WHEN** `/try/` loads on a phone
- **THEN** each example has meaningful static content and stable dimensions, and its playback code loads only as it approaches view

#### Scenario: Product interface remains authentic
- **WHEN** a visitor watches an example
- **THEN** its layout matches the current product, its native controls are passive, and the page adds no prompt chips, invented dashboard or window chrome

#### Scenario: Work reaches a useful result
- **WHEN** the three examples finish
- **THEN** CLI has read and fixed code with recorded local tests and a diff, IDE has made automatically reviewed edits with visible tool results, and harness has shown real recorded tool events, queued work and retained history

#### Scenario: Equal responsive viewports
- **WHEN** the page is viewed on a phone or desktop in either theme
- **THEN** all three frames have the same width and height for that viewport, use the native product colors for the active site theme, retain readable content and cause no horizontal page overflow or layout shift when playback loads

### Requirement: Showcase playback
Each example SHALL start on entering view without prior input, run once and retain its useful final state. Only Pause, Resume and Restart SHALL control it. Playback SHALL stop while offscreen or the document is hidden, preserve a manual pause, respect reduced motion and cancel pending work on restart or removal.

#### Scenario: Playback without interaction
- **WHEN** a ready example enters view
- **THEN** it starts without a click, scroll prerequisite or keyboard input and ends without looping

#### Scenario: Pause and restart
- **WHEN** a visitor pauses or restarts an example
- **THEN** pause freezes both output and future steps, resume continues from that point, and restart begins one clean run without output from an earlier run

#### Scenario: Visibility and disposal
- **WHEN** the example leaves view, its document becomes hidden or it is removed
- **THEN** no background progression continues, returning to view does not override a manual pause, and removal leaves no pending playback work

#### Scenario: Reduced motion
- **WHEN** reduced motion is active before or during playback
- **THEN** the example shows a useful completed state without automatic typing or movement

#### Scenario: Accessible passive playback
- **WHEN** a visitor navigates an example by keyboard or assistive technology
- **THEN** only the playback controls are active, the visible example remains readable, no focus is stolen during loading and streamed text is not repeatedly announced

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

### Requirement: Project detail marks
The Projects page SHALL show each approved project mark beside its heading. Marks SHALL remain legible on their band in either page theme, reserve their dimensions and avoid repeating the heading to assistive technology. The names and marks SHALL be present without scripts and remain readable at phone and desktop widths.

#### Scenario: Project identity in both themes
- **WHEN** a visitor opens `/projects/` in Light or Dark
- **THEN** the CLI, IDE and harness headings each show the matching approved mark with clear contrast and no duplicate accessible label

#### Scenario: Static and responsive headings
- **WHEN** the page is viewed with scripts disabled or at phone and desktop widths
- **THEN** each mark remains beside its project name without clipping or horizontal page overflow

### Requirement: Browser identity

The studio site SHALL use its current ejmlabs symbol in Ink on Sage for SVG and ICO favicons, touch icons and install icons. Every route SHALL use shared icon delivery that changes each referenced icon or manifest URL when its content changes. Existing direct asset URLs and public brand downloads SHALL remain available and use the current artwork.

#### Scenario: Recognize the studio tab

- **WHEN** a visitor opens any studio route or saves its shortcut
- **THEN** the icon shows the same symbol as the page logo, in the Sage and Ink treatment used by the current product browser icons

#### Scenario: Update an older browser choice

- **WHEN** a browser icon or install icon changes and the site is rebuilt
- **THEN** the route's icon or manifest links and the manifest's changed icon references use fresh content versions

#### Scenario: Reuse published assets

- **WHEN** a visitor opens a retained favicon URL or the public brand download
- **THEN** it contains the current studio browser artwork and the three current product icon families

### Requirement: Concise project discovery
The home and Projects pages SHALL make current projects and their next steps easy to find without repeated invitations or descriptions. About SHALL retain quiet company identity and room for future projects outside AI. Try SHALL place one clear disclosure beside each playback rather than repeat it in introductory copy.

#### Scenario: A visitor chooses a project
- **WHEN** a visitor opens Home or Projects
- **THEN** approved project marks and direct project entry points are visible
- **AND** supporting guides and contribution links are grouped by intent

#### Scenario: A visitor watches an example
- **WHEN** a playback appears on Try
- **THEN** one nearby note states its recorded or simulated nature and that no live model or worker runs there
