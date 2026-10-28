# Spec Delta

## Purpose

Defines the Studio site's generated public output so visitors see current
material while needed assets, notices, and response headers remain usable.

## ADDED Requirements

### Requirement: Retired kit offers are absent

The Studio site SHALL omit kit ZIP downloads, X kit pages, and the swag gallery
from its generated public output and current navigation. It SHALL offer no
replacement archives for this retirement.

#### Scenario: Site output is built

- **WHEN** a contributor builds the Studio site from this source
- **THEN** the output contains no ZIP files, X kit subtree, or swag subtree
- **AND** the home page and brand gallery offer none of those retired resources

### Requirement: Live asset contracts remain usable

The Studio site SHALL retain the CSS, scripts, fonts, icons, motifs, and response
headers required by its current pages. Retained assets and font notices SHALL
preserve their source bytes and remain reachable at the paths those pages use.

#### Scenario: Current pages load from generated output

- **WHEN** a contributor checks the generated home page and brand gallery
- **THEN** their local links and assets resolve within that output
- **AND** the output carries the source response headers and required notices

### Requirement: Verification scope is clear

The Studio guides SHALL distinguish local output checks from hosted checks,
browser verification, and publication. They SHALL keep the remaining shared UI
adoption and live kit retirement work visible until that work is verified.

#### Scenario: Local checks pass

- **WHEN** a contributor reads the cleanup evidence after a successful local build
- **THEN** it reports the checks performed and the hosted and browser checks unrun
- **AND** it makes no claim that the public site has been deployed or verified

### Requirement: Public UI source installation preserves live assets

Studio SHALL use the existing shared preparation contract to install a fixed
public UI owner manifest and coupled immutable workflow callers with canonical
old/new static review sources. Installation SHALL preserve every runtime and
font file and the generated output bytes and modes. Guides SHALL require a
fresh admitted PR against the installed pins before new owner API adoption or
live asset removal.

#### Scenario: A source installation PR is prepared

- **WHEN** Studio proposes its public UI manifest and new shared workflow pin
- **THEN** the manifest names only the public UI owner and a full commit SHA
- **AND** the current runtime assets, fonts, notices, and output retain their bytes
- **AND** the guides state that the installation run cannot prove its proposed
  trusted-base dependency and require fresh hosted verification after merge

#### Scenario: The install dependency is absent from the trusted-base packet

- **WHEN** the installation PR cannot supply its proposed UI archive through
  trusted-base preparation
- **THEN** it supplies exact static copies of the pinned UI root manifest,
  full lockfile, all root workspace manifests, and owner license
- **AND** a manifest binds each ordinary nonexecutable copy to its source
  repository, commit, tree, Git blob, mode, size, and SHA-256
- **AND** these copies are never imported, executed, or used as installed code
- **AND** static review does not replace fresh installed-pin verification

### Requirement: Adopted assets come from public owner exports

After installed-pin verification, Studio SHALL assemble the favicon, font,
icon, lockup, logo, and social asset families from the pinned public
`@ejm/tokens/assets/*` exports and remove their duplicate local source copies.
The source families SHALL have exactly the previous inventory, bytes, and file
modes, including both original font notices. The initial adoption of these six
families SHALL preserve every generated path, byte, and file mode.

#### Scenario: The selected asset families are assembled

- **WHEN** Studio builds beside the installed pinned public UI workspace
- **THEN** Node's package resolver selects only public token asset exports
- **AND** all 64 selected files keep their existing `/design-kit/` output paths
- **AND** the output inventory, bytes, modes, metadata, and headers are unchanged
- **AND** current guides explain the fixed source layout and install step

#### Scenario: Owner source is unavailable

- **WHEN** the pinned UI workspace or its installed package links are absent
- **THEN** the normal package resolution error stops the build
- **AND** the build neither downloads source nor falls back to retired copies

### Requirement: Motif and template adoption preserves runtime output

Studio SHALL assemble the complete 80-file motif and 12-file template families
from the same pinned public token asset exports. Their inventory, bytes and
modes SHALL match the previous Studio families. The first bounded removal
SHALL delete exactly 41 local dots, echo, flow, orbit and ripple files and keep
the other 51 local motif/template copies until the next source deletion.

#### Scenario: The first motif removal is built

- **WHEN** Studio resolves the complete public motif and template families
- **THEN** all 238 output paths and file modes remain unchanged
- **AND** all rendered/runtime assets, notices, metadata and headers remain exact
- **AND** only `design-kit/scripts/check-kit.mjs` changes its emitted bytes
- **AND** the other 237 output files remain byte-for-byte identical

#### Scenario: The retained consistency entry runs

- **WHEN** a contributor runs `node scripts/check.mjs`
- **THEN** the retained checker no longer invokes the local motif generator
- **AND** its theme, site CSS, contrast, class and documentation checks remain
- **AND** the existing output test compares all complete public asset families

#### Scenario: Local removal is prepared for review

- **WHEN** the bounded motif removal passes local checks
- **THEN** current guides name the one emitted developer-script byte change
- **AND** they distinguish those results from fresh hosted and browser checks
- **AND** the remaining live kit adoption and retirement tasks stay open

#### Scenario: The remaining local asset copies are removed

- **WHEN** the next bounded slice deletes exactly 39 remaining motif and 12
  template copies after the complete public families already supply output
- **THEN** each deleted source matches its pinned public-owner inventory,
  Git blob, bytes and mode
- **AND** all generated paths, bytes and modes remain identical
- **AND** runtime, resolver, generators, notices, workflow sources and pins stay
  unchanged while current guides record the completed source deletion
