import bunfig from "./bunfig.toml";
import { defineConfig } from "./packages/app/config";

export default defineConfig({
	server: {
		hostname: import.meta.env?.HOSTNAME ?? "0.0.0.0",
		development: import.meta.env.NODE_ENV !== "production",
	},
	bun: {
		bunfig: bunfig,
	},
	routers: [
		{
			type: "static",
			base: "/",
			assets: "./public",
			pattern: "**/{*.ico,*.svg}",
		},
		{
			type: "http",
			base: "/_assets",
			assets: "./src",
			pattern: "**/{*.css,.json}",
		},
		{
			type: "http",
			base: "/_dist",
			assets: "./.dist",
			pattern: "**/{*.map,*.mjs,*.js}",
		},
		{
			type: "http",
			base: "/_routes",
			assets: "./src/routes",
			pattern: "**/{*.tsx,*.jsx}",
		},
	],
});
