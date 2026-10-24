# Design

## Context

See proposal.md for the observed UX failure. The native controller always renders its sidebar, transcript and composer. The shared workspace reserves a desktop sidebar and viewport height even while every session action is disabled.

The controller already has the needed state. Noise completion enters a waiting-for-host phase and requests a snapshot. Only the authenticated snapshot establishes sessionId. That value survives a transport drop, allowing the interface to retain the session without another state store.

## Goals / Non-Goals

Goals: make the next task clear, preserve safe recovery and expose useful session content at full width. Keep the existing brand and control language, native semantics, shared motion and unchanged resource budgets.

Non-goals: transport or crypto changes, account workflow changes, new host permissions, persistent pairing, automatic mutation retry, native CLI changes, publication or a new design system.

## Decisions

### Shared layout, consumer state

ejm-ui owns two fixed native recipes: setup and workspace-header. Setup is a readable connection/approval column with fixed application heading sizes. The workspace header is compact and keeps connection metadata available through a native disclosure. The existing workspace becomes one column; session loses its side border and outer scroll, while transcript scrolling stays bounded. Other native pages and React recipes remain unchanged.

The shared owner also admits these names through @ejm/site/native and documents their use. The consumer supplies content and existing semantic state. No local CSS, styling override, variant or shared protocol/state engine is added. Reusing the old two-column layout was rejected because it preserves the empty reserved area that caused the problem.

### Present the current task

The initial document contains the usable setup and a hidden session workspace, preventing an empty-workspace flash during script startup. Setup progresses to visible host verification/approval guidance after a valid invitation. Keep the full browser trust disclosure and required acknowledgment before the pairing submission.

Reveal the workspace only when an authenticated snapshot first supplies a session. At that point, connection details become secondary. The first live render gets one deliberate visible focus target. Streaming updates do not move focus.

A later transport loss retains session content and pending outcome feedback. Disable actions according to the existing grants and connection checks, and retain explicit reconnect. A deliberate disconnect-and-clear restores setup and a visible focus target using existing cleanup. Do not clear retained state merely to simplify presentation.

### Useful status and recovery

Keep setup errors outside any hidden region. Invalid invitations focus the invitation field; engine and transport failures give a visible appropriate recovery target. Replace ordinary internal engine-ready chatter with concise task guidance. Keep internal initialization failure handling. Update the skip target to the visible task. Host fingerprints, access, expiry and trust limits remain available without duplicate IDs or stale copies.

### Minimal copy is a shared rule

Use the fewest words that preserve meaning. Prefer a clear visual or omit content when context already explains it. Keep text needed to name an action, distinguish state, explain trust or consent, or recover from failure. Accessible names remain required even when a familiar visual needs no visible label. Keep detail available when useful, rather than filling the first view with it. Do not use a word-count gate or replace clear labels with ambiguous icons.

ejm-ui quality guidance owns this rule. The shared UI design skill and root project instructions make it discoverable; existing product design/site/theme skills apply it through public shared contracts. Update only relevant skills, not unrelated backend or OpenSpec workflows. Preserve complete operational documentation and current legal/security facts. The Relay correction is the immediate application; wider interface rewrites remain outside this task.

Keep the gallery's public Checks page aligned with the quality rule and verify that affected guide through its existing build and route test.

### Dependencies and budgets

Use current platform DOM APIs, existing native details/forms and shared packages. No new package is needed. Preserve the 14 KiB native CSS, 70 KiB fonts, 23,062-byte controller JS, 1.5 MiB production WASM and existing Worker growth limits. Measure the exact final build and document any footprint cost; no performance improvement is assumed.

## Risks / Trade-offs

- A socket opening can look like approval: reveal only on the authenticated snapshot hook.
- Hidden feedback can strand setup: put shared status outside conditional sections and test invalid input and authentication failures.
- Re-rendering can steal focus or resend a prompt: use one-shot stage focus and preserve reconnect/unknown-outcome behavior.
- A fixed desktop viewport can clip short screens: use natural phone/short-screen flow and bound the transcript, not the whole page.
- Other tasks are editing the same repositories: snapshot touched files and staged diffs, assign shared and consumer files separately, and preserve unrelated changes.

## Migration Plan

Apply shared recipes and the guard allowlist first, then adopt the controller markup and bounded presentation hooks. Extend the existing idle/interface and native-host browser fixtures rather than create a simulated product demo. Run owner checks, focused controller checks, exact builds and budgets. Inspect setup and connected/recovery states on desktop and phone, fix the batched findings, then confirm once. Update shared and public product docs with local verification limits. Sync this delta and archive only after required checks pass. No deployment is part of this correction.
