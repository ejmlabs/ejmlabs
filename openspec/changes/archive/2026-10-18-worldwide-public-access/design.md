# Design

> Project-scoped excerpt revised October 20, 2026. Unrelated account resources and operations are omitted. This is not the original full account record or a new live audit.

## Context

See proposal.md for the live audit and motivation. The four public sites share Cloudflare zone `4755cac49c3ce147b9d10e1199a718f8`, on the Pro plan. The active custom ruleset blocks scanner paths across the zone; unrelated private-host rules are outside this project record. There is no managed WAF entrypoint, edge rate-limit entrypoint, or account custom ruleset. No Access application covers the four public hosts.

The configured Cloudflare MCP required OAuth. The authorized provider API supplied the historical audit. Resolve current project-scoped credentials through the approved private consumer map; never print or persist their values.

## Goals / Non-Goals

**Goals:** Keep worldwide public access and add maintained attack filtering within the four-host boundary.

**Non-Goals:** Changes to unrelated services or to the relay, registry, private auth Worker, or their access controls. No application deployment, paid plan change, broad security skip, or claim of worldwide network testing.

## Decisions

1. Keep the existing geography rule unchanged. It does not apply to the four public project hosts. Rules for unrelated private services remain outside this project change.
2. Deploy Cloudflare Managed Ruleset `efb7b8c949ac4650a09736fc376e9aee` through a managed-phase entrypoint whose execute expression matches exactly the four public hostnames. Use maintained defaults. Do not enable OWASP or credential checks without a separate need. Merely listing a managed ruleset does not mean it is deployed.
3. Use the provider API or an authenticated MCP connection, with a narrow configuration snapshot before mutation. If the live state differs from this audit, reconcile it before writing. Do not overwrite a new entrypoint or concurrent edits.
4. Add no runtime code or dependencies. Resource budget: zero application bundle growth, zero new background processes, and zero origin I/O for this configuration change. Edge WAF latency is unmeasured; do not claim a speed improvement.
5. Keep existing rate controls unchanged. No edge rate-limit entrypoint exists. Do not invent a static download limit without traffic and workload evidence; per-IP limits can penalize shared networks. Preserve service-specific limits.
6. Update `site/README.md` with worldwide access, exact scope, the active security controls, verification procedure, and rollback. Existing public product guides have no runtime behavior change. Review their availability language and record any needed source work through each owning repository's workflow. Do not claim docs are published from a local edit.

## Risks / Trade-offs

- Managed rules can reject legitimate requests. Check public pages, docs, and known installer or metadata routes after deployment; narrow a proven false positive rather than bypassing the WAF.
- One network cannot prove access from every country. Verify rules for geography and use real regional probes only when available. A forged country header is not evidence.
- The legacy WAF setting is off and the current managed entrypoint is absent. Verify the new Rulesets API entrypoint directly after deployment rather than relying on a legacy setting.
- AI bot blocking is enabled. This affects automation separately from geography. Keep it unchanged because the request concerns countries; do not claim every crawler can access the sites.

## Migration Plan

Read the live rulesets, Access applications, IP access rules, TLS settings, and representative responses. Save only the scoped configuration needed for comparison and recovery, without credentials or unrelated identities. Add the four-host managed WAF execute rule after the apply workflow starts. Read it back, compare existing custom rules and TLS settings, then check home pages, docs, valid downloads where available, and harmless scanner paths. On regression, disable only the newly added execute rule, preserving concurrent edits. Record the verification and rollback result before syncing and archiving the change.
