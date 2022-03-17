import benchmark from "benchmark";
import { tabling as tabling_proxy } from "../src/index.js";
import { tabling as tabling_object } from "../src/warm.js";

const run = (name, candidates) => {
	const sorted_candidates = Object.entries(candidates).sort(([a], [b]) =>
		a.localeCompare(b),
	);

	const suite = new benchmark.Suite();
	const previous = suite.add.bind(suite);
	suite.on("cycle", (e) => console.log("  " + e.target));
	suite.add = (name, runner) => previous(name.padEnd(20), runner);

	console.log(`\nbenchmark :: ${name}`);
	for (const [name, fn] of sorted_candidates) {
		const instance = fn();
		suite.add(name, instance);
	}

	suite.run();
}

run('setup', {
	default() {
		return () => {
			return tabling_proxy({
				get answer() {
					return 42;
				},
			});
		}
	},
	warm() {
		return () => {
			return tabling_object({
				get answer() {
					return 42;
				},
			});
		}
	}
})

run('jit', {
	default() {
		return () => {
			return tabling_proxy({
				get answer() {
					return 42;
				},
			}).answer;
		}
	},
	warm() {
		return () => {
			return tabling_object({
				get answer() {
					return 42;
				},
			}).answer;
		}
	}
});

run('aot', {
	default() {
		const target = tabling_proxy({
			get answer() {
				return 42;
			},
		});

		return () => target.answer;
	},
	warm() {
		const target = tabling_object({
			get answer() {
				return 42;
			},
		});

		return () => target.answer;
	}
});
