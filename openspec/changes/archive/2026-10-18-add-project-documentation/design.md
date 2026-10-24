# Design

## Context

The studio site is static HTML built with the shared design kit. Each project has a separate static site and repository. The active `raise-visual-bar` change supplies the docs layout and script.

## Goals / Non-Goals

**Goals:** Make both guide audiences visible from the studio site. Review the three project sites together while preserving each repository's ownership.

**Non-Goals:** Change application code or replace existing reference manuals.

## Decisions

- Use one documentation band with three columns. Each column names a project and links directly to its user and developer guides. This avoids a separate studio docs page.
- Use `/docs/`, `/docs/user-guide/`, and `/docs/developer-guide/` on each project domain. Stable routes make cross-site discovery predictable.
- Build guides from the shared documentation shell and script. The existing theme, responsive controls, copy buttons, and heading links cover the required interactions.
- Keep project content and build changes in their own OpenSpec changes. The studio change owns discovery and records the integrated review.
- Use the kit's checkers plus browser review. A one-time link check covers all six domain and audience combinations.

## Risks / Trade-offs

- Project source is under active development. Check examples and feature claims against current source and retain links to deep references.
- Existing uncommitted work can fail broad gates. Run required gates, record exact failures, and keep fixes scoped to documentation.
- The studio links will become live before their targets if deployments occur out of order. Publish project docs before the studio update.

## Migration Plan

Build and review all sites locally. The request to put the documentation on each project's site authorizes publication. Record the current Worker versions, validate each deployment, then publish project sites before the studio site. Verify the live routes and security headers. A rollback restores the previous site version without application or data changes.
