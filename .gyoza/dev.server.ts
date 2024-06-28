import { Elysia } from "elysia"
import { staticPlugin } from "@elysiajs/static"
import { cors } from "@elysiajs/cors"

import server from "../server"
import input from "./.tmp/input"

const routers = input.config.routers;

const _assets = routers.find(route => route.base === "/_assets")

const _routes = routers.find(route => route.base === "/_routes")


const _dist = routers.find(route => route.base === "/_dist")

console.log(_assets, _dist, _routes)

const dev = server(new Elysia({
	serve: input.config.server
}).use(cors()).use(staticPlugin({
	prefix: "/",
	assets: "public",
	alwaysStatic: true,
	directive: "public"
})).use(
	staticPlugin({
		prefix: "/_assets",
		assets: ".gyoza/_assets",
		alwaysStatic: false,
		noCache: true,
	})
));

dev.listen(input.config.server, ({ url }) => {
	console.log('%s', url)
})

console.log(input)