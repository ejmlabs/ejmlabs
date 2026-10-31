# Changelog

Changes follow [Semantic Versioning](https://semver.org/). Each repository is versioned independently.

## [Unreleased]

- Move the shared ejmlabs/.github pins to ba109a5, resync the shared agent files, and link the shared CI deploy reference from the deploy docs instead of restating the pipeline.

- Deploy ejmlabs.com when a change merges to main: build without credentials, deploy staging at staging.ejmlabs.com, then production, using the shared deploy workflow. The owner must first create the `staging` and `production` GitHub environments and add the Cloudflare token to each.

- Show ejm-ui's new u-and-block mark in its project rows and band.

- Describe gerry with the copy on its own site, meetgerry.ai.

- Add gerry's mark to its home row, drawn in the ejmlabs ribbon style with Ink and Paper versions.

- Write gerry in lowercase, like the other project names.

- Describe ejmlabs as open source projects and commercial products, and list Gerry apart from the open source projects on Home, with its proprietary license in the footer.

- Add a Download page, a generated `install.sh` and a release manifest, with report links per product and a download and report data statement. The manifest is empty until a release is published.

- Adopt shared brand-name fitting so project names stay on one line.

- Add ejm-ui to Studio project discovery with gallery, documentation and source links.

### Added

- Public project, About, Brand and Privacy pages with approved marks, clear contribution links and passive product examples.
- Curated brand and swag downloads with the original rights and font notices.

- Shared repository standards, explicit human admission, protected merge gates, two-pass Codex review, and a draft source release pipeline.
- Pinned public UI source metadata for trusted shared preparation, retaining all runtime assets and fonts until fresh installed-pipeline verification and owner adoption.
- Exact static UI install manifests, full lockfile, and owner license for initial dependency review before the installed source pin can supply its archive.

### Changed

- Propose the accepted shared UI source pin with complete hash-bound review context; site redesign adoption follows protected pin acceptance.
- Build Studio with public ejm-ui components, tokens, prerendering, motion and site policy.
- Keep copy brief, remove the home slideshow and retain useful no-script content.
- Resolve public brand downloads from owner exports instead of restoring duplicate brand asset trees.

- Correct Studio source guidance and record shared `ejm-ui` ownership and the remaining live kit migration.
- Check generated site output for working links, retained assets and notices, response headers, and absent retired resources.
- Route local consistency commands and site tests through Studio-owned `scripts/check.mjs`, retaining the existing kit checker until public UI adoption.
- Couple PR and draft-release callers to reviewed shared `6717b433c462e01abaed86e2118e4843827598cb`, with exact old/new static source context and current source-admission guidance.
- Assemble favicon, fonts, icons, lockups, logos, and social files from the pinned public `@ejm/tokens/assets/*` exports, preserving every generated path, byte, mode, and font notice.
- Assemble complete public motif and template families from the same pin; stop local motif checking while retaining all other checker contracts. All 238 output paths and modes stay unchanged. Only the emitted raw checker-script bytes change; the other 237 files, including every rendered/runtime asset and notice, remain exact.
- Verify the installed shared caller and full pinned UI source handoff through fresh PR #10, both complete Codex Sol 6.1 medium reviews, and all protected checks.

### Removed

- Obsolete redesign handoff with outdated source paths and workflow instructions.
- Kit archive generation and download offers, X kit pages, and the swag gallery from generated site output.
- Three committed ZIPs, duplicate X source and handoff files, and five unused kit helpers.
- Inert root X rendered assets and bundled font copies, with their notices, plus retired swag artwork, mockups, and handoff docs.
- Remaining copied X rendered assets and bundled font copies, with their notices.
- 64 duplicate local asset and font files, totaling 1,916,019 source bytes, replaced by their exact public owner exports.
- 41 duplicate local dots, echo, flow, orbit and ripple motif files, totaling 3,264,491 source bytes.
- The final 39 motif and 12 template copies, totaling 2,223,201 source bytes. The existing public owner exports supply them; build output paths, bytes and modes remain identical for this deletion.

### Security

- Move wrangler to 4.153.0, the first release whose miniflare pins undici 7.30.1, for GHSA-4qv8-2p9j-2685, GHSA-f72v-6w45-q472, GHSA-xjj6-f33q-929c, GHSA-4w7w-5xrc-9h26, GHSA-2m5v-pch6-74hx, GHSA-qrxm-fqhp-jwvm, GHSA-9fm3-97px-rjf6 and GHSA-55wc-3pg8-jfw6. This is site tooling only; the deployed Worker and site output do not include undici.
- Run the pinned wrangler (`npx --no-install wrangler` from `site/`) in the local dry-run and rollback commands, so they use the locked dependency tree instead of a global or freshly downloaded wrangler. CI deploys already use the wrangler pinned in ejmlabs/.github.
- Keep minimatch 3.1.5, which serve and serve-handler use only in the local perf script. It does not contain the code GHSA-g3hv-75wg-m249 describes, and serve-handler pins it exactly, so no compatible fix exists.

## [0.1.0] - 2026-10-18

- Initial development baseline. This entry documents source version metadata; it does not assert a published release or production readiness.
