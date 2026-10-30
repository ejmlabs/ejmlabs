# Downloads, brand kit and design kit

Read this before you change what ejmlabs.com offers for download or what a download contains.

## The release list

- `site/public/releases.json` lists every released file: product, version, target, GitHub
  release-asset URL, size and SHA-256. It is empty until a product publishes a release.
- `site/scripts/releases.mjs` validates it and the build stops on a bad list: HTTPS only, a
  digest on every file, no duplicate target, one version per product, and a versioned asset URL
  on the repository that owns the product.
- The Download page, `dist/releases.json`, `dist/install.sh` and each project's "get started"
  text all read this one list. The page offers no file until one is listed.
- List a release only after its GitHub release is published and you have checked each asset's
  size and SHA-256. Never replace a listed file (list a new version), and never add a fake
  entry to test the page.

## install.sh

- `site/scripts/install-sh.mjs` renders `site/scripts/install.template.sh` from the list. Edit
  the template, never `dist/install.sh`. Follow `ejmlabs-shell` for the script.
- `site/test/install.test.mjs` runs it against fixtures: the digest check, truncated or failed
  downloads install nothing, unknown arguments are refused, `--dry-run` changes nothing, and
  shellcheck passes on a listed and an empty list. Add a fixture for each new behavior.
- The script sends no telemetry and contacts only GitHub. The script and the checksums it
  checks share this origin, so treat any change to either as security relevant: run an
  `ejmlabs-security` pass and say so in the PR.

## Report links and data

- Report links open each product's GitHub issue forms and private security report form. The
  only value a link may carry is the released version, in the form's `evidence` field.
- The site keeps nothing beyond its visit counts, and adds no endpoint, store or CSP origin for
  downloads or reports. Keep the Privacy page and `site/SECURITY-OPERATIONS.md` in step with
  any change to what these paths touch.

## Brand and swag ZIPs

- `site/scripts/build.mjs` assembles `ejmlabs-design-kit.zip` and `ejmlabs-swag-kit.zip` from
  named file lists, so internal material cannot enter a ZIP by appearing in a folder. Add a file
  by name. Never copy a whole folder into a ZIP.
- Brand files resolve through the public `@ejm/tokens/assets/*` exports. The swag masters and
  three concept previews come from `design-kit/swag/`. Guides and rights come from
  `site/brand-kit/`, with the root `LICENSE` and the original font notices unchanged.
- Internal notes, comparisons, generators, HTML, image prompts and nested archives never ship.
  `site/test/site.test.mjs` checks ZIP contents; extend it when you add a file.
- Swag images are concepts, not products for sale. Brand artwork keeps its own rights; the
  software licenses do not cover the marks.

## design-kit/

- A retained working reference from before ejm-ui. It is not a source of active UI primitives,
  tokens or assets, and is not copied into the site as a playbook. Active UI and brand files
  come from ejm-ui.
- Studio keeps the swag masters in `design-kit/swag/artwork/` and the previews in
  `design-kit/swag/mockups/`. The swag ZIP copies them by name.
