# Proposal

## Why

ejm-cli, ejm-harness, ejm-ide and ejm-ui are public source, but visitors cannot install them from ejmlabs.com. The site says "Build from source. Installers ... are not available yet" and offers no short route to report a bug. The first public releases (plan: change `first-public-releases` on branch `ejm/release-001-plan`, tasks 4.1 to 4.6 and 4.8) need a place on the site to publish file hashes, an install command and report links, without claiming signing or notarization that has not happened.

This change is the site's part of that plan. The plan's product-repository work and release workflows are separate changes in their own repositories, and the plan change lands with them. This repository gets its own change, so the site can be reviewed and deployed on its own.

## What Changes

- Add `site/public/releases.json`, the one list of released files with their versions, URLs, sizes and SHA-256 digests. It is empty until a release is published, and a test rejects a malformed list.
- Generate `install.sh` (POSIX `sh`) at build time from `releases.json`, so the script embeds its URLs and digests and fetches no manifest.
- Add a `/download/` page generated from the same list: platform matrix, install lines with copy buttons, a verify section, the unsigned note and report links. It adds no inline script, form or origin.
- Link the page from the header and show each project's install text only for products with a release. Products without a release keep the build-from-source text.
- Link "Report a bug", "Send feedback" and a private security report per product to the product's GitHub issue forms and advisory form, with version and platform only in the `evidence` field.
- Update the Privacy page and `site/SECURITY-OPERATIONS.md` with what the download and feedback paths touch.
- Add build tests: a manifest check, an installer check with shellcheck and fixtures, and a check that every listed URL is a versioned release asset on the owning repository.

Out of scope: building or attaching release files, release workflows, npm publishing, the product sites (`cli.`, `ide.`, `harness.`), a feedback form of our own, and any push, tag or deploy.

## Capabilities

### New Capabilities

- `release-downloads`: Download, install and verify a released ejm product from ejmlabs.com for a platform that has a build.
- `feedback-intake`: Reach each product's issue forms and private security report from the site, with minimal data.

### Modified Capabilities

None. `openspec/specs/` holds no baseline for these.

## Impact

`site/` gains `public/releases.json`, a build step, `src/pages/Download.tsx`, a copy script and tests. The shared headers stay unchanged. No production behavior changes until a reviewed deploy, and with an empty manifest the page offers no downloads.
