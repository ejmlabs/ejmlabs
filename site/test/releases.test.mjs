import test from 'node:test';
import assert from 'node:assert/strict';
import { readReleases, validateReleases } from '../scripts/releases.mjs';

const good = {
  product: 'cli',
  version: '0.1.0',
  publishedAt: '2026-11-01T00:00:00Z',
  target: 'linux-x86_64',
  filename: 'ejm-cli-0.1.0-linux-x86_64.tar.gz',
  url: 'https://github.com/ejmlabs/ejm-cli/releases/download/v0.1.0/ejm-cli-0.1.0-linux-x86_64.tar.gz',
  bytes: 1234,
  sha256: 'a'.repeat(64),
};
const list = (...artifacts) => ({ schemaVersion: 1, artifacts });
const rejects = (artifacts, pattern) => assert.throws(() => validateReleases(list(...artifacts)), pattern);

test('the committed releases.json is valid', () => {
  readReleases();
});

test('an empty list and a sound list are valid', () => {
  assert.deepEqual(validateReleases(list()), []);
  assert.equal(validateReleases(list(good)).length, 1);
});

test('a missing or malformed digest is rejected', () => {
  const { sha256, ...without } = good;
  rejects([without], /sha256/);
  rejects([{ ...good, sha256: 'A'.repeat(64) }], /sha256/);
  rejects([{ ...good, sha256: 'a'.repeat(63) }], /sha256/);
});

test('a URL that is not HTTPS is rejected', () => {
  rejects([{ ...good, url: good.url.replace('https://', 'http://') }], /HTTPS/);
  rejects([{ ...good, url: undefined }], /HTTPS/);
});

test('a duplicate target is rejected', () => {
  rejects([good, { ...good }], /duplicate/);
});

test('a version that disagrees with the URL, file name or sibling artifacts is rejected', () => {
  rejects([{ ...good, version: '0.1.1' }], /filename must name/);
  rejects([{ ...good, version: '0.1.1', url: good.url.replace('v0.1.0', 'v0.1.1') }], /filename must name/);
  const other = {
    ...good,
    target: 'darwin-aarch64',
    version: '0.1.1',
    filename: 'ejm-cli-0.1.1-darwin-aarch64.tar.gz',
    url: 'https://github.com/ejmlabs/ejm-cli/releases/download/v0.1.1/ejm-cli-0.1.1-darwin-aarch64.tar.gz',
  };
  rejects([good, other], /versions 0\.1\.0 and 0\.1\.1/);
});

test('every URL is a versioned release asset on the owning repository', () => {
  const asset = 'ejm-harness-worker-0.1.1-linux-x86_64.tar.gz';
  const worker = {
    ...good,
    product: 'worker',
    version: '0.1.1',
    filename: asset,
    url: `https://github.com/ejmlabs/ejm-harness/releases/download/v0.1.1/${asset}`,
  };
  assert.equal(validateReleases(list(worker)).length, 1);
  rejects([{ ...worker, url: `https://github.com/ejmlabs/ejm-cli/releases/download/v0.1.1/${asset}` }], /url must be/);
  rejects([{ ...worker, url: `https://github.com/ejmlabs/ejm-harness/releases/latest/download/${asset}` }], /url must be/);
  rejects([{ ...worker, url: `https://example.com/ejmlabs/ejm-harness/releases/download/v0.1.1/${asset}` }], /url must be/);
  rejects([{ ...worker, url: `https://github.com/ejmlabs/ejm-harness/archive/v0.1.1/${asset}` }], /url must be/);
});

test('publishedAt must be a date string and notarized a boolean', () => {
  rejects([{ ...good, publishedAt: 0 }], /publishedAt/);
  rejects([{ ...good, notarized: 'yes' }], /notarized/);
  rejects([{ ...good, notarized: true }], /only a macOS file/);
  const mac = { ...good, target: 'darwin-aarch64', notarized: true };
  assert.equal(validateReleases(list(mac)).length, 1);
});

test('an unknown product or target is rejected', () => {
  rejects([{ ...good, product: 'ui' }], /unknown product/);
  rejects([{ ...good, target: 'linux-aarch64' }], /unknown target/);
});
