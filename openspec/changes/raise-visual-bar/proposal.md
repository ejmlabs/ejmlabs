# Proposal

## Why

The owner's bar is Anthropic, Stripe and OpenAI. Studying the references and our current pages shows a gap. Their sites have a confident typographic voice, calm editorial layouts, product-first imagery with real depth, rich illustration, and flagship documentation. The ejmlabs kit is open, Sage-led, responsive and consistent, but it is flat: the hero is a Sage panel with a faint symbol, there is no layered product imagery or depth system, no illustration system, the type is correct without personality, and docs and product UI are not yet at flagship polish. Every ejmlabs site and application inherits this ceiling from the kit, so the kit is where to raise it.

## What Changes

- **Direction: containerless editorial (decided by the owner on 2026-10-18).** The owner judged the current container-based look ugly and dated. It is thrown out and redesigned from the foundation: no cards, panels, rounded tonal boxes or Sage hero slab. Structure comes from display type, whitespace, hairline rows and full-bleed tonal bands. Product windows float with depth directly on the page. Sage leads as page tone. This applies to the site kit, the application kit and the terminal guide.
- **Hero and product composition.** Editorial display type on the page ground, and a hero that shows the product as layered, floating windows (ejm-cli terminal, ejm-ide, ejm-harness) with a defined depth system and an entrance sequence.
- **Editorial and typography craft.** A display scale, tracking, wrapping and numeral rules inside the brand fonts, mono metadata rows, feed rows, and refined buttons and links.
- **Symbol-based illustration and surface system.** Generated line art and soft in-palette gradients and grain derived from the ejmlabs symbol, with animated draw-on, used for heroes, dividers, empty states and error pages.
- **Flagship docs experience.** Sidebar, scroll-aware table of contents, code blocks with copy and language tabs, callouts, API parameter tables, a client-side page filter, and previous and next links.
- **App and terminal polish.** Dashboards, charts, tables, empty states and fine detail in the application kit and terminal guide, consistent in light and dark.
- **Quality gate.** A written bar, an independent critique of our pages against the references at matching sizes, and automated checks that keep the result from regressing.
- **BREAKING:** the container classes (cards, panels, tonal boxes, hero panel, tiles and their variants) are removed and replaced by containerless parts. Kit pages, the ejmlabs.com home and the three project sites must be migrated and re-synced.

## Capabilities

### New Capabilities
- `hero-product-composition`: The site hero presents the product as layered windows with depth and a staged entrance.
- `editorial-typography`: A type and layout language inside the brand fonts: display scale, metadata rows, feeds, buttons and links.
- `symbol-art-system`: Generated, in-palette illustration and surface treatments built from the symbol, including motion.
- `docs-experience`: A documentation layout and behaviors that rival flagship developer docs.
- `app-and-terminal-polish`: Application and terminal interfaces reach the same craft bar, in light and dark.
- `containerless-layout`: The layout language with no containers, and a gate that keeps removed container classes out.
- `visual-quality-gate`: A measurable, repeatable bar for visual quality, comparison and regression checks.

### Modified Capabilities

None. `openspec/specs/` has no existing capabilities.

## Impact

- **Code:** `design-kit/web/parts/` (new parts after `15-open`), `design-kit/web/*.js` (small progressive enhancements), `design-kit/ui/app.css` and `ui/*.html`, `design-kit/scripts/` (art generator, checkers), kit catalogs and specimen pages, and the ejmlabs.com home page in `site/src/`.
- **Systems:** the three project sites (cli, ide, harness) pick up the changes by re-syncing the kit. No deploys are part of this change.
- **Dependencies:** none added. Brand fonts, palette and logo rules are unchanged.
- **Risk to existing work:** parts 10, 11 and 15 are rewritten, so every page that used a container class changes. Dark mode, the responsive matrix, the shared checkers and the class guard must keep passing.
