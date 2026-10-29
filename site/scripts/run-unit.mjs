import { spawnSync } from 'node:child_process';
import { isAbsolute } from 'node:path';

const report = process.env.EJM_TEST_REPORT;
if (report && !isAbsolute(report)) throw new Error('EJM_TEST_REPORT must be an absolute path');

function run(args) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
  if (result.error) console.error(result.error.message);
  return result.status ?? 1;
}

const buildStatus = run(['scripts/build.mjs']);
process.exitCode = buildStatus || run([...(report ? [
  '--test', '--test-reporter=spec', '--test-reporter-destination=stdout',
  '--test-reporter=junit', `--test-reporter-destination=${report}`,
] : ['--test']), ...process.argv.slice(2)]);
