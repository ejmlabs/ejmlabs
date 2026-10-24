import assert from 'node:assert/strict';
import test from 'node:test';
import { orderTotal } from './orders.mjs';

test('counts each quantity', () => {
  assert.equal(orderTotal([
    { price: 20, quantity: 3 },
    { price: 15, quantity: 1 },
  ]), 75);
});

test('handles an empty order', () => {
  assert.equal(orderTotal([]), 0);
});

test('keeps a single item unchanged', () => {
  assert.equal(orderTotal([{ price: 20, quantity: 1 }]), 20);
});
