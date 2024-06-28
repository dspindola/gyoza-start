import { Elysia } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { renderToStaticMarkup } from "react-dom/server";

const router = new Bun.FileSystemRouter({
	dir: "./pages",
	style: "nextjs",
	fileExtensions: [".mdx"],
});

const app = new Elysia()
	.use(staticPlugin({ assets: "./pages", prefix: "/" }))
	.get("*", async ({ request }) => {
		try {
			const route = router.match(request);

			if (!route) {
				throw new Error("Route not found");
			}

			const Page = await import(route.filePath);
			return new Response(
				renderToStaticMarkup(
					<html className='bg-black text-white'>
						<head>
							<title>{Page.meta.title}</title>
							<script src='https://cdn.tailwindcss.com'></script>
						</head>
						<body className='p-4 font-sans text-3xl'>
							<a href='/'>/</a>
							<a href='/dx'>/dx</a>
							<a href='/intro'>/intro</a>
							<a href='/contrib'>/contrib</a>
							<a href='/dev/app.tsx'>/dev/app.tsx</a>

							<Page.default />
						</body>
					</html>,
				),
				{
					status: 200,
					headers: {
						"content-type": "text/html",
					},
				},
			);
		} catch (error) {
			return new Response("not found", {
				status: 404,
			});
		}
	})
	.listen({
		hostname: process.env.HOSTNAME,
		port: process.env.PORT,
	});

console.log("%s", app.server?.url);
