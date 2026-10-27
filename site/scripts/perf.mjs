// Measure first contentful paint for the main routes from the built site, on Lighthouse's default
// slow-4G mobile throttle (150 ms RTT, 1.6 Mbit/s, 4x CPU slowdown), and fail when a route is a second or more slower than the recorded baseline.
// `npm run perf` checks; `npm run perf -- --update` records a new baseline.
import { execFileSync, spawn } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const baselineFile = join(site, 'perf-baseline.json');
const routes = ['/', '/download/', '/projects/'];
const runs = 3;
const limitMs = 1000;
const port = 4829;
const dist = join(site, 'dist');
const waitForServer = async () => {
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw new Error(`Static server exited (is port ${port} already in use?)`);
    try {
      await fetch(`http://127.0.0.1:${port}/`);
      return;
    } catch {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
  throw new Error(`Static server did not start on port ${port}`);
};
const median = values => values.toSorted((a, b) => a - b)[Math.floor(values.length / 2)];

if (!existsSync(dist)) {
  console.error('site/dist is missing. Run `npm --prefix site run build` first.');
  process.exit(1);
}

// `serve` compresses responses like the CDN does, so the numbers describe what visitors receive.
const server = spawn(join(site, 'node_modules', '.bin', 'serve'), [dist, '--listen', `tcp://127.0.0.1:${port}`, '--no-clipboard'], { stdio: ['ignore', 'ignore', 'inherit'] });
const measured = {};
try {
  await waitForServer();
  for (const route of routes) {
    const samples = [];
    for (let i = 0; i < runs; i++) {
      const report = execFileSync(join(site, 'node_modules', '.bin', 'lighthouse'), [
        `http://127.0.0.1:${port}${route}`, '--output=json', '--output-path=stdout', '--quiet',
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

if (process.argv.includes('--update')) {
  writeFileSync(baselineFile, JSON.stringify(measured, null, 2) + '\n');
  console.log('Recorded first contentful paint (ms):', measured);
  process.exit(0);
}

const baseline = JSON.parse(readFileSync(baselineFile, 'utf8'));
let failed = false;
for (const route of routes) {
  if (typeof baseline[route] !== 'number') throw new Error(`No baseline for ${route}. Run \`npm --prefix site run perf -- --update\`.`);
  const delta = measured[route] - baseline[route];
  const slow = delta >= limitMs;
  failed ||= slow;
  console.log(`${slow ? 'SLOWER' : 'ok    '} ${route} first contentful paint ${measured[route]} ms, baseline ${baseline[route]} ms (${delta >= 0 ? '+' : ''}${delta} ms)`);
}
if (failed) {
  console.error(`A route is ${limitMs} ms or more slower than its baseline. Find what it added before first paint.`);
  process.exit(1);
}
