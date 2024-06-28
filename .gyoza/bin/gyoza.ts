import { $ } from "bun";

const [command, ...options] = process.argv.slice(2)

const input = {
	command: command,
	options: Object.fromEntries(Array.from({
		length: options.length
	}).map((_, index) => options.at(index)?.split('=') as [string, string]))
};
await $`bun --eval '
const configPath = Bun.pathToFileURL(Bun.env.GYOZA_APP_CONFIG_PATH);

const config = await import(configPath.pathname).then((module) => module.default);

console.log(
		Bun.env.GYOZA_INPUT,
		Bun.env.GYOZA_MODE,
		Bun.env.GYOZA_SERVER_PORT,
Bun.env.GYOZA_SERVER_HOSTNAME,
Bun.env.GYOZA_APP_CONFIG_PATH,
);
await Bun.write(Bun.env.GYOZA_INPUT, "export default " + Bun.inspect({input: ${Bun.inspect(input)}, config: config }));
'`.env({
	...process.env,
	'GYOZA_INPUT': '.gyoza/.tmp/input.js',
	'GYOZA_MODE': input.options['--mode'] ?? "developement",
	'GYOZA_SERVER_PORT': input.options['--port'] ?? 3000,
	'GYOZA_SERVER_HOSTNAME': input.options['--hostname'] ?? "0.0.0.0",
	'GYOZA_APP_CONFIG_PATH': input.options['--config'] ?? "app.config.ts"
}).cwd(process.cwd())

await Bun.$`bun --watch ./.gyoza/dev.server.ts`