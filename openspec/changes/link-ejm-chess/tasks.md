# Tasks

## 1. Keep chess hidden until publication

- [ ] 1.1 While `https://chess.ejmlabs.com` is unpublished or unverified, keep an active chess Play link and any chess href off `site/src/index.html`. Verify the built `site/dist/index.html` still links to ejm-cli, ejm-ide, and ejm-harness and contains no `chess.ejmlabs.com` href, no chess `workers.dev` host, and no preview chess URL.
- [ ] 1.2 If the page shows a planned chess label, verify that label has no Play action, no live-game claim, and no guide link. If chess is omitted, verify the built page has no Play claim for chess either.
- [ ] 1.3 Add a site check that the built page matches the chosen hidden or planned state. Verify `npm --prefix site test` passes. If the build consumes a shared package that includes an unreleased chess identity, verify the same check still finds no chess link and record the package version. If no such identity is present, verify this repo does not add one.

## 2. Add the verified project entry

- [ ] 2.1 After `https://chess.ejmlabs.com` is verified as the published product, add chess to the hero index, projects section, and footer with `rel="external"` and that canonical href, plus a Play action on the chess entry. Verify the built page keeps the three existing project links and the simulated ejm-cli demo.
- [ ] 2.2 Write the chess entry as a multiplayer browser game whose status, source access, license, and availability match the published product, including any published beta limit. Verify it does not reuse the sentence that all three coding tools are MIT, offer coding-tool setup, or add a simulated chess showcase.
- [ ] 2.3 Extend `site/test/site.test.mjs` so the published page asserts the canonical chess href, `rel="external"`, the Play action, and the unchanged current project links. Verify `npm --prefix site test` passes.

## 3. Link the verified guides

- [ ] 3.1 After the player guide and developer guide URLs on `https://chess.ejmlabs.com` are checked, add studio documentation links to both. Verify each built href stays on that origin, existing project links remain, and the studio page does not reproduce chess rules, fair play, privacy, or operations text. Record the checked URLs in the test.
- [ ] 3.2 Verify a chess guide whose URL has not been checked is absent from the built page. Verify `npm --prefix site test` passes for that state.

## 4. Check canonical public links and repo boundaries

- [ ] 4.1 Verify every published chess and guide href in the built page uses `https://chess.ejmlabs.com`, and that the page adds no country restriction or private-service sign-in in front of those links. Verify `site/wrangler.jsonc` still attaches only `ejmlabs.com` and adds no chess route, chess worker, or chess-host security policy.
- [ ] 4.2 Run `node scripts/check.mjs`, `npm --prefix site test`, and `npm --prefix site run build`. Verify they pass and the resulting diff contains no chess game, account, rating, or fair-play implementation.

## Workflow follow-up

- Do not start these tasks until this change is approved and a new request asks to apply it. This pull request is planning only.
- Apply checks the live chess origin before tasks in groups 2 and 3. Leave those tasks open while the destination is unverified.
- After the implemented scope is verified, sync the specs and archive this change in this repository. Leave chess product behavior in `ejmlabs/ejm-chess`.
