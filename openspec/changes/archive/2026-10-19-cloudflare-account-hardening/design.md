# Design

> Project-scoped excerpt revised October 20, 2026. Unrelated account resources and operations are omitted. This is not the original full account record or a new live audit.

## Context

See proposal.md for the retained project scope. The review ran on October 18, 2026, with final reads on October 19 UTC. The authorized provider API supplied the evidence; secret values stayed out of source and reports.

The four public project hosts had the full Cloudflare Managed Ruleset. The apex production workers.dev URL served the site outside the zone WAF. Its production and version-preview flags were enabled. CLI flags were disabled live but omitted from source. Harness and IDE flags were disabled live and in source.

The reviewed credentials included broad write and read authority. Repository CI review alone could not establish every consumer. An empty IDE release manifest left real installer acceptance unproven.

## Goals / Non-Goals

**Goals:** Close the alternate-host gap, persist its source configuration, scope operator authority, and preserve public access and release integrity.

**Non-Goals:** Publish working-tree changes, launch undeployed services, upload a release for testing, change paid plans, or claim a full application security audit.

## Decisions

1. Snapshot flags, custom domains, version URLs, and current previews. Disable the apex's unnecessary alternate URLs through the narrow settings API, verify canonical availability, and persist explicit disabled flags. Use the CLI's own workflow for its source change.
2. Map each credential consumer and required operation. Issue scoped replacements through the approved secret store, verify their required operations and independent recovery, then retire old credentials. Read success alone does not prove deployment or object-write authority.
3. Review rule order and host scope. Preserve managed WAF, DDoS protection, strict TLS, HTTPS, DNSSEC, and scanner filtering. Avoid blanket challenges on downloads and machine clients.
4. Keep IDE release storage private. Inspect exposure metadata without reading contents. Preserve the Worker-mediated manifest, digest, range, conditional, and cache contracts.
5. Record configured controls, observed responses, source changes, and publication separately. Do not treat an Access redirect as successful authorized login or one network as a worldwide reachability test.

## Risks / Trade-offs

- Unknown consumers may use alternate URLs or credentials. Check ownership and preserve recovery before a narrow change.
- A later deploy may reopen an alias. Keep explicit source flags and verify after an authorized release.
- Rule changes may reject machine clients. Use a bounded route matrix and narrow only demonstrated false positives.
- Historical excerpts cannot reconstruct the full account audit. Keep scope and evidence limits explicit.

## Migration Plan

Refresh only affected controls, save a scoped before snapshot, close unnecessary alternate URLs, verify canonical routes, and retain explicit source flags. Map and validate scoped credential replacements before retirement. Update guidance, run owner checks, then sync and archive verified work.

Restore only an affected setting from its reviewed snapshot if needed. Do not disable the WAF, expose storage, or restore broad credentials as a workaround.

## Verification Budget

No new runtime requests, packages, storage copies, or background services were required. Use bounded provider reads and public-route checks. Real release range acceptance requires an approved existing artifact. A configuration change does not establish a speed improvement.
