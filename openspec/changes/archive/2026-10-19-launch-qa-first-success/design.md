# Design

## Context

See proposal.md. Five independent browser personas reviewed the studio, CLI, IDE, harness and UI gallery. The CLI and IDE public repositories return GitHub 404 while harness and studio are public. All products have available local browser examples. Existing code and uncommitted work remain the authority for the visual system.

## Goals / Non-Goals

Goals: make source availability visible where users choose a project, offer the existing browser examples, keep guides and chosen repository destinations, and preserve size limits.

Non-goals: publish repositories or installers, deploy sites, add accounts or pricing, change provider/runtime behavior, or describe recorded playback as a native installation.

## Decisions

- Keep per-project availability in studio-owned project content. Keep URLs in the public shared registry. This is reviewed public copy, not a second registry or remote availability service.
- Name the CLI and IDE source-access limit beside project facts and source actions. Retain chosen GitHub URLs with explicit access labels; keep the publicly available harness source usable.
- Link the existing Watch route as the available first outcome. Preserve all public product-guide links and source instructions for users with access.
- Shared demo phone visibility and gallery loading fixes belong in ejm-ui, consumed through public exports. Each product owns its own OpenSpec change and docs. No copied shared code or private sibling imports.
- Use five persona records and screenshots as the bounded UX verification. Count each persona once per issue and separate verified local source from live publication.

## Risks / Trade-offs

- Source access remains closed for CLI and IDE: report the release blocker and preserve the publication approval gate. Clear copy cannot substitute for public source.
- Reviewed access copy can become stale: release preparation must recheck the chosen GitHub links before publication.
- Shared CSS affects downstream sites: rebuild all four consumers after the shared fix and rerun the same browser paths.
- The browser tool has no native network throttling: use a loopback HTTP delivery proxy with shared 400 kbit/s and 400 ms delay, and state its limits.
- Native installs and model calls are outside browser evidence: report them as unverified.

## Migration Plan

Apply and verify source locally, review with the normal release workflow, then publish only with separate approval. Rollback means reverting this scoped source patch, preserving pre-existing changes.
