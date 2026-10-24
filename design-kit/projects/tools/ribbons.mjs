// Ribbon engine and the three project marks. build-projects.mjs imports this; the tools use it too.
//
// A spine is a turtle path: ['L', length] or ['A', radius, degrees] (positive turns left, counterclockwise on screen).
// Offsets of lines and arcs are exact lines and arcs, so nested ribbons stay parallel with constant width and equal gaps,
// and outlining needs no polygon library: every ribbon becomes a filled path of lines, arcs and cubic curves.
// Chains of arcs with different radii join tangentially, which gives the spiral-like flow of the studio symbol.
// A taper narrows the ribbon along its (curved) spine to a fine tip; it is sampled and written as cubic curves.

// Measured from the studio symbol by tools/measure-symbol.mjs (symbol units, the symbol is 417.5 wide).
export const SYMBOL = { ribbon: 48.8, gap: 30.8, taperLength: 2.3 };
export const RATIO = SYMBOL.ribbon / SYMBOL.gap;       // 1.58 ribbon widths per gap
export const W = 36, G = W / RATIO, P = W + G;         // ribbon width, gap and pitch in the 256 design box
export const rad = d => d * Math.PI / 180;
const fix = n => String(Math.round(n * 100) / 100);
const heading = h => [Math.cos(h), Math.sin(h)];
const leftOf = h => [Math.sin(h), -Math.cos(h)];
const step = (a, b, k) => [a[0] + k * b[0], a[1] + k * b[1]];
const xy = p => `${fix(p[0])} ${fix(p[1])}`;
const opLength = op => op[0] === 'L' ? op[1] : op[1] * Math.abs(rad(op[2]));
const cutOp = (op, s) => op[0] === 'L' ? ['L', s] : ['A', op[1], Math.sign(op[2]) * s / op[1] * 180 / Math.PI];
export const sum = ops => ops.reduce((n, op) => n + opLength(op), 0);
// SVG arcs cannot span a full circle, so long arcs are split.
const split = ops => ops.flatMap(op => op[0] === 'A' && Math.abs(op[2]) > 170 ? Array(Math.ceil(Math.abs(op[2]) / 170)).fill(['A', op[1], op[2] / Math.ceil(Math.abs(op[2]) / 170)]) : [op]);
function trimOps(ops, from, to) {
  const kept = [], skipped = []; let at = 0;
  for (const op of ops) {
    const length = opLength(op), lo = Math.max(from, at), hi = Math.min(to, at + length);
    if (at < from) skipped.push(lo > at ? cutOp(op, lo - at) : op);
    if (hi > lo + 1e-9) kept.push(cutOp(op, hi - lo));
    at += length;
  }
  return { kept, skipped };
}
function walk(start, ops, offset, points) {
  let [x, y, h] = start, a = step([x, y], leftOf(h), offset); const segments = [];
  for (const op of ops) {
    if (op[0] === 'L') {
      x += op[1] * Math.cos(h); y += op[1] * Math.sin(h);
      const b = step([x, y], leftOf(h), offset); segments.push({ line: true, a, b }); points.push(a, b); a = b; continue;
    }
    const turn = Math.sign(op[2]), sweep = rad(Math.abs(op[2])), center = step([x, y], leftOf(h), turn * op[1]), radius = op[1] - turn * offset;
    if (radius <= 0.5) throw new Error('offset collapses an arc');
    const angle0 = Math.atan2(a[1] - center[1], a[0] - center[0]);
    for (let i = 0; i <= 24; i++) { const t = angle0 - turn * sweep * i / 24; points.push([center[0] + radius * Math.cos(t), center[1] + radius * Math.sin(t)]); }
    h -= turn * sweep; [x, y] = step(center, leftOf(h), -turn * op[1]);
    const b = step([x, y], leftOf(h), offset); segments.push({ radius, sweep: turn > 0 ? 0 : 1, large: sweep > Math.PI ? 1 : 0, a, b }); a = b;
  }
  return { segments, end: [x, y, h] };
}
const reverseSegment = s => s.line ? { line: true, a: s.b, b: s.a } : { ...s, a: s.b, b: s.a, sweep: 1 - s.sweep };
const command = s => s.line ? `L${xy(s.b)}` : `A${fix(s.radius)} ${fix(s.radius)} 0 ${s.large} ${s.sweep} ${xy(s.b)}`;
// Catmull-Rom through points, written as cubic curves (the first point is assumed current).
function smooth(pts) {
  let d = '';
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    d += `C${xy(step(p1, [p2[0] - p0[0], p2[1] - p0[1]], 1 / 6))} ${xy(step(p2, [p3[0] - p1[0], p3[1] - p1[1]], -1 / 6))} ${xy(p2)}`;
  }
  return d;
}
// Spine end pose and the spine run backwards (ribbon sides swap, so offsets change sign too).
export const endPose = ([x, y, h, ops]) => walk([x, y, h], split(ops), 0, []).end;
export const reverse = spine => { const [x, y, h] = endPose(spine); return [x, y, h + Math.PI, [...spine[3]].reverse().map(op => op[0] === 'L' ? op : ['A', op[1], -op[2]])]; };
export const turnAround = ([x, y, h, ops], cx, cy) => [2 * cx - x, 2 * cy - y, h + Math.PI, ops];   // rotate 180 degrees about (cx, cy)
export function at([x, y, h, ops], s, offset = 0) {
  const [px, py, ph] = walk([x, y, h], trimOps(split(ops), 0, s).kept, 0, []).end, [qx, qy] = step([px, py], leftOf(ph), offset);
  return [qx, qy, ph];
}
// A circular arc as a spine: centre, radius, position angle in degrees (0 is right, 90 is down), signed sweep (positive turns left).
export function arc(cx, cy, r, angle, sweep, ops = null) {
  const a = rad(angle), pos = [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  const h = sweep > 0 ? Math.atan2(-Math.cos(a), Math.sin(a)) : Math.atan2(Math.cos(a), -Math.sin(a));
  return [pos[0], pos[1], h, ops || [['A', r, sweep]]];
}

// One filled ribbon outline. taper: length of a fine tip at the spine's end (reverse the spine for a tip at the start).
export function ribbon({ spine: [x0, y0, h0, rawOps], from = 0, to = Infinity, offset = 0, caps = ['round', 'round'], taper = 0, width = W }, dx = 0, dy = 0) {
  const ops = split(rawOps), total = sum(ops), end = Math.min(to, total), points = [];
  const { kept, skipped } = trimOps(ops, from, end - taper);
  const start = walk([x0 + dx, y0 + dy, h0], skipped, 0, []).end;
  const left = walk(start, kept, offset + width / 2, points), right = walk(start, kept, offset - width / 2, points);
  const e = left.end, endCentre = step([e[0], e[1]], leftOf(e[2]), offset), startCentre = step([start[0], start[1]], leftOf(start[2]), offset);
  const first = left.segments[0].a, last = left.segments.at(-1).b, rightLast = right.segments.at(-1).b, rightFirst = right.segments[0].a;
  const round = (from, to, centre, h) => {
    for (let i = 0; i <= 12; i++) { const t = h - Math.PI / 2 + Math.PI * i / 12; points.push([centre[0] + width / 2 * Math.cos(t), centre[1] + width / 2 * Math.sin(t)]); }
    return `A${fix(width / 2)} ${fix(width / 2)} 0 0 1 ${xy(to)}`;
  };
  let d = `M${xy(first)}` + left.segments.map(command).join('');
  if (taper) {
    const tail = trimOps(ops, end - taper, end).kept, N = 28, L = [last], R = [rightLast];
    for (let i = 1; i <= N; i++) {
      const t = i / N, [px, py, ph] = walk(e, trimOps(tail, 0, t * taper).kept, 0, []).end, w = width * Math.pow(Math.cos(t * Math.PI / 2), 1.4);
      L.push(step([px, py], leftOf(ph), offset + w / 2)); R.push(step([px, py], leftOf(ph), offset - w / 2));
    }
    points.push(...L, ...R);
    d += smooth(L) + smooth(R.reverse());
  } else d += round(last, rightLast, endCentre, e[2]);
  d += right.segments.map(reverseSegment).reverse().map(command).join('') + round(rightFirst, first, startCentre, start[2] + Math.PI) + 'Z';
  return { d, points };
}
// Centre the artwork in the 256 box by its true outline, then return filled path data and the extent.
export function outlines(specs) {
  const pts = specs.flatMap(spec => ribbon(spec).points), xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const dx = 128 - (Math.min(...xs) + Math.max(...xs)) / 2, dy = 128 - (Math.min(...ys) + Math.max(...ys)) / 2;
  return { paths: specs.map(spec => ribbon(spec, dx, dy).d), extent: [Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)] };
}
