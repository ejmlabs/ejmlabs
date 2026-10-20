# ejmlabs.com

The studio site. The current single page uses the retained design kit's site classes, with no CSS of its own. The page is `src/index.html`.

## Local preview

```sh
cd site
npm run build
npm run preview
```

Open [the site](http://127.0.0.1:4827/). The brand kit is at `/design-kit/` and the application kit at `/design-kit/ui/`. Kit ZIP downloads, X kit pages, and the swag gallery are retired.

There are no site dependencies to install. `npm run build` needs Node. Shared
CI also installs the separately pinned public UI workspace with lifecycle
scripts disabled; these local commands still use the retained kit.

## Files

- `src/index.html` is the page. Edit copy and structure here.
- `../design-kit/web/_headers` supplies the emitted Cloudflare response headers, replacing `src/_headers` during the build. Files revalidate because their names are not versioned.
- `scripts/build.mjs` regenerates the kit's theme files, then assembles `dist/` from `src/` and the retained `../design-kit/` paths. It excludes ZIP files, the X kit subtree, and the swag subtree. It creates no archives.
- `dist/` is generated. Never edit it.
- `test/site.test.mjs` guards the rules in `../design-kit/SITES.md`.
- `wrangler.jsonc` configures Cloudflare Workers static assets, the apex domain, and a separate preview environment.

## Shared UI ownership

`ejm-ui` owns active UI tokens, reusable components, and shared site infrastructure. Studio owns this page's content, discovery, brand guidance, and download assembly. Make shared changes in the owner and adopt its public `@ejm/*` exports here.

The current build still reads `../design-kit/`, including its CSS, theme source, scripts, fonts, icons, motifs, and headers. Keep those live files until verified public owner assembly and Studio adoption replace them. Both X kit copies and the swag files are removed. Track the remaining work in the [cleanup plan](../openspec/changes/retire-kits-and-internal-briefs/design.md) and [tasks](../openspec/changes/retire-kits-and-internal-briefs/tasks.md). Preserve needed brand source, provenance, and font notices when retiring the kit directories.

## Checks

```sh
node ../scripts/check.mjs
npm test
npm run build
wrangler deploy --config wrangler.jsonc --env "" --dry-run
wrangler deploy --config wrangler.jsonc --env preview --dry-run
```

The Studio-owned `node ../scripts/check.mjs` entry temporarily calls the retained kit checker. The tests use it to check that the generated theme files are current and keep their contrast. They build the output, check the home page and brand gallery links, anchors, headings, image descriptions, and kit styles, then verify retired paths are absent. They compare copied runtime assets, font notices, and response headers with their source bytes. See [local check entry](../README.md#local-check-entry) for the ownership boundary and when the temporary import can be removed. These local checks do not verify browser rendering or the deployed site. Dry runs check the Worker configuration without uploading files or changing DNS.

## Shared workflow updates

The PR caller, draft-release caller, and release `standards-ref` pin shared
`6717b433c462e01abaed86e2118e4843827598cb`. They rotate together from
`aa4144fa978d711a5e009b384718b4cf27cf87bf`. The canonical old/new source pair
and its blob/hash manifest are [static review data](../.github/review-context/manifest.json),
not executable project inputs. Builds and checks must never import them.

[The UI source manifest](../.github/ui-source.json) fixes repository
`ejmlabs/ejm-ui` at public commit
`7cf86428d0266297901ee52d0e137df100f8c23d`. Trusted preparation reads this pin
from protected base, validates proposed metadata separately, and hands the
exact UI archive and context to credential-free jobs. When that archive exists,
Quality runs `npm --prefix ../ejm-ui ci --ignore-scripts` before the Studio
entry, site tests, and site build. No private source token is needed.

The installation PR's old trusted-base packet had no UI archive. Separate
[UI install review context](../review/dependency-sources/ejm-ui/README.md)
therefore supplies the exact pinned root manifest, full lockfile, all ten
workspace manifests, and owner license with Git identities and SHA-256 values.
These ordinary nonexecutable snapshots let reviewers assess the dependency
install boundary. They are never imported, executed, or packaged as shared
code. They establish neither an actual install nor a dependency advisory audit.

[PR #9](https://github.com/ejmlabs/ejmlabs/pull/9) installed these pins. Its run
used the previous protected caller. A fresh admitted PR must now verify the
installed caller, UI selection from protected base, exact source archive and
review context, both complete AI reviews, and all protected checks. Keep task
3.3 open until that hosted evidence passes. Preserve every runtime file and all
six live font files through this verification. Later full-font adoption must
use `@ejm/tokens/assets/fonts/*` from the pinned public owner source, retain the
existing `/design-kit/fonts/*` URLs and notice bytes, and pass owner and Studio
checks. The separate `@ejm/ui/fonts/*` exports are smaller subset fonts.

For each caller update, retain the exact implementation in `ejmlabs/.github`
under `workflow-pins/FULL_SHA`, verify update/deletion protection with no bypass
actors, and replace the bounded canonical review pair in the same PR. Follow
the [shared source contract](https://github.com/ejmlabs/.github/blob/6717b433c462e01abaed86e2118e4843827598cb/docs/operations.md#public-ui-source-assembly)
and [rollout runbook](https://github.com/ejmlabs/.github/blob/6717b433c462e01abaed86e2118e4843827598cb/docs/operations.md#bootstrap-and-rollout).
Local source checks establish no hosted execution or site publication.

## Cloudflare hosting

The canonical address is [ejmlabs.com](https://ejmlabs.com/). The build prepares the site and retained live kit for Cloudflare. It no longer emits kit archives, X kit pages, or swag resources. This local cleanup does not establish their current deployed availability. The verified Cloudflare account is `478a0db3a110d8503c16abbc1db27af4`; the existing apex zone is active.

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

After deployment, check the home page, `/design-kit/`, `/design-kit/ui/`, and the response headers over HTTPS. Confirm retired archive, X kit, and swag paths are unavailable. Record browser and publication results separately from local build checks.
