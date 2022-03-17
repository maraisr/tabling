# `tabling`

Commit a getter's result for one-time evaluation.

## 🚀 Usage

```ts
import { tabling } from "tabling";

const myObject = tabling({
	get answer() {
		return discover_the_meaning_of_life();
	},
});

myObject.answer; // 42
```

Where ordinarily, that would look like `{ answer: discover_the_meaning_of_life() }` for a value
somebody may never read.

## 🔎 API

#### Module: [`tabling`](./src/index.js)

The main and _default_ module and us `Proxy` based. Everything is lazy here, the object is built-up
over which keys are consumed.

> No upfront cost, and slightly slower read time.

#### Module: [`tabling/warm`](./src/warm.js)

A `object` based implementation, whereby the result is setup at evaluation time.

> Upfront cost, but no read time.

### 🤔 But which one should I use?

Naturally riddled with assumptions. But If you see the benchmarks below, generally the advice is.

1. if you've got a long-running process with many reads, the `/warm` sub-module is what youre after.
    - think like a web-server, where the object is module-scope.
2. browsers, you're probably after the `default` (proxy based) api. Very minimal reads, and want
   fast as possible startup time.

So with that, and by no means bullet-proof answer;

-   server — `tabling/warm`
-   browser - `tabling`

## 💨 Benchmark

> via the [`/bench`](/bench) directory with Node v17.2.0

```
benchmark :: setup
  default              x 2,442,456 ops/sec ±1.92% (89 runs sampled)
  warm                 x   503,581 ops/sec ±0.69% (93 runs sampled)

benchmark :: jit
  default              x   2,168,685 ops/sec ±1.25% (91 runs sampled)
  warm                 x 430,936 ops/sec ±1.49% (91 runs sampled)

benchmark :: aot
  default              x  27,579,584 ops/sec ±0.52% (89 runs sampled)
  warm                 x 133,821,620 ops/sec ±0.34% (93 runs sampled)
```

> **setup** — the time to construct the object, _without_ reading from it.
>
> **jit** — the object is constructed on the hot path, and read from immediately. Think "request bound" objects.
>
> **aot** — the object is constructed _ahead of time_, and read later on the hot path. Think "module scope" objects.

## ❤️ Thanks

Special thanks to [@wongmjane](http://twitter.com/wongmjane) for idea!

## License

MIT © [Marais Rossouw](https://marais.io)
