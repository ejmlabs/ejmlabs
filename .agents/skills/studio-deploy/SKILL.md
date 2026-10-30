---
name: studio-deploy
description: Use when you deploy, dry-run, roll back or verify ejmlabs.com, including building the merge commit against the pinned ejm-ui in a scratch directory, wrangler deploy from site/, live checks behind Cloudflare bot protection, and comparing live headers with dist/_headers.
---

# Deploying ejmlabs.com

What is live must be a reviewed main commit, built from clean clones against the pinned ejm-ui,
deployed from the merge commit, and seen working in a headed browser. This adds the
ejmlabs.com specifics to `ejmlabs-cloudflare`; read it and its build, deploy and verify
references first.

## Before you deploy

- Deploy as soon as the PR merges, without asking again (finish through ship). Stop and report
  only when a check fails, Wrangler is not logged in, or Wrangler asks to replace a DNS record.
- Deploy only a merge commit on main whose PR passed `/ready` and `/approve`. Read it with
  `gh pr view N --json mergeCommit --jq .mergeCommit.oid`.
- `install.sh`, `releases.json` and the checksums share this origin, so the deploy is the
  control: deploy a named main revision after a fresh `ejmlabs-security` pass on what changed.
- Worker `ejmlabs`, config `site/wrangler.jsonc`, custom domain `ejmlabs.com`. The `preview`
  environment (`ejmlabs-preview`) stays undeployed until its Access policy is enforced and
  verified at its real hostname (`site/SECURITY-OPERATIONS.md`).
- wrangler is not pinned in `site/package.json` yet. Use wrangler 4 from PATH and record
  `wrangler --version` in the report.

## Build in a scratch directory

Never build from the local checkouts. `../ejm-ui` and this repository's own checkout are often
on feature branches with uncommitted work, which breaks the typecheck or skews the bundle.
`MERGE_SHA` is the full merge commit.

```sh
work=$(mktemp -d)   # or the session scratch directory
git clone https://github.com/ejmlabs/ejmlabs.git "$work/ejmlabs"
git -C "$work/ejmlabs" checkout --detach MERGE_SHA
ui_rev=$(node -p "require('$work/ejmlabs/.github/ui-source.json').revision")
git clone https://github.com/ejmlabs/ejm-ui.git "$work/ejm-ui"
git -C "$work/ejm-ui" checkout --detach "$ui_rev"
(cd "$work/ejm-ui" && npm ci --ignore-scripts)
cd "$work/ejmlabs/site"
npm ci --ignore-scripts
npm run typecheck
npm test                    # builds dist, then checks every built route
npm run perf                # first contentful paint against perf-baseline.json; needs Chrome
find dist -type f | sort    # read the list before you deploy it
```

Stop at the first failure. Expect the pages, hashed assets, `_headers`, the theme script, icons
and manifest, the `design-kit/` image URLs, the two ZIPs, `install.sh`, `releases.json`,
`robots.txt` and `sitemap.xml`. Anything else (notes, generators, logs, `.env`) is a build bug:
fix it on main, never by deleting it from `dist`.

## Deploy

From `site/` in the scratch clone:

```sh
export WRANGLER_SEND_METRICS=false
wrangler deployments list --config wrangler.jsonc       # record the live version id
wrangler deploy --config wrangler.jsonc --env "" --dry-run
wrangler deploy --config wrangler.jsonc --env ""
```

Record the `Current Version ID` wrangler prints. If wrangler is not logged in, or asks to
replace a DNS record, stop and hand the user the command to run (see `ejmlabs-cloudflare`).

## Verify live

Cloudflare bot protection answers curl and headless Chrome on HTML routes with a 403 "Just a
moment..." challenge. That is neither a pass nor a failure. Check HTML routes in a headed
browser: the user's Chrome through the browser extension, or a devtools driver started headed.

- Each changed route on `https://ejmlabs.com/` shows the new copy (read it), at 375 px and
  desktop, light and dark, with an empty console. Links on changed pages go where they should.
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

- Roll back with `wrangler rollback VERSION_ID --config wrangler.jsonc --message "..."` to the
  last verified version, under the same owner request. Then land a revert on main through the
  gate and deploy it, so main matches live.
- Report the merge SHA, the ejm-ui pin, the wrangler version, the previous and new version ids,
  each check and its result, and what you saw live and in which browser. Name what you did not
  check. Remove the scratch directory when the live check is done.
