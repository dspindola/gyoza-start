import React from "react";
import blocks from "../../../blocks.json";
import Block from "src/components/Block";

export default function Index() {
	return (
		<main>
			<h1>blocks</h1>
			<div className='blocks'>
				{Object.entries(blocks).map(([id, block]) => {
					return (
						<React.Suspense key={id} fallback={<p>running...</p>}>
							<Block
								href={`/drive/block/${id}`}
								id={id}
								runner={block.runner}
								title={block.title}
							>
								{block.command}
							</Block>
						</React.Suspense>
					);
				})}
			</div>
		</main>
	);
}
