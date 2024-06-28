export default {
	server: {
		hostname: "0.0.0.0",
	},
	routers: [
		{
			type: "static",
			base: "/",
			assets: "./public",
			pattern: "**/{*.ico,*.svg}"
		},
		{
			type: "http",
			base: "/_assets",
			assets: "./src",
			pattern: "**/{*.css,.json}"
		},
		{
			type: "http",
			base: "/_dist",
			assets: "./.dist",
			pattern: "**/{*.map,*.mjs,*.js}"
		},
		{
			type: "http",
			base: "/_routes",
			assets: "./src/routes",
			pattern: "**/{*.tsx,*.jsx}"
		}
	]
}