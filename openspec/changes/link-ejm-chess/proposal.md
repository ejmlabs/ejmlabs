# Proposal

## Why

Chess is becoming its own product in `ejmlabs/ejm-chess`, hosted at `chess.ejmlabs.com`. Visitors to this studio site still need a way to find that product and its guides after publication. The studio must not describe chess as a coding tool or link to it before the destination is real. Pull request #14 planned the game inside this repository; the product work now belongs in the chess repository.

## What Changes

- Add studio discovery of published chess as an external project at `https://chess.ejmlabs.com`, with a Play action and copy that matches the published product.
- Link to the published chess player guide and developer guide on that host. Do not copy chess rules, fair play, privacy, or operations text into this site.
- Keep those links on the canonical public host. Do not point visitors at a `workers.dev` address, a version URL, a preview host, a country gate, or a private-service sign-in.
- Leave chess unpublished on the studio site, or label it as planned with no active Play claim, until the product site and guides are verified. Omit chess from navigation when shared packages include it before that verification.
- Keep the existing ejm-cli, ejm-ide, and ejm-harness links in place.
- Building, hosting, and running chess are out of scope. Play, competition, fair play, accounts, ratings, and the chess host's edge configuration belong to `ejmlabs/ejm-chess`.

## Capabilities

### New Capabilities

- `ejmlabs-site`: Discover the published chess product with an accurate Play action, without treating it as a coding tool.
- `documentation-discovery`: Link to published chess-owned player and developer guides.
- `public-web-access`: Point chess discovery at the canonical public host as an ordinary public link.

### Modified Capabilities

None. `openspec/specs/` has no `ejmlabs-site`, `documentation-discovery`, or `public-web-access` specs. The chess discovery requirements are added as new capabilities. Main has no baseline requirement text to modify.

## Impact

After this change is approved and applied, the studio page content and its link checks change. The current home page in `site/src/index.html` lists only ejm-cli, ejm-ide, and ejm-harness, and it has no documentation section. This proposal does not change that page, `site/wrangler.jsonc`, or any chess runtime. No production behavior changes until apply, and chess links stay off until their destinations are verified.

This planning change does not authorize implementation, CI spending, or deployment. Apply waits for an explicit implementation request after the change is approved.
