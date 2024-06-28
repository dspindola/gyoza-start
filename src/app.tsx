import React from "react";
import css from "./style.css";
import { preinit } from "react-dom";

export default function App({
	children,
}: {
	children: React.ReactNode;
}) {
	preinit(css, {
		as: "style",
	});
	return (
		<html>
			<head>
				<title>Lucky Fortunate Cones</title>
				<link rel='icon' href='/favicon.svg' type={"image/svg+xml"} />
			</head>
			<body data-id='body'>{children}</body>
		</html>
	);
}
