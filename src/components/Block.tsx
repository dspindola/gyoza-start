import { use } from "react"

export async function runCommand(runner: string, command: string[]) {
	'use server'
	try {
		const proc = Bun.$`${runner} ${command}`.text().catch(error => {
			throw new Error(
				`Error running command: ${error.message}`
			)
		})
		return {
			data: { output: proc, runner, command },
			error: false
		}
	} catch (error) {
		return {
			data: null,
			error: true,
		}
	}
}

export default function Block({ children: Command, title, runner, id, href }: {
	children: string[],
	title?: string,
	runner: string,
	href?: string,
	id: string,
}) {
	const { data, error } = use(runCommand(runner, Command))

	if (error === true) {
		return <span>error</span>
	}

	return <section className="block">
		<header className="command-header">
			{title && <h1>title</h1>}
			<div>
				bin: {data?.runner}
			</div>
		</header>
		<code>
			<div>
				<div>input</div>
				<pre className="raw-code">{data?.command?.join(' ')}</pre>
			</div>
		</code>
		<code className="code">
			<div>
				<div>output</div>
				<pre className="raw-code">
					{data?.output}
				</pre>
			</div>
		</code>
		<div className="block-link">
			{href && <a data-link href={href}>block {id}</a>}</div>
	</section>
}