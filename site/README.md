# ejmlabs.com

The studio site. A single page built only from the design kit's site classes, with no CSS of its own. The page is `src/index.html`.

## Local preview

```sh
cd site
npm run build
npm run preview
```

Open [the site](http://127.0.0.1:4827/). The brand kit is at `/design-kit/`, the application kit at `/design-kit/ui/`, and the ZIP at `/ejmlabs-design-kit.zip`.

There are no dependencies to install. `npm run build` needs Node and the `zip` command.

## Files

- `src/index.html` is the page. Edit copy and structure here.
- `src/_headers` sets Cloudflare response headers. Files revalidate because their names are not versioned.
- `scripts/build.mjs` regenerates the kit's theme files, then assembles `dist/` from `src/`, the whole `../design-kit/` folder and a fresh ZIP.
- `dist/` is generated. Never edit it.
- `test/site.test.mjs` guards the rules in `../design-kit/SITES.md`.
- `wrangler.jsonc` configures Cloudflare Workers static assets, the apex domain, and a separate preview environment.

## Changing the look

The look lives in the kit, not here, so every ejmlabs site stays the same. To change a pattern, edit `../design-kit/web/site.css`. To change colors, edit `../design-kit/ui/theme.json`. Then rebuild.

## Checks

```sh
npm test
npm run build
wrangler deploy --config wrangler.jsonc --env "" --dry-run
wrangler deploy --config wrangler.jsonc --env preview --dry-run
```

The test checks that the generated theme files are current and keep their contrast, that every local link and anchor resolves, that headings are in order with one `h1`, that images have `alt`, that the page loads only the three kit style sheets, and that there are no em dashes. Dry runs check the Worker configuration without uploading files or changing DNS.

## Shared workflow updates

Keep reusable workflow callers pinned to full 40-character commit SHAs. Before changing a caller, retain that exact implementation commit in `ejmlabs/.github` under `workflow-pins/FULL_SHA`. Verify that the shared repository's rules block updates and deletion of that reference with no bypass actors. Follow the [shared rollout runbook](https://github.com/ejmlabs/.github/blob/ad29c94d9be09ddd4b18d037657f088eeafc26e8/docs/operations.md#bootstrap-and-rollout).

## Cloudflare hosting

The canonical address is [ejmlabs.com](https://ejmlabs.com/). Cloudflare serves the whole site, the kit and the ZIP. The verified Cloudflare account is `478a0db3a110d8503c16abbc1db27af4`; the existing apex zone is active.

Run publishing commands in an interactive terminal with a TTY. Wrangler checks custom-domain conflicts and asks before replacing existing DNS in a TTY. In noninteractive mode it can override those conflicts automatically.

To publish a preview after review:

```sh
npm run build
wrangler deploy --config wrangler.jsonc --env preview
```

The preview uses a separate `ejmlabs-preview` Worker at its `workers.dev` address. Its route list is empty, so it does not attach `ejmlabs.com`.

To publish to the apex domain:

```sh
npm run build
wrangler deploy --config wrangler.jsonc --env ""
```

After deployment, check the home page, `/design-kit/`, `/design-kit/ui/`, `/ejmlabs-design-kit.zip` and the response headers over HTTPS.
