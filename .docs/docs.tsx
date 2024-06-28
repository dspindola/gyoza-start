import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react"

const router = new Bun.FileSystemRouter({
	dir: import.meta.dir + '/pages',
	style: "nextjs",
	fileExtensions: [".md"]
})
export default new Elysia({
	serve: {
		hostname: "0.0.0.0"
	}
}).use(staticPlugin({ assets: './', prefix: "/" }))
	.get('*', async ({ request }) => {
		try {
			const route = router.match(request);

			if (!route) {
				throw new Error("Route not found");
			}

			const Page = await import(route.filePath);
			return renderToStaticMarkup(
				<html className="bg-black text-white">
					<head>
						<title>@gyoza/docs</title>
						<script src="https://cdn.tailwindcss.com"></script>
					</head>
					<body className="p-4 font-sans text-3xl">
						<Page.default />
						<style>
							{`a {
								 color: #1138AC;
								 text-decoration: none;
							}

							h1,h2,h3 {
								font-size: 2.5rem;
								color: #00CC90;
							}
							`}
						</style>
					</body >
				</html>
			)
		} catch (error) {
			return new Response('not found', {
				status: 404
			})
		}
	})