# Deployment result

> Project-scoped excerpt revised October 20, 2026. Unrelated account resources and operations are omitted. This is not the original full account record or a new live audit.

On October 18, 2026, deployed the Cloudflare Managed Ruleset with maintained
defaults to the exact four public ejmlabs hosts. The enabled execute rule is
`f8488f9196b24cf79fd1ca4bbf860b64` in entrypoint
`1bcfc3c02e444da095502949ca18a30f`. Readback verified the rule and all eight
existing configuration comparisons passed. See deployed.json and verification.json for retained project evidence.
The filtered before.json omits unrelated rules and Access applications;
after.json keeps the historical comparison results, which cannot be fully
reconstructed from this scoped excerpt.

All 23 route checks passed: home pages, design kit, product docs indexes and
guides, and IDE release metadata returned 200; eight harmless scanner probes
returned 403. No challenge was returned. The IDE release manifest was empty,
so published installer downloads could not be tested. These checks ran from
one network; no claim is made about reachability from every country or every
managed signature. The scanner probes exercise the existing custom block.

Worldwide access required no geography edit. Existing private-host country rules,
Access controls, TLS settings, bot settings, and existing rate controls
were preserved. No edge rate limiter was added.

Updated site/README.md with active configuration, verification, limits, and
rollback. Reviewed IDE and harness public guide sources and CLI guide sources
for availability claims. No product behavior, installation instructions, or
public guide claim changed, so those pages required no source edit. No build
input changed, so no application rebuild or native test suite was needed.
Documentation publication is separate and was not performed.

Resource budget met by construction: zero new runtime packages, application
bundle bytes, background processes, or origin I/O. Edge WAF latency is unmeasured.
