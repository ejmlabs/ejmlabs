// Measure first contentful paint for the main routes from the built site, on Lighthouse's default
// mobile 4G throttle, and fail when a route is a second or more slower than the recorded baseline.
// `npm run perf` checks; `npm run perf -- --update` records a new baseline.
import { execFileSync, spawn } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const baselineFile = join(site, 'perf-baseline.json');
const routes = ['/', '/download/', '/projects/'];
const runs = 3;
const limitMs = 1000;
const port = 4829;
const median = values => values.toSorted((a, b) => a - b)[Math.floor(values.length / 2)];

const server = spawn('python3', ['-m', 'http.server', String(port), '--directory', join(site, 'dist'), '--bind', '127.0.0.1'], { stdio: 'ignore' });
const measured = {};
try {
  await new Promise(resolve => setTimeout(resolve, 1000));
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
  const delta = measured[route] - baseline[route];
  const slow = delta >= limitMs;
  failed ||= slow;
  console.log(`${slow ? 'SLOWER' : 'ok    '} ${route} first contentful paint ${measured[route]} ms, baseline ${baseline[route]} ms (${delta >= 0 ? '+' : ''}${delta} ms)`);
}
if (failed) {
  console.error(`A route is ${limitMs} ms or more slower than its baseline. Find what it added before first paint.`);
  process.exit(1);
}
