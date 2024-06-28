#!/usr/bin/env bun
import { $ } from "bun";

const [command, ...options] = process.argv.slice(2);

const input = {
	command: command,
	options: Object.fromEntries(
		Array.from({
			length: options.length,
		}).map((_, index) => options.at(index)?.split("=") as [string, string]),
	),
};

const env = {
	...process.env,
	GYOZA_INPUT: ".gyoza/.tmp/input.js",
	GYOZA_MODE: input.options["--mode"] ?? "developement",
	GYOZA_SERVER_PORT: input.options["--port"] ?? 3000,
	GYOZA_SERVER_HOSTNAME: input.options["--hostname"] ?? "0.0.0.0",
	GYOZA_APP_CONFIG_PATH: input.options["--config"] ?? "app.config.ts",
};

try {
	await $`bun --eval 'const config = await import(Bun.pathToFileURL(Bun.env.GYOZA_APP_CONFIG_PATH).pathname).then((module) => module.default);await Bun.write(Bun.env.GYOZA_INPUT, "export default " + Bun.inspect({input: ${Bun.inspect(input)}, config: config }));'`
		.env(env)
		.cwd(process.cwd());
} catch (error) {
	process.exit(1);
}

try {
	await Bun.$`bun run --define=Bun.origin:"${process.env.origin}" --config=${process.env.bunfig ?? "./bunfig.toml"} --port=${process.env.port ?? "3000"} --watch ./.gyoza/dev.server.ts`
		.env(env)
		.cwd(process.cwd());
} catch (error) {
	process.exit(1);
}
