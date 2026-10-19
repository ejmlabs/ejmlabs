import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// The rules live in the kit. This site's tests run the kit's own checkers on its page and on the kit.
const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const kit = join(site, '..', 'design-kit');
const dist = join(site, 'dist');
const run = (script, args = []) => execFileSync('node', [join(kit, 'scripts', script), ...args], { stdio: 'pipe', encoding: 'utf8' });

before(() => {
  run('check-kit.mjs');
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
  for (const directory of ['tokens', 'components', 'fonts', 'icons', 'motifs', 'web', 'ui']) {
    for (const file of readdirSync(join(kit, directory), { recursive: true })) {
      const source = join(kit, directory, file);
      if (statSync(source).isFile()) {
        assert.deepEqual(readFileSync(join(dist, 'design-kit', directory, file)), readFileSync(source), `${directory}/${file} keeps source bytes`);
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
