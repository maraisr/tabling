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

Where ordinarily, that would look like `{ answer: discover_the_meaning_of_life() }` for a value somebody may never read.

## ❤️ Thanks

Special thanks to [@wongmjane](http://twitter.com/wongmjane) for idea!

## License

MIT © [Marais Rossouw](https://marais.io)

