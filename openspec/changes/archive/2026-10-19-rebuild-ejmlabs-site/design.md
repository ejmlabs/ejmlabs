# Design

## Context

Observed: `site/src/index.html` is one page on the old kit, `scripts/build.mjs` regenerates the kit and copies it into `dist/`, and the tests run the kit's checkers. `examples/starter` in ejm-ui is the model for a site: `ejmSite`, `ejmSsg`, `SiteLayout`, `siteDefaults`, and a budget of JS 95, CSS 14, fonts 70, HTML 30 KB gzip. Measured on this site: React, react-dom, the router, the shell and the theme code are 86.6 KiB of the 95, so a page may add about 8 KiB of JavaScript.

## Goals / Non-Goals

**Goals:** a site that is the reference consumer of the packages; budgets met without raising them; accurate open source copy; authentic product views and quiet company details.
**Non-Goals:** repository pushes, product or package releases, unrelated changes in ejm-ui or `design-kit/`, new logo artwork, a contact or hiring page. The parent change coordinates shared demo and motion work; public kit packaging and authorized website publication belong here.

## Decisions

**1. Deep imports keep unused components out of the entry.** Pages import from `@ejm/ui/layout/*`, `@ejm/ui/shell/*` and `@ejm/ui/components/ui/button`. The shared `@ejm/site/head` now imports the font list directly, so `src/head.ts` is a thin adapter that selects the ejmlabs defaults.
*Alternative:* the barrel and a larger budget. Rejected: budgets are not raised.

**2. `Deferred`: server-rendered sections the browser does not load.** The server renders the section in full. During hydration the browser keeps that markup (a `dangerouslySetInnerHTML` element with no content tells React to leave the children alone) and fetches the real component only when it nears the viewport or is used (`when="near"`), or never (`when="never"`). After a client-side navigation there is no server markup, so it loads at once. Internal links inside kept markup are routed like `Link` through `useNavigate`. The server component comes from `import.meta.env.SSR ? await import(...) : null`, so the client build never contains it.
Used for: the home page content (hero, project rows and bands have no behaviour and do not fit the budget with the hero components), and the three demos on Try (`LazyDemo` imports all three product views, so none of it may be in the first load).
*Alternative:* hydrate every section at first load. Rejected: static home content and deferred Try views keep the initial page within its existing budget.

**3. Every route is a lazy route.** The entry holds only the shell, so each route pays for its own chunk and shared layout chunks (`Rows`, `Hero`, `Facts`), and `/404` stays small.

**4. Buttons only where the page can afford them.** Text links use the `link` class and `ExternalLink` (arrow, `rel="external noopener"`, screen-reader text), which are already in the shell. `Button` (2 KiB with its dependencies) appears only on the static home page.

**5. Original product shots, superseded by decision 20.** The initial release served real CLI, IDE and harness captures through the shared `ProductShot` contract. The owner later removed the root site preview slideshow. Product sites retain their own captures, including the matched IDE pair described in decision 17.

**6. The hero does not delay the Largest Contentful Paint.** Headline and lead can use the shared transform-only entrance, which paints readable text at once. The actions enter in sequence. Retain those choices only if representative mobile timing meets the existing limit. Demos wait for the visitor to scroll or touch before "near the viewport" counts, so a demo on screen at load does not load its code (it did, on a phone, and put /try/ at 114 KB).

**7. Routes and copy.** The home and About page describe open source projects and invite participation through source, issues, documentation and contributions. Current projects are examples of the work, not the limits of future work. Copy does not describe a one-person lab or make sales and adoption claims. `/projects/` states each project's MIT license and actual release status. About ends with a small Company details section naming `ejmlabs, llc`. Jurisdiction, entity number, good standing and registry links are added only when verified. No new Terms page is needed to identify the company. `/brand/` keeps both kit downloads, as the owner confirmed. `/privacy/` keeps the facts about analytics and storage.

**8. Build and hosting.** `scripts/build.mjs` runs `ejm-ssg build` (which fails on a budget breach), then copies approved image and icon assets other sites hotlink, omitting HTML, Markdown, comparisons and nested archives. Both `ejmlabs-design-kit.zip` and `ejmlabs-swag-kit.zip` are built from named public files and short public guides. Swag masters and the manifest retain their source bytes; concept previews remain labelled. `wrangler.jsonc` uses `not_found_handling: "404-page"` for the generated `404.html`. `_headers` comes only from `@ejm/site`.

**9. CSS.** The site excludes unused app, docs and form components from Tailwind's source scan, then includes the button used by the home page. This keeps CSS near 13 KB gzip without changing shared theme tokens.

**10. Original hero capture rotation, superseded by decision 20.** Server rendering supplies the three real captures with their own provenance captions. A small browser enhancement selects a capture and changes opacity, without importing the capture catalog in the browser. The layout reserves space for the largest capture. Named project controls and a pause button remain usable by keyboard and touch. Automatic rotation pauses on hover, focus, hidden pages and offscreen content, and is off for reduced motion. Without scripts the first capture remains visible. The product capture plan originally called for matching light and dark captures. The IDE variants show the same saved session in its actual native Appearance themes, with identical window geometry and unedited PNG sources.

**11. Logo.** The header uses the approved vector mark from the shared brand assets beside the ejmlabs text. The linked group has one accessible home label, with the decorative mark hidden from assistive technology.

**12. Authentic simulations.** Shared demos follow the real product's current layout, terminology and supported interactions. CLI keeps its real terminal hierarchy and composer, IDE follows the actual workspace and assistant panel, and harness shows source-derived terminal output rather than an invented dashboard. Extra demo toolbars, prompt chips, fake titlebars and review controls absent from the product are removed. Existing page copy states that the views use scripted sample data with no model calls; that disclosure is not inserted as product chrome. The full IDE app is not embedded: its built entry is 1,444 KiB gzip, well above the existing 40 KiB demo budget. A narrow presentation adapter uses the existing product layout and local scenario engines.

**13. Public brand kit.** `/brand/` is a public asset guide for people writing about or contributing to the projects. It previews approved marks, explains which files to choose, and states rights without granting a new license. The brand ZIP uses an explicit asset allowlist and a short public guide rather than zipping the internal playbook. It includes appropriate logo variants, project marks, palette, fonts with their existing licenses and useful exports. The swag ZIP includes artwork, clearly labelled concept previews and practical use guidance, without internal generation prompts. Internal source material remains separate from these downloads.

**14. Readable type and calm motion.** Long About row titles use the heading scale instead of the display-like title scale, with line breaks between words. Page changes use a short, gently eased transition; a theme switch crossfades with the native View Transitions API and changes immediately when unsupported or reduced motion is requested. Existing row and button feedback stays subtle. First-paint text stays visible throughout its entrance. No motion package or continuous background loop is added.

**15. Public source access.** Live GitHub checks on 2026-10-19 showed that the repositories are private. The owner confirmed that the sites should keep those GitHub links and that the repositories will become public soon. A quiet availability sentence states that public repository access is coming soon. Website deployment does not change repository visibility or publish source.

**16. Keyboard and static desktop views.** `Deferred` keeps its outer element while replacing server markup and restores focus only when that markup still held focus at resolution. It targets the product's static group or editor so the shared lazy island can complete the handoff to its native input. Both layers cancel restoration if the visitor leaves. The IDE's desktop canvas scrolls inside a paint-contained viewport on narrow screens, including without scripts; the page itself remains within the screen.

**17. Matched native IDE captures.** The IDE already implements System, Light and Dark appearance preferences, including the editor theme. Use the isolated workspace and existing saved tool/edit session. A task-only native startup override may select Light through the public Tauri theme API, which sets the appearance for that process. Record the tiny capture-only patch and its binary hash; the actual frontend, tools and saved session must remain unchanged. This avoids writing to uncertain shared WebKit storage. Do not recolor the dark PNG, render an imitation, change the owner's global macOS appearance or seed chat data. The IDE owner captures and records the native source; the shared `ejm-ui` shot package owns metadata and optimized assets. The IDE site consumes the pair through its product-scoped public import. The root site no longer embeds project captures after decision 20; CLI and harness need no change. Check image hashes, matching dimensions, actual theme selection, phone and desktop layout, byte budgets and representative IDE first-paint timing before republishing the IDE Worker. Preserve the existing release API and installer availability.

**18. Shared IDE heading scale.** The IDE home currently selects `text-display-lg`, while root, CLI and harness use the shared `text-display` scale. Use that existing standard scale for the IDE heading. Keep the existing first-paint layout and shared shell, controls, tokens and motion. No consumer CSS override, new type token or dependency is needed. Verify the heading with real copy at phone, narrow desktop and large widths in both themes alongside the new capture pair.

**19. Project row marks.** Compose the existing shared `Row.title` React node slot with the approved CLI, IDE and harness mark exports from `@ejm/tokens`. The shared Sage band retains its light scheme in both page themes, so use the approved Ink marks on that surface. Keep each mark decorative, reserve its dimensions and retain one accessible link across the row. Use the existing `Rows` heading size so the longer harness name fits beside its mark at the column breakpoint. Check phone, narrow desktop and large widths in both themes. No new shared API, dependency or stylesheet is needed; ejmlabs owns this page composition.

**20. Remove the home preview slideshow.** The owner removed the main site slideshow after the initial publication. Keep the shared type-led Hero, copy, actions, ripple art and marked project rows. Remove the capture slot, enhancement hook, catalog/preload wiring and now-unused local slideshow modules. Remove the unused shot dependency if no root consumer remains. Replace the superseded slideshow test with a built-page contract that keeps project links present and prevents previews, carousel controls and image preloads from returning. Preserve the shared page and theme transitions, Try simulations and product-site captures. Verify home in both themes at phone, narrow desktop and large widths, then measure its current first paint and publish the checked root build.

## Risks / Trade-offs

- **Static home means full reloads are avoided by a small click handler, not by React.** The handler is tested in a browser (island link, back to home).
- **CSS scanning depends on the shared folder layout.** The budget gate fails the build if the stylesheet grows past 14 KB gzip.
- **`file:` links tie the build to a sibling checkout.** Documented in the README; moves to versions when a registry exists.
- **Types:** with two copies of `@types/react` (this site and ejm-ui) `tsc` fails, so `tsconfig.json` maps `react` to this site's copy.

## Migration Plan

1. Build and test locally, verify budgets, performance, matrix and theme persistence.
2. Publish with `wrangler deploy` to the existing canonical host. The owner authorized this on 2026-10-19 after the requested fixes and checks.
3. Verify all routes, both downloads, referenced assets, navigation and response headers over HTTPS. Record the Worker version and local build hashes.
Rollback: retain the previous Worker deployment identity and use Cloudflare's deployment rollback if live checks reveal a regression.

## Open Questions

None that change what is built.
