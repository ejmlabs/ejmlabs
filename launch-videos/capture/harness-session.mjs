// Product-specific film fixture. It uses the public SDK and real native tools.
// EJM_FILM_PACE=0 skips editorial holds for verification.
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile, writeFile, mkdir, mkdtemp, cp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const source = process.env.EJM_HARNESS_DIR ?? '/private/tmp/ejm-harness-cli-api-publication-20261019';
const workerPath = process.env.EJM_HARNESS_WORKER_PATH ?? path.join(source, 'target/debug/ejm-harness-worker');
const evidence = path.resolve(process.env.EJM_FILM_EVIDENCE ?? path.join(root, 'raw/harness/evidence'));
const scratch = await mkdtemp(path.join(tmpdir(), 'ejm-harness-film-'));
const workspace = path.join(scratch, 'order-service');
const state = path.join(scratch, 'state');
await mkdir(evidence, { recursive: true });
await cp(path.join(root, 'sources/harness/fixture'), workspace, { recursive: true });
const { Harness } = await import(pathToFileURL(path.join(source, 'sdk/typescript/dist/index.js')).href);
const pace = process.env.EJM_FILM_PACE === '0' ? 0 : 1;
const hold = ms => new Promise(resolve => setTimeout(resolve, ms * pace));
const ink = '\x1b[38;2;220;228;216m';
const sage = '\x1b[38;2;174;194;151m';
const muted = '\x1b[38;2;157;173;161m';
const red = '\x1b[38;2;235;164;143m';
const reset = '\x1b[0m';
const line = (text = '', color = ink) => process.stdout.write(`${color}${String(text).replace(/\r?\n/g, '\r\n')}${reset}\r\n`);
const scene = label => {
  process.stdout.write('\x1b[2J\x1b[H\x1b[?25l');
  line('ejm-harness  /  public SDK  /  local replay', muted);
  line();
  line(label, sage);
  line();
};
const before = await readFile(path.join(workspace, 'orders.mjs'), 'utf8');
const expectedHash = createHash('sha256').update(before).digest('hex');
const calls = [
  { id: 'test-before', name: 'shell', arguments: { command: 'node --test --test-reporter=spec orders.test.mjs', timeout_ms: 10000, heavy: true } },
  { id: 'read-orders', name: 'read_file', arguments: { path: 'orders.mjs' } },
  { id: 'fix-quantity', name: 'patch_file', arguments: { path: 'orders.mjs', old: 'sum + item.price', new: 'sum + item.price * item.quantity', expected_hash: expectedHash } },
  { id: 'test-after', name: 'shell', arguments: { command: 'node --test --test-reporter=spec orders.test.mjs', timeout_ms: 10000, heavy: true } },
];
const responses = [
  ...calls.map(call => ({ tool_calls: [call] })),
  { content: 'Order totals now include every quantity. All three tests pass.' },
];
await writeFile(path.join(evidence, 'responses.json'), JSON.stringify(responses, null, 2) + '\n');
const toolCalls = new Map();
let startedTools = 0;
const receipts = [];
const quantityTestLine = content => {
  const result = content.split(/\r?\n/).find(value => /^[✔✖] counts each quantity(?: |$)/.test(value));
  assert.ok(result, 'The real quantity test result must be present');
  return result;
};
const displayReadback = result => {
  line(`session  ${result.session_id.slice(0, 8)} / ${result.title}`, muted);
  line(`run      ${result.run_id.slice(0, 8)}`, muted);
  line();
  line(result.summary.text);
  line();
  line(`saved tool  ${result.tool_start.call.name} / ${result.tool_start.call.arguments.command}`, muted);
  line(result.tool_line, sage);
  line(`exit ${result.tool_result.output.data.exit_code}`, sage);
};

scene('JavaScript runs the order fix.');
line('const harness = await Harness.create({');
line("  provider: { kind: 'replay', responses },");
line('  allow_write: true,');
line('  allow_shell: true,');
line('});');
line();
line('const run = await session.start("Fix order totals. Run the tests.");');
await hold(1800);

const harness = await Harness.create({
  workerPath,
  state_dir: state,
  provider: { kind: 'replay', responses },
  allow_write: true,
  allow_shell: true,
  resources: { max_jobs: 1, max_heavy_jobs: 1 },
});
let session;
let summary;
let journal;
let readback;
try {
  session = await harness.createSession({ cwd: workspace, title: 'Fix order quantities' });
  await writeFile(path.join(evidence, 'session.json'), JSON.stringify(session.info, null, 2) + '\n');
  const run = await session.start('Fix order totals. Run the tests.');
  for await (const event of run) {
    if (event.type === 'tool_started') {
      const planned = calls[startedTools++];
      assert.ok(planned, 'Unexpected native tool call');
      assert.equal(event.call.name, planned.name);
      assert.deepEqual(event.call.arguments, planned.arguments);
      toolCalls.set(event.call.id, planned);
    }
    if (event.type !== 'tool_finished') continue;
    const call = toolCalls.get(event.call_id);
    if (!call) throw new Error('A tool result must have a recorded start');
    receipts.push(event);
    await writeFile(path.join(evidence, `${call.id}.json`), JSON.stringify(event, null, 2) + '\n');
    if (call.id === 'test-before') {
      if (!event.output.is_error || event.output.data?.exit_code !== 1) throw new Error('The initial test must fail with exit 1');
      line();
      line(`shell  ${quantityTestLine(event.output.content)}`, red);
      line(`exit ${event.output.data.exit_code}`, red);
      await hold(1000);
    } else if (call.id === 'read-orders') {
      if (event.output.is_error || event.output.data?.sha256 !== expectedHash) throw new Error('The real read hash must match the edit precondition');
      line(`read_file  ${event.output.data.path}`, muted);
      await hold(500);
    } else if (call.id === 'fix-quantity') {
      if (event.output.is_error) throw new Error(event.output.content);
      line(`patch_file  ${event.output.content}`, sage);
      await hold(800);
    } else if (call.id === 'test-after') {
      if (event.output.is_error || event.output.data?.exit_code !== 0) throw new Error('The final tests must pass');
      line(`shell  ${quantityTestLine(event.output.content)}`, sage);
      line(`exit ${event.output.data.exit_code}`, sage);
      await hold(1200);
    }
  }
  summary = await run.wait();
  if (summary.status !== 'completed') throw new Error(JSON.stringify(summary));
  journal = await session.events();
  if (receipts.length !== 4) throw new Error('All four real tool receipts are required');
  await writeFile(path.join(evidence, 'journal.json'), JSON.stringify(journal, null, 2) + '\n');
  await writeFile(path.join(evidence, 'summary.json'), JSON.stringify(summary, null, 2) + '\n');
  const finished = journal.findLast(event => event.type === 'run_finished' && event.run_id === summary.run_id);
  assert.ok(finished, 'The completed run must be saved in the journal');
  assert.deepEqual(finished.summary, summary);
  const savedStart = journal.findLast(event => event.type === 'tool_started'
    && event.run_id === finished.run_id && event.call.name === 'shell');
  assert.ok(savedStart, 'The completed run must contain the final shell call');
  const savedResult = journal.findLast(event => event.type === 'tool_finished'
    && event.run_id === finished.run_id && event.call_id === savedStart.call.id);
  assert.ok(savedResult, 'The saved shell call must have its real result');
  assert.equal(savedResult.output.is_error, false);
  assert.equal(savedResult.output.data.exit_code, 0);
  readback = {
    session_id: session.id,
    title: session.info.title,
    run_id: finished.run_id,
    summary: finished.summary,
    tool_start: savedStart,
    tool_result: savedResult,
    tool_line: quantityTestLine(savedResult.output.content),
  };
  await writeFile(path.join(evidence, 'js-readback.json'), JSON.stringify(readback, null, 2) + '\n');
  scene('JavaScript reads the completed session.');
  line('const events = await session.events();');
  line();
  displayReadback(readback);
  await hold(4800);
} finally {
  await harness.close();
}
const after = await readFile(path.join(workspace, 'orders.mjs'), 'utf8');
await writeFile(path.join(evidence, 'orders.before.mjs'), before);
await writeFile(path.join(evidence, 'orders.after.mjs'), after);
const diff = [
  '--- a/orders.mjs', '+++ b/orders.mjs', '@@ -1,3 +1,3 @@',
  ' export function orderTotal(items) {',
  `-  return items.reduce((sum, item) => ${calls[2].arguments.old}, 0);`,
  `+  return items.reduce((sum, item) => ${calls[2].arguments.new}, 0);`, ' }', '',
].join('\n');
if (after !== before.replace(calls[2].arguments.old, calls[2].arguments.new)) throw new Error('Unexpected workspace effect');
await writeFile(path.join(evidence, 'workspace.diff'), diff);
scene('Close the JavaScript worker.');
line('await harness.close();');
line();
line('native worker stopped', muted);
await hold(1300);

scene('Python reads the saved work.');
line('sessions = await harness.list_sessions()');
line('page = await session.events(after=after)');
line();
await hold(1000);
const restoreOutput = [];
const restore = spawn(process.env.PYTHON ?? '/opt/homebrew/bin/python3', [path.join(here, 'harness-restore.py')], {
  env: {
    PATH: process.env.PATH,
    PYTHONPATH: path.join(source, 'sdk/python'),
    PYTHONDONTWRITEBYTECODE: '1',
    EJM_FILM_STATE: state,
    EJM_FILM_EVIDENCE: evidence,
    EJM_HARNESS_WORKER_PATH: workerPath,
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});
restore.stdout.on('data', chunk => {
  restoreOutput.push(chunk);
  process.stdout.write(`${sage}${chunk.toString().replaceAll('\n', '\r\n')}${reset}`);
});
restore.stderr.on('data', chunk => process.stderr.write(chunk));
const restoreExit = await new Promise((resolve, reject) => {
  restore.once('error', reject);
  restore.once('close', resolve);
});
if (restoreExit !== 0) throw new Error(`Python restore exited ${restoreExit}`);
await writeFile(path.join(evidence, 'python-restore.txt'), Buffer.concat(restoreOutput));
const pythonReceipt = JSON.parse(await readFile(path.join(evidence, 'python-restore.json'), 'utf8'));
assert.deepEqual(pythonReceipt.readback, readback, 'Python must return the same saved result');
assert.notEqual(pythonReceipt.reader_pid, process.pid, 'The Python reader must be a fresh process');
await writeFile(path.join(evidence, 'capture-receipt.json'), JSON.stringify({
  source, workerPath, workspace, state, sessionId: session.id,
  jsPid: process.pid, captureTime: new Date().toISOString(),
  beforeHash: expectedHash,
  afterHash: createHash('sha256').update(after).digest('hex'),
  toolCalls: receipts.length,
  beforeTestExit: receipts[0].output.data.exit_code,
  afterTestExit: receipts[3].output.data.exit_code,
  journalEvents: journal.length,
  restoreExit,
  readback: {
    runId: readback.run_id,
    summaryText: readback.summary.text,
    toolCallId: readback.tool_result.call_id,
    toolResultLine: readback.tool_line,
    summarySequence: journal.find(event => event.type === 'run_finished' && event.run_id === readback.run_id).sequence,
    toolSequence: readback.tool_result.sequence,
    pythonReaderPid: pythonReceipt.reader_pid,
    matches: pythonReceipt.readback_matches_js,
  },
  pacing: pace ? 'Editorial holds after real SDK events; no invented execution time.' : 'No holds.',
}, null, 2) + '\n');
await hold(7000);
process.stdout.write('\x1b[?25h');
