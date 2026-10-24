# Design

## Context

See `proposal.md` for motivation. Seven instruction entry points already share package, test-value, and campground rules. Their package paragraph rejects size without considering measured requirements. The active policy spec records that earlier wording.

## Goals / Non-Goals

**Goals:** The same resource priority appears first in each entry point. Package suitability includes functional, security, footprint, and performance requirements.

**Non-Goals:** Runtime optimization, invented performance targets, new benchmarks, test-suite changes, and edits to the previous archive.

## Decisions

- Add one concise priority section before the shared package rule in all seven files. A reference alone would not reach independently loaded skills.
- Replace the earlier package paragraph. This removes the blanket rejection of size arguments and requires evidence of an unmet resource requirement.
- Keep correctness, security, and required behavior as constraints. Document measured trade-offs when footprint and speed conflict.
- Validate the instructions and specs with existing tools. This prose change needs no new tests or native builds.

## Risks / Trade-offs

- Resource goals can conflict. Require workload measurements and a recorded trade-off.
- Generated skills can be refreshed. Preserve local policy sections when refreshing upstream workflows.
