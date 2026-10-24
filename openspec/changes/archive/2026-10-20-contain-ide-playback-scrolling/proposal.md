# Proposal

## Why

The IDE example can scroll its whole workspace vertically and expose blank
space below it. Fix the shared viewport before committing and publishing the
unified site design.

## What Changes

- Keep the outer IDE example at the shared playback frame height through
  fallback, playback, completion, and restart.
- Keep vertical scrolling inside editor and chat regions. Preserve horizontal
  access to the complete workspace on narrow screens.
- Add a focused regression check and verify the real browser result.
- Repair the missing object-fit group in the existing shared Tailwind merge
  generator, exposed by the new public logo recipe during the release checks.
- Close a startup race in the shared design guard so CSS created during Vite's
  initial watcher crawl is checked when the watcher becomes ready.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `ui-package`: Shared product playback must contain its viewport and keep
  scrolling within the relevant product region.

## Impact

Owner: ejm-ui, through the public @ejm/demos IDE view, playback, and styles,
@ejm/ui recipe configuration, and @ejm/site development guard.
Studio and IDE consume that contract without local styles. CLI and Harness
keep the same frame contract. Dependencies remain from sites into ejm-ui.
No product runtime, model calls, credentials, release APIs, or new package
dependencies are involved. Existing asset limits remain in force.
