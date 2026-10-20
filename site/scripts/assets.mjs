import { createRequire } from 'node:module';
import { dirname, sep } from 'node:path';

// Trusted preparation installs the pinned public UI workspace beside Studio.
const owner = createRequire(new URL('../../../ejm-ui/package.json', import.meta.url));
export const resolveAsset = path => owner.resolve(`@ejm/tokens/assets/${path.split(sep).join('/')}`);
export const sharedAssets = Object.fromEntries([
  'favicon/favicon.svg',
  'fonts/Manrope-OFL.txt',
  'icons/sheet.svg',
  'lockups/signature-sage.svg',
  'logos/ejmlabs-primary.svg',
  'motifs/contour-forest.svg',
  'social/avatar.png',
  'templates/image-frame.svg',
].map(path => [dirname(path), dirname(resolveAsset(path))]));
