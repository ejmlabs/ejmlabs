# Spec Delta

## Purpose

Defines the containerless layout language that replaces cards, panels and tonal boxes across ejmlabs sites, applications and the terminal guide, and the gate that keeps containers from returning.

## ADDED Requirements

### Requirement: No container classes
The kit SHALL NOT define or document classes whose purpose is to group content in a filled, bordered or shadowed box (cards, panels, tiles, tonal boxes, hero panels). Controls such as buttons, tags, inputs and the theme toggle remain.

#### Scenario: Removed class used
- **WHEN** a page or stylesheet uses a removed container class
- **THEN** the kit check fails and names the class

#### Scenario: Pages migrate
- **WHEN** a kit page or the ejmlabs.com home is built
- **THEN** it contains no removed container class

### Requirement: Structure without boxes
Content SHALL be grouped by display type, whitespace, hairline rows and full-bleed tonal bands. Hairlines are 1px and used only between rows of related content.

#### Scenario: Project list
- **WHEN** three projects are listed
- **THEN** each is a row or column on the page ground separated by space and hairlines
- **AND** none sits in a filled or bordered box

### Requirement: Full-bleed tonal bands
Sections MAY change the page tone with a full-width band in Paper, Mist, Sage or Ink. Sage SHALL lead as page tone across the page, and Forest SHALL stay under 10 percent of it.

#### Scenario: Sage leads
- **WHEN** a page is rendered
- **THEN** Sage covers about 30 percent of it as full-width bands, not as a rounded slab inside the page

### Requirement: Type-led hero
The hero SHALL be set on the page ground with display type and floating product windows, with no enclosing panel.

#### Scenario: Hero at ultrawide
- **WHEN** the hero is viewed at 3440px
- **THEN** display type and product windows scale up with the column and no rounded slab appears
