// The list of released files. The build and its tests both read it through here, so the build accepts only what the tests accept.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const manifestPath = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'releases.json');

/** The repository that owns each downloadable product. */
export const REPOSITORIES = { cli: 'ejm-cli', worker: 'ejm-harness', ide: 'ejm-ide' };
export const TARGETS = ['darwin-aarch64', 'darwin-x86_64', 'linux-x86_64', 'windows-x86_64'];

const SEMVER = /^\d+\.\d+\.\d+$/;
const SHA256 = /^[0-9a-f]{64}$/;
const FILENAME = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

/** Throws on the first problem; returns the artifacts when the list is sound. */
export function validateReleases(manifest) {
  if (manifest?.schemaVersion !== 1) throw new Error('releases.json: schemaVersion must be 1');
  if (!Array.isArray(manifest.artifacts)) throw new Error('releases.json: artifacts must be a list');
  const seen = new Set();
  const versions = new Map();
  for (const [index, a] of manifest.artifacts.entries()) {
    const at = `releases.json artifacts[${index}]`;
    if (!Object.hasOwn(REPOSITORIES, a?.product)) throw new Error(`${at}: unknown product`);
    if (!TARGETS.includes(a.target)) throw new Error(`${at}: unknown target`);
    if (typeof a.version !== 'string' || !SEMVER.test(a.version)) throw new Error(`${at}: version must be x.y.z`);
    if (typeof a.filename !== 'string' || !FILENAME.test(a.filename)) throw new Error(`${at}: bad filename`);
    if (!a.filename.includes(a.version)) throw new Error(`${at}: filename must name version ${a.version}`);
    if (typeof a.sha256 !== 'string' || !SHA256.test(a.sha256)) throw new Error(`${at}: sha256 must be 64 lowercase hex digits`);
    if (!Number.isSafeInteger(a.bytes) || a.bytes <= 0) throw new Error(`${at}: bytes must be a positive integer`);
    if (typeof a.publishedAt !== 'string' || Number.isNaN(Date.parse(a.publishedAt))) throw new Error(`${at}: publishedAt must be a date`);
    if (typeof a.url !== 'string' || !a.url.startsWith('https://')) throw new Error(`${at}: url must be HTTPS`);
    const expected = `https://github.com/ejmlabs/${REPOSITORIES[a.product]}/releases/download/v${a.version}/${a.filename}`;
    if (a.url !== expected) throw new Error(`${at}: url must be ${expected}`);
    if (a.notarized !== undefined && typeof a.notarized !== 'boolean') throw new Error(`${at}: notarized must be true or false`);
    const key = `${a.product}/${a.target}`;
    if (seen.has(key)) throw new Error(`${at}: duplicate ${key}`);
    seen.add(key);
    const first = versions.get(a.product);
    if (first !== undefined && first !== a.version) throw new Error(`${at}: ${a.product} lists versions ${first} and ${a.version}`);
    versions.set(a.product, a.version);
  }
  return manifest.artifacts;
}

export const readReleases = (file = manifestPath) => validateReleases(JSON.parse(readFileSync(file, 'utf8')));
