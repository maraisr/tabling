export function tabling(source) {
	let cache = new Map, keys;

	return new Proxy({}, {
		ownKeys() {
			return keys ||= Object.keys(source);
		},
		getOwnPropertyDescriptor() {
			return {
				enumerable: true,
				writable: false,
				configurable: true,
			};
		},
		get(target, prop) {
			if (cache.has(prop)) return cache.get(prop);
			const val = source[prop];
			cache.set(prop, val);
			return val;
		},
	});
}
