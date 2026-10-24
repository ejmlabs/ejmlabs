# Design

## Context

See proposal.md for the problem. The affected studio files are security operations guidance and two archived Cloudflare changes. A launch source archive also retains earlier package identities. The working tree contains concurrent changes that this cleanup must preserve.

## Goals / Non-Goals

**Goals:** Remove cross-product identities while preserving useful project guidance, security boundaries, and honest evidence.

**Non-Goals:** Cloud configuration, deployments, credentials, proprietary source, and Git history are outside this source cleanup.

## Decisions

- `ejmlabs` owns studio text, governance, audit summaries, and retained launch archives. Public UI contracts remain in `ejm-ui`; the shared UI audit found no source references. Harness, CLI, and IDE contract edits use their own repository workflows.
- Filter audit records to the four public project sites and mark them as scoped excerpts. Keep original dates, observed protections, and verification limits. Remove unrelated service inventories and source links rather than assigning them to an open source project.
- Keep private-service protection as a general requirement. This preserves the safety rule without importing another product's operational details.
- Scope the security inventory requirement to project resources. A shared cloud account does not make every accessible service part of the open source project; preserve outside boundaries without copying their inventories or operating records here.
- Normalize only obsolete identities in the retained launch source archive, update its checksum records, and state that it is a revised reconstruction. Keep captured output and timings labelled as historical, not verification of the revised source.
- The harness will define `ejm.package.json` and require consumers to choose an explicit registry origin. No verified open source registry deployment exists, so this change must not invent a working endpoint. The CLI composes those public contracts and the IDE updates its guidance.
- Use existing standard archive libraries, existing site checks, and a focused reference scan. Add no runtime dependency or background work; the studio runtime and asset budgets remain unchanged.

## Risks / Trade-offs

- Filtering an audit can make an excerpt look complete. Mark each affected record and identify omitted unrelated details.
- Revising a captured source archive changes its bytes. Recompute its integrity records and retain the distinction between historical capture and revised source.
- Existing package archives use the prior shared manifest. The owner documents the new contract and updates consumers; no alias or private endpoint remains as a fallback.

## Migration Plan

Apply scoped source edits, revise the launch archive with explicit provenance, scan files and archive contents, run the existing studio checks, then sync and archive this change. Other owners validate their changed contracts. Publication follows the existing owner release process and requires separate authorization.
