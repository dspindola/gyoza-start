import React from "react"
import blocks from "../../../../blocks.json"
import Block from "src/components/Block"
import blockcss from "./block.css"
import { preload, } from "react-dom"

console.log(blockcss)
export default function BlockPrevie(props: {
	params: {
		id: string
	}
}) {
	preload(blockcss, {
		as: "style"
	})
	const [id, block] = Object.entries(blocks).find(([id]) => id === props.params.id)!;

	return <main>
		<h1>{block.title}</h1>
		<Block id={id} runner={block.runner} >
			{block.command}
		</Block>
	</main>
}