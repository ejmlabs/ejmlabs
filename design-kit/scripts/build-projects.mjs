#!/usr/bin/env node
// Product artwork is authored here. Marks are ribbon centrelines outlined to filled paths by the code below; HarfBuzz outlines type;
// librsvg renders PNGs; Pillow packages ICOs. Checks live in design-kit/projects/tools (check-marks.mjs, measure-symbol.mjs).
// Run: node design-kit/scripts/build-projects.mjs
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const { values } = parseArgs({ options: { project: { type: 'string' } } });
if (values.project !== undefined && values.project !== 'relay') throw new Error('Use --project relay, or omit --project for CLI, IDE and Harness.');
const relayOnly = values.project === 'relay';

const kit = join(dirname(fileURLToPath(import.meta.url)), '..');
const output = process.env.PROJECTS_OUT || join(kit, 'projects');
const tokens = JSON.parse(readFileSync(join(kit, 'tokens/design-tokens.json'), 'utf8'));
const C = Object.fromEntries(Object.entries(tokens.color).map(([key, token]) => [key, token.value]));
const hbView = process.env.HB_VIEW || 'hb-view';
const renderer = process.env.RSVG_CONVERT || 'rsvg-convert';
// Pillow packs the ICO; use the first Python that has it (Homebrew's often does not).
const python = process.env.PYTHON || ['python3', '/usr/bin/python3'].find(candidate => {
  try { execFileSync(candidate, ['-c', 'from PIL import Image'], { stdio: 'ignore' }); return true; } catch { return false; }
}) || 'python3';
const projects = [
  { id: 'cli', description: 'The prompt.', tagline: 'A coding agent for your terminal.' },
  { id: 'ide', description: 'The workspace.', tagline: 'A desktop IDE with an agent beside the editor.' },
  { id: 'harness', description: 'The engine.', tagline: 'A reusable Rust engine for coding agents.' },
];
const relayProject = { id: 'relay', description: 'The handoff.', tagline: 'Private remote control for your local coding agent.' };
const selectedProjects = relayOnly ? [relayProject] : projects;

// Check the maintained ICO encoder before writing any outputs.
execFileSync(python, ['-c', 'from PIL import Image']);

import { SYMBOL, RATIO, W, G, P, outlines } from '../projects/tools/ribbons.mjs';
import { candidates, chosen, relay } from '../projects/tools/marks.mjs';
import { firstPass } from '../projects/tools/first-pass.mjs';

// Marks are ribbon centrelines outlined to filled paths by projects/tools/ribbons.mjs; the constructions are in marks.mjs.
const extent = {};
const shapes = Object.fromEntries(Object.keys(chosen).map(id => {
  const outline = outlines(candidates[id][chosen[id]]());
  extent[id] = outline.extent;
  console.log(`${id}: mark ${outline.extent.map(v => v.toFixed(1)).join(' x ')} in the 256 box`);
  return [id, outline.paths];
}));
if (relayOnly) {
  const outline = outlines(relay());
  extent.relay = outline.extent;
  shapes.relay = outline.paths;
  console.log(`relay: mark ${outline.extent.map(v => v.toFixed(1)).join(' x ')} in the 256 box`);
}
const mark = (id, fill) => shapes[id].map(d => `<path fill="${fill}" d="${d}"/>`).join('');
console.log(`Symbol grammar: ribbon ${SYMBOL.ribbon} : gap ${SYMBOL.gap} = ${RATIO.toFixed(2)}; taper ${SYMBOL.taperLength} widths long`);
console.log(`Project ribbons: width ${W}, gap ${G.toFixed(2)}, pitch ${P.toFixed(2)} in a 256 box`);

// The previous marks, kept so the before and after board can be rebuilt.
const legacy = {
  prompt: 'M32 35C58 36 84 46 106 64L150 102C166 116 166 136 150 150L106 188C84 206 58 216 32 217C26 217 25 212 31 209C51 196 69 181 87 163L119 132C123 128 123 124 119 120L87 89C69 71 51 56 31 43C25 39 26 35 32 35Z',
  cursor: 'M170 183C184 186 202 187 222 184C231 183 238 190 238 199C238 208 232 214 223 215C202 218 183 216 166 212C158 210 154 204 156 196C157 188 162 182 170 183Z',
  panel: 'M110 35C80 30 54 35 36 56C20 75 17 96 19 121L22 178C24 205 43 221 71 221H98C108 221 116 213 116 203C116 193 108 185 98 185H75C61 185 55 177 55 164V104C55 88 62 74 73 64C85 53 97 46 110 41C115 39 115 36 110 35Z',
  bridge: 'M80 36C89 36 96 43 96 52C96 60 90 67 82 69C70 72 64 82 64 97V110H98C108 110 116 118 116 128C116 138 108 146 98 146H64V159C64 174 70 184 82 187C90 189 96 196 96 204C96 213 89 220 80 220C50 220 28 196 28 162V94C28 60 50 36 80 36Z',
};
function legacyMark(id, fill) {
  const path = (d, transform = '') => `<path fill="${fill}"${transform ? ` transform="${transform}"` : ''} d="${d}"/>`;
  if (id === 'cli') return path(legacy.prompt) + path(legacy.cursor);
  if (id === 'ide') return path(legacy.panel) + path(legacy.panel, 'rotate(180 128 128)');
  return path(legacy.bridge) + path(legacy.bridge, 'matrix(-1 0 0 1 256 0)');
}

const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
function svg(width, height, body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escape(title)}"><title>${escape(title)}</title>${body}</svg>\n`;
}
const rect = (x, y, width, height, fill, radius = 0) => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}"/>`;
const place = (body, x, y, scale = 1) => `<g transform="translate(${x} ${y}) scale(${scale})">${body}</g>`;
const cache = new Map();
let outlineId = 0;

// HarfBuzz supplies both shaping and SVG outlines, including the font's true ink bounds.
function type(value, size, fill, mono = false, weight = 600) {
  const key = JSON.stringify([value, size, fill, mono, weight]);
  if (!cache.has(key)) {
    const font = join(kit, 'fonts', mono ? 'IBMPlexMono-Medium.ttf' : 'Manrope-Variable.ttf');
    const args = [font, value, `--font-size=${size}`, '--output-format=svg', '--margin=0', '--background=none', `--foreground=${fill.slice(1)}`, '--ink'];
    if (!mono) args.push(`--variations=wght=${weight}`);
    const source = execFileSync(hbView, args, { encoding: 'utf8' });
    const box = source.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
    const body = source.slice(source.indexOf('>', source.indexOf('<svg')) + 1, source.lastIndexOf('</svg>'))
      .replace(/fill="rgb\([^"]+\)"/g, `fill="${fill}"`);
    const firstGlyph = source.match(/<use\s[^>]*x="([^"]+)"\s+y="([^"]+)"/);
    cache.set(key, { body, width: box[2], height: box[3], x: Number(firstGlyph[1]), baseline: Number(firstGlyph[2]) });
  }
  const result = cache.get(key);
  const prefix = `type-${outlineId++}-`;
  return { ...result, body: result.body.replaceAll('glyph-', `${prefix}glyph-`) };
}

function label(value, x, y, size, fill, mono = false, weight = 400) {
  return place(type(value, size, fill, mono, weight).body, x, y);
}

function centered(value, cx, y, size, fill, weight = 600) {
  const text = type(value, size, fill, false, weight);
  return place(text.body, cx - text.width / 2, y);
}

function studio(x, y, width, variant) {
  const source = readFileSync(join(kit, 'logos', `ejmlabs-${variant}.svg`), 'utf8');
  const [bx, by, bw] = source.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  const paths = source.match(/<path\b[^>]*\/>/g).join('');
  return place(place(paths, -bx, -by), x, y, width / bw);
}

function save(base, source, width) {
  const file = join(output, `${base}.svg`);
  const box = source.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  const height = Math.round(width * box[3] / box[2]);
  source = source.replace(/(<svg\b[^>]*\bwidth=")[^"]+/, `$1${width}`)
    .replace(/(<svg\b[^>]*\bheight=")[^"]+/, `$1${height}`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, source);
  execFileSync(renderer, ['--width', String(width), '--output', join(output, `${base}.png`), file]);
}

function logo(project, treatment, editable = false) {
  const nameColor = treatment === 'paper' ? C.paper : C.ink;
  const markColor = treatment === 'primary' ? C.sage : nameColor;
  const text = type(project.id, 216, nameColor);
  const width = 280 + text.width + 32;
  const name = editable
    ? `<text x="${280 + text.x}" y="${(256 - text.height) / 2 + text.baseline}" font-family="Manrope" font-size="216" font-weight="600" fill="${nameColor}">${project.id}</text>`
    : place(text.body, 280, (256 - text.height) / 2);
  return svg(width, 256, mark(project.id, markColor) + name, `${project.id} by ejmlabs, ${treatment} logo`);
}

// fill: the favicon cut draws the same mark larger (its longer side fills this share of the square) so ribbon gaps stay open at 16 px.
function iconArtwork(project, size, background, foreground, radius = 0, fill = 0) {
  const scale = fill ? size * fill / Math.max(...extent[project.id]) : size * (2 / 3) / 224;
  const inset = (size - 256 * scale) / 2;
  return rect(0, 0, size, size, background, radius) + place(mark(project.id, foreground), inset, inset, scale);
}

function icon(project, background, foreground, fill = 0) {
  return svg(1024, 1024, iconArtwork(project, 1024, background, foreground, 0, fill), `${project.id} by ejmlabs icon`);
}

function socialCard(project) {
  const lockup = logo(project, 'ink');
  const body = lockup.slice(lockup.indexOf('>') + 1, lockup.lastIndexOf('</svg>'));
  return svg(1200, 630,
    rect(0, 0, 1200, 630, C.sage)
      + studio(72, 64, 180, 'ink')
      + label('OPEN SOURCE / ' + project.description.toUpperCase(), 72, 170, 16, C.forest, true)
      + place(body, 64, 245, 0.72)
      + label(project.tagline, 72, 490, 27, C.ink)
      + label(`${project.id}.ejmlabs.com`, 72, 574, 16, C.forest, true),
    `${project.id} by ejmlabs: ${project.tagline}`);
}

const FAVICON_FILL = 0.8;
function browserAssets(project) {
  const directory = join(output, project.id);
  const favicon = join(directory, 'favicon.svg');
  writeFileSync(favicon, icon(project, C.sage, C.ink, FAVICON_FILL));
  for (const [file, size] of [['apple-touch-icon', 180], ['android-chrome-192', 192], ['android-chrome-512', 512], ['favicon-16', 16], ['favicon-24', 24], ['favicon-32', 32], ['favicon-48', 48]]) {
    execFileSync(renderer, ['--width', String(size), '--output', join(directory, `${file}.png`), favicon]);
  }
  // The ICO packs the hand-rendered 16, 32 and 48 px images rather than letting Pillow resample one large image.
  execFileSync(python, ['-c',
    'from PIL import Image; import sys; ims=[Image.open(p).convert("RGBA") for p in sys.argv[2:]]; ims[-1].save(sys.argv[1], format="ICO", sizes=[(16,16),(32,32),(48,48)], append_images=ims[:-1])',
    join(directory, 'favicon.ico'), ...[16, 32, 48].map(size => join(directory, `favicon-${size}.png`))]);
  writeFileSync(join(directory, 'site.webmanifest'), JSON.stringify({
    id: '/', name: `${project.id} by ejmlabs`, short_name: project.id,
    start_url: '/', scope: '/', display: 'standalone',
    background_color: C.paper, theme_color: C.sage,
    icons: [192, 512].map(size => ({ src: `android-chrome-${size}.png`, sizes: `${size}x${size}`, type: 'image/png', purpose: 'any' })),
  }, null, 2) + '\n');
  save(`${project.id}/social-card`, socialCard(project), 1200);
}

for (const project of selectedProjects) {
  for (const treatment of ['sage', 'ink', 'paper']) {
    save(`${project.id}/mark-${treatment}`, svg(256, 256, mark(project.id, C[treatment]), `${project.id} by ejmlabs, ${treatment} symbol`), 1024);
  }
  for (const treatment of ['primary', 'ink', 'paper']) {
    save(`${project.id}/logo-${treatment}`, logo(project, treatment), 2400);
    const editable = join(output, project.id, 'editable', `logo-${treatment}.svg`);
    mkdirSync(dirname(editable), { recursive: true });
    writeFileSync(editable, logo(project, treatment, true));
  }
  save(`${project.id}/icon-sage`, icon(project, C.sage, C.ink), 1024);
  save(`${project.id}/icon-forest`, icon(project, C.forest, C.paper), 1024);
  browserAssets(project);
}

function relayReview() {
  let body = rect(0, 0, 600, 720, C.paper) + rect(600, 0, 600, 720, C.forest);
  for (const [dark, x] of [[false, 0], [true, 600]]) {
    const foreground = dark ? C.paper : C.ink, quiet = dark ? C.mist : C.forest;
    body += label('RELAY / LOCAL ARTWORK REVIEW', x + 40, 36, 13, quiet, true);
    const lockup = logo(relayProject, dark ? 'paper' : 'primary');
    const width = Number(lockup.match(/viewBox="([^"]+)"/)[1].split(/\s+/)[2]);
    body += place(lockup.slice(lockup.indexOf('>') + 1, lockup.lastIndexOf('</svg>')), x + 64, 110, 472 / width)
      + label('Flowing ribbons. An open handoff.', x + 40, 285, 22, foreground)
      + label('ONE COLOR / FOUR DISTINCT MARKS', x + 40, 365, 12, quiet, true);
    [...projects, relayProject].forEach((project, i) => {
      const cx = x + 82 + i * 145;
      body += place(mark(project.id, foreground), cx - 48, 410, 96 / 256)
        + centered(project.id, cx, 528, 18, foreground);
    });
    body += label('EXPORTED FAVICONS / ACTUAL PIXEL SIZES', x + 40, 600, 12, quiet, true);
    for (const [i, size] of [16, 24, 32].entries()) {
      const px = x + 64 + i * 120;
      const png = readFileSync(join(output, 'relay', `favicon-${size}.png`)).toString('base64');
      body += `<image x="${px}" y="638" width="${size}" height="${size}" href="data:image/png;base64,${png}"/>`
        + label(`${size} px`, px + 42, 642, 12, quiet, true);
    }
  }
  return svg(1200, 720, body, 'Relay light and dark logos, four project marks in one color, and actual 16, 24 and 32 pixel favicon exports');
}

function relayGallery() {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Relay artwork | ejmlabs</title>
<style>body{margin:0;background:${C.paper};color:${C.ink};font-family:Manrope,sans-serif;line-height:1.6}main{max-width:1200px;margin:auto}.board{display:block;width:100%;height:auto}nav,p{padding:20px 32px;margin:0}nav{display:flex;flex-wrap:wrap;gap:16px}a{color:${C.forest};text-underline-offset:4px}a:focus-visible{outline:3px solid ${C.forest};outline-offset:5px}.samples{display:flex;align-items:center;gap:24px;padding:20px 32px}.samples img{flex:none}</style></head>
<body><main><img class="board" src="review.svg" width="1200" height="720" alt="Relay light and dark logos, a monochrome comparison with cli, ide and harness, and exported 16, 24 and 32 pixel favicons.">
<p>Local artwork for review. Shared-package adoption and application publication are pending.</p>
<nav aria-label="Download Relay artwork"><a href="logo-primary.svg" download>Primary logo</a><a href="logo-ink.svg" download>Ink logo</a><a href="logo-paper.svg" download>Paper logo</a><a href="mark-sage.svg" download>Sage mark</a><a href="mark-ink.svg" download>Ink mark</a><a href="mark-paper.svg" download>Paper mark</a><a href="icon-sage.png" download>Sage icon</a><a href="icon-forest.png" download>Forest icon</a><a href="favicon.ico" download>Favicon</a><a href="site.webmanifest" download>Manifest</a><a href="social-card.png" download>Social card</a><a href="review.png" download>Review PNG</a></nav>
<div class="samples" aria-label="Favicons at native pixel sizes"><img src="favicon-16.png" width="16" height="16" alt="Relay at 16 pixels"><img src="favicon-24.png" width="24" height="24" alt="Relay at 24 pixels"><img src="favicon-32.png" width="32" height="32" alt="Relay at 32 pixels"></div>
</main></body></html>\n`;
}

if (relayOnly) {
  save('relay/review', relayReview(), 1200);
  const directory = join(output, 'relay');
  writeFileSync(join(directory, 'index.html'), relayGallery());
  for (const treatment of ['sage', 'ink', 'paper']) {
    if (readFileSync(join(directory, `mark-${treatment}.svg`)).length > 8 * 1024) throw new Error('Relay mark exceeds 8 KiB.');
  }
  for (const treatment of ['primary', 'ink', 'paper']) {
    if (readFileSync(join(directory, `logo-${treatment}.svg`)).length > 24 * 1024) throw new Error('Relay logo exceeds 24 KiB.');
  }
  const folderBytes = dir => readdirSync(dir, { withFileTypes: true }).reduce((bytes, entry) => bytes + (entry.isDirectory() ? folderBytes(join(dir, entry.name)) : readFileSync(join(dir, entry.name)).length), 0);
  const bytes = folderBytes(directory);
  if (bytes > 1024 * 1024) throw new Error(`Relay folder exceeds 1 MiB (${bytes} bytes).`);
  console.log(`Built Relay assets and local review (${bytes} bytes).`);
} else {

function family(dark) {
  const background = dark ? C.forest : C.paper;
  const foreground = dark ? C.paper : C.ink;
  const quiet = dark ? C.mist : C.forest;
  let body = rect(0, 0, 1800, 1190, background)
    + studio(84, 72, 246, dark ? 'paper' : 'primary')
    + label('PROJECT IDENTITIES / 01', 1430, 84, 14, quiet, true)
    + label('Three tools. One family.', 82, 199, 70, foreground, false, 600)
    + label('Nested ribbons from the ejmlabs symbol, each with a shape of its own.', 86, 290, 25, quiet);
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const cx = 300 + i * 600;
    body += place(mark(project.id, dark ? C.paper : C.sage), cx - 158, 399, 1.24)
      + centered(project.id, cx, 757, 59, foreground)
      + centered(project.description, cx, 834, 21, quiet, 400);
  }
  body += rect(0, 939, 1800, 251, dark ? C.ink : C.mist);
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    const x = 84 + i * 600;
    body += label(project.id.toUpperCase(), x, 976, 13, dark ? C.paper : C.forest, true)
      + place(iconArtwork(project, 104, C.sage, C.ink, 22), x, 1013)
      + place(iconArtwork(project, 104, C.forest, C.paper, 22), x + 120, 1013)
      + place(mark(project.id, foreground), x + 275, 1051, 16 / 256)
      + place(mark(project.id, foreground), x + 326, 1047, 24 / 256)
      + place(mark(project.id, foreground), x + 390, 1043, 32 / 256)
      + label('16', x + 274, 1097, 12, quiet, true)
      + label('24', x + 329, 1097, 12, quiet, true)
      + label('32', x + 400, 1097, 12, quiet, true);
  }
  body += label('SAGE / FOREST / INK / PAPER', 85, 1150, 12, quiet, true)
    + label('PROJECT FAMILY / OCTOBER 2026', 1470, 1150, 12, quiet, true);
  return svg(1800, 1190, body, `cli, ide, and harness logo family on ${dark ? 'Forest' : 'Paper'}`);
}

// Old marks above, new marks below, so the owner can compare the family at a glance.
const drawn = (ds, fill) => ds.map(d => `<path fill="${fill}" d="${d}"/>`).join('');
function beforeAfter() {
  const rows = [['BEFORE: SINGLE GLYPHS', legacyMark, 330], ['FIRST PASS: STRAIGHT RIBBONS', (id, fill) => drawn(firstPass[id], fill), 640], ['SECOND PASS: THE SYMBOL\'S CURVATURE', mark, 950]];
  let body = rect(0, 0, 1800, 1330, C.paper) + studio(84, 72, 246, 'primary')
    + label('BEFORE / FIRST PASS / SECOND PASS', 1380, 84, 14, C.forest, true)
    + label('Same three tools, redrawn from the symbol.', 82, 199, 54, C.ink, false, 600);
  for (const [title, draw, y] of rows) {
    body += label(title, 84, y - 18, 13, C.forest, true);
    for (let i = 0; i < projects.length; i++) body += place(draw(projects[i].id, C.sage), 300 + i * 600 - 115, y, 0.9);
  }
  for (let i = 0; i < projects.length; i++) body += centered(projects[i].id, 300 + i * 600, 1240, 34, C.ink);
  return svg(1800, 1330, body + rect(0, 1280, 1800, 50, C.mist) + label('SAGE / FOREST / INK / PAPER', 85, 1297, 12, C.forest, true), 'The old, first pass and second pass cli, ide, and harness marks');
}
// The studio symbol's own paths, scaled so its longer side is `size`, centred on (cx, cy).
function symbolAt(cx, cy, size, variant) {
  const source = readFileSync(join(kit, 'logos', `symbol-${variant}.svg`), 'utf8');
  const [bx, by, bw, bh] = source.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number), k = size / Math.max(bw, bh);
  return place(place(source.match(/<path\b[^>]*\/>/g).join(''), -bx - bw / 2, -by - bh / 2), cx, cy, k);
}
// The evaluation board: the symbol beside each mark at 160, 64, 32 and 16 px, on Paper and on Forest.
function symbolCompare() {
  const sizes = [160, 64, 32, 16];
  let body = rect(0, 0, 900, 640, C.paper) + rect(900, 0, 900, 640, C.forest)
    + label('NEXT TO THE SYMBOL, 160 / 64 / 32 / 16 PX', 40, 40, 14, C.forest, true) + label('NEXT TO THE SYMBOL, 160 / 64 / 32 / 16 PX', 940, 40, 14, C.mist, true);
  for (const [dark, x0] of [[false, 0], [true, 900]]) {
    const ink = dark ? C.paper : C.ink;
    let y = 130;
    for (const size of sizes) {
      body += symbolAt(x0 + 130, y, size * 0.92, dark ? 'paper' : 'ink');
      projects.forEach((p, i) => { body += place(mark(p.id, ink), x0 + 330 + i * 190 - size / 2, y - size / 2, size / 256); });
      y += size / 2 + (sizes[sizes.indexOf(size) + 1] || 0) / 2 + 60;
    }
  }
  return svg(1800, 640, body, 'The ejmlabs symbol beside the cli, ide, and harness marks at 160, 64, 32, and 16 px');
}
// Every construction tried in the second pass, the chosen one marked.
function candidateBoard() {
  const cell = 246;
  let body = rect(0, 0, 1800, 1090, C.paper) + label('SECOND PASS CANDIDATES', 60, 50, 14, C.forest, true)
    + label('The chosen mark in each row is dark and labelled. REVIEW.md says why the others lost.', 60, 100, 26, C.ink);
  Object.entries(candidates).forEach(([id, options], row) => {
    const y = 150 + row * 315;
    body += label(id.toUpperCase(), 60, y + 14, 13, C.forest, true);
    Object.entries(options).forEach(([name, build], col) => {
      let art = '';
      try { const o = outlines(build()); art = drawn(o.paths, chosen[id] === name ? C.forest : C.sage); const k = Math.min(1, 224 / Math.max(...o.extent)); body += place(art, 60 + col * cell + 128 * (1 - k * 0.76), y + 30 + 128 * (1 - k * 0.76), 0.76 * k); }
      catch { /* a construction that cannot be drawn is simply left out */ }
      body += label(`${id}.${name}${chosen[id] === name ? '  chosen' : ''}`, 60 + col * cell, y + 270, 12, C.forest, true);
    });
  });
  return svg(1800, 1090, body, 'The candidate constructions for the cli, ide, and harness marks');
}
save('before-after', beforeAfter(), 1800);
save('symbol-compare', symbolCompare(), 1800);
save('candidates', candidateBoard(), 1800);
save('family-light', family(false), 1800);
save('family-dark', family(true), 1800);

// A local image gallery keeps the artwork usable without a build step or scripts.
writeFileSync(join(output, 'index.html'), `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Project logos | ejmlabs</title><link rel="stylesheet" href="../tokens/brand.css">
<style>body{margin:0;background:var(--ejm-paper);color:var(--ejm-ink);font-family:var(--ejm-font-sans)}main{max-width:1800px;margin:auto}img{display:block;width:100%;height:auto}nav{display:flex;flex-wrap:wrap;gap:24px;padding:28px 5%;align-items:center}a{color:var(--ejm-forest);text-underline-offset:4px}a:focus-visible{outline:3px solid var(--ejm-forest);outline-offset:5px}p{padding:0 5% 24px;line-height:1.6}</style></head>
<body><main><img src="family-light.svg" width="1800" height="1190" alt="CLI prompt chevrons with a cursor bar, IDE bracket pair with nested bars, and Harness H with nested uprights, drawn as nested ribbons in the ejmlabs palette, with icons and small-size samples.">
<nav aria-label="Download logos"><strong>Project assets</strong>${projects.map(project => `<a href="${project.id}/logo-primary.svg" download>${project.id} SVG</a><a href="${project.id}/icon-sage.png" download>${project.id} icon</a>`).join('')}<a href="before-after.png">Before and after</a><a href="symbol-compare.png">Next to the symbol</a><a href="candidates.png">Candidates</a><a href="REVIEW.md">Review</a><a href="README.md">Usage guide</a></nav>
<img src="family-dark.svg" width="1800" height="1190" alt="The same three logos reversed on Forest.">
<p>Project identities drawn in the ejmlabs ribbon language: ribbons of one width and one gap on flowing curves, with round terminals and a long fine taper. SVG wordmarks contain font outlines. Editable type sources and transparent PNGs accompany each project.</p></main></body></html>\n`);

console.log('Built CLI, IDE, and Harness logos, browser bundles, social cards, and family previews.');
}
