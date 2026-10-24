#!/usr/bin/env node
// Measures the ejmlabs symbol's ribbon width and gap by rasterizing it and reading the medial axis.
// Run: node design-kit/projects/tools/measure-symbol.mjs
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { rasterize, ridgeWidths, quantile, edt } from './raster.mjs';

const symbol = join(dirname(fileURLToPath(import.meta.url)), '../../logos/symbol-sage.svg');
const W = 1670, unit = W / 417.5479;           // 4 px per symbol unit
const { width, height, data } = rasterize(symbol, W);
const ink = Array.from({ length: width * height }, (_, i) => data[i * 4 + 3] > 127);
const fmt = a => ['p10', 'median', 'p90'].map((n, i) => `${n} ${(quantile(a, [0.1, 0.5, 0.9][i]) / unit).toFixed(1)}`).join(', ');
const ribbon = ridgeWidths(ink, width, height).filter(w => w / unit > 20);
// Gaps are the channels between ribbons: narrow medial-axis widths of the background.
const gap = ridgeWidths(ink.map(b => !b), width, height).filter(w => w / unit > 8 && w / unit < 60);
console.log(`symbol units: width 417.5`);
console.log(`ribbon width  ${fmt(ribbon)}   (n=${ribbon.length})`);
console.log(`gap           ${fmt(gap)}   (n=${gap.length})`);
console.log(`ratio w:gap   ${(quantile(ribbon, 0.5) / quantile(gap, 0.5)).toFixed(2)}`);

// Tapered terminal: the sharp tip at the left of the symbol (lowest ink pixel within 12 units of the left edge).
const px = x => x / unit;
let tip = null;
for (let y = 0; y < height; y++) for (let x = 0; x < Math.floor(12 * unit); x++) if (ink[y * width + x] && (!tip || y > tip[1])) tip = [x, y];
// Walk up the ribbon from the tip: width of the horizontal-ish cross section is hard on a curve, so use medial-axis samples near the tip.
const near = [];
const g2 = ridgeSamples(ink, width, height);
for (const s of g2) { const d = Math.hypot(s.x - tip[0], s.y - tip[1]); if (d < 140 * unit / 4 * 4 && s.y < tip[1]) near.push({ d: px(d), w: px(s.w) }); }
near.sort((a, b) => a.d - b.d);
const full = quantile(ribbon, 0.5) / unit;
const firstFull = near.find(n => n.w >= 0.9 * full);
const at = d => { const n = near.filter(m => Math.abs(m.d - d) < 3); return n.length ? n.reduce((s, m) => s + m.w, 0) / n.length : NaN; };
console.log(`taper: tip at ${px(tip[0]).toFixed(1)}, ${px(tip[1]).toFixed(1)}; width at 8u ${at(8).toFixed(1)}, 20u ${at(20).toFixed(1)}, 40u ${at(40).toFixed(1)}, 80u ${at(80).toFixed(1)}; reaches 90% of ribbon at ${firstFull ? firstFull.d.toFixed(0) : '?'} units from the tip (${firstFull ? (firstFull.d / full).toFixed(1) : '?'} ribbon widths)`);

function ridgeSamples(on, w, h) {
  const off = on.map(b => !b), g = edt(off, w, h), out = [];
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    const i = y * w + x; if (!on[i]) continue;
    let ridge = true; for (let dy = -1; dy <= 1 && ridge; dy++) for (let dx = -1; dx <= 1; dx++) if ((dx || dy) && g[i + dy * w + dx] > g[i]) { ridge = false; break; }
    if (ridge) out.push({ x, y, w: 2 * Math.sqrt(g[i]) - 1 });
  }
  return out;
}
