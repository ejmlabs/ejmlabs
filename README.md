# ejmlabs

## Overview

Open source projects, experiments and brand resources at [ejmlabs.com](https://ejmlabs.com/).

## Status

This repository owns Studio pages and public brand downloads. Source version 0.1.0 is a development baseline. A source commit or local build does not establish publication. Product repositories own their guides and releases.

## Requirements

Node 24, npm, Python 3 for the loopback preview, and zip and unzip for public downloads. Check out the pinned public ejm-ui source beside this repository.

## Quick start

```sh
git clone https://github.com/ejmlabs/ejmlabs.git
git clone https://github.com/ejmlabs/ejm-ui.git
cd ejmlabs
git -C ../ejm-ui checkout --detach "$(node -p "require('./.github/ui-source.json').revision")"
npm --prefix ../ejm-ui ci --ignore-scripts
node scripts/check.mjs
npm --prefix site test
npm --prefix site run build
npm --prefix site run preview
```

The preview listens on 127.0.0.1:4827. See [local setup](site/README.md#local-preview).

## Usage

Browse projects, watch recorded examples, read About, or download approved brand files. The Brand page supplies public usage guidance, original rights and font notices. Swag images are concepts, not products for sale. Software licenses do not grant rights to the marks.

## Development

```sh
node scripts/check.mjs
npm --prefix site test
npm --prefix site run build
npm --prefix site run budget
```

The check entry installs the exact site lock with lifecycle scripts off, then checks types. The build checks shared design ownership, prerenders routes, applies shared headers and enforces transfer budgets. Tests check generated content, links, playback fallbacks and curated downloads.

Pages consume public @ejm exports. ejm-ui owns tokens, themes, visual components, motion, native profiles, site policy, prerendering and demos. Studio owns content, route composition, project discovery and download assembly. Public brand files resolve through @ejm/tokens/assets exports; Studio retains the swag masters and previews. Retained design-kit references are not active UI primitives and are not copied into the site as a playbook.

Use OpenSpec for feature and bugfix work. Keep the source pin and build lock together. Trusted CI reads the UI pin from protected main, so adoption of a new pin precedes a site PR that depends on it. Keep the installed human admission and approval rules in [Contributing](CONTRIBUTING.md).

## Documentation

- [Studio development and publication](site/README.md)
- [Hosting and recovery](site/SECURITY-OPERATIONS.md)
- [Releases](RELEASING.md)
- [CLI](https://cli.ejmlabs.com/docs/), [IDE](https://ide.ejmlabs.com/docs/), [Harness](https://harness.ejmlabs.com/docs/)

## Contributing

See [Contributing](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md). Ideas, examples, documentation and fixes are welcome.

## Security

Use [private vulnerability reporting](SECURITY.md). Keep credentials, personal data and local logs out of source and generated downloads.

## Support

See [Support](SUPPORT.md).

## License

See [License](LICENSE) and [Third-party notices](THIRD_PARTY_NOTICES.md). Brand artwork keeps its owner's rights. Fonts keep their SIL OFL notices. CLI, IDE and Harness retain their own MIT licenses.

## Work in progress

See the [OpenSpec handoff](openspec/changes/publish-public-site-updates/HANDOFF.md) for pending work, owner PRs, checks and release blockers.
