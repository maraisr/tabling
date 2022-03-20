export function tabling<Source extends Readonly<Record<string, unknown>>>(source: Source): Readonly<Source> {
	let keys: string[];

	return new Proxy({} as Readonly<Source>, {
		ownKeys() {
			return keys = keys || Object.keys(source);
		},
		getOwnPropertyDescriptor(_target, prop) {
			const descriptor = Reflect.getOwnPropertyDescriptor(source, prop);
			if (descriptor == null || descriptor.get == null) return descriptor;

			return {
				configurable: true,
				enumerable: true,
			};
		},
		get(target, prop) {
			// @ts-expect-error
			if (prop in target) return target[prop];
			// @ts-expect-error
			const val = source[prop];
			// @ts-expect-error
			target[prop] = val;
			return val;
		},
	});
}
