# Proposal

> Project-scoped excerpt revised October 20, 2026. Unrelated account resources and operations are omitted. This is not the original full account record or a new live audit.

## Why

The October 18, 2026 account review found an alternate public Worker origin outside the production domain's WAF and broad automation authority. Project sites need scoped edge controls, credentials, and evidence.

## What Changes

- Close unnecessary alternate production URLs and persist the policy in deployment configuration.
- Keep intentional previews behind a verified access policy.
- Use scoped credentials after mapping consumers and verifying their required operations.
- Record the public project hosts, release storage, protections, and verification limits.
- Preserve account MFA, strict TLS, HTTPS, DNSSEC, private storage, and worldwide public access.
- Update affected operating guidance through each owning repository's workflow.

## Capabilities

### New Capabilities

- `cloudflare-service-security`: Service boundaries, scoped automation, and operational evidence.

### Modified Capabilities

- `public-web-access`: Require protected production hostnames and source configuration that keeps unnecessary alternate hosts disabled.

## Impact

This excerpt covers the studio, CLI, IDE, and harness public sites. Source work belongs to each site's repository. The review used provider configuration and bounded HTTP/DNS checks; it did not establish every application workflow or worldwide reachability.

The full Cloudflare Managed Ruleset was explicitly active on the four public hosts. Automatic Free protection is a distinct provider control. A missing visible customer entrypoint alone does not prove Free WAF is disabled. Detailed private snapshots, credential references, and unrelated service operations are omitted.
