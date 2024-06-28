export function createRouter({
	assets,
	fileExtensions,
	prefix,
	origin,
	type,
}: {
	assets: string;
	prefix: string;
	type: "static" | "http" | "fs";
	origin: string;
	fileExtensions: `.${string}`[];
}) {
	switch (type) {
		case "fs":
		case "static":
			return new Bun.FileSystemRouter({
				dir: assets,
				style: "nextjs",
				origin: origin,
				assetPrefix: prefix,
				fileExtensions: [],
			});
		case "http":
			return {
				routes: {},
				async match(input: Request) {
					return fetch(input.url);
				},
				origin: origin,
				assetPrefix: prefix,
				fileExtensions: fileExtensions,
			};
		default:
			throw new Error(`Unknown type: ${type}`);
	}
}
