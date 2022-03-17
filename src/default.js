export function tabling(source) {
	let keys;
	return new Proxy({}, {
		ownKeys() {
			return keys = keys || Object.keys(source);
		},
		getOwnPropertyDescriptor(target, prop) {
			const descriptor = Reflect.getOwnPropertyDescriptor(source, prop);
			if (descriptor == null || descriptor.get == null) return descriptor;

			return {
				configurable: true,
				enumerable: true,
			};
		},
		get(target, prop) {
			if (prop in target) return target[prop];
			const val = source[prop];
			target[prop] = val;
			return val;
		},
	});
}
