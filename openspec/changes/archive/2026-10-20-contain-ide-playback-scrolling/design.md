# Design

## Context

See proposal.md for the user-visible defect. The public IDE view has an outer
horizontal viewport and inner editor and messages regions. The autoplay frame
sets a responsive aspect ratio. Idle and running paths currently have different
wrapper chains, while the outer viewport allows both scroll axes.

## Goals / Non-Goals

Keep the workspace height stable and contain overflow through its lifecycle.
Keep native code and chat scrolling and narrow-screen horizontal navigation.
Do not change product runtime, transcript content, controls, or the shared
aspect ratio.

## Decisions

Use the existing CSS sizing and overflow contracts in @ejm/demos. Complete the
height chain for both render paths and prevent vertical scrolling on the outer
workspace viewport. Keep overflow in the existing editor and chat regions.
This needs no dependency, timer, observer, or browser measurement work.

The full shared check also found that the new BrandAsset recipe uses
object-contain, but the compact Tailwind merge configuration omits the
maintained package's object-fit group. Add that existing group to the generator
and regenerate its output. Use the existing exhaustive recipe coverage and
bundle check. Preserve unrelated class-merging work and keep all asset budgets.

The release check reproduced a guard startup race: Vite can suppress an add
event while its watcher crawls with ignoreInitial enabled. Revalidate once on
the watcher's ready event through the existing validator and error path, and
remove that listener on close. Retain normal event invalidation. Use a
deterministic lifecycle check and the existing real-watcher integration check.
This adds no polling, timers, per-request scan, or browser work.

A consumer override would break shared ownership. A fixed pixel canvas height
would break the responsive frame. Both are rejected.

## Risks / Trade-offs

- A changed overflow rule could block phone access. Check horizontal keyboard
  navigation at phone width and preserve the viewport's accessible label.
- DOM tests do not calculate CSS layout. Use a focused contract test plus
  browser measurements before and after playback, restart, and scrolling.

## Migration Plan

Check the shared owner and rebuild the affected sites under existing budgets.
Confirm the current 1035-pixel browser view and phone width. Include the fix in
the requested shared and site commits before publishing. Roll back through the
prior immutable site deployment if live verification finds a regression.
