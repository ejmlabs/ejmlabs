# ejmlabs

## Overview

The ejmlabs studio website, project directory, brand guidance, and product download discovery at [ejmlabs.com](https://ejmlabs.com/).

## Status

This repository holds studio source and brand materials. Source version 0.1.0 is a development baseline. Consult [releases](https://github.com/ejmlabs/ejmlabs/releases) for actual published artifacts. Brand material has its own rights and is not licensed as an MIT software product.

## Requirements

Node.js 24 LTS and npm. Python 3 is useful for the local static preview. Build beside the pinned public UI checkout described below; its asset exports supply the adopted brand files and original font notices.

## Quick start

```sh
git clone https://github.com/ejmlabs/ejmlabs.git
git clone https://github.com/ejmlabs/ejm-ui.git
git -C ejm-ui checkout --detach 7cf86428d0266297901ee52d0e137df100f8c23d
npm --prefix ejm-ui ci --ignore-scripts
cd ejmlabs
node scripts/check.mjs
npm --prefix site test
npm --prefix site run build
npm --prefix site run preview
```

The preview listens only on 127.0.0.1:4827.

## Usage

Start with [the studio site guide](site/README.md). The build assembles public UI assets with the remaining retained [design kit](design-kit/README.md), including its [site components](design-kit/SITES.md). Its complete brand and application references are available in the built output at `/design-kit/` and `/design-kit/ui/`; the raw source subtree is no longer standalone. Kit ZIP downloads, X kit pages, and the swag gallery are retired. The site build excludes them and does not create replacement archives.

## Development

```sh
node design-kit/scripts/build-ui.mjs
node design-kit/scripts/build-ui.mjs --check
node scripts/check.mjs
npm --prefix site test
npm --prefix site run build
```

Use the OpenSpec workflow for feature and bugfix changes. Keep generated assets and their source definitions consistent. Human admission controls CI and AI runs; see the contributor guide. A successful local build does not deploy the site.

### Local check entry

[The Studio entry](scripts/check.mjs) temporarily imports the retained kit
checker. It keeps the theme, site CSS, contrast, class and catalog checks. The
site tests use the same entry and check complete public asset families against
their owner bytes and modes. The local motif generator is no longer invoked
by this entry or the build; edit motif and template source in `ejm-ui`.

The compatibility gap is pending public `ejm-ui` adoption. The pinned shared
Quality recipe calls this entry. `ejm-ui` owns shared tokens and site checks,
`ejmlabs/.github` owns the shared governance command, and
Studio owns this entry and its assembly checks. Keep `node scripts/check.mjs`
when switching it to pinned public owner exports and Studio assembly checks.
Remove its legacy import and the kit checker only after a clean checkout
resolves those exports, owner and Studio checks pass, and no kit dependency
remains. The [cleanup plan](openspec/changes/retire-kits-and-internal-briefs/design.md#studio-check-entry-precursor)
records this boundary.

### Public UI source admission

The coupled PR and draft-release callers pin the reviewed shared source.
[The UI manifest](.github/ui-source.json) pins public `ejmlabs/ejm-ui` source;
the [CI guide](site/README.md#shared-workflow-updates) records both exact pins
and the trusted-base preparation rule. [PR #10](https://github.com/ejmlabs/ejmlabs/pull/10)
verified the installed caller and exact UI source handoff with both complete
AI reviews and every protected check. Studio now consumes the public token
asset exports described below without rotating those pins.
The separate [UI install review context](review/dependency-sources/ejm-ui/README.md)
contains exact pinned manifests, the full lockfile, and license for static
assessment of the initial install. These copies are never build inputs.
It does not publish a release or deploy the site.

### Public asset assembly

The build resolves `@ejm/tokens/assets/*` through the installed sibling UI
workspace. It copies the favicon, fonts, icons, lockups, logos, motifs, social
and templates families to their existing `/design-kit/<family>/` paths. All 156
owner files retain their bytes and modes, including both original OFL notices. The complete font
files come from `@ejm/tokens`, not the smaller `@ejm/ui` font subsets.

The complete 80-file motif and 12-file template inventories come from the same
unchanged public source pin. This slice removes 41 local dots, echo, flow,
orbit and ripple copies, totaling 3,264,491 source bytes. The other 39 motif
and 12 template copies remain for the next bounded deletion; the build uses
the complete owner families. Do not regenerate local motif copies. All 238
built paths and modes stay unchanged. The emitted raw consistency-checker
script changes to drop its motif check; the other 237 files, including every
rendered/runtime asset, metadata, header and notice, remain byte-identical.

Keep the Studio checkout and `ejm-ui` beside each other as shown in Quick start.
Shared CI supplies the same sibling layout from the protected source pin and
installs the owner lockfile with lifecycle scripts disabled. If Node reports
`MODULE_NOT_FOUND`, check that pin, location, and install before rebuilding.
The build downloads no source and has no fallback copy. Studio owns this
output-path mapping; remove it when full owner site adoption replaces the
remaining kit assembly.

## Source ownership

`ejm-ui` owns active UI tokens, themes, reusable components, and shared site infrastructure. `ejmlabs` owns Studio pages and content, project discovery, brand guidance, and public download assembly. Make shared implementation changes in `ejm-ui` and consume its public `@ejm/*` exports here.

This checkout still depends on retained kit themes, CSS, scripts and reference material. Public UI source assembly is verified, and the eight asset families above are adopted. Both X kit copies and the swag files are removed. The remaining motif/template copies and live kit migration stay open. See the [cleanup plan](openspec/changes/retire-kits-and-internal-briefs/design.md) and [open tasks](openspec/changes/retire-kits-and-internal-briefs/tasks.md). Keep needed brand source, provenance, and font notices through the remaining migration.

## Documentation

- [Design kit](design-kit/README.md), [catalog](design-kit/CATALOG.md), [sites](design-kit/SITES.md), [applications](design-kit/UI.md)
- [Studio site](site/README.md)
- [Semantic releases](RELEASING.md)
- [Shared standards](https://github.com/ejmlabs/.github)
- Products: [ejm-cli](https://github.com/ejmlabs/ejm-cli), [ejm-harness](https://github.com/ejmlabs/ejm-harness), [ejm-ide](https://github.com/ejmlabs/ejm-ide)

## Contributing

See [Contributing](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Use [private vulnerability reporting](SECURITY.md). Keep local credentials and private reference material out of commits and generated site output.

## Support

See [Support](SUPPORT.md).

## License

See [License](LICENSE) and [Third-party notices](THIRD_PARTY_NOTICES.md). The studio's brand artwork retains its owner's rights. Bundled fonts keep their SIL OFL licenses. The three software products retain their own MIT licenses.
