# Design

## Context

See proposal.md for the request. The existing project kit already outlines curved ribbons with `projects/tools/ribbons.mjs`, shapes names with HarfBuzz, renders PNGs with librsvg and packages ICOs with Pillow. Existing comparison boards have three fixed columns and historical CLI, IDE and Harness candidates. The active `refresh-project-logos` change still has adoption work, so those files must remain intact.

## Goals / Non-Goals

**Goals:** a complete local Relay identity and review package with no new dependency, reusable geometry and a narrow export path.

**Non-Goals:** changes to shared tokens or components, a rebuild of the existing family, alteration of the tested relay source, new account/auth behavior or publication. The current local app preview uses an isolated synthetic account and the reviewed 900-second host.

## Decisions

1. **Flowing handoff mark.** Use two staggered curved ribbons around an open diagonal channel, round terminals and a long outer taper. Reuse the established 36-unit ribbon, 22.7-unit gap and 256-unit box. Lowercase `relay` uses Manrope 600. A generic chain or padlock would lose the family grammar and imply a broader security promise.
2. **Targeted generation.** Add an explicit Relay selection to the existing exporter. Its default project set and existing comparison assets remain unchanged. Relay gets a self-contained preview inside its own folder. Do not duplicate font outlining, rendering, ICO encoding or the ribbon engine.
3. **Full asset set.** Supply Sage/Ink/Paper marks, primary/Ink/Paper outlined and editable logos, Sage/Forest icons, PNG counterparts, SVG and ICO favicons, 16/24/32/48 exports, touch/install icons, manifest and social card. Production SVGs contain no live font text, scripts or external references. Define a mark SVG budget of 8 KiB, outlined logo budget of 24 KiB and full Relay folder budget of 1 MiB.
4. **Bounded verification.** Export twice into separate empty temporary outputs and compare inventories. Use the existing geometric/raster checks for gaps and component separation at 16, 24 and 32 px, inspect one combined light/dark board, then make at most one correction batch if a concrete defect is found. Do not repeat the relay test/build matrix for standalone artwork.
5. **Ownership and release.** The local brand guide links the Relay package and records actual measurements. Shared asset adoption belongs to a later `ejm-ui` protected change through the public `@ejm/tokens/assets/*` export, followed by the CLI consumer. This keeps dependency direction unchanged. Public product documentation and deployed identity must be updated when that adoption releases; this local package makes no publication claim.

## Risks / Trade-offs

- Fine ribbons can merge at 16 px: use the existing enlarged favicon cut, check actual raster samples and simplify only if a measured gap closes.
- Relay can resemble the existing bracket or spiral: compare all four silhouettes in one color on the same board.
- A full generator run could overwrite concurrent work: use explicit Relay selection and isolated output, then copy only its folder.
- A local screen preview can be mistaken for live control: identify the synthetic account, 15-minute lifetime and HTML-only controller in the handoff.

## Migration Plan

Prepare and verify local artwork first. Keep existing consumers on their current assets. Adopt the selected bundle through its owning package and ordinary protected review later. Removing the new Relay folder and targeted generator branch reverses the local addition without changing released applications.
