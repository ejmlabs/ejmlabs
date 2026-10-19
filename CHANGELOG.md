# Changelog

Changes follow [Semantic Versioning](https://semver.org/). Each repository is versioned independently.

## [Unreleased]

### Added

- Shared repository standards, explicit human admission, protected merge gates, two-pass Codex review, and a draft source release pipeline.

### Changed

- Correct Studio source guidance and record shared `ejm-ui` ownership and the remaining live kit migration.
- Check generated site output for working links, retained assets and notices, response headers, and absent retired resources.
- Route local consistency commands and site tests through Studio-owned `scripts/check.mjs`, retaining the existing kit checker until public UI adoption.

### Removed

- Obsolete redesign handoff with outdated source paths and workflow instructions.
- Kit archive generation and download offers, X kit pages, and the swag gallery from generated site output.
- Three committed ZIPs, duplicate X source and handoff files, and five unused kit helpers.
- Inert root X rendered assets and bundled font copies, with their notices, plus retired swag artwork, mockups, and handoff docs.
- Remaining copied X rendered assets and bundled font copies, with their notices.

## [0.1.0] - 2026-10-18

- Initial development baseline. This entry documents source version metadata; it does not assert a published release or production readiness.
