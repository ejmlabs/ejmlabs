# Design

## Context

The shared gate compares outcomes from independent runs at the same revision.

## Goals / Non-Goals

Expose the existing test outcomes without retries or production changes.

## Decisions

Use Node's built-in JUnit reporter alongside its standard reporter when requested. The build remains a prerequisite for the tests.

## Risks / Trade-offs

Reports can include failure messages. The shared gate must sanitize and bound them before retaining evidence.
