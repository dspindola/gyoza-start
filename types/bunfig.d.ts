declare module "*bunfig.toml" {
	interface Config {
		readonly [key: string]: any;
	}
	const config: Config;
	export default config;
}
