# Design

## Context

The approved plan (`first-public-releases`, `design.md` Decisions 3, 4, 5 and 7) fixes the shape: GitHub Release assets for bytes, `releases.json` and `install.sh` on ejmlabs.com for hashes and the install path, and prefilled GitHub issue forms for feedback. This design records only the site decisions.

Captain's choices applied: version 0.1.0 (0.1.1 for ejm-harness and ejm-ide); files on GitHub Releases plus the static site; public npm packages for ejm-ui (shown only after the registry confirms them); issue forms plus a private advisory link; and, for signing, option B: macOS downloads wait for notarization, so Linux can ship and the IDE is held. The manifest therefore has no macOS or IDE entry until those exist, and the page says "waiting for notarization" for macOS and "Not yet available" for the IDE.

## Decisions

### 1. Manifest shape

```json
{
  "schemaVersion": 1,
  "artifacts": [
    {
      "product": "cli",
      "version": "0.1.0",
      "publishedAt": "2026-11-01T00:00:00Z",
      "target": "linux-x86_64",
      "filename": "ejm-cli-0.1.0-linux-x86_64.tar.gz",
      "url": "https://github.com/ejmlabs/ejm-cli/releases/download/v0.1.0/ejm-cli-0.1.0-linux-x86_64.tar.gz",
      "bytes": 1234,
      "sha256": "<64 hex>",
      "notarized": false
    }
  ]
}
```

Products are `cli`, `worker` and `ide`; targets are `darwin-aarch64`, `darwin-x86_64`, `linux-x86_64`, `windows-x86_64`. Field names follow the IDE distribution manifest, so a later move to R2 is a hosting change. An empty list is valid. `notarized` is optional and true only after a notarization run for that file is recorded; the installer prints its unsigned line, and the page its unsigned note and macOS Open Anyway steps, only for files not recorded as notarized (the steps only when a macOS file is listed). A product's version is the single version of its artifacts (a mixed version is rejected), which is the "version mismatch" case: the version in the URL tag and in the filename must equal `version`.

### 2. Validation lives in one module

`site/scripts/releases.mjs` exports `readReleases`, which validates and returns the list, and is used by both the build and the tests. It rejects a missing or malformed digest, a URL that is not `https://github.com/<owner>/<repo>/releases/download/v<version>/<filename>` on the repository that owns the product, a duplicate product and target, and a version that disagrees with the tag, filename or other artifacts of the product. One module means the build cannot accept what the tests reject.

### 3. Installer generated, not parsed

`site/scripts/install-sh.mjs` renders `install.sh` from the validated list. The script embeds one case per product, target and version. It parses no JSON. All code is inside one function called on the last line. It uses `curl --proto '=https' --tlsv1.2 -fsSL`, `mktemp -d` under `umask 077` with a `trap` for cleanup, `sha256sum` or `shasum -a 256` and fails closed when neither exists, an atomic `mv` into `$HOME/.local/bin`, and a PATH hint. It never uses `sudo`, edits a shell profile, sniffs glibc or runs the downloaded program. `--dry-run` prints the plan and changes nothing. The script is written to `dist/install.sh` by the build step. With an empty list it prints that no release is published yet and exits non-zero.

### 4. Download page from the same list

`Download.tsx` is a prerendered route reading the validated list through a build-time module. Rows are products, columns are platforms. A cell is a link with size and short hash when an artifact exists, "Waiting for notarization" for macOS Apple silicon command-line builds while the manifest has no macOS entry, and "Not yet available" otherwise (including Linux until it is listed), with no link or date. The ejm-ui row shows its `npm install` line only when a constant in `src/releases.ts` is set after `npm view` confirms the packages; it starts false. Install lines use a small `CopyLine` component (shared `CommandLines`, `Button` and the `@ejm/core` copy state) whose Copy button appears when the page hydrates, so no script is added. The docs `CodeBlockFrame` and `DocTable` are not used: the site's style profile does not include the docs styles, and the matrix is a `Facts` list per product. The page has no form and no inline script, and its links to GitHub are navigation.

The page states the Linux baseline: glibc 2.39 or newer (for example Ubuntu 24.04 or Debian 13), `libdbus-1` for ejm-cli and a Secret Service for its stored sign-in. Update it if a release is built on an older image.

### 5. Product text

`content.ts` keeps "Build from source" for each product and replaces it with an install pointer to `/download/` only when `releases.json` has an artifact for that product (the ui exception above). With an empty list nothing changes on the project pages.

### 6. Feedback links

For each product the page and the project page link to `<repo>/issues/new?template=bug.yml`, `.../feature.yml` and `<repo>/security/advisories/new`. When the page knows a version and platform it appends `evidence=` with only those two values, URL-encoded. The site reads nothing from the visitor. A test asserts each href has that shape and that no query key other than `template` and `evidence` appears.

### 7. Release-asset URL test

A build test fails when any listed URL is not `https://github.com/ejmlabs/<repo>/releases/download/v<version>/<file>` with the repository that owns the product (`cli` to ejm-cli, `worker` to ejm-harness, `ide` to ejm-ide).

## Risks

- A script and its hashes share an origin, so a compromise of ejmlabs.com is not caught by the checksum. The page says so and shows the manual path.
- The copy script is new client code. It is a small external file with no network access.
