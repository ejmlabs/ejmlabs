// Assembles the current pages and retained design assets for Cloudflare.
import { execFileSync } from 'node:child_process';
import { cpSync, rmSync, mkdirSync } from 'node:fs';
import { join, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const kit = join(site, '..', 'design-kit');
const dist = join(site, 'dist');
const retired = [join(kit, 'social', 'x-kit'), join(kit, 'swag')];
const include = path => !path.endsWith('.DS_Store') && !path.toLowerCase().endsWith('.zip') &&
  !retired.some(directory => path === directory || path.startsWith(directory + sep));

execFileSync('node', [join(kit, 'scripts', 'build-ui.mjs')], { stdio: 'inherit' });
execFileSync('node', [join(kit, 'scripts', 'build-web.mjs')], { stdio: 'inherit' });
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist);
cpSync(join(site, 'src'), dist, { recursive: true, filter: include });
cpSync(kit, join(dist, 'design-kit'), { recursive: true, filter: include });
// One response-header policy for every ejmlabs site, owned by the kit.
cpSync(join(kit, 'web', '_headers'), join(dist, '_headers'));
console.log('dist/ is ready');
