import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// The rules live in the kit. This site's tests run the kit's own checkers on its page and on the kit.
const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const kit = join(site, '..', 'design-kit');
const run = (script, args = []) => execFileSync('node', [join(kit, 'scripts', script), ...args], { stdio: 'pipe', encoding: 'utf8' });

test('the kit agrees with itself: generated files current, contrast holds, every class documented', () => {
  run('check-kit.mjs');
});

test('the home page uses the kit properly, with an interactive demo', () => {
  run('check-site.mjs', [join(site, 'src', 'index.html'), '--root', join(site, 'src'), '--require', 'demo']);
});

test('every ejmlabs site gets the same response headers from the kit', () => {
  const headers = readFileSync(join(kit, 'web', '_headers'), 'utf8');
  assert.match(headers, /Content-Security-Policy:[^\n]*static\.cloudflareinsights\.com/);
  assert.match(headers, /Content-Security-Policy:[^\n]*connect-src 'self' https:\/\/cloudflareinsights\.com/);
  assert.ok(!existsSync(join(site, 'src', '_headers')), 'headers come from the kit, not a per-site copy');
});
