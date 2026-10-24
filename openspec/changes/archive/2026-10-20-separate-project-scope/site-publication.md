# Public site publication

Date: October 20, 2026, America/Los_Angeles. Publication and HTTPS verification completed on October 21 UTC.

The owner authorized publishing the four cleaned public sites after the local cleanup checks. Each deployment used the existing production Worker, canonical domain, and current authentication. The working copies included pending changes; this was a site deployment, not a tagged source release.

## Published versions

| Public site | Worker | Version | Production traffic |
| --- | --- | --- | --- |
| <https://ejmlabs.com/> | `ejmlabs` | `d4af526b-2c43-477d-83ae-0aaafb812588` | 100% |
| <https://cli.ejmlabs.com/> | `ejmlabs-cli` | `cdcad249-4563-4606-a311-d82a17a6ec95` | 100% |
| <https://harness.ejmlabs.com/> | `ejmlabs-harness` | `5247d24e-77ee-4996-bedf-d6b14eb8c80c` | 100% |
| <https://ide.ejmlabs.com/> | `ejmlabs-ide` | `b4c32356-4b56-4fa5-97c5-ea0db315af78` | 100% |

The studio deployment ID is `c2520ce0-e5db-455b-82b4-c55245ff10ad`. The previous deployment version references were retained locally for rollback.

The sanitized [studio receipt](site-publication.json) contains the per-path checks, provider readback, production allocation, and previous version references. Its SHA-256 is `856f0c58b2724d36625f12212a3ae2b695254aa3121b4508230e23404e918803`.

All four public hosts returned 301 redirects from HTTP to their canonical HTTPS origins. The [redirect receipt](site-publication-redirects.json) records those responses.

## Studio checks

- Node 24.19.0: typecheck, build, all 23 site tests, and all seven route budgets passed. Both public ZIP downloads were rebuilt and checked.
- The final asset scan and deployment dry run passed before publication.
- All 224 public paths passed HTTPS checks: seven HTML pages and 217 other assets. Static asset bytes match the local build. The two public ZIP downloads also passed member-name and decompressed-content scans.
- Served HTML matches the local build after removing only newly added Cloudflare analytics and browser-detection script blocks and ignoring whitespace immediately before the closing body tag. Other page bytes must match. No unrelated proprietary product references were found.
- The HTML security headers passed. Hashed assets retained immutable caching.
- The authored `/404` page returns 200. A genuinely missing path returns 404. The scanner path `/.env` returns 403.
- Provider readback confirmed the canonical production domain, disabled `workers_dev` and preview URLs, and the new version receiving all traffic. The unwanted alternate Worker hostname returned a non-site 404.
- The five advertised GitHub repositories, including shared UI, returned 200 without authentication and stayed at their expected repository URLs.

The first raw HTML comparison differed because of provider-added scripts. The final comparison above accounts only for those additions. The initial expectation that the authored `/404` route should itself return 404 was corrected; the independent missing-path check verifies the actual not-found contract.

## Other site checks

- CLI: 13 public pages, 33 other assets, and the missing-route response passed. Served content, security headers, immutable asset caching, explicit registry guidance, provider domain mapping, alternate URL flags, and the production version were verified. See the CLI change's `site-publication.md`.
- Harness: four canonical pages, 30 public assets, and one genuinely missing route passed. The package manifest and explicit registry guidance are present. HTML matches after accounting for the two provider script blocks; other assets match exactly. Security and cache headers, content scans, and the production version passed. See the harness change's `site-publication.md` and linked JSON receipts.
- IDE: all 54 HTTP checks passed, and all 42 public assets match the build. The public release metadata remains empty and unchanged. Site checks, budgets, dry run, and 86 distribution tests passed. See the IDE change's `publication-2026-10-20.json`.

Each owning repository retains its publication evidence under `openspec/changes/archive/2026-10-20-separate-project-scope/`.

## Scope and limits

No browser surface was available for visual inspection. These results establish the observed HTTPS responses and provider deployment state from this environment, not worldwide reachability or authenticated native-product acceptance. Some initial automated HTTP profiles received Cloudflare challenges; the final public checks passed with the documented publication-check client and no cookies or credentials.

The deployments preserved existing domain mappings, disabled alternate URLs, and the IDE's private release binding. No DNS, WAF, account policy, or credential change was made. No package, installer, registry service, relay service, or tagged source release was published. The existing native CLI certificate advisory remains recorded in the CLI cleanup verification and does not change the passed site checks.

The original [verification record](verification.md) covers the local cleanup before this authorized publication.
