#!/usr/bin/env node
// Checks that an ejmlabs page uses the kit properly. Run it on the HTML of every site before shipping.
// Usage: node design-kit/scripts/check-site.mjs <file.html | dir> ... [--root <dir>] [--kit <dir>] [--require demo]
//   <dir>      checks every .html file under it, skipping the design-kit folder itself
//   --root     where site-relative links such as /assets/x.png resolve (default: the folder of the HTML file)
//   --kit      the design-kit folder (default: the folder that holds this script's parent)
//   --require demo   also demands an interactive demo on the page (every product site needs one)
// Exit code is 1 when any page breaks a rule. The rules are written down in SITES.md.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { dirname, join, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = name => { const i = args.indexOf(name); return i < 0 ? null : args.splice(i, 2)[1]; };
const kit = resolve(flag('--kit') ?? join(here, '..'));
const rootArg = flag('--root');
const requires = new Set((flag('--require') ?? '').split(',').filter(Boolean));
const targets = args;
if (!targets.length) { console.error('usage: check-site.mjs <file.html | dir> ... [--root dir] [--kit dir] [--require demo]'); process.exit(2); }

const css = ['components/brand-components.css', 'web/site.css', 'ui/app.css'].map(f => readFileSync(join(kit, f), 'utf8')).join('\n');
const defined = new Set([...css.replace(/\/\*[\s\S]*?\*\//g, '').matchAll(/\.(ejm-[a-z0-9]+(?:-[a-z0-9]+)*)/g)].map(m => m[1]));

const STYLES = ['/design-kit/tokens/brand.css', '/design-kit/components/brand-components.css', '/design-kit/web/site.css'];
const SCRIPTS = new Set(['theme.js', 'motion.js', 'analytics.js', 'demo.js', 'gallery.js', 'docs.js']);
const REQUIRED_SCRIPTS = ['theme.js', 'motion.js', 'analytics.js'];

function files(target) {
  const full = resolve(target);
  if (statSync(full).isFile()) return [full];
  return readdirSync(full, { withFileTypes: true }).flatMap(e => {
    const p = join(full, e.name);
    if (e.isDirectory()) return e.name === 'design-kit' || e.name === 'node_modules' ? [] : files(p);
    return e.name.endsWith('.html') ? [p] : [];
  });
}

function check(file) {
  const html = readFileSync(file, 'utf8');
  const root = rootArg ? resolve(rootArg) : dirname(file);
  const bad = [];
  const need = (ok, message) => { if (!ok) bad.push(message); };
  const head = (html.match(/<head[\s\S]*?<\/head>/i) ?? [''])[0];

  // Document basics.
  need(/<html[^>]*\slang="[a-z-]+"/i.test(html), 'html needs a lang attribute');
  need(/<title>[^<]+<\/title>/.test(head), 'missing <title>');
  need(/<meta name="description" content="[^"]+"/.test(head), 'missing meta description');
  need(/<meta name="viewport" content="[^"]*viewport-fit=cover/.test(head), 'viewport meta needs viewport-fit=cover (safe areas on phones)');
  need(/<link rel="canonical" href="https:\/\/[^"]+"/.test(head), 'missing canonical link');
  need(/<meta property="og:image" content="https:\/\/[^"]+"/.test(head) && /<meta property="og:title"/.test(head), 'missing Open Graph title and image');
  need(/<link rel="icon"[^>]+favicon\.svg/.test(head) && /<link rel="manifest"/.test(head), 'missing kit favicon or manifest links');
  need(/<meta name="theme-color"/.test(head), 'missing theme-color meta');

  // Styles and scripts: only the kit's, nothing of the page's own.
  const sheets = [...html.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map(m => m[1]);
  need(JSON.stringify(sheets) === JSON.stringify(STYLES), `stylesheets must be exactly ${STYLES.join(', ')} in that order; found ${sheets.join(', ') || 'none'}`);
  need(!/<style[\s>]/i.test(html), 'no <style> blocks: pages carry no CSS of their own');
  need(!/\sstyle="/.test(html), 'no inline style attributes');
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
  const loaded = new Set();
  for (const [, attrs, body] of scripts) {
    const src = (attrs.match(/\ssrc="([^"]+)"/) ?? [])[1];
    if (!src) { need(false, 'no inline scripts: use the kit scripts'); continue; }
    const name = src.split('/').pop();
    // Product behavior that is not styling (for example listing installers from a release API) is allowed when the
    // site's own script declares itself with data-ejm-app. Kit scripts are the only others.
    if (/\sdata-ejm-app(\s|=|>|$)/.test(attrs) && !src.startsWith('/design-kit/')) continue;
    need(src.startsWith('/design-kit/web/') && SCRIPTS.has(name), `script ${src} is not a kit script (allowed: ${[...SCRIPTS].join(', ')}; a site's own product script must carry data-ejm-app)`);
    loaded.add(name);
  }
  for (const name of REQUIRED_SCRIPTS) need(loaded.has(name), `missing <script src="/design-kit/web/${name}">`);
  const themeInHead = /<script src="\/design-kit\/web\/theme\.js"[^>]*>/.test(head);
  need(themeInHead, 'theme.js must load in <head> so the theme applies before first paint');
  need(/<script src="\/design-kit\/web\/motion\.js"><\/script>/.test(head), 'motion.js must be a plain synchronous <script> in <head> (no defer or async), so content never flashes');
  need(/<script src="\/design-kit\/web\/analytics\.js" defer><\/script>/.test(head), 'analytics.js must be <script src="/design-kit/web/analytics.js" defer> in <head>');
  const hasDemo = /\sdata-ejm-demo="(cli|ide|harness)"/.test(html);
  if (hasDemo) need(loaded.has('demo.js'), 'a page with a demo must load demo.js');
  // Honest visuals: a static product window must say it is simulated, in visible text.
  if (/\sclass="[^"]*\bejm-product\b/.test(html)) need(/class="[^"]*\bejm-product__label\b[^"]*"[^>]*>[^<]*simulated/i.test(html), 'a page with an ejm-product window needs a visible label (ejm-product__label) that says it is simulated');
  if (requires.has('demo')) need(hasDemo, 'this page needs an interactive demo (data-ejm-demo)');

  // Classes: every ejm- class exists in the kit.
  const used = new Set([...html.matchAll(/\sclass="([^"]*)"/g)].flatMap(m => m[1].split(/\s+/)).filter(c => c.startsWith('ejm-')).map(c => c.match(/ejm-[a-z0-9]+(?:-[a-z0-9]+)*/)[0]));
  const unknown = [...used].filter(c => !defined.has(c));
  need(!unknown.length, `classes that do not exist in the kit: ${unknown.join(', ')}`);

  // Structure and accessibility.
  need(/class="ejm-skip" href="#main"/.test(html) && /<main id="main"/.test(html), 'needs the skip link (ejm-skip to #main) and <main id="main">');
  need(/<body[^>]*class="[^"]*\bejm-site\b/.test(html), '<body> needs class ejm-site');
  need([...html.matchAll(/<h1[\s>]/g)].length === 1, 'needs exactly one h1');
  let last = 0;
  for (const m of html.matchAll(/<h([1-6])[\s>]/g)) { const level = Number(m[1]); if (level > last + 1) bad.push(`heading level jumps to h${level}`); last = level; }
  for (const img of html.matchAll(/<img\b[^>]*>/g)) need(/\salt="/.test(img[0]), `img without alt: ${img[0].slice(0, 80)}`);
  need(!html.includes('\u2014'), 'no em dashes in the page');

  // The theme toggle: same markup, same place, on every page.
  const header = (html.match(/<header\b[\s\S]*?<\/header>/) ?? [''])[0];
  need(/class="[^"]*\bejm-header\b/.test(header), 'needs an ejm-header');
  const tools = (header.match(/<div class="ejm-header__tools"[\s\S]*<\/div>/) ?? [''])[0];
  need(!!tools, 'the header needs ejm-header__tools around the nav and the theme toggle');
  need(/<button class="ejm-theme-toggle" type="button" data-theme-toggle aria-pressed="false">/.test(tools), 'the theme toggle must be the kit markup (see web/THEME.md)');
  need(tools.lastIndexOf('data-theme-toggle') > tools.lastIndexOf('</nav>') && (tools.lastIndexOf('</nav>') > -1 || tools.lastIndexOf('</details>') > -1), 'the theme toggle must come after the navigation, at the far right of the header');
  need(/<details class="ejm-menu"/.test(header), 'the header should use the ejm-menu pattern so the navigation collapses on phones');

  // Footer and external links.
  need(/<footer\b/.test(html), 'needs a footer');
  const host = ((html.match(/<link rel="canonical" href="https:\/\/([^\/"]+)/) ?? [])[1]) ?? '';
  for (const m of html.matchAll(/<a\b([^>]*)>/g)) {
    const href = (m[1].match(/\shref="([^"]+)"/) ?? [])[1] ?? '';
    const other = /^https?:\/\//.test(href) && new URL(href).hostname !== host;
    if (other) need(/\srel="[^"]*\bexternal\b/.test(m[1]), `external link needs rel="external": ${href}`);
  }

  // Local references resolve: /design-kit/ maps to the kit, other root-relative paths to the site root.
  for (const m of html.matchAll(/\s(?:href|src)="([^"#?]+)/g)) {
    const ref = m[1];
    if (/^(https?:|mailto:|tel:|data:)/.test(ref) || ref === '/' ) continue;
    const path = ref.startsWith('/design-kit/') ? join(kit, ref.slice('/design-kit/'.length)) : ref.startsWith('/') ? join(root, ref.slice(1)) : join(dirname(file), ref);
    if (!existsSync(path) && !ref.endsWith('/') && !/\.zip$/.test(ref)) bad.push(`missing file for ${ref}`);
    else if (ref.endsWith('/') && !existsSync(join(path, 'index.html')) && !existsSync(path)) bad.push(`missing page for ${ref}`);
  }
  // Anchors resolve on the page.
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
  for (const m of html.matchAll(/\shref="#([^"]+)"/g)) need(ids.has(m[1]), `missing anchor #${m[1]}`);
  return bad;
}

let failed = 0;
for (const target of targets) {
  for (const file of files(target)) {
    const bad = check(file);
    const name = relative(process.cwd(), file);
    if (bad.length) { failed++; console.error(`FAIL ${name}\n${bad.map(b => `  - ${b}`).join('\n')}`); }
    else console.log(`ok   ${name}`);
  }
}
process.exit(failed ? 1 : 0);
