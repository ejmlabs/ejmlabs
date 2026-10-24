# Design

## Context

All four sites consume `ejmSite` from the public `@ejm/site/vite` export. It selects icons through the public project registry and `@ejm/tokens` asset exports. The live product SVG, ICO and touch icons match their current source bytes. CLI is the user's approved reference. The studio uses the same symbol as its header with a different color treatment.

The root build assembles public downloads from named retained assets in `design-kit`. Active shared site and token infrastructure belongs to `ejm-ui`, which has no OpenSpec directory. This repo-local change covers studio adoption, downloads and publication. Upstream shared edits follow that owner's normal workflow.

## Goals / Non-Goals

**Goals:** Preserve exact logo geometry, align the studio icon treatment with the family, and give browsers fresh content URLs after asset changes. The favicon fix adds no client code. Keep product JavaScript, all CSS and rendered page bodies unchanged.

**Non-Goals:** Redrawing product marks, changing native application icons, release installers, Worker behavior or site layouts.

## Decisions

1. Generate the studio's full icon family from its existing symbol through established SVG rendering and ICO encoding tools. Use the canonical token asset package, then sync only the approved nine files into the retained public kit. Avoid another active asset authority.
2. Consume shared content-versioned head and manifest links. Shared build code owns hashing and delivery; Node's existing crypto and filesystem APIs meet the need without a new dependency. Retain direct filenames for old links. Product artwork remains byte-identical.
3. Use existing build, head and asset checks. Add shared regression coverage for project selection and content invalidation. Do not add wording or source-shape tests for the root asset update.
4. Rebuild all four consumers and compare client asset inventories and rendered bodies with the published baseline. The three product bundles must remain byte-identical. The studio's older published build predates the already verified compiled playback work, so its rebuild adopts those existing shared changes. Record that difference and its smaller JavaScript payload. Preserve every stylesheet, rendered page body and existing byte budget. No playback source changes belong to this favicon fix.

## Risks / Trade-offs

- Browser favicon databases can outlive ordinary HTTP caches. Fresh icon URLs prompt a new fetch on navigation, but an already open tab may need a reload.
- Root download archives include copied public files. Sync the named icon allowlist and check archive contents against the canonical exported assets.
- IDE serves downloads through a Worker and R2. Deploy only the checked site assets with its existing configuration, verify runtime file hashes and compare the live release API before and after.

## Migration Plan

Freeze checked output and asset hashes in a new temporary publication directory. Publish the four existing Workers and verify live head links, icon and manifest bytes, routes, downloads and the IDE API. Record deployment identities. The prior deployment versions remain available for rollback if publication differs from the checked output.
