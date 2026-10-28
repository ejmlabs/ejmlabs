# Design

## Context

The project owns the support claim; a local Linux dogfood build is experimental and does not qualify a platform.

## Goals / Non-Goals

Correct the Studio fact and stale retained-kit guidance; do not change distribution, runtime behavior, or deployment.

## Decisions

State the documented macOS target and distinguish unsupported platforms. Keep link and structure assertions while removing assertions that pin incidental homepage words.

## Risks / Trade-offs

A copy change may miss a required public fact; run the full site tests and inspect the built output.
