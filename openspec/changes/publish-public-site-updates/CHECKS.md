# Draft verification

Checked 2026-10-22 on macOS arm64 with Node 24.22.1.

| Check | Result |
| --- | --- |
| `openspec validate --all --strict --no-interactive` | 13 passed, zero failed |
| `git diff --cached --check` | Passed after whitespace cleanup |
| Pinned UI install | `npm ci --ignore-scripts` passed, zero audit vulnerabilities |
| Studio install | `npm --prefix site ci --ignore-scripts` passed |
| Studio typecheck | Failed with the three demo-contract errors below |
| Build, page tests and budgets | Not run after the typecheck blocker |
| Secret scan | Gitleaks scanned 5.88 MB; four findings are unchanged public Cloudflare analytics site identifiers in retained UI source, not credentials. No finding in added source. |
| CI, two reviews, merge, deployment | Not requested or performed for this draft |

## Typecheck blocker

The exact accepted Studio UI pin is
`a5551a056b04bc0c3472afc443621a552747613c`. Its workspace dependencies were
installed before the final typecheck. `site/src/pages/Try.tsx` fails because:

- `@ejm/demos/islands/ide-lazy` does not export `LazyIdeShowcase`.
- `LazyCliShowcase` requires a `source` prop.
- `LazyHarnessShowcase` requires a `source` prop.

Current main uses the public Preview islands. Preserve the pending composition
for review, then choose whether to keep those accepted islands or implement the
intended change through the shared owner. Do not change exports or bypass types
merely to make this aggregate draft pass.

## Review size and evidence limits

This is an aggregate preservation PR, over the installed 1 MB review limit.
Split coherent changes before admission. Do not raise the limit or assume this
PR authorizes CI spending. Every changed head requires the existing human
admission and approval process.

Raw recordings and machine-specific capture evidence remain local. Their paths
and original hashes appear in `outstanding-files.json`; ignored build outputs
are not enumerated. The inventory hashes describe the source snapshot, before
minor whitespace cleanup or documented reconciliation in this branch.

## Public documentation

This PR preserves pending public prose and links. Accepted root setup commands
are retained; an older prose alternative is review material only. No public
site was deployed from this draft. The launch-film guides describe unfinished,
unapproved work and are not release instructions to execute now.
