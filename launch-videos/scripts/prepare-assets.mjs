import {createHash} from 'node:crypto';
import {mkdir, copyFile, readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = join(root, 'assets');
await mkdir(out, {recursive: true});
const paths = [
  'logos/ejmlabs-paper.svg', 'logos/symbol-paper.svg',
  'fonts/Manrope-Variable.ttf', 'fonts/IBMPlexMono-Medium.ttf',
  'fonts/Manrope-OFL.txt', 'fonts/IBMPlexMono-OFL.txt',
  ...['cli', 'ide', 'harness'].flatMap(p => [
    `projects/${p}/mark-paper.svg`, `projects/${p}/logo-paper.svg`,
    `projects/${p}/mark-ink.svg`, `projects/${p}/logo-ink.svg`,
  ]),
];
const manifest = [];
for (const path of paths) {
  const specifier = `@ejm/tokens/assets/${path}`;
  const source = fileURLToPath(import.meta.resolve(specifier));
  const target = join(out, path);
  await mkdir(join(target, '..'), {recursive: true});
  await copyFile(source, target);
  const data = await readFile(target);
  manifest.push({specifier, file: `assets/${path}`, sha256: createHash('sha256').update(data).digest('hex')});
}
const versions = Object.fromEntries(['ffmpeg', 'ffprobe', 'rsvg-convert'].map(tool => [
  tool, execFileSync(tool, [tool === 'rsvg-convert' ? '--version' : '-version'], {encoding:'utf8'}).split('\n')[0],
]));
await writeFile(join(out, 'manifest.json'), JSON.stringify({generatedAt:new Date().toISOString(), versions, assets:manifest}, null, 2) + '\n');
console.log(`Prepared ${manifest.length} public token assets. No website dependencies changed.`);
