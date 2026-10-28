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

**Goals:** a truthful first release of each product; one command or click per offered platform; checksums a visitor can verify; a short feedback route; minimal personal data; no cost or credential beyond what the owner approves; a plan that survives the version decision.

**Non-Goals:** doing signing or notarization work in this change (the choice is Decision 8), auto-update, crates.io, an extension registry, Windows or Intel macOS or Linux IDE builds, a telemetry system, deployment.

## Decision 1. Version: 0.0.1 vs 0.1.0 (needs the owner)

| Option | What it takes | Consequences |
| --- | --- | --- |
| **A. Release 0.1.0 (recommended)** | No version edits. Run the existing draft flow for `ejm-cli` and `ejm-ui`; for `ejm-harness` and `ejm-ide` use the existing `v0.1.0` tag if it is on the remote and its tree is the intended one, otherwise decide a new version. | Matches every manifest, changelog and tag. SemVer stays monotonic. Pre-1.0 already signals "early". |
| B. Release 0.0.1 as asked | Lower `VERSION`, `Cargo.toml` (workspace, plus the exact pins in `ejm-cli`), `package.json`, `tauri.conf.json`, `pyproject.toml`, ui's exact `@ejm/*` pins and lockfiles in four repositories; rewrite the dated changelog section. Local `v0.1.0` tags remain, and a tag the remote already holds is immutable. | Version goes backwards, `v0.0.1` is created after `v0.1.0`, and any later tool that sorts by SemVer prefers the withdrawn one. Four more PRs before any release. |
| C. Call the release "0.0.1" only on the site | None | Rejected. The site would name a version no tag, manifest or file carries. |

Past the tags: `ejm-harness` is 10 commits and `ejm-ide` 12 commits beyond their local `v0.1.0` tag, and both carry `[Unreleased]` changelog entries (for example a provider-credential fix in the IDE). If those tags are on the remote, the draft flow refuses them, and a binary built from the tag would miss the later fixes. Realistic versions under Option A are 0.1.0 for `ejm-cli` and `ejm-ui`, and the next patch (0.1.1 or later) for `ejm-harness` and `ejm-ide`. Task 1.2 confirms this once GitHub can be read.

Everything below uses `<V>` for the chosen version (per product where they differ). The tag is `v<V>`, created only by the draft-release workflow run by a human maintainer from a merged main commit. This change never creates a tag.

## Decision 2. Platform matrix

A target is offered only after a native build **and** a smoke run of the built artifact. Evidence today, from the repositories:

| Product | macOS Apple silicon | macOS Intel | Linux x86_64 | Windows x86_64 |
| --- | --- | --- | --- | --- |
| ejm-cli (Rust binary) | Candidate. Local macOS arm64 gate and hosted macOS quality passed (see `docs/native-remote-publication.md`). | Not built. No evidence. | Candidate. Hosted Linux quality passed. Needs libdbus at build time and a Secret Service at runtime for stored credentials. | Not offered. Docs say Windows needs separate terminal evidence. |
| ejm-harness (`ejm-harness-worker` binary, plus SDKs) | Candidate. Local macOS arm64 gate only. | Not built. | Candidate. Linux procfs path needs native acceptance. | Not offered. Job-object code exists but "native Windows acceptance is still required". |
| ejm-ide (Tauri app) | **Only target.** `tauri.conf.json` bundles `app` and `dmg`, and its resources name the `darwin-arm64` esbuild and biome binaries. | Not offered. Needs Intel resources and a bundle test. | Not offered. glib 0.18.5 (RUSTSEC-2024-0429) via GTK; docs say Linux stays unsupported until upgraded. | Not offered. No bundle target, icon or resources. |
| ejm-ui | Platform independent npm packages. Needs Node 22.12 or later. | same | same | same |

A smoke run alone does not clear a target. The repositories list evidence they still owe, and a target's offer gate is that list:

- **Harness worker and CLI (shared exec and auth crates):** `ejm-harness/docs/native-process-support.md` ("Native Windows and Linux acceptance is still required"; Linux needs its real procfs path; macOS fixtures do not establish Linux) and "Remaining native and release evidence" in `ejm-harness/docs/host-auth-verification.md` (real macOS Keychain and Linux Secret Service setup, recovery and restart acceptance, native Linux procfs and process cleanup).
- **IDE:** the checks in `ejm-ide/docs/distribution.md` (editing, terminal cleanup, local language tooling, extensions, provider login and a model request on each advertised platform).

For each offered target the release either records that evidence as passed, or the owner approves shipping with the open items named as **known limits** in the release notes and on the page. Without one of those two, the target is not offered.

**Linux runtime baseline.** The harness auth crate links `libdbus-1` dynamically (both `Cargo.lock` files carry `libdbus-sys`), and stored credentials need a session D-Bus with an unlocked Secret Service. The glibc floor is the build runner's: a build on ubuntu-24.04 needs glibc 2.39 and will not start on Debian 12 or Ubuntu 22.04. Build on the oldest runner image the project is willing to support, and state the resulting minimum distribution in the release notes and on the page. `install.sh` does not sniff the glibc version; a too-old system fails at launch with the loader's own message, which the page's requirements line anticipates. Name `libdbus-1` as a runtime requirement.

The site never lists a target without an artifact: it shows "Not yet available" with no link and no estimate.

Page order is by what a person has: the platform is detected only to highlight a row, never to hide the others.

## Decision 3. Where files live and how they are served

| Option | Files | Install host | Cost and effort | Fit |
| --- | --- | --- | --- | --- |
| **A. GitHub Releases + static site (recommended)** | Release assets in each repository's published release, produced by the existing draft flow plus a binary build job. Hashes also in `releases.json` on ejmlabs.com. | `ejmlabs.com/install.sh`, `/releases.json` as static assets | No new Cloudflare resource, no egress bill, no credential. Immutable only if the repository enables immutable releases and the semantic-version tag ruleset (`dotgithub/scripts/configure_repositories.py` makes the first optional and the second conditional); task 1.2 checks both. | Smallest change. Fits `RELEASING.md` (immutable tag, never replace assets). Depends on GitHub for bytes. |
| B. R2 behind a Worker | Private R2 bucket, content-addressed keys, manifest, digest-bound URLs. **Half-built for the IDE:** `ejm-ide/distribution/` already has the Worker, manifest contract and publisher, deployed at `ide.ejmlabs.com` with an empty manifest. B could mean the IDE through that path and CLI and worker through GitHub, or all three through one host. | A Worker route on `ejmlabs.com` (`/dl/*`) | Bucket, Worker deploy, publisher credentials, retention rules. R2 has no egress fee; storage and operations have a free tier and are then billed (verify current pricing before choosing). | Gives vanity URLs, range and cache control, and one host. Larger blast radius, and every release needs a Cloudflare write. |
| C. Both: GitHub as source of truth, R2 as a mirror | A + a mirror job | Worker | Highest | Not justified at 0.x. |

Why A: it needs no resource the owner has not already got, keeps one trust model, needs no Cloudflare write per release, keeps the release immutable the way `RELEASING.md` demands, and makes the second trust channel (hashes from ejmlabs.com, bytes from GitHub) free. The existing IDE Worker and its manifest contract stay dormant and unchanged. The `releases.json` schema reuses its field names (`schemaVersion`, `version`, `publishedAt`, `artifacts[].target`, `filename`, `bytes`, `sha256`) and target names (`darwin-aarch64`, `darwin-x86_64`, `linux-x86_64`, `windows-x86_64`) and adds `product` and `url`, so a later move to B is a hosting change, not a format change. Upgrade trigger for B: GitHub rate limits or outages hurt installs, or the owner wants one stable host.

URL rules: every file URL names its version (`.../releases/download/v<V>/<file>`). There is no "latest" file URL in copy. The "latest pointer" is `releases.json` plus the page, which change only by a reviewed site PR deployed from main. Page and manifest are served with the site's existing revalidating cache headers; the hashed or versioned file URLs are immutable.

## Decision 4. Install flow per product

One script serves both command-line products, kept short enough to read.

```sh
curl --proto '=https' --tlsv1.2 -fsSL https://ejmlabs.com/install.sh | sh -s -- cli      # ejm-cli
curl --proto '=https' --tlsv1.2 -fsSL https://ejmlabs.com/install.sh | sh -s -- worker   # ejm-harness-worker
```

`install.sh` is POSIX `sh`, **generated at site build time** from `releases.json`, so the version, URLs and SHA-256 values are embedded and the script parses no JSON and makes no manifest fetch. It: detects OS and CPU and exits with a plain message for any target not embedded; downloads the archive for that product, target and version from the GitHub release URL; verifies SHA-256 against the embedded value and aborts on mismatch; installs under `$HOME/.local/bin` without `sudo` or shell-profile edits; and prints the installed version, the install path, and that the build is unsigned. `--dry-run` prints what it would do. It never runs the downloaded program. It accepts a version only if that version has an embedded hash.

Hardening, each covered by a fixture test: the whole body sits in one function called on the last line, so a truncated download runs nothing; every fetch uses `curl --proto '=https' --tlsv1.2 -fsSL`; work happens in `mktemp -d` under `umask 077` with a `trap ... EXIT` cleanup; the binary is moved into place atomically with mode 0755; it picks `sha256sum` or `shasum -a 256` and fails closed if neither exists; and it prints a PATH hint when `$HOME/.local/bin` is not on `PATH` (the macOS default).

The page also shows the same steps as manual download and checksum check for anyone who will not pipe a script, and each release's notes carry the SHA-256 of that version's `install.sh` for people who download, check, then run.

**What the checksum protects.** The hashes come from ejmlabs.com and the bytes from GitHub, so a swapped GitHub asset is caught. The script and the hashes share one origin, so a compromise of ejmlabs.com (the Cloudflare account, a deploy token, or a malicious merge plus deploy) is **not** caught: the attacker controls the script. The page says so. Controls: deploys only from main at a named SHA after a fresh security pass, account two-factor sign-in and no long-lived deploy token in CI, the published script hash above, and the manual path first-class.

| Product | One command or click | Notes |
| --- | --- | --- |
| ejm-cli | the `install.sh ... cli` line above | Windows: not offered until a build and smoke test exist. `cargo install` is not offered: the crate depends on sibling path crates. |
| ejm-harness worker | `install.sh ... worker`, then `npm install ejm-harness` or `pip install ejm-harness` for the SDK | The SDKs do not download a worker; docs say so. Set `EJM_HARNESS_WORKER_PATH` or use `PATH`. |
| ejm-harness SDKs | `npm install ejm-harness`, `pip install ejm-harness` | Pure SDK packages. Publishing needs the owner's npm and PyPI accounts and `ejm-harness` name availability (an anonymous lookup on 2026-10-26 found the npm and PyPI names unclaimed; unclaimed is not reserved). If either name is unavailable, ship only the worker and say how to install the SDK from the release asset. |
| ejm-ide | the `.dmg` link for macOS Apple silicon, **only after Decision 8** | Held until notarized under the recommended option. If it ships unsigned it is a download plus several Gatekeeper steps, not one click; the page says so. Checksum shown beside the link. |
| ejm-ui | `npm install @ejm/ui @ejm/tokens react react-dom tailwindcss`, plus the Vite setup in `ADOPTION.md` | See Decision 6. Shown only after the registry confirms the packages. |

**Unsigned-build copy** (the only statement allowed until a signing run is recorded in a repository's `RELEASING.md` or release notes): "These builds are not signed with a developer certificate and are not notarized. Your system may warn before opening them. The SHA-256 checksum lets you confirm you received the file we published; it does not prove who built it." (Rust and Tauri builds on Apple silicon carry a linker ad-hoc signature, so "not signed with a developer certificate" is the exact wording.) For an unsigned macOS app the steps are: try to open it, then System Settings, Privacy and Security, Open Anyway, and confirm. Since macOS 15 Control-click then Open no longer bypasses the check, so the page does not suggest it. No `xattr` or `sudo` tip is given. Programs installed with `curl` get no quarantine flag, so the command-line products do not show this prompt through `install.sh`. A command-line archive downloaded in a browser (the manual path) does get the quarantine flag, so the page gives the same Open Anyway steps for it; the one-line install is the path without a warning. If signing or notarization is later completed for a platform, copy changes only in the release that records it.

The provenance manifest from the draft flow is described as "build provenance", never as a signature.

## Decision 5. Download page and CSP

A new `Download` page (`/download/`) in `site/src/pages`, linked from the header and from each project's `facts` ("get started"), replacing the text "Build from source. Installers ... not available yet" only when that product has a release. Layout, in order: a platform matrix (rows are products, columns are platforms, cells are a link with size and short hash or "Not yet"), the install lines with a copy button, a "Verify your download" section, the unsigned note, and "Report a problem".

The page and `install.sh` are both generated from `releases.json` at build time, so neither does a client fetch. A copy button uses the clipboard API from an external script already allowed by `script-src 'self'`; no inline script is added.

CSP: no change for the recommended scope. Links to `github.com` are navigation, not a fetch. `form-action 'none'` stays. A feedback form (Decision 7 option B) would add `form-action 'self'`, `connect-src` unchanged (`'self'`), `script-src` and `frame-src` `https://challenges.cloudflare.com`, in the shared `@ejm/site` headers option. That option emits one global policy, and Cloudflare joins duplicate headers into two enforced policies, so widening only the form's page needs new support in `headersFile` first.

The `Privacy` page is updated to say what the download and feedback paths touch (below). Copy says "lab", never "studio". It names no AI vendor, model or agent. Platform and host names that visitors need (macOS, Windows, Linux, GitHub, npm, PyPI) are used as plain words.

## Decision 6. ejm-ui form

| Option | Form | Consequences |
| --- | --- | --- |
| **A. Public npm packages under `@ejm` (recommended, gated)** | Publish `@ejm/tokens`, `core`, `ui` and, if wanted, `ssg`, same version `<V>`, with npm provenance from a GitHub Actions publish job. Keep `site`, `demos`, `ink`, `shots`, `gallery`, examples and `ejm-tui` private: `@ejm/site` resolves the lab's own favicon, logo and social files from inside `@ejm/tokens/assets` and carries the lab's project registry, and `demos` is brand-bound, so publishing them would break once brand artwork is stripped from `tokens`. This also shrinks the irreversible name commitment. | Conventional install line. Intra-repo pins are already exact, so one version moves together. Packages ship TypeScript source, so they are for Vite and Node 22.12 or later consumers and the docs must say so. |
| B. Downloadable kit | Attach the `npm pack` tarballs and checksums to the GitHub release (they can carry artifact attestations); install with `npm install ./file.tgz` or a release URL. | No registry account. Clumsier updates. Good fallback and the first step if A is gated. |
| C. Stay source-linked | Keep `file:` sibling links. | Status quo. Rejected as the answer to "package it". |

Gates for A, both the owner's: (1) own the `@ejm` npm organization (an anonymous registry lookup on 2026-10-26 found `@ejm/ui` unclaimed, but ownership of the `@ejm` scope could not be read; if taken, pick another scope and rename before publishing, since names cannot be reused); (2) decide the brand-asset question. `LICENSE` reserves ejmlabs logos and artwork, yet `@ejm/tokens` carries `assets/` brand files and fonts, and a public npm package redistributes them. Options: keep the brand files out of the published `@ejm/tokens` and ship them only with the downloadable brand kit; or confirm the reserved-rights notice that travels with the package is enough. Plan default is to exclude brand logos and artwork from the npm tarball, through the `files` list (or an `.npmignore`) in `@ejm/tokens`, and keep fonts with their OFL notices. The existing pack proof covers six packages including `site` and `demos`; the publish set needs its own packed-consumer proof from the published tarballs alone, which also proves nothing in the set imports a stripped brand file. Publishing uses npm trusted publishing or a short-lived scoped automation token held by the owner, never a token in a repository file. Consumers (this site, `ejm-chess`, the product sites) keep `file:` links in this change; switching them to `^<V>` is a later per-repository PR.

Add on the site: an `ejm-ui` entry in the download page and an `npm install` line, shown only after the published packages exist on the registry and `npm view` confirms them. The line names the peers: `react`, `react-dom` and `tailwindcss` 4, and links the Vite setup in `ADOPTION.md` (`@tailwindcss/vite`, `@vitejs/plugin-react`, `vite`, `resolve.dedupe`).

## Decision 7. Feedback and bug reports

| Option | Route | Personal data | Spam and abuse | Effort |
| --- | --- | --- | --- | --- |
| **A. Prefilled GitHub issue forms (recommended)** | "Report a bug" and "Send feedback" links to the product's existing `bug.yml` and `feature.yml`, with the version and platform written into the existing `evidence` field by query parameter (the forms have no version or platform field; adding one is a change to the shared standard in `dotgithub`, not a per-repo edit). A security link goes to the private advisory form. | None held by us. The reporter's GitHub profile is public on their issue. | GitHub's controls, `blank_issues_enabled: false`, maintainers' triage, and the existing `CODE_OF_CONDUCT.md`. | A few links. Needs a GitHub account (a real barrier for some people). |
| B. Small Worker form | A form on ejmlabs.com posts to a Worker, which validates and stores the report. | Free text only; see rules below. | Turnstile, per-client rate limit, size limit, deny list. | A Worker, a store, Turnstile keys, a review routine, a retention job. |
| C. A + B | Issue links first, form for people without an account. | as B | as B | Both. |

Why A first: it adds no data store, no credential, no new abuse surface and no retention duty, and the templates exist. We would add B only when we see people unable to report, and then as its own change.

If B is chosen, the design is fixed here so it is not invented later:

- **Fields:** product (enum), version (short text), platform (enum), what happened (text, 4,000 characters), optional contact (text, never required, with the line "Only fill this in if you want a reply").
- **Defences:** Cloudflare Turnstile verified server-side on every post, a rate limit using the platform rate-limit binding (its periods are only 10 or 60 seconds, so "per hour" needs a D1 or Durable Object counter) keyed by a keyed hash of the client address with a secret salt and a short TTL, never the raw address, a 16 KiB request cap, `Content-Type` and method checks, CSRF protection by same-origin `Origin` check, no file uploads, and a global kill switch (a Worker variable that returns 503).
- **Data:** no IP address, user agent or email is written to the store or logs by default. Worker logging stays off, as in `ide.ejmlabs.com`. The rate limiter sees the connecting address in memory only. A contact value, if given, is stored with the report and is the only personal data.
- **Where reports land:** a private Cloudflare D1 table read only by maintainers; no automatic public issue and no outbound email from the Worker. Maintainers move a triaged report into a GitHub issue by hand with the contact value removed.
- **Retention:** 90 days for untriaged reports, deleted by a scheduled job; triaged reports are copied out, then deleted. The Privacy page states this.
- **Abuse handling:** a deny list of those keyed hashes in D1 with a TTL (stored pseudonymous data, stated on the Privacy page), the kill switch, and a note in `SECURITY-OPERATIONS.md` for who reviews weekly.
- **Needs:** Turnstile site and secret keys, a D1 database, a Worker route, all the owner's, plus the CSP change above.

Neither option has an automatic data feed from the app or CLI. The CLI and IDE are not changed to phone home.

## Decision 8. Signing and notarization (needs the owner)

`RELEASING.md` says native binaries need "code signing/notarization where relevant", and `ejm-ide/docs/distribution.md` lists "Sign and notarize macOS distribution" among the blockers before desktop builds are published. An unsigned release therefore conflicts with the repositories' own gate unless the gate is changed first. This change does not sign anything; it asks the owner to choose.

| Option | What ships | Consequences |
| --- | --- | --- |
| a. Unsigned macOS as an explicit early release | CLI, worker and IDE `.dmg`, all unsigned | Amend `RELEASING.md` (one change in `dotgithub`, which owns the synced shared file, then the normal sync into each repository) and `ejm-ide/docs/distribution.md` (per repository), so the written gate matches the release. The IDE is a download plus System Settings, Privacy and Security, Open Anyway: not one click. |
| b. Notarize macOS first | Everything, signed and notarized | Needs an Apple Developer Program membership and signing secrets in the build CI. The only way to a true one-click IDE. Delays the first release. |
| **c. CLI and worker unsigned now, IDE held until notarized (recommended)** | CLI and worker (unsigned; `curl` installs get no quarantine flag, a browser download does and shows the Open Anyway steps); IDE shown as "Not yet available" | Keeps the gate for the one product where unsigned breaks the install promise, and ships the rest. `RELEASING.md` is amended once in `dotgithub` and synced, only to state that command-line archives are released unsigned, with the checksum and provenance as their integrity evidence. |

Whichever is chosen, public copy follows Decision 4's wording until a signing or notarization run for that exact release is recorded in the repository. Windows signing is out of scope because no Windows build is offered.

## Decision 9. Build and attach trust split

The existing shared draft flow prepares assets "without executing project code" before it uses `contents: write`, and creates the tag when it drafts. Binary builds run project code (`cargo` build scripts and proc-macros; for the IDE, `npm` installs), so the plan keeps that separation and each per-repo change inherits it:

1. **Build and smoke jobs:** `permissions: contents: read`, no secrets, `cargo build --locked` and `npm ci --ignore-scripts` (the one native rebuild exception is named where a repo needs it), pinned actions. Each job uploads its artifact and the SHA-256 of every file as a workflow artifact.
2. **Attach job:** separate, `contents: write`, checks out no project code and runs none, downloads the workflow artifacts, recomputes and compares every digest to the build output, and attaches the files and `SHA256SUMS` to the **draft** release. The attach job also binds the files to the tagged commit: it accepts artifacts only from a named build workflow triggered by `workflow_dispatch` or a push on main whose `head_sha` equals the tagged commit, and fails otherwise. Ideally this job is a shared reusable workflow in `dotgithub` next to `draft-release.yml`, so the trust logic lives in one reviewed place.
3. **Order and one commit:** build and smoke run **before** Draft release creates the tag, on the same main commit SHA that the draft release then tags. The tag is immutable, so a smoke failure after drafting would burn the version.
4. **Optional:** GitHub artifact attestations, with `id-token: write` and `attestations: write` granted only to the attach job. Attestations are provenance, not code signing, and are described that way.
5. SDK packages (npm `ejm-harness`, PyPI `ejm-harness`) publish only through npm trusted publishing and PyPI Trusted Publishers, with the same split: build jobs without publish rights, a separate publish job that runs no project code. Names are confirmed by the owner first.
6. Release notes name the harness version and revision (`.github/harness-revision`) inside each CLI, worker and IDE build, so the downloads do not drift apart silently.

## Privacy and copy

The download path stores nothing of our own: the page is static, the install script and `releases.json` are static files, and the existing site analytics (`@ejm/site` beacon) is the only counter. Downloads from GitHub are logged by GitHub under its own policy; the page says so in one line. `install.sh` sends no telemetry and contacts only GitHub, including its download host. The feedback links leave the site; nothing is read from the visitor. All new copy follows the lab voice, avoids "studio", avoids unproven claims (no "secure", "safe", "signed", "verified publisher"), and says "version `<V>` is an early release" with the project's own limits.

## Risks / Trade-offs

- [Piping a script to `sh` is a trust step] → show the manual path first-class, keep the script short and static, verify hashes from a second channel, support `--dry-run`, and state that the checksum is not an identity proof.
- [GitHub outage or rate limit blocks installs] → documented upgrade to Option B; the manual `.dmg` link still works from a cache only by luck, so say nothing about availability.
- [A target passes build but fails smoke] → drop it from that release and from the page; do not ship a "best effort" file.
- [The existing `v0.1.0` tags are not the intended tree] → Decision 1 and a tree check before any publish; never move a tag.
- [Brand files redistributed through npm] → Decision 6 gate before any publish.
- [Unsigned macOS IDE breaks the one-click promise] → Decision 8; the IDE is held under the recommendation.
- [Project code runs next to a release-write token] → Decision 9 split.
- [Package names are taken] → check with `npm view` and PyPI before relying on them; names are irreversible once used.
- [Binary builds need new workflows in shared, protected repositories] → each is a reviewed PR; none can be written until GitHub writes resume.

## Migration Plan

1. Approve this change and Decisions 1, 3, 6, 7 and 8 (the owner).
2. Resolve the `gh` login so GitHub state can be read and written; read remote tags, releases and workflow state first.
3. Per product repository, with its own OpenSpec change: version PR if Decision 1 is B; binary-build workflow; smoke checks; release notes with the unsigned statement.
4. Build and smoke on the merged main SHA, then run the draft-release flow per product for that same SHA (human maintainer); attach built files and the checksum list to the draft; review; publish.
5. Open one site PR: `releases.json`, `install.sh`, Download page, links, Privacy copy, tests. Merge, then deploy from main at a named SHA after a fresh security pass on that exact tree (the owner).
6. Publish npm and PyPI packages last, after the install lines are tested against the real registry, then enable their lines on the page.
7. Rollback: revert the site PR and redeploy; withdraw a release by marking its notes and issuing a new version, never by moving a tag or replacing assets.
