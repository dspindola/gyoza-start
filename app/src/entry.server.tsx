import { createRouter } from "@gyoza/router";
import type * as Gyoza from "~/gyoza.d";
import { renderToReadableStream } from "react-dom/server";
import { App } from "~/src/main";

export async function handleRequest(context: Gyoza.Context) {
	const router = createRouter({
		assets: "src/routes",
		origin: Bun.origin,
		prefix: "/",
		fileExtensions: [".tsx", ".jsx", ".mdx", ".js"],
		type: "fs",
	}) as Gyoza.Router;

	router.reload();

	const route = router.match(context.request) as Gyoza.Route;

	const module = await import(route.filePath);

	const stream = await renderToReadableStream(
		<App>
			<module.Route {...{ params: route.params, query: route.query }} />
		</App>,
		{
			onError(error, errorInfo) {
				console.error(error, errorInfo);
			},
		},
	);

	await stream.allReady;

	return new Response(stream, {
		status: 200,
		headers: {
			"content-type": "text/html",
		},
	});
}
