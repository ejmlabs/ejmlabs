# Tasks

Tags: **[GH]** needs GitHub writes or reads, on hold until the `gh` login decision. **[EJM]** needs Everett (tags, release publishing, registry accounts, R2, DNS, Turnstile keys, deploy). Untagged tasks are local edits and tests.

Do not start any task until this change is approved and a new request asks to apply it. Each product repository gets its own OpenSpec change before its edits.

## 1. Decisions and read-only checks

- [ ] 1.1 [EJM] Decide the version (Decision 1), storage (Decision 3), ui form (Decision 6) and feedback route (Decision 7). Record each answer in `design.md`.
- [ ] 1.2 [GH] Read remote tags, releases and drafts for the four repositories. Verify whether `v0.1.0` exists on `ejm-harness` and `ejm-ide`, and whether each tagged tree is the intended one.
- [ ] 1.3 [EJM] Check name availability and ownership: npm scope `@ejm`, npm `ejm-harness`, PyPI `ejm-harness`. Record the result. Do not reserve a name by publishing a placeholder.
- [ ] 1.4 [EJM] Confirm the brand-asset rule for the `@ejm/tokens` tarball (Decision 6).

## 2. Version and release notes, per repository

- [ ] 2.1 If the version is not 0.1.0: [GH] one PR per repository that changes `VERSION`, every manifest and lock pin, and the dated changelog section. Verify `grep` finds no stale version string and each repository's check recipe passes.
- [ ] 2.2 Write release notes for `<V>` with the supported platforms, the unsigned and not-notarized statement, the checksum instructions and the issue-form links. Verify they claim nothing beyond `RELEASING.md`.

## 3. Binary builds and smoke checks, per repository

- [ ] 3.1 [GH] `ejm-cli`: add a build job (native macOS Apple silicon and Linux x86_64 runners) that builds `--release --locked` with the harness revision in `.github/harness-revision`, archives the binary with `LICENSE` and notices, and writes `SHA256SUMS`. Verify it attaches only to a draft release.
- [ ] 3.2 [GH] `ejm-harness`: same for `ejm-harness-worker`. Verify the TypeScript and Python SDKs find it through `EJM_HARNESS_WORKER_PATH`.
- [ ] 3.3 [GH] `ejm-ide`: build the macOS Apple silicon `.dmg` with the official Tauri action against the matching harness checkout. Verify the package launches without the dev server and passes the editing, terminal and extension checks in `docs/distribution.md`.
- [ ] 3.4 Run a smoke check on each built artifact on a clean runner. Verify `ejm-cli --version`, `ejm-cli --replay run "Hello"`, the worker's handshake, and IDE launch. Drop any target that fails.
- [ ] 3.5 [GH] `ejm-ui`: add a publish workflow that runs the packed-consumer proof, then packs the six packages. Verify the tarballs hold no reserved brand artwork unless 1.4 approved it.

## 4. Site: download page, installer and manifest

- [ ] 4.1 Add `site/public/releases.json` using the manifest shape in `design.md`, empty until a release exists. Verify a test rejects a missing digest, a non-HTTPS URL, a duplicate target and a version mismatch.
- [ ] 4.2 Add `site/public/install.sh` (POSIX `sh`). Verify with `shellcheck`, with fixtures for a listed target, an unlisted target, a checksum mismatch and `--dry-run`, and that it never uses `sudo` or edits shell profiles.
- [ ] 4.3 Add the `/download/` page: platform matrix, install lines with copy buttons, verify section, unsigned note, report links. Verify the built HTML has no inline script, no form and no new origin, and shows "Not yet available" for unbuilt targets.
- [ ] 4.4 Link the page from the header and each project's "get started" fact, changing the old "build from source" text only for products with a release. Verify `npm --prefix site test` and `node scripts/check.mjs` pass.
- [ ] 4.5 Update `Privacy` copy and `site/SECURITY-OPERATIONS.md` with the download and feedback data statement. Verify copy uses "lab", names no agent, model or vendor, and contains no signed, notarized, secure or verified claim.
- [ ] 4.6 Add feedback links per product: bug, feedback, private security report. Verify each href is the product's `ISSUE_TEMPLATE` or advisory URL and no link carries visitor data.
- [ ] 4.7 Add a test that fails the build if any listed artifact URL is not a versioned release-asset URL on the owning repository.

## 5. Release and publish

- [ ] 5.1 [EJM] Merge each release PR through protected main. Copy the full main SHA.
- [ ] 5.2 [EJM][GH] Run **Draft release** per repository for `<V>`; attach built files and `SHA256SUMS`. Verify checksums against 3.4 before review.
- [ ] 5.3 [EJM] Review each draft, then publish. Never move a tag or replace an asset.
- [ ] 5.4 Fill `releases.json` from the published assets; open the site PR; verify `install.sh` against the real published files on a clean macOS and Linux machine.
- [ ] 5.5 [EJM] Deploy the site from main at a named SHA after a fresh security PASS on that exact tree.
- [ ] 5.6 [EJM] Publish npm and PyPI packages with provenance after the proof and the clean-machine install pass. Verify `npm view` and `pip download` before enabling their install lines on the page.

## 6. If Everett chooses the Worker form or R2 (not in the recommended path)

- [ ] 6.1 [EJM] Open a separate OpenSpec change that carries the fixed rules from Decision 7 (or Decision 3, option B), the CSP change, and the Turnstile, D1 or R2 resources it needs. Nothing here is built without it.

## Acceptance

- Every offered link resolves to a versioned release asset whose SHA-256 matches `releases.json` and the release `SHA256SUMS`.
- A clean-machine run of each install line installs the right version, or refuses with a clear message on an unlisted target.
- The built site has no signing or notarization claim, no unbuilt platform link, no new CSP source, and no inline script.
- `openspec validate first-public-releases --strict`, `node scripts/check.mjs`, `npm --prefix site test` and `npm --prefix site run build` pass.
