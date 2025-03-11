const test = require('node:test');
const assert = require('node:assert');
const score = require('./score');

test('exact guess gets 100', () => {
  assert.strictEqual(score(1024, 1024), 100);
});

test('10 times off gets 60, both ways', () => {
  assert.strictEqual(score(100, 1000), 60);
  assert.strictEqual(score(10000, 1000), 60);
});

test('way off gets 0, never negative', () => {
  assert.strictEqual(score(1, 1000000), 0);
});
