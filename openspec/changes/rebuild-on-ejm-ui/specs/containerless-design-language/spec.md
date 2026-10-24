# Spec Delta

## Purpose

Defines the ejmlabs visual language: containerless editorial layout, display typography, a type-led hero with floating product windows, depth, symbol art and motion, in the brand palette and fonts only.

## ADDED Requirements

### Requirement: No containers
The system SHALL NOT provide cards, panels, tiles, rounded tonal boxes or a hero slab. Content SHALL be grouped by display type, whitespace, 1px hairline rows and full-bleed tonal bands. Buttons, inputs, tags and the theme toggle keep their control shapes.

#### Scenario: Project list
- **WHEN** three projects are listed
- **THEN** each is a row on the page ground separated by space and hairlines, with no filled or bordered box

### Requirement: Tonal bands and color balance
Pages SHALL use full-width bands in Paper, Mist, Sage and Ink. Sage SHALL lead at about 30 percent of a page, Paper and Mist about 60 percent, and Forest SHALL stay under 10 percent and never set a large ground.

#### Scenario: Sage text contrast
- **WHEN** text sits on a Sage band
- **THEN** it is Ink at 4.5:1 or better

### Requirement: Display typography
Type SHALL use only Manrope and IBM Plex Mono, with a fluid display tier up to about 140px, balanced heading wrapping, tabular numerals and mono metadata rows, and body text of 16px or more.

#### Scenario: Display scale
- **WHEN** the home hero is viewed at 375px and at 3440px
- **THEN** the display heading is within its fluid range at both and does not wrap with a single orphan word

### Requirement: Type-led hero with floating product windows
The hero SHALL sit on the page ground with display type and one to three floating real product shots (terminal, IDE, engine) at defined elevation, with a staged entrance under 1.2 seconds using transform and opacity only.

#### Scenario: Windows are honest
- **WHEN** a product window shows output
- **THEN** every command and tool name matches the product's README
- **AND** product imagery is a real capture of the product, with a caption, and a window that is not a real capture is never used as product imagery

### Requirement: Depth is reserved
Three elevation levels (rest, raised, float) SHALL be used only by product windows, menus and overlays.

#### Scenario: No other shadows
- **WHEN** any non-window, non-overlay element is rendered
- **THEN** it has no drop shadow

### Requirement: Symbol art and motion
Illustration SHALL be generated from the symbol with brand colors only, with draw-on motion that plays once and shows the final state immediately without scripts or under reduced motion. Page motion SHALL be CSS and Web Animations on transform and opacity.

#### Scenario: Art palette
- **WHEN** the art check runs
- **THEN** every color in every generated file is a brand color or a brand color at reduced opacity
