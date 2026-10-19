# Swag artwork masters

Transparent SVG masters for sampling. Dimensions are in millimetres. These are exact vector masters and artwork references. They are not stitch files, patch dielines, print proofs, or manufactured products.

## Files

| File | Width × height | Color | Use |
| --- | --- | --- | --- |
| `symbol-forest-32mm.svg` | 32 × 29.21 mm | Forest | Paper tee, socks reference, small marks |
| `symbol-paper-32mm.svg` | 32 × 29.21 mm | Paper | Hoodie, cap, woven patch reference |
| `symbol-sage-32mm.svg` | 32 × 29.21 mm | Sage | Fleece patch reference |
| `full-logo-forest-180mm.svg` | 180 × 30.76 mm | Forest | Light fabric applications |
| `full-logo-paper-180mm.svg` | 180 × 30.76 mm | Paper | Forest crewneck |
| `flow-sage-280mm.svg` | 280 × 146.28 mm | Sage | Tee back print |
| `orbit-sage-240mm.svg` | 240 × 183.27 mm | Sage | Hoodie back print |
| `flow-highball-wrap-180x112mm.svg` | 180 × 112 mm | Sage Flow and Forest logo | Highball print sampling reference |

The complete logo includes the original symbol and full lowercase wordmark. It is not a typed replacement. Forest is `#29443B`, Paper is `#F6F5EF`, and Sage is `#8A9A7B`. Match physical samples to the approved palette; these hex values do not specify thread, ink, yarn, acetate, or a Pantone match.

## Origin and geometry

Standalone logo masters reuse the `d` strings and view boxes from `../../logos/symbol-ink.svg` and `../../logos/ejmlabs-ink.svg`. Those paths came directly from the native vector artwork in the supplied six-page brand guide. Only the color, physical dimensions, accessible title, and description change. The 2 symbol paths and 10 full-logo paths remain intact. They have not been traced, smoothed, simplified, or redrawn.

The two print motifs are garment variants of the kit's geometric companions:

- Flow keeps 9 of the original 27 paths, unchanged, and gives them a 0.930 mm stroke at the supplied 280 mm width.
- Orbit keeps 8 of the original 23 ellipses with their original rotation. Its stroke is 1.044 mm at the supplied 240 mm width.

Both motif canvases contain the full selected artwork and its stroke. They have no background, clipped line ends, external images, or live visible text. The motifs are decorative and do not replace the logo.

The highball wrap is a separate flat composition. It keeps the same 9 original Flow paths with a 0.896 mm stroke at its supplied size. A 30 mm wide complete logo sits below them in Forest. The logo's 10 original path strings and proportions remain unchanged. Each group uses a uniform scale inside the 180 × 112 mm canvas. There is more than 2.4 mm of clear space around the complete logo, including between it and the linework.

`manifest.json` records the source hashes, physical dimensions, source indices, path counts, and physical stroke widths. Indices start at zero. Logo paths are exact copies of the masters; the motif line selections and wider strokes are deliberate new print treatments. The highball entry also records its two sources, logo placement, and proposed glass dimensions.

## Clear space and scaling

The standalone logo artboards fit the artwork. They do not include its required external clear space:

- At 32 mm wide, reserve at least 8 mm around the symbol on all sides.
- At 180 mm wide, reserve at least 14.5 mm around the complete logo on all sides. This is half the original symbol's height at that size.
- After scaling, recalculate symbol clear space as one quarter of its width, and complete-logo clear space as half the symbol's height within the logo.

Scale width and height together. Do not crop identity artwork, change the symbol-to-wordmark spacing, or close the symbol's counters. Motifs may sit on the back while the identity remains separate on the front.

The supplied garment print masters meet a 0.8 mm minimum line target at their stated widths. Reducing Flow below 241 mm or Orbit below 184 mm makes their strokes thinner than that target. A supplier may need wider lines for its fabric, mesh, ink, or press. Request a sample before setting a final size.

The highball wrap starts from a straight-sided glass about 66 mm in outside diameter and 155 mm high, with a proposed 400 ml capacity. A nominal 66 mm diameter gives a 207.35 mm circumference; a 180 mm wrap leaves about 27.35 mm unprinted at the seam. The supplier must confirm the actual circumference, taper, wall shape, and printable area. The SVG contains artwork only, with no cut line, seam marks, or approved glass dieline. Do not force it onto a tapered or smaller glass by stretching it.

## Process handoff

- Screen print: supply the SVG at its stated size. Ask the printer to confirm ink opacity, line retention, and any underbase on a dark blank. The garment masters use one spot color per print location.
- Glass print: the highball reference uses two spot colors, Sage for Flow and Forest for the complete logo. Ask the supplier to confirm the printable area, seam gap, color registration, suitable glass inks, and curing process on the chosen glass. Its final production template comes from the supplier.
- Embroidery: supply the exact symbol as a digitization reference. A digitizer must set stitches, underlay, density, pull compensation, and backing for the chosen garment. Review a sew-out. This kit contains no DST, PES, or other machine stitch data.
- Woven patch: supply the exact symbol, proposed patch size, and color pairing. The supplier must develop the weave, border, cut shape, attachment, and production dieline. No SVG in this folder defines a cut line.
- Etching: use the symbol's geometry as a monochrome mask. The selected Forest, Paper, or Sage preview color does not specify the appearance of an etched surface. Review a material sample at the final small size.

The proposed product specifications are in `../PRODUCTION.md`.
