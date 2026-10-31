# Cloudflare security operations

This guide covers the four public project sites and their release tooling.
Keep unrelated products and account services in their own operating records.
Use the owning repository's release instructions and a current, scoped
Cloudflare inventory. Settings can drift after an audit or deployment.

## Recorded state and limits

The October 18, 2026 review recorded the following project results. These are
historical observations, not a fresh audit of the current account:

| Boundary | Recorded result |
| --- | --- |
| Public project sites | The full Cloudflare Managed Ruleset was deployed for the four canonical hosts below. No country restriction applied to their public access. |
| Apex alternate URLs | Worker settings read back `enabled: false` and `previews_enabled: false`. The unwanted production hostname returned `404` after propagation; the canonical homepage returned `200`. |
| Source configuration | Apex and CLI production configs explicitly disabled `workers_dev` and `preview_urls`. The separate apex preview environment disabled both until its access policy was ready. |
| Credentials | Broad write and broad read tokens were retired during the account review. Future operations require a current credential scoped to the project and operation. |
| IDE storage | The release bucket was private. Release metadata was available, but its empty manifest left real installer acceptance unproven. |

The review checked account MFA, roles, strict origin TLS, HTTPS, DNSSEC, and
rule scope. The retained audit records are project-scoped excerpts, not full
account inventories. A configured setting does not prove application
authorization, successful login, alert delivery, or access from every country.
Unsupported legacy Page Rules reads remain a visibility gap.

## Public hosts and worldwide access

| Service | Canonical origin |
| --- | --- |
| Studio website | <https://ejmlabs.com/> |
| CLI website and guides | <https://cli.ejmlabs.com/> |
| IDE website, metadata, and downloads | <https://ide.ejmlabs.com/> |
| Harness website and guides | <https://harness.ejmlabs.com/> |

Keep these public origins open to every country while retaining managed WAF,
DDoS protection, strict TLS, HTTPS redirects, DNSSEC, and scoped scanner
filtering. Review custom rules in execution order, including skip rules. A
country exception must not skip the WAF or grant access to a private service.
The policy applies to these four hosts. Preserve access controls on other
hosts without importing their identities or operations into project records.

Paid WAF deployments and the automatic Free Managed Ruleset are different
controls. A Free zone with no customer managed-phase entrypoint can still have
the automatic ruleset. Record the plan, provider settings, and available
rule-attributed evidence before drawing a conclusion about coverage.

Do not add blanket browser challenges to APIs, downloads, webhooks,
WebSockets, or authenticated service traffic. Check machine clients whenever
changing a rule that covers their host or path.

### Pro plan setup

The reviewed ejmlabs.com Pro plan provided the full Cloudflare and OWASP
managed rulesets, exposed-credential checks, twenty custom WAF rules, and
Super Bot Fight Mode. Recheck the current plan before relying on these limits.
See the [Pro feature list](https://www.cloudflare.com/plans/pro/) and
[bot controls](https://developers.cloudflare.com/bots/plans/pro/).

The recorded deployment executed the latest full Cloudflare Managed Ruleset
on all four public hosts. OWASP was available but was not deployed on this
zone. Before expanding protection, check the affected routes and machine
clients, review rule-attributed events, and limit exceptions to proven false
positives. A plan upgrade alone does not configure every feature.

## Worker alternate URLs and previews

Production source must retain these explicit settings:

```json
"workers_dev": false,
"preview_urls": false
```

Review production `workers.dev`, version URLs, current Worker Previews, and
custom domains separately. One disabled flag does not establish the state of
all four surfaces. Recheck live settings after an authorized deployment.

The apex preview environment in [wrangler.jsonc](wrangler.jsonc) stays disabled
until its own Access policy is enforced and verified. Before publishing a
preview, verify anonymous denial and authorized access at its actual hostname.
Production zone rules do not establish preview protection.

The staging environment, `ejmlabs-staging` at `staging.ejmlabs.com`, is public
and serves the latest main; protect it with Cloudflare Access if it must not be.

## Deployment and verification

Review the exact source revision, build output, target account, environment,
routes, and [Wrangler config](wrangler.jsonc) before publication. Preserve
concurrent changes. From this repository's root, run the existing site checks:

```sh
npm --prefix site run typecheck
npm --prefix site run build
npm --prefix site test
npm --prefix site run perf
```

From `site/`, validate each configured environment without publishing:

```sh
WRANGLER_SEND_METRICS=false WRANGLER_LOG_PATH=/private/tmp/ejmlabs-security-production-dry-run.log npx wrangler deploy --config wrangler.jsonc --env "" --dry-run
WRANGLER_SEND_METRICS=false WRANGLER_LOG_PATH=/private/tmp/ejmlabs-security-preview-dry-run.log npx wrangler deploy --config wrangler.jsonc --env preview --dry-run
WRANGLER_SEND_METRICS=false WRANGLER_LOG_PATH=/private/tmp/ejmlabs-security-staging-dry-run.log npx wrangler deploy --config wrangler.jsonc --env staging --dry-run
```

A dry run validates configuration and packaging. It does not prove deployment
permission or live behavior. Follow the [release policy](../RELEASING.md).

Deploys always come from a main commit. A push to main runs
`.github/workflows/deploy.yml`, the canonical caller of the shared
`ejmlabs/.github` workflow `deploy-site.yml`. Its build job has
`contents: read` and no secrets, and builds the site with ejm-ui checked out at
the pin in `.github/ui-source.json`. A staging job then runs
`wrangler deploy --env staging`. When staging succeeds, a production job
deploys the same built files with the top-level config. No one approves a
production job: the merge, with the gate's approval and required checks, is the
human decision and the owner's deploy authorization. A manual `wrangler deploy`
from a workstation is no longer the procedure. The production custom domain is
already attached. Wrangler creates the staging one on its first deploy and
prompts only if a DNS record for `staging.ejmlabs.com` already exists outside
Wrangler; CI cannot answer that prompt.

Deploy jobs run Wrangler 4.153.0, pinned in the shared repository rather than
this site's dependencies. They refuse a build whose `wrangler.jsonc` differs
from the reviewed commit. The Cloudflare token is the `CLOUDFLARE_API_TOKEN`
secret of the `staging` and `production` GitHub environments. Each environment
allows deployments from `main` only, and the shared deploy checks that before it
uses the token. The token reaches only the deploy jobs, never the build job.

Run these checks on staging after each merge, and on production once its job
finishes:

1. Read back alternate-URL flags, custom domains, and intended route mappings.
2. Check the four canonical homepages, representative guides, affected links,
   HTTPS redirects, and response headers. Check each changed public route.
3. On the apex, check both ZIP downloads and a missing route. Confirm a known
   scanner path is rejected without changing WAF scope to make a check pass.
4. Check IDE `/api/releases` and existing download rejection behavior. Use a
   real approved release for digest, range, and conditional acceptance only
   when one exists. An empty manifest leaves that acceptance unproven.
5. Confirm unwanted alternate hosts do not serve the application. Check any
   affected private boundary and machine clients through their owning workflow.

Record local checks, configured controls, observed responses, and publication
as separate results. This guide and the site README are repository documents,
not routes in the static site build. Product guides live in their owning
repositories and are linked from `/projects/`.

## Administration and recovery

Require MFA for human Cloudflare administration. Review accepted members and
roles separately from pending invitations. Keep independent administrative
recovery available before changing an identity provider or Access policy.
Store recovery details outside public source and verify them through the
approved owner process.

An anonymous request to a private project route must be denied or redirected
to Access before private content is served. That redirect alone does not prove
an authorized person can finish login. Verify authorized login after a policy
change, while preserving an independent recovery path.

Keep service authentication separate from human login. Each service exception
needs an exact host, anchored path, permitted method, and verification by its
owner. Access service tokens, Cloudflare API tokens, and application secrets
serve different purposes and must not be substituted for one another.

## Credential scope, rotation, and expiry

Use a current project-scoped credential from the approved secret store. Resolve
its reference through the private consumer map. This guide does not identify
credentials belonging to other products or claim historical credentials remain
valid. Check scope, expiry, and recovery before each authorized operation.

| Required field | What to record without the secret |
| --- | --- |
| Owner and consumer | Responsible role, local tool or automation, and recovery owner |
| Resources and operations | Exact project Worker, bucket, zone, and required reads or writes |
| Storage and lifecycle | Approved store reference, expiry, rotation date, and retirement state |
| Source restriction | Known stable egress, or why no stable restriction applies |
| Verification | Required operation, result, and independent recovery evidence |

Use separate policies for site deployment, IDE release publication, inventory,
and security maintenance where those consumers exist. Query provider permission
groups and supported resource scopes. Do not invent permission IDs. Inventory
alone does not justify token creation, member administration, Worker source,
or private storage access. A successful read does not prove deployment or
object-write permission.

Keep secret values out of source, chat, command arguments, logs, and evidence.
Verify the replacement's required operations and independent recovery before
migrating consumers and retiring an old credential. Retire short-lived
maintenance credentials when the authorized work ends. Revocation cannot
recover a retired secret. Do not publish unrelated code as a credential test.

## Storage and download contracts

The IDE bucket `ejmlabs-ide-releases` must stay private, with `r2.dev` and public
custom domains disabled. Inspect exposure and CORS metadata; do not read object,
database, or KV contents merely to check exposure.

Browsers obtain release metadata through `/api/releases`. Downloads use the
same Worker at `/downloads/{target}?sha256={sha256}`. Preserve the exact digest
query in the cache key. The Worker validates the manifest and object size;
R2 handles ranges and conditionals without buffering installers.

| Contract | Required behavior |
| --- | --- |
| Methods | Preserve `GET` and `HEAD` for metadata and downloads. |
| Cache | Metadata: 30 seconds. Digest-bound downloads: 60 seconds. Errors: `no-store`. |
| Digest | Missing, stale, or mismatched digest: non-cacheable `409`; unavailable target: `404`. |
| Ranges and validators | Preserve `206`, `304`, `412`, and `416`; ranges ignored by R2 and `If-Range` fallback can return full `200`. |

An empty manifest establishes no real released download to test. Never upload
a fake release to fill that gap. Follow the IDE's
[distribution guide](https://github.com/ejmlabs/ejm-ide/blob/main/docs/distribution.md)
for installer publication and manifest rollback.

The harness owns registry and package service contracts. Source configuration
does not establish a live registry. Use its guides for an explicitly configured
registry origin and keep its storage private. The CLI owns its relay adapter;
verify the configured HTTPS origin, origin-bound credentials, disabled alternate
URLs, and admission policy through that repository's workflow.

## Downloads and report links

The apex serves `/download/`, `/install.sh` and `/releases.json` as static
files built from `site/public/releases.json`. The release files themselves are
GitHub release assets on each product's repository, so this site stores no
installer and runs no Worker or bucket for them. Only a reviewed change to
`releases.json`, deployed from main, changes what the page offers.

Data statement for the download and report links: the site keeps nothing of
its own beyond the existing visit counts. `install.sh` sends no telemetry and
contacts only GitHub. GitHub keeps its own request logs for file downloads.
The report links open each product's GitHub issue forms and private security
report form; the site reads nothing from the visitor, holds no report and adds
no endpoint, store or content security policy source. The only value a link may
carry is the released version in the form's `evidence` field.

The checksum and the script share this origin. A change to this site could
alter both, so treat a deployment as the control: every deploy comes from a
main commit, and the merge deploys it, so give a change that touches them a
fresh security pass before it merges. Keep owner sign-in protected by MFA. The
deploy token is a CI credential: it lives only in the `staging` and `production`
GitHub environment secrets, is released only to jobs on `main`, and needs only
the rights to deploy Workers and custom domains. After a release deployment,
check that `/install.sh` and `/releases.json` match the reviewed build, that
each listed URL is a versioned release asset of its repository, and that the
page offers only files that exist.

## Audit, alerts, and incident response

Review a bounded audit window around project administration, token, deployment,
DNS, WAF, and Access changes. Record resource, action, actor role, and outcome
without personal identities, secrets, or private origin addresses. Readable
history does not establish sustained review or absence of compromise.

Review current notification scopes for project availability, certificate
expiry, DDoS attacks, security insights, and applicable credential expiry or
leak events. Keep destinations in the private owner record. Saved policy
settings do not prove delivery. Check provider send history and human receipt
separately after an authorized test. Cloudflare documents dashboard testing in
[Manage alerts](https://developers.cloudflare.com/notifications/get-started/).
Do not send a test message or add a destination without owner authorization.

For suspected compromise or an unexpected security change:

1. Use independent administration, preserve a bounded credential-free snapshot,
   and identify the exact affected project resource and credential consumer.
2. Contain that entry point or credential. Rotate compromised secrets in the
   approved store, migrate known consumers, and verify recovery. An active
   compromise needs owner action even when consumer mapping is incomplete.
3. Review related audit events, deployed versions, routes, rules, Access
   policies, storage exposure, and notification state for persistence.
4. Recheck canonical availability, private denials, and affected machine
   clients. Record remaining unknowns and credential expiry follow-up.

## Narrow rollback

Restore only the affected project setting from its reviewed before snapshot,
then repeat the relevant check. Keep managed WAF, private Access, private
storage, and disabled unnecessary alternate URLs intact. Do not restore broad
tokens, add a global allow rule, or expose storage to recover a service. Use an
independently issued scoped operator credential when recovery requires it.
For a bad site release, redeploy an earlier verified Worker version in
Cloudflare, or revert on main so the same deploy path restores it.
