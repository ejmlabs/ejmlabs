# UI install review context

These are exact source copies from public `ejmlabs/ejm-ui` at
[`7cf86428d0266297901ee52d0e137df100f8c23d`](https://github.com/ejmlabs/ejm-ui/commit/7cf86428d0266297901ee52d0e137df100f8c23d),
tree `204df7290b5e87c10de65049413474d85c28f8d3`.
The [manifest](manifest.json) binds all 13 copied files, totaling 189,724 bytes,
to their repository, commit, tree, path, Git mode, blob, byte count and SHA-256.
Each fixture is an ordinary nonexecutable file with the exact source bytes.

The copied [license](7cf86428d0266297901ee52d0e137df100f8c23d/LICENSE) retains
UI's license scope: MIT covers its software and documentation; marks, brand
artwork, design assets, templates and visual identity retain their owners'
rights unless separately licensed. Font rights and notices remain separate.
Studio's license does not relicense these snapshots.

## Install boundary

The complete [root manifest](7cf86428d0266297901ee52d0e137df100f8c23d/package.json)
and [lockfile](7cf86428d0266297901ee52d0e137df100f8c23d/package-lock.json),
plus all ten root workspace manifests, cover `packages/*`, `apps/*` and
`examples/*`. The lock's ten workspace links match those directories. The
nested `packages/shots/fixtures/acme-api/package.json` is not a root workspace
or a root lock workspace entry and is outside this snapshot.

The version-3 lock has 300 external resolved records. Every record uses HTTPS
`registry.npmjs.org` and includes an integrity value. It records install hooks
for `fsevents` and `node-pty`; the unchanged `npm ci --ignore-scripts` recipe
suppresses lifecycle hooks. Root and workspace manifests have no `config`,
`overrides`, `packageManager` or `publishConfig` keys.

At this revision no tracked `.npmrc`, `npm-shrinkwrap.json`, `.nvmrc`,
`.node-version`, `.yarnrc`, `.yarnrc.yml`, `pnpm-workspace.yaml` or
`.pnpmfile.cjs` exists. These observations cover tracked owner files, not
runner or user configuration. No empty substitute files are supplied.

## Use and limits

Treat these copies as read-only review data. Never import, execute or package
them as an implementation. The canonical `.github/review-context` stays
separate. UI owns the active packages; Studio consumes its pinned public source.

This set supplies install metadata, not a runnable UI checkout, advisory audit
or installed-run proof. The installation PR's old trusted base cannot supply
the proposed UI archive. A fresh admitted PR after merge must verify the
installed caller and exact UI archive/context, both complete reviews and all
protected checks before adopting owner APIs or removing live fonts.

## Additional complete source prerequisites

The immutable candidate `7f643571dc0ebec611580bbd3b59ad55e8bbf0e6` has tree
`8286abf75bbc83e3f46761c62a3ee6070f0ac438`. Its complete changed source from the protected
`7cf86428d0266297901ee52d0e137df100f8c23d` owner is retained in five bounded parts under
[`chunks/7f643571dc0ebec611580bbd3b59ad55e8bbf0e6/`](chunks/7f643571dc0ebec611580bbd3b59ad55e8bbf0e6/). Each part records the original owner
path, commit, tree, Git mode, blob, byte count and SHA-256. The fixtures keep
exact bytes in ordinary mode `100644`, including binary assets and notices.

These parts are inert review data. The existing install manifest and active UI
pin remain unchanged. Accept all parts and the official owner before preparing
the complete source supplement, metadata activation and protected consumer pin.
Recheck the actual accepted owner identity after merge. Never execute these
fixtures or treat their presence as a successful install, review or release.

Raw snapshots preserve owner whitespace, including a trailing blank line in
`packages/ui/src/lib/utils.test.ts`. Check authored manifests and guidance
separately; do not rewrite an owner blob to make a snapshot whitespace check pass.
This prerequisite has no public site behavior or product-guide change.
