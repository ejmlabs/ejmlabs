# Cloudflare project service inventory

> Project-scoped excerpt revised October 20, 2026. Unrelated account resources and operations are omitted. This is not the original full account record or a new live audit.

Reviewed October 18, 2026 local time, with final reads on October 19 UTC.
This excerpt retains only public project infrastructure. It omits unrelated
zones, services, identities, credentials, and origin addresses.

## Zone

| Zone | Reviewed plan | Boundary and result |
| --- | --- | --- |
| ejmlabs.com | Pro | Four public project hosts used the full Cloudflare Managed Ruleset. Private boundaries on other hosts were preserved. |

The zone reported strict origin TLS, minimum TLS 1.3, HTTPS redirects, HSTS,
and active DNSSEC. Parent DS records matched the provider. These settings do
not establish safety for services outside the HTTP proxy.

The legacy `waf` setting is not evidence of modern Ruleset Engine activation.
An enabled execute rule covered the latest Cloudflare Managed Ruleset on the
four public hosts. Legacy Page Rules could not be read with account-owned
tokens, leaving a visibility limit.

## Workers and entry points

| Worker | Entry point | Owner | Recorded result |
| --- | --- | --- | --- |
| ejmlabs | ejmlabs.com | Studio site | Canonical host worked; unnecessary alternate URLs disabled live and in source. |
| ejmlabs-cli | cli.ejmlabs.com | CLI site | Canonical host worked; unnecessary alternate URLs disabled live and in source. |
| ejmlabs-harness | harness.ejmlabs.com | Harness site | Canonical host worked; unnecessary alternate URLs disabled live and in source. |
| ejmlabs-ide | ide.ejmlabs.com | IDE site and release tooling | Canonical host and metadata worked; alternate URLs disabled and R2 private. |

The current previews collection was empty for these Workers. Registry, auth,
and relay source configurations were reviewed as source contracts, not proof
of additional deployed services.

The linked CLI source change is
`ejm-cli/openspec/changes/archive/2026-10-18-disable-public-worker-aliases/`.

## Storage and authority

The IDE release bucket's public managed domain was disabled, public custom
domains were empty, and no CORS configuration existed. No storage contents
were read. An empty release manifest prevented real installer acceptance.

Account MFA and scoped credential policies were reviewed. Broad write and
read tokens were retired. Metadata reading and maintenance operations used
separate permissions. Their historical verification does not establish that
any credential remains valid today or has deployment authority. Resolve
current per-project references through the private consumer map.

## Evidence limits

This file is not a complete account inventory. Site availability checks ran
from one network. Settings alone do not prove authorized application actions,
alert delivery, an incident-free history, or worldwide network reachability.
