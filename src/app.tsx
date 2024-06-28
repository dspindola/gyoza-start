import type React from "react";
import css from "./style.css";
import { preinit } from "react-dom";

type Props = {
	children: React.ReactNode;
};

export function App({ children }: Props) {
	preinit(css, {
		as: "style",
	});
	return (
		<html lang='en'>
			<head>
				<title>Lucky Fortunate Cones</title>
				<link rel='icon' href='/favicon.svg' type={"image/svg+xml"} />
			</head>
			<body data-id='body'>{children}</body>
		</html>
	);
}
