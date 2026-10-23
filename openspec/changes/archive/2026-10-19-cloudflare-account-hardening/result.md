# Cloudflare project hardening result

> Project-scoped excerpt revised October 20, 2026. Unrelated account resources and operations are omitted. This is not the original full account record or a new live audit.

## Scope and recorded status

This excerpt retains the October 18 review and October 19 UTC verification
for the four public project sites. It does not report current account state
or unrelated service operations. See [inventory.md](inventory.md) and the
[operations guide](../../../../site/SECURITY-OPERATIONS.md).

## Changed and verified controls

| Control | Recorded result |
| --- | --- |
| Public access | The four canonical hosts allowed ordinary requests without a country rule and retained the full Cloudflare Managed Ruleset. No blanket WAF skip was added. |
| Apex alternate origin | Production workers.dev and version URLs were disabled. Both flags read back false; the unwanted hostname returned 404 and the canonical homepage returned 200. |
| Source persistence | Apex production and preview configs explicitly disabled alternate URLs. The linked CLI change persisted its missing flags. Harness and IDE already had them. No site assets were deployed for this hardening. |
| Credentials | Broad write and read tokens were retired. Separate metadata and maintenance permissions excluded billing, token creation, Worker code, and storage contents. These were not deployment credentials. |
| Storage | IDE R2 public managed domain was disabled, public custom domains were empty, and no CORS configuration existed. Contents were not read. |

The review retained account MFA, strict origin TLS, minimum TLS 1.3, HTTPS,
HSTS, and DNSSEC. Free-plan automatic protection is distinct from an explicit
full managed deployment; an absent customer entrypoint is not proof that
provider protection is disabled.

## Compatibility and limits

The bounded checks covered the four public homepages, representative guides,
IDE release metadata, download rejection behavior, and scanner filtering.
The empty release manifest left real installer digest, range, and conditional
acceptance unproven. Checks from one network did not establish worldwide
reachability. Unsupported legacy Page Rules remained a visibility gap.

Source contracts for private auth, the package registry, and the CLI relay
were reviewed through their owners. Source review did not establish a live
registry or relay launch, nor verify every application action.

## Source and documentation

Apex and preview Wrangler dry runs passed without publishing. The existing
site checks passed during the original change. The operations guide and site
README link were local repository documentation. CLI hosting guidance changed
through its owning workflow. Documentation publication was not verified.

The original change was validated, synced, and archived after its acceptance
checks. This revision filters its record to project scope; it does not rerun
those checks or make the revised text an original account snapshot.

## Narrow rollback

Restore only the affected project setting from its reviewed private before
snapshot, then repeat the relevant check. Preserve managed WAF, private
storage, and disabled unnecessary alternate URLs. Use independent scoped
operator authority when recovery requires it. Do not restore broad tokens or
add a global allow rule to recover a service.
