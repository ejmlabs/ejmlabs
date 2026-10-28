// Build the site, retain approved asset URLs, and assemble public downloads.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderInstallScript } from './install-sh.mjs';
import { readReleases } from './releases.mjs';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const root = join(site, '..');
const dist = join(site, 'dist');
const kit = join(root, 'design-kit');
const asset = file => fileURLToPath(import.meta.resolve(`@ejm/tokens/assets/${file}`));
const assetDirectory = file => dirname(asset(file));
const favicon = assetDirectory('favicon/favicon.svg');
const publicKit = join(site, 'brand-kit');
const pair = names => names.flatMap(name => [`${name}.svg`, `${name}.png`]);
const icons = ['favicon.svg', 'favicon.ico', 'favicon-16.png', 'favicon-32.png', 'favicon-48.png', 'apple-touch-icon.png', 'android-chrome-192.png', 'android-chrome-512.png', 'site.webmanifest'];
const fonts = ['Manrope-Variable.ttf', 'Manrope-Variable.woff2', 'Manrope-OFL.txt', 'IBMPlexMono-Medium.ttf', 'IBMPlexMono-Medium.woff2', 'IBMPlexMono-OFL.txt'];
const projectFiles = [
  ...pair(['logo-primary', 'logo-ink', 'logo-paper', 'mark-ink', 'mark-paper', 'mark-sage', 'icon-forest', 'icon-sage', 'social-card']),
  ...icons, 'favicon-24.png', ...['primary', 'ink', 'paper'].map(color => `editable/logo-${color}.svg`),
];

// Named files only. New internal material cannot enter a public ZIP by appearing in a folder.
const brandAssets = [
  ...pair(['ejmlabs-primary', 'ejmlabs-ink', 'ejmlabs-paper', 'symbol-ink', 'symbol-paper', 'symbol-sage']).map(file => `logos/${file}`),
  ...pair(['signature-forest', 'signature-paper', 'signature-sage']).map(file => `lockups/${file}`),
  ...pair(['flow-forest', 'flow-paper', 'orbit-forest', 'orbit-paper', 'signature-crop-forest', 'signature-crop-paper']).map(file => `motifs/${file}`),
  ...icons.map(file => `favicon/${file}`),
  ...fonts.map(file => `fonts/${file}`),
  ...['cli', 'ide', 'harness'].flatMap(project => projectFiles.map(file => `projects/${project}/${file}`)),
  ...pair(['avatar', 'avatar-forest', 'avatar-sage', 'social-card', 'social-card-forest', 'social-card-sage']).map(file => `social/${file}`),
  ...pair(['image-frame', 'project-forest', 'project-sage', 'quote-paper']).map(file => `templates/${file}`),
  ...['image-frame', 'project-forest', 'project-sage', 'quote-paper'].map(file => `templates/editable/${file}.svg`),
];
const swagArtwork = [
  'symbol-forest-32mm.svg', 'symbol-paper-32mm.svg', 'symbol-sage-32mm.svg',
  'full-logo-forest-180mm.svg', 'full-logo-paper-180mm.svg', 'flow-sage-280mm.svg',
  'orbit-sage-240mm.svg', 'flow-highball-wrap-180x112mm.svg', 'manifest.json',
];
const swagPreviews = ['apparel-collection.webp', 'accessories-collection.webp', 'glassware.webp'];
const copy = (source, target) => {
  mkdirSync(dirname(target), { recursive: true });
  cpSync(source, target);
};

// A bad release list stops the build before anything is written.
const releases = readReleases();
execFileSync(join(site, 'node_modules', '.bin', 'ejm-ssg'), ['build'], { cwd: site, stdio: 'inherit' });
writeFileSync(join(dist, 'install.sh'), renderInstallScript(releases));

// Preserve approved direct asset URLs, including social exports, without publishing internal notes,
// comparison sheets, generators, HTML or nested archives from the working design kit.
function copyAssetTree(source, target) {
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    if (entry.isDirectory()) copyAssetTree(join(source, entry.name), join(target, entry.name));
    else if (/\.(?:svg|png|ico|webmanifest)$/.test(entry.name)) copy(join(source, entry.name), join(target, entry.name));
  }
}
for (const dir of ['logos', 'social']) copyAssetTree(assetDirectory(`${dir}/${dir === 'logos' ? 'ejmlabs-primary.svg' : 'avatar.svg'}`), join(dist, 'design-kit', dir));
copyAssetTree(favicon, join(dist, 'design-kit', 'favicon'));
for (const project of ['cli', 'ide', 'harness']) copyAssetTree(assetDirectory(`projects/${project}/logo-primary.svg`), join(dist, 'design-kit', 'projects', project));
for (const file of pair(['family-light', 'family-dark'])) copy(asset(`projects/${file}`), join(dist, 'design-kit', 'projects', file));

const stage = mkdtempSync(join(tmpdir(), 'ejmlabs-public-kit-'));
try {
  const brand = join(stage, 'design-kit');
  for (const file of brandAssets) copy(asset(file), join(brand, file));
  copy(join(publicKit, 'README.md'), join(brand, 'README.md'));
  copy(asset('brand/palette.json'), join(brand, 'palette.json'));
  copy(join(publicKit, 'RIGHTS.md'), join(brand, 'RIGHTS.md'));
  copy(join(root, 'LICENSE'), join(brand, 'LICENSE'));

  const swag = join(stage, 'swag');
  for (const file of swagArtwork) copy(join(kit, 'swag', 'artwork', file), join(swag, 'artwork', file));
  for (const file of swagPreviews) copy(join(kit, 'swag', 'mockups', file), join(swag, 'mockups', file));
  copy(join(publicKit, 'SWAG.md'), join(swag, 'README.md'));
  copy(join(publicKit, 'SWAG.md'), join(swag, 'artwork', 'README.md'));
  copy(join(publicKit, 'RIGHTS.md'), join(swag, 'RIGHTS.md'));
  copy(join(root, 'LICENSE'), join(swag, 'LICENSE'));

  for (const [folder, archive] of [['design-kit', 'ejmlabs-design-kit.zip'], ['swag', 'ejmlabs-swag-kit.zip']]) {
    execFileSync('zip', ['-qr', join(dist, archive), folder], { cwd: stage, stdio: 'inherit' });
  }
} finally {
  rmSync(stage, { recursive: true, force: true });
}
console.log('dist/ is ready with public brand downloads');
