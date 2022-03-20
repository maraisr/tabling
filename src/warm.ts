export function tabling<Source extends Readonly<Record<string, unknown>>>(source: Source): Readonly<Source> {
	const target = {};

	for (const [key, descriptor] of Object.entries(Object.getOwnPropertyDescriptors(source))) {
		if (descriptor.get === undefined) {
			Object.defineProperty(target, key, descriptor);
			continue;
		}

		Object.defineProperty(target, key, {
			...descriptor,
			get() {
				const value = descriptor.get!.call(this);
				Object.defineProperty(this, key, { value });

				return value;
			},
		});
	}

	return target as Readonly<Source>;
}
