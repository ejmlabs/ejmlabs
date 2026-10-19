# ejmlabs

## Overview

The ejmlabs studio website, project directory, brand guidance, and product download discovery at [ejmlabs.com](https://ejmlabs.com/).

## Status

This repository holds studio source and brand materials. Source version 0.1.0 is a development baseline. Consult [releases](https://github.com/ejmlabs/ejmlabs/releases) for actual published artifacts. Brand material has its own rights and is not licensed as an MIT software product.

## Requirements

Node.js 24 LTS and npm. Python 3 is useful for the local static preview. The design kit uses checked generated files and bundled font notices.

## Quick start

```sh
git clone https://github.com/ejmlabs/ejmlabs.git
cd ejmlabs
node scripts/check.mjs
npm --prefix site test
npm --prefix site run build
npm --prefix site run preview
```

The preview listens only on 127.0.0.1:4827.

## Usage

Start with [the studio site guide](site/README.md). This checkout still builds the site from the retained [design kit](design-kit/README.md), including its [site components](design-kit/SITES.md). The retained [application kit](design-kit/UI.md) holds earlier application assets. Kit ZIP downloads, X kit pages, and the swag gallery are retired. The site build excludes them and does not create replacement archives.

## Development

```sh
node design-kit/scripts/build-ui.mjs
node design-kit/scripts/build-ui.mjs --check
node scripts/check.mjs
npm --prefix site test
npm --prefix site run build
```

Use the OpenSpec workflow for feature and bugfix changes. Keep generated assets and their source definitions consistent. The Studio-owned check entry temporarily calls the retained kit checker; see [local checks](CONTRIBUTING.md#local-checks) for its migration boundary. Human admission controls CI and AI runs; see the contributor guide. A successful local build does not deploy the site.

## Source ownership

`ejm-ui` owns active UI tokens, themes, reusable components, and shared site infrastructure. `ejmlabs` owns Studio pages and content, project discovery, brand guidance, and public download assembly. Make shared implementation changes in `ejm-ui` and consume its public `@ejm/*` exports here.

This checkout still depends on the retained live kit files. Their retirement needs pinned public owner source assembly and Studio adoption first. Both X kit copies and the swag files are removed. See the [cleanup plan](openspec/changes/retire-kits-and-internal-briefs/design.md) and [open tasks](openspec/changes/retire-kits-and-internal-briefs/tasks.md). Keep needed brand source, provenance, and font notices through that migration.

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
