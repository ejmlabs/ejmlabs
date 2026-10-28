# Tasks

Tags: **[GH]** needs GitHub writes or reads, on hold until the `gh` login decision. **[OWNER]** needs the owner (tags, release publishing, registry accounts, R2, DNS, Turnstile keys, deploy). Untagged tasks are local edits and tests.

Do not start any task until this change is approved and a new request asks to apply it. Each product repository gets its own OpenSpec change before its edits.

## 1. Decisions and read-only checks

- [ ] 1.1 [OWNER] Decide the version (Decision 1), storage (Decision 3), ui form (Decision 6) and feedback route (Decision 7). Record each answer in `design.md`.
- [ ] 1.2 [GH] Read remote tags, releases and drafts for the four repositories. Verify whether `v0.1.0` exists on `ejm-harness` and `ejm-ide`, and whether each tagged tree is the intended one (both are 10 to 12 commits past it). Verify each repository has immutable releases enabled, the semantic-version tag ruleset active and private vulnerability reporting on; list any gap for the owner.
- [ ] 1.3 Look up npm `@ejm/*`, npm `ejm-harness` and PyPI `ejm-harness` again before use (read-only; all three were unclaimed on 2026-10-26). [OWNER] Confirm ownership of the `@ejm` scope. Do not reserve a name by publishing a placeholder.
- [ ] 1.4 [OWNER] Confirm the brand-asset rule for the `@ejm/tokens` tarball and the publish set (Decision 6).
- [ ] 1.5 [OWNER] Choose the signing and notarization option (Decision 8) and approve or reject each open native-evidence item as a known limit (Decision 2).

## 2. Version and release notes, per repository

- [ ] 2.1 If the version is not 0.1.0: [GH] one PR per repository that changes `VERSION`, every manifest and lock pin, and the dated changelog section. Verify `grep` finds no stale version string and each repository's check recipe passes.
- [ ] 2.2 [GH] Write release notes for `<V>` with the supported platforms, the unsigned and not-notarized statement, the checksum instructions and the issue-form links. Verify they claim nothing beyond `RELEASING.md`.

## 3. Binary builds and smoke checks, per repository

- [ ] 3.1 [GH] `ejm-cli`: add build and smoke jobs (native macOS Apple silicon and Linux x86_64 runners) with `contents: read` and no secrets, building `--release --locked` at the harness revision in `.github/harness-revision`, archiving the binary with `LICENSE` and notices, and recording every file's SHA-256. Fix the Linux runner or the stated minimum distribution first (Decision 2). Verify the job has no write permission and no secret.
- [ ] 3.2 [GH] `dotgithub`: add the shared attach workflow (Decision 9): `contents: write`, no project checkout, recomputes and compares every digest, attaches files and `SHA256SUMS` to the draft release, optional attestations. Verify it fails on a changed digest and on a wrong-SHA artifact (a build whose `head_sha` differs from the tagged commit, or from a workflow or trigger other than the named build on `workflow_dispatch` or a push on main). Order build and smoke before Draft release creates the tag, on the same main SHA.
- [ ] 3.2a [GH] `ejm-harness`: same build jobs for `ejm-harness-worker`. Verify the TypeScript and Python SDKs find it through `EJM_HARNESS_WORKER_PATH`.
- [ ] 3.3 [GH] `ejm-ide`: only if Decision 8 releases it: build the macOS Apple silicon `.dmg` with the official Tauri action against the matching harness checkout, with notarization if option b. Verify every check in `docs/distribution.md`: editing, terminal cleanup, local language tooling, extensions, provider login and a model request.
- [ ] 3.4 [GH] Run a smoke check on each built artifact on a clean runner. Verify `ejm-cli --version`, `ejm-cli --replay run "Hello"`, the worker's handshake, and IDE launch. Verify the evidence lists in `native-process-support.md` and `host-auth-verification.md` for each Linux and macOS target are recorded as passed or approved as known limits. Drop any target that fails.
- [ ] 3.5 [GH] `ejm-ui`: add a publish workflow that runs the packed-consumer proof, then packs the published set. Exclude brand artwork through the `files` list or `.npmignore` in `@ejm/tokens`. Add a packed-consumer proof for the published set alone. Verify the tarballs hold no reserved brand artwork unless 1.4 approved it, and the proof passes with `site` and `demos` private.
- [ ] 3.6 [GH] `dotgithub`: one change amending the shared `RELEASING.md` per the chosen Decision 8 option, then the normal sync PR into each repository; `ejm-ide/docs/distribution.md` is amended in its own repository. Verify the synced copies are byte-identical.

## 4. Site: download page, installer and manifest

- [ ] 4.1 Add `site/public/releases.json` using the manifest shape in `design.md`, empty until a release exists. Verify a test rejects a missing digest, a non-HTTPS URL, a duplicate target and a version mismatch.
- [ ] 4.2 Generate `install.sh` (POSIX `sh`) at site build time from `releases.json`. Verify with `shellcheck`, with fixtures for a listed target, an unlisted target, a checksum mismatch, a truncated file, a missing hash tool and `--dry-run`, and that it uses `--proto '=https'`, `mktemp` with a trap, an atomic move, a PATH hint, no `sudo` and no shell-profile edits.
- [ ] 4.3 Add the `/download/` page: platform matrix, install lines with copy buttons, verify section, unsigned note, report links. Verify the built HTML has no inline script, no form and no new origin, and shows "Not yet available" for unbuilt targets.
- [ ] 4.4 Link the page from the header and each project's "get started" fact, changing the old "build from source" text only for products with a release. Verify `npm --prefix site test` and `node scripts/check.mjs` pass.
- [ ] 4.5 Update `Privacy` copy and `site/SECURITY-OPERATIONS.md` with the download and feedback data statement. Verify copy uses "lab", names no agent, model or vendor, and contains no signed, notarized, secure or verified claim.
- [ ] 4.6 Add feedback links per product: bug, feedback, private security report. Verify each href is the product's `ISSUE_TEMPLATE` or advisory URL and no link carries visitor data. Put version and platform in the `evidence` field only.
- [ ] 4.7 [GH] Per product repository, point `ide.`, `cli.` and `harness.ejmlabs.com` at the download page, or populate the IDE manifest, so the sites do not contradict each other (`ide.ejmlabs.com` says every platform is unavailable). Verify no two ejmlabs hosts disagree about availability.
- [ ] 4.8 Add a test that fails the build if any listed artifact URL is not a versioned release-asset URL on the owning repository.

## 5. Release and publish

- [ ] 5.1 [OWNER] Merge each release PR through protected main. Copy the full main SHA.
- [ ] 5.2 [OWNER][GH] Run **Draft release** per repository for `<V>`; attach built files and `SHA256SUMS`. Build and smoke ran on that same main SHA. Verify checksums against 3.4 before review.
- [ ] 5.3 [OWNER] Review each draft, then publish. Never move a tag or replace an asset.
- [ ] 5.4 [GH] Fill `releases.json` from the published assets; open the site PR; verify `install.sh` against the real published files on a clean macOS and Linux machine.
- [ ] 5.5 [OWNER] Deploy the site from main at a named SHA after a fresh security PASS on that exact tree.
- [ ] 5.6 [OWNER] Publish npm and PyPI packages with provenance, only through npm trusted publishing and PyPI Trusted Publishers with a build job and a separate publish job that runs no project code, after the owner confirms the names, the proof and the clean-machine install pass. Verify `npm view` and `pip download` before enabling their install lines on the page.

## 6. If the owner chooses the Worker form or R2 (not in the recommended path)

- [ ] 6.1 [OWNER] Open a separate OpenSpec change that carries the fixed rules from Decision 7 (or Decision 3, option B), the CSP change, and the Turnstile, D1 or R2 resources it needs. Nothing here is built without it.

## Acceptance

- Every offered link resolves to a versioned release asset whose SHA-256 matches `releases.json` and the release `SHA256SUMS`.
- A clean-machine run of each install line installs the right version, or refuses with a clear message on an unlisted target.
- The built site has no signing or notarization claim, no unbuilt platform link, no new CSP source, and no inline script.
- `openspec validate first-public-releases --strict`, `node scripts/check.mjs`, `npm --prefix site test` and `npm --prefix site run build` pass.
