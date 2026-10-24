# Critique

Historical source and review record. See the [retained-source notice](../README.md). File paths, commands, and asset availability below describe the earlier kit, not current production.

A repeatable critique of ejmlabs pages against the quality bar in `../QUALITY.md`, with Anthropic and Stripe as the references. It records what we saw, what we fixed and what remains. We study the principles behind the references (confident scale, tone and depth, honest product imagery, calm docs) and express them in ejmlabs' own layout, imagery and words. Nothing here asks us to reproduce a reference.

## How to repeat it

Pages: `site/src/index.html` (home), `index.html` (gallery), `web/patterns.html`, `web/demos.html`, plus the new kit pages once they exist (`web/product.html`, `web/editorial.html`, `web/art.html`, `web/docs.html`, `ui/index.html`).

Sizes: `iphone-mini` (375), `laptop` (1440) and `ultrawide-45` (3440), in light and dark. The full matrix (320 to 5120) is run for overflow and touch targets.

```bash
node design-kit/scripts/shoot.mjs <url> --theme light --only iphone-mini,laptop,ultrawide-45 --out <dir>
node design-kit/scripts/shoot.mjs <url> --theme dark  --only iphone-mini,laptop,ultrawide-45 --out <dir>
```

References are checked by eye at the same sizes. OpenAI's site blocks headless capture, so only Anthropic and Stripe are compared directly.

## Baseline, 2026-10-18

Taken before the `raise-visual-bar` work. The home page has no overflow at any size. The findings are about craft, ranked by impact.

| # | Finding | Where (size, theme) | Reference principle | Fix |
| --- | --- | --- | --- | --- |
| 1 | The hero is a flat Sage panel with a faint symbol. There is no product in it, so the first screen says nothing about what we make. | laptop light, ultrawide dark | Stripe leads with layered, real looking product imagery. | Product hero with layered windows (group 2). |
| 2 | There is no depth anywhere. Cards, panels and demo frame sit on one plane, so nothing reads as nearer or more important. | laptop light | Stripe uses soft multi layer depth only where products appear. | Three elevation tokens, used on windows, menus and overlays only (group 2). |
| 3 | The headline is about 64px on a 1440px screen and stops growing on wide screens. It does not carry the page. | laptop light, ultrawide dark | Anthropic sets very large display type against small calm text. | Display tier up to about 120px, fluid (group 3). |
| 4 | On an ultrawide the content is a narrow column in a very large empty field, and nothing scales to use the room. | ultrawide dark | Both references keep a strong column but scale type and imagery. | Display scale and product composition that grow with the column (groups 2 and 3). |
| 5 | The demo terminal shows a large empty area above the prompt and its text is tiny, so the demo looks unfinished until you use it. | laptop light, ultrawide dark | Stripe shows its interfaces already in use. | Static product windows filled with real scenario content, with the live demo kept below (group 2). |
| 6 | The section rhythm is one pattern repeated: a tiny label, a medium heading on the left, a short paragraph on the right. Every section feels the same. | laptop light | Anthropic varies scale and layout between sections. | Metadata rows, feed rows and display breaks to vary rhythm (group 3). |
| 7 | Labels and pills are around 11 to 12px with low contrast against the tone behind them. They are hard to read and weak as hierarchy. | laptop dark, iphone-mini light | Anthropic uses small mono metadata with hairlines, sized to read. | Mono metadata rows (`facts`) with hairlines and readable size (group 3). |
| 8 | The studio band has wave lines as its only image. They are pretty but quiet, and there is no illustration system to draw on. | laptop light | Both references have a recognisable art style across the site. | Symbol art system: generated line art, gradients and grain (group 4). |
| 9 | The page has no docs experience: no sidebar, no contents, no code blocks with copy, no callouts. A developer tool without docs pages looks unfinished. | all | Stripe docs and Claude docs are the benchmark. | Docs layout, scroll aware contents, tabs, callouts, tables (group 5). |
| 10 | In dark mode the hero is a bright Sage slab on near black. It is the heaviest object on the page and it fights the text around it. | laptop dark, ultrawide dark | Anthropic's dark surfaces stay tonal, not bright. | Dark hero ground tuned to the elevation and art system (groups 2 and 4). |
| 11 | On the iPhone mini the hero buttons and the open source tags stack in a long vertical column and push the content down. | iphone-mini light | Compact, scannable first screen on phones. | Product hero reflow and tighter tag row (group 2). |
| 12 | Project cards have only text. They do not show the products, so three cards look like three similar boxes. | laptop light, iphone-mini light | Stripe shows each product as an interface. | Small product windows or art per project (groups 2 and 4). |
| 13 | The application kit has no dashboard composition or chart, and its empty states are bare. It looks less finished than the site. | `ui/index.html`, laptop light | Stripe's dashboard UI is dense, calm and complete. | Dashboard, chart primitives and full states (group 6). |
| 14 | Buttons and links have correct states but no motion or character. A hover changes tone only. | laptop light | Both references use a small, confident arrow and press motion. | Refined buttons and links (group 3). |

## Results

Filled in after the build work (task 7.4).

## Imitation check

Filled in after the build work (task 7.5).
