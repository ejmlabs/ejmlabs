# Spec Delta

## MODIFIED Requirements

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

## ADDED Requirements

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
