# Tasks

## 1. ejmlabs repo

- [x] 1.1 Rewrite README.md, CONTRIBUTING.md, site/README.md; verify no "studio" or first-person plural for ejmlabs remains.
- [x] 1.2 Rewrite x-kit and design-kit/social/x-kit copy (profile-copy.md, index.html), the design-kit docs, REVIEW.md note, and scripts/make-brand-previews.py; verify the two x-kit copies match and bio counts are recomputed.

## 2. ejm-ui repo

- [x] 2.1 Rewrite ADOPTION.md, project taglines and tests, doc comments, package READMEs and first-person plural docs.
- [x] 2.2 Copy the x-kit text into packages/tokens/assets and update PROVENANCE.md hashes; verify `node scripts/assets.mjs --local`.

## 3. Verification

- [x] 3.1 Run `openspec validate lab-voice --strict`, `npm run check` in ejm-ui and `node design-kit/scripts/check-kit.mjs` in ejmlabs; commit per repo.
