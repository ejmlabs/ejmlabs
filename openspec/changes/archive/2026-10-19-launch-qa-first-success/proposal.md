# Proposal

## Why

Studio visitors encounter inconsistent source availability and a shared IDE example that hides the edit on phones. The launch QA pass needs source-backed fixes and repeatable first-visit browser evidence.

## What Changes

- State source access per project, retain exact repository URLs, offer available browser examples before blocked native setup, and document the five-persona QA evidence.
- Apply confirmed findings from five distinct first-time personas in one bounded pass, then repeat their journeys.
- Keep public repository visibility, releases and deployments behind the existing owner authorization. Browser examples do not prove native installation.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `ejmlabs-site`: first-visit actions and release information must match current access, with a reachable browser success path and clear privacy navigation.

## Impact

Owner: `ejmlabs`. Scoped source: site/src/content.ts, site/src/pages/Projects.tsx, site/src/stages/HomeContent.tsx, site/src/shell.tsx and site/README.md. Shared components, demos, routing and build infrastructure remain owned by `ejm-ui` and consumed through public `@ejm/*` exports. Products continue consuming public harness contracts; there are no runtime, auth or dependency-direction changes.

The shared UI pass repairs phone demo visibility, passive-demo instructions, slow-load interaction readiness, navigation recovery and the gallery CSS gate. It has no OpenSpec root and will not be initialized. Each affected product retains its own local OpenSpec change. Existing work is preserved.

No new production dependency, service or package is planned. Preserve each site's existing budgets without increases: the studio, CLI, harness and gallery use JavaScript 95 KiB and CSS 14 KiB gzip; the IDE retains its documented JavaScript 110 KiB and CSS 15.5 KiB exceptions. Fonts remain 70 KiB raw and HTML 30 KiB gzip. The JavaScript gate counts initial linked scripts and excludes dynamic imports. Verify owner types, builds and affected site checks, then rerun all five personas. Product native/provider behavior is outside the evidence from browser checks.
