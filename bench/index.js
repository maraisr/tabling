import benchmark from "benchmark";
import { tabling } from "../src/index.js";

const suite = new benchmark.Suite();
const previous = suite.add.bind(suite);
suite.on("cycle", (e) => console.log("  " + e.target));
suite.add = (name, runner) => previous(name.padEnd(20), runner);

suite
	.add("tabling", {
		fn() {
			return tabling({
				get answer() {
					return 42;
				},
			}).answer;
		},
	});

suite.run();
