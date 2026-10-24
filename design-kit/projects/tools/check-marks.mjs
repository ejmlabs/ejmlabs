#!/usr/bin/env node
// Checks the generated project marks. Run after build-projects.mjs:
//   node design-kit/projects/tools/check-marks.mjs [directory] [--project relay]
// 1. SVG hygiene: no strokes, only Sage, Forest, Ink and Paper in marks, logos, icons and favicons.
// 2. Placement: each mark fits its 256 box and is centred.
// 3. Small sizes: at 16, 24 and 32 px the favicon keeps the same number of separate ribbons as the 1024 px render (no gap has
//    closed), and the designed gap is at least 1 px at that size. Ink is told from Sage by colour, not alpha.
import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { rasterize, decodePng, ridgeWidths, quantile } from './raster.mjs';

const { values, positionals } = parseArgs({ options: { project: { type: 'string' } }, allowPositionals: true });
if (positionals.length > 1 || (values.project !== undefined && values.project !== 'relay')) throw new Error('Use [directory] [--project relay].');
const root = positionals[0] || join(dirname(fileURLToPath(import.meta.url)), '..');
const projects = values.project === 'relay' ? ['relay'] : ['cli', 'ide', 'harness'];
const kit = join(dirname(fileURLToPath(import.meta.url)), '../..');
const tokens = JSON.parse(readFileSync(join(kit, 'tokens/design-tokens.json'), 'utf8')).color;
const brand = new Set(['sage', 'forest', 'ink', 'paper'].map(k => tokens[k].value.toLowerCase()));
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
const SAGE = hex(tokens.sage.value), INK = hex(tokens.ink.value);
const MIN_GAP_PX = 1;
const problems = [];
const report = [];

// 4-connected ink regions. Specks under 1 percent of the ink (and under 2 px) are ignored: a taper's fine tip breaks into
// antialiasing specks that are not ribbons.
const components = (ink, w, h) => {
  const seen = new Uint8Array(w * h), total = ink.reduce((n, b) => n + b, 0), sizes = [];
  for (let i = 0; i < w * h; i++) {
    if (!ink[i] || seen[i]) continue;
    const stack = [i]; let size = 0; seen[i] = 1;
    while (stack.length) {
      const p = stack.pop(), x = p % w, y = (p / w) | 0; size++;
      for (const [nx, ny] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) {
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        const q = ny * w + nx; if (ink[q] && !seen[q]) { seen[q] = 1; stack.push(q); }
      }
    }
    sizes.push(size);
  }
  return sizes.filter(n => n >= Math.max(2, 0.01 * total)).length;
};
const nearerInk = (data, i) => { const d = c => (data[i] - c[0]) ** 2 + (data[i + 1] - c[1]) ** 2 + (data[i + 2] - c[2]) ** 2; return d(INK) < d(SAGE); };

for (const project of projects) {
  const dir = join(root, project);
  // 1. hygiene
  for (const file of readdirSync(dir).filter(f => /^(mark|logo|icon)-.*\.svg$|^favicon\.svg$/.test(f))) {
    const text = readFileSync(join(dir, file), 'utf8');
    if (/stroke/i.test(text)) problems.push(`${project}/${file}: contains a stroke`);
    for (const c of new Set([...text.matchAll(/#[0-9a-fA-F]{6}\b/g)].map(m => m[0].toLowerCase()))) if (!brand.has(c)) problems.push(`${project}/${file}: colour ${c} is not a brand colour`);
    if (/\sfill="(?!#)/.test(text.replace(/fill="none"/g, ''))) problems.push(`${project}/${file}: fill that is not a hex colour`);
  }
  // 2. placement
  const m = rasterize(join(dir, 'mark-ink.svg'), 1024);
  let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
  for (let y = 0; y < m.height; y++) for (let x = 0; x < m.width; x++) if (m.data[(y * m.width + x) * 4 + 3] > 127) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  const box = [x0, y0, x1 + 1, y1 + 1].map(v => v / 4);
  const off = [(box[0] + box[2]) / 2 - 128, (box[1] + box[3]) / 2 - 128];
  if (box[0] < 8 || box[1] < 8 || box[2] > 248 || box[3] > 248) problems.push(`${project}: mark reaches within 8 units of the 256 box edge ${box}`);
  if (Math.abs(off[0]) > 1.5 || Math.abs(off[1]) > 1.5) problems.push(`${project}: mark is off centre by ${off.map(v => v.toFixed(1))}`);
  // 3. small sizes
  const favicon = rasterize(join(dir, 'favicon.svg'), 1024);
  const hiInk = Array.from({ length: favicon.width * favicon.height }, (_, i) => nearerInk(favicon.data, i * 4));
  const ribbons = components(hiInk, favicon.width, favicon.height);
  const bg = hiInk.map(b => !b);
  const narrow = ridgeWidths(bg, 1024, 1024).filter(w => w < 130);    // channels between ribbons; wide bays and the outside are ignored
  const channel = quantile(narrow, 0.05);
  const line = [`${project}: ${ribbons} ribbons; gap channel p5 ${(channel / 1024 * 16).toFixed(2)} px at 16, ${(channel / 1024 * 24).toFixed(2)} at 24, ${(channel / 1024 * 32).toFixed(2)} at 32`];
  for (const size of [16, 24, 32]) {
    const png = decodePng(execFileSync(process.env.RSVG_CONVERT || 'rsvg-convert', ['--width', String(size), '--format', 'png', join(dir, 'favicon.svg')], { maxBuffer: 1 << 26 }));
    const ink = Array.from({ length: size * size }, (_, i) => nearerInk(png.data, i * 4));
    const n = components(ink, size, size), gapPx = channel / 1024 * size;
    line.push(`${size}px: ${n} ribbon region${n === 1 ? '' : 's'}`);
    if (n !== ribbons) problems.push(`${project}: favicon at ${size} px has ${n} ink regions, the 1024 px render has ${ribbons}, so a gap closed`);
    if (gapPx < MIN_GAP_PX) problems.push(`${project}: gap at ${size} px is ${gapPx.toFixed(2)} px, under ${MIN_GAP_PX} px`);
  }
  report.push(line.join('; '));
}
console.log(report.join('\n'));
console.log(`threshold: gap channel p5 of the 1024 px favicon scaled to size, minimum ${MIN_GAP_PX} px; ink is the colour nearer Ink than Sage`);
if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('marks pass: no strokes, brand colours only, centred, no closed gaps at 16, 24 and 32 px');
