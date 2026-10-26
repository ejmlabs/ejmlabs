import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { chmodSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, symlinkSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { renderInstallScript } from '../scripts/install-sh.mjs';

// Runs the generated install.sh with a stand-in curl that serves files from a fixture directory, so no test touches the network.
const work = mkdtempSync(join(tmpdir(), 'ejmlabs-install-'));
const served = join(work, 'served');
const bin = join(work, 'bin');
const FILE = 'ejm-cli-0.1.0-linux-x86_64.tar.gz';
let artifact;
let script;

const sh = (cmd, args, opts = {}) => execFileSync(cmd, args, { stdio: 'pipe', ...opts });

before(() => {
  mkdirSync(served, { recursive: true });
  mkdirSync(bin, { recursive: true });
  const pack = join(work, 'pack', 'ejm-cli-0.1.0');
  mkdirSync(pack, { recursive: true });
  writeFileSync(join(pack, 'ejm-cli'), '#!/bin/sh\necho ran >> "$HOME/ran"\n');
  writeFileSync(join(pack, 'LICENSE'), 'MIT\n');
  sh('tar', ['-czf', join(served, FILE), '-C', join(work, 'pack'), 'ejm-cli-0.1.0']);
  const bytes = readFileSync(join(served, FILE));
  artifact = {
    product: 'cli', version: '0.1.0', publishedAt: '2026-11-01T00:00:00Z', target: 'linux-x86_64', filename: FILE,
    url: `https://github.com/ejmlabs/ejm-cli/releases/download/v0.1.0/${FILE}`,
    bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'),
  };
  script = join(work, 'install.sh');
  writeFileSync(script, renderInstallScript([artifact]));

  // curl: checks the safety flags, logs the URL, and serves the fixture by file name.
  writeFileSync(join(bin, 'curl'), `#!/bin/sh
printf '%s\\n' "$*" >> "${work}/curl.log"
case " $* " in *" --proto =https --tlsv1.2 -fsSL "*) ;; *) echo "curl: missing safety flags" >&2; exit 64 ;; esac
while [ $# -gt 1 ]; do case "$1" in -o) out=$2 ;; esac; shift; done
url=$1
[ "\${FAKE_CURL:-}" = fail ] && exit 22
if [ "\${FAKE_CURL:-}" = truncate ]; then head -c 100 "${served}/\${url##*/}" > "$out"; exit 0; fi
cp "${served}/\${url##*/}" "$out"
`);
  // uname: reports the machine the test pretends to run on.
  writeFileSync(join(bin, 'uname'), `#!/bin/sh
case "$1" in -s) echo "\${FAKE_OS:-Linux}" ;; -m) echo "\${FAKE_CPU:-x86_64}" ;; esac
`);
  chmodSync(join(bin, 'curl'), 0o755);
  chmodSync(join(bin, 'uname'), 0o755);
});
after(() => rmSync(work, { recursive: true, force: true }));

/** Runs the script with a fresh HOME. `tools` lists the real commands the script may find; omit one to test its absence. */
function run(args, { env = {}, path } = {}) {
  const home = mkdtempSync(join(work, 'home-'));
  const tmp = mkdtempSync(join(work, 'tmp-'));
  rmSync(join(work, 'curl.log'), { force: true });
  const result = spawnSync('/bin/sh', [script, ...args], {
    env: { HOME: home, TMPDIR: tmp, PATH: path ?? `${bin}:${process.env.PATH}`, ...env },
    encoding: 'utf8',
  });
  const curls = existsSync(join(work, 'curl.log')) ? readFileSync(join(work, 'curl.log'), 'utf8').trim().split('\n') : [];
  return { ...result, home, tmp, curls, installed: join(home, '.local', 'bin', 'ejm-cli') };
}

test('a listed target installs, checks the digest and prints the unsigned note', () => {
  const r = run(['cli']);
  assert.equal(r.status, 0, r.stderr);
  assert.ok(statSync(r.installed).isFile());
  assert.equal(statSync(r.installed).mode & 0o777, 0o755);
  assert.match(r.stdout, /Installed ejm-cli 0\.1\.0 to .*\.local\/bin\/ejm-cli/);
  assert.match(r.stdout, /not signed with a developer certificate and is not notarized/);
  assert.match(r.stdout, /not on your PATH/);
  assert.equal(r.curls.length, 1);
  assert.ok(r.curls[0].endsWith(artifact.url));
  assert.ok(!existsSync(join(r.home, 'ran')), 'the downloaded program is never run');
  assert.deepEqual(readdirSync(join(r.home, '.local', 'bin')), ['ejm-cli'], 'no staging file is left behind');
  assert.deepEqual(readdirSync(r.tmp), [], 'the temporary directory is removed');
});

test('no PATH hint when the install directory is already on PATH', () => {
  const home = mkdtempSync(join(work, 'path-'));
  const r = run(['cli'], { env: { HOME: home, PATH: `${join(home, '.local', 'bin')}:${bin}:${process.env.PATH}` } });
  assert.equal(r.status, 0, r.stderr);
  assert.doesNotMatch(r.stdout, /not on your PATH/);
});

test('an unlisted target downloads nothing and names the listed builds', () => {
  const r = run(['cli'], { env: { FAKE_OS: 'Darwin', FAKE_CPU: 'arm64' } });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /no cli build is listed for Darwin arm64/);
  assert.match(r.stderr, /cli linux-x86_64 0\.1\.0/);
  assert.equal(r.curls.length, 0);
  assert.ok(!existsSync(r.installed));
});

test('an unlisted product downloads nothing', () => {
  const r = run(['worker']);
  assert.equal(r.status, 1);
  assert.match(r.stderr, /no worker build is listed/);
  assert.equal(r.curls.length, 0);
});

test('a checksum mismatch installs nothing', () => {
  writeFileSync(script, renderInstallScript([{ ...artifact, sha256: 'b'.repeat(64) }]));
  const r = run(['cli']);
  writeFileSync(script, renderInstallScript([artifact]));
  assert.equal(r.status, 1);
  assert.match(r.stderr, /checksum mismatch/);
  assert.match(r.stderr, /Nothing was installed/);
  assert.ok(!existsSync(r.installed));
  assert.deepEqual(readdirSync(r.tmp), []);
});

test('a truncated download installs nothing', () => {
  const r = run(['cli'], { env: { FAKE_CURL: 'truncate' } });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /checksum mismatch/);
  assert.ok(!existsSync(r.installed));
});

test('a failed download installs nothing', () => {
  const r = run(['cli'], { env: { FAKE_CURL: 'fail' } });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /download failed/);
  assert.ok(!existsSync(r.installed));
});

test('a truncated script runs nothing', () => {
  const lines = readFileSync(script, 'utf8').trimEnd().split('\n');
  assert.equal(lines.at(-1), 'main "$@"', 'the last line is the only call');
  const cut = join(work, 'cut.sh');
  writeFileSync(cut, `${lines.slice(0, -1).join('\n')}\nmain "`);
  const home = mkdtempSync(join(work, 'cut-'));
  rmSync(join(work, 'curl.log'), { force: true });
  const r = spawnSync('/bin/sh', [cut, 'cli'], { env: { HOME: home, PATH: `${bin}:${process.env.PATH}` }, encoding: 'utf8' });
  assert.notEqual(r.status, 0);
  assert.ok(!existsSync(join(home, '.local')));
  assert.ok(!existsSync(join(work, 'curl.log')));
});

test('a missing hash tool fails closed before downloading', () => {
  const tools = join(work, 'tools');
  mkdirSync(tools, { recursive: true });
  for (const name of ['mktemp', 'tar', 'gzip', 'find', 'head', 'cut', 'mkdir', 'cp', 'chmod', 'mv', 'rm', 'cat', 'dirname']) {
    const found = execFileSync('sh', ['-c', `command -v ${name}`], { encoding: 'utf8' }).trim();
    symlinkSync(found, join(tools, name));
  }
  const r = run(['cli'], { path: `${bin}:${tools}` });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /sha256sum or shasum is required/);
  assert.equal(r.curls.length, 0);
  assert.ok(!existsSync(r.installed));
});

test('--dry-run prints the plan and changes nothing', () => {
  const r = run(['--dry-run', 'cli']);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /ejm-cli 0\.1\.0 for linux-x86_64/);
  assert.match(r.stdout, new RegExp(artifact.sha256));
  assert.match(r.stdout, /Dry run: nothing was downloaded or installed/);
  assert.equal(r.curls.length, 0);
  assert.ok(!existsSync(join(r.home, '.local')));
});

test('an unknown argument is refused', () => {
  const r = run(['--force', 'cli']);
  assert.equal(r.status, 2);
  assert.equal(r.curls.length, 0);
});

test('the script has the required hardening and none of the forbidden steps', () => {
  const text = readFileSync(script, 'utf8');
  assert.match(text, /curl --proto '=https' --tlsv1\.2 -fsSL/);
  assert.match(text, /mktemp -d/);
  assert.match(text, /umask 077/);
  assert.match(text, /trap cleanup EXIT/);
  assert.match(text, /mv -f "\$staged" "\$dest\/\$bin"/);
  assert.match(text, /export PATH=/, 'prints a PATH hint');
  assert.doesNotMatch(text, /\bsudo\b|\bsu\b -/);
  assert.doesNotMatch(text, /\.(?:bashrc|zshrc|profile|bash_profile|zprofile)\b|>>\s*"?\$HOME/);
  assert.doesNotMatch(text, /glibc|\bldd\b|getconf/);
  assert.doesNotMatch(text, /http:\/\//);
  assert.ok(!text.includes('—'), 'no em dash');
});

const shellcheck = spawnSync('shellcheck', ['--version']).status === 0;
test('shellcheck is clean on a listed build', { skip: !shellcheck && 'shellcheck is not installed' }, () => {
  const r = spawnSync('shellcheck', ['-s', 'sh', script], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout);
});

test('shellcheck is clean on an empty release list, apart from unreachable code', { skip: !shellcheck && 'shellcheck is not installed' }, () => {
  const empty = join(work, 'empty.sh');
  writeFileSync(empty, renderInstallScript([]));
  const r = spawnSync('shellcheck', ['-s', 'sh', '-e', 'SC2317,SC2154', empty], { encoding: 'utf8' });
  assert.equal(r.status, 0, r.stdout);
  assert.match(readFileSync(empty, 'utf8'), /Listed builds: none yet/);
});
