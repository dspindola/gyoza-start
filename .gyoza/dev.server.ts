import { Elysia } from "elysia"
import server from "../server"
import input from "./.tmp/input"

const routers = input.config.routers;

const _assets = routers.find(route => route.base === "/_assets")

const _routes = routers.find(route => route.base === "/_routes")


const _dist = routers.find(route => route.base === "/_dist")

console.log(_assets, _dist, _routes)

const dev = server(new Elysia({
	serve: input.config.server
}));

dev.listen(input.config.server, ({ url }) => {
	console.log('%s', url)
})

console.log(input)