# Proposal

## Why

The shared CI gate needs individual site test outcomes to identify inconsistent tests across independent runs.

## What Changes

- Allow CI to request a JUnit report while preserving normal output and the original test result.

## Capabilities

### New Capabilities

- `site-test-results`: Machine-readable outcomes from the existing site tests.

### Modified Capabilities

None.

## Impact

The site test command and its CI reporting change. Production site behavior is unchanged.
