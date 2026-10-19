const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const modules = process.env.EJMLABS_NODE_MODULES;
const { GlobalFonts, convertSVGTextToPath, loadImage, createCanvas } = require(
  modules ? path.join(modules, '@napi-rs/canvas') : '@napi-rs/canvas'
);

const root = path.resolve(__dirname, '..');
const kit = path.join(root, 'design-kit');
const xkit = path.join(root, 'x-kit');
const C = { sage: '#8A9A7B', forest: '#29443B', ink: '#202721', paper: '#F6F5EF', mist: '#E8EDE3' };
GlobalFonts.registerFromPath(path.join(kit, 'fonts/Manrope-Variable.ttf'), 'Manrope');
GlobalFonts.registerFromPath(path.join(kit, 'fonts/IBMPlexMono-Medium.ttf'), 'IBM Plex Mono');
// Pin export weights so the SVG outliner does not use the variable font's 200 default.
const exportFonts = fs.mkdtempSync(path.join(os.tmpdir(), 'ejmlabs-fonts-'));
for (const weight of [400, 600]) {
  const target = path.join(exportFonts, `manrope-${weight}.ttf`);
  execFileSync('hb-subset', [path.join(kit, 'fonts/Manrope-Variable.ttf'), '--keep-everything', `--variations=wght=${weight}`, `--output-file=${target}`]);
  GlobalFonts.registerFromPath(target, `EJMExportManrope${weight}`);
}

const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const rect = (w, h, fill) => `<rect width="${w}" height="${h}" fill="${fill}"/>`;
const text = (value, x, y, size, fill, weight = 400, mono = false) =>
  `<text x="${x}" y="${y}" font-family="${mono ? 'IBM Plex Mono' : 'Manrope'}" font-weight="${weight}" font-size="${size}" fill="${fill}">${esc(value)}</text>`;

function art(name, x, y, width, { fill, opacity = 1 } = {}) {
  const svg = fs.readFileSync(path.join(kit, 'logos', `${name}.svg`), 'utf8');
  const bounds = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  let paths = svg.match(/<path\b[^>]*\/>/g).join('');
  if (fill) paths = paths.replace(/fill="[^"]+"/g, `fill="${fill}"`);
  return `<g opacity="${opacity}" transform="translate(${x} ${y}) scale(${width / bounds[2]}) translate(${-bounds[0]} ${-bounds[1]})">${paths}</g>`;
}

function svg(w, h, body, title) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(title)}"><title>${esc(title)}</title>${body}</svg>`;
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function outlineText(live, width, height) {
  // Outline only the text. A whole-document conversion discards translucent artwork.
  return live.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g, element => {
    if (element.includes('font-family="Manrope"')) {
      const weight = element.match(/font-weight="(\d+)"/)[1];
      element = element.replace('font-family="Manrope"', `font-family="EJMExportManrope${weight}"`);
    }
    const outlined = convertSVGTextToPath(svg(width, height, element, '')).toString();
    return outlined.replace(/^<\?xml[^>]*>\s*/, '').replace(/^<svg\b[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  });
}

async function exportAsset(base, width, height, body, title, editable) {
  const live = svg(width, height, body, title);
  const outlined = Buffer.from(body.includes('<text') ? outlineText(live, width, height) : live);
  write(`${base}.svg`, outlined);
  if (editable) write(editable, live);
  const image = await loadImage(outlined);
  const canvas = createCanvas(width, height);
  canvas.getContext('2d').drawImage(image, 0, 0, width, height);
  write(`${base}.png`, canvas.encodeSync('png'));
}

function echo() {
  return `<defs><pattern id="echo" width="480" height="360" patternUnits="userSpaceOnUse">${art('symbol-sage', 60, 35, 136)}${art('symbol-sage', 300, 215, 136)}</pattern></defs><rect width="1600" height="900" fill="url(#echo)"/>`;
}

function flow(color) {
  let output = '';
  for (let row = -13; row <= 13; row++) {
    let d = '';
    for (let step = 0; step <= 160; step++) {
      const t = step / 160;
      const x = -100 + 1800 * t;
      const y = 450 + row * 25 + 112 * Math.sin(2 * Math.PI * (t - 0.12))
        + 39 * Math.sin(4 * Math.PI * t + 0.6) + row * 5 * Math.sin(Math.PI * t);
      d += `${step ? 'L' : 'M'}${x.toFixed(2)} ${y.toFixed(2)}`;
    }
    output += `<path d="${d}" fill="none" stroke="${color}" stroke-width="1.6"/>`;
  }
  return output;
}

function orbit(color) {
  let output = '<g transform="rotate(-26 1160 470)">';
  for (let i = 0; i < 23; i++) {
    output += `<ellipse cx="1160" cy="470" rx="${290 + 20 * i}" ry="${175 + 13 * i}" fill="none" stroke="${color}" stroke-width="${i % 6 ? 1.4 : 2.2}"/>`;
  }
  return output + '</g>';
}

async function buildMotifs() {
  for (const theme of ['forest', 'paper']) {
    const bg = C[theme];
    const line = theme === 'forest' ? C.sage : C.forest;
    const families = {
      'signature-crop': art('symbol-sage', 590, -175, 1400, { opacity: theme === 'forest' ? 0.3 : 0.28 }),
      echo: `<g opacity="${theme === 'forest' ? 0.33 : 0.28}">${echo()}</g>`,
      flow: `<g opacity="${theme === 'forest' ? 0.5 : 0.24}">${flow(line)}</g>`,
      orbit: `<g opacity="${theme === 'forest' ? 0.55 : 0.25}">${orbit(line)}</g>`,
    };
    for (const [name, body] of Object.entries(families)) {
      await exportAsset(path.join(kit, 'motifs', `${name}-${theme}`), 1600, 900,
        rect(1600, 900, bg) + body, `ejmlabs ${name} motif on ${theme}`);
    }
  }
  write(path.join(kit, 'motifs/signature-crop.svg'), svg(1600, 900, art('symbol-sage', 590, -175, 1400), 'Signature crop, transparent'));
  write(path.join(kit, 'motifs/echo-tile.svg'), svg(480, 360, art('symbol-sage', 60, 35, 136) + art('symbol-sage', 300, 215, 136), 'Echo repeat tile, transparent'));
  write(path.join(kit, 'motifs/flow-lines.svg'), svg(1600, 900, flow(C.forest), 'Flow lines, transparent'));
  write(path.join(kit, 'motifs/orbit-lines.svg'), svg(1600, 900, orbit(C.forest), 'Orbital lines, transparent'));
}

async function buildLockupsAndTemplates() {
  for (const theme of ['forest', 'paper']) {
    const fg = theme === 'forest' ? C.paper : C.ink;
    const logo = theme === 'forest' ? 'ejmlabs-paper' : 'ejmlabs-primary';
    const body = rect(1200, 500, C[theme]) + art(logo, 144, 113, 665)
      + text('Small experiments. Useful things.', 147, 341, 37, fg);
    await exportAsset(path.join(kit, 'lockups', `signature-${theme}`), 1200, 500, body,
      `ejmlabs signature lockup on ${theme}`, path.join(kit, 'lockups/editable', `signature-${theme}.svg`));
  }
  const project = rect(1600, 900, C.forest)
    + art('symbol-sage', 1150, 175, 700, { opacity: 0.25 })
    + art('ejmlabs-paper', 96, 78, 360)
    + text('A new experiment', 100, 267, 26, C.paper)
    + text('Project name', 94, 400, 108, C.paper, 600)
    + text('A short line about what it does.', 100, 487, 38, C.paper)
    + text('ejmlabs.com', 100, 795, 24, C.paper, 500, true);
  await exportAsset(path.join(kit, 'templates/project-forest'), 1600, 900, project,
    'Project announcement template with placeholder copy', path.join(kit, 'templates/editable/project-forest.svg'));
  const quote = rect(1600, 900, C.paper)
    + art('symbol-sage', 1160, 125, 760, { opacity: 0.25 })
    + art('ejmlabs-primary', 96, 78, 360)
    + text('Small experiments.', 91, 383, 100, C.ink, 600)
    + text('Useful things.', 91, 507, 100, C.ink, 600)
    + text('ejmlabs.com', 100, 795, 24, C.forest, 500, true);
  await exportAsset(path.join(kit, 'templates/quote-paper'), 1600, 900, quote,
    'ejmlabs signature post', path.join(kit, 'templates/editable/quote-paper.svg'));
  const frame = rect(1600, 900, C.paper) + art('ejmlabs-primary', 72, 55, 280)
    + `<rect x="72" y="170" width="1456" height="634" rx="12" fill="${C.mist}"/>`
    + text('Project image', 616, 499, 42, C.forest, 600)
    + text('ejmlabs.com', 1302, 852, 18, C.forest, 500, true);
  await exportAsset(path.join(kit, 'templates/image-frame'), 1600, 900, frame,
    'Project image frame template with placeholder', path.join(kit, 'templates/editable/image-frame.svg'));
}

async function buildXKit() {
  for (const name of ['Manrope-Variable.ttf', 'Manrope-OFL.txt', 'IBMPlexMono-Medium.ttf', 'IBMPlexMono-OFL.txt']) {
    write(path.join(xkit, 'fonts', name), fs.readFileSync(path.join(kit, 'fonts', name)));
  }
  for (const name of ['ejmlabs-primary', 'ejmlabs-paper', 'symbol-paper', 'symbol-ink']) {
    write(path.join(xkit, 'source/logos', `${name}.svg`), fs.readFileSync(path.join(kit, 'logos', `${name}.svg`)));
  }
  for (const theme of ['forest', 'paper']) {
    const fg = theme === 'forest' ? C.paper : C.ink;
    const logo = theme === 'forest' ? 'ejmlabs-paper' : 'ejmlabs-primary';
    for (const size of [400, 1024]) {
      // Symbol width is two thirds of the canvas, giving a quarter-symbol margin.
      const markWidth = size * 2 / 3;
      const markHeight = markWidth * 381.139451471 / 417.54790365;
      const body = rect(size, size, C[theme])
        + art(theme === 'forest' ? 'symbol-paper' : 'symbol-ink', (size - markWidth) / 2, (size - markHeight) / 2, markWidth);
      await exportAsset(path.join(xkit, 'avatars', `${theme}-${size}`), size, size, body, `ejmlabs ${theme} avatar`);
    }
    const header = rect(1500, 500, C[theme])
      + art('symbol-sage', 1120, -100, 800, { opacity: theme === 'forest' ? 0.3 : 0.28 })
      + art(logo, 420, 126, 500)
      + text('Small experiments. Useful things.', 422, 310, 33, fg)
      + text('ejmlabs.com', 424, 372, 19, fg, 500, true);
    await exportAsset(path.join(xkit, 'banners', `${theme}-1500x500`), 1500, 500, header,
      `ejmlabs X banner on ${theme}`, path.join(xkit, 'source/editable', `banner-${theme}.svg`));
  }
  for (const [source, target] of [['quote-paper', 'signature'], ['project-forest', 'project-template']]) {
    for (const extension of ['svg', 'png']) {
      write(path.join(xkit, 'posts', `${target}-1600x900.${extension}`), fs.readFileSync(path.join(kit, 'templates', `${source}.${extension}`)));
    }
    write(path.join(xkit, 'source/editable', `${target}-1600x900.svg`),
      fs.readFileSync(path.join(kit, 'templates/editable', `${source}.svg`)));
  }
  write(path.join(xkit, 'UPLOAD-avatar.png'), fs.readFileSync(path.join(xkit, 'avatars/sage-400.png')));
  write(path.join(xkit, 'UPLOAD-header.png'), fs.readFileSync(path.join(xkit, 'banners/sage-1500x500.png')));
  const header = fs.readFileSync(path.join(xkit, 'source/editable/banner-forest.svg'), 'utf8');
  const guide = header.replace('</svg>',
    `<rect x="0" y="0" width="1500" height="60" fill="${C.paper}" opacity="0.25"/>`
    + `<rect x="0" y="440" width="1500" height="60" fill="${C.paper}" opacity="0.25"/>`
    + `<rect x="390" y="80" width="720" height="340" fill="none" stroke="${C.paper}" stroke-width="2" stroke-dasharray="10 8"/>`
    + `<circle cx="170" cy="490" r="170" fill="${C.paper}" opacity="0.22"/>`
    + text('Potential crop', 28, 39, 21, C.paper, 600)
    + text('Keep key content inside this region', 430, 112, 18, C.paper, 600)
    + text('Avatar overlap', 52, 428, 19, C.paper, 600) + '</svg>');
  const outlined = Buffer.from(outlineText(guide, 1500, 500));
  write(path.join(xkit, 'guides/banner-safe-area.svg'), outlined);
  const guideImage = await loadImage(outlined);
  const guideCanvas = createCanvas(1500, 500);
  guideCanvas.getContext('2d').drawImage(guideImage, 0, 0, 1500, 500);
  write(path.join(xkit, 'guides/banner-safe-area.png'), guideCanvas.encodeSync('png'));
}

(async () => {
  await buildMotifs();
  await buildLockupsAndTemplates();
  await buildXKit();
  fs.rmSync(exportFonts, { recursive: true, force: true });
  console.log('Built 4 motif families, 2 lockups, 3 templates, and the X asset set.');
})();
