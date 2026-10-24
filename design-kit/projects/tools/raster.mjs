// Small raster helpers shared by the measuring and checking tools: rsvg-convert to RGBA, a PNG decoder, and an exact distance transform.
import { execFileSync } from 'node:child_process';
import { inflateSync } from 'node:zlib';

export function rasterize(svgPath, width, background) {
  const args = ['--width', String(width), '--format', 'png'];
  if (background) args.push('--background-color', background);
  const png = execFileSync(process.env.RSVG_CONVERT || 'rsvg-convert', [...args, svgPath], { maxBuffer: 1 << 28 });
  return decodePng(png);
}

// Decodes 8-bit non-interlaced RGB and RGBA PNGs, which is what librsvg writes (RGB when the image is opaque).
export function decodePng(buf) {
  let p = 8, w = 0, h = 0, bpp = 4; const idat = [];
  while (p < buf.length) {
    const len = buf.readUInt32BE(p), type = buf.toString('latin1', p + 4, p + 8), data = buf.subarray(p + 8, p + 8 + len);
    if (type === 'IHDR') { w = data.readUInt32BE(0); h = data.readUInt32BE(4); bpp = data[9] === 6 ? 4 : 3; if (data[8] !== 8 || (data[9] !== 6 && data[9] !== 2) || data[12] !== 0) throw new Error('expected 8-bit RGB or RGBA PNG'); }
    if (type === 'IDAT') idat.push(data);
    p += 12 + len;
  }
  const raw = inflateSync(Buffer.concat(idat)), stride = w * bpp, pixels = new Uint8Array(h * stride);
  for (let y = 0; y < h; y++) {
    const f = raw[y * (stride + 1)], src = y * (stride + 1) + 1, dst = y * stride;
    for (let i = 0; i < stride; i++) {
      const a = i >= bpp ? pixels[dst + i - bpp] : 0, b = y ? pixels[dst - stride + i] : 0, c = i >= bpp && y ? pixels[dst - stride + i - bpp] : 0;
      let pred = 0;
      if (f === 1) pred = a; else if (f === 2) pred = b; else if (f === 3) pred = (a + b) >> 1;
      else if (f === 4) { const q = a + b - c, pa = Math.abs(q - a), pb = Math.abs(q - b), pc = Math.abs(q - c); pred = pa <= pb && pa <= pc ? a : pb <= pc ? b : c; }
      pixels[dst + i] = (raw[src + i] + pred) & 255;
    }
  }
  if (bpp === 4) return { width: w, height: h, data: pixels };
  const out = new Uint8Array(w * h * 4);
  for (let i = 0; i < w * h; i++) out.set([pixels[i * 3], pixels[i * 3 + 1], pixels[i * 3 + 2], 255], i * 4);
  return { width: w, height: h, data: out };
}

// Squared Euclidean distance from each pixel to the nearest pixel where target[i] is true (Felzenszwalb).
export function edt(target, w, h) {
  const INF = 1e12, g = new Float64Array(w * h);
  const line = (f, n, d, z, v) => {
    let k = 0; v[0] = 0; z[0] = -INF; z[1] = INF;
    for (let q = 1; q < n; q++) {
      let s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
      while (s <= z[k]) { k--; s = ((f[q] + q * q) - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]); }
      k++; v[k] = q; z[k] = s; z[k + 1] = INF;
    }
    k = 0;
    for (let q = 0; q < n; q++) { while (z[k + 1] < q) k++; d[q] = (q - v[k]) ** 2 + f[v[k]]; }
  };
  for (let i = 0; i < w * h; i++) g[i] = target[i] ? 0 : INF;
  const m = Math.max(w, h), f = new Float64Array(m), d = new Float64Array(m), z = new Float64Array(m + 1), v = new Int32Array(m);
  for (let x = 0; x < w; x++) { for (let y = 0; y < h; y++) f[y] = g[y * w + x]; line(f, h, d, z, v); for (let y = 0; y < h; y++) g[y * w + x] = d[y]; }
  for (let y = 0; y < h; y++) { for (let x = 0; x < w; x++) f[x] = g[y * w + x]; line(f, w, d, z, v); for (let x = 0; x < w; x++) g[y * w + x] = d[x]; }
  return g;
}

// Widths (2 x inscribed radius) along the medial axis of the pixels where `on` is true, in pixels.
export function ridgeWidths(on, w, h) {
  const off = on.map(b => !b), g = edt(off, w, h), widths = [];
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    const i = y * w + x; if (!on[i]) continue;
    const c = g[i]; let ridge = true;
    for (let dy = -1; dy <= 1 && ridge; dy++) for (let dx = -1; dx <= 1; dx++) if ((dx || dy) && g[i + dy * w + dx] > c) { ridge = false; break; }
    if (ridge) widths.push(2 * Math.sqrt(c) - 1);
  }
  return widths;
}
export const quantile = (a, q) => { const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(q * s.length))]; };
