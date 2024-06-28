import { defineMeta, definePlugin } from "../define";

export const meta = defineMeta({
	version: '0.0.1',
	name: '@gyoza/plugin-tailwind',
	description: 'A plugin for Tailwind CSS',
	url: Bun.pathToFileURL(`/packages/plugins/@gyoza/plugin-tailwind/${import.meta.file}`)
})

export const plugin = definePlugin({
	name: "gyoza-plugin-tailwind",
	setup(build) {
		build.onLoad({ filter: /.css$/ }, async ({ path, }) => {
			const fileName = path.split('/').at(-1) ?? path
			const file = Bun.file(path)

			await Bun.write(`./.gyoza/_assets/${fileName}`, await file.text())

			const assets = await Bun.file(`./.gyoza/_assets/.css/map.json`).json()
			const assetsMap = {
				...assets,
				[fileName]: {
					src: `.gyoza/_assets/${fileName}`,
					base: '/_assets',
					path: `/_assets/${fileName}`,
				}
			};

			await Bun.write('.gyoza/_assets/.css/map.json', JSON.stringify(assetsMap));

			return {
				loader: "object",
				exports: { default: assetsMap[fileName].path },
			}
		})
	}
})