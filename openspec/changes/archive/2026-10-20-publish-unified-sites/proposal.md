# Proposal

## Why

Commit the verified shared redesign and publish all four sites as requested.
Clean release worktrees must prove the selected source without relying on
unrelated work or generated files in the primary checkouts.

## What Changes

- Repair small test setup and browser cleanup defects exposed by clean UI checks.
- Refresh consumer lock metadata for the declared shared site dependencies.
- Correct public guide claims that describe APIs or files absent from the selected release source.
- Check and commit scoped release snapshots through normal repository hooks.
- Preserve other working changes and staged files while integrating the commits.
- Publish the four existing Workers and verify their live routes and behavior.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

None. This is test tooling, lock metadata and publication of existing contracts.
The scrolling and design contracts were synced in the preceding changes.

## Impact

ejm-ui owns fixture setup and browser resource cleanup. Each consumer owns its
lockfile, site composition and product guides. Guide corrections must match the
selected runtime source without adding unreleased runtime features. The existing Cloudflare configs own publication:
Studio, CLI and Harness serve assets; IDE retains its Worker and release bucket.
Dependency direction stays from sites into public shared exports. No runtime
feature, provider, credential, release API or native source is added to the
selected release. No package or repository visibility change is required.
