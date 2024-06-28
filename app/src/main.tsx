import type { ReactNode } from "react";
import css from "./style.css";

export type Props = {
	children?: ReactNode;
};

export function App({ children }: Props) {
	return (
		<html lang='en'>
			<head>
				<title>Lucky Fortunate Cones</title>
				<link rel='icon' href='/favicon.svg' type={"image/svg+xml"} />
				<link rel='stylesheet' href={css} />
			</head>
			<body data-id='body'>{children}</body>
		</html>
	);
}
