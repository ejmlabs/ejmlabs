# Proposal

## Why

Public contributors need current guidance and a site that offers only maintained
material. Obsolete handoffs, duplicate social kits, and archive downloads add
confusion and upkeep while the shared UI owner migration remains open.

## What Changes

- Remove the obsolete redesign brief and correct source ownership guidance.
- **BREAKING:** Retire kit ZIP offers and generation, the X kit pages, and the
  swag gallery. Do not publish their remaining files or offer replacement kits.
- Remove three committed ZIPs, both copies of the X kit source and handoff
  files, and five unused kit generation, preview, and verification helpers.
- Keep active site CSS, JavaScript, fonts, icons, motifs, headers, notices, and
  provenance unchanged. Retain the remaining rendered X and swag files for
  separate bounded removals, outside the generated site.
- Leave public `ejm-ui` source assembly, Studio owner adoption, full legacy kit
  retirement, and browser verification open.

## Capabilities

### New Capabilities

- `studio-site-output`: Defines the static output boundary, retired downloads,
  retained live assets, and local verification of the Studio site.

### Modified Capabilities

None. This checkout has no existing main specs.

## Impact

`ejmlabs` owns Studio content and public output assembly. `ejm-ui` owns shared
tokens, components, and site infrastructure. Later adoption must consume pinned
public owner exports without copied implementations or private imports.

This phase changes the current static build, gallery, docs, and output tests.
It adds no dependency or service. It removes archive work from each build and
must stay below the existing 200-file, 12,000-line, and 1,000,000-byte PR bounds.
Local checks do not establish hosted CI, deployment, or publication.
