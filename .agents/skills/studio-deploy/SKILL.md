---
name: studio-deploy
description: Use when you check, follow, roll back or verify a deploy of ejmlabs.com, including a local build against the pinned ejm-ui in a scratch directory, wrangler dry runs from site/, live checks behind Cloudflare bot protection, and comparing live headers with dist/_headers.
---

# Deploying ejmlabs.com

What is live must be a reviewed main commit, built from clean clones against the pinned ejm-ui,
and seen working in a headed browser. CI deploys it: a push to main deploys staging, then
production. How the pipeline runs, what it refuses, how it fails and the owner setup are in
[ci-deploys.md](../ejmlabs-cloudflare/references/ci-deploys.md). This adds the ejmlabs.com
specifics to `ejmlabs-cloudflare`; read it, that reference and its verify reference first.

## ejmlabs.com in the deploy

- Production is the Worker `ejmlabs` at `ejmlabs.com`. Staging is the Worker `ejmlabs-staging`
  at `staging.ejmlabs.com`. `site/wrangler.jsonc` configures both, staging under `env.staging`.
- The CI build checks out ejm-ui at the pin in `.github/ui-source.json`, then runs, from the
  repository root: `npm --prefix ../ejm-ui ci --ignore-scripts`,
  `npm --prefix site ci --ignore-scripts` and `npm --prefix site run build`. It uploads
  `site/wrangler.jsonc` and `site/dist`.
- The `preview` environment (`ejmlabs-preview`) is never deployed until its Access policy is
  enforced and verified at its real hostname (`site/SECURITY-OPERATIONS.md`).
- `install.sh`, `releases.json` and the checksums share this origin, so a merge is the control:
  run a fresh `ejmlabs-security` pass on what changed before the PR merges.

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
npx --no-install wrangler deploy --config wrangler.jsonc --env "" --dry-run
npx --no-install wrangler deploy --config wrangler.jsonc --env staging --dry-run
```

Expect the pages, hashed assets, `_headers`, the theme script, icons and manifest, the
`design-kit/` image URLs, the two ZIPs, `install.sh`, `releases.json`, `robots.txt` and
`sitemap.xml`. Anything else (notes, generators, logs, `.env`) is a build bug: fix it on main,
never by deleting it from `dist`. A dry run checks configuration and packaging. It proves
nothing about permission or live behavior.

## After the merge

Do not run `wrangler deploy` from a workstation. Follow the run and handle a failure as
[ci-deploys.md](../ejmlabs-cloudflare/references/ci-deploys.md) says, then check live below.

## Verify live

Cloudflare bot protection answers curl and headless Chrome on HTML routes with a 403 "Just a
moment..." challenge. That is neither a pass nor a failure. Check HTML routes in a headed
browser: the user's Chrome through the browser extension, or a devtools driver started headed.

Check `https://staging.ejmlabs.com/` once the staging job finishes, and `https://ejmlabs.com/`
once the production job finishes.

- Each changed route shows the new copy (read it), at 375 px and desktop, light and dark, with an
  empty console. Links on changed pages go where they should.
- A missing route returns the 404 page with status 404.
- On `ejmlabs.com`, machine routes are not challenged. `/ejmlabs-design-kit.zip` and
  `/ejmlabs-swag-kit.zip` return 200 to `curl -sSI`, and
  `curl -sS https://ejmlabs.com/install.sh | cmp - dist/install.sh` passes, as does the same
  check for `/releases.json`.
- On `staging.ejmlabs.com`, the machine routes are challenged too: `install.sh`,
  `releases.json`, both ZIPs and `sitemap.xml` answer curl with the 403 page. `robots.txt` and the
  hashed `/assets/*` files are not challenged. Check staging's pages and machine routes in the
  headed browser. To check from a terminal that staging serves the build, request a few
  `dist/assets/*` names from staging and compare their bytes with `dist`.
- Live headers match `dist/_headers` for each changed path. In the headed page, after the
  challenge, run
  `Object.fromEntries((await fetch(location.pathname, { cache: 'no-store' })).headers)`. Each
  header appears once with the built value; ignore `cf-ray`, `cf-cache-status` and `server`.
- `workers.dev` and preview URLs do not serve the site.
- Never weaken WAF, bot or Access rules to make a check pass.

## Roll back and report

- Redeploy an earlier Worker version in Cloudflare: the dashboard's Deployments tab, or
  `npx --no-install wrangler rollback VERSION_ID --config site/wrangler.jsonc --message "..."`
  with the owner's login, after `npm --prefix site ci --ignore-scripts` so it runs the pinned
  wrangler. A bad staging deploy has its own Worker, `ejmlabs-staging`, so add `--env staging`.
  Pick the last verified version. After a Cloudflare rollback, land a revert on main too, as
  [ci-deploys.md](../ejmlabs-cloudflare/references/ci-deploys.md) says.
- Report the merge SHA, the ejm-ui pin, the run URL, the new version id from each deploy job's
  log (and the previous one when you can read it in Cloudflare), each check and its result, and
  what you saw live and in which browser. Name what you did not check. Remove the scratch
  directory when the live check is done.
