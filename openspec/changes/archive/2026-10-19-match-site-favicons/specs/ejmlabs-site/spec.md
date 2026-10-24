# Spec Delta

## ADDED Requirements

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
