import type { Elysia } from "elysia";
import { handleRequest } from "src/entry.server";

export default <T extends Elysia>(app: T) =>
	app
		.get("*", handleRequest);
