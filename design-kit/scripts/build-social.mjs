#!/usr/bin/env node
// Generates the Sage edition of the social and X assets: avatars, banner, posts, lockup, template and social card.
// Deterministic and dependency-free. PNGs come from headless Google Chrome. Production SVGs get outlined text from
// scripts/outline-text.py when python3 with fontTools and hb-shape are available, otherwise they keep live text.
// Usage: node design-kit/scripts/build-social.mjs
// Environment: CHROME overrides the Chrome path, PYTHON overrides python3.
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const kit = join(here, '..');
const xkit = join(kit, '..', 'x-kit');
const chrome = process.env.CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const python = process.env.PYTHON || 'python3';
const C = { sage: '#8A9A7B', forest: '#29443B', ink: '#202721', paper: '#F6F5EF' };
const TINT = 0.15; // Paper over Sage, the same tint as motifs/signature-crop-sage.svg

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const rect = (w, h, fill) => `<rect width="${w}" height="${h}" fill="${fill}"/>`;
const text = (value, x, y, size, fill, weight = 400, mono = false) =>
  `<text x="${x}" y="${y}" font-family="${mono ? 'IBM Plex Mono' : 'Manrope'}" font-weight="${weight}" font-size="${size}" fill="${fill}">${esc(value)}</text>`;
const svg = (w, h, body, title) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>${body}</svg>`;

// Supplied artwork, unchanged: the paths and viewBox come from logos/, only placed and scaled here.
function art(name, x, y, width, opacity = 1) {
  const file = readFileSync(join(kit, 'logos', `${name}.svg`), 'utf8');
  const box = file.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  const paths = file.match(/<path\b[^>]*\/>/g).join('');
  return `<g opacity="${opacity}" transform="translate(${x} ${y}) scale(${width / box[2]}) translate(${-box[0]} ${-box[1]})">${paths}</g>`;
}
const crop = (x, y, width) => art('symbol-paper', x, y, width, TINT);

const write = (file, content) => { mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, content); };
const scratch = mkdtempSync(join(tmpdir(), 'ejmlabs-social-'));

function outlinerReady() {
  try {
    execFileSync(python, ['-c', 'import fontTools.varLib.instancer'], { stdio: 'ignore' });
    execFileSync('hb-shape', ['--version'], { stdio: 'ignore' });
    return true;
  } catch { return false; }
}
const outline = outlinerReady();
if (!outline) console.warn('fontTools or hb-shape missing: production SVGs keep live text (fonts are in x-kit/fonts).');

function render(live, w, h, png) {
  const page = join(scratch, 'page.html');
  write(page, `<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="${pathToFileURL(join(kit, 'tokens/brand.css'))}">`
    + `<style>html,body{margin:0;background:${C.sage}}svg{display:block}</style>${live}`);
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
    '--allow-file-access-from-files', '--virtual-time-budget=3000', `--screenshot=${png}`, `--window-size=${w},${h}`,
    pathToFileURL(page).href], { stdio: 'ignore' });
}

function exportAsset(base, w, h, body, title, editable) {
  const live = svg(w, h, body, title);
  mkdirSync(dirname(base), { recursive: true });
  if (editable) write(editable, live);
  if (outline && body.includes('<text')) {
    const source = join(scratch, 'live.svg');
    write(source, live);
    execFileSync(python, [join(here, 'outline-text.py'), source, `${base}.svg`]);
  } else write(`${base}.svg`, live);
  render(live, w, h, `${base}.png`);
}

// Layout numbers match the Forest and Paper pieces so copy, crop and avatar overlap sit where they always did.
function banner() {
  return rect(1500, 500, C.sage) + crop(1120, -100, 800) + art('ejmlabs-ink', 420, 126, 500)
    + text('Small experiments. Useful things.', 422, 310, 33, C.ink)
    + text('ejmlabs.com', 424, 372, 19, C.ink, 500, true);
}
const signature = () => rect(1600, 900, C.sage) + crop(1160, 125, 760) + art('ejmlabs-ink', 96, 78, 360)
  + text('Small experiments.', 91, 383, 100, C.ink, 600) + text('Useful things.', 91, 507, 100, C.forest, 600)
  + text('ejmlabs.com', 100, 795, 24, C.ink, 500, true);
const project = () => rect(1600, 900, C.sage) + crop(1150, 175, 700) + art('ejmlabs-ink', 96, 78, 360)
  + text('A new experiment', 100, 267, 26, C.ink) + text('Project name', 94, 400, 108, C.ink, 600)
  + text('A short line about what it does.', 100, 487, 38, C.ink) + text('ejmlabs.com', 100, 795, 24, C.ink, 500, true);
const lockup = () => rect(1200, 500, C.sage) + art('ejmlabs-ink', 144, 113, 665)
  + text('Small experiments. Useful things.', 147, 341, 37, C.ink);
const card = () => rect(1200, 630, C.sage) + crop(845, 319, 580) + art('ejmlabs-ink', 72, 72, 330)
  + text('Small experiments.', 72, 325, 64, C.ink) + text('Useful things.', 72, 405, 64, C.forest)
  + text('IDEAS / SOFTWARE / OPEN SOURCE', 74, 558, 14, C.ink, 500, true);
// Symbol width is two thirds of the canvas, which leaves a quarter of the symbol width clear on each side.
function avatar(size) {
  const markWidth = size * 2 / 3, markHeight = markWidth * 381.139451471 / 417.54790365;
  return rect(size, size, C.sage) + art('symbol-ink', (size - markWidth) / 2, (size - markHeight) / 2, markWidth);
}

// X kit
for (const name of ['ejmlabs-ink']) copyFileSync(join(kit, 'logos', `${name}.svg`), join(xkit, 'source/logos', `${name}.svg`));
for (const size of [400, 1024]) exportAsset(join(xkit, 'avatars', `sage-${size}`), size, size, avatar(size), 'ejmlabs sage avatar');
exportAsset(join(xkit, 'banners/sage-1500x500'), 1500, 500, banner(), 'ejmlabs X banner on sage', join(xkit, 'source/editable/banner-sage.svg'));
exportAsset(join(xkit, 'posts/signature-sage-1600x900'), 1600, 900, signature(), 'ejmlabs signature post on sage', join(xkit, 'source/editable/signature-sage-1600x900.svg'));
exportAsset(join(xkit, 'posts/project-template-sage-1600x900'), 1600, 900, project(), 'Project announcement template with placeholder copy on sage', join(xkit, 'source/editable/project-template-sage-1600x900.svg'));
copyFileSync(join(xkit, 'avatars/sage-400.png'), join(xkit, 'UPLOAD-avatar.png'));
copyFileSync(join(xkit, 'banners/sage-1500x500.png'), join(xkit, 'UPLOAD-header.png'));

// Design kit: lockup, template, social card and avatar. The default names carry the Sage edition.
exportAsset(join(kit, 'lockups/signature-sage'), 1200, 500, lockup(), 'ejmlabs signature lockup on sage', join(kit, 'lockups/editable/signature-sage.svg'));
exportAsset(join(kit, 'templates/project-sage'), 1600, 900, project(), 'Project announcement template with placeholder copy on sage', join(kit, 'templates/editable/project-sage.svg'));
exportAsset(join(kit, 'social/social-card-sage'), 1200, 630, card(), 'ejmlabs social card on sage');
exportAsset(join(kit, 'social/avatar-sage'), 1024, 1024, avatar(1024), 'ejmlabs sage avatar');
for (const name of ['social-card', 'avatar']) for (const ext of ['svg', 'png']) copyFileSync(join(kit, 'social', `${name}-sage.${ext}`), join(kit, 'social', `${name}.${ext}`));

rmSync(scratch, { recursive: true, force: true });
console.log('Built the Sage avatars, banner, posts, lockup, template, social card and uploads.');
