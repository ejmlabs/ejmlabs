---
name: studio-deploy
description: Use when you check, follow, roll back or verify a deploy of ejmlabs.com, including the deploy-on-merge workflow, the owner's one-time environment setup, a local build against the pinned ejm-ui in a scratch directory, wrangler dry runs from site/, live checks behind Cloudflare bot protection, and comparing live headers with dist/_headers.
---

# Deploying ejmlabs.com

What is live must be a reviewed main commit, built from clean clones against the pinned ejm-ui,
and seen working in a headed browser. CI deploys it: a merge to main builds the site, deploys
staging, then deploys production. This adds the ejmlabs.com specifics to `ejmlabs-cloudflare`;
read it and its verify reference first.

## How a deploy happens

A push to main runs `.github/workflows/deploy.yml`, the canonical caller of the shared
`ejmlabs/.github` workflow `deploy-site.yml`. Never edit it by hand: the shared standards check
requires it to match the template except for the pin.

1. A build job with `contents: read` and no secrets checks out the main commit and ejm-ui at the
   pin in `.github/ui-source.json`, then runs, from the repository root:
   `npm --prefix ../ejm-ui ci --ignore-scripts`, `npm --prefix site ci --ignore-scripts` and
   `npm --prefix site run build`. It uploads `site/wrangler.jsonc` and `site/dist`.
2. A staging job runs `wrangler deploy --env staging`: Worker `ejmlabs-staging` at
   `staging.ejmlabs.com`. Staging is public and serves the latest main.
3. When staging succeeds, a production job deploys the same files with the top-level config:
   Worker `ejmlabs`, custom domain `ejmlabs.com`. Nobody approves a production job. The human
   decision is the merge: `gate:approve` and the required checks.

The deploy jobs run Wrangler 4.153.0, pinned in `ejmlabs/.github` (`deploy/package.json`), not
the version in `site/package.json`. They refuse a build whose `site/wrangler.jsonc` differs from
the reviewed commit, so change that file in source, never in a build step. The `preview`
environment (`ejmlabs-preview`) is never deployed until its Access policy is enforced and
verified at its real hostname (`site/SECURITY-OPERATIONS.md`).

`install.sh`, `releases.json` and the checksums share this origin, so a merge is the control:
run a fresh `ejmlabs-security` pass on what changed before the PR merges.

## Owner setup, once

The deploy fails closed until the owner has done this. An agent never configures it and never
creates or pastes a token.

- Create the `staging` and `production` GitHub environments, each with a custom deployment
  branch policy that allows exactly one branch, `main`.
  `python3 scripts/set_deploy_token.py` in `ejmlabs/.github` creates them and stores the token
  below, for every site repository at once. Until then a deploy run fails at the protection step.
- Add the `CLOUDFLARE_API_TOKEN` secret to each environment: a token that can deploy Workers and
  custom domains on the ejmlabs Cloudflare account.
- If a DNS record for `staging.ejmlabs.com` already exists outside Wrangler, Wrangler prompts and
  CI cannot answer. Stop and give the owner the record to remove or adopt.

## Before you merge

Stop at the first failure. Build in a scratch directory, never from the local checkouts:
`../ejm-ui` and this repository's checkout are often on feature branches with uncommitted work,
which breaks the typecheck or skews the bundle. `HEAD_SHA` is the PR head.

```sh
work=$(mktemp -d)   # or the session scratch directory
git clone https://github.com/ejmlabs/ejmlabs.git "$work/ejmlabs"
git -C "$work/ejmlabs" checkout --detach HEAD_SHA
ui_rev=$(node -p "require('$work/ejmlabs/.github/ui-source.json').revision")
git clone https://github.com/ejmlabs/ejm-ui.git "$work/ejm-ui"
git -C "$work/ejm-ui" checkout --detach "$ui_rev"
(cd "$work/ejm-ui" && npm ci --ignore-scripts)
cd "$work/ejmlabs/site"
npm ci --ignore-scripts
npm run typecheck
npm test                    # builds dist, then checks every built route
npm run perf                # first contentful paint against perf-baseline.json; needs Chrome
find dist -type f | sort    # read the list before you merge
export WRANGLER_SEND_METRICS=false
npx wrangler deploy --config wrangler.jsonc --env "" --dry-run
npx wrangler deploy --config wrangler.jsonc --env staging --dry-run
```

Expect the pages, hashed assets, `_headers`, the theme script, icons and manifest, the
`design-kit/` image URLs, the two ZIPs, `install.sh`, `releases.json`, `robots.txt` and
`sitemap.xml`. Anything else (notes, generators, logs, `.env`) is a build bug: fix it on main,
never by deleting it from `dist`. A dry run checks configuration and packaging. It proves
nothing about permission or live behavior.

## After the merge

Do not run `wrangler deploy` from a workstation. Follow the run instead.

```sh
gh run list --workflow deploy.yml --branch main --limit 3
gh run watch RUN_ID --exit-status
```

- If a job fails, read its log, fix the cause on main through the gate, and rerun only for an
  infrastructure failure. If the protection step fails, the owner setup above is missing or
  wrong: report it and stop. If the token step fails, ask the owner to check
  `CLOUDFLARE_API_TOKEN`.
- Record the merge SHA, the ejm-ui pin, the run URL and the `Current Version ID` each deploy job
  prints.

## Verify live

Cloudflare bot protection answers curl and headless Chrome on HTML routes with a 403 "Just a
moment..." challenge. That is neither a pass nor a failure. Check HTML routes in a headed
browser: the user's Chrome through the browser extension, or a devtools driver started headed.

Check `https://staging.ejmlabs.com/` once the staging job finishes, and `https://ejmlabs.com/`
once the production job finishes.

- Each changed route shows the new copy (read it), at 375 px and desktop, light and dark, with an
  empty console. Links on changed pages go where they should.
- A missing route returns the 404 page with status 404.
- Machine routes are not challenged. `/ejmlabs-design-kit.zip` and `/ejmlabs-swag-kit.zip`
  return 200 to `curl -sSI`, and `curl -sS https://ejmlabs.com/install.sh | cmp - dist/install.sh`
  passes, as does the same check for `/releases.json`.
- Live headers match `dist/_headers` for each changed path. In the headed page, after the
  challenge, run
  `Object.fromEntries((await fetch(location.pathname, { cache: 'no-store' })).headers)`. Each
  header appears once with the built value; ignore `cf-ray`, `cf-cache-status` and `server`.
- `workers.dev` and preview URLs do not serve the site.
- Never weaken WAF, bot or Access rules to make a check pass.

## Roll back and report

- Redeploy an earlier Worker version in Cloudflare: the dashboard's Deployments tab, or
  `wrangler rollback VERSION_ID --config site/wrangler.jsonc --message "..."` with the owner's
  login. A bad staging deploy has its own Worker, `ejmlabs-staging`, so add `--env staging`.
  Pick the last verified version.
- Or land a revert on main through the gate. The revert deploys through the same path. After a
  Cloudflare rollback, land that revert too. Until it deploys, main and live differ; say so in
  the report.
- Report the merge SHA, the ejm-ui pin, the run URL, the new version id from each deploy job's
  log (and the previous one when you can read it in Cloudflare), each check and its result, and
  what you saw live and in which browser. Name what you did not check. Remove the scratch
  directory when the live check is done.
