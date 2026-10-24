# Proposal

## Why

The user puts small footprint and fast execution ahead of the other engineering defaults. The current package rule wrongly rules out size as a reason to reject a package without distinguishing measured requirements from preference.

## What Changes

- Put footprint and speed first in `AGENTS.md` and all six project skills.
- Include memory, CPU, startup, latency, artifact size, I/O, and dependency cost in design decisions.
- Require measurements for performance claims and evidence for package exceptions.
- Preserve useful tests, safe local cleanup, skill metadata, and workflow instructions.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `agent-engineering-policy`: make footprint and speed primary goals and include resource requirements in package suitability.

## Impact

This updates seven instruction files and the engineering policy spec. It changes no runtime code, dependencies, or tests. Verification checks coverage, preserved skill content, skill validity, and OpenSpec validity.
