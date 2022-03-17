declare module 'tabling' {
	export function tabling<Source extends Readonly<Record<string, unknown>>>(source: Source): Readonly<Source>;
}

declare module 'tabling/warm' {
	export function tabling<Source extends Readonly<Record<string, unknown>>>(source: Source): Readonly<Source>;
}
