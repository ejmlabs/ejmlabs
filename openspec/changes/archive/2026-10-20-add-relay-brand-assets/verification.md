# Local verification

Verified October 20, 2026. This record covers prepared artwork, not a product
release or hosted CI.

- Targeted export: 34 generated files, 900891 bytes. The complete Relay folder,
  including its guide, is 35 files and 906932 bytes, below 1 MiB.
- Mark SVGs: 2829 to 2833 bytes, below 8 KiB. Outlined logos: 8467 to 8475 bytes,
  below 24 KiB.
- Two isolated exports matched every path and byte. Regenerating the default
  three-project kit matched all 104 prior output files. All 117 existing studio
  and project artwork files stayed unchanged.
- Production SVGs have no live text, script, foreign object or remote reference.
  Review artwork embeds the exported small PNGs. Six transparent PNGs retain
  alpha. Browser dimensions and the ICO's 16/32/48 px entries passed.
- The existing raster checker found two ribbons at 16/24/32 px and gap-channel
  p5 widths of 1.24/1.87/2.49 px. Source syntax checks passed.
- Root inspected the combined light/dark/family/small-icon board once. No
  correction was needed. The local gallery opened in the in-app browser; its
  review SVG and 16/24/32 PNGs decoded at their intended dimensions. Guide links
  resolve locally.
- Tools: Node 23.10.0, HarfBuzz 14.6.0, librsvg 2.63.3 and existing bundled Pillow
  12.3.0. No dependency was added.

Detailed inventories and checks are in
`/private/tmp/ejm-relay-logo-local-20261020/`. Reproduce the export using the
[Relay guide](../../../../design-kit/projects/relay/README.md).

## App preview and follow-up

The reviewed fixture host opened the synthetic account at local port 54035.
It exposed an HTML-only controller, not live pairing. The user reviewed it and
requested a quieter dashboard and a controller matching the CLI. That refinement
is being prepared separately in
`/private/tmp/ejm-relay-cli-workspace-preview-20261020/ejm-cli` under the existing
`deploy-private-remote-relay` plan.

The 15-minute fixture lifetime expired before the attempted manual stop. Its
receipt records disposal, unchanged source/assets and zero request failures,
but marks the lifetime fallback as failed. It is not a new QA acceptance pass.
The preserved receipt is
`/private/tmp/ejm-relay-form-fixed-cua-resume-20261020/root-execution/host-20261020T135033.476138Z.json`.

The Relay logo is ready for local review. Shared-package adoption, relay use,
full product gates, public docs publication and deployment remain separate work.
