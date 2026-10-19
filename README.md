# ejmlabs

The ejmlabs brand guide, the design kit that makes every site and application look the same, and the studio website at [ejmlabs.com](https://ejmlabs.com/).

- `design-kit/`: brand assets plus the site kit and application kit. Start with `design-kit/README.md`.
  - `design-kit/SITES.md` and `design-kit/web/`: the page shell for every website, with a starter page.
  - `design-kit/UI.md` and `design-kit/ui/`: one dark and light theme and the components for desktop, web and terminal apps. `design-kit/ui/TUI.md` is the terminal guide.
  - `design-kit/scripts/build-ui.mjs`: checks contrast and generates CSS, Rust, Monaco and terminal color files from `ui/theme.json`.
- `site/`: the studio website. See `site/README.md`.
- `ejmlabs-design-kit.zip`: the kit for sharing or import. It is generated, not committed: `cd site && npm run build` writes a fresh copy into `site/dist/`.
- `x-kit/`: the X profile kit.

## Common tasks

```sh
node design-kit/scripts/build-ui.mjs          # after editing ui/theme.json
node design-kit/scripts/build-ui.mjs --check  # verify contrast and that generated files are current
cd site && npm test && npm run build          # test and build the website
```

## Projects

ejmlabs publishes three open source projects under the MIT license: ejm-harness, a reusable Rust engine for coding agents; ejm-cli, a terminal coding agent built on it; and ejm-ide, a desktop IDE with an agent beside the editor. Their interfaces follow `design-kit/UI.md`.
