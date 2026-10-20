# Design

## Context

See `proposal.md` for why this change exists. The current studio home page, `site/src/index.html`, hardcodes external links to ejm-cli, ejm-ide, and ejm-harness in the hero index, the projects section, and the footer. It has no chess link and no documentation section. The projects introduction says those three products are open source under the MIT license. The try section is a simulated ejm-cli session.

`site/wrangler.jsonc` attaches `ejmlabs.com` as this site's custom domain. Its preview environment is a separate `workers.dev` worker with an empty route list. That file does not configure `chess.ejmlabs.com`.

`openspec/specs/` has no `ejmlabs-site`, `documentation-discovery`, or `public-web-access` specs. Pull request #14 modified local baselines that are not on main. Shared UI remains in `ejm-ui`. This page owns its project links directly. It does not contain a project registry.

## Goals / Non-Goals

**Goals:**

- Use one publication gate for the chess project link, Play action, and guide links.
- Send every published chess destination to `https://chess.ejmlabs.com`.
- Describe chess from its published facts, separately from the coding tools.
- Leave the three current project links and the simulated ejm-cli demo working.

**Non-Goals:**

- Building, hosting, or operating chess, including play, accounts, ratings, fair play, and the chess host's edge configuration.
- Reconstructing the missing home-page, guide-catalog, and host-protection baselines from pull request #14.
- Adding user and developer guides for ejm-cli, ejm-ide, or ejm-harness.
- Changing this site's Worker routes or preview hostname.

## Decisions

### 1. Add requirements because main has no baseline

These three capabilities are new on main. A `MODIFIED` requirement replaces a whole existing block, and archive cannot apply it when that block is absent. Pull request #14's modified home-page, guide, and host requirements depend on local specs this branch does not have. Guessing those baselines would publish unrelated site and hosting behavior as accepted specs.

This change adds only the chess discovery requirements. Each one includes the constraint that the current product links remain.

Alternative: restore pull request #14's `MODIFIED` blocks and invent the pre-chess base specs. Rejected. The pre-chess wording is not in this repository, and the game-connection and chess-host scenarios belong to `ejm-chess`.

### 2. This repository only links

`ejmlabs/ejm-chess` owns the product, its guides, and `chess.ejmlabs.com`. After approval and an explicit apply request, studio work edits studio content and checks. It does not add chess routes, Workers, or chess-host security policy in this repo.

Alternative: keep the chess-play, chess-competition, and chess-fair-play deltas from pull request #14. Rejected. The product is a separate public repository.

### 3. One verified-publication gate

Do not add an active chess link, Play action, or guide link until `https://chess.ejmlabs.com` and the specific guide URLs are the published product. Before that, omit chess or show a planned label with no Play claim. If shared packages later include an unreleased chess identity, navigation still omits it.

The gate is content in `site/src/index.html`: the hero index, the projects section, and the footer, plus the place that lists project guides. Do not copy an `ejm-ui` registry into this repo. If apply later consumes a shared registry, use its public discoverable flag and test that an unreleased identity stays hidden.

Alternative: link chess as soon as `ejmlabs/ejm-chess` exists. Rejected. A repository is not a verified public destination.

### 4. Canonical public URLs only

Published chess hrefs use `https://chess.ejmlabs.com` and guide paths on that origin, with `rel="external"`. They do not use a `workers.dev` hostname, a deployment version URL, or a preview host. The studio page does not add a country restriction or a sign-in wall in front of the link. Account rules on the chess site stay in that product.

### 5. Keep the chess entry distinct from the coding tools

The chess entry says it is a multiplayer browser game, and Play is its primary action. Status, source access, license, and availability follow the published chess facts. Do not extend the MIT sentence that covers the three coding tools, do not add a simulated chess demo, and do not give chess coding-tool setup instructions. Guide links leave this site. This site does not reproduce chess rules, fair play, privacy, or operations text.

## Risks / Trade-offs

- [A link goes live before the chess host does] → Check the canonical origin and each guide URL before adding Play or guide links. Until then, ship the omitted or planned state only.
- [A later shared registry exposes unreleased chess] → Keep an explicit navigation check that an unreleased chess identity produces no studio or cross-site chess link.
- [A new guide list is read as a promise to document the coding tools] → Add only the two verified chess guide links in this change.
- [Public web access is read as the chess host's protection contract] → The capability covers studio link destinations. Host protection, game connections, and account routes stay in `ejm-chess`.

## Migration Plan

1. Keep this pull request limited to the planning artifacts. Do not edit site code until the change is approved and a new request starts apply.
2. On apply, check the live chess origin and the two guide URLs first. If they are not the published product, implement only the omitted or planned state and leave the publication tasks open.
3. After verification, add the external project links, Play action, and guide links, with site checks for the canonical host and the unchanged current products.
4. Rollback removes the chess links from the studio page. There is no data migration and no chess resource to undo in this repository.
