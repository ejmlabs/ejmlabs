import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { recordTerminal, renderRecording } from '@ejm/shots/recording';

const filmRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const rawDir = join(filmRoot, process.argv.includes('--clean') ? 'raw/cli/clean' : process.argv.includes('--compact') ? 'raw/cli/compact' : 'raw/cli');
const sourceDir = join(filmRoot, 'sources/cli');
const buildRoot = process.env.EJM_CLI_FILM_BUILD ?? '/private/tmp/ejm-cli-launch-film-20261019';
const binary = process.env.EJM_CLI_BINARY ?? '/private/tmp/ejm-harness-cli-api-publication-20261019/target/release/ejm-cli';
const sha = value => createHash('sha256').update(value).digest('hex');

if (process.argv.includes('--render')) {
  const recording = JSON.parse(await readFile(join(rawDir, 'recording.json'), 'utf8'));
  const result = await renderRecording(recording, { outDir: join(rawDir, 'terminal'), theme: 'dark', sampleFps: 10, cursor: false });
  console.log(JSON.stringify({ width: result.width, height: result.height, durationMs: result.durationMs, frames: result.frames.length, concatFile: result.concatFile }));
} else {
  await mkdir(rawDir, { recursive: true });
  const take = await mkdtemp('/private/tmp/c-');
  const workspace = join(take, 'retry-budget');
  const home = join(take, 'home');
  const state = join(take, 's');
  await cp(join(sourceDir, 'fixture'), workspace, { recursive: true });
  await mkdir(home);
  await mkdir(state);
  execFileSync('/usr/bin/git', ['init', '-q'], { cwd: workspace });
  execFileSync('/usr/bin/git', ['add', '.'], { cwd: workspace });
  const binaryHashBefore = sha(await readFile(binary));
  const before = await readFile(join(workspace, 'src/retry.mjs'), 'utf8');
  const initial = spawnSync(process.execPath, ['--test', '--test-reporter=spec'], { cwd: workspace, encoding: 'utf8' });
  if (initial.status !== 1 || !initial.stdout.includes('fail 2')) throw new Error(`fixture must fail exactly two tests: ${initial.stdout}`);
  const responses = [
    { tool_calls: [{ id: 'test-before', name: 'shell', arguments: { command: process.argv.includes('--compact') ? './check' : 'node --test --test-reporter=spec', timeout_ms: 10000, heavy: true } }] },
    { content: '2 tests fail. Retries still run at the time limit and with a zero budget.' },
    { tool_calls: [{ id: 'read-retry', name: 'read_file', arguments: { path: 'src/retry.mjs' } }] },
    { tool_calls: [{ id: 'fix-boundary', name: 'patch_file', arguments: { path: 'src/retry.mjs', old: 'elapsedMs <= budgetMs', new: 'elapsedMs < budgetMs', expected_hash: sha(before) } }] },
    { content: 'Changed <= to <. A retry stops when the time budget is used.' },
    { tool_calls: [{ id: 'test-after', name: 'shell', arguments: { command: process.argv.includes('--compact') ? './check' : 'node --test --test-reporter=spec', timeout_ms: 10000, heavy: true } }] },
    { content: '5 tests pass. The retry budget now stops at the boundary.' },
  ];
  const replies = join(take, 'replies.json');
  await writeFile(replies, JSON.stringify(responses, null, 2) + '\n');
  const args = ['--replay-file', replies, '--cwd', workspace, '--state-dir', state, '--allow-write', '--allow-shell', '--appearance', 'dark'];
  const env = { PATH: dirname(process.execPath) + ':/opt/homebrew/bin:/usr/bin:/bin:/usr/sbin:/sbin', HOME: home, TMPDIR: take, TERM: 'xterm-256color', LANG: 'en_US.UTF-8', LC_ALL: 'en_US.UTF-8', COLORFGBG: '15;0', EJM_CLI_APPEARANCE: 'dark' };
  const recording = await recordTerminal({
    file: binary, args, cwd: workspace, env, cols: 100, rows: 24,
    maxDurationMs: 60000, maxOutputBytes: 8 * 1024 * 1024, settleMs: 0,
    steps: [
      { waitFor: 'offline replay', timeout: 15000 }, { wait: 1000 },
      { type: 'Retry ignores its time limit. Reproduce the failure.', delay: 35 }, { key: 'enter' },
      { waitFor: '2 tests fail', timeout: 15000 }, { wait: 6500 },
      { type: 'Read the retry code and fix the boundary.', delay: 35 }, { key: 'enter' },
      { waitFor: 'time budget is used', timeout: 15000 }, { wait: 6500 },
      { type: 'Run the same tests again.', delay: 35 }, { key: 'enter' },
      { waitFor: '5 tests pass', timeout: 15000 }, { wait: 7500 },
    ],
  });
  await writeFile(join(rawDir, 'recording.json'), JSON.stringify(recording, null, 2) + '\n');
  await writeFile(join(rawDir, 'output.ansi'), recording.events.map(event => event.data).join(''));
  await writeFile(join(sourceDir, 'replies.json'), JSON.stringify(responses, null, 2) + '\n');
  await writeFile(join(sourceDir, 'tests.before.txt'), initial.stdout + initial.stderr);
  const after = await readFile(join(workspace, 'src/retry.mjs'), 'utf8');
  if (after !== before.replace('elapsedMs <= budgetMs', 'elapsedMs < budgetMs')) throw new Error('native patch did not produce the expected file');
  const check = spawnSync(process.execPath, ['--test', '--test-reporter=spec'], { cwd: workspace, encoding: 'utf8' });
  if (check.status !== 0 || !check.stdout.includes('pass 5')) throw new Error(`tests must pass: ${check.stdout}`);
  await writeFile(join(sourceDir, 'tests.after.txt'), check.stdout + check.stderr);
  await writeFile(join(sourceDir, 'retry.after.mjs'), after);
  await writeFile(join(sourceDir, 'workspace.diff'), execFileSync('/usr/bin/git', ['diff', '--', 'src/retry.mjs'], { cwd: workspace }));
  await cp(state, join(rawDir, 'native-state'), { recursive: true });
  const { DatabaseSync } = await import('node:sqlite');
  const database = new DatabaseSync(join(rawDir, 'native-state/sessions.sqlite3'), { readOnly: true });
  const nativeEvents = database.prepare('select sequence,session_id,run_id,created,payload from events order by sequence').all().map(row => ({ sequence: row.sequence, session_id: row.session_id, run_id: row.run_id, created: row.created, ...JSON.parse(row.payload) }));
  database.close();
  await writeFile(join(sourceDir, 'native-events.json'), JSON.stringify(nativeEvents, null, 2) + '\n');
  if (sha(await readFile(binary)) !== binaryHashBefore) throw new Error('binary changed during capture');
  const sourceManifest = JSON.parse(await readFile(join(buildRoot, 'source-manifest.json'), 'utf8'));
  const metadata = { product: 'ejm-cli', capturedAt: recording.startedAt, version: execFileSync(binary, ['--version'], { encoding: 'utf8' }).trim(), binary: { sha256: binaryHashBefore, path: binary }, source: sourceManifest, rawDirectory: rawDir, command: ['ejm-cli', ...args.map(value => value.replaceAll(take, '<take>'))], workspace: '<take>/retry-budget', terminal: { cols: 100, rows: 24, theme: 'dark' }, durationMs: recording.durationMs, rawEvents: recording.events.length, method: 'Actual Rust TUI in node-pty; fixed local replay supplies model replies, native harness tools read, patch and run tests. Output rendered through shared xterm capture.', verification: { before: { exitCode: initial.status, failing: 2 }, after: { exitCode: check.status, passing: 5 }, fileChangedByNativeTool: true, durableEventCount: nativeEvents.length }, scenes: [{ name: 'task', fromMs: 0 }, ...[['failure', '2 tests fail'], ['patch', 'time budget is used'], ['verified', '5 tests pass']].map(([name, text]) => ({ name, fromMs: nativeEvents.find(event => event.type === 'text_delta' && event.text.includes(text)).created - Date.parse(recording.startedAt) }))] };
  await writeFile(join(sourceDir, 'capture.json'), JSON.stringify(metadata, null, 2) + '\n');
  console.log(JSON.stringify({ durationMs: recording.durationMs, events: recording.events.length, exitCode: recording.exitCode, finalText: recording.finalText, take }));
}
