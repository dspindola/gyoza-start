import { createRouter } from "@/packages/router/router";
import type { FileSystemRouter, MatchedRoute } from "bun";
import type { Context } from "elysia";
import { renderToReadableStream } from "react-dom/server";
import { App } from "./app";

export async function handleRequest(context: Context) {
	const router = createRouter({
		assets: "src/routes",
		origin: Bun.origin,
		prefix: "/",
		fileExtensions: [".tsx", ".jsx", ".mdx", ".js"],
		type: "fs",
	}) as FileSystemRouter

	router.reload()

	const route = router.match(context.request) as MatchedRoute;

	const module = await import(route.filePath);

	const stream = await renderToReadableStream(
		<App>
			<module.Route {...{ params: route.params, query: route.query }} />
		</App>,
		{
			onError(error, errorInfo) {
				console.log(error);
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
