# Proposal

## Why

ejm-cli, ejm-harness, ejm-ide and ejm-ui are public source, but none can be installed. Each repository's `README.md` says to build from source, the site says "Installers and package-manager releases are not available yet", and `RELEASING.md` records that setup created no product tag, installer or registry publication. Visitors cannot get the tools, and have no short route to report a bug.

Everett asked (2026-10-26) to package the four products as a first release, put a download or install line for each supported platform on ejmlabs.com, keep installing to one command or one click, and add an easy way to send feedback and bug reports, without overstating signing or notarization.

## What Changes

- Plan one first public release per product, with a version and tag plan per repository. The requested version is 0.0.1, but every repository's `VERSION`, manifests and changelog already say 0.1.0, and `ejm-harness` and `ejm-ide` already have a `v0.1.0` tag. This is **Decision 1** in `design.md`, with a recommendation.
- Offer a platform only when a native build and smoke test exist for it. Today that is, at most, CLI and worker on macOS Apple silicon and Linux x86_64, and the IDE on macOS Apple silicon only. Other targets are listed as "not yet" with no download.
- Host release files as GitHub Release assets, with a SHA-256 list per release, and publish the checksums a second way from ejmlabs.com. ejmlabs.com serves a download page, one install script and a `releases.json`. No R2 bucket or new Worker is needed for the first release. R2 behind a Worker stays a documented upgrade.
- Give each product one install line or one click: a shell installer for CLI and worker, a `.dmg` link for the IDE, `npm` and `pip` lines for the harness SDKs, and an `npm` line for the UI packages once published.
- Add feedback through prefilled GitHub issue forms linked from the download page and each product section. A small Worker form is specified as an option and is not part of the recommended scope.
- Say plainly that builds are unsigned and not notarized, and show how to verify the checksum and open an unsigned app. Make no signing, notarization or security-audit claim beyond `RELEASING.md`.
- Plan ejm-ui as public npm packages under the `@ejm` scope (six of the eight, with provenance), gated on npm scope ownership and a brand-asset rights decision. `@ejm/ink`, `@ejm/shots` and the `ejm-tui` crate stay private.

## Capabilities

### New Capabilities

- `release-downloads`: Versioned release files, checksums, per-platform install paths, the download page and its honest unsigned-build copy.
- `feedback-intake`: A short, privacy-minimal route to send feedback and bug reports.
- `ui-package-distribution`: Which ejm-ui packages are public, how they are versioned and published, and the install line.

### Modified Capabilities

None. `openspec/specs/` is empty on main, so there is no baseline requirement to modify.

## Impact

This is a planning change. It edits no site code, workflow, manifest, tag or remote resource. On apply, the ejmlabs site gains a download page, `install.sh`, `releases.json` and issue links, and each product repository gains a binary-build workflow and release metadata. Those edits happen in each repository under its own reviewed PR and its own OpenSpec change.

Everything that writes to GitHub (tags, draft releases, workflow PRs, issue-form edits) is on hold pending the `gh` login decision. Tags, release publishing, npm and PyPI credentials, any R2 bucket, DNS, Turnstile keys and deploys need Everett. `tasks.md` marks each one.

Out of scope: signing and notarization work, crates.io publishing, a package registry for the harness extension system, Windows and macOS Intel builds, Linux IDE support, analytics beyond the existing site analytics, and any deploy.
