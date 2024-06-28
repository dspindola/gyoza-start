import type { Elysia } from "elysia";
import { handleRequest } from "src/entry.server";

export default <App extends Elysia>(app: App) =>
	app
		.get("*", handleRequest)
		.get("/style.css", () => Bun.file("src/style.css"))
		.group("/auth", (auth) =>
			auth.all("*", (ctx) => {
				console.log(ctx.headers);
				return "ok";
			}),
		);
