import test from 'node:test';
import assert from 'node:assert/strict';
import { shouldRetry } from './src/retry.mjs';

const policy = { maxAttempts: 3, budgetMs: 1000 };
test('retry while time remains', () => {
  assert.equal(shouldRetry(1, 999, policy), true);
});
test('stop when time is used', () => {
  assert.equal(shouldRetry(1, 1000, policy), false);
});
test('stop after the deadline', () => {
  assert.equal(shouldRetry(1, 1001, policy), false);
});
test('stop at the attempt limit', () => {
  assert.equal(shouldRetry(3, 500, policy), false);
});
test('zero budget means no retry', () => {
  assert.equal(shouldRetry(0, 0, { ...policy, budgetMs: 0 }), false);
});
