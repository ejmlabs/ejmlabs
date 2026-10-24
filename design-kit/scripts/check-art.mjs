#!/usr/bin/env node
// Checks the symbol art system: (1) every color in art/ is a brand color or a brand color at reduced opacity,
// (2) text over the lightest and darkest point of every gradient surface, with grain at its strongest, keeps 4.5:1.
// The surface colors are read from web/parts/18-art.css and the brand tokens, so the CSS stays the one source of truth.
// Usage: node scripts/check-art.mjs        (exit 1 on any failure; also runs build-art.mjs --check)
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const kit = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = f => readFileSync(join(kit, f), 'utf8');
const problems = [], notes = [], grainMax = {};

// ---- 1. palette --------------------------------------------------------------------------------------------------------
const brandCss = read('tokens/brand.css');
const brand = {};
for (const m of brandCss.matchAll(/--ejm-(sage|forest|ink|paper|mist|white):\s*(#[0-9a-fA-F]{6})/g)) brand[m[1]] = m[2].toUpperCase();
const palette = new Set(['sage', 'forest', 'ink', 'paper', 'mist'].map(k => brand[k]));
const walk = d => readdirSync(join(kit, d)).flatMap(n => (statSync(join(kit, d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));
const svgs = walk('art').filter(f => f.endsWith('.svg'));
for (const f of svgs) {
  const t = read(f);
  for (const hex of t.match(/#[0-9a-fA-F]{3,8}\b/g) || []) if (!palette.has(hex.toUpperCase())) problems.push(`${f}: ${hex} is not a brand color`);
  if (/(?:rgb|hsl|oklch|color-mix)\(/.test(t)) problems.push(`${f}: uses a color function`);
  for (const m of t.matchAll(/(?:stroke|fill)-opacity="([^"]+)"/g)) if (!(+m[1] > 0 && +m[1] <= 1)) problems.push(`${f}: opacity ${m[1]} out of range`);
  for (const m of t.matchAll(/\s(stroke|fill)="([^"]+)"/g)) if (!/^(none|currentColor|#[0-9A-Fa-f]{6})$/.test(m[2])) problems.push(`${f}: ${m[1]}="${m[2]}" is not a brand color`);
  if (f.includes('/inline/') && /#[0-9a-fA-F]{6}/.test(t)) problems.push(`${f}: inline art must take its colors from CSS`);
  if (f.includes('grain')) { // the filter color is numeric: it must equal a brand color
    const v = (t.match(/values="0 0 0 0 ([\d.]+) 0 0 0 0 ([\d.]+) 0 0 0 0 ([\d.]+) 0 0 0 ([\d.]+) (-?[\d.]+)"/) || []).slice(1).map(Number);
    const hex = '#' + v.slice(0, 3).map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
    if (!palette.has(hex)) problems.push(`${f}: grain color ${hex} is not a brand color`);
    grainMax[hex] = +(v[3] + v[4]).toFixed(3);
    if (grainMax[hex] > 0.0801) problems.push(`${f}: grain alpha can reach ${grainMax[hex]}, above the 0.08 limit`);
  }
}
notes.push(`${svgs.length} art files use brand colors only`);
try { execFileSync('node', [join(kit, 'scripts', 'build-art.mjs'), '--check'], { stdio: 'pipe' }); notes.push('build-art --check: files are current'); }
catch (e) { problems.push(`build-art.mjs --check failed:\n${String(e.stderr || e.stdout).trim()}`); }

// ---- 2. contrast over surfaces -------------------------------------------------------------------------------------------
const ui = { dark: {}, light: {} };
const theme = read('ui/theme.css');
for (const [scheme, re] of [['dark', /:root, :root\[data-theme="dark"\][^{]*\{([^}]*)\}/], ['light', /:root\[data-theme="light"\][^{]*\{([^}]*)\}/]]) {
  for (const m of theme.match(re)[1].matchAll(/--ejm-ui-([a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g)) ui[scheme][m[1]] = m[2].toUpperCase();
}
const rgbHex = c => '#' + c.map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
const hexToRgb = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
const lin = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = ([r, g, b]) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const over = (top, a, base) => base.map((v, i) => v * (1 - a) + top[i] * a); // composite top at alpha a over an opaque base

const split = s => { const out = []; let d = 0, cur = ''; for (const ch of s) { if (ch === '(') d++; if (ch === ')') d--; if (ch === ',' && !d) { out.push(cur.trim()); cur = ''; } else cur += ch; } out.push(cur.trim()); return out; };
// A value is { rgb, a } for a color. Only the forms used in 18-art.css are understood.
const evalColor = (v, scheme, tokens) => {
  v = v.trim();
  let m;
  if ((m = v.match(/^var\(--ejm-([a-z0-9-]+)\)$/))) {
    const n = m[1];
    if (tokens[n] !== undefined) return evalColor(tokens[n], scheme, tokens);
    if (brand[n]) return { rgb: hexToRgb(brand[n]), a: 1 };
    if (n.startsWith('ui-') && ui[scheme][n.slice(3)]) return { rgb: hexToRgb(ui[scheme][n.slice(3)]), a: 1 };
    throw new Error(`unknown token ${n}`);
  }
  if ((m = v.match(/^light-dark\((.*)\)$/s))) { const [l, d] = split(m[1]); return evalColor(scheme === 'dark' ? d : l, scheme, tokens); }
  if ((m = v.match(/^color-mix\(in srgb, (.*)\)$/s))) {
    const [a, b] = split(m[1]).map(x => x.trim());
    const pa = a.match(/^(.*?)\s+(\d+(?:\.\d+)?)%$/); // "var(--x) 55%"
    if (b !== 'transparent' || !pa) throw new Error(`unsupported color-mix: ${v}`);
    const c = evalColor(pa[1], scheme, tokens); return { rgb: c.rgb, a: c.a * (+pa[2] / 100) };
  }
  if (/^#[0-9a-fA-F]{6}$/.test(v)) return { rgb: hexToRgb(v), a: 1 };
  throw new Error(`cannot evaluate ${v}`);
};
const css = read('web/parts/18-art.css').replace(/\/\*[\s\S]*?\*\//g, '');
// Token declarations for a selector, in file order (later wins), including those inside @supports blocks.
const declsFor = sel => {
  const out = {};
  for (const m of css.matchAll(/(^|[\s}{])([^{}@]+)\{([^{}]*)\}/g)) {
    if (m[2].trim() !== sel) continue;
    for (const d of m[3].matchAll(/--ejm-([a-z0-9-]+):\s*([^;]+);/g)) out[d[1]] = d[2].trim();
  }
  return out;
};
const base = declsFor('.ejm-surface-gradient');
const variants = [
  ['gradient (follows theme)', base, ['light', 'dark']],
  ['gradient --sage', { ...base, ...declsFor('.ejm-surface-gradient--sage') }, ['light']],
  ['gradient --forest', { ...base, ...declsFor('.ejm-surface-gradient--forest') }, ['dark']],
];
const rows = [];
for (const [name, tok, schemes] of variants) {
  for (const scheme of schemes) {
    const T = k => evalColor(tok[k], scheme, tok);
    const from = T('grad-from').rgb, to = T('grad-to').rgb, A = T('grad-bloom-a'), B = T('grad-bloom-b');
    // Candidate points: each base color alone, with either bloom at full strength, and with both stacked at full strength.
    const cands = [];
    for (const b0 of [from, to]) {
      const withA = over(A.rgb, A.a, b0), withB = over(B.rgb, B.a, b0);
      cands.push(b0, withA, withB, over(B.rgb, B.a, withA), over(A.rgb, A.a, withB));
    }
    cands.sort((p, q) => lum(p) - lum(q));
    const darkest = cands[0], lightest = cands[cands.length - 1];
    const grainRgb = name.includes('--sage') || (name.includes('theme') && scheme === 'light') ? hexToRgb(brand.ink) : hexToRgb(brand.paper);
    for (const [tname, tkey] of [['text', 'surface-text'], ['muted', 'surface-muted']]) {
      const txt = T(tkey).rgb;
      const pts = [['lightest', lightest], ['darkest', darkest], ['lightest+grain', over(grainRgb, grainMax[rgbHex(grainRgb)], lightest)], ['darkest+grain', over(grainRgb, grainMax[rgbHex(grainRgb)], darkest)]];
      for (const [pn, pc] of pts) {
        const r = ratio(txt, pc); rows.push(`${name.padEnd(26)} ${scheme.padEnd(5)} ${tname.padEnd(5)} on ${pn.padEnd(15)} ${r.toFixed(2)}:1`);
        if (r < 4.5) problems.push(`${name} (${scheme}): ${tname} on ${pn} is ${r.toFixed(2)}:1, below 4.5:1`);
      }
    }
  }
}
notes.push(`surface contrast (min ${Math.min(...rows.map(r => +r.match(/([\d.]+):1$/)[1])).toFixed(2)}:1 over ${rows.length} pairs)`);
if (process.argv.includes('--verbose')) console.log(rows.join('\n'));

if (problems.length) { console.error(problems.join('\n')); process.exit(1); }
console.log('art ok: ' + notes.join('; '));
