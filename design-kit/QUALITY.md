# Historical quality bar

This records the earlier kit review criteria. Current shared component and
content rules belong in `ejm-ui/QUALITY.md`; follow its public contracts and
owner checks. The commands and kit-copy instructions below apply to the retained
historical snapshot, not current products. See [source status](README.md).


What "good enough to ship" means for every ejmlabs site, application and kit page. Each line is something a reviewer can check with a screenshot, a script or the keyboard. If a line cannot be checked, it does not belong here.

The references are Anthropic, Stripe and OpenAI. We learn from how they decide, not from what they made. We never reproduce their layouts, imagery or words. The critique in `web/CRITIQUE.md` measures our pages against this bar.

## How to use it

1. Build the page from kit parts (`CATALOG.md`).
2. Run `node scripts/check-kit.mjs`, `node scripts/check-site.mjs <page>` and `node scripts/shoot.mjs <url>` in light and dark.
3. Walk the eight dimensions below. A page ships when every line holds, or when the exception is written down in the critique.

## Typography

- Only Manrope and IBM Plex Mono are used. No other family appears in computed styles.
- A page has one display line or none. Display type is at least 3 times the body size on screens 1440px and wider.
- Headings use balanced wrapping. No heading ends with a single short word on its last line at 375px or 1440px.
- Body text lines are at most 68 characters wide. Numbers in tables and facts rows use tabular figures.
- Labels, metadata and code use IBM Plex Mono. Nothing under 12px, and body text is at least 16px on phones.

## Rhythm

- Spacing comes from the kit scale. No two neighbouring sections use the same layout twice in a row.
- Sections are separated by tone or whitespace, not by rules, except hairlines in metadata and feed rows.
- Each section has one subject and one primary action at most.

## Depth

- Elevation uses the three tokens (rest, raised, float). Only product windows, menus and overlays use them.
- Cards and panels have no shadow. Tone separates them from the page.
- Sage covers about 30 percent of a page, Paper or Mist about 60, and Forest under 10. Forest never sets a large ground.

## Imagery

- Product visuals show real commands, tools and screens from the product's README. They carry a visible "Simulated" label unless they are the live demo.
- Illustration is generated from the symbol and uses brand colors, or brand colors at reduced opacity, only.
- Decorative images have empty alt text. Meaningful images have alt text that says what they show.
- No stock photography, no gradient blobs, no glass blur.

## Motion

- Motion uses transform and opacity only, under 300ms for interactions and under 1.2 seconds for a page entrance.
- With reduced motion, or with scripts off, every element is visible in its final place.
- Nothing moves without a cause: arrival, a state change or a user action.

## Detail

- Every interactive element has rest, hover, focus, pressed and disabled states. Focus is visible at 3:1 against its ground.
- Lists and tables have empty, loading and error states with a sentence and, where one exists, one action.
- Links to another site use `rel="external"` and show the arrow. Copy has no em dashes.

## Responsiveness

- No horizontal overflow at any matrix size from 320px to 5120px, in both themes. `scripts/shoot.mjs` exits non-zero if there is.
- Touch targets are at least 44px on coarse pointers.
- Safe areas are respected on notched phones. Layout survives 200 percent text size.
- Content stays in a readable column on wide screens, and display type and product imagery scale up.

## Accessibility

- Text contrast is at least 4.5:1, control borders and focus rings at least 3:1, in light and dark.
- Meaning never relies on color alone. Callouts, status and chart series carry text labels.
- Every page has a skip link, one h1, no skipped heading levels and a full keyboard path.
- Components with behavior (tabs, filters, copy) follow the WAI-ARIA pattern and announce their result.

## Gates that enforce it

| Gate | Command | Fails on |
| --- | --- | --- |
| Kit consistency | `node scripts/check-kit.mjs` | Undocumented or undefined classes |
| Page structure | `node scripts/check-site.mjs <page>` | Wrong head or header, inline CSS, unknown scripts, em dashes, missing simulated label |
| Viewport matrix | `node scripts/shoot.mjs <url>` | Horizontal overflow, small touch targets |
| Generated files | `node scripts/build-web.mjs --check`, `node scripts/build-ui.mjs --check` | Stale generated files, low contrast |
