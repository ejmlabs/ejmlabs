// Thin product adapter over the public shared capture contract.
// Run record first. Run render only when no other shared Chrome capture is active.
import { createRequire } from 'node:module';
import { pathToFileURL, fileURLToPath } from 'node:url';
import path from 'node:path';
import { readFile, writeFile, mkdir, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const out = path.join(root, 'raw/harness');
const ui = process.env.EJM_UI_DIR ?? path.resolve(root, '../../ejm-ui');
const requireOwner = createRequire(path.join(ui, 'package.json'));
const { recordTerminal, renderRecording } = await import(pathToFileURL(requireOwner.resolve('@ejm/shots/recording')).href);
const action = process.argv[2] ?? 'record';
await mkdir(out, { recursive: true });
if (action === 'record') {
  const home = await mkdtemp(path.join(tmpdir(), 'ejm-harness-film-home-'));
  const recording = await recordTerminal({
    file: process.execPath,
    args: [path.join(here, 'harness-session.mjs')],
    cwd: root,
    env: {
      PATH: `${path.dirname(process.execPath)}:/opt/homebrew/bin:/usr/bin:/bin`,
      HOME: home,
      TMPDIR: process.env.TMPDIR ?? '/private/tmp',
      LANG: 'en_US.UTF-8',
      TERM: 'xterm-256color',
      EJM_HARNESS_DIR: process.env.EJM_HARNESS_DIR ?? '/private/tmp/ejm-harness-cli-api-publication-20261019',
      EJM_FILM_EVIDENCE: path.join(out, 'evidence'),
      EJM_FILM_PACE: '1',
      PYTHONDONTWRITEBYTECODE: '1',
    },
    cols: 100,
    rows: 24,
    waitExit: true,
    timeoutMs: 35000,
    maxDurationMs: 40000,
    maxOutputBytes: 1024 * 1024,
    settleMs: 100,
  });
  await writeFile(path.join(out, 'recording.json'), JSON.stringify(recording, null, 2) + '\n');
  if (recording.exitCode !== 0) throw new Error(`Harness capture failed with exit ${recording.exitCode}\n${recording.finalText}`);
  const scenes = [];
  for (const event of recording.events) {
    if (!event.data.includes('\x1b[2J\x1b[H')) continue;
    const text = event.data.replace(/\x1b\[[0-9;?]*[A-Za-z]/g, '').split(/\r?\n/).filter(Boolean);
    scenes.push({ atMs: event.atMs, text });
  }
  await writeFile(path.join(out, 'scenes.json'), JSON.stringify(scenes, null, 2) + '\n');
  console.log(JSON.stringify({ action, exitCode: recording.exitCode, durationMs: recording.durationMs, events: recording.events.length, scenes: scenes.length }));
} else if (action === 'render') {
  const recording = JSON.parse(await readFile(path.join(out, 'recording.json'), 'utf8'));
  const rendered = await renderRecording(recording, {
    outDir: path.join(out, 'terminal'),
    theme: 'dark',
    sampleFps: 10,
    cursor: false,
  });
  console.log(JSON.stringify(rendered));
} else {
  throw new Error('Usage: node capture/harness-capture.mjs [record|render]');
}
