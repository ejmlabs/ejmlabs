import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveAsset, sharedAssets } from '../scripts/assets.mjs';

// Use Studio's check entry for retained-kit consistency and the kit's page checks.
const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const kit = join(site, '..', 'design-kit');
const dist = join(site, 'dist');
const run = (script, args = []) => execFileSync('node', [join(kit, 'scripts', script), ...args], { stdio: 'pipe', encoding: 'utf8' });

before(() => {
  execFileSync('node', [join(site, '..', 'scripts', 'check.mjs')], { stdio: 'pipe', encoding: 'utf8' });
  execFileSync('node', [join(site, 'scripts', 'build.mjs')], { stdio: 'pipe' });
});

test('built pages keep working local links, assets, and an interactive home demo', () => {
  run('check-site.mjs', [join(dist, 'index.html'), '--root', dist, '--kit', join(dist, 'design-kit'), '--require', 'demo']);
  run('check-site.mjs', [join(dist, 'design-kit', 'index.html'), '--root', dist, '--kit', join(dist, 'design-kit')]);
});

test('built output excludes retired resources and preserves live assets and font notices', () => {
  const output = readdirSync(dist, { recursive: true });
  assert.ok(!output.some(path => path.toLowerCase().endsWith('.zip')), 'no archive is emitted');
  for (const directory of [join('design-kit', 'social', 'x-kit'), join('design-kit', 'swag')]) {
    assert.ok(!output.includes(directory), `${directory} is retired`);
  }
  for (const page of ['index.html', join('design-kit', 'index.html')]) {
    const html = readFileSync(join(dist, page), 'utf8');
    for (const [, reference] of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
      assert.doesNotMatch(reference, /\.zip(?:[?#]|$)|(?:^|\/)x-kit(?:\/|$)|(?:^|\/)swag(?:\/|$)|^#swag$/i);
    }
  }
  const sources = {
    ...Object.fromEntries(['tokens', 'components', 'motifs', 'web', 'ui'].map(directory => [directory, join(kit, directory)])),
    ...sharedAssets,
  };
  for (const [directory, sourceDirectory] of Object.entries(sources)) {
    for (const file of readdirSync(sourceDirectory, { recursive: true })) {
      if (statSync(join(sourceDirectory, file)).isFile()) {
        const source = directory in sharedAssets ? resolveAsset(`${directory}/${file}`) : join(sourceDirectory, file);
        const output = join(dist, 'design-kit', directory, file);
        assert.deepEqual(readFileSync(output), readFileSync(source), `${directory}/${file} keeps source bytes`);
        assert.equal(statSync(output).mode & 0o777, statSync(source).mode & 0o777, `${directory}/${file} keeps its mode`);
      }
    }
  }
});

test('every ejmlabs site gets the same response headers from the kit', () => {
  const headers = readFileSync(join(kit, 'web', '_headers'), 'utf8');
  assert.match(headers, /Content-Security-Policy:[^\n]*static\.cloudflareinsights\.com/);
  assert.match(headers, /Content-Security-Policy:[^\n]*connect-src 'self' https:\/\/cloudflareinsights\.com/);
  assert.ok(!existsSync(join(site, 'src', '_headers')), 'headers come from the kit, not a per-site copy');
  assert.equal(readFileSync(join(dist, '_headers'), 'utf8'), headers);
});
