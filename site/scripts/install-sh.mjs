// Renders install.sh from the validated release list. The values embedded here passed validateReleases,
// so they hold only characters that are safe inside single quotes.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const template = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'install.template.sh'), 'utf8');

/** The program each installable product puts on the user's PATH. */
const BINARIES = { cli: 'ejm-cli', worker: 'ejm-harness-worker' };

export function renderInstallScript(artifacts) {
  const listed = artifacts.filter(a => Object.hasOwn(BINARIES, a.product));
  const cases = listed.map(a => [
    `    ${a.product}/${a.target})`,
    `      bin='${BINARIES[a.product]}'; version='${a.version}'; file='${a.filename}'; notarized=${a.notarized === true ? 1 : 0}`,
    `      url='${a.url}'`,
    `      sha256='${a.sha256}'`,
    '      ;;',
  ].join('\n'));
  const available = listed.length ? listed.map(a => `${a.product} ${a.target} ${a.version}`).join(', ') : 'none yet';
  const [head, tail] = template.split('    #CASES#\n');
  return head + (cases.length ? cases.join('\n') + '\n' : '') + tail.replace('#AVAILABLE#', available);
}
