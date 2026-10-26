# Tasks

## 1. Manifest

- [x] 1.1 Add `site/public/releases.json` (empty list) and `site/scripts/releases.mjs`. Verify `npm --prefix site test` rejects a missing digest, a non-HTTPS URL, a duplicate target, a version mismatch and a URL that is not a versioned release asset on the owning repository.

## 2. Installer

- [x] 2.1 Generate `install.sh` from the validated list in the build. Verify shellcheck is clean and fixtures cover a listed target, an unlisted target, a checksum mismatch, a truncated file, a missing hash tool and `--dry-run`, and that the script has the required hardening.

## 3. Download page

- [x] 3.1 Add `/download/` with platform matrix, install lines, copy buttons, verify section, unsigned note and report links. Verify the built HTML has no inline script, no form and no new origin, and shows "Not yet available" for unbuilt targets.
- [x] 3.2 Link the page from the header, and change a project's "get started" text only for products with a release. Verify `npm --prefix site test` and `node scripts/check.mjs` pass.

## 4. Copy and feedback

- [x] 4.1 Update `Privacy` and `site/SECURITY-OPERATIONS.md` with the download and feedback data statement. Verify copy says "lab", names no person, agent, model or vendor and makes no signed, notarized, secure or verified claim.
- [x] 4.2 Add per-product feedback links to issue forms and advisory forms. Verify the hrefs and that version and platform appear only in `evidence`.

## 5. Local proof

- [x] 5.1 Fill a local preview manifest from local Linux artifacts, run `install.sh --dry-run` and a real install into a scratch home against a local file server, and record the result. Keep the committed `releases.json` empty.
