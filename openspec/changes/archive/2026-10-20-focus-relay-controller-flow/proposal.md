# Proposal

## Why

Relay currently squeezes pairing into a sidebar while an empty transcript and disabled composer fill the page. The interface shows later tasks before the visitor has connected, obscuring the next step.

## What Changes

- Show a focused connection form first, followed by host verification and approval guidance.
- Reveal the session workspace after the first authenticated host snapshot. Keep the last session visible during a later connection loss, with clear recovery controls.
- Give live output the full workspace width and keep connection details compact and available.
- Replace internal startup chatter with task-specific status and recovery guidance. Preserve the visible browser trust disclosure and acknowledgment.
- Keep every visual recipe in public ejm-ui native contracts and update affected contributor and user guidance.
- Make minimal, clear copy a shared design rule and carry it into project instructions and relevant UI/site skills across the project family.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `ui-package`: Add shared controller stages and a minimal-copy contract that preserves meaning, accessibility and safe recovery.

## Impact

ejm-ui owns the native workspace, application typography, spacing and disclosure presentation through @ejm/ui/static.css, documented by @ejm/site/native. ejm-cli/relay owns controller content and bounded view state derived from existing pairing and authenticated snapshot hooks. Dependency direction remains consumer to public shared packages.

Affected sources are the shared native stylesheet and guidance, Relay controller HTML and presentation hooks, focused browser tests, relay README and public relay-web reference. Existing transport, cryptography, account routes, privacy forms, host grants and uncertain-action rules stay intact. No dependency, persistent browser state, relaxed byte limit, commit or deployment is required.

The shared rule belongs in ejm-ui quality and contributor guidance. Root AGENTS.md files and relevant design/site/theme skills in the studio, shared UI, CLI, IDE and harness carry it through their existing public package boundaries. This is guidance and current Relay composition, not a claim that every existing surface has been audited.
