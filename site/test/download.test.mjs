import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readReleases, validateReleases, REPOSITORIES } from '../scripts/releases.mjs';
import { renderInstallScript } from '../scripts/install-sh.mjs';

// Reads the built site. The expectations follow public/releases.json, so they hold for an empty list and for a filled one.
const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(site, 'dist');
const read = file => readFileSync(join(dist, file), 'utf8');

/** A Section names itself by its heading: the `<section>` whose aria-labelledby is the heading id a page sets for an anchor. */
const sectionOf = (html, id) => html.match(new RegExp(`<section\\b[^>]*\\saria-labelledby="${id}"[\\s\\S]*?</section>`))?.[0] ?? '';
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(m => m[0]);
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];
const prose = html =>
  html.slice(html.indexOf('<main'), html.indexOf('</main>'))
    .replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ');

const artifacts = readReleases();
const page = () => read('download/index.html');

test('releases.json and install.sh are built from the committed list', () => {
  assert.deepEqual(validateReleases(JSON.parse(read('releases.json'))), artifacts);
  assert.equal(read('install.sh'), renderInstallScript(artifacts));
});

test('every listed file is a versioned release asset on the repository that owns the product', () => {
  for (const a of validateReleases(JSON.parse(read('releases.json')))) {
    assert.ok(a.url.startsWith(`https://github.com/ejmlabs/${REPOSITORIES[a.product]}/releases/download/v${a.version}/`), a.url);
    assert.doesNotMatch(a.url, /\/latest\//);
  }
});

test('the download page adds no inline script, form, style or origin', () => {
  const html = page();
  assert.equal(tags(html, 'form').length, 0, 'no form');
  assert.equal(tags(html, 'input').length + tags(html, 'textarea').length, 0, 'no field');
  assert.ok(!/<style\b/.test(html), 'no style element');
  for (const s of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    assert.match(s[1], /\ssrc="\//, 'scripts are same-origin files');
    assert.equal(s[2].trim(), '');
  }
  for (const tag of [...tags(html, 'script'), ...tags(html, 'img'), ...tags(html, 'link'), ...tags(html, 'iframe')]) {
    const src = attr(tag, 'src') ?? attr(tag, 'href') ?? '';
    assert.ok(!/^(?:https?:)?\/\//.test(src) || src.startsWith('https://ejmlabs.com/'), `${src} loads from this origin`);
  }
});

test('platforms without a file say so and offer no link', () => {
  const text = prose(page());
  const has = (product, target) => artifacts.some(a => a.product === product && a.target === target);
  assert.match(text, /Not yet available/);
  assert.doesNotMatch(text, /Available after the release is published/);
  if (!has('cli', 'darwin-aarch64') && !has('worker', 'darwin-aarch64')) assert.match(text, /Waiting for notarization/);
  const downloads = tags(page(), 'a').map(a => attr(a, 'href') ?? '').filter(h => h.includes('/releases/download/'));
  assert.deepEqual(downloads.toSorted(), artifacts.map(a => a.url).toSorted(), 'the page links exactly the listed files');
  if (!artifacts.some(a => a.product === 'ide')) {
    const start = page().indexOf('>ejm-ide</h3>');
    const ide = page().slice(start, page().indexOf('</dl>', start));
    assert.ok(start > 0 && !/<a\b/.test(ide), 'the IDE group has no link');
  }
});

test('install lines appear only for products with a file', () => {
  const text = prose(page());
  for (const [product, name] of [['cli', 'cli'], ['worker', 'worker']]) {
    const line = `install.sh | sh -s -- ${name}`;
    assert.equal(text.includes(line), artifacts.some(a => a.product === product), `${name} install line`);
  }
  if (!artifacts.length) assert.match(text, /install lines appear here when a release is published/);
  assert.match(text, /sh install\.sh --dry-run/);
});

test('the page states the unsigned note, what a checksum shows and who logs the download', () => {
  const text = prose(page());
  const unsigned = artifacts.filter(a => a.notarized !== true);
  assert.equal(/not signed with a developer certificate and are not notarized/.test(text), artifacts.length === 0 || unsigned.length > 0);
  assert.equal(/Open Anyway/.test(text), unsigned.some(a => a.target.startsWith('darwin-')), 'Open Anyway steps only for a listed macOS file that is not notarized');
  assert.match(text, /glibc 2\.39 or newer/);
  assert.match(text, /libdbus-1/);
  assert.match(text, /does not prove who built it/);
  assert.match(text, /a change to this site would not be/);
  assert.match(text, /GitHub, which keeps its own request logs/);
});

test('signing, notarization and trust words appear only in the statements that deny or defer them', () => {
  const text = [page(), read('privacy/index.html')].map(prose).join(' ');
  const allowed = [
    'not signed with a developer certificate and are not notarized',
    'Waiting for notarization',
    'Builds not marked notarized',
  ];
  let rest = text;
  for (const phrase of allowed) rest = rest.replaceAll(phrase, ' ');
  assert.doesNotMatch(rest, /\b(?:signed|notarized|notarised|notarization|secure|securely|safe|safely|verified|trusted|certified)\b/i);
  assert.doesNotMatch(text, /studio/i, 'the lab voice');
  assert.doesNotMatch(text, /\b(?:Claude|Anthropic|GPT|OpenAI|Gemini|Copilot|Everett|Morgan)\b/);
});

test('report links go to the product forms and carry only the template and the evidence field', () => {
  const html = page();
  const repos = ['ejm-cli', 'ejm-harness', 'ejm-ide', 'ejm-ui'];
  assertReportLinks(html, repos);
  assert.match(prose(html), /Do not post security details in public/);
});

test('each project section carries the report links', () => {
  const html = read('projects/index.html');
  for (const id of ['cli', 'ide', 'harness', 'ui']) {
    const band = sectionOf(html, id);
    assertReportLinks(band, [{ cli: 'ejm-cli', ide: 'ejm-ide', harness: 'ejm-harness', ui: 'ejm-ui' }[id]]);
  }
  const calm = sectionOf(html, 'calm');
  assert.doesNotMatch(calm, /issues\/new/);
});

function assertReportLinks(html, repos) {
  const links = tags(html, 'a').map(a => attr(a, 'href') ?? '').filter(h => /\/(?:issues\/new|security\/advisories\/new)/.test(h));
  assert.equal(links.length, repos.length * 3);
  for (const repo of repos) {
    const base = `https://github.com/ejmlabs/${repo}`;
    const own = links.filter(h => h.startsWith(`${base}/`));
    assert.equal(own.length, 3, `${repo}: bug, feedback and security links`);
    assert.ok(own.some(h => h.startsWith(`${base}/issues/new?template=bug.yml`)));
    assert.ok(own.includes(`${base}/issues/new?template=feature.yml`));
    assert.ok(own.includes(`${base}/security/advisories/new`));
  }
  for (const href of links) {
    const url = new URL(href.replaceAll('&amp;', '&'));
    assert.equal(url.protocol, 'https:');
    assert.equal(url.hostname, 'github.com');
    for (const key of url.searchParams.keys()) assert.ok(['template', 'evidence'].includes(key), `${href}: ${key}`);
    if (url.searchParams.has('evidence')) assert.match(url.searchParams.get('evidence'), /^Version: \d+\.\d+\.\d+\nPlatform: $/);
    assert.doesNotMatch(url.hash, /./);
  }
  const security = tags(html, 'a').map(a => attr(a, 'href') ?? '').filter(h => h.endsWith('/security/advisories/new'));
  assert.equal(security.length, repos.length);
}

test('a bug link carries the version only for a product with a file', () => {
  const links = tags(page(), 'a').map(a => (attr(a, 'href') ?? '').replaceAll('&amp;', '&')).filter(h => h.includes('template=bug.yml'));
  const expected = { 'ejm-cli': 'cli', 'ejm-harness': 'worker', 'ejm-ide': 'ide' };
  for (const href of links) {
    const repo = href.split('/')[4];
    const product = expected[repo];
    const version = artifacts.find(a => a.product === product)?.version;
    const evidence = new URL(href).searchParams.get('evidence');
    assert.equal(evidence, version ? `Version: ${version}\nPlatform: ` : null, repo);
  }
});

test('the header links the download page and the project pages change only for products with a file', () => {
  const header = read('index.html').match(/<header\b[\s\S]*?<\/header>/)?.[0] ?? '';
  assert.ok(tags(header, 'a').some(a => attr(a, 'href') === '/download/'), 'header link');
  const text = prose(read('projects/index.html'));
  const released = { cli: artifacts.some(a => a.product === 'cli'), harness: artifacts.some(a => a.product === 'worker'), ide: artifacts.some(a => a.product === 'ide') };
  assert.equal(text.includes('Build from source. Installers and package-manager releases are not available yet.'), !released.cli);
  assert.equal(text.includes('Version 0.1.0 is available from public source. Registry packages are not available yet.'), !released.harness);
  assert.equal(text.includes('Early development, version 0.1.0. Build from source. Signed installers are not available yet.'), !released.ide);
  assert.equal(text.includes('Install it from the download page'), Object.values(released).some(Boolean));
});

test('the privacy page and security operations say what the download and feedback paths touch', () => {
  const text = prose(read('privacy/index.html'));
  assert.match(text, /downloads/i);
  assert.match(text, /GitHub, which keeps its own request logs/);
  assert.match(text, /report links open the project's GitHub issues/i);
  assert.match(text, /install script sends nothing/i);
  const operations = readFileSync(join(site, 'SECURITY-OPERATIONS.md'), 'utf8');
  assert.match(operations, /download and report links/i);
});
