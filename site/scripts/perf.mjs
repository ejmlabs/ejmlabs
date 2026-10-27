// Measure first contentful paint for the main routes from the built site, on Lighthouse's desktop
// throttle (40 ms RTT, 10 Mbit/s, no CPU slowdown), and fail when a route is a second or more slower
// than the recorded baseline.
// `npm run perf` checks; `npm run perf -- --update` records a new baseline.
import { execFileSync, spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:net';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const baselineFile = join(site, 'perf-baseline.json');
const routes = ['/', '/download/', '/projects/'];
const runs = 3;
const limitMs = 1000;
const dist = join(site, 'dist');
const waitForServer = async () => {
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw new Error('Static server exited');
    try {
      await fetch(`http://127.0.0.1:${port}/`);
      return;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  throw new Error(`Static server did not start on port ${port}`);
};
// A free loopback port, so the check never measures another server that already holds a fixed one.
const freePort = () => new Promise((resolve, reject) => {
  const probe = createServer().once('error', reject).listen(0, '127.0.0.1', () => {
    const { port } = probe.address();
    probe.close(() => resolve(port));
  });
});
const median = values => values.toSorted((a, b) => a - b)[Math.floor(values.length / 2)];

if (!existsSync(dist)) {
  console.error('site/dist is missing. Run `npm --prefix site run build` first.');
  process.exit(1);
}

const updating = process.argv.includes('--update');
const baseline = updating ? {} : JSON.parse(readFileSync(baselineFile, 'utf8'));
for (const route of routes) {
  if (!updating && typeof baseline[route] !== 'number') throw new Error(`No baseline for ${route}. Run \`npm --prefix site run perf -- --update\`.`);
}

const port = await freePort();
// `serve` compresses responses like the CDN does, so the numbers describe what visitors receive.
const server = spawn(join(site, 'node_modules', '.bin', 'serve'), [dist, '--listen', `tcp://127.0.0.1:${port}`, '--no-clipboard'], {
  stdio: ['ignore', 'ignore', 'inherit'],
  env: { ...process.env, NO_UPDATE_CHECK: '1' },
});
const measured = {};
try {
  await waitForServer();
  for (const route of routes) {
    const samples = [];
    for (let i = 0; i < runs; i++) {
      const report = execFileSync(join(site, 'node_modules', '.bin', 'lighthouse'), [
        `http://127.0.0.1:${port}${route}`, '--preset=desktop', '--output=json', '--output-path=stdout', '--quiet',
        '--only-categories=performance', '--only-audits=first-contentful-paint',
        '--chrome-flags=--headless=new --no-sandbox',
      ], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
      samples.push(JSON.parse(report).audits['first-contentful-paint'].numericValue);
    }
    measured[route] = Math.round(median(samples));
  }
} finally {
  server.kill();
}

if (updating) {
  writeFileSync(baselineFile, JSON.stringify(measured, null, 2) + '\n');
  console.log('Recorded first contentful paint (ms):', measured);
  process.exit(0);
}

let failed = false;
for (const route of routes) {
  const delta = measured[route] - baseline[route];
  const slow = delta >= limitMs;
  failed ||= slow;
  console.log(`${slow ? 'SLOWER' : 'ok    '} ${route} first contentful paint ${measured[route]} ms, baseline ${baseline[route]} ms (${delta >= 0 ? '+' : ''}${delta} ms)`);
}
if (failed) {
  console.error(`A route is ${limitMs} ms or more slower than its baseline. Find what it added before first paint.`);
  process.exit(1);
}
