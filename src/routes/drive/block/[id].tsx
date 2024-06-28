import blocks from "~/blocks.json";
import { Block } from "src/components/Block";
import blockcss from "./block.css";
import { preload } from "react-dom";

export function Route(props: {
	params: {
		id: string;
	};
}) {
	preload(blockcss, {
		as: "style",
	});
	const [id, block] = Object.entries(blocks).find(
		([id]) => id === props.params.id,
	) ?? [null, null];

	if (!block) {
		return <p>not found</p>;
	}

	return (
		<main>
			<h1>{block?.title}</h1>
			<Block id={id} runner={block.runner}>
				{block.command}
			</Block>
		</main>
	);
}
