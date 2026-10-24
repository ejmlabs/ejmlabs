// Constructions for each project mark: the candidates tried in the second pass and the one chosen for each project.
// REVIEW.md records why the others were rejected; build-projects.mjs draws them all on projects/candidates.png.
import { W, G, P, rad, ribbon, reverse, turnAround, at, arc, sum } from './ribbons.mjs';

const TAIL = 2.3 * W;   // the symbol's taper is 2.3 ribbon widths long

// Smallest x at which a round bar of the ribbon width, centred on height y, stays one gap clear of a ribbon centreline.
function clearX(spine, offset, from, to, y, x0) {
  const pts = []; for (let s = from; s <= to; s += 2) pts.push(at(spine, s, offset));
  for (let x = x0; x < x0 + 400; x += 1) if (pts.every(p => Math.hypot(p[0] - x, p[1] - y) >= P)) return x;
}
const pointSymmetric = (half, cx, cy) => [...half, ...half.map(r => ({ ...r, spine: turnAround(r.spine, cx, cy) }))];
// A bowed chevron with a wider echo ribbon (outside it, one pitch away) ending in a long taper, plus a bar. bar(x, y) returns its spec.
function prompt(bar) {
  const A = [0, 0, rad(40), [['A', 240, -22], ['A', 38, -56], ['A', 240, -22]]], total = sum(A[3]), R = reverse(A);
  const echo = { spine: R, offset: -P, from: 34, to: total - 30, taper: TAIL };
  const end = at(R, 34, -P), bx = clearX(R, -P, 34, total - 30, end[1], end[0]);
  return [{ spine: A }, echo, bar(bx, end[1])];
}
// A dot with one ribbon spiralling out around it and closing in a long taper; dir -1 winds clockwise.
function spark(angle, dir) {
  const dot = { spine: [0, 0, 0, [['L', 0.01]]], width: 58 };
  const radii = [70, 76, 83, 91, 100, 110];
  return [dot, { spine: arc(0, 0, radii[0], angle, dir * 58, radii.map(r => ['A', r, dir * 58])), taper: 70 }];
}

export const candidates = {
  cli: {
    // A bowed prompt chevron, a wider echo ribbon with a long taper, and a separate cursor bar.
    a: () => prompt((x, y) => ({ spine: [x, y, 0, [['L', 40]]] })),
    // The same with the cursor bar bowed to follow the echo.
    b: () => prompt((x, y) => ({ spine: [x, y + 6, rad(-6), [['A', 260, 14]]] })),
    // The echo ribbon hooks at the bottom and runs on into the cursor, tapering at its tail.
    c() {
      const S = [0, 0, rad(40), [['A', 170, -30], ['A', 40, -40], ['A', 170, -20], ['A', 100, 105], ['A', 260, 12], ['L', 20]]];
      return [{ spine: S, to: 168 }, { spine: S, from: 64, offset: P, taper: 70 }];
    },
  },
  ide: {
    // Two nested parentheses on each side, point symmetric.
    a() {
      const R = 100, cx = 118, outer = arc(cx, 112, R, 180 + 40, 80), inner = arc(cx, 112, R - P, 180 + 36, 72);
      return pointSymmetric([{ spine: reverse(outer), taper: TAIL }, { spine: inner }], 112, 112);
    },
    // A hook cut from the symbol's turn: gentle side, curled foot, tapered tip, echo along the side.
    d() {
      const R = 175, cx = 190, hook = arc(cx, 112, R, 180 + 27, 54, [['A', R, 54], ['A', 58, 100]]);
      return pointSymmetric([{ spine: reverse(hook), taper: TAIL }, { spine: arc(cx, 112, R - P, 180 + 22, 44) }], 112, 112);
    },
    // Facing brackets with big flowing corners and a nested bar; the outer arm ends in a taper. Point symmetric.
    e() {
      const r = 42, height = 188, arm = 8, x = W / 2, outer = [x + r + arm, 0, Math.PI, [['L', arm], ['A', r, 90], ['L', height - 2 * r], ['A', r, 90], ['L', arm]]];
      const top = W + G, bar = [x + P, top, Math.PI / 2, [['L', height - 2 * top]]];
      return pointSymmetric([{ spine: reverse(outer), taper: 50 }, { spine: bar }], 112, height / 2);
    },
  },
  harness: {
    // Three strands run through one cinch band and leave as a single tapering ribbon.
    a() {
      const R = 230, cy = R, specs = [];
      for (const k of [-1, 0, 1]) { const r = R + k * P, d = 180 / Math.PI * P / r, span = 180 / Math.PI * 34 / r; specs.push({ spine: arc(0, cy, r, 270 - d - span, -span) }); }
      specs.push({ spine: arc(0, cy, R, 270 + 180 / Math.PI * P / R, -22), taper: 62 });
      specs.push({ spine: [0, cy - (R - P - 10), -Math.PI / 2, [['L', 2 * P + 20]]] });
      return specs;
    },
    // A dot (the agent) with one strap spiralling around it, closing in a long taper.
    b: () => spark(215, -1),
    // Two hairpins interleaved, four parallel runs at one pitch.
    c() {
      const big = 1.5 * P, small = 0.5 * P, len = 150;
      return [{ spine: [len, -big, Math.PI, [['L', len], ['A', big, 180], ['L', len]]] }, { spine: reverse([36, -small, 0, [['L', 150], ['A', small, -180], ['L', 150]]]), taper: 70 }];
    },
    // One ribbon folding through three runs, the symbol's hairpin repeated.
    d: () => [{ spine: reverse([0, 0, 0, [['L', 150], ['A', P / 2, -180], ['L', 150], ['A', P / 2, 180], ['L', 90]]]), taper: 60 }],
    // A yoke: one ribbon rising from a left foot, circling a ring, falling to a right foot.
    e: () => [{ spine: [-112, 110, -Math.PI / 2, [['L', 30], ['A', 70, -50], ['A', 42, -280], ['A', 70, -50], ['L', 30]]] }],
    // Nested hairpins: two strands turning together.
    f() {
      const r = 24, tail = 90;
      return [0, 1].map(k => ({ spine: [0, -(r + k * P), 0, [['L', tail - k * 24], ['A', r + k * P, -180], ['L', tail - k * 24]]], taper: k === 1 ? 60 : 0 }));
    },
    // Three dots (sessions) at one pitch inside one spiralling ring that closes in a long taper.
    g() {
      const k = P / Math.sqrt(3), dots = [[0, -k], [P / 2, k / 2], [-P / 2, k / 2]].map(([x, y]) => ({ spine: [x, y, 0, [['L', 0.01]]] }));
      const r0 = 94, radii = [r0, r0 + 2, r0 + 5, r0 + 9, r0 + 14, r0 + 20];
      return [...dots, { spine: arc(0, 0, r0, 100, -52, radii.map(r => ['A', r, -52])), taper: 78 }];
    },
  },
};
export const chosen = { cli: 'a', ide: 'e', harness: 'b' };

// A flowing handoff: staggered ribbons around one open diagonal channel.
// Both follow the same spine at one pitch, with one long outer taper.
export function relay() {
  const spine = [0, 0, 0, [['L', 18], ['A', 72, 70], ['A', 72, -70], ['L', 18]]];
  return [
    { spine, offset: -P / 2, to: sum(spine[3]) - 22 },
    { spine, offset: P / 2, from: 22, taper: TAIL },
  ];
}
