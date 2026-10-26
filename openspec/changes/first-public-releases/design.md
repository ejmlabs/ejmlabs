# Design

## Context

Evidence read on 2026-10-26 from the local clones (read-only):

- **Versions.** `ejm-cli`, `ejm-harness`, `ejm-ide` and `ejm-ui` all have `VERSION` `0.1.0` and a dated `## [0.1.0]` changelog section (Oct 18-19). `ejm-harness` and `ejm-ide` each have a local tag `v0.1.0` (on their "prepare 0.1.0 source release notes" commits). `ejm-cli` and `ejm-ui` have no tag. Whether those tags exist on the remote, and whether a draft release exists, cannot be read until `gh` is logged in.
- **Release workflow.** Every product's `release.yml` is "Draft source release", a manual run that calls `ejmlabs/.github` `draft-release.yml` at a pinned SHA. It validates main ancestry, version and notes, refuses an existing tag, and drafts a release with source archives, SHA-256 checksums and a provenance manifest. No repository builds a binary, installer or package.
- **`RELEASING.md`** (identical in all repositories, and here): source archives "are not signed installers or a package registry publication"; native binaries "need platform builds, code signing/notarization where relevant, and smoke tests"; npm, PyPI and crates.io publishing need "separate scoped credentials and explicit release gates"; "Do not claim these artifacts exist until they have been built and verified"; never move a tag or replace assets.
- **Signing state.** Nothing is signed or notarized. The IDE doc (`docs/distribution.md`) lists macOS signing and notarization and Windows signing as unmet gates. No repository records a signing identity or a notarization run.
- **Cloudflare today.** This site is a static-assets Worker on `ejmlabs.com` (`site/wrangler.jsonc`, no `main`, no bindings). `ide.ejmlabs.com` has a Worker with a private R2 bucket `ejmlabs-ide-releases`, a `releases/latest.json` manifest, digest-bound download URLs and a publisher script, all merged in source and deployed with an intentionally empty manifest. `cli.` and `harness.` are static sites. Shared CSP (`@ejm/site` `headers.mjs`): `default-src 'self'`, `form-action 'none'`, `connect-src 'self'` plus the analytics beacon, no inline script.
- **Feedback today.** Each product has `ISSUE_TEMPLATE/bug.yml`, `feature.yml` and `config.yml` (`blank_issues_enabled: false`, a private security-advisory contact link) and a `SUPPORT.md` that points at GitHub issues. The site has no feedback link.
- **ejm-ui.** Eight workspace packages, all `private: true`, `0.1.0`, with exact intra-repo pins (`"@ejm/core": "0.1.0"`). They ship TypeScript source. `scripts/pack-proof.mjs` builds a starter from six tarballs with no links. `ADOPTION.md` and the README say consumers use sibling `file:` links today and that registry publication needs separate approval. This site uses those links (`site/package.json`). The local `ejm-chess` clone has only a base commit and no manifest, so its link use could not be checked; the brief's statement is taken as given. The `LICENSE` is MIT for software, with brand artwork and the ejmlabs name reserved, and fonts under OFL.

## Goals / Non-Goals

**Goals:** a truthful first release of each product; one command or click per offered platform; checksums a visitor can verify; a short feedback route; minimal personal data; no cost or credential beyond what Everett approves; a plan that survives the version decision.

**Non-Goals:** signing, notarization, auto-update, crates.io, an extension registry, Windows or Intel macOS or Linux IDE builds, a telemetry system, deployment.

## Decision 1. Version: 0.0.1 vs 0.1.0 (needs Everett)

| Option | What it takes | Consequences |
| --- | --- | --- |
| **A. Release 0.1.0 (recommended)** | No version edits. Run the existing draft flow for `ejm-cli` and `ejm-ui`; for `ejm-harness` and `ejm-ide` use the existing `v0.1.0` tag if it is on the remote and its tree is the intended one, otherwise decide a new version. | Matches every manifest, changelog and tag. SemVer stays monotonic. Pre-1.0 already signals "early". |
| B. Release 0.0.1 as asked | Lower `VERSION`, `Cargo.toml` (workspace, plus the exact pins in `ejm-cli`), `package.json`, `tauri.conf.json`, `pyproject.toml`, ui's exact `@ejm/*` pins and lockfiles in four repositories; rewrite the dated changelog section. Local `v0.1.0` tags remain, and a tag the remote already holds is immutable. | Version goes backwards, `v0.0.1` is created after `v0.1.0`, and any later tool that sorts by SemVer prefers the withdrawn one. Four more PRs before any release. |
| C. Call the release "0.0.1" only on the site | None | Rejected. The site would name a version no tag, manifest or file carries. |

Everything below uses `<V>` for the chosen version. The tag is `v<V>`, created only by the draft-release workflow run by a human maintainer from a merged main commit. This change never creates a tag.

## Decision 2. Platform matrix

A target is offered only after a native build **and** a smoke run of the built artifact. Evidence today, from the repositories:

| Product | macOS Apple silicon | macOS Intel | Linux x86_64 | Windows x86_64 |
| --- | --- | --- | --- | --- |
| ejm-cli (Rust binary) | Candidate. Local macOS arm64 gate and hosted macOS quality passed (see `docs/native-remote-publication.md`). | Not built. No evidence. | Candidate. Hosted Linux quality passed. Needs libdbus at build time and a Secret Service at runtime for stored credentials. | Not offered. Docs say Windows needs separate terminal evidence. |
| ejm-harness (`ejm-harness-worker` binary, plus SDKs) | Candidate. Local macOS arm64 gate only. | Not built. | Candidate. Linux procfs path needs native acceptance. | Not offered. Job-object code exists but "native Windows acceptance is still required". |
| ejm-ide (Tauri app) | **Only target.** `tauri.conf.json` bundles `app` and `dmg`, and its resources name the `darwin-arm64` esbuild and biome binaries. | Not offered. Needs Intel resources and a bundle test. | Not offered. glib 0.18.5 (RUSTSEC-2024-0429) via GTK; docs say Linux stays unsupported until upgraded. | Not offered. No bundle target, icon or resources. |
| ejm-ui | Platform independent npm packages. Needs Node 22.12 or later. | same | same | same |

"Candidate" means the first release proposes it and the work in `tasks.md` group 3 must pass its smoke test or the target is dropped from that release. The site never lists a target without an artifact: it shows "Not yet available" with no link and no estimate.

Page order is by what a person has: the platform is detected only to highlight a row, never to hide the others.

## Decision 3. Where files live and how they are served

| Option | Files | Install host | Cost and effort | Fit |
| --- | --- | --- | --- | --- |
| **A. GitHub Releases + static site (recommended)** | Release assets in each repository's published release, produced by the existing draft flow plus a binary build job. Hashes also in `releases.json` on ejmlabs.com. | `ejmlabs.com/install.sh`, `/releases.json` as static assets | No new Cloudflare resource, no egress bill, no credential. Immutable by GitHub's release rules. | Smallest change. Fits `RELEASING.md` (immutable tag, never replace assets). Depends on GitHub for bytes. |
| B. R2 behind a Worker for everything | Private R2 bucket, content-addressed keys, manifest, digest-bound URLs, as already built in `ejm-ide/distribution/`. | A Worker route on `ejmlabs.com` (`/dl/*`) | Bucket, Worker deploy, publisher credentials, retention rules. R2 has no egress fee; storage and operations have a free tier and are then billed (verify current pricing before choosing). | Gives vanity URLs, range and cache control, and one host. Larger blast radius, and every release needs a Cloudflare write. |
| C. Both: GitHub as source of truth, R2 as a mirror | A + a mirror job | Worker | Highest | Not justified at 0.x. |

Why A: it needs no resource Everett has not already got, keeps the release immutable the way `RELEASING.md` demands, and makes the second trust channel (hashes from ejmlabs.com, bytes from GitHub) free. The existing IDE Worker and its manifest contract stay dormant and unchanged. The `releases.json` schema reuses its field names (`schemaVersion`, `version`, `publishedAt`, `artifacts[].target`, `filename`, `bytes`, `sha256`) and target names (`darwin-aarch64`, `darwin-x86_64`, `linux-x86_64`, `windows-x86_64`) and adds `product` and `url`, so a later move to B is a hosting change, not a format change. Upgrade trigger for B: GitHub rate limits or outages hurt installs, or Everett wants one stable host.

URL rules: every file URL names its version (`.../releases/download/v<V>/<file>`). There is no "latest" file URL in copy. The "latest pointer" is `releases.json` plus the page, which change only by a reviewed site PR deployed from main. Page and manifest are served with the site's existing revalidating cache headers; the hashed or versioned file URLs are immutable.

## Decision 4. Install flow per product

One script serves both command-line products, kept short enough to read.

```sh
curl -fsSL https://ejmlabs.com/install.sh | sh -s -- cli      # ejm-cli
curl -fsSL https://ejmlabs.com/install.sh | sh -s -- worker   # ejm-harness-worker
```

`install.sh` is POSIX `sh`, and it: detects OS and CPU and exits with a plain message for any target not in `releases.json`; fetches `https://ejmlabs.com/releases.json`; downloads the archive for that product, target and version from the GitHub release URL; verifies SHA-256 against the value in `releases.json` and aborts on mismatch; installs under `$HOME/.local/bin` without `sudo` or shell-profile edits; prints the installed version, the install path, and that the build is unsigned. `--dry-run` prints what it would do. It never runs the downloaded program. The page also shows the same steps as manual download and `shasum -a 256 -c` for anyone who will not pipe a script.

| Product | One command or click | Notes |
| --- | --- | --- |
| ejm-cli | the `install.sh ... cli` line above | Windows: not offered until a build and smoke test exist. `cargo install` is not offered: the crate depends on sibling path crates. |
| ejm-harness worker | `install.sh ... worker`, then `npm install ejm-harness` or `pip install ejm-harness` for the SDK | The SDKs do not download a worker; docs say so. Set `EJM_HARNESS_WORKER_PATH` or use `PATH`. |
| ejm-harness SDKs | `npm install ejm-harness`, `pip install ejm-harness` | Pure SDK packages. Publishing needs Everett's npm and PyPI accounts and `ejm-harness` name availability (not checked). If either name is unavailable, ship only the worker and say how to install the SDK from the release asset. |
| ejm-ide | one click: the `.dmg` link for macOS Apple silicon | Checksum shown beside the link. Open-an-unsigned-app steps below it. |
| ejm-ui | `npm install @ejm/ui @ejm/tokens react react-dom` | See Decision 6. |

**Unsigned-build copy** (the only statement allowed until a signing run is recorded in a repository's `RELEASING.md` or release notes): "These builds are not code-signed or notarized. macOS or your system may warn before opening them. The SHA-256 checksum lets you confirm you received the file we published; it does not prove who built it." macOS steps: open from Finder with Control-click then Open, or Privacy and Security, Open Anyway. No `xattr` or `sudo` tip is given. If signing or notarization is later completed for a platform, copy changes only in the release that records it.

The provenance manifest from the draft flow is described as "build provenance", never as a signature.

## Decision 5. Download page and CSP

A new `Download` page (`/download/`) in `site/src/pages`, linked from the header and from each project's `facts` ("get started"), replacing the text "Build from source. Installers ... not available yet" only when that product has a release. Layout, in order: a platform matrix (rows are products, columns are platforms, cells are a link with size and short hash or "Not yet"), the install lines with a copy button, a "Verify your download" section, the unsigned note, and "Report a problem".

The page reads `releases.json` at build time, so the HTML needs no client fetch; `install.sh` fetches it at run time. A copy button uses the clipboard API from an external script already allowed by `script-src 'self'`; no inline script is added.

CSP: no change for the recommended scope. Links to `github.com` are navigation, not a fetch. `form-action 'none'` stays. A feedback form (Decision 7 option B) would add `form-action 'self'`, `connect-src` unchanged (`'self'`), `script-src` and `frame-src` `https://challenges.cloudflare.com`, in the shared `@ejm/site` headers option, not only on this site.

The `Privacy` page is updated to say what the download and feedback paths touch (below). Copy says "lab", never "studio". It names no AI vendor, model or agent. Platform and host names that visitors need (macOS, Windows, Linux, GitHub, npm, PyPI) are used as plain words.

## Decision 6. ejm-ui form

| Option | Form | Consequences |
| --- | --- | --- |
| **A. Public npm packages under `@ejm` (recommended, gated)** | Publish `@ejm/tokens`, `core`, `ui`, `ssg`, `site`, `demos` (the six the pack proof already covers), same version `<V>`, with npm provenance from a GitHub Actions publish job. Keep `ink`, `shots`, `gallery`, examples and `ejm-tui` private. | Conventional install line. Intra-repo pins are already exact, so one version moves together. Packages ship TypeScript source, so they are for Vite and Node 22.12 or later consumers and the docs must say so. |
| B. Downloadable kit | Attach the six `npm pack` tarballs and checksums to the GitHub release; install with `npm install ./file.tgz` or a release URL. | No registry account. Clumsy updates, no provenance. Good fallback and the first step if A is gated. |
| C. Stay source-linked | Keep `file:` sibling links. | Status quo. Rejected as the answer to "package it". |

Gates for A, both Everett's: (1) own the `@ejm` npm organization (availability not checked; if taken, pick another scope and rename before publishing, since names cannot be reused); (2) decide the brand-asset question. `LICENSE` reserves ejmlabs logos and artwork, yet `@ejm/tokens` carries `assets/` brand files and fonts, and a public npm package redistributes them. Options: keep the brand files out of the published `@ejm/tokens` and ship them only with the downloadable brand kit; or confirm the reserved-rights notice that travels with the package is enough. Plan default is to exclude brand logos and artwork from the npm tarball and keep fonts with their OFL notices. Publishing uses npm trusted publishing or a short-lived scoped automation token held by Everett, never a token in a repository file. Consumers (this site, `ejm-chess`, the product sites) keep `file:` links in this change; switching them to `^<V>` is a later per-repository PR.

Add on the site: an `ejm-ui` entry in the download page and a `npm install` line, shown only after the six packages exist on the registry and `npm view` confirms them.

## Decision 7. Feedback and bug reports

| Option | Route | Personal data | Spam and abuse | Effort |
| --- | --- | --- | --- | --- |
| **A. Prefilled GitHub issue forms (recommended)** | "Report a bug" and "Send feedback" links to the product's existing `bug.yml` and `feature.yml`, with `version` and platform prefilled by query where the form has those fields. A security link goes to the private advisory form. | None held by us. The reporter's GitHub profile is public on their issue. | GitHub's controls, `blank_issues_enabled: false`, maintainers' triage, and the existing `CODE_OF_CONDUCT.md`. | A few links. Needs a GitHub account (a real barrier for some people). |
| B. Small Worker form | A form on ejmlabs.com posts to a Worker, which validates and stores the report. | Free text only; see rules below. | Turnstile, per-client rate limit, size limit, deny list. | A Worker, a store, Turnstile keys, a review routine, a retention job. |
| C. A + B | Issue links first, form for people without an account. | as B | as B | Both. |

Why A first: it adds no data store, no credential, no new abuse surface and no retention duty, and the templates exist. We would add B only when we see people unable to report, and then as its own change.

If B is chosen, the design is fixed here so it is not invented later:

- **Fields:** product (enum), version (short text), platform (enum), what happened (text, 4,000 characters), optional contact (text, never required, with the line "Only fill this in if you want a reply").
- **Defences:** Cloudflare Turnstile verified server-side on every post, a rate limit of 5 posts per hour per client using the platform rate-limit binding with an opaque key, a 16 KiB request cap, `Content-Type` and method checks, CSRF protection by same-origin `Origin` check, no file uploads, and a global kill switch (a Worker variable that returns 503).
- **Data:** no IP address, user agent or email is written to the store or logs by default. Worker logging stays off, as in `ide.ejmlabs.com`. The rate limiter sees the connecting address in memory only. A contact value, if given, is stored with the report and is the only personal data.
- **Where reports land:** a private Cloudflare D1 table read only by maintainers; no automatic public issue and no outbound email from the Worker. Maintainers move a triaged report into a GitHub issue by hand with the contact value removed.
- **Retention:** 90 days for untriaged reports, deleted by a scheduled job; triaged reports are copied out, then deleted. The Privacy page states this.
- **Abuse handling:** a deny list of keys in D1, the kill switch, and a note in `SECURITY-OPERATIONS.md` for who reviews weekly.
- **Needs:** Turnstile site and secret keys, a D1 database, a Worker route, all Everett's, plus the CSP change above.

Neither option has an automatic data feed from the app or CLI. The CLI and IDE are not changed to phone home.

## Privacy and copy

The download path stores nothing of our own: the page is static, the install script and `releases.json` are static files, and the existing site analytics (`@ejm/site` beacon) is the only counter. Downloads from GitHub are logged by GitHub under its own policy; the page says so in one line. `install.sh` sends no telemetry and only contacts `ejmlabs.com` and `github.com`. The feedback links leave the site; nothing is read from the visitor. All new copy follows the lab voice, avoids "studio", avoids unproven claims (no "secure", "safe", "signed", "verified publisher"), and says "version `<V>` is an early release" with the project's own limits.

## Risks / Trade-offs

- [Piping a script to `sh` is a trust step] → show the manual path first-class, keep the script short and static, verify hashes from a second channel, support `--dry-run`, and state that the checksum is not an identity proof.
- [GitHub outage or rate limit blocks installs] → documented upgrade to Option B; the manual `.dmg` link still works from a cache only by luck, so say nothing about availability.
- [A target passes build but fails smoke] → drop it from that release and from the page; do not ship a "best effort" file.
- [The existing `v0.1.0` tags are not the intended tree] → Decision 1 and a tree check before any publish; never move a tag.
- [Brand files redistributed through npm] → Decision 6 gate before any publish.
- [Package names are taken] → check with `npm view` and PyPI before relying on them; names are irreversible once used.
- [Binary builds need new workflows in shared, protected repositories] → each is a reviewed PR; none can be written until GitHub writes resume.

## Migration Plan

1. Approve this change and Decisions 1, 3, 6 and 7 (Everett).
2. Resolve the `gh` login so GitHub state can be read and written; read remote tags, releases and workflow state first.
3. Per product repository, with its own OpenSpec change: version PR if Decision 1 is B; binary-build workflow; smoke checks; release notes with the unsigned statement.
4. Run the draft-release flow per product (human maintainer, merged main SHA); attach built files and the checksum list to the draft; review; publish.
5. Open one site PR: `releases.json`, `install.sh`, Download page, links, Privacy copy, tests. Merge, then deploy from main at a named SHA after a fresh security pass on that exact tree (Everett).
6. Publish npm and PyPI packages last, after the install lines are tested against the real registry, then enable their lines on the page.
7. Rollback: revert the site PR and redeploy; withdraw a release by marking its notes and issuing a new version, never by moving a tag or replacing assets.
