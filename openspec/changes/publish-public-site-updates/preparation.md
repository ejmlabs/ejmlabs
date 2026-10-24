# Prepared release

Updated 2026-10-21 after the protected Harness TLS merge and UI repair.
This is a preparation checkpoint. No sites have been deployed by this release
task. The release change remains open.

## Source candidates

| Repository | PR | Prepared commit | Scope and state |
| --- | --- | --- | --- |
| ejm-ui | [#13](https://github.com/ejmlabs/ejm-ui/pull/13) | `c7d53572d87e93c3cd755f336167da253eb87b7d` | Repaired shared foundation; fresh human readiness pending |
| ejm-ui | [#14](https://github.com/ejmlabs/ejm-ui/pull/14) | `b29012923013f4369e76b35ff3f918523d349bb6` | Public assets; draft stacked on #13 |
| ejm-ui | [#15](https://github.com/ejmlabs/ejm-ui/pull/15) | `8e09694d0272463e74636a6b890e56397c54ddee` | Native previews and gallery; draft stacked on #14 |
| ejmlabs | [#17](https://github.com/ejmlabs/ejmlabs/pull/17) | `e1bf2a69a5faf2d2443adadf81cbd0cce3d493d3` | Studio runtime source; later commits update only the release record |
| ejm-cli | [#24](https://github.com/ejmlabs/ejm-cli/pull/24) | `5a37a2ff891515aff201faf7dd0ba620a06c48b7` | CLI site and guides; draft |
| ejm-ide | [#16](https://github.com/ejmlabs/ejm-ide/pull/16) | `c30dd4155cbf987b18e565a90f8394add517e712` | IDE site and guides; draft |
| ejm-harness | [#26](https://github.com/ejmlabs/ejm-harness/pull/26) | `bf2dc9e73029279764b4fbb34dbdf00fb72512a5` | Harness site, guides and registry presentation; draft |
| ejm-harness | [#31](https://github.com/ejmlabs/ejm-harness/pull/31) | `3f3bf5b54ab95f7845390196d000ea4f13a6d9e4` | Independent-family source prerequisite; draft, human readiness pending |

The current UI candidate is `8e09694d0272463e74636a6b890e56397c54ddee`,
tree `6335c75a4edb5aeeea55986cb23e1f5867ad748c`. It passes its full owner
gate, build and installed-package proof. CLI also passes a fresh build and
three-route wire gate against it. The four sites' earlier checks against
`7f643571dc0ebec611580bbd3b59ad55e8bbf0e6` remain historical evidence.
Task 1.3 is reopened for final consumer checks and source-accurate guide updates
after the shared owner and family prerequisites are accepted.
No candidate is an accepted protected UI dependency. Studio retains its old protected pin; CLI
retains protected UI `79a1aa8b1075f834717bc0c0299dc2c41a22b966`; IDE and
Harness source candidates add no active selector.

## Inert source prerequisites

Each row below is a bounded draft containing exact changed UI source and
hash bindings for the earlier `7f643571dc0ebec611580bbd3b59ad55e8bbf0e6`.
These bindings need refresh for the final accepted owner before admission or
activation. Parts are stacked in the listed order within each repository.
They preserve existing workflow context and do not activate a candidate.

| Repository | PR | Commit |
| --- | --- | --- |
| ejmlabs | [#18](https://github.com/ejmlabs/ejmlabs/pull/18) | `1b0fcab7c1e34cb63644ea6c3acd355a0268d769` |
| ejmlabs | [#19](https://github.com/ejmlabs/ejmlabs/pull/19) | `5220a0de9136ad8bb420ac9621b839e7dd52be46` |
| ejmlabs | [#20](https://github.com/ejmlabs/ejmlabs/pull/20) | `77f2b599317753b33da7aa3001f6082a0a1cda0f` |
| ejmlabs | [#21](https://github.com/ejmlabs/ejmlabs/pull/21) | `69921314c281c7749920670a110e393cc94f566a` |
| ejmlabs | [#22](https://github.com/ejmlabs/ejmlabs/pull/22) | `af995f95f0a33eb865a4d4a2d0b351370e8b32ea` |
| ejm-cli | [#25](https://github.com/ejmlabs/ejm-cli/pull/25) | `7ebe1e26607c2995878ecd727649c1dadd4fbd38` |
| ejm-cli | [#26](https://github.com/ejmlabs/ejm-cli/pull/26) | `8e02b5a4aef59e0489e3c72746803d132e690c4a` |
| ejm-cli | [#27](https://github.com/ejmlabs/ejm-cli/pull/27) | `96d9cca47b3c774ec62cc5f5a34332b03cc7d7cc` |
| ejm-cli | [#28](https://github.com/ejmlabs/ejm-cli/pull/28) | `a2bac0f55d21b0f81c83018a1b0d312031255dbf` |
| ejm-ide | [#17](https://github.com/ejmlabs/ejm-ide/pull/17) | `35b3477b418f3e2bdc35815075ae5bfcc514a3c4` |
| ejm-ide | [#18](https://github.com/ejmlabs/ejm-ide/pull/18) | `1830503ed8a9bd09000068d8c2e9674cae05cbcb` |
| ejm-ide | [#19](https://github.com/ejmlabs/ejm-ide/pull/19) | `ee5bd4fdaf381aee3745569d0d90b7663ddbb9fa` |
| ejm-ide | [#20](https://github.com/ejmlabs/ejm-ide/pull/20) | `354622319c6b3b7b5959fb71ff09b07f0f884841` |
| ejm-harness | [#27](https://github.com/ejmlabs/ejm-harness/pull/27) | `5bf1315af908cbe3657105a75e6433d97c82fd4e` |
| ejm-harness | [#28](https://github.com/ejmlabs/ejm-harness/pull/28) | `621de67c5716494735483697d53277e31263479d` |
| ejm-harness | [#29](https://github.com/ejmlabs/ejm-harness/pull/29) | `8eb2b49193d85496d4bbad7b76cc8f720a866f07` |
| ejm-harness | [#30](https://github.com/ejmlabs/ejm-harness/pull/30) | `45b38a6efaf6e0b3a92ee6b48076717edd6d2ddd` |

Studio contains 327 complete changed owner fixtures. Each product contains
269 complete changed fixtures relative to its known UI source. Exact blobs,
modes, sizes, hashes and all 13 install-metadata bindings were checked.
Known owner whitespace in one fixture is retained so its bytes stay exact.

Additional prerequisites:

- [IDE #15](https://github.com/ejmlabs/ejm-ide/pull/15),
  `ebc0531df44a485729a37a3e9b68242e312d8dc7`, supplies known protected-79a
  metadata and its initial selector. Its protected base has no UI dependency,
  so the existing conditional CI path can check this bootstrap.
- [Harness #25](https://github.com/ejmlabs/ejm-harness/pull/25),
  `fca246aecc458ede96a7efe3761c5b1d7fcc1775`, supplies known protected-79a
  metadata without a selector. It follows the TLS prerequisite below.

## Verified preparation

- UI foundation: the prior Linux watcher failure was reproduced under parallel
  suite load. The repair rechecks HTML document requests and confirms a real
  native change before testing additions. Deadlines remain unchanged. The final
  Linux arm64/Node 24.21 gate passes 903 tests with seven Chrome-dependent skips.
  The public window CSS defect found by review is fixed and covered by two
  compile regressions. Build, budgets, installed-package proof and standards pass.
  Hosted CI and review of this new head remain pending.
- UI preview: all 924 tests, all 18 gallery routes, unchanged budgets and the
  installed-package proof pass on the repaired stack. The packed starter has
  17 matching root/HTML files and 52,705 bytes of CSS in each build. The workspace
  and installed JS outputs are 276,924 and 276,907 bytes; they are not byte-equal.
- Studio: locked install, type check, seven route builds and all 23 output
  contracts pass. About and Watch were checked in both themes at narrow
  and wide widths. Public actions use the shared 44 px button recipe.
- CLI: the earlier normal native gate and 87 site tests pass. The rebuilt site's
  fresh three-run mobile gate passes against the repaired owner: home transfers
  97,248 bytes of JS against a 97,280-byte limit. All three routes have zero CLS
  and TBT; median LCP is 724 to 732 ms under the unchanged simulated profile.
- IDE: normal verification passes with 619 web and 213 native tests; seven
  existing native cases remain ignored. Site and guide checks pass.
- Harness: both source commits passed the full normal hook. The full
  registry gate passed both Worker bundles and all 25 local API/auth cases.
  Its final recovery-copy change passed another full normal hook and the
  relevant frontend checks. No browser or live registry proof is claimed.
- Harness family prerequisite: 42 focused package/archive tests, the unchanged
  normal commit hook, the registry gate with 24 API/auth fixtures, strict specs
  and source/fixture integrity checks pass. It contains 44 files and 533 changed
  lines. Dependencies, security regressions and existing deadlines are preserved.
  Public source uses `ejm.package.json`, no default registry, and an optional
  registry client. Coordinated CLI and IDE adoption remains pending.

These are local source and build results. They do not replace protected CI
or prove publication. The Studio release-record follow-up affects no public
documentation or runtime; affected public guides are in the source PRs.

## Required order and human decisions

1. Harness #24 is accepted. Admit and accept Harness #31, then curate the
   narrow CLI origin/optional-client adapter and IDE source pin. Preserve hosted
   security tests and validate a required origin before creating package storage.
2. Admit current UI #13 through the required exact-commit human decision.
   Accept the owner stack through both reviews, checks and final approval.
3. Refresh and accept each consumer bootstrap and complete source stack in order.
   Retarget descendants after each merge so each diff stays bounded.
4. Regenerate activation for the actual accepted owner commit and tree,
   reusing unchanged fixture blobs. Accept each separate protected pin.
5. Rebase and admit site source against that protected dependency. Complete
   both reviews, checks and the exact-commit final approval.
6. Build accepted source, publish the existing product targets and Studio,
   then verify routes, guides, assets, downloads, headers and deployment IDs.

[Harness #24](https://github.com/ejmlabs/ejm-harness/pull/24),
`63cade3be40f825e56c9b050e26f982f86cc82c7`, was approved and merged normally
as `a2e77031248d7f6cebb545798776e572a5a3f32d`, tree
`f73bf1a36095a8967b4f3a042ce444b1b5ef182a`. The accepted tree matches the
reviewed TLS patch. This source merge did not deploy a site.

UI #13 at `c7d53572d87e93c3cd755f336167da253eb87b7d` and Harness #31 at
`3f3bf5b54ab95f7845390196d000ea4f13a6d9e4` need fresh human CI and review
admission. Their repositories require a separate final approval after successful
review. No new admission or merge is supplied by this record.

## Other targets and preserved boundaries

- Gallery target: `ui.ejmlabs.com`. Source and dry-run preparation are
  complete; protected acceptance, first deployment and live checks remain.
- Registry target: `registry.ejmlabs.com`. Two D1 databases, private R2,
  reviewed migrations, private auth deployment and real acceptance remain.
  The owner must create the GitHub OAuth app and supply its credentials and a
  fresh `BETTER_AUTH_SECRET` through hidden prompts. The callback is
  `https://registry.ejmlabs.com/api/auth/callback/github`. Explicit CLI origin
  selection is part of the pending family prerequisite. Source publication
  alone does not release new native installers or an available registry service.
- Remote Control owns Relay security and live acceptance. Its admitted
  [CLI #23](https://github.com/ejmlabs/ejm-cli/pull/23) at
  `e0bf63238ee024b759eaf69510c470d262e06caf` passed Quality, standards
  and one complete review. The other review timed out without a report.
  It needs a separately authorized retry. Shared presentation adoption
  follows the accepted UI and protected CLI pin. Accounts stay closed.
- Approved Relay notice and terms are included with unpublished status and
  no invented effective date. Assign and check the real publication date
  through a reviewed publication window before Relay uses their live URLs.
- Chess has no accepted public bootstrap and differs from its frozen
  deployment in server behavior. Its protected private preview and stop
  flags remain. No game launch or backend publication is part of this upload.
- Native installers, SDK releases, billing and access policies are unchanged.
- All five primary heads and Git indexes match the captured baseline.
  CLI retains its three pre-existing staged files. Candidates use isolated
  checkouts and preserve unrelated primary work.

Task 1.4 remains incomplete for the remaining native presentation boundaries.
Task 2.1 remains open until all scoped branches and decisions are recorded.
Publication, first launch and final release closeout are still pending.
