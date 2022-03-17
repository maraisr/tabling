import { test } from 'uvu';
import * as assert from 'uvu/assert';
import * as lib from './src';

test('api', () => {
	assert.type(lib.tabling, 'function');
});

test('should memoize', () => {
	let val = 1;

	const target = lib.tabling({
		get answer() {
			return val;
		},
	});

	assert.equal(val, 1);
	assert.equal(target.answer, 1);
	val = 2;
	assert.equal(target.answer, 1);
});

test('should retain this context', () => {
	const target = lib.tabling({
		val: 1,
		get answer() {
			return this.val;
		},
	});

	assert.equal(target.answer, 1);
});

test('keys should have them all', () => {
	const target = lib.tabling({
		get a() {
			return 'a';
		},
		get b() {
			return 'a';
		},
		c() {
			return 'a';
		},
		d: 'd',
	});

	assert.equal(Object.keys(target), ['a', 'b', 'c', 'd']);
});

test('reading keys should not eval', () => {
	let val = 1;
	const target = lib.tabling({
		get answer() {
			val = 2;
			return val;
		},
	});

	Object.keys(target);

	assert.equal(val, 1);
	assert.equal(target.answer, 2);
	assert.equal(val, 2);
});

test('falsey values should still cache', () => {
	let ran = 0;
	const target = lib.tabling({
		get answer() {
			ran += 1;
			return false;
		},
	});

	assert.equal(target.answer, false);
	assert.equal(ran, 1);
	assert.equal(target.answer, false);
	assert.equal(ran, 1, 'can only run once');
});

test('can\'t assign values', () => {
	const target = lib.tabling({
		get answer() {
			return 42;
		},
	});

	target.answer = 16;

	assert.equal(target.answer, 42);
});

test.run();
