// Assembles dist/ for Cloudflare: the page, the design kit (generated files refreshed first) and its zip.
import { execFileSync } from 'node:child_process';
import { cpSync, rmSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const site = join(dirname(fileURLToPath(import.meta.url)), '..');
const kit = join(site, '..', 'design-kit');
const dist = join(site, 'dist');
const skip = path => !path.endsWith('.DS_Store');

execFileSync('node', [join(kit, 'scripts', 'build-ui.mjs')], { stdio: 'inherit' });
execFileSync('node', [join(kit, 'scripts', 'build-web.mjs')], { stdio: 'inherit' });
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist);
cpSync(join(site, 'src'), dist, { recursive: true, filter: skip });
cpSync(kit, join(dist, 'design-kit'), { recursive: true, filter: skip });
// The gallery links the swag kit ZIP from the site root.
if (existsSync(join(site, '..', 'ejmlabs-swag-kit.zip'))) cpSync(join(site, '..', 'ejmlabs-swag-kit.zip'), join(dist, 'ejmlabs-swag-kit.zip'));
// One response-header policy for every ejmlabs site, owned by the kit.
cpSync(join(kit, 'web', '_headers'), join(dist, '_headers'));
execFileSync('zip', ['-qr', join(dist, 'ejmlabs-design-kit.zip'), 'design-kit', '-x', '*.DS_Store'], { cwd: join(site, '..'), stdio: 'inherit' });
console.log('dist/ is ready');
