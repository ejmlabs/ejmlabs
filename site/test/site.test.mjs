import test, { before } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Reads the built site, never runs its scripts. `npm run build` first; the test builds when dist/ is missing.
const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(site, 'dist');
const read = file => readFileSync(join(dist, file), 'utf8');

const ROUTES = ['/', '/projects/', '/try/', '/about/', '/brand/', '/privacy/'];
const file = route => (route === '/404' ? '404.html' : join(route, 'index.html'));
const PAGES = [...ROUTES, '/404'];

before(() => {
  if (!existsSync(join(dist, 'index.html'))) execFileSync('node', [join(site, 'scripts', 'build.mjs')], { cwd: site, stdio: 'inherit' });
});

const body = html => html.slice(html.indexOf('<body'));
/** Visible prose: no scripts, styles, tags or inline SVG, entities decoded for the few the server writes. */
const prose = html =>
  body(html)
    .replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&copy;/g, '©')
    .replace(/\s+/g, ' ');
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(m => m[0]);
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1];

for (const route of PAGES) {
  test(`${route}: structure, head and links`, () => {
    const html = read(file(route));

    // One h1, and a skip link before anything else in the body.
    assert.equal(tags(html, 'h1').length, 1, 'exactly one h1');
    const first = tags(body(html), 'a')[0] ?? '';
    assert.equal(attr(first, 'href'), '#main', 'the skip link comes first');
    assert.match(first, /skip-link/);
    assert.match(html, /<main id="main"/);

    // Head: a title, a description, and for real routes a canonical URL.
    assert.match(html, /<title>[^<]+<\/title>/);
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    assert.ok(description && description.length > 20, 'a description');
    if (route === '/404') assert.match(html, /name="robots" content="noindex/);
    else assert.match(html, new RegExp(`<link rel="canonical" href="https://ejmlabs\\.com${route}"`));
    assert.equal((html.match(/<title>/g) ?? []).length, 1);

    // The theme toggle is the last interactive thing in the header, and the page loads no inline script.
    const header = html.match(/<header\b[\s\S]*?<\/header>/)?.[0] ?? '';
    const brand = header.match(/<a\b[^>]*aria-label="ejmlabs home"[\s\S]*?<\/a>/)?.[0] ?? '';
    assert.ok(brand.includes('ejmlabs'), 'the home link contains the name');
    assert.equal(tags(brand, 'img').length, 2, 'the mark has a variant for each page theme');
    for (const mark of tags(brand, 'img')) {
      assert.equal(attr(mark, 'alt'), '', 'the mark does not repeat the link name');
      assert.equal(attr(mark, 'aria-hidden'), 'true');
      assert.ok(Number(attr(mark, 'width')) > 0 && Number(attr(mark, 'height')) > 0);
      assert.ok(existsSync(join(dist, attr(mark, 'src'))), 'the mark is built');
    }
    const last = tags(header, '(?:a|button)').at(-1) ?? '';
    assert.match(last, /^<button/, 'the last control in the header is a button');
    assert.match(attr(last, 'aria-label') ?? '', /theme/i, 'and it is the theme toggle');
    for (const s of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
      assert.match(s[1], /\ssrc="/, 'no inline script');
      assert.equal(s[2].trim(), '');
    }
    assert.ok(!/<style\b/.test(html), 'no style element');

    // Links to another site are marked external. Same-site links are plain paths.
    for (const a of tags(body(html), 'a')) {
      const href = attr(a, 'href') ?? '';
      if (/^https?:/.test(href)) assert.match(attr(a, 'rel') ?? '', /\bexternal\b/, `${href} is marked external`);
    }
    assert.ok(!/cloudflareinsights/.test(html), 'the analytics beacon is never in the prerendered HTML');
    assert.ok(!html.includes('\u2014'), 'no em dash');
  });

  test(`${route}: voice`, () => {
    const text = prose(read(file(route)));
    assert.ok(!/one[- ]person lab/i.test(text), 'no personal team-size framing');
    assert.ok(!/\b(clients?|customers?|available for|paid work|hire)\b/i.test(text), 'no claims about clients, customers or work');
  });
}

test('every same-site link in every page resolves to a file in dist', () => {
  for (const route of PAGES) {
    for (const a of tags(read(file(route)), 'a')) {
      const href = attr(a, 'href') ?? '';
      if (!href.startsWith('/') || href.startsWith('//')) continue;
      const path = href.split('#')[0].split('?')[0];
      const target = path.endsWith('/') ? join(path, 'index.html') : path;
      assert.ok(existsSync(join(dist, target)), `${route} links to ${href}`);
    }
  }
});

test('the home page links the three project sites as external without scripts', () => {
  const html = read('index.html');
  for (const host of ['cli', 'ide', 'harness']) {
    const a = tags(html, 'a').find(t => attr(t, 'href') === `https://${host}.ejmlabs.com/`);
    assert.ok(a, `a link to ${host}.ejmlabs.com`);
    assert.match(attr(a, 'rel'), /external/);
  }
});

test('the home page has no product previews, carousel controls or image preloads', () => {
  const html = read('index.html');
  assert.doesNotMatch(html, /\sdata-(?:window|shot|hero-(?:shots|slide|controls|select|pause))=/, 'no shared product preview or slideshow markup');
  assert.doesNotMatch(html, /aria-roledescription="carousel"/, 'no carousel');
  const preloads = tags(html, 'link').filter(tag => attr(tag, 'rel') === 'preload' && attr(tag, 'as') === 'image');
  assert.equal(preloads.length, 0, 'no image preload');
});

test('the try page serves three useful passive workflows without scripts', () => {
  const html = read('try/index.html');
  for (const name of ['ejm-cli', 'ejm-ide', 'ejm-harness']) {
    assert.ok(tags(html, 'div').some(tag => attr(tag, 'data-showcase') === name && attr(tag, 'role') === 'group' && attr(tag, 'aria-label') === `${name} playback`), `${name} playback`);
    for (const action of ['Pause', 'Restart']) {
      assert.equal(tags(html, 'button').filter(tag => attr(tag, 'aria-label') === `${action} ${name} playback`).length, 1, `${name}: one ${action} control`);
    }
  }
  assert.equal(tags(html, 'div').filter(tag => /\sdata-showcase-viewport(?:[\s=>])/.test(tag)).length, 3, 'every product uses the shared frame');
  const text = prose(html);
  assert.match(text, /cargo test --quiet[\s\S]*3 passed; 0 failed/, 'the CLI example includes its recorded successful test run');
  assert.match(text, /window_is_closed_at_deadline/, 'the IDE example contains the completed boundary test edit');
  assert.match(text, /reopened saved session:[\s\S]*tool_queued/, 'the harness example includes retained session events');
  const sessions = html.slice(html.indexOf('data-showcase='), html.indexOf('</main>'));
  for (const field of tags(sessions, '(?:input|textarea)')) assert.match(field, /\sdisabled(?:[\s=>])/, 'native fields do not accept input');
  for (const summary of tags(sessions, 'summary')) assert.equal(attr(summary, 'tabindex'), '-1', 'native disclosures are outside the tab order');
});

test('brand downloads contain public assets and notices without internal material', () => {
  const html = read('brand/index.html');
  const root = join(site, '..');
  const entries = new Map();
  for (const zip of ['/ejmlabs-design-kit.zip', '/ejmlabs-swag-kit.zip']) {
    const archive = join(dist, zip);
    assert.ok(tags(html, 'a').some(a => attr(a, 'href') === zip), `${zip} is linked`);
    assert.ok(statSync(archive).size > 100_000, `${zip} is not empty`);
    assert.equal(readFileSync(archive).subarray(0, 2).toString(), 'PK', `${zip} is a ZIP`);
    const files = execFileSync('unzip', ['-Z1', archive], { encoding: 'utf8' }).trim().split('\n').filter(file => !file.endsWith('/'));
    assert.equal(files.length, new Set(files).size, `${zip} has no duplicate entries`);
    for (const file of files) {
      assert.doesNotMatch(file, /(?:^|\/)(?:\.\.|PROMPTS\.md|PRODUCTION\.md|REVIEW\.md|ADOPTION\.md|scripts|tools|tokens|source|x-kit)(?:\/|$)|\.(?:html|css|[cm]?js|zip)$/i, file);
      assert.doesNotMatch(file, /(?:before-after|candidates|symbol-compare|audit)/i, file);
    }
    const folder = zip.includes('design') ? 'design-kit' : 'swag';
    for (const notice of ['README.md', 'RIGHTS.md', 'LICENSE']) assert.ok(files.includes(`${folder}/${notice}`), `${zip}: ${notice}`);
    assert.deepEqual(execFileSync('unzip', ['-p', archive, `${folder}/LICENSE`]), readFileSync(join(root, 'LICENSE')), 'existing rights notice is preserved');
    entries.set(folder, { archive, files });
  }
  const brand = entries.get('design-kit');
  for (const name of ['favicon.svg', 'favicon.ico', 'favicon-16.png', 'favicon-32.png', 'favicon-48.png', 'apple-touch-icon.png', 'android-chrome-192.png', 'android-chrome-512.png', 'site.webmanifest']) {
    const canonical = readFileSync(fileURLToPath(import.meta.resolve(`@ejm/tokens/assets/favicon/${name}`)));
    assert.deepEqual(readFileSync(join(dist, 'design-kit/favicon', name)), canonical, `${name}: retained URL uses the current icon`);
    assert.deepEqual(execFileSync('unzip', ['-p', brand.archive, `design-kit/favicon/${name}`]), canonical, `${name}: download uses the current icon`);
    if (name !== 'site.webmanifest') assert.deepEqual(readFileSync(join(dist, name)), canonical, `${name}: site and download agree`);
  }
  for (const file of brand.files) assert.match(file, /^design-kit\/(?:README\.md|RIGHTS\.md|LICENSE|palette\.json|(?:logos|lockups|motifs|favicon|social|templates)(?:\/editable)?\/[^/]+\.(?:svg|png|ico|webmanifest)|fonts\/(?:Manrope|IBMPlexMono)[^/]+\.(?:ttf|woff2|txt)|projects\/(?:cli|ide|harness)(?:\/editable)?\/[^/]+\.(?:svg|png|ico|webmanifest))$/, file);
  for (const font of ['Manrope-OFL.txt', 'IBMPlexMono-OFL.txt']) assert.deepEqual(execFileSync('unzip', ['-p', brand.archive, `design-kit/fonts/${font}`]), readFileSync(fileURLToPath(import.meta.resolve(`@ejm/tokens/assets/fonts/${font}`))), `${font} is preserved`);
  const palette = JSON.parse(execFileSync('unzip', ['-p', brand.archive, 'design-kit/palette.json'], { encoding: 'utf8' }));
  assert.deepEqual(palette.colors, JSON.parse(readFileSync(fileURLToPath(import.meta.resolve('@ejm/tokens/assets/brand/palette.json')), 'utf8')).colors);
  const swag = entries.get('swag');
  const manifest = JSON.parse(readFileSync(join(root, 'design-kit/swag/artwork/manifest.json'), 'utf8'));
  assert.equal(manifest.files.length, 8);
  const expected = ['README.md', 'RIGHTS.md', 'LICENSE', 'artwork/README.md', 'artwork/manifest.json', ...manifest.files.map(({ file }) => `artwork/${file}`), ...['apparel-collection', 'accessories-collection', 'glassware'].map(name => `mockups/${name}.webp`)];
  assert.deepEqual(swag.files.toSorted(), expected.map(file => `swag/${file}`).toSorted());
  for (const file of ['manifest.json', ...manifest.files.map(({ file }) => file)]) assert.deepEqual(execFileSync('unzip', ['-p', swag.archive, `swag/artwork/${file}`]), readFileSync(join(root, 'design-kit/swag/artwork', file)), `${file} is unchanged`);
  for (const file of ['design-kit/projects/harness/social-card.png', 'design-kit/favicon/favicon.ico', 'design-kit/logos/ejmlabs-primary.svg']) assert.ok(existsSync(join(dist, file)), `${file} stays online`);
  for (const file of ['design-kit/index.html', 'design-kit/projects/REVIEW.md', 'design-kit/projects/README.md', 'design-kit/projects/candidates.png', 'design-kit/projects/before-after.svg', 'design-kit/social/ejmlabs-x-kit.zip', 'design-kit/social/x-kit/UPLOAD-avatar.png']) assert.ok(!existsSync(join(dist, file)), `${file} is not published`);
});

test('the privacy page keeps the facts about analytics and cookies', () => {
  const text = prose(read('privacy/index.html'));
  for (const fact of [/Cloudflare Web Analytics/, /ejm-theme/, /Do Not Track/, /Global Privacy Control/, /no cookies|None from analytics/i]) assert.match(text, fact);
});

test('_headers is the shared policy and allows only the analytics host', () => {
  execFileSync(join(site, 'node_modules', '.bin', 'ejm-site-headers'), [join(dist, '_headers'), '--check'], { stdio: 'pipe' });
  const headers = read('_headers');
  assert.match(headers, /Content-Security-Policy:[^\n]*script-src 'self' https:\/\/static\.cloudflareinsights\.com;/);
  assert.match(headers, /connect-src 'self' https:\/\/cloudflareinsights\.com/);
  assert.ok(!/unsafe-inline'?[^\n]*script-src|script-src[^;]*unsafe-inline/.test(headers), 'no inline script');
  assert.ok(!existsSync(join(site, 'public', '_headers')), 'headers come from @ejm/site, not a copy');
});

test('the theme script is an external file and the favicon set and manifest are built', () => {
  for (const f of ['theme-boot.js', 'favicon.svg', 'favicon.ico', 'apple-touch-icon.png', 'site.webmanifest', 'social-card.png', '404.html', 'robots.txt', 'sitemap.xml']) {
    assert.ok(existsSync(join(dist, f)), f);
  }
  const boot = read('theme-boot.js');
  assert.ok(boot.length < 1024);
  assert.match(boot, /ejm-theme/);
});

test('the sitemap lists every route and the Worker config serves dist with a 404 page', () => {
  const sitemap = read('sitemap.xml');
  for (const r of ROUTES) assert.ok(sitemap.includes(`<loc>https://ejmlabs.com${r}</loc>`), r);
  const wrangler = JSON.parse(readFileSync(join(site, 'wrangler.jsonc'), 'utf8'));
  for (const assets of [wrangler.assets, wrangler.env.preview.assets]) {
    assert.equal(assets.directory, './dist');
    assert.equal(assets.not_found_handling, '404-page');
  }
});
