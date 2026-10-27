import manifest from '../public/releases.json';

// The released files, from public/releases.json (checked at build time by scripts/releases.mjs).
export type Product = 'cli' | 'worker' | 'ide';
export type Target = 'linux-x86_64' | 'darwin-aarch64' | 'darwin-x86_64' | 'windows-x86_64';

export interface Artifact {
  product: Product;
  version: string;
  publishedAt: string;
  target: Target;
  filename: string;
  url: string;
  bytes: number;
  sha256: string;
  /** True only after a notarization run for this file is recorded. */
  notarized?: boolean;
}

export const artifacts: readonly Artifact[] = manifest.artifacts as readonly Artifact[];

/** The project whose repository owns each downloadable product. */
export const PRODUCT_PROJECT = { cli: 'cli', worker: 'harness', ide: 'ide' } as const;

export const versionOf = (product: Product) => artifacts.find(a => a.product === product)?.version;
export const artifactFor = (product: Product, target: Target) => artifacts.find(a => a.product === product && a.target === target);
/** The version released for a project, if its product has a release. */
export const versionOfProject = (id: string) => {
  const product = (Object.keys(PRODUCT_PROJECT) as Product[]).find(p => PRODUCT_PROJECT[p] === id);
  return product && versionOf(product);
};

/** Set to true once `npm view` confirms the published ejm-ui packages. */
export const UI_PACKAGES_PUBLISHED = false;

export const INSTALL_SCRIPT = 'https://ejmlabs.com/install.sh';
export const installLine = (product: 'cli' | 'worker') =>
  `curl --proto '=https' --tlsv1.2 -fsSL ${INSTALL_SCRIPT} | sh -s -- ${product}`;

/**
 * Report links for a repository. They hold nothing about the visitor: the template name, and for a bug in a product with
 * a release, the version in the `evidence` field with the platform left for the reporter to fill in.
 */
export function reportLinks(repo: string, version?: string) {
  const bug = new URLSearchParams({ template: 'bug.yml' });
  if (version) bug.set('evidence', `Version: ${version}\nPlatform: `);
  return {
    bug: `${repo}/issues/new?${bug.toString().replaceAll('+', '%20')}`,
    feedback: `${repo}/issues/new?template=feature.yml`,
    security: `${repo}/security/advisories/new`,
  };
}
