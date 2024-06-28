import { createRouter } from "@/packages/router/router";
import type { MatchedRoute } from "bun";
import type { Context } from "elysia";
import { renderToReadableStream } from "react-dom/server";
import App from "./app";

export async function handleRequest(context: Context) {
	const router = createRouter({
		assets: 'src/routes',
		origin: Bun.origin,
		prefix: '/',
		fileExtensions: ['.tsx'],
		type: "fs"
	});

	const route = router.match(context.request) as MatchedRoute;

	const module = await import(route.filePath);

	const stream = await renderToReadableStream(<App>
		<module.default />
	</App>, {})

	return new Response(stream)
}