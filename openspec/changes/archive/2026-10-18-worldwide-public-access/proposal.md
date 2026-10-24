# Proposal

> Project-scoped excerpt revised October 20, 2026. Unrelated account resources and operations are omitted. This is not the original full account record or a new live audit.

## Why

People worldwide should be able to discover ejmlabs and obtain its IDE, CLI, and harness. Country restrictions on public sites can prevent that discovery without distinguishing ordinary visitors from attacks.

## What Changes

- Inspect the live Cloudflare configuration for `ejmlabs.com`, `ide.ejmlabs.com`, `cli.ejmlabs.com`, and `harness.ejmlabs.com`.
- Remove country-only blocks or challenges for these public hosts without bypassing security evaluation.
- Preserve attack filtering, DDoS protection, rate limits, TLS, security headers, and existing authentication.
- Enable the available Cloudflare Managed Ruleset for these four public hosts, using its maintained defaults and leaving other hosts outside its expression.
- Record the before and after configuration, verification limits, and rollback procedure without storing credentials.
- Update affected hosting documentation in the same change; publish documentation only through the existing release process.

## Capabilities

### New Capabilities

- `public-web-access`: Worldwide access to public ejmlabs sites with attack protections and private service boundaries preserved.

### Modified Capabilities

None.

## Impact

The shared `ejmlabs.com` Cloudflare zone and hosting guidance in `site/README.md`. No runtime package, background service, application build, or deployment is needed for an edge rule change. Inspect the actual zone before choosing rule edits. The CLI relay, registry, private auth Worker, and administrative services retain their existing access policy. Other repositories need separate workflow changes only if their source must change.

The October 18, 2026 API audit found no country restriction or Access application on the four public hosts. Normal requests returned 200 and scanner probes returned 403 on every public host. Strict TLS, a TLS 1.3 minimum, HTTPS redirects, and security headers are active. No managed WAF or edge rate-limit entrypoint is deployed. No change to geography rules is needed. Managed WAF hardening remains planned. These checks ran from one network and do not prove reachability from every country.
