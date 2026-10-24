# Tasks

> Project-scoped excerpt revised October 20, 2026. Unrelated account resources and operations are omitted. This is not the original full account record or a new live audit.

## 1. Preserve worldwide access

- [x] 1.1 Refresh the live zone and account rules, Access application host coverage, TLS settings, and bot settings through the official API or authenticated MCP; save a credential-free scoped snapshot and verify that all four public hosts have no geography restriction or Access login while unrelated private services retain their controls.

## 2. Enable managed attack filtering

- [x] 2.1 Add a managed WAF execute rule for the exact four public hosts using Cloudflare's maintained Managed Ruleset defaults; read back the deployed entrypoint and compare the existing custom rules, TLS settings, Access controls, and rate controls with the snapshot to verify they are unchanged.
- [x] 2.2 Check each public home page and existing documentation route, then valid installer and release metadata routes where available; verify successful ordinary responses and 403 responses for harmless `/.env` and `/wp-login.php` probes, recording source-network limits and the rollback rule ID.
- [x] 2.3 Update `site/README.md` with worldwide access, active protections, scope, verification limits, and rollback; review the existing public guides for affected availability claims and run the existing site checks if build inputs change. Record local documentation status separately from publication, along with the zero-runtime-growth budget and unmeasured WAF latency.

## Workflow follow-up

- Sync the verified spec through openspec-sync-specs, then archive through openspec-archive-change after required review.
- Include affected documentation in the normal release process and verify publication before claiming the live docs are updated.
