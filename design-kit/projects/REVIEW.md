# Project logo review

Historical source and review record. See the [retained-source notice](../README.md). File paths, commands, and asset availability below describe the earlier kit, not current production.

Review of the cli, ide and harness marks, and what changed in two passes. The
brief: the three project logos should look like the ejmlabs logo. The owner then
added: harness is an AI harness, so it should not be an H. See the [before, first
pass and second pass board](before-after.png), the [marks next to the
symbol](symbol-compare.png), the [candidates](candidates.png) and the [family
preview](index.html).

## What the symbol does

The studio symbol is two interleaved ribbons. Measured by rasterizing
[`../logos/symbol-sage.svg`](../logos/symbol-sage.svg) and reading the medial axis
(`tools/measure-symbol.mjs`, symbol 417.5 units wide):

| Property | Measured |
| --- | --- |
| Ribbon width | median 48.8 (p10 38.0, p90 55.3) |
| Gap between ribbons | median 30.8 (p10 17.3, p90 44.8) |
| Width to gap | 1.58 : 1, so the pitch is 1.63 ribbon widths |
| Terminals | three round (radius half the width), one taper |
| Taper | about 112 units, 2.3 ribbon widths, from full width to a fine tip, on the outer ribbon |
| Turns | smooth, large radius, tighter at the hairpins, concentric where ribbons run side by side |

So the grammar is: parallel ribbons nested at a fixed pitch, one width, one gap,
round terminals, one long fine taper on the outer ribbon, and flowing turns.

## Review of the previous marks

Measured with the same tool on the old `mark-ink.svg` files: the old marks have
no shared width or gap, and their parts are separate shapes, not nested ribbons.

**cli (a prompt chevron and a cursor dash)**
- The chevron is one fat boomerang. Its thickness runs from 18 to 33 units along
  its length, which reads as a stock `>` glyph, not a ribbon of constant width.
- Nothing is nested. The chevron has no companion line and the cursor is a loose
  pill 34 units away, a gap that matches nothing else in the mark.
- It borrows the symbol's tapered tip at both chevron ends, but the symbol tapers
  one end and rounds the rest.

**ide (a bracket pair)**
- Two single thick brackets, one rotated 180 degrees. The symbol's defining move,
  a second ribbon running beside the first at a fixed gap, is absent, so it reads
  as the `[ ]` or `( )` icon every editor uses.
- Each bracket mixes terminals: a tapered hook at one end and a square serif at
  the other. The symbol uses one rule (round everywhere, one taper), so the old
  brackets look uneven next to it.
- The only gap in the mark is the 29 unit opening between the brackets, and it
  is unrelated to the ribbon width (36).

**harness (a split H)**
- It reads as `{-}`, a curly brace pair with stubs. That is a stock icon, and it
  suggests a template or a code block, not an engine.
- The crossbar stubs are fat tabs on a fat upright. Gaps run from 24 to 45 units
  with no rhythm, and nothing tapers or turns the way the symbol's ribbons do.
- Both halves are exact mirrors. The symbol is deliberately not symmetric.
- An H was the wrong idea from the start (owner feedback): harness is the engine
  that runs many agent sessions under one governor.

## First pass and why it was not enough

The first pass shared the symbol's numbers (one width, one gap, round terminals,
a taper) but drew straight bars with 90 degree corners and pill ends: cli as
`>>_`, ide as `[ii]`, harness as `|H|` with pointed tips. It passed the legibility
checks, and it still did not look like the symbol. The symbol is a smooth flowing
loop, so shared numbers are not enough. The old ide hook and the old cli chevron's
tapered curve were closer to its feel than the straight bars were.

## Second pass: drawn with the symbol's curvature

The ribbon engine (`tools/ribbons.mjs`) now takes centrelines made of chains of
arcs with different radii. Arcs join tangentially, so a ribbon can run on a
gentle curve and tighten at a turn the way the symbol does, and offsets of arcs
are still exact arcs, so nested ribbons stay parallel at one gap. A taper is
sampled along the curved spine and written as cubic curves, so it is a long fine
tip (the symbol's 2.3 widths on cli, 50 to 70 units elsewhere), not a bullet.
There are no strokes and no library. The ribbon weight went up from 32 to 36
units, the old marks' weight, because lighter ribbons looked timid beside the
symbol. Width 36, gap 22.7, pitch 58.7 in the 256 box (the 1.58 ratio kept).

**cli.** A prompt chevron whose arms bow gently and tighten at the apex
(radii 240, 38, 240), nested inside a wider echo ribbon one pitch away whose top
end is the symbol's long taper, and a separate cursor bar one gap clear of the
echo. Reads `>>_`.
- Candidates: a (chosen), b (the bar bowed to follow the echo: the bar then looked
  like a swoosh, not a cursor), c (the echo ribbon hooks into the bar: it read as
  a `2` or an `L`, as before).

**ide.** Two facing brackets with large flowing corners (radius 42) and a bar
nested in each at one gap, point symmetric, the outer arm of each ending in a
tapered tip. It reads as a window of two panes, the editor and the agent beside
it, inside brackets.
- Candidates: a (two nested parentheses per side: the inner arcs touched in the
  middle and it read as eyes), d (a hook cut from the symbol's turn with a curled
  foot: the closest to the symbol, but it read as an `@`), e (chosen).

**harness.** Redrawn from the idea: one resource governor over many sessions.
A dot (the agent) with a single ribbon strap winding once around it at one gap
and closing in a long taper (the strap closing). It is the symbol's own move, a
ribbon turning around a point, and it is not a letter.
- Seven concepts were drawn and compared at 160, 64, 32 and 16 px beside the
  symbol (`candidates.png`, `symbol-compare.png`):
  - a: three strands through a cinch band into one tapering ribbon. Fell apart at
    small sizes and read as a Chinese character or a mixer.
  - b (chosen): dot and spiral strap. Distinct at 32 px, plainly the symbol's
    family, legible at 16 px. Spiralling the other way, or starting elsewhere,
    read as an `@` or a `6`; the start angle was chosen to avoid both.
  - c: two interleaved hairpins as a clasp. Very like the symbol but read as a
    paper clip.
  - d: one ribbon folded through three runs (a journal). Read as a `2` or a pen.
  - e: a yoke, an omega. A letter, and a horseshoe.
  - f: nested hairpins gathering strands. Read as a `3` or a speaker.
  - g: three dots (sessions) inside one spiralling ring (the governor). The idea
    is the closest to the brief, but it reads as a film reel or a face, and the
    dots merge at 16 px.

## Small sizes

The favicon files draw the same mark larger: its longer side fills 80 percent of
the square, not the 67 percent used for app icons. The apple touch and android
chrome icons render from the same `favicon.svg`, so they use this cut too.
`tools/check-marks.mjs` renders each `favicon.svg` at 1024 px and at 16, 24 and
32 px, tells ink from Sage by colour, and requires the same number of separate
ribbons at each small size as at 1024 px (specks from a taper's tip are
ignored), and a gap of at least 1 px (gap channel p5 of the 1024 px render,
scaled):

| Project | Ribbons | Gap at 16 px | at 24 px | at 32 px |
| --- | --- | --- | --- | --- |
| cli | 3 | 1.24 | 1.86 | 2.48 |
| ide | 4 | 1.30 | 1.95 | 2.59 |
| harness | 2 | 1.28 | 1.93 | 2.57 |

No two-ribbon variant was needed. The taper tips are finer than a pixel at 16
px and disappear, which leaves a slightly shorter ribbon, never a closed gap.

## Do the marks belong with the symbol?

On `symbol-compare.png` at 160, 64, 32 and 16 px:
- cli and harness read as pieces of the same flow: the long fine taper, bowed and
  spiralling ribbons, one gap. A stranger would plausibly pair them with the symbol.
- ide is the weakest. Its large corners and taper tie it to the family, but
  vertical bars in rounded brackets are boxier than anything in the symbol.

## Known weak spots

- ide is rectilinear; it reads as brackets with two panes, which is its job, and
  as less of a sibling of the symbol than the other two.
- harness is a concept, not a picture. A dot in a spiral reads as a spiral, an
  eye or a target until the idea is told. It is bold and legible, not literal.
- At 16 px the cli chevron and echo are separated by about one pixel of
  antialiased Sage. They stay separate but are not crisp.
- The ide logo's right bracket sits close to the `i` of the name, as in the old
  logo.
- Only the strongest candidates were refined. A different harness concept might
  still beat the spiral with more drawing time.

## Rebuild and check

```sh
node design-kit/scripts/build-projects.mjs
node design-kit/projects/tools/check-marks.mjs
node design-kit/projects/tools/measure-symbol.mjs
```

The constructions live in `tools/marks.mjs` (candidates and the chosen one per
project) and the engine in `tools/ribbons.mjs`; `candidates.png` is drawn from
the same code.
