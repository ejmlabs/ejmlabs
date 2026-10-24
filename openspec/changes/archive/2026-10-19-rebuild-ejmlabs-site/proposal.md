# Proposal

## Why

The change `rebuild-on-ejm-ui` moves each site onto the shared design system. The home page proves the packages work for a real site within the byte budgets. The owner wants ejmlabs to welcome participation in open source projects and experiments, with room for future work outside AI. Copy must describe the work and how to get involved without presenting ejmlabs as an agency or tying its identity to the size of its team.

## What Changes

- Rebuild `site/` as a Vite and React site on ejm-ui, linked from the sibling checkout with `file:` dependencies, prerendered by `@ejm/ssg`, with the shared head, theme boot, analytics and `_headers` from `@ejm/site`.
- Six routes: `/` (home), `/projects/`, `/try/`, `/about/`, `/brand/`, `/privacy/`, and a 404 page. The old single page and its hash sections are replaced. The owner confirmed the Brand page and kit downloads stay.
- Home is type-led, with public project copy, direct links, a Sage project list and the Ink footer. At the owner's latest request it has no project preview slideshow, capture controls, image preloads or rotation code. Simulated windows appear only on Try, as labelled demos, which load lazily.
- The IDE product site keeps a native capture that follows its page theme. Record the same useful session in light and dark through the native Appearance implementation, retain provenance for both unedited captures, and publish both variants on ide.ejmlabs.com.
- Copy explains the current open source projects and invites people to run, study, change, and contribute to them. It leaves room for future projects beyond AI and avoids personal team-size framing, sales claims, and invented adoption figures.
- The header shows the approved ejmlabs logo beside its name in both themes.
- Each Current projects row shows its approved project mark beside the name, with contrast suited to the shared Sage band and one accessible link per row.
- About includes a small Company details section naming the owner-confirmed legal entity, `ejmlabs, llc`, without unverified jurisdiction or registration-status claims.
- Demos follow the current products' own layout and supported interactions. They have no demo-only toolbars, prompt chips, dashboards or window chrome. Page copy discloses that the sessions use scripted sample data and make no model calls.
- `scripts/build.mjs` runs the new build and keeps the two brand downloads (`ejmlabs-design-kit.zip`, `ejmlabs-swag-kit.zip`) and the asset folders other sites link to.
- The public Brand page and ZIPs provide ready-to-use assets, a short usage guide and licenses. Downloads omit internal site-building rules, implementation scripts, audit notes and image-generation prompts.
- About uses readable row headings at narrow widths. Shared motion makes page navigation, theme switches and control feedback calm and clear, with reduced motion and unchanged performance limits.
- Review every public route, metadata description, capture caption and linked guide for language aimed at users and contributors. Keep release limits useful and plain rather than presenting internal review notes.
- Publish the completed sites to their existing canonical Cloudflare hosts after local checks, then verify routes, downloads, assets, navigation and response headers over HTTPS. The owner explicitly authorized publication on 2026-10-19.
- Tests read the built HTML of every route. Budgets, performance, viewport matrix, colour balance and cross-host theme persistence are verified and recorded in `tasks.md`.
- **BREAKING:** the old `src/index.html`, its `/design-kit/` HTML pages and the page anchors (`/#try`, `/#approach`) are gone. Asset folders other sites hotlink (`projects`, `social`, `favicon`, `logos`) and both ZIP files stay.
- Not in scope: repository pushes, product or package releases, unrelated changes in `design-kit/` or ejm-ui, an "open to paid work" line. The parent change coordinates the shared demo and motion work; this change includes the public kit packaging and authorized website publication.

## Capabilities

### New Capabilities
- `ejmlabs-site`: the routes, copy rules, shared behaviour, budgets and downloads of ejmlabs.com.

### Modified Capabilities

None. The existing main specs (`documentation-discovery`, `project-identity`, `agent-engineering-policy`) are not changed here.

## Impact

- **Code:** everything under `site/` (new `package.json`, `vite.config.ts`, `src/`, `public/`, `scripts/build.mjs`, `test/site.test.mjs`, `wrangler.jsonc`, `.gitignore`).
- **Dependencies:** the ejm-ui packages by `file:` link (`../../ejm-ui/packages/*`), React 19, Vite, Tailwind 4 as the starter does.
- **Systems:** Cloudflare Workers static assets config gains `not_found_handling: "404-page"`; the completed website is published to its existing canonical host.
- **Risk:** the first-load JavaScript budget leaves about 8 KB for page code after React, the router and the shell, so the home page and the demos are served as static HTML (see design).
