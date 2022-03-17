import { test , suite} from 'uvu';
import * as assert from 'uvu/assert';
import * as lib from './src';
import * as lib_warm from './src/warm.js';

test('api', () => {
	assert.type(lib.tabling, 'function');
	assert.type(lib_warm.tabling, 'function');
});

test.run();

const run = (name: string, lib: any) => {
	const s = suite(name);

	s('should memoize', () => {
		let val = 1;

		const target = lib({
			get answer() {
				return val;
			},
		});

		assert.equal(val, 1);
		assert.equal(target.answer, 1);
		val = 2;
		assert.equal(target.answer, 1);
	});

	s('should retain this context', () => {
		const target = lib({
			val: 1,
			get answer() {
				return this.val;
			},
		});

		assert.equal(target.answer, 1);
	});

	s('object.entries should work', () => {
		const target = lib({
			get a() {
				return 'a';
			},
			b: 'b',
		});

		assert.equal(Object.entries(target), [['a', 'a'], ['b', 'b']]);
	});

	s('keys should have them all', () => {
		const target = lib({
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

	s('reading keys should not eval', () => {
		let val = 1;
		const target = lib({
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

	s('falsey values should still cache', () => {
		let ran = 0;
		const target = lib({
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

	s('can\'t assign values', () => {
		const target = lib({
			get answer() {
				return 42;
			},
		});

		target.answer = 16;

		assert.equal(target.answer, 42);
	});

	s('non getteres should be accessible', () => {
		const target = lib({
			get a() {
				return 'a';
			},
			b: 'b',
		});

		assert.equal(target.a, 'a');
		assert.equal(target.b, 'b');
	});

	s.run();
}

run('default', lib.tabling);
run('warm', lib_warm.tabling);
