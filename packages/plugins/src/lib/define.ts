import type { BunPlugin } from "bun";

export function definePlugin(plugin: BunPlugin) {
	if (import.meta.main && import.meta.env.NODE_ENV === "development")
		console.log("Loading plugin...");
	return plugin;
}

export function defineMeta(options: {
	version: string;
	name: string;
	description: string;
	url: URL;
}) {
	return { ...options, url: options.url.toString() };
}

export function bundle(
	plugin: ReturnType<typeof definePlugin>,
	meta: ReturnType<typeof defineMeta>,
) {
	return {
		plugin,
		meta,
	};
}
